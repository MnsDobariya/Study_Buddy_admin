import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Tasks = ()  => {
    const navigate = useNavigate();

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
                    <div className="cardTitleassignment d-flex align-items-center">
                        <div className="lblassignment">
                            <label1>M</label1>
                        </div>
                        <h5 className="mb-2">Abc</h5>
                        {/* <p className="mb-0">9 minutes ago</p> */}
                        <div className="ml-auto mr-3 d-flex" style={{ gap: "20px" }}>
                            <SoftButton variant="gradient" color="info" style={{ border: "0px", outline: "none" }} >
                                Add Task
                            </SoftButton>
                            <SoftButton variant="gradient" color="info" style={{ border: "0px", outline: "none" }}>
                                Edit
                            </SoftButton>

                        </div>
                    </div>
                    {/* <p>9 minutes ago</p> */}
                    <div style={{ marginTop: "1%" }}>
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
                        <div className="row mt-3 ml-3">
                            <div className="col-md-4">
                                <h4 className="assignmentdetails" onClick={() => {
                                    navigate("/assignments/details");
                                }}>Details</h4>
                            </div>
                            <div className="col-md-3">
                                <h4 className="assignmentdetails" onClick={() => {
                                    navigate("/assignments/tasks")
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
            <SoftBox>
                <div className="cardTasks w-75">

                    <div className="card-Tasks" style={{ height: "110px" }}>

                        <div style={{ padding: "22px 22px 8px 22px", color: "#344767", fontSize: "initial" }}>
                            <p>AssignmentDetails</p>
                        </div>
                        <div className="card-Tasks2">
                            <div className="lbltasks">
                                <label1>M</label1>
                            </div>
                            <h5 style={{ padding: "8px", fontSize: "medium", color: "#67748e" }}> Assignment Details</h5>
                            <label className='dateTasks'>
                                <span className=''><p> DUE DATE: 30 MAR 2024</p></span>
                            </label>
                            <div className="mr-5" style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                                <FontAwesomeIcon icon={faPen}
                                    style={{ cursor: "pointer" }}
                                />
                                <FontAwesomeIcon icon={faTrash}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </SoftBox>
        </>

    )
}

export default Tasks;