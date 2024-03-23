import { Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

const Blocklist = () => {
    const [blockdata, setBlockData] = useState([]);
    // console.log(blockdata,"blockData");

    const getBlockRoom = () => {
        ApiGet(`${EndPoint.BLOCK_ROOM_GET}`)
            .then((res) => {
                // console.log(res, "responseBlockList");
                setBlockData(res?.data);
            })
    }

    useEffect(() => {
        getBlockRoom("");
    }, []);

    const columns = [
        { field: "firstName", headerName: "FirstName", width: 150, hideable: false },
        { field: "lastName", headerName: "LastName", width: 150, hideable: false },
        { field: "email", headerName: "Email", width: 200, hideable: false },
        { field: "phone", headerName: "Mobile", width: 200, hideable: false },
        { field: "phone", headerName: "Mobile", width: 200, hideable: false },
        { field: "birthday", headerName: "BirthDay", width: 180, valueFormatter: params => moment(params?.value).format("DD MMM YYYY"),hideable: false },
    ];

    const indexedData = blockdata?.map((item, index) => ({
        ...item?.receiverId,
        index: index + 1,

    }))

    return (
        <>
            <div style={{ height: "80vh", width: "77.5%", padding: "1%", marginLeft: "20%"}}>
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