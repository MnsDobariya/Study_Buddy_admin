import React from "react";
// import '../assignments/assignment.css';


const assignmentDetails = () => {
    return (
        <>
            <div className="cardassignmentTitle w-75">

                <div className="card-assignment" style={{ height: "77px" }}>

                    <div style={{ padding: "22px", color: "#344767" }}>
                        <p className="card-assignment">AssignmentDetails</p>

                    </div>
                    <p className="card-assignment"> </p>
                </div>
            </div>
            <div className="cardassignment w-75">

                <div className="card-assignment2">

                    {/* <div style={{ display: "flex" }}>
                        <p className="card-assignment"></p>
                        <label className=''>
                            <span className=''></span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >

                        </div>
                    </div>
                    <p className="card-assignment"></p> */}
                    <div className="cardTitleassignment" style={{ display: "flex" }}>
                        <div className="lblassignment" >
                            <label1>M</label1>
                        </div>
                        <h5>Abc</h5>
                    </div>
                    {/* <p>9 minutes ago</p> */}
                    <div className="cardBodyassignment text-center" style={{ marginTop:"3%",marginLeft:"3%",display: "flex", justifyContent: "start",gap:"6rem" }}>
                        
                        <label>
                            <span>Status </span>
                        </label>
                        <label>
                            <span className=''>EndDate</span>
                        </label>
                        <label>
                            <span className=''>StartDate</span>
                        </label>
                        {/* <div className="ad-title m-auto">
                        </div> */}
                    </div>

                </div>
            </div>
        </>
    )
}

export default assignmentDetails;