import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


function Professor_modal(props) {

    const data = props.tutorData.find(item => {
        return item._id == props.profDetail.id
    })
    return (
        <Modal className='prof_detail_modal' isOpen={props.profDetail} toggle={() => props.toggleProfDetails(false)}>
            <ModalHeader toggle={() => props.toggleProfDetails(false)}>{data.name}</ModalHeader>
            <ModalBody>

                <p>{data.about}</p>
                <p className='bold'>Interests : <span>{data.courses.map(item => {
                    return <span>{item.description}, </span>
                })}</span> </p>
                <pre className='d-flex'><b>Email ID : </b>{data.email}</pre>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Office Hours</th>
                        <th>Is slot available?</th>
                    </tr>
                    {
                        data.availability.map(date => {
                            return <tr>
                                <td>{date.date}</td>
                                <td><pre>{date.startTime} - {date.endTime}</pre></td>
                                <td>{date.isAvailable ? "Yes" : "No"}</td>
                            </tr>
                        })
                    }


                </table>

            </ModalBody>
        </Modal>

    )
}


export default Professor_modal