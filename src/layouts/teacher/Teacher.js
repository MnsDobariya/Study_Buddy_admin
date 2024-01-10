import React, { useEffect, useMemo, useState } from 'react';
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Typography } from '@mui/material';

import SoftButton from 'components/SoftButton';
// import image from 'Images/Screenshot (231).png'
import { toast } from 'react-toastify';

import { EndPoint } from "config/EndPoint/Endpoint";
import { ApiPut } from "config/Api/ApiData";
import { ApiPost } from "config/Api/ApiData";
import { ApiGet } from "config/Api/ApiData";
import { ApiDelete } from 'config/Api/ApiData';
// import { ApiDelete } from 'config/Api/ApiData';


// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  faXmark } from '@fortawesome/free-solid-svg-icons';


// const columns = ['CompanyName', 'City', 'State', 'Phone', 'Fax'];

const Teacher = () => {
    const [open, setOpen] = useState(false);
    const [deleteRowId, setDeleteRowId] = useState();

    const navigate = useNavigate();

    const [teacherRecord, setTeacherRecord] = useState([]);
    // const token = localStorage.getItem("token")

    const getTeacherRecord = () => {
        // axios.get("http://localhost:3000/api/v1/users/teacher/get",
        ApiGet(`${EndPoint.USER_GET}`)

            // { headers: { "Authorization": Bearer ${token} } })
            .then((res) => {
                // console.log("helloo",res);
                setTeacherRecord(res.data);
            });
    };
    useEffect((e) => {
        getTeacherRecord();

    }, []);
    const indexedData = teacherRecord.map((item, index) => ({
        ...item,
        index: index + 1,
    }));

    // const handleOpen = () => {
    //     setOpen(true);
    // };
    const handleClose = () => {
        setOpen(false);
    };

    // const [openPopUp, setOpenPopUp] = useState(false);
    // const [deleteRowId, setDeleteRowId] = useState();

    const deleteRecord = (id) => {
        // ApiDelete(${EndPoint.USER_DELETE})
        axios.delete(`http://localhost:3000/api/v1/users/teacher/delete/${id}`)
            .then((res) => {
                // console.log("res.data",res.data);
                toast.success("Deleted successfully");
                getTeacherRecord();
            });
    };

    const columns = [
        { field: "index", headerName: "Id", width: 90 },
        { field: "firstName", headerName: "FirstName", width: 150 },
        { field: "lastName", headerName: "LastName", width: 150 },
        { field: "email", headerName: "Email", width: 130 },
        { field: "phone", headerName: "Mobile_No", width: 160 },
        { field: "gender", headerName: "Gender", width: 150 },

        // action
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {/* Edit */}
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            height='20px'
                            width='30px'
                            className='edit-icon'
                            // onClick={(e) => {
                            //     // console.log("e",params.row.id);
                            //     setOpenPopUp(true);
                            //     setDeleteRowId(params.row.id);
                            // }}
                            onClick={() => {
                                // console.log(params.row);
                                navigate('/teacher/teacherform', { state: params.row })

                            }}
                            style={{ marginRight: "10px", cursor: "pointer" }}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                            />
                        </svg>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            height='20px'
                            width='50px'
                            className='edit-icon'
                            data-toggle='modal'
                            data-target='#exampleModal'
                            onClick={(e) => {
                                // console.log("e",params.row.id);
                                setOpen(true);
                                setDeleteRowId(params.row.id);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                        </svg>
                    </>
                );
            },
        },
    ];
    // const deleteRecord = (id) => {
    //     // ApiDelete(${EndPoint.USER_DELETE})
    //     axios.delete(http://localhost:3000/api/v1/users/teacher/delete/${id})
    //         .then((res) => {
    //             // console.log("res.data",res.data);
    //             toast.success("Deleted successfully");
    //             getTeacherRecord();
    //         });
    // };


    return (
        <>
            <div className="mt-5" style={{ marginLeft: "20%" }}>
                <h3>Teacher List</h3>
            </div>
                <div style={{ width: "70%", padding: "1%", marginLeft: "75%" }}>

                    <SoftButton variant="gradient" color="info" marginLeft="60%" onClick={() => {
                        navigate('/teacher/teacherform')
                    }} >
                        Add Teacher
                    </SoftButton>
                </div>
            <div style={{ width: "70%", padding: "1%", marginLeft: "20%" }}>
                <DataGrid
                    rows={indexedData}
                    columns={columns}
                    pageSize={5}
                    components={{
                        Toolbar: () => (
                            <div
                                style={{

                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <GridToolbar />

                            </div>
                        ),
                    }}
                    style={{ height: "90vh", width: "100%", padding: "2%" }}
                    onRowClick={(e) => {
                        // console.log(e);
                    }}
                    className='custom-data-grid'
                />

                {/* {openPopUp && (
                    <div>

                        hello
                <button onClick={()=>deleteRecord(deleteRowId)}>Yes</button>
                <button onClick={()=>{setOpenPopUp(false)}}>No</button>

                        <div
                            className='modal fade'
                            id='exampleModal'
                            tabIndex='-1'
                            role='dialog'
                            aria-labelledby='exampleModalLabel'
                            aria-hidden='true'
                        >
                            <div className='modal-dialog' role='document'>
                                <div className='modal-content'>
                                    <div className='modal-header'>
                                        <h5 className='modal-title' id='exampleModalLabel'>
                                            Delete
                                        </h5>
                                        <button
                                            type='button'
                                            className='close'
                                            data-dismiss='modal'
                                            aria-label='Close'
                                        >
                                            <span aria-hidden='true'>&times;</span>
                                        </button>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "center",
                                            fontSize: "18px",
                                            padding: "10px 20px",
                                        }}
                                    >
                                        Are you sure Delete?
                                    </div>
                                    <div className='modal-footer'>
                                        <button
                                            type='button'
                                            className='btn btn-secondary'
                                            data-dismiss='modal'
                                            onClick={() => {
                                                setOpenPopUp(false);
                                            }}
                                        >
                                            No
                                        </button>
                                        <button
                                            type='button'
                                            className='btn btn-danger'
                                            data-dismiss='modal'
                                            onClick={() => {
                                                deleteRecord(deleteRowId)
                                                setOpenPopUp(false)
                                            }}
                                        >
                                            Yes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )} */}
            </div >

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
                    <button type="button" className="btn btn-danger" onClick={() => {
                        deleteRecord(deleteRowId)
                        handleClose(true)
                    }}>Yes</button>
                    <button type="button" className="btn btn-secondary" onClick={handleClose} >No</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Teacher;