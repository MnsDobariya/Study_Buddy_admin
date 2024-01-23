

import { useState } from "react";

// react-router-dom components
import { Link, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import Socials from "layouts/authentication/components/Socials";
import Separator from "layouts/authentication/components/Separator";

// Images
import curved6 from "assets/images/curved-images/curved14.jpg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ApiPost } from "config/Api/ApiData";
import { EndPoint } from "config/EndPoint/Endpoint";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function SignUp() {
  const [agreement, setAgremment] = useState(true);

  const [regFormData, setRegFormData] = useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });

  const [error, setError] = useState({
    FirstName: "",
    LastName: "",
    Mobile: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  // const toastify = () => {
  // }

  const SignUp = () => {


    const error = {};
    if (!regFormData.FirstName) {
      error.FirstName = "Please FirstName Required";
    }

    if (!regFormData.LastName) {
      error.LastName = "Please LastName Required";
    }

    const mobileRegex = /^\d+$/;
    if (!regFormData.Mobile) {
      error.Mobile = "Please Mobile Required";
    } else if (!mobileRegex.test(regFormData.Mobile)) {
      error.Mobile = "Invalid Mobile";
    }

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regFormData.Email) {
      error.Email = "Please Email Required";
    } else if (!emailRegex.test(regFormData.Email)) {
      error.Email = "Invalid Email";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
    if (!regFormData.Password) {
      error.Password = "Please Password Required";
    } else if (!passwordRegex.test(regFormData.Password)) {
      error.Password = "Invalid Password";
    }

    const ConfirmPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
    if (!regFormData.ConfirmPassword) {
      error.ConfirmPassword = "Please ConfirmPassword Required";
    } else if (!ConfirmPasswordRegex.test(regFormData.ConfirmPassword)) {
      error.ConfirmPasswordRegex = "Invalid Password";
    }

    if (
      error.FirstName ||
      error.LastName ||
      error.Mobile ||
      error.Email ||
      error.Password
    ) {
      setError(error);
      return;
    }

    const body = {
      firstName: regFormData.FirstName,
      lastName: regFormData.LastName,
      phone: regFormData.Mobile,
      email: regFormData.Email,
      password: regFormData.Password,
    }


    ApiPost(`${EndPoint.USER_REGISTER}`, body)
      .then((res) => {
        if (res.status === 201) {
          setRegFormData({
            FirstName: "",
            LastName: "",
            Mobile: "",
            Email: "",
            Password: "",
            ConfirmPassword: ""
          })
        }
        navigate('/authentication/sign-in')
      })
      .catch((error) => {
        if (error.error === "User already register") {
          toast.error(<p style={{ fontSize: "80%" }}>{"User already registered"}</p>, {
            position: "top-center",
          });
        }
      });
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    const textRegex = /^[A-Za-z\s]+$/;

    if (name === "FirstName" || name === "LastName") {
      if (!textRegex.test(value)) {
        setError({
          ...error,
          [name]: "Please enter text only",
        });
        return;
      }
    }
    setRegFormData({
      ...regFormData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSetAgremment = () => setAgremment(!agreement);
  const navigate = useNavigate();

  const onKeyBtn = (e) => {
    if (e.key === "Enter")
      SignUp();
  }

  return (
    <>
      <BasicLayout
        title="Welcome!"
        // description="Use these awesome forms to login or create new account in your project for free."
        image={curved6}
      >
        <Card >
          <SoftBox p={3} mb={0} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              Register with
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={1} >
            <Socials />
          </SoftBox>
          <Separator />
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form" height="100%">
              <SoftBox mb={1} mt={0}>
                <SoftInput
                  type="text"
                  name="FirstName"
                  value={regFormData.FirstName}
                  placeholder="First Name"
                  onChange={(e) => {
                    setError({
                      ...error,
                      FirstName: ""
                    })
                    handleChange(e)
                  }}
                />
                {error.FirstName && <p style={{ color: "red", fontSize: "60%" }}>{error.FirstName} </p>}
              </SoftBox>
              <SoftBox mb={1} mt={0}>
                <SoftInput
                  type="text"
                  name="LastName"
                  value={regFormData.LastName}
                  placeholder="Last Name"
                  onChange={(e) => {
                    setError({
                      ...error,
                      LastName: ""
                    })
                    handleChange(e)
                  }}
                />
                {error.LastName && <p style={{ color: "red", fontSize: "60%" }}>{error.LastName} </p>}

              </SoftBox>
              <SoftBox mb={1} mt={0}>
                <SoftInput
                  type="text"
                  name="Mobile"
                  value={regFormData.Mobile}
                  placeholder="Mobile"
                  onChange={(e) => {
                    const input = e.target.value;
                    const regex = /^[0-9\b]+$/;
                    if (input === '' || regex.test(input) && input.length <= 10 ) {
                      setError({
                        ...error,
                        Mobile: "",
                      });
                      handleChange(e);
                    } else {
                      setError({
                        ...error,
                        Mobile: "Please enter valid 10-digit mobile number",
                      })
                    }
                  }}
                />
                {error.Mobile && <p style={{ color: "red", fontSize: "60%" }}>{error.Mobile} </p>}

              </SoftBox>
              <SoftBox mb={1} mt={0}>
                <SoftInput
                  type="email"
                  name="Email"
                  value={regFormData.Email}
                  placeholder="Email"
                  onChange={(e) => {
                    setError({
                      ...error,
                      Email: ""
                    })
                    handleChange(e)
                  }}
                />
                {error.Email && <p style={{ color: "red", fontSize: "60%" }}>{error.Email} </p>}

              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  type={passwordVisible ? "text" : "password"}
                  name="Password"
                  value={regFormData.Password}
                  placeholder="Password"
                  onChange={(e) => {
                    setError({
                      ...error,
                      Password: ""
                    })
                    handleChange(e)
                  }}
                  onKeyPress={(e) => onKeyBtn(e)}
                />
                <div className='input-group-append'>
                  <span
                    className='icon'
                    onClick={togglePasswordVisibility}
                    style={{
                      position: 'absolute',
                      // right: '40%',
                      // top: '66%',
                      right:"30px",
                      // left: "48%",
                      transform: 'translateY(-110%)',
                      cursor: 'pointer',
                    }}
                  >
                    {passwordVisible ? (
                      <FontAwesomeIcon icon={faEye} /> // Eye slash icon for showinh password
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} /> // Eye icon for hide password
                    )}
                  </span>
                  {/* </div> */}
                </div>
                {error.Password && <p style={{ color: "red", fontSize: "60%" }}>{error.Password} </p>}

              </SoftBox>

              <SoftBox display="flex" alignItems="center">
                <Checkbox checked={agreement} onChange={handleSetAgremment} />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={handleSetAgremment}
                  sx={{ cursor: "poiner", userSelect: "none" }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </SoftTypography>
                <SoftTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  textGradient
                >
                  Terms and Conditions
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={4} mb={1}>
                <SoftButton variant="gradient" color="dark" fullWidth onClick={SignUp}>
                  sign up
                </SoftButton>
              </SoftBox>
              <SoftBox mt={3} textAlign="center">
                <SoftTypography variant="button" color="text" fontWeight="regular">
                  Already have an account?&nbsp;
                  <SoftTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="dark"
                    fontWeight="bold"
                    textGradient
                  >
                    Sign in
                  </SoftTypography>
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </BasicLayout>
      {/* <ToastContainer/> */}
    </>
  );
}

export default SignUp;
