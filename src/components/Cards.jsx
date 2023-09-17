import React, { useEffect, useState } from "react";
import { Button, Card, CardText, CardTitle, Col, Row } from "reactstrap";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import "../style/Todo.css";
import backgroundImg from "../assets/backgroundBG.png";
import {format} from "date-fns"

const Cards = () => {
  const [tasks, setTasks] = useState([]);
  const [deletedTask, setDeletedTask] = useState(null)


  
  const fetchFunction = async () => {
    try {
      const response = await fetch("http://localhost:4001/todo");
      if (response.ok) {
        const data = await response.json();
        const tasksWithCompletion = data.map((task) => ({
          ...task,
          isCompleted: false,
        }));
        setTasks(tasksWithCompletion);
      } else {
        const errorData = await response.json();
        alert(errorData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) =>{
    try {
        const response = await fetch(`http://localhost:4001/todo/${id}`,{
            method:"DELETE"
        })
        if(response.ok){
            setDeletedTask(id)
        }else{
            const errorData = await response.json()
            alert(errorData.message)
        }
    } catch (error) {
        console.log(error)
    }
  }


const handleEdit = (id) =>{
const updatedPost = tasks.map((task)=>{
    if(task._id === id){
        return {...task, isCompleted: !task.isCompleted}
    }
    return task;
})
setTasks(updatedPost)
}

useEffect(()=>{
    fetchFunction()
},[deletedTask])

  return (
    <>
      <div className="card-comp">
       {tasks.length > 0 ? (
      tasks.map((task) => (
        <div key={task._id} className={`card-row ${task.isCompleted ? "completed":""}`}>

          <Row>
            <Col>
              <Card body className="card-body">
                <CardTitle tag="h5">{task.task}</CardTitle>
                <h6 className="card-date">
                  {format(new Date (task.createdAt),"MMM d yyyy")}
                </h6>
                <CardText tag={"p"}>  {task.textarea}</CardText>
                <div className="tool-buttons">
                  <Button
                    className="btn btn-info"
                 onClick={()=>handleEdit(task._id)}
                  >
                    <HiPencilAlt />
                  </Button>
                  <Button
                  onClick={()=>handleDelete(task._id)}
                    className="btn btn-danger"
                  >
                    <HiOutlineTrash  />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      ))
    ) : (
        <div className="no-tasks">
          <img src={backgroundImg} alt="No tasks to display" />
        </div>
      )}
    </div>
    </>
  );
};

export default Cards;
