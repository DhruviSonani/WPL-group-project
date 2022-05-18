	
import React, {useEffect} from 'react'
import { Modal, Button } from "react-bootstrap";
 
function DeleteConfirmation (props){
  const {id, onDelete, msg, initiated} = props.profDetail
  console.log(props);
  useEffect(()=>{
    
    if (typeof(props.profDetail) == "string" || typeof(props.appointment_op) == "string"){
      props.toggleProfDetails(false)
    }

    return ()=> {
      if (initiated !== "appt"){
        props.fetchTutorData()
        
      }
      
    }
  }, [props.profDetail, props.appointment_op])

    return (
        <Modal show={id} onHide={() => props.toggleProfDetails(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="alert alert-danger">{msg}</div></Modal.Body>
        <Modal.Footer>
          <Button variant="default" onClick={()=>props.toggleProfDetails(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => {
              onDelete()

          } }>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    )
}
 
export default DeleteConfirmation;