import React, { useState } from 'react'
import '../landing/landing.css';
import SoftButton from 'components/SoftButton';
import SoftBox from 'components/SoftBox';
import { Source } from '@mui/icons-material';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import brand from '../layouts/img/original-removebg.png';
import { Card, Checkbox } from '@mui/material';
import SoftTypography from 'components/SoftTypography';
import SoftInput from 'components/SoftInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import image from '../layouts/img/header3.png';
import image1 from '../layouts/img/lib-img1.jpg';


const LandingPage = () => {
  // const [agreement, setAgremment] = useState(true);

  // const [regFormData, setRegFormData] = useState({
  //   FirstName: "",
  //   LastName: "",
  //   Mobile: "",
  //   Email: "",
  //   Password: "",
  //   ConfirmPassword: "",
  // });

  // const [error, setError] = useState({
  //   FirstName: "",
  //   LastName: "",
  //   Mobile: "",
  //   Email: "",
  //   Password: "",
  //   ConfirmPassword: "",
  // });
  // const [passwordVisible, setPasswordVisible] = useState(false);

  // const togglePasswordVisibility = () => {
  //   setPasswordVisible(!passwordVisible);
  // };

  // const SignUp = () => {


  //   const error = {};
  //   if (!regFormData.FirstName) {
  //     error.FirstName = "Please FirstName Required";
  //   }

  //   if (!regFormData.LastName) {
  //     error.LastName = "Please LastName Required";
  //   }

  //   const mobileRegex = /^\d+$/;
  //   if (!regFormData.Mobile) {
  //     error.Mobile = "Please Mobile Required";
  //   } else if (!mobileRegex.test(regFormData.Mobile)) {
  //     error.Mobile = "Invalid Mobile";
  //   }

  //   const emailRegex =
  //     /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //   if (!regFormData.Email) {
  //     error.Email = "Please Email Required";
  //   } else if (!emailRegex.test(regFormData.Email)) {
  //     error.Email = "Invalid Email";
  //   }

  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
  //   if (!regFormData.Password) {
  //     error.Password = "Please Password Required";
  //   } else if (!passwordRegex.test(regFormData.Password)) {
  //     error.Password = "Invalid Password";
  //   }

  //   const ConfirmPasswordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
  //   if (!regFormData.ConfirmPassword) {
  //     error.ConfirmPassword = "Please ConfirmPassword Required";
  //   } else if (!ConfirmPasswordRegex.test(regFormData.ConfirmPassword)) {
  //     error.ConfirmPasswordRegex = "Invalid Password";
  //   }

  //   if (
  //     error.FirstName ||
  //     error.LastName ||
  //     error.Mobile ||
  //     error.Email ||
  //     error.Password
  //   ) {
  //     setError(error);
  //     return;
  //   }

  //   const body = {
  //     firstName: regFormData.FirstName,
  //     lastName: regFormData.LastName,
  //     phone: regFormData.Mobile,
  //     email: regFormData.Email,
  //     password: regFormData.Password,
  //   }


  //   ApiPost(`${EndPoint.USER_REGISTER}`, body)
  //     .then((res) => {
  //       if (res.status === 201) {
  //         setRegFormData({
  //           FirstName: "",
  //           LastName: "",
  //           Mobile: "",
  //           Email: "",
  //           Password: "",
  //           ConfirmPassword: ""
  //         })
  //       }
  //       navigate('/authentication/sign-in')
  //       toast.success("Register Successfully");
  //     })
  //     .catch((error) => {
  //       if (error.error === "User already register") {
  //         toast.error(<p style={{ fontSize: "80%" }}>{"User already registered"}</p>, {
  //           position: "top-center",
  //         });
  //       }
  //     });
  // };
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   const textRegex = /^[A-Za-z\s]+$/;

  //   setRegFormData({
  //     ...regFormData,
  //     [name]: value,
  //   });

  //   if (name === "FirstName" || name === "LastName") {
  //     if (!textRegex.test(value)) {
  //       setError({
  //         ...error,
  //         [name]: "Please Enter Text Only",
  //       });
  //     } else {
  //       setError({
  //         ...error,
  //         [name]: "",
  //       })
  //     }
  //   }
  //   return;

  // };
  // const handleSetAgremment = () => setAgremment(!agreement);
  // const navigate = useNavigate();

  // const onKeyBtn = (e) => {
  //   if (e.key === "Enter")
  //     SignUp();
  // }

  return (
    <>

      {/* <DashboardNavbar /> */}


      <div className="ud-header absolute top-0 left-0 z-40 flex w-full items-center bg-transparent">
        <div className="container">
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-60 max-w-full px-4">

              <a href="http://localhost:3001/landingPage" className="block w-full py-5">


                <img src={brand}
                  alt="CloudOnex" className="max-height-35 py-1 my-1" style={{ maxHeight: '5rem', width: '14rem' }} />

              </a>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  id="navbarToggler"
                  className="absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className="relative my-[6px] block h-[2px] w-[30px]"
                  ></span>
                  <span
                    className="relative my-[6px] block h-[2px] w-[30px]"
                  ></span>
                  <span
                    className="relative my-[6px] block h-[2px] w-[30px]"
                  ></span>
                </button>
                <nav id="navbarCollapse"
                  className="absolute right-4 top-full hidden w-full max-w-[250px] rounded-lg py-5 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:py-0 lg:px-4 lg:shadow-none xl:px-6">
                  <ul className="blcok lg:flex">
                    <li className="group relative">
                      <a href="/dashboard"
                        className="ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:inline-flex lg:py-6 lg:px-0 lg:group-hover:text-primary lg:group-hover:opacity-90">
                        Dashboard
                      </a>
                    </li>
                    <li className="group relative">
                      <a href=""
                        className="ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:group-hover:text-primary lg:group-hover:opacity-90 xl:ml-12">
                        About
                      </a>
                    </li>
                    <li className="group relative">
                      <a href=""
                        className="ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:group-hover:text-primary lg:group-hover:opacity-90 xl:ml-12">
                        Plans &amp; Pricing
                      </a>
                    </li>
                    <li className="group relative">
                      <a href=""
                        className="ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0  lg:group-hover:text-primary lg:group-hover:opacity-90 xl:ml-12">
                        Customers
                      </a>
                    </li>
                    <li className="group relative">
                      <a href=""
                        className="ud-menu-scroll mx-8 flex py-2 text-base text-dark group-hover:text-primary lg:mr-0 lg:ml-7 lg:inline-flex lg:py-6 lg:px-0 lg:group-hover:text-primary lg:group-hover:opacity-90 xl:ml-12">
                        FAQ
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="hidden justify-end pr-16 sm:flex lg:pr-0">
                <a href="/authentication/sign-in"
                  className=" rounded-md loginBtn py-3 px-7 pe-2 text-base font-medium hover:opacity-70">Sign In</a>
                <a href="/authentication/sign-up"
                  className=" rounded-md py-3 px-7 pe-2 text-base font-medium hover:opacity-70 button" style={{ background: "linear-gradient(310deg, #2152ff, #21d4fd)", color: "white" }}>Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className=" mt-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className=" relative max-w-5xl mx-auto ">
          <video controls loop className="object-fit-fill  img-fluid rounded-lg" autoPlay muted  style={{marginLeft:"24%",width:"70%"}}>
            <source src="https://studybuddy.cloudonex.com/uploads/media/video.mp4"
              type="video/mp4" />
          </video>
          <div className="absolute inset-0 w-full h-full">
            <div className="flex flex-col justify-center items-center w-full h-full">
              <a href="https://studybuddy.cloudonex.com/uploads/media/video.mp4"
                className="inline-flex glightbox justify-center items-center gap-x-1.5 text-center text-sm bg-white text-gray-800 hover:text-gray-600 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4"
              >
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  fill="currentColor" viewBox="0 0 16 16">
                  <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                </svg>
                Play the video
              </a>
            </div>
          </div>

          <div className="absolute bottom-12 -left-20 -z-[1] w-48 h-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg">
            <div className="bg-white w-48 h-48 rounded-lg"></div>
          </div>

          <div className="absolute -top-12 -right-20 -z-[1] w-48 h-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
            <div className="bg-white w-48 h-48 rounded-full"></div>
          </div>
        </div>
      </div> */}
      <div id="home" className="relative isolate overflow-hidden  py-24 sm:py-32">
        <div aria-hidden="true" className="flex absolute -top-96 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]"></div>

        </div>
        <div className="relative z-10 ">
          <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {/* <div className="max-w-3xl text-center mx-auto">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-4xl font-extrabold text-transparent
">
                &quot;The Ultimate Productivity App for Students!&quot;
              </h1>
              <p className="mt-3 text-lg text-gray-800">A revolutionary collaborative productivity tool specifically designed for students.</p>
            </div> */}

            <div className=" mt-10 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8  ">
              <div className=" relative max-w-5xl mx-auto ">
                <video controls loop className="object-fit-fill  img-fluid rounded-lg" autoPlay muted >
                  <source src="https://studybuddy.cloudonex.com/uploads/media/video.mp4"
                    type="video/mp4" />
                </video>
                <div className="absolute inset-0 w-full h-full">
                  <div className="flex flex-col justify-center items-center w-full h-full">
                    <a href="https://studybuddy.cloudonex.com/uploads/media/video.mp4"
                      className="inline-flex glightbox justify-center items-center gap-x-1.5 text-center text-sm bg-white text-gray-800 hover:text-gray-600 rounded-full transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white transition py-3 px-4"
                    >
                      <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" viewBox="0 0 16 16">
                        <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                      </svg>
                      Play the video
                    </a>
                  </div>
                </div>

                {/* <div className="absolute bottom-12 -left-20 -z-[1] w-48 h-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg">
                  <div className="bg-white w-48 h-48 rounded-lg"></div>
                </div> */}

                {/* <div className="absolute -top-12 -right-20 -z-[1] w-48 h-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full">
                  <div className="bg-white w-48 h-48 rounded-full"></div>
                </div> */}
              </div>
            </div>
          </div>
        </div>

      </div>



      <div id="about" className="bg-white mb-5 ">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <div className="mx-auto max-w-4xl lg:text-center">
            <h1 className="text-base font-semibold leading-7 text-indigo-600">Explore tools and Features</h1>
            <p className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              StudyBuddy is made to make you more efficient and productive.
            </p>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              Works everywhere, whether on a PC, tablet, or mobile device.
            </p>
          </div>


          <div className="max-w-[85rem] px-4  sm:px-6 lg:px-8 lg:py-10 mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 items-center gap-12">
              <div className="text-center">
                <div className="flex justify-center items-center w-12 h-12 bg-gray-50 border border-gray-200 rounded-full mx-auto ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                  </svg>

                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-800"> Study Goals</h3>
                  <p className="mt-1 text-gray-800">
                    Set your study goals with this app and track your progress efficiently.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center w-12 h-12 bg-gray-50 border border-gray-200 rounded-full mx-auto ">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>

                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Assignment Management
                  </h3>
                  <p className="mt-1 text-gray-800">
                    Manage assignments Create documents. Collaborate with others.
                  </p>
                </div>
              </div>
              <div className="text-center">
                <div className="flex justify-center items-center w-12 h-12 bg-gray-50 border border-gray-200 rounded-full mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>

                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Task Management
                  </h3>
                  <p className="mt-1 text-gray-800">
                    Manage your tasks and get things done with amazing to-do lists.
                  </p>
                </div>
              </div>

              <div className="text-center">
                <div className="flex justify-center items-center w-12 h-12 bg-gray-50 border border-gray-200 rounded-full mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>

                </div>
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-800 ">Study Notes</h3>
                  <p className="mt-1 text-gray-800">
                    Take amazing study notes. Share with classmates. Export as PDF.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-10 mx-auto">
        <div className="relative p-6 md:p-16">
          <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
            <div className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-8 lg:order-2">
              <h2 className="text-2xl text-gray-800 font-bold sm:text-3xl">
                Revolutionize the way you study with Cutting-Edge AI integrated Productivity Software!
              </h2>

              <nav className="grid gap-4 mt-5 md:mt-10" aria-label="Tabs" role="tablist">
                <div
                  className="card-bodylanding  text-left  p-4 md:p-5 rounded-xl"
                  id="tabs-with-card-item-1" data-hs-tab="#tabs-with-card-1"
                  aria-controls="tabs-with-card-1" role="tab" style={{ border: "0px", outline: "none" }}>
                  <span className="flex">
                    <svg className="flex-shrink-0 mt-2 h-6 w-6 md:w-7 md:h-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500"
                      xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z" />
                      <path d="M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>



                    <span className="grow ml-6">
                      <span className="block text-lg font-semibold">  Ask AI Tutor</span>
                      <span className="block mt-1 text-gray-800">Dont know answer of some questions? No problem your AI tutor will answer questions on any suubject. Chat with Ai and increase your knowledge.</span>
                    </span>
                  </span>
                </div>

                <div
                  className="card-bodylanding text-left p-4 md:p-5 rounded-xl"
                  id="tabs-with-card-item-2" data-hs-tab="#tabs-with-card-2"
                  aria-controls="tabs-with-card-2" role="tab" style={{ border: "0px", outline: "none" }}>
                  <span className="flex">
                    <svg className="flex-shrink-0 mt-2 h-6 w-6 md:w-7 md:h-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500"
                      xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd"
                        d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                    </svg>



                    <span className="grow ml-6">
                      <span className="block text-lg font-semibold hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500"> Assignment Management</span>
                      <span className="block mt-1 text-gray-800"> Plan for your study discuss with your friends and get the best out of your study time.</span>
                    </span>
                  </span>
                </div>

                {/* hover:bg-gray-200 */}
                <div
                  className="card-bodylanding text-left  p-4 md:p-5 rounded-xl"
                  id="tabs-with-card-item-3" data-hs-tab="#tabs-with-card-3"
                  aria-controls="tabs-with-card-3" role="tab" style={{ border: "0px", outline: "none" }}>
                  <span className="flex">
                    <svg className="flex-shrink-0 mt-2 h-6 w-6 md:w-7 md:h-7 hs-tab-active:text-blue-600 text-gray-800 dark:hs-tab-active:text-blue-500 "
                      xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641l2.5-8.5zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1H6.374z" />
                    </svg>




                    <span className="grow ml-6">
                      <span className="block text-lg font-semibold "> Create Notes</span>
                      <span className="block mt-1 text-gray-800 "> Create amazing notes, highlight important ideas.You can also take help from AI to create notes.</span>
                    </span>
                  </span>
                </div>
              </nav>
            </div>

            <div className="lg:col-span-6">
              <div className="relative">
                <div>
                  <div id="tabs-with-card-1" role="tabpanel" aria-labelledby="tabs-with-card-item-1">

                    <img src="https://studybuddy.cloudonex.com/uploads/media/feature-chat.png" className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]"
                      alt="Image"
                    />

                  </div>

                  <div id="tabs-with-card-2" className="hidden" role="tabpanel"
                    aria-labelledby="tabs-with-card-item-2">
                    <img
                      src="https://studybuddy.cloudonex.com/uploads/media/feature-project.png"
                      alt="Welcome to StudyBuddy"
                      className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]" />
                  </div>

                  <div id="tabs-with-card-3" className="hidden" role="tabpanel"
                    aria-labelledby="tabs-with-card-item-3">
                    <img
                      src="https://studybuddy.cloudonex.com/uploads/media/feature-ai-image.png"
                      alt="Welcome to StudyBuddy"
                      className="shadow-xl shadow-gray-200 rounded-xl dark:shadow-gray-900/[.2]"
                    />
                  </div>
                </div>

                <div className="hidden absolute top-0 right-0 translate-x-20 md:block lg:translate-x-20">
                  <svg className="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135"
                    fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="#000"
                      strokeWidth="10" strokeLinecap="round" />
                    <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="#5046E5"
                      strokeWidth="10" strokeLinecap="round" />
                    <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="#000"
                      strokeWidth="10" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute inset-0 grid grid-cols-12 w-full h-full">
            <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-gray-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full dark:bg-white/[.075]"></div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto text-center py-10 ">

        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Revolutionary Suite of productivity tools and apps for learners
        </h2>
        <p className="mt-2 text-gray-600">      StudyBuddy is a revolutionary AI tools on the Cloud. AI writting tool, assignment management tool to manage the projects you create with AI and many more.</p>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-7xl sm:px-6 sm:py-20 lg:px-8">

          <div className="relative isolate overflow-hidden bg-dark px-6 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0" style={{ background: "linear-gradient(310deg, #2152ff, #21d4fd)" }}>


            <div className="mx-auto max-w-md text-center text-white lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">


              <div className="relative pl-9 mb-2 mt-3">

                <dt className="inline text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                    className="absolute top-1 left-1 h-5 w-5 text-indigo-600" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg> Works everywhere, whether on a PC, tablet, or mobile device.</dt>
              </div>


              <div className="relative pl-9 mb-2 mt-3">

                <dt className="inline text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                    className="absolute top-1 left-1 h-5 w-5 text-indigo-600" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg> No software to install. No updates to install. No hassle.</dt>
              </div>


              <div className="relative pl-9 mb-2 mt-3">

                <dt className="inline text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white"
                    className="absolute top-1 left-1 h-5 w-5 text-indigo-600" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg> No credit card required. No commitment. Cancel anytime.</dt>
              </div>

              <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                <a href="#signup"
                  className="rounded-md px-3.5 py-2.5 text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" style={{ color: "#4890dc", backgroundColor: "white" }}>Get started</a>
                <a href="#pricing" className="text-sm text-white font-semibold leading-6">See Pricing
                  <span aria-hidden="true">→</span></a>
              </div>
            </div>
            <div className="relative mt-16 h-80 lg:mt-8">

              <img
                // src="https://studybuddy.cloudonex.com/uploads/media/dashboard.png"
                src={image}
                alt="Welcome to StudyBuddy"
                className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
                // width="1824" height="1080"
                style={{ width: "11rem", height: "34.5rem", marginLeft: "-33px" }}
              />

            </div>
          </div>
        </div>
      </div>


      {/* <section id="pricing" className="relative z-20 overflow-hidden bg-white py-20 pb-12">
        <div className="container">

          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">

              <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">

                <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
                  Pricing
                </h2>
                <p className="mt-1 text-gray-600">    Choose which suite is right for you</p>
              </div>

            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center">


            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="relative z-10 mb-10 overflow-hidden rounded-xl border border-dark border-opacity-20 bg-white py-10 px-8 text-center shadow-pricing sm:p-12 lg:py-10 lg:px-6 xl:p-12">



                <span className="mb-2 block text-base font-medium uppercase text-dark">Basic</span>


                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold text-dark">$4.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>




                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Single User</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>1GB Storage</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Create &amp; Share Documents</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Create &amp; Share Spreadsheets</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Quick Share</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Image Editor</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Digital Asset Management</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Calendar</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Address Book</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Basic Support</span>
                  </li>


                </ul>


                <div className="w-full">
                  <a href="#signup"
                    className="inline-block rounded-full border border-[#D4DEFF] bg-transparent py-4 px-11 text-center text-base font-medium text-primary transition duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-white">
                    Free Trial
                  </a>
                </div>
              </div>
            </div>


            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="relative z-10 mb-10 overflow-hidden rounded-xl bg-dark from-dark to-[#179BEE] bg-white py-10 px-8 text-center shadow-pricing sm:p-12 lg:py-10 lg:px-6 xl:p-12">

                <span className="mb-5 inline-block rounded-full  bg-info py-2 px-6 text-base font-semibold uppercase text-white">Popular</span>


                <span className="mb-2 block text-base font-medium uppercase text-white">Standard</span>


                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold text-white">$9.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>




                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3 text-sm text-white">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>2 Users</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-white">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>5GB Storage</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-white">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Create &amp; Share Documents</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-white">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Create &amp; Share Spreadsheets</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-white">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Quick Share</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-white">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Image Editor</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-white">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Digital Asset Management</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-white">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Calendar</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-white">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Address Book</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-white">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Standard Support</span>
                  </li>


                </ul>


                <div className="w-full">
                  <a href="#signup"
                    className="inline-block rounded-full border border-white bg-white py-4 px-11 text-center text-base font-medium text-dark transition duration-300 ease-in-out hover:border-dark hover:bg-dark hover:text-white">
                    Free Trial
                  </a>
                </div>
                <span>
                </span>
              </div>
            </div>


            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="relative z-10 mb-10 overflow-hidden rounded-xl border border-dark border-opacity-20 bg-white py-10 px-8 text-center shadow-pricing sm:p-12 lg:py-10 lg:px-6 xl:p-12">



                <span className="mb-2 block text-base font-medium uppercase text-dark">Premium</span>


                <div className="flex justify-center items-baseline my-8">
                  <span className="mr-2 text-5xl font-extrabold text-dark">$19.99</span>
                  <span className="text-gray-500 dark:text-gray-400">/month</span>
                </div>




                <ul role="list" className="mb-8 space-y-4 text-left">
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Unlimited Users</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>10GB Storage</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Create &amp; Share Documents</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Create &amp; Share Spreadsheets</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Quick Share</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Image Editor</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Digital Asset Management</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Calendar</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Address Book</span>
                  </li>
                  <li className="flex items-center space-x-3 text-sm text-body-color">
                    <svg className="flex-shrink-0 w-5 h-5 text-primary dark:text-green-400"
                      fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"></path>
                    </svg>
                    <span>Premium Support</span>
                  </li>


                </ul>


                <div className="w-full">
                  <a href="#signup"
                    className="inline-block rounded-full border border-[#D4DEFF] bg-transparent py-4 px-11 text-center text-base font-medium text-primary transition duration-300 ease-in-out hover:border-primary hover:bg-primary hover:text-white">
                    Free Trial
                  </a>
                </div>

              </div>
            </div>



          </div >
        </div >
      </section > */}
      {/* <div id="faq" className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
          FAQ
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-1 text-gray-600">  Your questions answered</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="hs-accordion-group">

            <div className="hs-accordion  active  hs-accordion-active:bg-gray-100 rounded-xl p-6 "
              id="hs-basic-with-title-and-arrow-stretched-heading-0">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-0" style={{ border: "0px", outline: "none" }}>
                What is the difference between the monthly and yearly plans?
                <svg className="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 "
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 "
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <div id="hs-basic-with-title-and-arrow-stretched-collapse-0"
                className="hs-accordion-content   w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-0">
                <p className="text-gray-800">
                  The monthly plan is billed monthly and the yearly plan is billed yearly. The yearly plan is 10% off the monthly price.
                </p>
              </div>
            </div>
            <div className="hs-accordion  hs-accordion-active:bg-gray-100 rounded-xl p-6 "
              id="hs-basic-with-title-and-arrow-stretched-heading-1">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-1" style={{ border: "0px", outline: "none" }}>
                How do I cancel my subscription?
                <svg className="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 "
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 "
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <div id="hs-basic-with-title-and-arrow-stretched-collapse-1"
                className="hs-accordion-content  hidden   w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-1">
                <p className="text-gray-800">
                  You can cancel your subscription at any time. If you cancel your subscription, you will continue to have access to your account until the end of your current billing period.
                </p>
              </div>
            </div>
            <div className="hs-accordion  hs-accordion-active:bg-gray-100 rounded-xl p-6 "
              id="hs-basic-with-title-and-arrow-stretched-heading-2">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-2" style={{ border: "0px", outline: "none" }}>
                What happens if I cancel my subscription?
                <svg className="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 "
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 "
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <div id="hs-basic-with-title-and-arrow-stretched-collapse-2"
                className="hs-accordion-content  hidden   w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-2">
                <p className="text-gray-800">
                  If you cancel your subscription, you will continue to have access to your account until the end of your current billing period. You will not be billed again after your current billing period ends.
                </p>
              </div>
            </div>
            <div className="hs-accordion  hs-accordion-active:bg-gray-100 rounded-xl p-6 "
              id="hs-basic-with-title-and-arrow-stretched-heading-3">
              <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-lg font-semibold text-left text-gray-800 transition hover:text-gray-500"
                aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-3" style={{ border: "0px", outline: "none" }}>
                How do I start a trial?
                <svg className="hs-accordion-active:hidden block w-3 h-3 text-gray-600 group-hover:text-gray-500 "
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <svg className="hs-accordion-active:block hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 "
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <div id="hs-basic-with-title-and-arrow-stretched-collapse-3"
                className="hs-accordion-content  hidden   w-full overflow-hidden transition-[height] duration-300"
                aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-3">
                <p className="text-gray-800">
                  You can start a trial by clicking the &quot;Get Started&quot; or the &quot;Sign Up&quot; button on the pricing page. You do not need a credit card to start a trial.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div> */}

      <div className="we-are-block">
        <div id="history-section">
          <div className="history-image">
            <img src="https://img.freepik.com/free-vector/online-certification-with-graduate-laptop_23-2148571246.jpg?w=1060&t=st=1710044719~exp=1710045319~hmac=56f738fa812d49bd075df2b647936494100482ac9825a52ac1ba5da3a851bd04" width="900" height="471" alt="Building Pic" style={{width:"100%",height:"auto"}}/>
          </div>
          <div className="history-info">
            <h2>Preserving Local History</h2>
            <p>The library is at the center of the schools academic programs. The curriculum at a particular school can be largely dependent on the quality of the library. The teaching and learning process is poor without a well-equipped library.</p>
            <p>The library is essential to facilitate student-centered learning and teaching processes like the Dalton plan, project method, and self-learning as well as seminars.</p>
            {/* <a href="#" title="History Button">HISTORY</a> */}
          </div>
        </div>

        <div id="about-us-section">
          <div className="about-us-image">
            <img src="https://media.istockphoto.com/id/1347747136/vector/group-of-students-studying.jpg?s=612x612&w=0&k=20&c=t8UwXDXTCu2O-2mOLE8_aQ7KTXxjuUk_WgiR0cS6pSk=" width="750" height="458" alt="Lobby Image" style={{width:"100%",height:"auto"}} />
          </div>
          <div className="about-us-info">
            <h2>In the Spotlight</h2>
            <p>Libraries are another place for children to develop. They can assist students with the web, offer an area that is quiet for students to focus on their studies, and also encourage learners to take time to study.</p>
            <p>Staff members, who know what books that students enjoy can assist them in choosing books that match their preferences. Sometimes, these aren’t even books that the student was aware they would love. Giving students books that appeal to them can inspire students to continue reading.</p>
            {/* <a href="#" title="About Us Button">ABOUT US</a> */}
          </div>
        </div>
      </div>

      <section id="customers" className="">
        <div className="container px-4">

          <div className="flex flex-wrap">
            <div className="mx-4 w-full">
              <div className="mx-auto">

                <div className="max-w-2xl mx-auto text-center ">

                  <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
                    Testimonials
                  </h2>
                  <p className="mt-1 text-gray-600">   What our customers say</p>
                </div>
              </div>
            </div>
          </div>


          <div className="flex flex-wrap">



            {/* <div className="box-1 w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="ud-single-testimonial mb-12 bg-white p-8 shadow-testimonial">

                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="mr-2 mb-2 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-info bg-opacity-5 text-white">
                    S
                  </div>
                  <div className="leading-4">
                    <p className="font-bold text-gray-900 mb-1">
                      <a href="#">
                        <span className="absolute inset-0"></span>
                        Sarah Malik
                      </a>
                    </p>
                    <p className="text-gray-600 text-sm">Student, UT</p>
                  </div>
                </div>
                <div className="ud-testimonial-content mb-6">

                  <p className="mt-5 line-clamp-3 text-base leading-6 text-gray-600">
                    It works well and has all the functions I need. I would recommend it to anyone who needs a simple and easy to use document editor.
                  </p>
                </div>


              </div>
            </div> */}

            <div className='mainBody'>

              <meta charset="utf-8" />
              <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
              {/* <title>Cards Hover2</title> */}
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="stylesheet" type="text/css" media="screen" href="style.css" />
              <link href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN"
                crossOrigin="anonymous" />


              <div className="containerlnd">
                <div className="card1">
                  <div className="face face1">
                    <div className="content">
                      <div className="icon1">
                        {/* <i className="fa fa-linkedin-square" aria-hidden="true"></i> */}
                        <div className="mainText mr-2 mb-2 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg  bg-opacity-5 ">
                          S
                        </div>
                        <div className='mainName'>Sarah Malik</div>

                        {/* <div className="mainName mr-2 mb-2 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-info bg-opacity-5 text-white">
                        Sarah Malik
                        </div> */}

                      </div>

                    </div>
                  </div>
                  <div className="face face2">
                    <div className="content">
                      <h3>
                        {/* <a href="https://www.linkedin.com/in/adamdipinto/" target="blank">_adamdipinto</a> */}
                      </h3>
                      <p>It works well and has all the functions I need. I would recommend it to anyone who needs a simple and easy to use document editor.</p>
                    </div>
                  </div>
                </div>
                <div className="card1">
                  <div className="face face1">
                    <div className="content">
                      <div className="icon1">
                        {/* <i className="fa fa-twitter-square" aria-hidden="true"></i> */}
                        <div className="mainText mr-2 mb-2 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg  bg-opacity-5 "
                        // style={{ color: "#6eadd4" }}
                        >
                          J
                        </div>
                        <div className='mainName'>James Larsson</div>
                      </div>
                    </div>
                  </div>
                  <div className="face face2">
                    <div className="content">
                      <h3>
                        {/* <a href="https://twitter.com/AdamDipinto" target="blank">@AdamDipinto</a> */}
                      </h3>
                      <p>I love this product! This is efficient and productive. I can create documents and share them with my colleagues. I can also export them.</p>
                    </div>
                  </div>
                </div>
                <div className="card1">
                  <div className="face face1">
                    <div className="content">
                      <div className="icon1">
                        {/* <i className="fa fa-github-square" aria-hidden="true"></i> */}
                        <div className="mainText mr-2 mb-2 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-opacity-5 "
                        // style={{ color: "#4aada9" }}
                        >
                          A
                        </div>
                        <div className='mainName'>Alice Holmes</div>
                      </div>
                    </div>
                  </div>
                  <div className="face face2">
                    <div className="content">
                      <h3>
                        {/* <a href="https://github.com/atom888" target="blank">atom888</a> */}
                      </h3>
                      <p> I use this product to share assignments with my students. It is very easy to use and I can see the logs who accessed them.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>




            {/* <div className="box-1 w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="ud-single-testimonial mb-12 bg-white p-8 shadow-testimonial">

                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="mr-2 mb-2 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-info bg-opacity-5 text-white">
                    J
                  </div>
                  <div className="leading-4">
                    <p className="font-bold text-gray-900 mb-1">
                      <a href="#">
                        <span className="absolute inset-0"></span>
                        James Larsson
                      </a>
                    </p>
                    <p className="text-gray-600 text-sm">Content Writer, Ray Media</p>
                  </div>
                </div>
                <div className="ud-testimonial-content mb-6">

                  <p className="mt-5 line-clamp-3 text-base leading-6 text-gray-600">
                    I love this product! This is efficient and productive. I can create documents and share them with my colleagues. I can also export them.
                  </p>
                </div>


              </div>
            </div>


            <div className="box-1 w-full px-4 md:w-1/2 lg:w-1/3">
              <div className="ud-single-testimonial mb-12 bg-white p-8 shadow-testimonial">

                <div className="relative mt-8 flex items-center gap-x-4">
                  <div className="mr-2 mb-2 flex h-10 w-full max-w-[40px] items-center justify-center rounded-lg bg-info bg-opacity-5 text-white">
                    A
                  </div>
                  <div className="leading-4">
                    <p className="font-bold text-gray-900 mb-1">
                      <a href="#">
                        <span className="absolute inset-0"></span>
                        Alice Holmes
                      </a>
                    </p>
                    <p className="text-gray-600 text-sm">Teacher, UT</p>
                  </div>
                </div>
                <div className="ud-testimonial-content mb-6">

                  <p className="mt-5 line-clamp-3 text-base leading-6 text-gray-600">
                    I use this product to share assignments with my students. It is very easy to use and I can see the logs who accessed them.
                  </p>
                </div>


              </div>
            </div> */}



          </div>
        </div>
      </section>

      <div className="relative overflow-hidden" id="signup">
        <div className="mx-auto max-w-screen-md py-12 px-4 sm:px-6 md:max-w-screen-xl md:py-20 lg:py-32 md:px-8">
          <div className="md:pr-8 md:w-1/2 xl:pr-0 xl:w-5/12">
            <h1 className="text-3xl text-gray-800 font-bold md:text-4xl md:leading-tight lg:text-3xl lg:leading-tight">
              Increase your productivity with StudyBuddy!
            </h1>

            <p className="mt-3 text-base text-gray-500">
              Get Started with StudyBuddy for free. No credit card required. No commitment. Cancel anytime.
            </p>
            <div className="mb-3 mt-3 text-gray-500">
              <label>Already have an account? <a className="text-blue-600 decoration-2 hover:underline font-medium" href="/authentication/sign-in">Sign in</a></label>
            </div>

            {/* <form method="post" action="https://studybuddy.cloudonex.com/signup">
            

            <div className="grid grid-cols-2 gap-4">
                <div className="mt-4">
                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900">First Name</label>
                    <input type="text" name="first_name" id="first_name"className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3" value="" placeholder="Enter your first name" required="">
                </div>
                <div className="mt-4">
                    <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900">Last Name</label>
                    <input type="text"  name="last_name" id="last_name" className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3" value="" placeholder="Enter your last name" required="">
                </div>
            </div>

                <div className="mt-4">
                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900"> Email address</label>
                    <input type="email" name="email" id="email" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3" value="" placeholder="Your email address" required="">
                </div>

                <div className="mt-4">
                    <label for="password" className="block mb-2 text-sm font-medium text-gray-900"> Password</label>
                    <input type="password" name="password" id="password" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3" placeholder="Choose a password" required="">
                </div>
                <div className="mt-4 mb-5">
                    <label for="password_confirmation" className="block mb-2 text-sm font-medium text-gray-900"> Confirm Password</label>
                    <input type="password" name="password_confirmation" id="password_confirmation" className=" border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3" placeholder="Confirm password" required="">
                </div>
                <input type="hidden" name="_token" value="z3VXtpN4OTxTKk2mQAKJIorngVVOGRnf6jzvpqCL">                    <div className="grid">
                <button type="submit"
                        className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-primary text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800 sm:p-4">Sign up</button>
            </div>
            <div className="mb-2 mt-2 ">
                <label className="text-xs sm:text-sm text-gray-600">By submitting this form I have read and acknowledged the <a className="text-blue-600 decoration-2 hover:underline font-medium" href="https://studybuddy.cloudonex.com/privacy-policy">Privacy Policy</a> & <a className="text-blue-600 decoration-2 hover:underline font-medium" href="https://studybuddy.cloudonex.com/terms-of-service">Terms of Service</a> </label>
            </div>
        </form> */}
          </div>
        </div>
        <div className="hidden md:block md:absolute md:top-0 md:left-1/2 md:right-0 h-full bg-no-repeat bg-center bg-cover"
          style={{ backgroundImage: "url('https://studybuddy.cloudonex.com/uploads/media/sample-demo.png')" }}></div>
      </div>

      <footer className="w-full py-10 sm:px-6 relative overflow-hidden">
        <div aria-hidden="true" className="flex absolute -top-96 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-violet-300/50 to-purple-100 blur-3xl w-[25rem] h-[44rem] rotate-[-60deg] transform -translate-x-[10rem]"></div>
          <div className="bg-gradient-to-tl from-blue-50 via-blue-100 to-blue-50 blur-3xl w-[90rem] h-[50rem] rounded-fulls origin-top-left -rotate-12 -translate-x-[15rem]"></div>
        </div>
        <div className="max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 lg:pt-20 mx-auto relative z-10">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">

              <div className="col-span-full hidden lg:col-span-2 lg:block">
                <a className="flex-none text-xl font-semibold" href="#" aria-label="Brand">
                  <img src={brand}
                    alt="CloudOnex"
                    className="max-h-8"
                  />
                </a>
                <p className="mt-3 text-xs sm:text-sm text-gray-600">StudyBuddy improves student productivity. It lets students set goals and achieve those efficiently through powerful set of features and tools.</p>


              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase">Company</h4>


                <div className="mt-3 grid space-y-3 text-sm">

                  <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="">About</a></p>
                  <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="">Plans &amp; Pricing</a> <span className="inline text-blue-600">— Get Started</span></p>
                  <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="">Testimonials</a></p>
                  <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="">FAQ</a></p>

                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase">Legal</h4>

                <div className="mt-3 grid space-y-3 text-sm">
                  <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="https://studybuddy.cloudonex.com/privacy-policy">Privacy Policy</a>
                  </p>
                  <p>
                    <a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800"
                      href="https://studybuddy.cloudonex.com/terms-of-service">Terms of Service</a>
                  </p>

                </div>
              </div>
              <div>
                <h4 className="text-xs font-semibold text-gray-900 uppercase">Account</h4>

                <div className="mt-3 grid space-y-3 text-sm">
                  <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/authentication/sign-in"> Sign In</a></p>
                  <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/authentication/sign-up">Create an Account</a></p>
                  <p><a className="inline-flex gap-x-2 text-gray-600 hover:text-gray-800" href="/authentication/verify-email">Reset Password</a></p>
                </div>


              </div>
            </div>

            {/* <div className="pt-5 mt-5 border-t border-gray-200">
              <div className="sm:flex sm:justify-between sm:items-center">
                <p className="mt-3 text-xs sm:text-sm text-gray-600">© 2024 CloudOnex All Rights Reserved.</p>

                <div className="flex justify-between items-center">



                  <div className="space-x-4">
                    <a className="inline-block text-gray-500 hover:text-gray-800" href="https://www.facebook.com/">
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                      </svg>
                    </a>


                    <a className="inline-block text-gray-500 hover:text-gray-800" href="https://www.twitter.com/">
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                      </svg>
                    </a>
                    <a className="inline-block text-gray-500 hover:text-gray-800" href="https://www.github.com/">
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                    </a>
                    <a className="inline-block text-gray-500 hover:text-gray-800 dark:hover:text-gray-200" href="https://www.slack.com/">
                      <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M3.362 10.11c0 .926-.756 1.681-1.681 1.681S0 11.036 0 10.111C0 9.186.756 8.43 1.68 8.43h1.682v1.68zm.846 0c0-.924.756-1.68 1.681-1.68s1.681.756 1.681 1.68v4.21c0 .924-.756 1.68-1.68 1.68a1.685 1.685 0 0 1-1.682-1.68v-4.21zM5.89 3.362c-.926 0-1.682-.756-1.682-1.681S4.964 0 5.89 0s1.68.756 1.68 1.68v1.682H5.89zm0 .846c.924 0 1.68.756 1.68 1.681S6.814 7.57 5.89 7.57H1.68C.757 7.57 0 6.814 0 5.89c0-.926.756-1.682 1.68-1.682h4.21zm6.749 1.682c0-.926.755-1.682 1.68-1.682.925 0 1.681.756 1.681 1.681s-.756 1.681-1.68 1.681h-1.681V5.89zm-.848 0c0 .924-.755 1.68-1.68 1.68A1.685 1.685 0 0 1 8.43 5.89V1.68C8.43.757 9.186 0 10.11 0c.926 0 1.681.756 1.681 1.68v4.21zm-1.681 6.748c.926 0 1.682.756 1.682 1.681S11.036 16 10.11 16s-1.681-.756-1.681-1.68v-1.682h1.68zm0-.847c-.924 0-1.68-.755-1.68-1.68 0-.925.756-1.681 1.68-1.681h4.21c.924 0 1.68.756 1.68 1.68 0 .926-.756 1.681-1.68 1.681h-4.21z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </footer>

    </>
  )
}

export default LandingPage;