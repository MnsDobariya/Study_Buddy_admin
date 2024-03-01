import { Modal } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import { ApiPost } from "config/Api/ApiData";
import { ApiGet } from "config/Api/ApiData";
import { EndPoint } from "config/EndPoint/Endpoint";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import '../assignments/assignment.css';

const today = dayjs();
const tomorrow = dayjs().add(1,'day');

const assignmentDetails = () => {
    const [open, setOpen] = useState();
    const [tasks, setTasks] = useState({
        dueDate: "",
        task: "",
        description: "",
    });
const [startDate,setStartDate] = useState(new Date());

const navigate = useNavigate();

const handleOpen = () => {
    setOpen(true);
}

const handleClose = () => {
    setOpen(false);
}

    //     const [assignmentDetails,setAssignmentDetails] = useState();

    // const getAssignmentDetails = () => {
    //     ApiGet(`${EndPoint.ASSIGNMENT_GETUSER}`)
    //     .then((res)=> {
    //         console.log(res,"response");
    //     })
    // }

    // useEffect(() => {
    //     getAssignmentDetails("");
    // },[]);

    const AddTasks = () => {
        const body = {
            dueDate:tasks?.dueDate,
            task:tasks?.task,
            description:tasks?.description,
        }

        ApiPost(`${EndPoint.TASKS_CREATE}`,body)
        .then((res) => {
            console.log(res,"tasksres");
            if(res.status === 201){
                setTasks({
                    dueDate:"",
                    task:"",
                    description:""
                })
                handleClose();
            }
        })
    }

    return (
        <>
            <div className="cardassignmentTitle w-75">

                <div className="card-assignment" style={{ height: "77px" }}>

                    <div style={{ padding: "22px", color: "#344767" }}>
                        <p className="card-assignment">AssignmentDetails</p>

                    </div>
                    <p className="card-assignment"> </p>
                </div>
            </div>
            <SoftBox mt={4} mb={1}>
                <div className="cardassignment w-75">

                    {/* <div className="card-assignment2"> */}

                    {/* <div style={{ display: "flex" }}>
                        <p className="card-assignment"></p>
                        <label className=''>
                            <span className=''></span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >

                        </div>
                    </div>
                    <p className="card-assignment"></p> */}
                    {/* <div className="cardTitleassignment" style={{ display: "flex" }}>
                        <div className="lblassignment" >
                            <label1>M</label1>
                        </div>
                        <h5>Abc</h5>
                        <p> 9 minutes ago</p>
                    </div> */}
                    <div className="cardTitleassignment d-flex align-items-center">
                        <div className="lblassignment">
                            <label1>M</label1>
                        </div>
                        <h5 className="mb-2">Abc</h5>
                        {/* <p className="mb-0">9 minutes ago</p> */}
                        <div className="ml-auto mr-3 d-flex" style={{ gap: "20px" }}>
                            <SoftButton variant="gradient" color="info" style={{ border: "0px", outline: "none" }} onClick={() => {
                                handleOpen(true);
                            }}>
                                Add Task
                            </SoftButton>
                            <SoftButton variant="gradient" color="info" style={{ border: "0px", outline: "none" }}>
                                Edit
                            </SoftButton>

                        </div>
                    </div>
                    {/* <p>9 minutes ago</p> */}
                    <div style={{ marginTop: "1%" }}>

                        {/* <label>
                            <span>Status </span>
                        </label>
                        <label>
                            <span className=''>EndDate</span>
                        </label>
                        <label>
                            <span className=''>StartDate</span>
                        </label> */}
                        {/* <div className="ad-title m-auto">
                        </div> */}
                        <div className="row mt-3 ml-3">
                            <div className="col-sm-2 mx-2">
                                <p className="assignmentdata">Status</p>
                                <label className='pending' style={{ width: "60px", marginLeft: "0px", color: "#344767" }} >
                                    <span className='' >pending</span>
                                </label>
                            </div>
                            <div className="col-sm-2 mx-2">
                                <p className="assignmentdata">EndDate</p>
                                <p className="endDate">31 Des 2024</p>
                            </div>
                            <div className="col-sm-2 mx-2">
                                <p className="assignmentdata">StartDate</p>
                                <p className="startDate">31 Des 2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body text-center" style={{ display: "flex", justifyContent: "start", marginLeft: "1%" }}>
                        <div className="lbl" style={{ width: "31px" }}>
                            <label1>MM</label1>
                        </div>
                        <div className="lbl1" style={{ width: "31px" }} >
                            <label1>FM</label1>
                        </div>
                    </div>
                    <div style={{ paddingBottom: "2%", marginTop: "1%", display: "flex", color: "#67748e" }}>

                        {/* <label>
    <span>Status </span>
</label>
<label>
    <span className=''>EndDate</span>
</label>
<label>
    <span className=''>StartDate</span>
</label> */}
                        {/* <div className="ad-title m-auto">
</div> */}
                        <div className="row mt-3 ml-3">
                            <div className="col-md-4">
                                <h4 className="assignmentdetails" onClick={() => {
                                    navigate("/assignments/details");
                                }}>Details</h4>
                            </div>
                            <div className="col-md-3">
                                <h4 className="assignmentdetails" onClick={() => {
                                    navigate("/assignments/tasks");
                                }}>Task</h4>
                            </div>
                            <div className="col-md-3">
                                <h4 className="assignmentdetails" onClick={() => {
                                    navigate("/assignments/description");
                                }}>Description</h4>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </SoftBox>
            <SoftBox mt={4} mb={1}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="container" style={{ marginTop: "10%" }}>
                        <form className="addresources">
                            <div className="col-sm-12 mx-t3 mb-4">
                                <h3 style={{ textAlign: "center", marginTop: "5%", paddingTop: "3%", fontSize: "larger", fontWeight: "500", color: "#344767" }}>
                                    Add Tasks
                                </h3>
                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="DatePicker">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            // endDate={endDate}
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
                                                },
                                            }}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-f" style={{ color: "#344767" }}>Tasks</label>
                                <SoftInput
                                    type="text"
                                    name="tasks"
                                    value={tasks?.task}
                                    placeholder="Tasks"

                                />

                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-l" style={{ color: "#344767" }}>Description</label>
                                <SoftInput
                                    type="text"
                                    name="description"
                                    value={tasks?.description}
                                    placeholder="Description"

                                />

                            </div>
                            {/* <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="file" style={{ color: "#344767" }}>File</label>
                                <SoftInput
                                    type="text"
                                    name="Description"
                                    placeholder="Description"

                                />

                            </div> */}
                            <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "26%", width: "51%", marginBottom: "10vh" }}>

                                <SoftButton className="add-Tasks" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%", border: "0px", outline: "none" }} >
                                    Save
                                </SoftButton>

                                <SoftButton className="add-Tasks" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%", border: "0px", outline: "none" }} onClick={handleClose}>
                                    cancle
                                </SoftButton>
                            </SoftBox>

                        </form>
                    </div>
                </Modal>
            </SoftBox>
        </>
    )
}

export default assignmentDetails;