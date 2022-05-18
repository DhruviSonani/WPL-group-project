import React, { useRef, useState, useEffect, useContext } from 'react';
import { Navigate } from "react-router-dom";
import {setLoginDetails, getLoginDetails} from '../Common/utils'

function Login(props) {

  const intialValues = { email: "", pwd: "" };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(formValues);
    props.loginHandler(formValues)
  };

  useEffect(() => {
    console.log(props.loginS);
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
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.pwd) {
      errors.pwd = "Cannot be blank";
    } else if (values.pwd.length < 4) {
      errors.pwd = "pwd must be more than 4 characters";
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

          <button type="submit">Sign In</button>
        </form>
      </div>
    }
  </>

}

export default Login
