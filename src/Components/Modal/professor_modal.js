import React, { useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {getLoginDetails} from '../../Common/utils'
import {Book_appointment} from '../../Redux/container'
import moment  from 'moment';

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
                    return <span>{item.label}, </span>
                })}</span> </p>
                <pre className='d-flex'><b>Email ID : </b>{data.email}</pre>
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Office Hours</th>
                        <th>Is slot available?</th>
                    </tr>
                    { getLoginDetails().role == 0 ?
                        data.availability.map(date => {
                            return <tr>
                                <td>{moment(date.date).format("MMM DD")}</td>
                                <td><pre>{date.startTime} - {date.endTime}</pre></td>
                                <td>{date.isAvailable  ? "Yes" : "No"}</td>
                            </tr>
                        })
                        :
                        <Book_appointment availability={data.availability}/>
                    }
                </table>

            </ModalBody>
        </Modal>

    )
}


export default Professor_modal