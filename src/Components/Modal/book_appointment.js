import React from 'react'
import moment from 'moment'
import Button from 'react-bootstrap/Button';  
import {convertHMS } from '../tutorDashboard'
import {getLoginDetails} from '../../Common/utils'

function Book_appointment(props) {

  
  return (
    props.availability.filter(date => {
        return date.isAvailable 
    }).map(date => {
      return <tr>
        <td>{moment(date.date).format("MMM DD")}</td>
        <td><pre>{convertHMS( date.startTime)} - { convertHMS(date.endTime)}</pre></td>
        
        <td><Button variant="primary" onClick={() => {
          // console.log(date._id);
          const data = {
            id : "/"+date._id,
            body:{
              studentId : getLoginDetails()._id,
              isAvailable :false
            } 
          }
          props.bookAppointment(data)
        }}>Book Now</Button> </td>
      </tr>
    })
  )
}

export default Book_appointment