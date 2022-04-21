import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

function Add_Update_Professor_modal(props) {

    if (props.profDetail.id) {
        const data = props.tutorData.find(item => {
            return item._id == props.profDetail.id
        })
        return (
            <Modal className='prof_detail_modal' isOpen={props.profDetail} toggle={() => props.toggleProfDetails(false)}>
                <ModalHeader toggle={() => props.toggleProfDetails(false)}>{data.name}</ModalHeader>
                <ModalBody>
                    <h2>{props.profDetail.type}</h2>
                    <p>{data.about}</p>
                </ModalBody>
            </Modal>
        )
    }
    else {
        return (
            <Modal className='prof_detail_modal' isOpen={props.profDetail} toggle={() => props.toggleProfDetails(false)}>
                <ModalHeader toggle={() => props.toggleProfDetails(false)}>Add New Prof</ModalHeader>
                <ModalBody>
                    <h2>{props.profDetail.type}</h2>

                </ModalBody>
            </Modal>
        )
    }
}


export default Add_Update_Professor_modal