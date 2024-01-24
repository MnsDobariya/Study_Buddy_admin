import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import '../to-dos/Addtodos.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ApiPost } from "config/Api/ApiData";
import { EndPoint } from "config/EndPoint/Endpoint";
import { ApiPut } from "config/Api/ApiData";
import { toast } from "react-toastify";
import hotkeys from "hotkeys-js";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';



const categoryDropDown = [
    { label: "Low", value: "Low" },
    { label: "High ", value: "High" },
    { label: "Medium", value: "Medium" }
];

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

const Addtodos = () => {
    const location = useLocation();
    const [addTodos, setAddTodos] = useState({
        task: "",
        portable: "",
        description: ""
    });
    const [startDate, setStartDate] = useState(new Date());
   const [error, setError] = useState({
        task: "",
        portable: "",
        description: ""
    });

    const token = localStorage.getItem("token");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setAddTodos({
            ...addTodos,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (location?.state) {
            setAddTodos(location?.state)
        }
    }, [location])

    const Addtodos = () => {
        const error = {};
        const taskRegex = /^[a-zA-Z]{2,40}([a-zA-Z]{2,40})+$/;
        if (!addTodos.task) {
            error.task = "Please Task Required";
        } else if (!taskRegex.test(!addTodos?.task)) {
            error.task = "Invalid Task";
        }

        if (!addTodos.portable) {
            error.portable = "Please Portable Required";
        }

        const descriptionRegex = /^[a-zA-Z]{2,40}([a-zA-Z]{2,40})+$/;
        if (!addTodos.description) {
            error.description = "Please Description Required";
        } else if (!descriptionRegex.test(!addTodos.description)) {
            error.description = "Invalid Description";
        }

        if (error.task || error.portable || error.description) {
            setError(error)
            return;
        }

        const body = {
            deadlinedate: startDate,
            task: addTodos.task,
            portable: addTodos.portable,
            description: addTodos.description
        }

        if (location?.state) {
            ApiPut(`${EndPoint.TODOS_UPDATE}/${location?.state?.id}`, body)
                .then((res) => {
                    toast.success("Update Successfully");
                    navigate("/todos");
                });
        } else {
            ApiPost(`${EndPoint.TODOS_CREATE}`, body,
                { headers: { "Authorization": `Bearer ${token}` } })
                .then((res) => {
                    if (res.status === 201) {
                        setAddTodos({
                            task: "",
                            portable: "",
                            description: ""
                        });
                        navigate("/todos");
                        toast.success("Add To-dos Successfully");
                    }
                }).catch((error) => {
                    if (error.error === "Task already exits") {
                        toast.error(<p style={{ fontSize: "80%" }}>{"Task Already Exits"}</p>, {
                            position: "top-center",
                        });
                    }
                });
        }
    }

    const onKeyBtn = (e) => {
        if (e.key === "Enter") {
            Addtodos();
        }
    }

    const cancelBtn = () => {
        navigate("/todos");
    }

    useEffect(() => {
        hotkeys("alt + c", (e) => {
            e.preventDefault();
            navigate("/todos");
        });
        return () => {
            hotkeys.unbind("alt + c");
        }
    })

    return (
        <>
            <SoftBox mt={4} mb={1}>
                <h2 style={{ textAlign: "left", marginTop: "5%", marginLeft: "20%" }}>
                    Todos
                </h2>

                <div className="container" style={{ marginTop: "5%", marginLeft: "19%" }}>
                    <form className="addtodos">
                        <div className="col-sm-12 mx-t3 mb-3">
                            
                        </div>
                        <div className="form-row" style={{ display: "flex", marginTop: "6%", paddingLeft: "41px", paddingRight: "41px" }}>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="name-f" style={{ fontWeight: "500" }} >DeadlineDate</label>
                                
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            // endDate={endDate}
                                            defaultValue={today}
                                            minDate={tomorrow}
                                            format="DD/MM/YYYY"
                                            views={['year', 'month', 'day']}
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    marginLeft: "19rem",
                                                },
                                                        "& .Mui-selected": {
                                                            backgroundColor: "black",
                                                        }
                                            }}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="name-l" style={{ fontWeight: "500" }} >Task</label>
                                <SoftInput
                                    type="text"
                                    name="task"
                                    value={addTodos?.task}
                                    placeholder="Task"
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            task: ""
                                        })
                                        handleChange(e)
                                    }}
                                />
                                {error.task && <p>{error.task}</p>}
                            </div>
                        </div>
                        <div className="form-row" style={{ display: "flex", paddingLeft: "41px", paddingRight: "41px", marginTop: "2%" }}>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="portable" style={{ fontWeight: "500" }}>Portable</label>
                               
                                <select
                                    name="portable"
                                    id="portable"
                                    className="form-control"
                                    value={addTodos?.portable}
                                    style={{ borderRadius: "0.5rem" }}
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            portable: ""
                                        })
                                        handleChange(e)
                                    }}
                                >
                                    <option key="">Select Portable</option>
                                    {categoryDropDown &&
                                        categoryDropDown?.map((x) => (
                                            <option key={x.value}>{x.value}</option>
                                        ))
                                    }
                                </select>
                                {error.portable && <p>{error.portable}</p>}
                            </div>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="description" style={{ fontWeight: "500" }} >Description</label>
                                <SoftInput
                                    type="text"
                                    name="description"
                                    value={addTodos.description}
                                    placeholder="Description"
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            description: ""
                                        })
                                        handleChange(e)
                                    }}
                                    onKeyPress={(e) => onKeyBtn(e)}
                                />
                                {error.description && <p>{error.description}</p>}
                            </div>
                        </div>
                        <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "32%", width: "30%", marginBottom: "10vh", marginTop: "6%" }}>
                          <SoftButton className="teacher1" variant="gradient" color="info" fullWidth onClick={Addtodos} style={{ boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)" }}
                            >
                                Add Todos
                            </SoftButton>

                            <SoftButton variant="gradient" color="info" marginLeft="50%" fullWidth onClick={cancelBtn} style={{ boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)" }}>
                                Cancel
                            </SoftButton>
                        </SoftBox>
                    </form>
                </div >
            </SoftBox >
        </>
    )
}

export default Addtodos;