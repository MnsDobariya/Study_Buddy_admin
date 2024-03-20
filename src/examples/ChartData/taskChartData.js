import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

const TaskChartData = () => {
    const [priority, setPriority] = useState([]);

    const location = useLocation();

    // console.log('location', location)


    useEffect(() => {
        ApiGet(`${EndPoint.TODOS_GETTASK}?priority=${location?.state}`)
            .then((res) => {
                // console.log(res,"responseStatus");
                setPriority(res?.data);
            })

    }, [location.state])

    const columns = [
        // { field: "index", headerName: "Id", width: 90 },

        {
            field: "task", headerName: "Task", width: 250
        },
        {
            field: "description", headerName: "Description", width: 350
        },
        { field: "deadlinedate", headerName: "Deadlinedate", width: 300, valueFormatter: params => moment(params?.value).format("DD MMM YYYY") },
        {
            field: "priority", headerName: "Priority", width: 200, renderCell: (params) => (
                <>
                    <label className={params.row.priority === 'High' ? 'high' : params.row.priority === 'Medium' ? 'medium' : 'low'}>
                        <span style={{ textAlign: "center", }}><b>{params?.row?.priority}</b></span>
                    </label>
                </>)
        }
    ]

    const indexedData = priority?.map((x, index) => ({
        ...x,
        index: index + 1
    }
    ))
    return (
        <>
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

export default TaskChartData;