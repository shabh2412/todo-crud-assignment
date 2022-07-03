// import { useEffect } from "react"
import Button from "./Button";
import Input from "./Input"

const InputGroup = ({text,handleChange,handleAdd}) => {
  

  // useEffect(()=>{
  //   console.log(todos);
  // }, [todos]);

  return (
    <div className="input-group justify-content-center my-3">
      <Input name="taskInput" type="text" value={text} placeholder="Enter Something" handleChange={handleChange}/>
      <Button className="btn btn-outline-primary" clickHandler={()=>{
        handleAdd(text);
        console.log('Add Button Clicked');
      }}>ADD</Button>
    </div>
  )
}

export default InputGroup;