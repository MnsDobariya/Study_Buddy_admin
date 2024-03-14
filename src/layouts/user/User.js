import { Stack } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import SoftButton from 'components/SoftButton';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import React, { useEffect, useState } from 'react';



const User = () => {
    const [user, setUser] = useState([]);

    const getAllUser = () => {

        ApiGet(`${EndPoint.ALLUSER_GET}`)
            .then((res) => {
                // console.log(res, "respopne");
                setUser(res?.data);
            })
    }

    useEffect(() => {
        getAllUser("");
    }, []);


    const columns = [
        // { field: "index", headerName: "Id", width: 150 },
        { field: "firstName", headerName: "FirstName", width: 150, hideable: false },
        { field: "lastName", headerName: "LastName", width: 150, hideable: false },
        { field: "email", headerName: "Email", width: 150, label: "view", hideable: false },
        { field: "gender", headerName: "Gender", width: 150, label: "view", hideable: false },
        { field: "phone", headerName: "Phone", width: 150, label: "view", hideable: false },
        { field: "division", headerName: "Division", width: 150, label: "view", hideable: false },
        { field: "birthday", headerName: "Birthdate", width: 150, label: "view", hideable: false },

    ];

    const indexedData = user?.map((item, index) => ({
        ...item,
        index: index + 1,
    }))

    return (
        <>
            <div style={{ height: "80vh", width: "77.5%", padding: "1%", marginLeft: "20%", marginTop: "2%" }}>
                <h3 style={{ fontSize: "larger", fontWeight: "500", color: " #344767", marginBottom: "revert" }}>Users</h3>
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

export default User;