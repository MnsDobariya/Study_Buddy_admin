import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import '../to-dos/Addtodos.css';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import "react-datepicker/dist/react-datepicker.css";
// import DatePicker from "react-datepicker";
import { ApiPost } from "config/Api/ApiData";
import { EndPoint } from "config/EndPoint/Endpoint";
import { ApiPut } from "config/Api/ApiData";
import { toast } from "react-toastify";
import hotkeys from "hotkeys-js";



const categoryDropDown = [
    { label: "low", value: "low" },
    { label: "high", value: "high" },
    { label: "medium", value: "medium" }
];

const Addtodos = () => {
    const location = useLocation();
    const [addTodos, setAddTodos] = useState({
        // deadlinedate: "",
        task: "",
        portable: "",
        description: ""
    });
    const [startDate, setStartDate] = useState(new Date());
    // console.log(startDate, "startDate");

  
    

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

    // console.log(location?.state,"aqaqaqaqaqa");
    useEffect(() => {
        if(location?.state){
            setAddTodos(location?.state)
        }
    },[location])

    const Addtodos = () => {
        const error = {};

        if (!addTodos.deadlinedate) {
            error.deadlinedate = "Please Date Required";
        }

        const taskRegex = /^[a-zA-Z]{2,40}([a-zA-Z]{2,40})+$/;
        if (!addTodos.task) {
            error.task = "Please Task Required";
        }else if(!taskRegex.test(!addTodos?.task)){
            error.task = "Invalid Task";
        }

        if (!addTodos.portable) {
            error.portable = "Please Portable Required";
        }

        const descriptionRegex  = /^[a-zA-Z]{2,40}([a-zA-Z]{2,40})+$/;
        if (!addTodos.description) {
            error.description = "Please Description Required";
        }else if(!descriptionRegex.test(!addTodos.description)){
            error.description = "Invalid Description";
        }

        if (error.deadlinedate || error.task || error.portable || error.description) {
            setError(error)
            return;
        }

        const body = {
            deadlinedate: startDate,
            task: addTodos.task,
            portable: addTodos.portable,
            description: addTodos.description
        }



        // axios.post(`http://localhost:3000/api/v1/todos/create`, body,
        // { headers: { "Authorization": `Bearer ${token}` } })
        //     .then((res) => {
        //         console.log(res, "res");
        //     })

        if(location?.state){
            // console.log("location?.state",location?.state);
            ApiPut(`${EndPoint.TODOS_UPDATE}/${location?.state?.id}`,body)
            .then((res) => {
                // console.log("updateres",res);
                toast.success("Update Successfully");
                navigate("/todos");
            });
        }else{
        ApiPost(`${EndPoint.TODOS_CREATE}`, body,
            { headers: { "Authorization": `Bearer ${token}` } })
            .then((res) => {
                // console.log(res,"res");
                if (res.status === 201) {
                    setAddTodos({
                        task: "",
                        portable: "",
                        description: ""
                    })
                }
                navigate("/todos");
                toast.success("Add To-dos Successfully");
            })
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
        hotkeys("alt + c",(e) => {
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
                    {/* {" "}
                            {addTeacher?.id ? "Update" : "Add"}  */}
                    To-dos

                </h2>

                <div className="container" style={{ marginTop: "5%", marginLeft: "19%" }}>
                    <form className="addtodos">
                        {/* <div className="row jumbotron box8"> */}
                        <div className="col-sm-12 mx-t3 mb-3">
                            {/* <h2 style={{ textAlign: "left", marginTop: "5%",paddingTop:"3%" }}>
                            {" "}
                            {addTeacher?.id ? "Update" : "Add"} 
                            To_dos 

                        </h2> */}
                        </div>
                        <div className="form-row" style={{ display: "flex", marginTop: "6%", paddingLeft: "41px", paddingRight: "41px" }}>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="name-f" style={{ fontWeight: "500" }} >DeadlineDate</label>
                                <SoftInput
                                    type="date"
                                    name="deadlinedate"
                                    value={addTodos?.deadlinedate}
                                    placeholder="DeadlineDate"
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            deadlinedate: ""
                                        })
                                        handleChange(e)
                                    }}
                                    />
                                    {/* <DatePicker
                                    className="form-control"
                                    selected={startDate}
                                    onChange={(date) =>
                                        setStartDate(date)
                                    }
                                    /> */}

                                {/* // style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }} */}
                                {/* /> */}
                                <div>
                                    {/* <DatePicker
                                        dateFormat="dd-MM-yyyy"
                                        className="form-control"
                                        selected={startDate}
                                        onChange={(date) =>
                                            setStartDate(date)
                                        }
                                    /> */}
                                </div>
                                {/* {error.deadlinedate && <p>{error.deadlinedate}</p>} */}
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
                                // style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}
                                />
                                {error.task && <p>{error.task}</p>}
                            </div>
                        </div>
                        <div className="form-row" style={{ display: "flex", paddingLeft: "41px", paddingRight: "41px", marginTop: "2%" }}>
                            <div className="col-sm-6 form-group">
                                <label htmlFor="portable" style={{ fontWeight: "500" }}>Portable</label>
                                {/* <SoftInput
                                    type="text"
                                    name="portable"
                                    placeholder="Portable"

                                /> */}
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
                                // style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)",borderRadius:"0.5rem" }}
                                >
                                    {/* <option value="low">Low</option>
                                    <option value="high">High</option>
                                    <option value="medium">Mudium</option> */}
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
                                // style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}
                                />
                                {error.description && <p>{error.description}</p>}
                            </div>
                        </div>
                        {/* <div style={{ display: "flex" }}>
                        <div className="col-sm-6 form-group">
                            <label htmlFor="mobile" style={{ fontWeight: "500" }} >Mobile</label>
                            <SoftInput
                                type="mobile"
                                name="phone"
                                placeholder=""
                               
                                style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}
                            />

                        </div> */}

                        {/* <div className="col-sm-6 form-group mt-1">
                            <h5 style={{ display: "flex" }}>
                                <label htmlFor='Gender' style={{ fontWeight: "500" }} >Gender :{""}</label>
                            </h5>
                            <input
                                type='radio'
                                name='gender'
                                checked={addTeacher?.gender == "male" ? true : false}
                                onChange={(e) =>
                                    setAddTeacher({
                                        ...addTeacher,
                                        gender: "male"
                                    })}

                            />
                            Male
                            <input
                                type='radio'
                                name='gender'
                                style={{ marginLeft: "20px" }}
                                checked={addTeacher?.gender == "female" ? true : false}
                                onChange={(e) =>
                                    setAddTeacher({
                                        ...addTeacher,
                                        gender: "female"
                                    })}
                            />
                            Female
                        </div> */}
                        {/* </div> */}
                        <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "32%", width: "30%", marginBottom: "10vh", marginTop: "6%" }}>
                            {/* {
                    addTeacher?.id ?
                        <SoftButton className="add-teacher" variant="gradient" color="info">
                            update
                        </SoftButton> : <SoftButton className="add-teacher" variant="gradient" color="info" fullWidth >
                            Add Teacher
                        </SoftButton>

                } */}

                            <SoftButton className="teacher1" variant="gradient" color="info" fullWidth onClick={Addtodos} style={{ boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)" }}
                            >
                                {/* {location?.state ? "Update" : "Add"}  */}
                                Add To-dos
                            </SoftButton>

                            {/* <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={addNewTeacher()} >
                                    {addTeacher?.id ? "Update" : "Add Teacher"}
                                </SoftButton> */}
                            <SoftButton variant="gradient" color="info" marginLeft="50%" fullWidth onClick={cancelBtn} style={{ boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)" }}>
                                Cancel
                            </SoftButton>
                        </SoftBox>
                        {/* </div> */}
                    </form>
                </div >
            </SoftBox >
        </>
    )
}

export default Addtodos;