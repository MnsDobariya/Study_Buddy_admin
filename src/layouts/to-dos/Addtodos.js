import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import '../to-dos/Addtodos.css';


const categoryDropDown = [
    { label: "low", value: "low" },
    { label: "high", value: "high" },
    { label: "medium", value: "medium" }
];

const Addtodos = () => {
    const [addTodos,setAddTodos] = useState({

    });

    return (
        <>
            <SoftBox mt={4} mb={1}>
            <h2 style={{ textAlign: "left", marginTop: "5%",marginLeft:"23%" }}>
                            {/* {" "}
                            {addTeacher?.id ? "Update" : "Add"}  */}
                            To_dos 

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
                    <div style={{ display: "flex", marginTop: "6%",paddingLeft:"41px",paddingRight:"41px" }}>
                        <div className="col-sm-6 form-group">
                            <label htmlFor="name-f" style={{ fontWeight: "500" }} >DeadlineDate</label>
                            <SoftInput
                                type="date"
                                name="deadlinedate"
                                placeholder="DeadlineDate"
                                
                                // style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                            />

                        </div>
                        <div className="col-sm-6 form-group">
                            <label htmlFor="name-l" style={{ fontWeight: "500" }} >Task</label>
                            <SoftInput
                                type="text"
                                name="task"
                                placeholder="Task"
                               
                                // style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                            />

                        </div>
                    </div>
                    <div style={{ display: "flex",paddingLeft:"41px",paddingRight:"41px",marginTop:"2%" }}>
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
                                placeholder="Select Portable "
                                style={{borderRadius:"0.5rem"}}
                                // style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)",borderRadius:"0.5rem" }}
                                >
                                    {/* <option value="low">Low</option>
                                    <option value="high">High</option>
                                    <option value="medium">Mudium</option> */}
                                {/* {categoryDropDown && 
                                categoryDropDown?.map((x) => (
                                    <option value={x.value}>{x.value}</option>
                                ))
                                    
                                } */}
                                </select>

                        </div>
                        <div className="col-sm-6 form-group">
                            <label htmlFor="description" style={{ fontWeight: "500" }} >Description</label>
                            <SoftInput
                                type="text"
                                name="description"
                                placeholder="Description"
                                
                                // style={{ transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms", boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)", border: "0 solid rgba(0, 0, 0, 0.125)" }}

                            />
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
                    <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "27%", width: "40%",marginBottom:"10vh",marginTop:"6%"}}>
                        {/* {
                    addTeacher?.id ?
                        <SoftButton className="add-teacher" variant="gradient" color="info">
                            update
                        </SoftButton> : <SoftButton className="add-teacher" variant="gradient" color="info" fullWidth >
                            Add Teacher
                        </SoftButton>

                } */}

                        <SoftButton className="teacher1" variant="gradient" color="info" fullWidth  style={{ boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)"}}
                        >
                            {/* {location?.state ? "Update" : "Add"}  */}
                            Add Todos
                        </SoftButton>

                        {/* <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={addNewTeacher()} >
                                    {addTeacher?.id ? "Update" : "Add Teacher"}
                                </SoftButton> */}
                        <SoftButton variant="gradient" color="info" marginLeft="50%" fullWidth  style={{ boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0.05)" }}>
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