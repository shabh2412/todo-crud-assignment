import { useEffect, useState } from "react";
import Button from "./Button";
import InputGroup from "./InputGroup";
import TodoItem from "./TodoItem";

const Todo = () => {
  const [text, setText] = useState('');
  const [todos, setTodos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
    // console.log(text);
  }

  const handlePage = (value) => {
    setPage(page => page + value);
  }

  const getData = async (page = 1)=> {
    setIsLoading(true);
    try {
      let data = await fetch(`https://rishabh-mock-server.herokuapp.com/todos?_page=${page}&_limit=5`);
      data = await data.json();
      console.log(data);
      setTodos(data);
    }
    catch (err) {
      console.log('Error in loading data: ' + err.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  const pushData = async (task) => {
    // console.log('hi');
    try {
      let data = await fetch('https://rishabh-mock-server.herokuapp.com/todos', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
      });
      data = await data.json();
      console.log("data pushed")
      console.log(data);
    }
    catch (err) {
      console.log(':( Error: ' + err.message);
    }
    // console.log(todos);
    // console.log('bye');
  }

  const handleAdd = () => {
    // console.log(todos)
    if(text === '') return;
    const task = {
      title: text,
      status: false
    };
    pushData(task).then(()=>{
      getData(page);
      console.log(page);
      console.log(todos);
    });
  };

  const updateData = async (id, status) => {
    let data = await fetch (`https://rishabh-mock-server.herokuapp.com/todos/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        status: !status
      })
    });
    data = await data.json();
    return data;
  }

  const handleUpdate = (id, status) => {
    updateData(id,status).then(()=>{
      getData(page);
    });
  }

  const deleteData = async (id) => {
    let data = await fetch (`https://rishabh-mock-server.herokuapp.com/todos/${id}`, {
      method: "DELETE",
    });
    data = await data.json();
    console.log(data);
  }

  const handleDelete = async (id) => {
    deleteData(id).then(()=>{
      getData(page);
    })
  }

  useEffect(()=>{
    getData(page);
  },[page])

  return (
    <div className="row my-2">
      <div className="col-10 col-sm-10 col-md-6 col-lg-6 col-xl-6 mx-auto">
        <h1>TODO APP</h1>
        <div className="row">
          <div className="col-10 col-md-12 col-lg-10 mx-auto">
            <InputGroup text={text} handleChange={handleChange} handleAdd={handleAdd} todos={todos}/>
          </div>
        </div>
        
        <div className="row">
          <div className="col-10 col-sm-10 col-md-12 col-lg-8 col-xl-8 mx-auto">
            <div className="d-flex justify-content-center align-items-center gap-2">
              <Button
                disabled={page<=1}
                clickHandler={()=>{
                  handlePage(-1);
                }}
              >Prev</Button>
              <p className="mb-0">{page}</p>
              <Button disabled={todos.length<5} clickHandler={()=>{
                handlePage(1);
              }}>Next</Button>
            </div>
            {
              isLoading ? <div className="row mb-2 border" key="todoLoadingPlaceholder">
                <div className="col-12 d-flex justify-content-center my-2">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                </div>
                <div className="col-6 my-1">
                  <p className="placeholder-wave mb-0">
                    <span className="placeholder col-12 p-3"></span>
                  </p>

                </div>
                <div className="col-3 my-1">
                  <p className="placeholder-wave mb-0">
                    <span className="placeholder col-12 p-3"></span>
                  </p>

                </div>
                <div className="col-3 my-1">
                  <p className="placeholder-wave mb-0">
                    <span className="placeholder col-12 p-3"></span>
                  </p>
                </div>
            </div> : 
            todos.length === 0 ? <div className="row my-2 border">
              <div className="col">
                <h3>
                  No more items left
                </h3>
              </div>
            </div> :
            todos.map((task) => (
              <TodoItem 
                key={task.id+""+task.title} 
                task={task} 
                handleDelete={()=>{handleDelete(task.id)}}
                handleUpdate={()=>{handleUpdate(task.id, task.status)}}
                />
            ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;