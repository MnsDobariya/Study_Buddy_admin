import { Modal } from '@mui/material';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import { ApiPost } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const categoryDropDown = [
    { label: "Started", value: "Started" },
    { label: "Pending", value: "Pending" },
    { label: "Finished", value: "Finished" },
];

const AssignmentForm = () => {
    
    const [addAssignment, setAddAssignment] = useState({
        title: "",
        status: "",
        assignmentSummary: "",
        startDate: "",
        endDate: "",
        projectDescription: ""
    });
    const navigate = useNavigate();

    const [error, setError] = useState({
        title: "",
        status: "",
        assignmentSummary: "",
        startDate: "",
        endDate: "",
        projectDescription: ""
    });

    const handleChange = (e) => {
        // console.log(e.target.value,"hello");
        setAddAssignment({
            ...addAssignment,
            [e.target.name]: e.target.value,
        });
    };



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
            startDate: addAssignment?.startDate,
            endDate: addAssignment?.endDate,
            projectDescription: addAssignment?.projectDescription
        }
        // axios.post("http://localhost:3000/api/v1/assignments/create", body)
        ApiPost(`${EndPoint.ASSIGNMENT_CREATE}`, body)
            .then((res) => {
                console.log("res", res);
                if (res.status == 201) {
                    setAddAssignment({
                        title: "",
                        status: "",
                        assignmentSummary: "",
                        startDate: "",
                        endDate: "",
                        projectDescription: ""
                    });
                    toast.success("Add Assignment Successfully");
                }
                navigate('/authentication/assignments')

            }).catch((error) => {
                console.log("error", error);
                if (error.error === "assignment already exists") {
                    toast.error(<p style={{ fontSize: "80%" }}>{"Assignment Already Registered"}</p>, {
                        position: "top-center",
                    });
                }
            });
    }

    return (
        <>
            <SoftBox mt={4} mb={1}>

                <div className="container" style={{ marginTop: "8%", marginLeft: "21.5%" }}>
                    {/* <form className="add-assignments"> */}
                    {/* <div className="row jumbotron box2"> */}
                    <div className="col-sm-12 mx-t3 mb-3">
                        <h2 style={{ textAlign: "left", marginTop: "1%" }}>
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
                            <SoftInput
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

                            />
                            {error.status && <p style={{ color: "red", fontSize: "60%" }}>{error.status} </p>}


                            {/* <label htmlFor='inputCategory'></label>
                                    <select
                                        name='status'
                                        id='inputCategory'
                                        className='form-control'
                                        value={addAssignment?.status}
                                        onChange={(e) => handleChange(e)}
                                    // style={{marginLeft:"50%"}}
                                    >
                                        {categoryDropDown &&
                                            categoryDropDown?.map((x) => (
                                                <option value={x.value}>{x.value}</option>
                                            ))}
                                    </select> */}
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>

                        <div className="col-sm-6 form-group">
                            <label htmlFor="email">AssignmentSummary</label>
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
                        <div className="col-sm-6 form-group">
                            <label htmlFor="password">Start Data</label>
                            <SoftInput
                                type="date"
                                name="startDate"
                                value={addAssignment?.startDate}
                                onChange={(e) => {
                                    setError({
                                        ...error,
                                        startDate: "",
                                    });
                                    handleChange(e);
                                }}
                                style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}
                            />
                            {error.startDate && <p style={{ color: "red", fontSize: "60%" }}>{error.startDate} </p>}
                        </div>
                    </div>
                    <div style={{ display: "flex" }}>

                        <div className="col-sm-6 form-group">
                            <label htmlFor="mobile">End Date</label>
                            <SoftInput
                                type="date"
                                name="endDate"
                                value={addAssignment?.endDate}
                                onChange={(e) => {
                                    setError({
                                        ...error,
                                        endDate: "",
                                    });
                                    handleChange(e);
                                }}
                                style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                            />
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


                        <SoftButton className="add-teacher" variant="gradient" color="info" fullWidth onClick={createAssignment} style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}>
                            Add Assignment
                        </SoftButton>
                        <SoftButton variant="gradient" color="info" marginLeft="50%" fullWidth onClick={() => { navigate('/authentication/assignments') }} style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}>
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