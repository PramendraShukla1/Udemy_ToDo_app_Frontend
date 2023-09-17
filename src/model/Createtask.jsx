import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "../style/Todo.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Createtask = ({modal, toggle,save}) => {
    const [task, setTask] = useState("")
    const [textarea, setTextarea] =useState("")

    const handleSubmit = async (e) =>{
        e.preventDefault();

        const response = await fetch("http://localhost:4001/todo",{
            method:"POST",
            body:JSON.stringify({task,textarea}),
            headers:{"Content-Type":"application/json"},
            credentials:"include"
        })
        if(response.ok){
            toast("Your task has been successfully created!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              save();
              toggle();
        }else{
            console.log("Failed to create task")
        }
    } 
    
  return (
    <div className="modal-main">
     <Modal isOpen={modal} toggle={toggle} >
        <ModalHeader toggle={toggle}>To-Do List</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label>Task</Label>
              <Input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </FormGroup>

            <FormGroup>
              <Label>Summary</Label>
              <Input
                type="textarea"
                value={textarea}
                onChange={(e) => setTextarea(e.target.value)}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="success" type="submit" onClick={handleSubmit}>
            Create
          </Button>{" "}
          <Button color="danger" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Createtask;
