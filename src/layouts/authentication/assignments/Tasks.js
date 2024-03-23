import { faPen, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Avatar, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, FormGroup } from '@mui/material';
import axios from 'axios';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import { ApiPut } from 'config/Api/ApiData';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/* eslint-disable */
const Tasks = ({ setTasks, handleOpen, taskData, getTaskData }) => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handleClose = () => {
        setOpen(false);
    };

    const handleEdit = (item) => {
        // navigate(`/assignments/assignmentDetails`, { state: { tasks: item } });
        setTasks(item)
        handleOpen()
        getTaskData();
    }


    const deleteTask = (id) => {
        axios.delete(`http://localhost:3000/api/v1/task/delete/${id}`)
            .then((res) => {
                toast.success("Delete Successfully");
                getTaskData();
            })
    }


    const handleStatusUpdate = (isChecked,id)=>{
        const body = {
            isCompleted  : isChecked
        }
        ApiPut(`${EndPoint.TASK_UPDATE}/${id}`,body)
                .then((res) => {
                    // console.log(res,"response");
                });

    }
    return (
        <>
            {(taskData && taskData.length) ?
                taskData?.map((item) => (
                    <div key={item.id} className="rowtodos" id="adstodos">

                        <SoftBox>
                            <div className="cardTasks w-75">

                                <div className="card-Tasks" style={{ height: "110px" }}>
                                    <div style={{ padding: "22px 22px 8px 22px", color: "#344767", fontSize: "initial" }}>
                                        <FormGroup >
                                            <FormControlLabel control={<Checkbox
                                                onChange={(e) => handleStatusUpdate(e.target.checked,item.id)}
                                                defaultChecked={item?.isCompleted}
                                            />} label={item?.description} />
                                        </FormGroup>
                                    </div>
                                    <div className="card-Tasks2">
                                        <div className="lbltasks">
                                            <Avatar style={{ backgroundColor: " #eba541", color: "White", fontSize: "initial", fontWeight: "500" }} sx={{ width: 35, height: 35 }}>
                                                {`${item?.task.charAt(0).toUpperCase()}`}
                                            </Avatar>
                                        </div>
                                        <h5 style={{ padding: "8px", fontSize: "medium", color: "#67748e" }}> {item?.task}</h5>
                                        <label className='dateTasks'>
                                            <span className=''><p> DUE DATE: {moment(item?.dueDate).format('DD MMM YYYY')}</p></span>
                                        </label>
                                        <div className="mr-5" style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                                            <FontAwesomeIcon icon={faPen} onClick={() => {
                                                handleEdit(item)
                                            }}
                                                style={{ cursor: "pointer" }}
                                            />
                                            <FontAwesomeIcon icon={faTrash} onClick={() => {
                                                setOpen(true);
                                                setDeleteId(item.id);   
                                            }}
                                                style={{ cursor: "pointer" }}
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </SoftBox>
                    </div>
                )) : (
                    <div className="noRecord" style={{ marginLeft: "50%", marginTop: "15%" }}>
                        <p>No Record</p>
                    </div>
                )}


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            height: "40%",
                            width: "100%",
                            maxWidth: "500px",
                            borderRadius: "0.5rem",  // Set your width here
                        },
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {/* Delete */}
                    <FontAwesomeIcon icon={faXmark} style={{ marginLeft: "95%", height: "22px" }} onClick={handleClose} />
                </DialogTitle>
                <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: "30%", marginLeft: "36%" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" style={{ color: "red" }}></path>
                </svg>
                {/* <FontAwesomeIcon icon={faCircleXmark} /> */}
                {/* <link  rel="shortcut icon" href="https://image.similarpng.com/very-thumbnail/2020/11/InCorrect-icon-in-sticker-style-on-transparent-background-PNG.png" /> */}
                <DialogContent style={{ overflowY: "hidden" }}>
                    <DialogContentText id="alert-dialog-description" style={{ textAlign: "center" }}>
                        Are you sure Delete?
                    </DialogContentText>
                    <DialogContentText style={{ textAlign: "center" }}>
                        Do you really want to delete these record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ marginRight: "25%", paddingBottom: "5%" }}>

                    <button type="button" className="btn btn-danger" onClick={() => {
                        deleteTask(deleteId)
                        handleClose(true)
                    }}
                        style={{ width: "30%", backgroundColor: "#dc3545" }}
                    >Yes</button>
                    <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ width: "30%", backgroundColor: "#6c757d" }} >No</button>
                </DialogActions>
            </Dialog>
        </>

    )
}

export default Tasks;