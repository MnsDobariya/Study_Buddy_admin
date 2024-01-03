import React, { useEffect, useState } from "react";
import '../../authentication/assignments/assignments.css';
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { EndPoint } from "config/EndPoint/Endpoint";
import { ApiPost } from "config/Api/ApiData";
import SoftInput from "components/SoftInput";
import { Grid, Modal } from "@mui/material";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import axios from "axios";
import { ApiGet } from "config/Api/ApiData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ApiDelete } from "config/Api/ApiData";

const Assignment = () => {

    const [assignmentRecord, setAssignmentRecord] = useState([]);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const getAssignmentRecord = () => {

        axios.get("http://localhost:3000/api/v1/assignments/get")

            // ApiGet(`${EndPoint.ASSIGNMENT_GET}`)
            .then((res) => {
                // console.log(res, "eeeee")
                setAssignmentRecord(res.data);
            })


    }
    useEffect((e) => {
        getAssignmentRecord("");
    },[])


    const navigate = useNavigate();

    const deleteRecord = (id) => {
        axios.delete(`http://localhost:3000/api/v1/assignments/delete/${id}`)
        // ApiDelete(`${EndPoint.ASSIGNMENT_DELETE}?id=${id}`)
            .then((res) => {
                console.log("res.data",res);
                toast.success("Deleted successfully");
                getAssignmentRecord();
            });
    };

   

    return (
        <>
            <div className="container1 mt-5">
                <div className="asgn">
                    <h3 style={{ marginLeft: "8%" }}>Assignments</h3>
                    <div className='add-assignment-btn mt-1' >
                        <SoftBox style={{ justifyContent: "end", display: "flex", gap: "10px" }}>
                            <SoftButton variant="gradient" color="info" onClick={() => {
                                navigate('/assignments/assignmentform')
                            }}>
                                Create Assignment
                            </SoftButton>
                            <SoftButton variant="gradient" color="info" onClick={() => { navigate('/assignments/assignmentList')
                        
                        }}>
                                Assignment List
                            </SoftButton>
                        </SoftBox>
                    </div>
                    <div className="col-md-4">
                        <div className="assignment" >
                            {assignmentRecord && assignmentRecord?.map((item) => (
                                <div key={item.id} className="row" id="ads">
                                    <div className="row" id="ads" >
                                        <div className="card-asgn">
                                            <div>
                                                <div className="card-notify-year"><FontAwesomeIcon icon={faEllipsisVertical} onClick={()=>navigate('/assignments/assignmentform')} style={{ marginLeft: "5%", color: "black" }} /></div>

                                                <h5 className="mt-4" style={{ textAlign: "center" }}><b>{item?.title}</b></h5>
                                            </div>
                                            <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                                <p>{item?.assignmentSummary}</p>
                                            </div>
                                            <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                                <p>{item?.projectDescription}</p>
                                            </div>
                                            <div className="card-body text-center" style={{ display: "flex", justifyContent: "end" }}>
                                                <div className="lbl" >
                                                    <label>MM</label>
                                                </div>
                                                <div className="lbl1" >
                                                    <label>FM</label>
                                                </div>
                                                <label className='pending'>
                                                    <span className=''><b>{item?.status}</b></span>
                                                </label>
                                                <label className='date'>
                                                    <span className=''><b>{item?.endDate}</b></span>
                                                </label>
                                                <div className="ad-title m-auto">
                                                </div>
                                            </div>

                                        </div>
                                    </div>

                                </div>
                        ))}

                        </div>
                    </div>
                    
                </div>
            </div>

        </>
    )
}

export default Assignment;