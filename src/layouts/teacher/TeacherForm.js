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
import { faCheck, faCircleXmark, faEye, faEyeSlash, faXmark } from '@fortawesome/free-solid-svg-icons';

const yearDropDown = [
    { label: "FYBCA", value: "FY BCA" },
    { label: "SYBCA", value: "SY BCA" },
    { label: "TYBCA", value: "TY BCA" }
];

const semesterDropDown = [
    { label: "Semester1", value: "Sem 1" },
    { label: "Semester2", value: "Sem 2" },
    { label: "Semester3", value: "Sem 3" },
    { label: "Semester4", value: "Sem 4" },
    { label: "Semester5", value: "Sem 5" },
    { label: "Semester6", value: "Sem 6" }
];

const divisionDropDown = [
    { label: "A", value: "A" },
    { label: "B", value: "B" },
    { label: "C", value: "C" },
    { label: "D", value: "D" },
];


const TeacherForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [addTeacher, setAddTeacher] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        gender: "male",
        year: "",
        semester: "",
        division: "",
    })
    useEffect(() => {
    }, [addTeacher])

    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    // const valid = (item, v_icon, inv_icon) => {
    //     const text = document.querySelector(`#${item}`);
    //     text.style.opacity = "1";

    //     const valid_icon = document.querySelector(`#${item} .${v_icon}`);
    //     valid_icon.style.opacity = "1";

    //     const invalid_icon = document.querySelector(`#${item} .${inv_icon}`);
    //     invalid_icon.style.opacity = "0";
    // };

    // const Invalid = (item, v_icon, inv_icon) => {
    //     const text = document.querySelector(`#${item}`);
    //     text.style.opacity = ".5";

    //     const valid_icon = document.querySelector(`#${item} .${v_icon}`);
    //     valid_icon.style.opacity = "0";

    //     const invalid_icon = document.querySelector(`#${item} .${inv_icon}`);
    //     invalid_icon.style.opacity = "1";
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const textRegex = /^[A-Za-z\s]+$/;

        setAddTeacher({
            ...addTeacher,
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


        // if (name === "password") {
        //     if (value.match(/[A-Z]/) != null) {
        //         valid('capital', 'fa-check', 'fa-times');
        //     } else {
        //         Invalid("capital", "fa-check", "fa-times");
        //     }
        //     if (value.match(/[0-9]/) != null) {
        //         valid('num', 'fa-check', 'fa-times');
        //     } else {
        //         Invalid("num", "fa-check", "fa-times");
        //     }
        //     if (value.match(/[!@#$%^&*]/) != null) {
        //         valid('char', 'fa-check', 'fa-times');
        //     } else {
        //         Invalid("char", "fa-check", "fa-times");
        //     }
        //     if (value.length > 7) {
        //         valid('more8', 'fa-check', 'fa-times');
        //     } else {
        //         Invalid("more8", "fa-check", "fa-times");
        //     }
        // }
        return;
    };

    // const valid = (item, v_icon, inv_icon) => {
    //     const text = document.querySelector(`#${item}`);
    //     text.style.opacity = 1;
    // };

    // const handleInputChange = (e) => {
    //     const txt = e.target.value;
    //     // console.log(txt,"text");

    //     if (txt.match(/[A-z]/) != null) {
    //         valid('capital', 'fa-check', 'fa-times');
    //     }
    // }

    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        gender: "",
        year: "",
        semester: "",
        division: "",
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

        // const passwordRegex =
        //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,10})/;
        // if (!addTeacher.password) {
        //     error.password = "Please Password Required";
        // } else if (!passwordRegex.test(addTeacher.password)) {
        //     error.password = "Invalid Password";
        // }


        if (
            error.firstName ||
            error.lastName ||
            error.phone ||
            error.email ||
            // error.password ||
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
            gender: addTeacher?.gender,
            year: addTeacher?.year,
            semester: addTeacher?.semester,
            division: addTeacher?.division,
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
                            gender: "",
                            year: "",
                            semester: "",
                            division: "",
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
                            {!location?.state &&
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
                                                // setError({
                                                //     ...error,
                                                //     password: "",
                                                // });
                                                // handleInputChange(e);
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
                                </div>
                            }
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
                                                phone: "",
                                            });
                                            handleChange(e);
                                        } else {
                                            setError({
                                                ...error,
                                                phone: "Please enter valid 10-digit mobile number",
                                            })
                                        }
                                    }}
                                    style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                                />
                                {error.phone && <p style={{ color: "red", fontSize: "60%" }}>{error.phone} </p>}

                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="division" style={{ fontWeight: "500" }} >Division</label>
                                <select
                                    name="division"
                                    id="division"
                                    className="form-control"
                                    value={addTeacher?.division}
                                    onChange={(e) => {
                                        // handleChange(e);
                                        const selectedDivision = e.target.value;
                                        setAddTeacher({
                                            ...addTeacher,
                                            division: selectedDivision
                                        })
                                        // setIsAuthorSelect(selectedDivision === "Other Select");
                                    }}
                                    style={{ borderRadius: "0.5rem", transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                                >
                                    <option key="">Select Division</option>
                                    {(divisionDropDown && divisionDropDown?.length > 0) &&
                                        divisionDropDown?.map((x) => (
                                            <option key={x.value}>{x.value}</option>
                                        ))
                                    }
                                    {/* <option key="other" value={"other"}>Other Select</option> */}
                                </select>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="year" style={{ fontWeight: "500" }} >Year</label>
                                <select
                                    name="year"
                                    id="year"
                                    className="form-control"
                                    value={addTeacher.year}
                                    style={{ borderRadius: "0.5rem", transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                >
                                    <option key="">Select Year</option>
                                    {yearDropDown &&
                                        yearDropDown?.map((x) => (
                                            <option key={x.value}>{x.value}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="semester" style={{ fontWeight: "500" }}>Semester</label>
                                <select
                                    name="semester"
                                    id="semester"
                                    className="form-control"
                                    value={addTeacher?.semester}
                                    style={{ borderRadius: "0.5rem", transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                >
                                    <option key="">Select Semester</option>
                                    {semesterDropDown &&
                                        semesterDropDown?.map((x) => (
                                            <option key={x.value}>{x.value}</option>
                                        ))
                                    }
                                </select>
                            </div>
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
                                style={{
                                    border: "0px",
                                    width: '4%',
                                    height: '1.2rem',
                                    marginRight: '10px'
                                }}
                            />
                            Male
                            <input
                                type='radio'
                                name='gender'
                                checked={addTeacher?.gender == "female" ? true : false}
                                onChange={(e) =>
                                    setAddTeacher({
                                        ...addTeacher,
                                        gender: "female"
                                    })}
                                style={{
                                    border: "0px",
                                    width: '4%',
                                    height: '1.2rem',
                                    marginRight: '10px',
                                    marginLeft: "20px"
                                }}
                            />
                            Female
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

                            <SoftButton className="teacher1" variant="gradient" color="info" fullWidth onClick={addNewTeacher} style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" ,outline:"none"}}

                            >
                                {location?.state ? "Update" : "Add"} Teacher
                            </SoftButton>

                            {/* <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={addNewTeacher()} >
                                                    {addTeacher?.id ? "Update" : "Add Teacher"}
                                                </SoftButton> */}
                            <SoftButton variant="gradient" color="info" marginLeft="50%" fullWidth onClick={cancelBtn} style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" ,outline:"none"}}
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