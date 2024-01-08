import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { List, Menu, MenuItem, TextField } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import SoftButton from 'components/SoftButton';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AssignmentList = () => {
    const [assignmentRecord, setAssignmentRecord] = useState([]);
    const [deleteRecord, setDeleteRecord] = useState();

    const [inputText, setInputText] = useState("");
    const inputHandler = (e) => {
        //convert input text to lower case
        const lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    const getAssignmentRecord = () => {
        // axios.get("http://localhost:3000/api/v1/users/teacher/get",
        ApiGet(`${EndPoint.ASSIGNMENT_GET}`)
            .then((res) => {
                // console.log(res, "helloo");
                setAssignmentRecord(res?.data);
            }).catch((error) => {
                console.log(error, "errorrrrr");
            })
    };
    useEffect((e) => {
        getAssignmentRecord();

    }, []);


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
        console.log(rowId, 'rowId')
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedRowId(null);
    };


    const columns = [
        { field: "index", headerName: "Id", width: 90 },
        { field: "title", headerName: "Title", width: 250 },
        { field: "lbl", headerName: "Members", width: 150 },
        { field: "startDate", headerName: "Start Date", width: 250 },
        { field: "status", headerName: "Status", width: 150 },
        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                // console.log(params,"abccccc");
                return (
                    <>
                        <FontAwesomeIcon
                            icon={faEllipsisVertical}
                            onClick={(e) => handleClick(e, params.row.id)}
                            style={{ marginLeft: "18%", color: "black" }}
                        />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleDelete}>Delete</MenuItem>
                            <MenuItem onClick={() => handleUpdate(selectedRowId)}>Edit</MenuItem>

                        </Menu>
                    </>
                );
            },
        },
    ]
    const handleUpdate = (updateId) => {
        const selectedData = assignmentRecord?.find((element) => element?.id == updateId)
        navigate('/assignments/assignmentform', { state: selectedData })
    }


    const deleteRecords = (id) => {
        axios.delete(`http://localhost:3000/api/v1/assignments/delete/${id}`)
            .then((res) => {
                // console.log(res,"delete ass");
                toast.success("Delete Successfully");
                getAssignmentRecord();
            })
    }

    const handleDelete = () => {
        //   console.log(selectedRowId,"helllooooooo");
        deleteRecords(selectedRowId);
        setOpenPopUp(false);
        handleClose();
    };


    return (
        <>
            <div className="mt-5" style={{ marginLeft: "20%" }}>
                <h3>AssignmentList</h3>
            </div>
            <div style={{ width: "70%", padding: "1%", marginLeft: "17.5%" }}>
                    <SoftButton variant="gradient" color="info" style={{ marginTop:"1%", marginBottom: "2.5%", marginInlineEnd: "50px" ,marginLeft:"64%"}} onClick={() => {
                        navigate('/assignments/assignmentform')
                    }} >
                        create Assignment
                    </SoftButton>
                    <SoftButton variant="gradient" color="info" marginLeft="50%" style={{ marginTop:"1%" ,marginBottom: "2.5%" }} onClick={() => {
                        navigate('/authentication/assignments')
                    }} >
                        Assignments
                    </SoftButton>
                
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
                        style={{ height: "70vh", width: "150vh", padding: "2%"}}
                        onRowClick={(e) => {
                            // console.log(e);
                        }}
                        className='custom-data-grid'
                    />
                </div>

                {/* <div className="search" >
                <TextField
                    id="outlined-basic"
                    onChange={inputHandler}
                    variant="outlined"
                    label="Search"
                    style={{}}
                />
            </div >
            <List input={inputText} /> */}

        </>
    )
}

export default AssignmentList;
