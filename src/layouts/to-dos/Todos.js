import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
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

const Todos = () => {
    const [todosData, setTodosData] = useState();

    const navigate = useNavigate();

    const getTodosData = () => {
        ApiGet(`${EndPoint.TODOS_GET}`)
            .then((res) => {
                setTodosData(res?.data)
            })
    }

    useEffect(() => {
        getTodosData("")
    }, [])

    const handleEdit = (ele) => {
        navigate(`/todos/addtodos`, { state: ele });
    }

    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState();


    const handleClose = () => {
        setOpen(false);
    };

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
                <h3 style={{ marginLeft: "20%", fontWeight: "500", color: "#344767" }}>Todos List</h3>
                <SoftButton variant="gradient" color="info" style={{ marginBottom: "1%", marginLeft: "58%" }} onClick={() => navigate("/todos/addtodos")}>
                    Add Todos
                </SoftButton>
            </div>
            {todosData && todosData?.map((item) => (
                <div key={item.id} className="rowtodos" id="adstodos">
                    <div className="cardtodos w-75">

                        <div className="card-body">

                            <div style={{ display: "flex" }}>
                                <p className="card-title">{item?.task}</p>
                                <label className={item.portable === 'High' ? 'high' : item.portable === 'Medium' ? 'medium' : 'low'}>
                                    <span className=''>{item?.portable}</span>
                                </label>
                                <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                                    <FontAwesomeIcon icon={faPen} onClick={() => {
                                        handleEdit(item)
                                    }}
                                    style={{cursor:"pointer"}}
                                    />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => {
                                        setOpen(true);
                                        setDeleteId(item.id);
                                    }} 
                                    style={{cursor:"pointer"}}
                                    />
                                </div>
                            </div>
                            <p className="card-text">Finish by : {formatDate(item?.deadlinedate)}</p>
                        </div>
                    </div>

                </div >
            ))}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                            borderRadius: "0.5rem", // Set your width here
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
                    <button type="button" className="btn btn-danger" onClick={() => {
                        deleteRecord(deleteId)
                        handleClose(true)
                    }}>Yes</button>
                    <button type="button" className="btn btn-secondary" onClick={handleClose} >No</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Todos;