import React, { useState } from 'react'
import { Formik, Form, Field, FieldArray } from 'formik';
import { Modal, Button } from "react-bootstrap";
import { Rating } from 'react-simple-star-rating'
import { getLoginDetails } from '../../Common/utils';

function Rate_dialog(props) {
    const { id, name } = props.profDetail
    const [rating, setRating] = useState(0) // initial rating value

    const handleRating = (rate) => {
        setRating(rate)
    }

    return (

        <Modal show={id} onHide={() => props.toggleProfDetails(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Provide Feedback</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="alert alert-danger">
                    <>
                        <Rating onClick={handleRating} ratingValue={rating} />
                        <textarea
                            id="about"
                            type="text"
                            name="about"
                            style={{ marginTop: '15px' }}
                            placeholder={`Enter Feedback for ${name}`}
                        />
                    </>

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="default" onClick={() => {
                    const data = {
                        tutorId : id, //tutor ID
                        studentId : getLoginDetails()._id,
                        rate : rating,
                        desc : document.getElementById("about").value
                    }
                    props.addFeedback({id: "/"+data.tutorId+"_"+data.studentId , data: data})
                }}>
                    Send Feedback
                </Button>
                <Button variant="danger" onClick={() => {
                    //   onDelete()

                }}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>

    )
}

export default Rate_dialog