import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal, Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import '../resources/Resources.css';
import SoftTypography from 'components/SoftTypography';
import { ApiPost } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import { toast } from 'react-toastify';
import { ApiGet, ApiPut } from 'config/Api/ApiData';
import axios from 'axios';
import hotkeys from 'hotkeys-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faFileArrowDown, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';

const Resources = () => {
    const dispatch = useDispatch();
    const resource = useSelector((state) => state.resource);
    // console.log(resource, "resouces");

    const [open, setOpen] = useState();
    const [resources, setResources] = useState({
        title: "",
        description: "",
        file: ""
    });
    // console.log("resources", resources);
    const [error, setError] = useState({
        title: "",
        description: "",
        file: "",
    });


    const [resourecesRecord, setResourcesRecord] = useState([]);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [deleteId, setDeleteId] = useState();
    // console.log("resourecesRecord",resourecesRecord);
    const handlePopupClose = () => {
        setOpenPopUp(false);
    }

    const getResources = () => {
        ApiGet(`${EndPoint.RESOURCES_GET}`)
            .then((res) => {
                console.log(res, "respopne");
                setResourcesRecord(res?.data);
            })
    }

    const deleteResources = (id) => {
        axios.delete(`http://localhost:3000/api/v1/resources/delete/${id}`)
            .then((res) => {
                toast.success("Delete Successfully");
                getResources();
            })
    }

    const token = localStorage.getItem("token");


    const handleChange = (e) => {
        const { name, value } = e.target;

        const textRegex = /^[A-Za-z\s]+$/;

        setResources({
            ...resources,
            [name]: value,
        });

        if (name === "title") {
            if (!textRegex.test(value)) {
                setError({
                    ...error,
                    [name]: "please Enter Text Only",
                });
            } else {
                setError({
                    ...error,
                    [name]: "",
                })
            }
        }
        if (value.trim() === "") {
            setError({
                ...error,
                [name]: "",
            });
        }
    };

    const handleImageChange = (e) => {
        e.preventDefault();

        setResources({
            ...resources,
            file: e.target.files[0]
        });

    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setResources({
            title: "",
            description: "",
            file: ""
        });
        setOpen(false);
    }

    const handleDownload = (data) => {


        fetch(` http://localhost:3000` + data?.file).then((x) => {
            x.blob().then((blob) => {

                const fileURL =
                    window.URL.createObjectURL(blob);

                const downloadLink = document.createElement('a');
                downloadLink.href = fileURL;

                downloadLink.download = `${data?.title}.pdf`;

                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            });
        });
    };



    const columns = [
        // { field: "index", headerName: "Id", width: 150 },
        { field: "title", headerName: "Title", width: 200, hideable: false },
        { field: "description", headerName: "Description", width: 340, hideable: false },
        {
            field: "file", headerName: "File", width: 300, hideable: false,
            renderCell: (params) => {
                return (
                    <>
                        <FontAwesomeIcon icon={faFileArrowDown} onClick={() => handleDownload(params?.row)} style={{ cursor: "pointer" }} />
                    </>
                )
            }
        },

        {
            field: "action",
            headerName: "Action",
            width: 150,
            hideable: false,
            renderCell: (params) => {
                return (
                    <>

                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            height='20px'
                            width='30px'
                            className='edit-icon'
                            onClick={() => {
                                setResources(params.row);
                                handleOpen();
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
                            onClick={() => {
                                setOpenPopUp(true);
                                setDeleteId(params.row.id);
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

    const indexedData = resourecesRecord?.map((item, index) => ({
        ...item,
        id: item._id,
        index: index + 1,
    }))

    const AddResources = () => {
        const error = {};
        if (!resources?.title) {
            error.title = "Please Title Required";
        }

        if (!resources.description) {
            error.description = "Please Description Required";
        }
        if (!resources.file) {
            error.file = "Please File Required";
        }

        if (
            error.title ||
            error.description ||
            error.file
        ) {
            setError(error);
            return;
        }

        const form_data = new FormData();

        form_data.append("title", resources?.title)
        form_data.append("description", resources?.description)
        form_data.append("file", resources?.file)

        if (resources?.id) {
            ApiPut(`${EndPoint.RESOURCES_UPDATE}/${resources?.id}`, form_data)
                .then((res) => {
                    if (res?.status === 200) {
                        setResources({
                            title: "",
                            description: "",
                            file: ""
                        });
                    }
                    toast.success("Update Successfully");
                    handleClose();
                    getResources();
                });

        } else {
            ApiPost(`${EndPoint.RESOURCES_CREATE}`, form_data,
                { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    if (res?.status === 201) {
                        setResources({
                            title: "",
                            description: "",
                            file: ""
                        });
                        toast("Add Resources Successfully");
                    }
                    handleClose();
                    getResources();
                }).catch((error) => {
                    if (error.error === "Title already exits") {
                        toast.error(<p style={{ fontSize: "80%" }}>{"Title Already Exits"}</p>, {
                            position: "top-center",
                        });
                    }
                });
        }
    }

    // const onKeyBtn = (e) => {
    //     if (e.key === "Enter") {
    //         Addtodos();
    //     }
    // }

    useEffect(() => {
        getResources("");
    }, []);

    useEffect(() => {
        const handleAddBookShortcut = (e) => {
            if (e.key === "s" && e.altKey) {
                e.preventDefault();
                AddResources();
            }
        };
        document.addEventListener("keydown", handleAddBookShortcut);
        hotkeys("alt + c", (e) => {
            e.preventDefault();
            handleClose();
        });
        return () => {
            document.removeEventListener("keydown", handleAddBookShortcut);
            hotkeys.unbind("alt + c");
        }
    })

    return (
        <>
            <div style={{ height: "80vh", width: "77.5%", padding: "1%", marginLeft: "20%", marginTop: "2%" }}>
                <h3 style={{ fontSize: "larger", fontWeight: "500", color: " #344767" }}>Resources</h3>
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
                                <SoftButton variant="gradient" color="info" marginLeft="50%" onClick={() => {
                                    handleOpen(true);
                                }}
                                    style={{ border: "0px", outline: "none" }}
                                >
                                    Add Resources
                                </SoftButton>
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

            <SoftBox mt={4} mb={1}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="container" style={{ marginTop: "10%" }}>
                        <form className="addresources">
                            <div className="col-sm-12 mx-t3 mb-4">
                                <h3 style={{ textAlign: "center", marginTop: "5%", paddingTop: "3%", fontSize: "larger", fontWeight: "500", color: "#344767" }}>
                                    Resources
                                </h3>
                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-f" style={{ color: "#344767" }}>Title</label>
                                <SoftInput
                                    type="text"
                                    name="title"
                                    value={resources?.title}
                                    placeholder="Title"
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            title: "",
                                        });
                                        handleChange(e);
                                    }}
                                />
                                {error.title && <p style={{ color: "red", fontSize: "60%" }}>{error.title} </p>}

                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-l" style={{ color: "#344767" }}>Description</label>
                                <SoftInput
                                    type="text"
                                    name="description"
                                    value={resources?.description}
                                    placeholder="Description"
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            description: "",
                                        });
                                        handleChange(e);
                                    }}
                                />
                                {error.description && <p style={{ color: "red", fontSize: "60%" }}>{error.description} </p>}

                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="file" style={{ color: "#344767" }}>File</label>
                                <SoftInput
                                    type="file"
                                    // name="file"
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            file: "",
                                        });
                                        handleImageChange(e);
                                    }}
                                // onKeyPress={(e) => onKeyBtn(e)}
                                />
                                {error.file && <p style={{ color: "red", fontSize: "60%" }}>{error.file} </p>}

                                {/* <label htmlFor="file">{resources ? resources?.file?.name : resources?.file}</label> */}
                            </div>
                            <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "26%", width: "51%", marginBottom: "10vh" }}>

                                <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%", border: "0px", outline: "none" }} onClick={AddResources}>
                                    Resources
                                </SoftButton>

                                <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%", border: "0px", outline: "none" }} onClick={handleClose}>
                                    cancle
                                </SoftButton>
                            </SoftBox>

                        </form>
                    </div>
                </Modal>
            </SoftBox>
            <Dialog
                open={openPopUp}
                onClose={handlePopupClose}
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
                    <FontAwesomeIcon icon={faXmark} style={{ marginLeft: "95%", height: "22px" }} onClick={handlePopupClose} />
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
                        deleteResources(deleteId)
                        handlePopupClose(true)
                    }}
                        style={{ width: "30%", backgroundColor: "#dc3545" }}
                    >Yes</button>
                    <button type="button" className="btn btn-secondary" onClick={handlePopupClose} style={{ width: "30%", backgroundColor: "#6c757d" }} >No</button>
                </DialogActions>
            </Dialog>


        </>
    )
}

export default Resources;