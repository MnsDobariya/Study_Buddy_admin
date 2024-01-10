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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash, faKey, faXmark } from "@fortawesome/free-solid-svg-icons";
// import '../../authentication/sign-in/index.css';



function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const [lgnFormData, setLgnFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    // console.log("lgnFormData",e.target.value);
    setLgnFormData({
      ...lgnFormData,
      [e.target.name]: e.target.value
    })
    
  }

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const navigate = useNavigate();

  const SingIn = () => {

    const error = {};

    const emailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!lgnFormData.email) {
      error.email = "Please Email Required";
    } else if (!emailRegx.test(lgnFormData.email)) {
      error.email = "Invalid Email";
    }


    const passwordRegx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
    if (!lgnFormData.password) {
      error.password = "Please Password Required";
    } else if (!passwordRegx.test(lgnFormData.password)) {
      error.password = "Invalid Password";
    }

    if (error.email || error.password) {
      setError(error);
      return;
    }

    const body = {
      email: lgnFormData.email,
      password: lgnFormData.password,
    }

    // axios.post("http://localhost:3000/api/v1/admin/login", body)
    ApiPost(`${EndPoint.USER_LOGIN}`, body)

      .then((res) => {
        // console.log("res", res);
        if (res.status === 200) {
          setLgnFormData({
            email: '',
            password: '',
          })
        }
        // console.log("token", res);
        localStorage.setItem("token", res.data.token.access.token)
        localStorage.setItem("firstName", res.data.admin.firstName)
        navigate('/dashboard')
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

  const onKeyBtn = (e) => {
    if (e.key === "Enter")
      SingIn();
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
            <SoftBox style={{ display: "flex" }}>
              {/* <div className="input-group-prepend">
                <span ><FontAwesomeIcon icon={faEnvelope} style={{ color: "black", marginTop: "3%" }} /></span>
              </div> */}
              <SoftInput
                type="email"
                name="email"
                value={lgnFormData.email}
                placeholder="Email"
                onChange={(e) => {
                  setError({
                    ...error,
                    email: "",
                  })
                  handleChange(e);
                }}
              />
            </SoftBox>
            {error.email && <p style={{ color: "red", fontSize: "60%" }}>{error.email}</p>}
          </SoftBox>
          <SoftBox mb={1} >
            <SoftBox mb={1} ml={0.5}>
              <SoftTypography component="label" variant="caption" fontWeight="bold">
                Password
              </SoftTypography>
            </SoftBox>
            <SoftBox style={{ display: "flex" }}>

              {/* <div style={{ display: "flex" }}> */}

              <SoftInput
                type={passwordVisible ? "text" : "password"}
                name="password"
                value={lgnFormData.password}
                placeholder="Password"
                onChange={(e) => {
                  setError({
                    ...error,
                    password: "",
                  })
                  handleChange(e);
                }}
                onKeyPress={(e) => onKeyBtn(e)}
              />
              <div className='input-group-append'>
                <span
                  className=''
                  onClick={togglePasswordVisibility}
                  style={{
                    position: 'absolute',
                    // right: '40%',
                    // top: '431px',  
                    // right:"1px",
                    left: "38%",
                    transform: 'translateY(11%)',
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

            </SoftBox>
            {error.password && <p style={{ color: "red", fontSize: "60%" }}>{error.password}</p>}
          </SoftBox>
          <SoftBox display="flex" alignItems="center" mt={2}>
            <Switch checked={rememberMe} onChange={handleSetRememberMe} />
            <SoftTypography
              variant="button"
              fontWeight="regular"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;Remember me

            </SoftTypography>

            <SoftTypography
              component={Link}
              to="/authentication/verify-email"
              variant="button"
              color="info"
              ml={4}
              fontWeight="medium"
              textGradient
            >
              Forgot your Password?
            </SoftTypography>
          </SoftBox>

          <SoftBox mt={4} mb={1}>
            <SoftButton variant="gradient" color="info" fullWidth onClick={SingIn}>
              sign in
            </SoftButton>
          </SoftBox>
          <SoftBox mt={3} textAlign="center">
            <SoftTypography variant="button" color="text" fontWeight="regular">
              Don&apos;t have an account?{" "}
              <SoftTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="info"
                fontWeight="medium"
                textGradient
              >
                Sign up
              </SoftTypography>
            </SoftTypography>
          </SoftBox>

        </SoftBox>
      </CoverLayout>
      <ToastContainer />
    </>
  );
}




export default SignIn;
