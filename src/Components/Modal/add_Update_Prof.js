import React, { useState, useEffect } from 'react'
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import Select from 'react-select';
import * as Yup from 'yup'
import { Formik, Form, Field, FieldArray } from 'formik';

import "react-datepicker/dist/react-datepicker.css";
import { ADDTUTOR, UPDATETUTOR } from '../../Common/endPoints';

import axios from '../../Common/axiosInstance'

function Add_Update_Professor_modal(props) {

    const [selectedOption, setSelectedOptins] = useState([])
    const tempA = { date: '', start_time: '', end_time: '', isAvailable: true }
    // const [dateTime, setDateTime] = useState([tempA])

    const [fileInputState, setFileInputState] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState()

    const initial = {
        fname: '',
        lname: '',
        email: '',
        courses: [],
        about: '',
        image: '',
        // availability: [tempA]
    }

    const [initialValues, setInitialValues] = useState(initial)
    useEffect(() => {
        props.getAllCourses()

        if (props.profDetail.id) {
            const data = props.tutorData.find(item => {
                return item._id == props.profDetail.id
            })
            setInitialValues(data)
            setSelectedOptins(data.courses)
            // const exp = data.
        }

        return () => props.fetchTutorData()
    }, [])

    const validationSchema = Yup.object().shape({
        fname: Yup.string().required('First name can not be empty!'),
        lname: Yup.string().required('Last name can not be empty!'),
        email: Yup.string().email('You have entered invalid email!').required('Email id is Required!'),
        courses: Yup.array().min(1, "At least one courses is required!")
    })

    const previewFile = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }

    const handleFileInputChange = (e) => {
        const file = e.target.files[0]
        previewFile(file)
    }


    // useEffect(()=>{        
    //     if (!previewSource) {
    //         return
    //     }
    //     uploadImage(previewSource)
    // }, [previewSource] )

    const uploadImage = async (base64EncodedImage) => {
        try {
            await axios({
                method: 'POST',
                data: JSON.stringify({data:base64EncodedImage}),
                url: '/tutors/upload',
                headers: {
                    "Content-type": 'application/json'
                }
            }
            ).then(resp=>{
                return resp.data.resp.secure_url
            }).catch(err=>{
                console.log(err);
            })
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <Modal className='prof_detail_modal' isOpen={props.profDetail} toggle={() => props.toggleProfDetails(false)}>
            <ModalHeader toggle={() => props.toggleProfDetails(false)}>{props.profDetail.id ? "Edit " : "Add "}Professor</ModalHeader>
            <ModalBody>
                <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async val => {

                        // if (!previewSource) {
                        //     return
                        // }
                        // val.image = await uploadImage(previewSource)

                        try {
                            await axios({
                                method: 'POST',
                                data: JSON.stringify({data:previewSource}),
                                url: '/tutors/upload',
                                headers: {
                                    "Content-type": 'application/json'
                                }
                            }
                            ).then(resp=>{
                                val.image = resp.data.resp.secure_url
                            }).catch(err=>{
                                console.log(err);
                            })
                        }
                        catch (err) {
                            console.log(err);
                        }

                        val.name = (val.fname).trim() + ' ' + (val.lname).trim()
                        val.about = document.getElementById("about").value
                        // val.availability = dateTime
                        val.courses = selectedOption.map(item => {
                            return item.value
                        })

                        console.log("value : ", val)
                        if (props.profDetail.id) {
                            // Update Tutor
                            const data = {
                                data: val,
                                method: 'put',
                                endPoint: UPDATETUTOR
                            }
                            await props.addUpdateTutor(data)
                        }
                        else {
                            // Add Tutor
                            const data = {
                                data: val,
                                method: 'post',
                                endPoint: ADDTUTOR
                            }
                           await props.addUpdateTutor(data)
                        }
                    }}
                >
                    {({ values, errors, touched }) => (
                        <Form>
                            <label for="fname">First Name</label>
                            <Field type="text" name="fname" placeholder="Enter First Name" />
                            {errors.fname && touched.fname ? <div className='error'>{errors.fname}</div> : null}

                            <label for="lname">Last Name</label>
                            <Field type="text" name="lname" placeholder="Enter First Name" />
                            {errors.lname && touched.lname ? <div className='error'>{errors.lname}</div> : null}

                            <label for="email">Email</label>
                            <Field type="text" name="email" placeholder="Enter Email ID" />
                            {errors.email && touched.email ? <div className='error'>{errors.email}</div> : null}

                            <label for="courses" >Expertise</label>
                            <Select
                                isMulti={true}
                                value={selectedOption}
                                onChange={(val) => {
                                    setSelectedOptins(val)
                                    values.courses = val
                                }}
                                options={props.courseData}
                            />
                            {errors.courses && touched.courses ? <div className='error'>{errors.courses}</div> : null}

                            <label for="about">Description</label>
                            <textarea
                                id="about"
                                type="text"
                                name="about"
                                defaultValue={values.about}
                                placeholder='Describe a Tutor'
                            />
                            {errors.about && touched.about ? <div className='error'>{errors.about}</div> : null}

                            <label class="form-label" for="image">Profile image</label>
                            {/* <input type="file" class="form-control"  name="image" id="image" accept="image/png, image/gif, image/jpeg" /> */}

                            <input type="file"
                                class="form-control"
                                name="image"
                                id="image"
                                value={fileInputState}
                                onChange={handleFileInputChange}
                                accept="image/png, image/gif, image/jpeg" />

                            <input type="submit" value={props.profDetail.id ? "Update" : "Add"} />
                        </Form>
                    )}
                </Formik>

                {
                    previewSource &&
                    <img src={previewSource} alt="tutor_image" />

                }
            </ModalBody>
        </Modal>
    )
}


