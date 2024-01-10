import React, { useEffect, useState } from "react";
import '../../authentication/assignments/assignments.css';
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { EndPoint } from "config/EndPoint/Endpoint";
import { ApiPost } from "config/Api/ApiData";
import SoftInput from "components/SoftInput";
import { Grid, Menu, MenuItem, Modal } from "@mui/material";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import axios from "axios";
import { ApiGet } from "config/Api/ApiData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ApiDelete } from "config/Api/ApiData";
import { toast } from "react-toastify";

const Assignment = () => {

    const [assignmentRecord, setAssignmentRecord] = useState([]);
    const [open, setOpen] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);

    const handleOpen = () => {
        setOpen(true);
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
    }, [])


    const navigate = useNavigate();



    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const handleClick = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
        setOpen(false);
    };



    const deleteRecords = (id) => {
        axios.delete(`http://localhost:3000/api/v1/assignments/delete/${id}`)
            .then((res) => {
                // console.log(res,"delete ass");
                toast.success("Delete Successfully");
                getAssignmentRecord();
            })
    }

    const handleUpdate = (item) => {
        const selectedData = assignmentRecord?.find((item) => item?.id )
        navigate('/assignments/assignmentform', { state: selectedData })
    }

    const handleDelete = (item) => {
        // console.log(item.id, "helllooooooo");
        deleteRecords(item.id);
        // setOpenPopUp(false);
        handleClose();
    };

    const renderMenu = (item) => {
        return (
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => handleDelete(item)}>Delete</MenuItem>
                <MenuItem onClick={() => handleUpdate(selectedRowId)}>Edit</MenuItem>
                {/* Add more menu items for other actions if needed */}
            </Menu>
        );
    };

    function formatDate(string) {
        var options = { day: 'numeric', year: 'numeric', month: 'long' };
        return new Date(string).toLocaleDateString([], options);
    }

    return (
        <>
            <div className="container1 mt-5">
                <div className="asgn">
                    <h3 style={{ marginLeft: "6%" }}>Assignments</h3>
                    <div className='add-assignment-btn mt-1' >
                        <SoftBox style={{ justifyContent: "end", display: "flex", gap: "10px" }}>
                            <SoftButton variant="gradient" color="info" onClick={() => {
                                navigate('/assignments/assignmentform')
                            }}>
                                Create Assignment
                            </SoftButton>
                            <SoftButton variant="gradient" color="info" onClick={() => {
                                navigate('/assignments/assignmentList')

                            }}>
                                Assignment List
                            </SoftButton>
                        </SoftBox>
                    </div>
                            <div className="row" id="ads">
                                {assignmentRecord && assignmentRecord?.map((item) => (
                                    <div key={item.id} className="col-md-4" id="ads">
                                        <div className="row" id="ads" >
                                            <div className="assignment" >
                                                <div className="card-asgn">
                                                    <div>
                                                        <div className="card-notify-year mt-4"><FontAwesomeIcon icon={faEllipsisVertical} onClick={(e) => handleClick(e)} style={{ marginLeft: "5%", color: "black" }} /></div>
                                                        {renderMenu(item)}

                                                        <h5 className="mt-2 p-4" style={{ textAlign: "center" }}><b>{item?.title}</b></h5>
                                                    </div>
                                                    <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                                        <p>{item?.assignmentSummary}</p>
                                                    </div>
                                                    <div className="card-image-overlay mt-3" style={{ fontSize: "medium", color: "gray", marginLeft: "7%" }}>
                                                        <p>{item?.projectDescription}</p>
                                                    </div>
                                                    <div className="card-body text-center" style={{ display: "flex", justifyContent: "start" }}>
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
                                                            <span className=''><p>{formatDate(item?.endDate)}</p></span>
                                                        </label>
                                                        <div className="ad-title m-auto">
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                </div>

        </>
    )
}

export default Assignment;