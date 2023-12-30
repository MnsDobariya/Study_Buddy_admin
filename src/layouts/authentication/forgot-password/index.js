import { useState } from "react";

// react-router-dom components
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { token } from "stylis";
import DefaultNavbarLink from "examples/Navbars/DefaultNavbar/DefaultNavbarLink";
import routes from "routes";
import { ApiPost } from "config/Api/ApiData";
import { EndPoint } from "config/EndPoint/Endpoint";
import { faEye, faEyeSlash, faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ForgotEmail() {
  const [forgotPasswd, setForgotPasswd] = useState({
    password: '',
    confirmPassword: ''
  })

  const location = useLocation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate();

  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  });

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
    return passwordRegex.test(password);
  };


  const resetPassword = () => {

    const error = {};


    if (!forgotPasswd.password) {
      error.password = "Password is required";
    } else if (!validatePassword(forgotPasswd.password)) {
      error.password = "Invalid Password";
    }

    if (!forgotPasswd.confirmPassword) {
      error.confirmPassword = "Confirm Password is required";
    } else if (forgotPasswd.password !== forgotPasswd.confirmPassword) {
      error.confirmPassword = "Passwords do not match";
    }

    if (error.password || error.confirmPassword) {
      setError(error);
      return;
    }

    const body = {
      password: forgotPasswd.password,
      confirmPassword: forgotPasswd.confirmPassword,
      token: location?.state?.token,
      // "token": "hello"
    }

    // axios.post("http://localhost:3000/api/v1/auth/forgot-password", body,

    console.log("265555");
    ApiPost(`${EndPoint.USER_FORGOT_PASSWORD}`, body)
      .then((res) => {

        console.log("res", res);
        if (res.status === 200) {
          setForgotPasswd({
            password: '',
            confirmPassword: ''
          })

          toast.success(<p style={{ fontSize: "80%" }}>{"Password Reset Successfully"}</p>, {
            position: "top-center"
          })
        }

        navigate("/authentication/sign-in")
      })

      .catch((error) => {
        console.log("err", error);
        // if (error.response.data.message === "Incorrect email or password") {
        //   toast.error(<p style={{ fontSize: "80%" }}>{"Incorrect email or password..!"}</p>, {
        //     position: "top-center",

        //   });
        // }
      });
  };
  const handleChange = (e) => {
    // console.log("lgnFormData",e.target.value);
    setForgotPasswd({
      ...forgotPasswd,
      [e.target.name]: e.target.value
    })
  }
  const onKeyBtn = (e) => {
    if (e.key === "Enter")
      resetPassword();
  }

  return (
    <>
      <CoverLayout
        title="Forgot Password"
        description="Enter your new password to Reset Password"
        image={curved9}
      >
        <SoftBox component="form" role="form"  >
          <SoftBox mb={1} >
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Password
              </SoftTypography>
            </SoftBox>
            <SoftBox style={{display:"flex"}}>
              {/* <FontAwesomeIcon icon={faKey} style={{marginTop:"3%"}}/> */}
            <SoftInput
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={forgotPasswd.password}
              placeholder="Password"
              onChange={(e) => {
                setError({
                  ...error,
                  password: "",
                })
                handleChange(e);
              }}
              
            />
            <span
              className='input-group-text'
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {passwordVisible ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
            {error.password && <p style={{ color: "red", fontSize: "60%" }}>{error.password}</p>}
          </SoftBox>
          </SoftBox>

          <SoftBox mb={1} >
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Confirm Password
              </SoftTypography>
            </SoftBox>
            <SoftBox style={{display:"flex"}}>
            {/* <FontAwesomeIcon icon={faKey}  style={{marginTop:"3%"}}/> */}
            <SoftInput
              type={passwordVisible ? "text" : "password"}
              name="confirmPassword"
              value={forgotPasswd.confirmPassword}
              placeholder="confirm Password"
              onChange={(e) => {
                setError({
                  ...error,
                  confirmPassword: "",
                })
                handleChange(e);
              }}
              onKeyPress={(e) => onKeyBtn(e)}
            />
            <span
              className='input-group-text'
              onClick={togglePasswordVisibility}
              style={{ cursor: "pointer" }}
            >
              {passwordVisible ? (
                <FontAwesomeIcon icon={faEye} />
              ) : (
                <FontAwesomeIcon icon={faEyeSlash} />
              )}
            </span>
            </SoftBox>
            {error.confirmPassword && <p style={{ color: "red", fontSize: "60%" }}>{error.confirmPassword}</p>}
          </SoftBox>

          <SoftBox mt={4} mb={1} style={{ display: "flex", justifyContent: "center", justifyContent: "space-evenly" }}>
            <SoftButton variant="gradient" color="info" fullWidth onClick={resetPassword}>
              Reset Password
            </SoftButton>
          </SoftBox>

        </SoftBox>
      </CoverLayout>
      <ToastContainer />
    </>
  );
}




export default ForgotEmail;
