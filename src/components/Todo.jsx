import React, { useState } from 'react'
import "../style/Todo.css"
import DarkButton from './DarkButton'
import Cards from './Cards'
import Createtask from '../model/Createtask'


const Todo = () => {
    const [modal, setModal] = useState(false)
    const [task, setTask] = useState([])
    const toggle = () => setModal(!modal)
    const saveTask = (taskObj)=>{
        let tempList = task
        tempList.push(taskObj)
        setTask(tempList)
    }
  return (
    <>
      <div className="create-task">
      <div className="dark-button">
        <DarkButton/>
      </div>
        <h3>To-Do Application</h3>
        <button className="btn btn-dark" onClick={toggle}>
          Create Task
        </button>
      </div>
      {/* See Tasks */}
      <Createtask toggle={toggle} modal={modal} save={saveTask}/>
      <div className="container">
      <Cards/>
      </div>
    </>
   
  )
}

export default Todo