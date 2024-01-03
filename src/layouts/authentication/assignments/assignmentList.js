import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SoftButton from 'components/SoftButton';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AssignmentList = () => {
    const [assignmentRecord, setAssignmentRecord] = useState();

    const getAssignmentRecord = () => {
        // axios.get("http://localhost:3000/api/v1/users/teacher/get",
        ApiGet(`${EndPoint.ASSIGNMENT_GET}`)
            .then((res) => {
                console.log(res, "helloo");
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

    // const indexedData = assignmentRecord?.map((item, index) => ({
    //     ...item,
    //     index:index + 1,
    // }))

    const columns = [
        { field: "index", headerName: "Id", width: 90 },
        { field: "title", headerName: "Title", width: 110 },
        { field: "status", headerName: "Status", width: 120 },
        { field: "startDate", headerName: "Start Date", width: 110 },
        { field: "assignmentSummary", headerName: " Summary", width: 110 },
    ]

    return (
        <div style={{ width: "70%", padding: "1%", marginLeft: "20%" }}>
            <DataGrid
                rows={""}
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
            {openPopUp && (
                <div>

                    {/* hello
    <button onClick={()=>deleteRecord(deleteRowId)}>Yes</button>
    <button onClick={()=>{setOpenPopUp(false)}}>No</button> */}

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
            )}

        </div >
    )
}

export default AssignmentList;