import TodoItem from "./TodoItem";

const TodoList = ({todos, handleDelete, handleUpdate}) => {
  return (
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
  )
}

export default TodoList;