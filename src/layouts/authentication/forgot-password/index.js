import { useState } from "react";

// react-router-dom components
import { Link, redirect, useNavigate } from "react-router-dom";

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


function ForgotEmail() {
  const [forgotPasswd, setForgotPasswd] = useState({
    password: '',
    confirmPassword: ''
  })

  const navigate = useNavigate();

  const [error, setError] = useState({
    password: '',
    confirmPassword: ''
  });

  const resetPassword = () => {

    const error = {};

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
    if (!forgotPasswd.password) {
      error.password = "Please Password Required";
    } else if (!passwordRegex.test(forgotPasswd.password)) {
      error.password = "Invalid Password";
    }

    const confirmPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
    if (!forgotPasswd.confirmPassword) {
      error.confirmPassword = "Please Confirm Password Required";
    } else if (!confirmPasswordRegex.test(forgotPasswd.confirmPassword)) {
      error.confirmPasswordRegex = "Invalid Password";
    }

    if (error.password || error.ConfirmPassword) {
      setError(error);
      return;
    }
    const body = {
      password: forgotPasswd.password,
      confirmPassword: forgotPasswd.confirmPassword
    }

    axios.post("http://localhost:3000/api/v1/auth/reset-password", body)
      // ApiPost(`${EndPoint.USER_LOGIN}`, body)
      .then((res) => {

        // console.log("res", res);
        if (res.status === 200) {
          setForgotPasswd({
            password: '',
            confirmPassword:''
          })
        }

        navigate("/authentication/sign-in")

      })

      .catch((error) => {
        console.log("err", error);
        if (error.response.data.message === "Incorrect email or password") {
          toast.error(<p style={{ fontSize: "80%" }}>{"Incorrect email or password..!"}</p>, {
            position: "top-center",

          });
        }
      });
  };
  const handleChange = (e) => {
    // console.log("lgnFormData",e.target.value);
    setForgotPasswd({
      ...forgotPasswd,
      [e.target.name]: e.target.value
    })
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
            <SoftInput
              type="password"
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
            {error.password && <p style={{ color: "red", fontSize: "60%" }}>{error.password}</p>}
          </SoftBox>
          <SoftBox mb={1} >
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Confirm Password
              </SoftTypography>
            </SoftBox>
            <SoftInput
              type="password"
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
            />
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
