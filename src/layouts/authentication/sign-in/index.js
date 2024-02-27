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
import { faCheck, faEnvelope, faEye, faEyeSlash, faKey, faXmark } from "@fortawesome/free-solid-svg-icons";
import '../sign-in/SignIn.css';



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

  const valid = (item, v_icon, inv_icon) => {
    const text = document.querySelector(`#${item}`);
    text.style.opacity = "1";

    const valid_icon = document.querySelector(`#${item} .${v_icon}`);
    valid_icon.style.opacity = "1";

    const invalid_icon = document.querySelector(`#${item} .${inv_icon}`);
    invalid_icon.style.opacity = "0";
  };

  const Invalid = (item, v_icon, inv_icon) => {
    const text = document.querySelector(`#${item}`);
    text.style.opacity = ".5";

    const valid_icon = document.querySelector(`#${item} .${v_icon}`);
    valid_icon.style.opacity = "0";

    const invalid_icon = document.querySelector(`#${item} .${inv_icon}`);
    invalid_icon.style.opacity = "1";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const textRegex = /^[A-Za-z\s]+$/;

    setLgnFormData({
      ...lgnFormData,
      [name]: value,
    });

    if (name === "firstName" || name === "lastName") {
      if (!textRegex.test(value)) {
        setError({
          ...error,
          [name]: "Please Enter Text Only",
        });
      } else {
        setError({
          ...error,
          [name]: "",
        })
      }
    }

    if (name === "password") {
      if (value.match(/[A-Z]/) != null) {
        valid('capital', 'fa-check', 'fa-times');
      } else {
        Invalid("capital", "fa-check", "fa-times");
      }
      if (value.match(/[0-9]/) != null) {
        valid('num', 'fa-check', 'fa-times');
      } else {
        Invalid("num", "fa-check", "fa-times");
      }
      if (value.match(/[!@#$%^&*]/) != null) {
        valid('char', 'fa-check', 'fa-times');
      } else {
        Invalid("char", "fa-check", "fa-times");
      }
      if (value.length > 7) {
        valid('more8', 'fa-check', 'fa-times');
      } else {
        Invalid("more8", "fa-check", "fa-times");
      }
    }

    return;
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

    ApiPost(`${EndPoint.USER_LOGIN}`, body)
      .then((res) => {
        if (res.status === 200) {
          setLgnFormData({
            email: '',
            password: '',
          })
        }
        localStorage.setItem("token", res.data.token.access.token)
        localStorage.setItem("firstName", res.data.admin.firstName)
        localStorage.setItem("id", res.data.admin.id)
        localStorage.setItem("role",res.data.admin.role)
        // console.log('res.data', res.data)
        navigate('/dashboard')
        toast.success("Login Successfully");
      })

      .catch((error) => {
        if (error.error === "Incorrect Email or Password") {
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
                autoComplete="off"
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
            <div className='validation'>
              <p id='capital'>
                {/* <FontAwesomeIcon className="fa-times icon" icon={faCircleXmark} /> */}
                <FontAwesomeIcon className="fa-times icon" icon={faXmark} />
                <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                <span>Capital Letters</span>
              </p>
              <p id='char'>
                {/* <FontAwesomeIcon className="fa-times icon" icon={faCircleXmark} /> */}
                <FontAwesomeIcon className="fa-times icon" icon={faXmark} />
                <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                <span>Special Characters</span>
              </p>
              <p id='num'>
                {/* <FontAwesomeIcon className="fa-times icon" icon={faCircleXmark} /> */}
                <FontAwesomeIcon className="fa-times icon" icon={faXmark} />
                <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                <span>Use Number</span>
              </p>
              <p id='more8'>
                {/* <FontAwesomeIcon className="fa-times icon" icon={faCircleXmark} /> */}
                <FontAwesomeIcon className="fa-times icon" icon={faXmark} />
                <FontAwesomeIcon className="fa-check icon" icon={faCheck} />
                <span>8. characters</span>
              </p>
            </div>
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
            <SoftButton variant="gradient" color="info" fullWidth onClick={SingIn} style={{border:"0px",outline:"none"}}>
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