export default Add_Update_Professor_modal



// <label for="availability" >Meeting slot</label>

// <FieldArray
//     name="availability">
//     {arrayHelpers => (
//         <div>
//             {

//                 values.availability.map((item, index) => (
//                     <div key={index} className="d-flex">
//                         <div className='time-picker'>
//                             <DatePicker
//                                 selected={dateTime[index]['date'] || new Date()}
//                                 onChange={(date) => {
//                                     const a = dateTime.map((item1, id) => {
//                                         if (id == index) {
//                                             return { ...item1, "date": date }
//                                         }
//                                         return item1

//                                     })
//                                     setDateTime(a)
//                                 }
//                                 }
//                             />
//                         </div>
//                         <TimePicker
//                             className='time-picker'
//                             onChange={(time) => {
//                                 const a = dateTime.map((item1, id) => {
//                                     if (id == index) {
//                                         return { ...item1, "start_time": time }
//                                     }
//                                     return item1
//                                 })
//                                 setDateTime(a)
//                             }}
//                             value={dateTime[index]['start_time']}
//                             name={`availability[${index}]['start_time']`}
//                         />

//                         <TimePicker
//                             className='time-picker'
//                             onChange={(time) => {
//                                 const a = dateTime.map((item1, id) => {
//                                     if (id == index) {
//                                         return { ...item1, "end_time": time }
//                                     }
//                                     return item1
//                                 })
//                                 setDateTime(a)
//                             }}
//                             value={dateTime[index]['end_time']}
//                             name={`availability[${index}]['end_time']`}
//                         />
//                         {index > 0 && <input
//                             type="button"
//                             value="-"
//                             className='add-button'
//                             onClick={() => {
//                                 let temp = dateTime.splice(index - 1, 1)

//                                 setDateTime(temp)
//                                 arrayHelpers.remove(index - 1)
//                             }
//                             }
//                         />
//                         }
//                         <input
//                             className='add-button'
//                             type="button"
//                             value="+"
//                             onClick={() => {
//                                 let temp = tempA
//                                 console.log(">> dateTime : ", dateTime)
//                                 temp = dateTime.push(temp)
//                                 console.log("dateTime : ", dateTime)
//                                 setDateTime(dateTime)
//                                 arrayHelpers.push(temp)
//                             }}
//                         />
//                     </div>
//                 ))
//             }
//         </div>
//     )}
// </FieldArray>
