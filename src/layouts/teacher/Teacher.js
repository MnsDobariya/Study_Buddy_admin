import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, Modal, Typography } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
// import image from 'Images/Screenshot (231).png'
import { toast } from 'react-toastify';
import '../teacher/Css/teacher.css';
import SoftInput from 'components/SoftInput';
import { EndPoint } from "config/EndPoint/Endpoint";
import { ApiPut } from "config/Api/ApiData";
import { ApiPost } from "config/Api/ApiData";
import { ApiGet } from "config/Api/ApiData";
// import { ApiDelete } from 'config/Api/ApiData';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  faXmark } from '@fortawesome/free-solid-svg-icons';


// const columns = ['CompanyName', 'City', 'State', 'Phone', 'Fax'];


const Teacher = () => {
    const [open, setOpen] = useState(false);
    const [addTeacher, setAddTeacher] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        gender: ""
    })

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [teacherRecord, setTeacherRecord] = useState([]);
    const token = localStorage.getItem("token")

    const getTeacherRecord = () => {
        // axios.get("http://localhost:3000/api/v1/users/teacher/get",
        ApiGet(`${EndPoint.USER_GET}`,

            { headers: { "Authorization": `Bearer ${token}` } }).then((res) => {
                // console.log("helloo",res);
                setTeacherRecord(res.data);
            });
    };

    useEffect((e) => {
        getTeacherRecord();

    }, []);

    


    const [openPopUp, setOpenPopUp] = useState(false);
    const [deleteRowId, setDeleteRowId] = useState();

    const columns = [
        { field: "index", headerName: "Id", width: 90 },
        { field: "firstName", headerName: "FirstName", width: 150 },
        { field: "lastName", headerName: "LastName", width: 150 },
        { field: "email", headerName: "Email", width: 130 },
        { field: "phone", headerName: "Mobile_No", width: 160 },
        { field: "gender", headerName: "Gender", width: 150 },

        // action
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {/* Edit */}
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            height='20px'
                            width='30px'
                            className='edit-icon'
                            // onClick={(e) => {
                            //     // console.log("e",params.row.id);
                            //     setOpenPopUp(true);
                            //     setDeleteRowId(params.row.id);
                            // }}
                            onClick={() => {
                                // console.log(params.row);
                                setAddTeacher(params.row)
                                handleOpen()
                            }}
                            style={{ marginRight: "10px", cursor: "pointer" }}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                            />
                        </svg>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            height='20px'
                            width='50px'
                            className='edit-icon'
                            data-toggle='modal'
                            data-target='#exampleModal'
                            onClick={(e) => {
                                // console.log("e",params.row.id);
                                setOpenPopUp(true);
                                setDeleteRowId(params.row.id);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                        </svg>
                    </>
                );
            },
        },
    ];
    const deleteRecord = (id) => {
        // ApiDelete(`${EndPoint.USER_DELETE}`)
        axios.delete(`http://localhost:3000/api/v1/users/teacher/delete/${id}`)
            .then((res) => {
                // console.log("res.data",res.data);
                toast.success("Deleted successfully");
                getTeacherRecord();
            });
    };

    const handleChange = (e) => {
        setAddTeacher({
            ...addTeacher,
            [e.target.name]: e.target.value,
        });
    };
    const indexedData = teacherRecord.map((item, index) => ({
        ...item,
        index: index + 1,
    }));

    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        gender: ""
    });

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

        ApiPost(`${EndPoint.USER_CREATE}`, body)
            .then((res) => {
                console.log("res", res);
                if (res.status == 201) {
                    setAddTeacher({
                        firstName: "",
                        lastName: "",
                        email: "",
                        phone: "",
                        password: "",
                        gender: ""
                    });
                    toast.success("Add Teacher Successfully");
                }
                handleClose();
                getTeacherRecord();

            }).catch((error) => {
                console.log("error", error);
                if (error.response.data.message === "email already exists") {
                    toast.error(<p style={{ fontSize: "80%" }}>{"Teacher Already Registered"}</p>, {
                        position: "top-center",
                    });
                }
            });

    }

    const updateTeacher = () => {

        const body = {
            firstName: addTeacher?.firstName,
            lastName: addTeacher?.lastName,
            email: addTeacher?.email,
            password: addTeacher?.password,
            phone: addTeacher?.phone,
            gender: addTeacher?.gender,

        }
        console.log(addTeacher?.id,'addTeacher?.id')
        ApiPut(`${EndPoint.USER_UPDATE}?id=${addTeacher?.id}`,body )
            .then((res) => {
                console.log("update", res);
                toast.success("Update successfully");
                handleClose();

            }).catch((e)=>{
                console.log(e,"message")
            })
    }

    return (
        <>
            <div style={{ width: "70%", padding: "1%", marginLeft: "20%" }}>
                <DataGrid
                    rows={indexedData}
                    columns={columns}
                    pageSize={5}
                    components={{
                        Toolbar: () => (
                            <div
                                style={{

                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <GridToolbar />
                                <SoftButton variant="gradient" color="info" marginLeft="50%" onClick={handleOpen} >
                                    Add Teacher
                                </SoftButton>
                            </div>
                        ),
                    }}
                    style={{ height: "90vh", width: "100%", padding: "2%" }}
                    onRowClick={(e) => {
                        // console.log(e);
                    }}
                    className='custom-data-grid'
                />
                {openPopUp && (
                    <div>

                        {/* hello
                <button onClick={()=>deleteRecord(deleteRowId)}>Yes</button>
                <button onClick={()=>{setOpenPopUp(false)}}>No</button> */}

                        <div
                            className='modal fade'
                            id='exampleModal'
                            tabIndex='-1'
                            role='dialog'
                            aria-labelledby='exampleModalLabel'
                            aria-hidden='true'
                        >
                            <div className='modal-dialog' role='document'>
                                <div className='modal-content'>
                                    <div className='modal-header'>
                                        <h5 className='modal-title' id='exampleModalLabel'>
                                            Delete
                                        </h5>
                                        <button
                                            type='button'
                                            className='close'
                                            data-dismiss='modal'
                                            aria-label='Close'
                                        >
                                            <span aria-hidden='true'>&times;</span>
                                        </button>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            fontSize: "18px",
                                            padding: "10px 20px",
                                        }}
                                    >
                                        Are you sure Delete?
                                    </div>
                                    <div className='modal-footer'>
                                        <button
                                            type='button'
                                            className='btn btn-secondary'
                                            data-dismiss='modal'
                                            onClick={() => {
                                                setOpenPopUp(false);
                                            }}
                                        >
                                            No
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-danger'
                                            data-dismiss='modal'
                                            onClick={() => {
                                                deleteRecord(deleteRowId)
                                                setOpenPopUp(false)
                                            }}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <SoftBox mt={4} mb={1}>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <div className="form_wrapper">
                            <div className="form_container">
                                <div className="title_container">
                                    {/* <h2>Add Teacher Data</h2> */}
                                    <h2 style={{ textAlign: "center", marginBottom: "5%" }}>
                                        {" "}
                                        {addTeacher?.id ? "Update" : "Add"} Teacher

                                    </h2>
                                </div>
                                <div className="row clearfix">
                                    <div className="">
                                        <form>
                                            <div className="input_field">
                                                <SoftBox>
                                                    <SoftInput
                                                        type="text"
                                                        name="firstName"
                                                        value={addTeacher.firstName}
                                                        placeholder="First Name"
                                                        onChange={(e) => {
                                                            setError({
                                                                ...error,
                                                                firstName: "",
                                                            });
                                                            handleChange(e);
                                                        }}
                                                    />
                                                    {error.firstName && <p style={{ color: "red", fontSize: "60%" }}>{error.firstName} </p>}
                                                </SoftBox>
                                            </div>
                                            <div className="input_field">
                                                <SoftBox>
                                                    <SoftInput
                                                        type="text"
                                                        name="lastName"
                                                        value={addTeacher.lastName}
                                                        placeholder="Last Name"
                                                        onChange={(e) => {
                                                            setError({
                                                                ...error,
                                                                lastName: "",
                                                            });
                                                            handleChange(e);
                                                        }}
                                                    />
                                                    {error.lastName && <p style={{ color: "red", fontSize: "60%" }}>{error.lastName} </p>}
                                                </SoftBox>
                                            </div>
                                            <div className="input_field">
                                                <SoftBox>
                                                    <SoftInput
                                                        type="email"
                                                        name="email"
                                                        value={addTeacher.email}
                                                        placeholder="Email"
                                                        onChange={(e) => {
                                                            setError({
                                                                ...error,
                                                                email: "",
                                                            });
                                                            handleChange(e);
                                                        }}
                                                    />
                                                    {error.email && <p style={{ color: "red", fontSize: "60%" }}>{error.email} </p>}
                                                </SoftBox>
                                            </div>
                                            <div className="input_field">
                                                <SoftBox>
                                                    <SoftInput
                                                        type="password"
                                                        name="password"
                                                        value={addTeacher.password}
                                                        placeholder="Password"
                                                        onChange={(e) => {
                                                            setError({
                                                                ...error,
                                                                password: "",
                                                            });
                                                            handleChange(e);
                                                        }}
                                                    />
                                                    {error.password && <p style={{ color: "red", fontSize: "60%" }}>{error.password} </p>}
                                                </SoftBox>
                                            </div>
                                            {/* <div className="row clearfix">
                                                <div className="col_half"> */}
                                            <div className="input_field">
                                                <SoftBox>
                                                    <SoftInput
                                                        type="mobile"
                                                        name="phone"
                                                        value={addTeacher.phone}
                                                        placeholder="Mobile No"
                                                        onChange={(e) => {
                                                            setError({
                                                                ...error,
                                                                phone: "",
                                                            });
                                                            handleChange(e);
                                                        }}
                                                    />
                                                    {error.phone && <p style={{ color: "red", fontSize: "60%" }}>{error.phone} </p>}
                                                </SoftBox>
                                            </div>
                                            <SoftBox mb={1} mt={0} style={{ marginRight: "20%" }}>

                                                <div className='form-group col-md-6 mt-4'>
                                                    <h5 style={{ display: "flex" }}>
                                                        Gender :{" "}
                                                    </h5>
                                                    <input
                                                        type='radio'
                                                        name='gender'
                                                        style={{ marginTop: "5%" }}
                                                        checked={addTeacher.gender == "male" ? true : false}
                                                        onChange={(e) =>
                                                            setAddTeacher({
                                                                ...addTeacher,
                                                                gender: "male",
                                                            })
                                                        }
                                                    />
                                                    Male
                                                    <input
                                                        type='radio'
                                                        name='gender'
                                                        style={{ marginLeft: "30px" }}
                                                        checked={addTeacher.gender == "feMale" ? true : false}
                                                        onChange={(e) =>
                                                            setAddTeacher({
                                                                ...addTeacher,
                                                                gender: "feMale",
                                                            })
                                                        }
                                                    />
                                                    Female
                                                </div>
                                            </SoftBox>
                                            <SoftBox mt={4} mb={1} style={{ display: "flex", justifyContent: "center", justifyContent: "space-between" }}>
                                                {
                                                    addTeacher?.id ?
                                                        <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={updateTeacher} >
                                                            update
                                                        </SoftButton> : <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={addNewTeacher} >
                                                            Add Teacher
                                                        </SoftButton>

                                                }
                                                {/* <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={addNewTeacher()} >
                                                    {addTeacher?.id ? "Update" : "Add Teacher"}
                                                </SoftButton> */}
                                                <SoftButton variant="gradient" color="info" marginLeft="50%" onClick={handleClose} >
                                                    Cancel
                                                </SoftButton>
                                            </SoftBox>

                                            {/* <div className="input_field select_option">
                                                <select>
                                                    <option>Select a country</option>
                                                    <option>Option 1</option>
                                                    <option>Option 2</option>
                                                </select>x
                                                <div className="select_arrow"></div>
                                            </div>
                                            <div className="input_field checkbox_option">
                                                <input type="checkbox" id="cb1" />
                                                <label>I agree with terms and conditions</label>
                                            </div>
                                            <div className="input_field checkbox_option">
                                                <input type="checkbox" id="cb2" />
                                                <label >I want to receive the newsletter</label>
                                            </div> */}
                                            {/* <input className="button" type="submit" value="Register" /> */}
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal >
                </SoftBox >
            </div >
        </>
    )
}

export default Teacher;