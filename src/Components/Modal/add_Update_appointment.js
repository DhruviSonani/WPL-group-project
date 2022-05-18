import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { getLoginDetails } from '../../Common/utils'
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup'
import Select from 'react-select';


import TimePicker from 'react-bootstrap-time-picker';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ADDNEWAPPOINTMENT, UPDATEAPPOINTMENT } from '../../Common/endPoints';

function Add_Update_appointment(props) {

  const appointment_opt = [
    { value: "online", label: "Online" },
    { value: 'in-person', label: "In person" }
  ]
  const initial = {
    courseId: props.profDetail.data.courseId,
    date: new Date(),
    startTime: 46800,
    endTime: 50400,
    mode: appointment_opt[0].value,
    location: "",
    tutorId: props.profDetail.data.tutorId,
    // studentId: null,
    isAvailable: true
  }

  const [initialValues, setInitialValues] = useState(initial)

  useEffect(async () => {
    if (props.profDetail.data._id) {
      await props.getStudentdetails({ id: props.profDetail.data.studentId })
      setInitialValues(props.profDetail.data)
    }
  }, [])

  const validationSchema = Yup.object().shape({
    // date: Yup.string().required("Date can not be empty!"),
    // startTime: Yup.string().required("Start time can not be empty!"),
    // endTime: Yup.string().required("End time can not be empty!"),
    // mode: Yup.string().required("Please specify meeting mode!"),
    location: Yup.string().required("Meeting location can not be empty!")
  })


  return (
    <Modal className='prof_detail_modal' isOpen={props.profDetail} toggle={() => props.toggleProfDetails(false)}>
      <ModalHeader toggle={() => props.toggleProfDetails(false)}>
        {props.profDetail.data._id ? 
        initialValues.isAvailable ?
        "Update Appointment" :
        `Appointment with ${props.particular_student?.firstName}`
         : "Add Appointment"}
      </ModalHeader>
      <ModalBody>
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={val => {
            let data;
            val.isAvailable = true
            val.studentId = ""
            if (props.profDetail.data._id) {
              data = {
                method: 'put',
                data: val,
                endPoint: UPDATEAPPOINTMENT + "/" + props.profDetail.data._id
              }
            }
            else {
              data = {
                method: 'post',
                data: val,
                endPoint: ADDNEWAPPOINTMENT
              }
            }
            props.addUpdateAppointment(data)
          }

          }
        >

          {({ values, errors, touched }) => (
            <Form>
              <label for="date">Appointment Date</label>
              <DatePicker
                name="date"
                minDate={new Date()}
                selected={values.date ? new Date(String(values.date)) : new Date()}
                onChange={(date) => {
                  setInitialValues({ ...initialValues, date: date })
                }
                }
              />

              <label for="startTime">Start Time</label>
              <TimePicker
                className='time-picker'
                onChange={(time) => {
                  setInitialValues({ ...initialValues, startTime: time })
                }}
                value={parseInt(values?.startTime) || 1800}
                name='startTime'
              />

              <label for="endTime">End Time</label>
              <TimePicker
                className='time-picker'
                onChange={(time) => {
                  setInitialValues({ ...initialValues, endTime: time })
                }}
                value={parseInt(values?.endTime) || 3600}
                name='endTime'
              />

              <label for="mode">Appointment Mode</label>
              <Select
                value={values.mode}
                onChange={(val) => {
                  // values.mode = val
                  setInitialValues({ ...initialValues, mode: val })
                }}
                options={appointment_opt}
              />

              <label for="location">Appointment Location</label>
              <Field type="text"
                defaultValue={values.location}
                name="location" placeholder="Enter Appointment Location" />

              <input type="submit" value={props.profDetail.data._id ? "Update" : "Add"} />

            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>

  )
}

export default Add_Update_appointment
