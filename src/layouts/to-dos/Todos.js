import { faPen, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SoftButton from "components/SoftButton";
import React, { useEffect, useState } from "react";
import '../to-dos/Todos.css';
import { useNavigate } from "react-router-dom";
import { ApiGet } from "config/Api/ApiData";
import { EndPoint } from "config/EndPoint/Endpoint";
import data from "layouts/dashboard/components/Projects/data";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setTodoList } from "store/slices/todoSlice";

const Todos = () => {
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.todo);
    const [todosData, setTodosData] = useState();

    const navigate = useNavigate();

    const handleEdit = (ele) => {
        navigate(`/todos/addtodos`, { state: ele });
    }

    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState();


    const handleClose = () => {
        setOpen(false);
    };

    const getTodosData = () => {
        ApiGet(`${EndPoint.TODOS_GET}`)
            .then((res) => {
                setTodosData(res?.data);
            })
      }

      useEffect((e)=>{
        getTodosData("");
      },[])

    const deleteRecord = (id) => {
        axios.delete(`http://localhost:3000/api/v1/todos/delete/${id}`)
            .then((res) => {
                getTodosData();
                toast.success("Delete Successfully");
            })
    }



    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }
    return (
        <>
            <div className="to-dos" style={{ display: "flex", marginTop: "5%" }}>
                <h3 style={{ marginLeft: "20%",fontSize:"larger", fontWeight: "500", color: "#344767" }}>Todos List</h3>
                <SoftButton variant="gradient" color="info" style={{ marginBottom: "1%", marginLeft: "58%",border:"0px",outline:"none" }} onClick={() => navigate("/todos/addtodos")}>
                    Add Todos
                </SoftButton>
            </div>
            {( todosData &&  todosData.length) ?
                 todosData?.map((item) => (
                    <div key={item.id} className="rowtodos" id="adstodos">
                        <div className="cardtodos w-75">

                            <div className="card-body">

                                <div style={{ display: "flex" }}>
                                    <p className="card-title">{item?.task}</p>
                                    <label className={item.priority === 'High' ? 'high' : item.priority === 'Medium' ? 'medium' : 'low'}>
                                        <span className=''>{item?.priority}</span>
                                    </label>
                                    <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
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
                                <p className="card-text">Finish by : {formatDate(item?.deadlinedate)}</p>
                            </div>
                        </div>

                    </div >
                ))
                :
                (
                    <div className="noRecord" style={{marginLeft:"50%",marginTop:"15%"}}>
                    <p>No Record</p>
                    </div>
                )
            }
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
                    <FontAwesomeIcon icon={faXmark} style={{ marginLeft: "95%",height:"22px" }} onClick={handleClose} />
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
                        deleteRecord(deleteId)
                        handleClose(true)
                    }}
                        style={{ width: "30%",backgroundColor:"#dc3545" }}
                    >Yes</button>
                    <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ width: "30%",backgroundColor:"#6c757d" }} >No</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Todos;