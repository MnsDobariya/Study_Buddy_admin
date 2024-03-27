import { Avatar, AvatarGroup } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import DashboardNavbar from 'examples/Navbars/DashboardNavbar';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { IoArrowBackCircleSharp } from "react-icons/io5";


const ChartData = () => {
    const [status, setStatus] = useState([]);

    const location = useLocation();

    // console.log('location', location)

    const navigate = useNavigate();

    useEffect(() => {
        ApiGet(`${EndPoint.ASSIGNMENT_GETSTATUS}?status=${location?.state}`)
            .then((res) => {
                // console.log(res,"responseStatus");
                setStatus(res?.data);
            })

    }, [location.state])

    const columns = [
        // { field: "index", headerName: "Id", width: 90 },

        {
            field: "title", headerName: "Title", width: 320, renderCell: (params) => (
                <AvatarGroup max={3} style={{ gap: "15px" }} variant="rounded">
                    <Avatar style={{ backgroundColor: "rgb(23, 193, 232)", color: "White", fontSize: "initial", fontWeight: "500" }} sx={{ width: 35, height: 35 }}>
                        {`${params.row.title.charAt(0).toUpperCase()}`}
                    </Avatar>

                    <p style={{ fontWeight: "500" ,marginTop:"5%"}}>{params.row.title}</p>
                </AvatarGroup>
            )
        },
        {
            field: "members", headerName: "Members", width: 150, renderCell: (params) => (
                <AvatarGroup max={3}>
                    {params.value.map((x, index) => (
                        <Avatar key={index} style={{ backgroundColor: "rgba(0, 0, 0, 0.07)", color: "black", fontSize: "initial", fontWeight: "500" }} sx={{ width: 35, height: 35 }}>
                            {`${x.firstName.charAt(0).toUpperCase()}${x.lastName.charAt(0).toUpperCase()}`}
                        </Avatar>
                    ))}
                </AvatarGroup>)
        },
        { field: "startDate", headerName: "Start Date", width: 180, valueFormatter: params => moment(params?.value).format("DD MMM YYYY") },
        {
            field: "status", headerName: "Status", width: 300, renderCell: (params) => (
                <>
                    <label style={{ marginLeft: "-10px" }} className={params.row.status === 'Pending' ? 'pending' : params.row.status === 'Started' ? 'started' : 'finished'}>
                        <span style={{ textAlign: "center", }}><b>{params?.row?.status}</b></span>
                    </label>
                </>)
        }
    ]

    const indexedData = status?.map((x, index) => ({
        ...x,
        index: index + 1
    }
    ))
    return (
        <>
            <DashboardNavbar />

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
                                    // justifyContent: "space-between",
                                    alignItems: "center",
                                }}
                            >
                                <GridToolbar />
                                <IoArrowBackCircleSharp onClick={()=>navigate("/dashboard")} size={"30px"} style={{marginLeft:"66%"}}/>Back
                            </div>

                        ),
                    }}

                    style={{ height: "82vh", width: "77.5%", padding: "2%", marginLeft: "20%" }}

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
        </>
    )
}

export default ChartData;