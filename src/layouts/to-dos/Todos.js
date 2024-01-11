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

const Todos = () => {
    const [todosData, setTodosData] = useState();

    const navigate = useNavigate();

    const getTodosData = () => {
        ApiGet(`${EndPoint.TODOS_GET}`)
            .then((res) => {
                // console.log(res, "response");
                setTodosData(res?.data)
            })
    }

    useEffect(() => {
        getTodosData("")
    }, [])

    const handleEdit = (ele) => {
        // console.log(ele, "ssssssss");
        navigate(`/todos/addtodos`, { state: ele });
    }

    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState();

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteRecord = (id) => {
        axios.delete(`http://localhost:3000/api/v1/todos/delete/${id}`)
            .then((res) => {
                // console.log(res,'resdetele');
                getTodosData();
            })
    }



    function formatDate(string) {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(string).toLocaleDateString([], options);
    }
    return (
        <>
            <div className="to-dos" style={{ display: "flex", marginTop: "5%" }}>
                <h3 style={{ marginLeft: "20%", fontWeight: "500", color: "#344767" }}>To-dos List</h3>
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
                                    }} />
                                    <FontAwesomeIcon icon={faTrash} onClick={() => {
                                        setOpen(true);
                                        setDeleteId(item.id);
                                    }} />
                                </div>
                            </div>
                            <p className="card-text">Finish by:{formatDate(item?.deadlinedate)}</p>
                        </div>
                        {/* <a href="#" className="btn btn-primary">Button</a> */}
                    </div>

                </div >
            ))}
            {/* <div className="cardtodos w-75">
                <div className="card-body">
                    <div style={{ display: "flex" }}>
                        <p className="card-title">With supporting text below as a natural lead-in to additional content.</p>
                        <label className='high'>
                            <span className=''>HIGH</span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                            <FontAwesomeIcon icon={faPen} />
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <p className="card-text">Finish by:31 Des 2023</p>
                    <a href="#" className="btn btn-primary">Button</a>
                </div>
            </div>
            <div className="cardtodos w-75">
                <div className="card-body">
                    <div style={{ display: "flex" }}>
                        <p className="card-title">With supporting text below as a natural lead-in to additional content.</p>
                        <label className='medium'>
                            <span className=''>MEDIUM</span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                            <FontAwesomeIcon icon={faPen} />
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <p className="card-text">Finish by:31 Des 2023</p>
                    <a href="#" className="btn btn-primary">Button</a>
                </div>
            </div>
            <div className="cardtodos w-75">
                <div className="card-body">
                    <div style={{ display: "flex" }}>
                        <p className="card-title">With supporting text below as a natural lead-in to additional content.</p>
                        <label className='low'>
                            <span className=''>LOW</span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                            <FontAwesomeIcon icon={faPen} />
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <p className="card-text">Finish by:31 Des 2023</p>
                    <a href="#" className="btn btn-primary">Button</a>
                </div>
            </div>
            <div className="cardtodos w-75">
                <div className="card-body">
                    <div style={{ display: "flex" }}>
                        <p className="card-title">With supporting text below as a natural lead-in to additional content.</p>
                        <label className='high'>
                            <span className=''>HIGH</span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                            <FontAwesomeIcon icon={faPen} />
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <p className="card-text">Finish by:31 Des 2023</p>
                    <a href="#" className="btn btn-primary">Button</a>
                </div>
            </div> */}

            <Dialog
                open={open}
                onClose={handleClose}
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
                    <button type="button" className="btn btn-secondary" onClick={handleClose} >No</button>
                    <button type="button" className="btn btn-danger" onClick={() => {
                        deleteRecord(deleteId)
                        handleClose(true)
                    }}>Yes</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Todos;