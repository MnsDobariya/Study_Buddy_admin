import React, { useEffect, useState } from "react";
import '../../authentication/assignments/assignments.css';
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { EndPoint } from "config/EndPoint/Endpoint";
import { ApiPost } from "config/Api/ApiData";
import SoftInput from "components/SoftInput";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Menu, MenuItem, Modal } from "@mui/material";
import PlaceholderCard from "examples/Cards/PlaceholderCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

import axios from "axios";
import { ApiGet } from "config/Api/ApiData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { ApiDelete } from "config/Api/ApiData";
import { toast } from "react-toastify";
import { element } from "prop-types";

const Assignment = () => {

    const [assignmentRecord, setAssignmentRecord] = useState([]);
    const [open, setOpen] = useState(false);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleOpen = () => {
        setOpen(true);
    };

    const getAssignmentRecord = () => {

        axios.get("http://localhost:3000/api/v1/assignments/get")

            // ApiGet(`${EndPoint.ASSIGNMENT_GET}`)
            .then((res) => {
                setAssignmentRecord(res.data);
            })


    }
    useEffect((e) => {
        getAssignmentRecord("");
    }, [])


    const navigate = useNavigate();



    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const handleClick = (event, data) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(data);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
        setOpen(false);
    };

    const handlePopupClose = () => {
        setOpenPopUp(false);
    }


    const
        deleteRecords = (id) => {
            axios.delete(`http://localhost:3000/api/v1/assignments/delete/${id}`)
                .then((res) => {
                    toast.success("Delete Successfully");
                    getAssignmentRecord();
                })
        }

    const handleUpdate = () => {
        navigate('/assignments/assignmentform', { state: selectedRowId });
    }

    const handleDelete = (item) => {
        setOpenPopUp(true);
        setDeleteId(item.id);
        handleClose();
    };

    const renderMenu = (item) => {

        return (
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                sx={{
                    "& .css-cmyovl-MuiPaper-root-MuiMenu-paper-MuiPopover-paper": {
                        border: " 0 solid rgba(0, 0, 0, 0.125)",
                        borderRadius: "1rem",
                        boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0)",
                    }
                }}
            // sx={{
            //     "& .MuiPaper-root":{
            //         "& .MuiMenu-paper":{
            //             "& .MuiPopover-paper":{
            //                 // transition:" box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            //                 // backgroundColor: "#ffffff",
            //                 // border:" 0 solid rgba(0, 0, 0, 0.125)",
            //                 // borderRadius: "1rem",
            //                 // boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)"
            //             }
            //         }
            //     }
            // }}
            >
                <MenuItem onClick={() => handleDelete(selectedRowId)}>Delete</MenuItem>
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
                                                <div className="card-notify-year mt-4"><FontAwesomeIcon icon={faEllipsisVertical} onClick={(e) => handleClick(e, item)} style={{ marginLeft: "5%", color: "black" }} /></div>
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
                                                <label className={item.status === 'Pending' ? 'pending' : item.status === 'Started' ? 'started' : 'finished'}>
                                                    <span style={{ textAlign: "center", }}><b>{item?.status}</b></span>
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
            <Dialog
                open={openPopUp}
                onClose={handlePopupClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",  // Set your width here
                        },
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure Delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    {/* <Button className="btn btn-primary" onClick={() => {
                        deleteRecord(deleteId)
                        handleClose(true)
                    }}>Yes</Button> */}
                    {/* <Button className="btn btn-secondary" onClick={handleClose} autoFocus>
                        No
                    </Button> */}
                    <button type="button" className="btn btn-danger" onClick={() => {
                        deleteRecords(deleteId)
                        handlePopupClose(true)
                    }}>Yes</button>
                    <button type="button" className="btn btn-secondary" onClick={handlePopupClose} >No</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Assignment;