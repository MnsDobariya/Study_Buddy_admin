import { faEllipsisVertical, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, Menu, MenuItem, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import Dashboard from 'layouts/dashboard';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setAssignmentList } from 'store/slices/assignmentSlice';


const AssignmentList = () => {
    const dispatch = useDispatch();
  const assignment = useSelector((state) => state.assignment);

    // const [assignmentCount, setAssignmentCount] = useState([]);
    const [assignmentRecord, setAssignmentRecord] = useState([]);
    // const [deleteRecord, setDeleteRecord] = useState();

    const [inputText, setInputText] = useState("");
    const inputHandler = (e) => {
        //convert input text to lower case
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const navigate = useNavigate();


    const [openPopUp, setOpenPopUp] = useState(false);
    const [deleteRowId, setDeleteRowId] = useState();

    const indexedData = assignmentRecord?.map((item, index) => ({
        ...item,
        index: index + 1,
    }))

    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);

    const handleClick = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };
    const handlePopupClose = () => {
        setOpenPopUp(false);
    }

    const columns = [
        { field: "index", headerName: "Id", width: 90 },
        { field: "title", headerName: "Title", width: 200 },
        // { field: "lbl", headerName: "Members", width: 150 },
        { field: "startDate", headerName: "Start Date", width: 250, valueFormatter: params => moment(params?.value).format("DD MMM YYYY") },
        { field: "status", headerName: "Status", width: 400 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            onClick={(e) => handleClick(e, params.row.id)}
                            style={{ marginLeft: "22%", color: "black" }}
                        />

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
                        >
                            <MenuItem onClick={() => {
                                handleDelete(params.row.id)
                            }}>Delete</MenuItem>
                            <MenuItem onClick={() => handleUpdate(selectedRowId)}>Edit</MenuItem>

                        </Menu>
                    </>
                );
            },
        },
    ]
    const handleUpdate = (updateId) => {
        const selectedData =  assignment.assignmentList?.find((element) => element?.id == updateId)
        navigate('/assignments/assignmentform', { state: selectedData })
    }


    const getAssignmentRecord = () => {
        ApiGet(`${EndPoint.ASSIGNMENT_GET}`)
        .then((res) => {
            setAssignmentRecord(res?.data);
        })
    }

    const deleteRecords = (id) => {
        axios.delete(`http://localhost:3000/api/v1/assignments/delete/${id}`)
            .then((res) => {
                toast.success("Delete Successfully");
                getAssignmentRecord();
            })
    }

    const handleDelete = () => {
        setDeleteRowId(selectedRowId);
        setOpenPopUp(true);
        handleClose();
    };

    useEffect(() => {
        getAssignmentRecord("");
    })

    return (
        <>
            {/* <Dashboard assignmentCount={assignmentCount} /> */}
            <div className="mt-5" style={{ marginLeft: "21%", display: "flex" }}>
                <h3 style={{ marginTop: "1%",fontSize:"larger", fontWeight: "500",color: "#344767" }}>AssignmentList</h3>
                <SoftButton variant="gradient" color="info" style={{ marginTop: "1%", marginInlineEnd: "50px",border:"0px",outline:"none", marginLeft: "48%" }} onClick={() => {
                    navigate('/assignments/assignmentform')
                }} >
                    create Assignment
                </SoftButton>
                <SoftButton variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "1%",border:"0px",outline:"none" }} onClick={() => {
                    navigate('/assignments')
                }} >
                    Assignments
                </SoftButton>
            </div>
            
            <div style={{ padding: "1%" }}>
                <DataGrid
                    rows={indexedData}
                    columns={columns}
                    pageSize={5}
                    localeText={{
                        toolbarExportPrint: "PDF",
                    }}
                    disableColumnSelector
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
                    style={{ height: "81.5vh", width: "77.5%", padding: "2%", marginLeft: "20%" }}
                    onRowClick={(e) => {
                    }}
                    className='custom-data-grid'
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    sx={{
                        "& .css-1ui3wbn-MuiInputBase-root-MuiTablePagination-select": {
                            width: "20%!important"
                        },
                        "& .css-1y1mi5n-MuiTablePagination-root": {
                            overflow: "hidden !important",
                        }
                    }}
                />
            </div>

            <Dialog
                open={openPopUp}
                onClose={handlePopupClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            height:"40%",
                            width: "100%",
                            maxWidth: "500px",  
                            borderRadius:"0.5rem", // Set your width here
                        },
                    },
                }}
            >
                <DialogTitle id="alert-dialog-title">
                    {/* Delete */}
                    <FontAwesomeIcon icon={faXmark} style={{ marginLeft: "95%",height:"22px" }} onClick={handlePopupClose} />
                </DialogTitle>
                <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: "30%", marginLeft: "36%" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" style={{ color: "red" }}></path>
                </svg>
                <DialogContent style={{ overflowY: "hidden" }}>
                    <DialogContentText id="alert-dialog-description" style={{ textAlign: "center" }}>
                        Are you sure Delete?
                    </DialogContentText>
                    <DialogContentText style={{ textAlign: "center" }}>
                        Do you really want to delete these record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{ marginRight: "25%", paddingBottom: "2%",paddingTop:"4%" }}>
                    {/* <Button className="btn btn-primary" onClick={() => {
                        deleteRecord(deleteId)
                        handleClose(true)
                    }}>Yes</Button> */}
                    {/* <Button className="btn btn-secondary" onClick={handleClose} autoFocus>
                        No
                    </Button> */}
                    <button type="button" className="btn btn-danger" onClick={() => {
                        deleteRecords(deleteRowId)
                        handlePopupClose(true)
                    }}
                    style={{ width: "30%",backgroundColor:"#dc3545" }}
                    >Yes</button>
                    <button type="button" className="btn btn-secondary" onClick={handlePopupClose} style={{ width: "30%",backgroundColor:"#6c757d" }}>No</button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default AssignmentList;
