import { Modal } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import { ApiPost } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import React, { useEffect, useState } from 'react'
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ApiPut } from 'config/Api/ApiData';
import hotkeys from 'hotkeys-js';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const categoryDropDown = [
    { label: "Started", value: "Started" },
    { label: "Pending", value: "Pending" },
    { label: "Finished", value: "Finished" },
];
const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

const AssignmentForm = () => {

    const token = localStorage.getItem("token");
    const location = useLocation();

    const [addAssignment, setAddAssignment] = useState({
        title: "",
        status: "",
        assignmentSummary: "",
        startDate: "",
        endDate: "",
        projectDescription: ""
    });
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [error, setError] = useState({
        title: "",
        status: "",
        assignmentSummary: "",
        startDate: "",
        endDate: "",
        projectDescription: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        const textRegex = /^[A-Za-z\s]+$/;

        setAddAssignment({
            ...addAssignment,
            [e.target.name]: e.target.value,
        });
        if (name === "title" ) {
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
        if (value.trim() === "") {
            setError({
                ...error,
                [name]: "",
            });
        }

    };

    useEffect(() => {
        if (location?.state) {
            setAddAssignment(location?.state);
        }
    }, []);


    const createAssignment = () => {

        const error = {};
        if (!addAssignment.title) {
            error.title = "Please Title Required";
        }

        if (!addAssignment.status) {
            error.status = "Please LastName Required";
        }
        if (!addAssignment.assignmentSummary) {
            error.assignmentSummary = "Please Assignment Summary Required";
        }
        if (!addAssignment.projectDescription) {
            error.projectDescription = "Please Description Required";
        }

        if (
            error.title ||
            error.status ||
            error.assignmentSummary ||
            error.projectDescription
        ) {
            setError(error);
            return;
        }

        const body = {
            title: addAssignment?.title,
            status: addAssignment?.status,
            assignmentSummary: addAssignment?.assignmentSummary,
            startDate: startDate,
            endDate: endDate,
            projectDescription: addAssignment?.projectDescription,
        }

        if (location?.state) {
            ApiPut(`${EndPoint.ASSIGNMENT_UPDATE}/${location?.state?.id}`, body)

                .then((res) => {
                    toast.success("Update successfully");

                    navigate('/assignments');

                });

        } else {
            ApiPost(`${EndPoint.ASSIGNMENT_CREATE}`, body,
                { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    if (res.status == 201) {
                        setAddAssignment({
                            title: "",
                            status: "",
                            assignmentSummary: "",
                            startDate: "",
                            endDate: "",
                            projectDescription: ""
                        });
                        navigate('/assignments');
                        toast.success(<p style={{ fontSize: "78%" }}>{"Add Assignment Successfully"}</p>);
                    }
                }).catch((error) => {
                    if (error.error === "assignments already exists") {
                        toast.error(<p style={{ fontSize: "80%" }}>{"Assignment Already Registered"}</p>, {
                            position: "top-center",
                        });
                    }
                });
        }
    }
    useEffect(() => {
        hotkeys("alt + c", (e) => {
            e.preventDefault();
            navigate('/assignments');
        });
        return () => {
            hotkeys.unbind("alt + c");
        }

    })

    return (
        <>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}> */}
            <SoftBox mt={4} mb={1}>
                <div className="container" style={{ marginTop: "8%", marginLeft: "21.5%" }}>
                    {/* <form className="add-assignments"> */}
                    {/* <div className="row jumbotron box2"> */}
                    <div className="col-sm-12 mx-t3 mb-3">
                        <h2 style={{ textAlign: "left", marginTop: "1%",fontSize:"larger", fontWeight: "500",color: "#344767" }}>
                            {" "}
                            {addAssignment?.id ? "Update" : "Add"} Assignment

                        </h2>
                    </div>
                    <div style={{ display: "flex", marginTop: "6%" }}>

                        <div className="col-sm-6 form-group">
                            <label htmlFor="name-f">Title</label>
                            <SoftInput
                                type="text"
                                name="title"
                                value={addAssignment?.title}
                                placeholder="Title"
                                onChange={(e) => {
                                    setError({
                                        ...error,
                                        title: "",
                                    });
                                    handleChange(e);
                                }}
                                style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                            />
                            {error.title && <p style={{ color: "red", fontSize: "60%" }}>{error.title} </p>}

                        </div>
                        <div className="col-sm-6 form-group">
                            <label htmlFor="name-l">Status</label>
                            {/* <SoftInput
                                type="text"
                                name="status"
                                value={addAssignment?.status}
                                placeholder="Status"
                                onChange={(e) => {
                                    setError({
                                        ...error,
                                        status: "",
                                    });
                                    handleChange(e);
                                }}
                                style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                            /> */}
                            <label htmlFor='inputCategory'></label>
                            <select
                                name='status'
                                id='inputCategory'
                                className='form-control'
                                value={addAssignment?.status}
                                onChange={(e) => handleChange(e)}
                                style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}
                            // style={{marginLeft:"50%"}}
                            >
                                <option key="">Select Status</option>
                                {categoryDropDown &&
                                    categoryDropDown?.map((x) => (
                                        <option key={x.value}>{x.value}</option>
                                    ))}
                            </select>
                            {error.status && <p style={{ color: "red", fontSize: "60%" }}>{error.status} </p>}
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>

                        <div className="col-sm-6 form-group">
                            <label htmlFor="email">Assignment Summary</label>
                            <SoftInput
                                type="text"
                                name="assignmentSummary"
                                value={addAssignment?.assignmentSummary}
                                placeholder="Assignment Summary"
                                onChange={(e) => {
                                    setError({
                                        ...error,
                                        assignmentSummary: "",
                                    });
                                    handleChange(e);
                                }}
                                style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                            />
                            {error.assignmentSummary && <p style={{ color: "red", fontSize: "60%" }}>{error.assignmentSummary} </p>}

                        </div>
                        <div className="col-sm-6 form-group ">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* <DemoContainer
                                    components={['DatePicker', 'DateTimePicker', 'DateRangePicker']}
                                > */}
                                <label htmlFor='email'>DatePicker</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    defaultValue={today}
                                    minDate={tomorrow}
                                    format="DD/MM/YYYY"
                                    views={['year', 'month', 'day']}
                                    sx={{
                                        "& .MuiSvgIcon-root": {
                                            marginLeft: "18rem",
                                        },
                                        "&  .MuiButtonBase-root  ": {
                                            border: "none",
                                            outline: "none"
                                        }
                                    }}
                                style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                                />
                                {/* </DemoContainer> */}
                            </LocalizationProvider>

                            {error.startDate && <p style={{ color: "red", fontSize: "60%" }}>{error.startDate} </p>}
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>
                        <div className="col-sm-6 form-group ">
                            {/* <label htmlFor="date"></label>
                            <SoftInput
                                type="date"
                                name="endDate"
                                value={addAssignment?.endDate}
                                placeholder="dd/MM/yyyy"
                                onChange={(e) => {
                                    handleChange(e);
                                }}
                            /> */}
                            {/* <DateRangePicker defaultValue={[today, tomorrow]} minDate={tomorrow} /> */}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                {/* <DemoContainer
                                    components={['DatePicker', 'DateTimePicker', 'DateRangePicker']}
                                > */}
                                <label htmlFor='email'>DatePicker</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate}
                                    defaultValue={today}
                                    // minDate={tomorrow}
                                    format="DD/MM/YYYY"
                                    views={['year', 'month', 'day']}
                                    sx={{
                                        "& .MuiSvgIcon-root": {
                                            marginLeft: "18rem",
                                        },
                                        "&  .MuiButtonBase-root  ": {
                                            border: "none",
                                            outline: "none"
                                        },
                                        // "& .MuiButtonBase-root ":{
                                        //     "& .Mui-disabled ":{
                                        //         "& .MuiPickersDay-root":{
                                        //             "& .Mui-selected ":{
                                        //                 "& .Mui-disabled":{
                                        //                     "& .MuiPickersDay-dayWithMargin":{
                                        //                         "& .MuiPickersDay-today":{
                                        //                             "& .css-1r2w4dn-MuiButtonBase-root-MuiPickersDay-root":{
                                        //                                 background: 'linear-gradient(310deg, #2152ff, #21d4fd)'
                                        //                             }
                                        //                         }
                                        //                     }
                                        //                 }
                                        //             }
                                        //         }
                                        //     }
                                        // }
                                    }}
                                style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                                />
                                {/* </DemoContainer> */}
                            </LocalizationProvider>
                            {error.endDate && <p style={{ color: "red", fontSize: "60%" }}>{error.endDate} </p>}
                        </div>

                        <div className="col-sm-6 form-group">
                            <label htmlFor="mobile">Project Description</label>
                            <SoftInput
                                type="text"
                                name="projectDescription"
                                value={addAssignment?.projectDescription}
                                placeholder="Project Description"
                                onChange={(e) => {
                                    setError({
                                        ...error,
                                        projectDescription: "",
                                    });
                                    handleChange(e);
                                }}
                                style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                            />
                            {error.projectDescription && <p style={{ color: "red", fontSize: "60%" }}>{error.projectDescription} </p>}

                        </div>
                    </div>
                    <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "30%", width: "40%" }}>


                        <SoftButton className="add-teacher" variant="gradient" color="info" fullWidth onClick={createAssignment} style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0px solid rgba(0, 0, 0, 0.125)",outline:"none" }}>
                            {/* Add Assignment */}
                            {location?.state ? "Update" : "Add"}
                        </SoftButton>
                        <SoftButton variant="gradient" color="info" marginLeft="50%" fullWidth onClick={() => { navigate('/assignments') }} style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0px solid rgba(0, 0, 0, 0.125)",outline:"none" }}>
                            Cancel
                        </SoftButton>
                    </SoftBox>
                    {/* </div> */}
                    {/* </form> */}
                </div>

            </SoftBox >

        </>
    )
}

export default AssignmentForm;