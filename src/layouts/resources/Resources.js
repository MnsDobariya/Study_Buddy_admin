import React, { useEffect, useMemo, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import '../resources/Resources.css';
import SoftTypography from 'components/SoftTypography';
import { ApiPost } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import { toast } from 'react-toastify';
import { ApiGet } from 'config/Api/ApiData';
import { ApiPut } from 'config/Api/ApiData';
import axios from 'axios';
import hotkeys from 'hotkeys-js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';

const Resources = () => {
    const [open, setOpen] = useState();
    const [resources, setResources] = useState({
        title: "",
        description: "",
        file: ""
    });

    const [error, setError] = useState({
        title: "",
        description: "",
        file: ""
    });


    const [resourecesRecord, setResourcesRecord] = useState([]);
    const [openPopUp, setOpenPopUp] = useState(false);
    const [deleteId, setDeleteId] = useState();

    const handlePopupClose = () => {
        setOpenPopUp(false);
    }

    const deleteResources = (id) => {
        axios.delete(`http://localhost:3000/api/v1/resources/delete/${id}`)
            .then((res) => {
                // console.log(res,"delete");
                toast.success("Delete Successfully");
                getResources();
            })
    }

    const token = localStorage.getItem("token");


    const handleChange = (e) => {
        // console.log(resources,'resources++++++++++++++');
        const { name, value } = e.target;

        const textRegex = /^[A-Za-z\s]+$/;

        if (name === "title" || name === "description") {
            if (!textRegex.test(value)) {
                setError({
                    ...error,
                    [name]: "",
                });
                return;
            }
        }

        setResources({
            ...resources,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        e.preventDefault();

        setResources({
            ...resources,
            file: e.target.files[0]
        });
        // if (file && file.type.startsWith("image/")) {
        //     const render = new FileReader();
        //     render.onloadend = () => {
        //         setResources({
        //             ...resources,
        //             file: file,
        //         });
        //         // setResources(render.result);
        //     };
        //     render.readAsDataURL(file);
        // }
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
        const fileUrl = window.URL.createObjectURL(
            new Blob([data]),
        );

        //  const  fileUrl = ' http://localhost:3000' + data?.file;
        const downloadLink = document.createElement('a');
        downloadLink.href = fileUrl;
        downloadLink.setAttribute(
            'download',
            `FileName.pdf`,
        );
        // downloadLink.download = 'Abc.pdf';

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };



    const columns = [
        { field: "index", headerName: "Id", width: 150 },
        { field: "title", headerName: "Title", width: 200 },
        { field: "description", headerName: "Description", width: 290 },
        {
            field: "file", headerName: "File", width: 270,
            renderCell: (params) => {
                // console.log(params,"params");
                return (
                    <>
                        <FontAwesomeIcon icon={faFileArrowDown} onClick={() => handleDownload(params?.row)} />

                    </>
                )
            }
        },

        // { field: "phone", headerName: "Mobile_No", width: 160 },
        // { field: "gender", headerName: "Gender", width: 150 },

        {
            field: "action",
            headerName: "Action",
            width: 150,
            renderCell: (params) => {
                return (
                    <>
                        {/* Edit */}
                        {/* <FontAwesomeIcon icon={faFileArrowDown} /> */}
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
                                // console.log(params.row);
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

    const getResources = () => {
        ApiGet(`${EndPoint.RESOURCES_GET}`)
            .then((res) => {
                // console.log(res?.data,"getresourcesadat");
                setResourcesRecord(res?.data);
            });
    }


    useEffect(() => {
        getResources();
        // console.log(resources,"update");
    }, []);

    const indexedData = resourecesRecord.map((item, index) => ({
        ...item,
        index: index + 1,
    }))

    const AddResources = () => {
        // const error = {};

        // if (!resources?.file) {
        //     error.file = "please Image required";
        // }

        // if (error.file) {
        //     setError(error)
        //     return;
        // }

        const form_data = new FormData();

        form_data.append("title", resources?.title)
        form_data.append("description", resources?.description)
        form_data.append("file", resources?.file)

        if (resources?.id) {
            // console.log(resources?.id,"resources?.id");
            ApiPut(`${EndPoint.RESOURCES_UPDATE}/${resources?.id}`, form_data)
                .then((res) => {
                    // console.log(res,"update");
                    if (res?.status === 200) {
                        setResources({
                            title: "",
                            description: "",
                            file: ""
                        });
                    }
                    // console.log(res, "updateresources");
                    toast.success("Update Successfully");
                    handleClose();
                    getResources();
                });

        } else {
            ApiPost(`${EndPoint.RESOURCES_CREATE}`, form_data,
                { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    console.log(res, "AddResources");
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
                    console.log(error, "error");
                });
        }
    }

    // const updateResources = () => {
    //     const form_data = new FormData();

    //     form_data.append("title", resources?.title)
    //     form_data.append("description", resources?.description)
    //     form_data.append("file", resources?.file)
    //     // console.log(resources?.id,"aaaaaaaaaaaaaa");

    //     // axios.put(`http://localhost:3000/api/v1/resources/update/${id}`,form_data)
    //     ApiPut(`${EndPoint.RESOURCES_UPDATE}/${resources?.id}`, form_data)
    //         .then((res) => {
    //             // console.log(res, "updateresources");
    //             toast.success("Update Successfully");
    //             handleClose();
    //             getResources();
    //         });
    // }

    const onKeyBtn = (e) => {
        if (e.key === "Enter") {
            Addtodos();
        }
    }

    useEffect(() => {
        hotkeys("alt + c", (e) => {
            e.preventDefault();
            handleClose();
        });
        return () => {
            hotkeys.unbind("alt + c");
        }
    })

    return (
        <>
            <div style={{ width: "77.5%", padding: "1%", marginLeft: "20%", marginTop: "2%" }}>
                <h3 style={{ color: " #344767" }}>Resources</h3>
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
                                <SoftButton variant="gradient" color="info" marginLeft="50%" onClick={() => {
                                    handleOpen(true);
                                }}>
                                    Add Resources
                                </SoftButton>
                            </div>
                        ),
                    }}
                    style={{ height: "90vh", width: "100%", padding: "2%" }}
                    // onRowClick={(e) => {
                    //     // console.log(e);
                    // }}
                    className='custom-data-grid'
                />
            </div>

            <SoftBox mt={4} mb={1}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="container" style={{ marginTop: "10%" }}>
                        <form className="addresources">
                            {/* <div className="row jumbotron box8"> */}
                            <div className="col-sm-12 mx-t3 mb-4">
                                <h3 style={{ textAlign: "center", marginTop: "5%", paddingTop: "3%", color: "#344767" }}>
                                    Resources
                                </h3>
                                {/* <h2 className="text-center" style={{ paddingTop: "5%", color: "#344767" }}></h2> */}
                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-f" style={{ color: "#344767" }}>Title</label>
                                <SoftInput
                                    type="text"
                                    name="title"
                                    value={resources?.title}
                                    placeholder="Title"
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-l" style={{ color: "#344767" }}>Description</label>
                                <SoftInput
                                    type="text"
                                    name="description"
                                    value={resources?.description}
                                    placeholder="Description"
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}
                                />
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
                                    onKeyPress={(e) => onKeyBtn(e)}
                                />
                            </div>
                            <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "26%", width: "51%", marginBottom: "10vh" }}>

                                {/* <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%" }} onClick={updateResources}>
                                        update
                                    </SoftButton>  */}
                                <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%" }} onClick={AddResources}>
                                    Resources
                                </SoftButton>

                                <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%" }} onClick={handleClose}>
                                    cancle
                                </SoftButton>
                            </SoftBox>

                            {/* </div> */}
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
                        deleteResources(deleteId)
                        handlePopupClose(true)
                    }}>Yes</button>
                    <button type="button" className="btn btn-secondary" onClick={handlePopupClose} >No</button>
                </DialogActions>
            </Dialog>


        </>
    )
}

export default Resources;