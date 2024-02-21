import { useState } from "react";

// react-router-dom components
import { Link, generatePath, redirect, useNavigate } from "react-router-dom";

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
import OTPInput from "react-otp-input";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function EmailVerify() {

  const [vrfyEmail, setVrfyEmail] = useState({
    email: '',
  });

  const [OTP, setOTP] = useState('');

  const [error, setError] = useState({
    email: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setVrfyEmail({
      ...vrfyEmail,
      [e.target.name]: e.target.value
    })
  }

  const getOTP = () => {

    const error = {};

    const emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!vrfyEmail.email) {
      error.email = "Please Email Required";
    } else if (!emailRegx.test(vrfyEmail.email)) {
      error.email = "Invalid Email";
    }

    if (error.email) {
      setError(error);
      return;
    }
    const body = {
      email: vrfyEmail.email
    }

    // axios.post("http://localhost:3000/api/v1/auth/send-otp", body)
    ApiPost(`${EndPoint.USER_VERIFY_EMAIL}`, body)
      .then((res) => {
        if (res.status === 200) {
          toast.success(<p style={{ fontSize: "80%" }}>{"OTP sent your Email"}</p>, {
            position: "top-center"
          })
        }
      }).catch((error) => {
        if (error.response.data.message === "email not found") {
          toast.error(<p style={{ fontSize: "80%" }}>{"email not found..!"}</p>, {
            position: "top-center",

          });
        }
      });
  };

  const handleVerify = () => {
    const body = {
      email: vrfyEmail.email,
      generateOTP: OTP
    }

    // axios.post("http://localhost:3000/api/v1/auth/verify-otp", body)
    ApiPost(`${EndPoint.USER_VERIFY_OTP}`, body,)
      .then((res) => {
        if (res.status === 200) {
          toast.success(<p style={{ fontSize: "80%" }}>{"OTP Verification Successfully"}</p>, {
            position: "top-center"
          })
        }
        navigate("/authentication/forgot-password", { state: { token: res.data.newAdmin.token } })

      }).catch((error) => {
        if (error.error === "Invalid OTP.") {
          toast.error(<p style={{ fontSize: "80%" }}>{"Invalid OTP...!"}</p>, {
            position: "top-center",
          });
        }
      });
  }
  const onKeyBtn = (e) => {
    if (e.key === "Enter")
      getOTP();
  }

  return (
    <>
      <CoverLayout
        title="Welcome back"
        description="Enter your email and password to sign in"
        image={curved9}
      >
        <SoftBox component="form" role="form"  >
          <SoftBox mb={1} >
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Email
              </SoftTypography>
            </SoftBox>
            <SoftBox>
              <div style={{ display: "flex" }}>
                {/* <FontAwesomeIcon icon={faEnvelope} style={{marginTop:"3%"}}/> */}
                <SoftInput
                  type="email"
                  name="email"
                  value={vrfyEmail.email}
                  placeholder="Email"
                  onChange={(e) => {
                    setError({
                      ...error,
                      email: "",
                    })
                    handleChange(e);
                  }}
                  onKeyPress={(e) => onKeyBtn(e)}
                />
                <SoftButton variant="gradient" color="info" onClick={getOTP} style={{ position: "absolute", transform: 'translateY(0%)', left: "38.1%",  cursor: 'pointer',width: "60px",border:"0px",outline:"none" }}>
                  send
                </SoftButton>
              </div>
                {error.email && <p style={{ color: "red", fontSize: "60%" }}>{error.email}</p>}

            </SoftBox>
          </SoftBox>
          <SoftBox mb={1} >
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                OTP
              </SoftTypography>
            </SoftBox>
            <OTPInput
              value={OTP}
              onChange={setOTP}
              numInputs={6}
              renderSeparator={<span> -</span>}
              inputStyle={{ width: "3.5rem", height: "2.5rem" }}
              renderInput={(props) => <input{...props} />}
            />

          </SoftBox>
           
            <SoftTypography
              component={Link}
              to="/authentication/verify-email"
              variant="button"
              color="info"
              ml={30}
              onClick={getOTP}
              fontWeight="medium"
              textGradient
            >
              Resend OTP
            </SoftTypography>

          <SoftBox mt={4} mb={1} >
            <SoftButton variant="gradient" color="info" style={{width:"110.3%",border:"0px",outline:"none"}} onClick={handleVerify}>
              Verify OTP
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </CoverLayout >
      <ToastContainer />
    </>
  );
}




export default EmailVerify;
