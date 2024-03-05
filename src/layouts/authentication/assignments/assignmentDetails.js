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
import { useLocation, useNavigate } from "react-router-dom";
import Tasks from "./Tasks";
import Details from "./Details";
import moment from "moment";
import Discussion from "./Discussion";
import { ApiPut } from "config/Api/ApiData";
// import '../assignments/assignment.css';

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

const assignmentDetails = () => {
    const [open, setOpen] = useState();
    const [tasks, setTasks] = useState({
        dueDate: "",
        task: "",
        description: "",
        assignId: "",
        assassignmentId: "",
    });
    const [startDate, setStartDate] = useState(new Date());
    const [tab, setTab] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const location = useLocation();
    // console.log(location, "location");

    const navigate = useNavigate();

    
    const handleTabClick = (tab) => {
        setTab(tab);
        setActiveTab(tab);
    }


    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        // setTasks({
        //     dueDate: "",
        //     task: "",
        //     description: "",
        // });
        setOpen(false);
    }

    const handleChange = (e) => {
        setTasks({
            ...tasks,
            [e.target.name]: e.target.value,
        });
    }

    // useEffect(() => {
    //     if (location?.state?.tasks) {
    //         setTasks(location?.state?.tasks)
    //         setOpen(true);
    //     }
    // }, [location]);


    const AddTasks = () => {
        const body = {
            dueDate: startDate,
            task: tasks?.task,
            description: tasks?.description,
            assignId: tasks?.assignId,
            assignmentId: location?.state?.assignmentDetail?.id,
        }

        // if (location?.state?.tasks) {
        //     ApiPut(`${EndPoint.TASK_UPDATE}/${location?.state?.tasks?.id}`, body)
        //         .then((res) => {
        //             if (res?.status === 200) {
        //                 setTasks({
        //                     dueDate: "",
        //                     task: "",
        //                     description: "",
        //                 });
        //             }
        //             toast.success("Update Successfully");
        //             handleClose();
        //         });
        // } else {
            ApiPost(`${EndPoint.TASKS_CREATE}`, body)
                .then((res) => {
                    // console.log(res, "tasksres");
                    if (res.status === 201) {
                        setTasks({
                            dueDate: "",
                            task: "",
                            description: "",

                        })
                        handleClose();
                    }
                })
        // }
    }


    return (
        <>
            <div className="cardassignmentTitle w-75">

                <div className="card-assignment" style={{ height: "77px" }}>

                    <div style={{ padding: "22px", color: "#344767" }}>
                        <p className="card-assignment">Assignment Details</p>

                    </div>
                    <p className="card-assignment"> </p>
                </div>
            </div>
            <SoftBox mt={4} mb={1}>
                <div className="cardassignment w-75">

                    <div className="cardTitleassignment d-flex align-items-center">
                        <div className="lblassignment">
                            <label1>M</label1>
                        </div>
                        <h5 className="mb-2">{location?.state?.assignmentDetail?.title}</h5>
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
                    <div style={{ marginTop: "1%" }}>


                        <div className="row mt-3 ml-3">
                            <div className="col-sm-2 mx-2">
                                <p className="assignmentdata">Status</p>
                                <label className={location?.state?.assignmentDetail?.status === 'Pending' ? 'pending' : location?.state?.assignmentDetail?.status === 'Started' ? 'started' : 'finished'} style={{ width: "60px", marginLeft: "0px" }} >
                                    <span className='' >{location?.state?.assignmentDetail?.status}</span>
                                </label>
                            </div>
                            <div className="col-sm-2 mx-2">
                                <p className="assignmentdata">EndDate</p>
                                <p className="endDate">{moment(location?.state?.assignmentDetail?.endDate).format('DD MMM YYYY')}</p>
                            </div>
                            <div className="col-sm-2 mx-2">
                                <p className="assignmentdata">StartDate</p>
                                <p className="startDate">{moment(location?.state?.assignmentDetail?.startDate).format('DD MMM YYYY')}</p>
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


                        <div className="row mt-3 ml-3">
                            <div className="col-md-4">
                                <button className={`assignmentdetails ${activeTab === "detail" ? "active" : ""}`} onClick={() => handleTabClick("detail")} style={{border: "0px", outline: "none"}}>Details</button>
                            </div>
                            <div className="col-md-3">
                                <button className={`assignmentdetails ${activeTab === "task" ? "active" : ""}`} onClick={() => handleTabClick("task")} style={{border: "0px", outline: "none"}}>Task</button>
                            </div>
                            <div className="col-md-3">
                                <button className={`assignmentdetails ${activeTab === "discussion" ? "active" : ""}`} onClick={() => handleTabClick("discussion")} style={{border: "0px", outline: "none"}}>Discussion</button>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </SoftBox>


            {
                tab == "detail" && (
                    <Details />
                )
            }
            {
                tab == "task" && (
                    <Tasks />

                )
            }
            {
                tab == "discussion" && (
                    <Discussion assignmentDetails={location?.state} />
                )
            }





            <SoftBox mt={4} mb={1}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="container" style={{ marginTop: "10%" }}>
                        <form className="addtasks">
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
                                    name="task"
                                    value={tasks?.task}
                                    placeholder="Tasks"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />

                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="assignId" style={{ color: "#344767" }}>AssignTo</label>
                                {/* <SoftInput
                                    type="text"
                                    name="assignId"
                                    value={tasks?.assignId}
                                    placeholder="assignId"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}

                                /> */}
                                <select
                                    name="assignId"
                                    id="assignId"
                                    className='form-control'
                                    style={{ borderRadius: "0.5rem" }}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                >
                                    <option key="">Select AssignTo</option>
                                    {location?.state?.assignmentDetail?.members?.map((x) => (
                                        <option key={x.id} value={x.id}>{x?.firstName}</option>
                                    ))}
                                </select>

                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-l" style={{ color: "#344767" }}>Description</label>
                                <SoftInput
                                    type="text"
                                    name="description"
                                    value={tasks?.description}
                                    placeholder="Description"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
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

                                <SoftButton className="add-Tasks" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%", border: "0px", outline: "none" }} onClick={AddTasks}>
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