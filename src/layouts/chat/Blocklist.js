import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Menu, MenuItem, Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ApiPut } from 'config/Api/ApiData';
import { ApiDelete } from 'config/Api/ApiData';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { PiDotsThreeCircleVerticalLight } from 'react-icons/pi';

const Blocklist = () => {
    const [blockdata, setBlockData] = useState([]);
    // console.log(blockdata,"blockData");
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedRowId, setSelectedRowId] = useState(null);


    const handleClick = (event, rowId) => {
        setAnchorEl(event.currentTarget);
        setSelectedRowId(rowId);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const getBlockRoom = () => {
        ApiGet(`${EndPoint.BLOCK_ROOM_GET}`)
            .then((res) => {
                // console.log(res, "responseBlockList");
                setBlockData(res?.data);
            })
    }

    const updateUnblockRoom = (isBlocked, id) => {
        const body = {
            block: isBlocked,
        }
        ApiPut(`${EndPoint.UNBLOCK_ROOM_UPDATE}/${id}`, body)
            .then((res) => {
                // console.log(res, "responseRoom");
                getBlockRoom();
            })
    }


    const deleteRoom = (roomId) => {
        ApiDelete(`${EndPoint.ROOM_DELETE}/${roomId}`)
            .then((res) => {
                // console.log(res, "ddddddddddddddddddd");
                getBlockRoom();
            })
    }

    const handleDelete = () => {
        deleteRoom(selectedRowId);
        setAnchorEl(null);
    }

    const hanldeUnblock = () => {
        updateUnblockRoom(false, selectedRowId);
        setAnchorEl(null);
    }

    useEffect(() => {
        getBlockRoom("");
    }, []);

    const columns = [
        { field: "firstName", headerName: "FirstName", width: 190, hideable: false },
        { field: "lastName", headerName: "LastName", width: 190, hideable: false },
        { field: "email", headerName: "Email", width: 200, hideable: false },
        { field: "phone", headerName: "Mobile", width: 200, hideable: false },
        { field: "birthday", headerName: "BirthDay", width: 180, valueFormatter: params => moment(params?.value).format("DD MMM YYYY"), hideable: false },
        {
            field: "action",
            headerName: "Action",
            width: 80,
            renderCell: (params) => {
                // console.log(params, "params");
                return (
                    <>
                        <PiDotsThreeCircleVerticalLight
                            onClick={(e) => handleClick(e, params.row.id)}
                            style={{ marginLeft: "22%", color: "black", cursor: "pointer", fontSize: "30px" }}
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
                            <MenuItem onClick={() => hanldeUnblock(params?.row?.id)} style={{ borderBottom: "2px solid rgba(20,20,20,0.07)" }}>UnBlock</MenuItem>
                            <MenuItem onClick={() => handleDelete(params?.row?.id)}>Delete</MenuItem>

                        </Menu>
                    </>
                );
            },
        },
    ];

    const indexedData = blockdata?.map((item, index) => ({
        ...item,
        index: index + 1,
        firstName: item?.receiverId?.firstName,
        lastName: item?.receiverId?.lastName,
        email: item?.receiverId?.email,
        phone: item?.receiverId?.phone,
        birthday: item?.receiverId?.birthday,

    }))

    return (
        <>
            <div style={{ height: "80vh", width: "77.5%", padding: "1%", marginLeft: "20%" }}>
                <h3 style={{ fontSize: "larger", fontWeight: "500", color: " #344767", marginBottom: "revert" }}>Block List</h3>
                <DataGrid
                    rows={indexedData}
                    columns={columns}
                    pageSize={5}
                    localeText={{
                        toolbarExportPrint: "PDF",
                    }}
                    disableColumnSelector
                    components={{
                        NoRowsOverlay: () => (
                            <Stack height="100%" alignItems="center" justifyContent="center">
                                No Record
                            </Stack>
                        ),
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
                    style={{ height: "90vh", width: "100%", padding: "2%", cursor: "pointer" }}

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
            </div >
        </>
    )
}

export default Blocklist;