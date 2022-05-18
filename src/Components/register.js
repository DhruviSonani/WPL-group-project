import React, { useRef, useState, useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import { useHistory ,useLocation } from 'react-router-dom';
import {setLoginDetails, getLoginDetails} from '../Common/utils'

function Register(props) {

  const intialValues = { email: "", pwd: "", cpwd:"" };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);

      console.log();
    setFormValues({...formValues, email:urlParams.get('email')})
  },[])

  const submit = () => {
    console.log(formValues);
    props.registerHandler({data : formValues})
  };

  useEffect(() => {
    if(props.loginS){
      setLoginDetails(props.loginS)
    }
  }, [props.loginS])

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    
    if (!values.pwd) {
      errors.pwd = "Cannot be blank";
    } else if (values.pwd.length < 4) {
      errors.pwd = "pwd must be more than 4 characters";
    }

    if (!values.cpwd) {
        errors.cpwd = "Cannot be blank";
      } else if (values.cpwd.length < 4) {
        errors.cpwd = "confirm pwd must be more than 4 characters";
      }else if (values.pwd != values.cpwd){
          errors.cpwd = "Password doesn't matched!"
      }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return <>
    { (props.loginS && Object.keys(props.loginS)?.length > 0   
    ||  getLoginDetails() != undefined
    )
    ?
            <Navigate to="/dashboard" replace={true} />
         :
      <div className="container login-wrapper">
        <h1>Sign in to continue</h1>
        {Object.keys(formErrors).length === 0 && isSubmitting && (
          <span className="error-msg">Please check your credentials!</span>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              disabled
              value={formValues.email}
              onChange={handleChange}
              className={formErrors.email && "input-error"}
            />
            {formErrors.email && (
              <span className="error">{formErrors.email}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="pwd">Password</label>
            <input
              type="password"
              name="pwd"
              id="pwd"
              value={formValues.pwd}
              onChange={handleChange}
              className={formErrors.pwd && "input-error"}
            />
            {formErrors.pwd && (
              <span className="error">{formErrors.pwd}</span>
            )}
          </div>

          <div className="form-row">
            <label htmlFor="pwd">Confirm Password</label>
            <input
              type="password"
              name="cpwd"
              id="cpwd"
              value={formValues.cpwd}
              onChange={handleChange}
              className={formErrors.cpwd && "input-error"}
            />
            {formErrors.cpwd && (
              <span className="error">{formErrors.cpwd}</span>
            )}
          </div>

          <button type="submit">Sign Up</button>
        </form>
      </div>
    }
  </>

}

export default Register
