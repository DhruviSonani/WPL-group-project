import React from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';


function Professor_modal(props) {

    const data = props.tutorData.find(item => {
        return item._id == props.profDetail
    })
    return (
        <Modal className='prof_detail_modal' isOpen={props.profDetail} toggle={() => props.toggleProfDetails(false)}>
            <ModalHeader toggle={() => props.toggleProfDetails(false)}>{data.name}</ModalHeader>
            <ModalBody>

                <p>{data.about}</p>
                <p className='bold'>Interests : <span>{data.expertise.map(item => {
                    return <span>{item}, </span>
                })}</span> </p>
                <pre className='d-flex'><b>Email ID : </b>{data.email}</pre>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Office Hours</th>
                        <th>Is slot available?</th>
                    </tr>
                    {
                        data.Availability.map(date => {
                            return <tr>
                                <td>{date.Date}</td>
                                <td><pre>{date.Start_time} - {date.End_time}</pre></td>
                                <td>{date.Is_available ? "Yes" : "No"}</td>
                            </tr>
                        })
                    }


                </table>

            </ModalBody>
        </Modal>

    )
}


export default Professor_modal