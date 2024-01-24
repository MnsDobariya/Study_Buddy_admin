import React, { useEffect, useState } from 'react';
import '../teacher/Css/teacher.css';
import { useLocation, useNavigate } from 'react-router-dom';
import SoftInput from 'components/SoftInput';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import { ApiPut } from 'config/Api/ApiData';
import { ApiPost } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';



const TeacherForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [addTeacher, setAddTeacher] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        gender: "male"
    })
    useEffect(() => {
    }, [addTeacher])

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const textRegex = /^[A-Za-z\s]+$/;

        if (name === "firstName" || name === "lastName") {
            if (!textRegex.test(value)) {
                setError({
                    ...error,
                    [name]: "Please enter text only",
                });
                return;
            }
        }

        setAddTeacher({
            ...addTeacher,
            [e.target.name]: e.target.value,
        });
    };
    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        gender: ""
    });

    useEffect(() => {
        if (location?.state) {
            setAddTeacher(location?.state);
        }
    }, [location]);

    const addNewTeacher = () => {
        const error = {};
        if (!addTeacher.firstName) {
            error.firstName = "Please FirstName Required";
        }

        if (!addTeacher.lastName) {
            error.lastName = "Please LastName Required";
        }
        const mobileRegex = /^\d+$/;
        if (!addTeacher.phone) {
            error.phone = "Please Mobile Required";
        } else if (!mobileRegex.test(addTeacher.phone)) {
            error.phone = "Invalid Mobile";
        }

        const emailRegex =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!addTeacher.email) {
            error.email = "Please Email Required";
        } else if (!emailRegex.test(addTeacher.email)) {
            error.email = "Invalid Email";
        }

        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
        if (!addTeacher.password) {
            error.password = "Please Password Required";
        } else if (!passwordRegex.test(addTeacher.password)) {
            error.password = "Invalid Password";
        }


        if (
            error.firstName ||
            error.lastName ||
            error.phone ||
            error.email ||
            error.password ||
            error.gender
        ) {
            setError(error);
            return;
        }

        const body = {
            firstName: addTeacher?.firstName,
            lastName: addTeacher?.lastName,
            email: addTeacher?.email,
            password: addTeacher?.password,
            phone: addTeacher?.phone,
            gender: addTeacher?.gender
        }
        if (location?.state) {
            ApiPut(`${EndPoint.USER_UPDATE}/${location?.state?.id}`, body)

                .then((res) => {
                    toast.success("Update successfully");
                    navigate("/teacher");
                });
        } else {
            ApiPost(`${EndPoint.USER_CREATE}`, body)
                .then((res) => {
                    if (res.status == 201) {
                        setAddTeacher({
                            firstName: "",
                            lastName: "",
                            email: "",
                            phone: "",
                            password: "",
                            gender: ""
                        });
                        navigate("/teacher");
                        toast.success("Add Teacher Successfully");
                    }

                }).catch((error) => {
                    if (error.error === "email already exists") {
                        toast.error(<p style={{ fontSize: "80%" }}>{"Teacher Already Registered"}</p>, {
                            position: "top-center",
                        });
                    }
                })
        }
    };

    const cancelBtn = () => {
        navigate("/teacher");
    };

    useEffect(() => {
        hotkeys("alt + c", (e) => {
            e.preventDefault();
            navigate("/teacher");

        });
        return () => {
            hotkeys.unbind("alt + c");
        }

    })

    return (
        <>
            <SoftBox mt={4} mb={1}>

                <div className="container" style={{ marginTop: "8%", marginLeft: "21.5%" }}>
                    {/* <div className="row jumbotron box8"> */}
                    <div className="col-sm-12 mx-t3 mb-3">
                        <h2 style={{ textAlign: "left", marginTop: "1%" }}>
                            {" "}
                            {addTeacher?.id ? "Update" : "Add"} Teacher

                        </h2>
                    </div>
                    <form className="teacherForm" >
                        <div style={{ display: "flex", marginTop: "6%" }}>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="name-f" >First Name </label>
                                <SoftInput
                                    type="text"
                                    name="firstName"
                                    value={addTeacher?.firstName}
                                    placeholder="First Name"
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            firstName: "",
                                        });
                                        handleChange(e);
                                    }}
                                    style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}


                                />
                                {error.firstName && <p style={{ color: "red", fontSize: "60%" }}>{error.firstName} </p>}

                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="name-l">Last Name </label>
                                <SoftInput
                                    type="text"
                                    name="lastName"
                                    value={addTeacher?.lastName}
                                    placeholder="Last Name"
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            lastName: "",
                                        });
                                        handleChange(e);
                                    }}
                                    style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}


                                />
                                {error.lastName && <p style={{ color: "red", fontSize: "60%" }}>{error.lastName} </p>}

                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="email">Email </label>
                                <SoftInput
                                    type="email"
                                    name="email"
                                    value={addTeacher?.email}
                                    placeholder="Email"
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            email: "",
                                        });
                                        handleChange(e);
                                    }}
                                    style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}


                                />
                                {error.email && <p style={{ color: "red", fontSize: "60%" }}>{error.email} </p>}

                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="password">Password </label>
                                <div style={{ display: "flex" }}>
                                    <SoftInput
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        value={addTeacher?.password}
                                        placeholder="Password"
                                        required
                                        onChange={(e) => {
                                            setError({
                                                ...error,
                                                password: "",
                                            });
                                            handleChange(e);
                                        }}

                                        style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}
                                    />
                                    <div className='input-group-append'>
                                        <span
                                            className=''
                                            onClick={togglePasswordVisibility}
                                            style={{
                                                position: 'absolute',
                                                right: '4%',
                                                transform: 'translateY(9%)',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {passwordVisible ? (
                                                <FontAwesomeIcon icon={faEye} /> // Eye slash icon for showinh password
                                            ) : (
                                                <FontAwesomeIcon icon={faEyeSlash} /> // Eye icon for hide password
                                            )}
                                        </span>
                                    </div>
                                </div>
                                {error.password && <p style={{ color: "red", fontSize: "60%" }}>{error.password} </p>}
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="mobile">Mobile</label>
                                <SoftInput
                                    type="mobile"
                                    name="phone"
                                    value={addTeacher?.phone}
                                    placeholder="Mobile No"
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        const regex = /^[0-9\b]+$/;
                                        if (input === '' || regex.test(input) && input.length <= 10) {
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
                                    style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                                />
                                {error.phone && <p style={{ color: "red", fontSize: "60%" }}>{error.phone} </p>}

                            </div>
                            <div className="col-sm-6 form-group mt-1">
                                <h5 style={{ display: "flex" }}>
                                    <label htmlFor='Gender'>Gender :{""}</label>
                                </h5>
                                <input
                                    type='radio'
                                    name='gender'
                                    checked={addTeacher?.gender == "male" ? true : false}
                                    onChange={(e) =>
                                        setAddTeacher({
                                            ...addTeacher,
                                            gender: "male"
                                        })}

                                />
                                Male
                                <input
                                    type='radio'
                                    name='gender'
                                    style={{ marginLeft: "20px" }}
                                    checked={addTeacher?.gender == "female" ? true : false}
                                    onChange={(e) =>
                                        setAddTeacher({
                                            ...addTeacher,
                                            gender: "female"
                                        })}
                                />
                                Female
                            </div>
                        </div>
                        <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "30%", width: "40%" }}>
                            {/* {
                                    addTeacher?.id ?
                                        <SoftButton className="add-teacher" variant="gradient" color="info">
                                            update
                                        </SoftButton> : <SoftButton className="add-teacher" variant="gradient" color="info" fullWidth >
                                            Add Teacher
                                        </SoftButton>

                                } */}

                            <SoftButton className="teacher1" variant="gradient" color="info" fullWidth onClick={addNewTeacher} style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                            >
                                {location?.state ? "Update" : "Add"} Game
                            </SoftButton>

                            {/* <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={addNewTeacher()} >
                                                    {addTeacher?.id ? "Update" : "Add Teacher"}
                                                </SoftButton> */}
                            <SoftButton variant="gradient" color="info" marginLeft="50%" fullWidth onClick={cancelBtn} style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}
                            >
                                Cancel
                            </SoftButton>
                        </SoftBox>
                        {/* </div> */}
                    </form>
                </div >
            </SoftBox >
        </>
    )
}

export default TeacherForm;