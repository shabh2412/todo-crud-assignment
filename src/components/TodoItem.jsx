import Button from "./Button";

const TodoItem = ({task, handleDelete, handleUpdate}) => {
  return (
    <div className="row my-2 border" key={task.title+""+task.id}>
      <div className="col-12 col-md-4 col-lg-6 mx-auto my-2 d-flex align-items-center justify-content-center">
        <p className="mb-0">{task.title}</p>
      </div>
      <div className="col-6 col-md-4 col-lg-3 mx-auto my-2 d-flex align-items-center justify-content-center">
        <Button 
          className={task.status ? 'btn btn-success' : 'btn btn-warning'}
          clickHandler={handleUpdate}
          >
            {task.status ? 'Done' : 'Not Done'}
        </Button>
      </div>
      <div className="col-6 col-md-4 col-lg-3 mx-auto my-2 d-flex align-items-center justify-content-center">
        <Button className="btn btn-danger" clickHandler={handleDelete}>DELETE</Button>
      </div>
    </div>
  );
}

export default TodoItem;