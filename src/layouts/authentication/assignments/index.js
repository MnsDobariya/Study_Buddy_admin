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
                setAssignmentRecord();
            })


    }
    useEffect((e) => {
        getAssignmentRecord();
    })

    
   const navigate=useNavigate();

    return (
        <>
            <div className="container1 mt-5">
                <div className="asgn">
                    <h3 style={{ marginLeft:"1%"}}>Assignments</h3>
                    <div className='add-assignment-btn mt-1' >
                        <SoftBox style={{justifyContent: "end", display: "flex", gap: "10px",marginRight:"1%"}}>
                            <SoftButton variant="gradient" color="info" onClick={() => {
                                navigate('/assignments/assignmentform')
                            }}>
                                Create Assignment
                            </SoftButton>
                            <SoftButton variant="gradient" color="info" onClick={()=>{navigate('/assignments/assignmentList')}}>
                                Assignment List
                            </SoftButton>
                        </SoftBox>
                    </div>
                    <div className="assignment">
                        <div className="row" id="ads" >
                           
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-image">
                                        <span className="card-notify-badge"></span>
                                        <span className="card-notify-year"><FontAwesomeIcon icon={faEllipsisVertical} style={{ marginLeft: "5%", color: "black" }} /></span>

                                        <h5 className="mt-4" style={{ textAlign: "center" }}><b>Computer Vision CS230</b></h5>
                                    </div>
                                    <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                        <p>The father went away on a business trip. When he came back, the citys priest, who was a bad man, told him an evil lie about the girl. Banished means sent away forever.</p>
                                    </div>
                                    <div className="card-body text-center" style={{display:"flex",justifyContent:"end"}}>
                                    <div className="lbl" >
                                            <label>MM</label>
                                        </div>
                                        <div className="lbl1" >
                                            <label>FM</label>
                                        </div>
                                        <label className='pending'>
                                            <span className=''><b>PENDING</b></span>
                                        </label>
                                        <label className='date'>
                                            <span className=''><b>25 DEC 2023</b></span>
                                        </label>
                                        <div className="ad-title m-auto">
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className="card">
                                    <div className="card-image">
                                        <span className="card-notify-badge"></span>
                                        <span className="card-notify-year"><FontAwesomeIcon icon={faEllipsisVertical} style={{marginLeft: "5%", color: "black" }} /></span>

                                        <h5 className="mt-4" style={{ textAlign: "center" }}><b>Fainancial Management</b></h5>
                                    </div>
                                    <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                        <p>The father went away on a business trip. When he came back, the citys priest, who was a bad man, told him an evil lie about the girl. . Banished means sent away forever.</p>
                                    </div>
                                    <div className="card-body text-center" style={{display:"flex",justifyContent:"end"}}>
                                    <div className="lbl" >
                                            <label>MM</label>
                                        </div>
                                        <div className="lbl1" >
                                            <label>FM</label>
                                        </div>
                                        <label className='finished'>
                                            <span className=''><b>FINISHED</b></span>
                                        </label> 
                                        <label className='date'>
                                            <span className=''><b>25 DEC 2023</b></span>
                                        </label>
                                        <div className="ad-title m-auto">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div></div>
                            <div className="col-md-4 ">
                                <div className="card">
                                    <div className="card-image">
                                        <span className="card-notify-badge"></span>
                                        <span className="card-notify-year"><FontAwesomeIcon icon={faEllipsisVertical} style={{marginLeft: "5%", color: "black" }} /></span>

                                        <h5 className="mt-4" style={{ textAlign: "center" }}><b>Fainancial Management</b></h5>
                                    </div>
                                    <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                        <p>The father went away on a business trip. When he came back, the citys priest, who was a bad man, told him an evil lie about the girl. . Banished means sent away forever.</p>
                                    </div>
                                    <div className="card-body text-center" style={{display:"flex",justifyContent:"end"}}>
                                    <div className="lbl" >
                                            <label>MM</label>
                                        </div>
                                        <div className="lbl1" >
                                            <label>FM</label>
                                        </div>
                                        <label className='started'>
                                            <span className=''><b>STARTED</b></span>
                                        </label>
                                        <label className='date'>
                                            <span className=''><b>25 DEC 2023</b></span>
                                        </label>
                                        <div className="ad-title m-auto">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 ">
                                <div className="card">
                                    <div className="card-image">
                                        <span className="card-notify-badge"></span>
                                        <span className="card-notify-year"><FontAwesomeIcon icon={faEllipsisVertical} style={{marginLeft: "5%", color: "black" }} /></span>

                                        <h5 className="mt-4" style={{ textAlign: "center" }}><b>Fainancial Management</b></h5>
                                    </div>
                                    <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                        <p>The father went away on a business trip. When he came back, the citys priest, who was a bad man, told him an evil lie about the girl. . Banished means sent away forever.</p>
                                    </div>
                                    <div className="card-body text-center" style={{display:"flex",justifyContent:"end"}}>
                                    <div className="lbl" >
                                            <label>MM</label>
                                        </div>
                                        <div className="lbl1" >
                                            <label>FM</label>
                                        </div>
                                        <label className='started'>
                                            <span className=''><b>STARTED</b></span>
                                        </label>
                                        <label className='date'>
                                            <span className=''><b>25 DEC 2023</b></span>
                                        </label>
                                        <div className="ad-title m-auto">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-image">
                                        <span className="card-notify-badge"></span>
                                        <span className="card-notify-year"><FontAwesomeIcon icon={faEllipsisVertical} style={{marginLeft: "5%", color: "black" }} /></span>

                                        <h5 className="mt-4" style={{ textAlign: "center" }}><b>Fainancial Management</b></h5>
                                    </div>
                                    <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                        <p>The father went away on a business trip. When he came back, the citys priest, who was a bad man, told him an evil lie about the girl. . Banished means sent away forever.</p>
                                    </div>
                                     <div className="card-body text-center" style={{display:"flex",justifyContent:"end"}}>
                                       <div className="lbl" >
                                            <label>MM</label>
                                        </div>
                                        <div className="lbl1" >
                                            <label>FM</label>
                                        </div>
                                        <label className='started'>
                                            <span className=''><b>STARTED</b></span>
                                        </label>
                                        <label className='date'>
                                            <span className=''><b>25 DEC 2023</b></span>
                                        </label>
                                        <div className="ad-title m-auto">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="card">
                                    <div className="card-image">
                                        <span className="card-notify-badge"></span>
                                        <span className="card-notify-year"><FontAwesomeIcon icon={faEllipsisVertical} style={{ marginLeft: "5%", color: "black" }} /></span>

                                        <h5 className="mt-4" style={{ textAlign: "center" }}><b>Fainancial Management</b></h5>
                                    </div>
                                    <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                        <p>The father went away on a business trip. When he came back, the citys priest, who was a bad man, told him an evil lie about the girl. . Banished means sent away forever.</p>
                                    </div>
                                    <div className="card-body text-center" style={{display:"flex",justifyContent:"end"}}>
                                    <div className="lbl" >
                                            <label>MM</label>
                                        </div>
                                        <div className="lbl1" >
                                            <label>FM</label>
                                        </div>
                                        <label className='finished'>
                                            <span className=''><b>FINISHED</b></span>
                                        </label>
                                        <label className='date'>
                                            <span className=''><b>25 DEC 2023</b></span>
                                        </label>
                                        <div className="ad-title m-auto">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="col-md-4 ">
                                <div className="card">
                                    <div className="card-image">
                                        <span className="card-notify-badge"></span>
                                        <span className="card-notify-year"><FontAwesomeIcon icon={faEllipsisVertical} style={{marginBottom:"26%",marginLeft:"5%" , color:"black"}}/></span>
                                        <h5 className="mt-4"style={{marginLeft:"8%"}}><b>Spanish Language</b></h5>
                                    </div>
                                    <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                        <p>Designed to help you speak English with confidence, clarity and socially in todays globalised world.</p>
                                    </div>
                                    <div className="card-body text-center">
                                        <div className="ad-title m-auto">
                                        </div>
                                    </div>
                                </div>
                            </div> */}


                        </div>
                    </div>
                    {/* <SoftBox p={2}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6} xl={3}>
                                <DefaultProjectCard
                                    label="project #2"
                                    title="modern"
                                    description="As Uber works through a huge amount of internal management turmoil."
                                    action={{
                                        type: "internal",
                                        route: "/pages/profile/profile-overview",
                                        color: "info",
                                        label: "view project",
                                    }}
                                    authors={[
                                        { image: team1, name: "Elena Morison" },
                                        { image: team2, name: "Ryan Milly" },
                                        { image: team3, name: "Nick Daniel" },
                                        { image: team4, name: "Peterson" },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={3}>
                                <DefaultProjectCard
                                    label="project #1"
                                    title="scandinavian"
                                    description="Music is something that every person has his or her own specific opinion about."
                                    action={{
                                        type: "internal",
                                        route: "/pages/profile/profile-overview",
                                        color: "info",
                                        label: "view project",
                                    }}
                                    authors={[
                                        { image: team3, name: "Nick Daniel" },
                                        { image: team4, name: "Peterson" },
                                        { image: team1, name: "Elena Morison" },
                                        { image: team2, name: "Ryan Milly" },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={3}>
                                <DefaultProjectCard
                                    label="project #3"
                                    title="minimalist"
                                    description="Different people have different taste, and various types of music."
                                    action={{
                                        type: "internal",
                                        route: "/pages/profile/profile-overview",
                                        color: "info",
                                        label: "view project",
                                    }}
                                    authors={[
                                        { image: team4, name: "Peterson" },
                                        { image: team3, name: "Nick Daniel" },
                                        { image: team2, name: "Ryan Milly" },
                                        { image: team1, name: "Elena Morison" },
                                    ]}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} xl={3}>
                                <DefaultProjectCard
                                    label="project #3"
                                    title="minimalist"
                                    description="Different people have different taste, and various types of music."
                                    action={{
                                        type: "internal",
                                        route: "/pages/profile/profile-overview",
                                        color: "info",
                                        label: "view project",
                                    }}
                                    authors={[
                                        { image: team4, name: "Peterson" },
                                        { image: team3, name: "Nick Daniel" },
                                        { image: team2, name: "Ryan Milly" },
                                        { image: team1, name: "Elena Morison" },
                                    ]}
                                />
                            </Grid>
                          
                        </Grid>
                    </SoftBox> */}
                </div>
            </div>
         
        </>
    )
}

export default Assignment;