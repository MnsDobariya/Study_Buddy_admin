import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Description = () => {
    const navigate = useNavigate();

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
            <SoftBox mt={4} mb={1}>
                <div className="cardassignment w-75">
                    <div className="cardTitleassignment d-flex align-items-center">
                        <div className="lblassignment">
                            <label1>M</label1>
                        </div>
                        <h5 className="mb-2">Abc</h5>
                        {/* <p className="mb-0">9 minutes ago</p> */}
                        <div className="ml-auto mr-3 d-flex" style={{ gap: "20px" }}>
                            <SoftButton variant="gradient" color="info" style={{ border: "0px", outline: "none" }} >
                                Add Task
                            </SoftButton>
                            <SoftButton variant="gradient" color="info" style={{ border: "0px", outline: "none" }}>
                                Edit
                            </SoftButton>

                        </div>
                    </div>
                    {/* <p>9 minutes ago</p> */}
                    <div style={{ marginTop: "1%" }}>
                        <div className="row mt-3 ml-3">
                            <div className="col-sm-2 mx-2">
                                <p className="assignmentdata">Status</p>
                                <label className='pending' style={{ width: "60px", marginLeft: "0px", color: "#344767" }} >
                                    <span className='' >pending</span>
                                </label>
                            </div>
                            <div className="col-sm-2 mx-2">
                                <p className="assignmentdata">EndDate</p>
                                <p className="endDate">31 Des 2024</p>
                            </div>
                            <div className="col-sm-2 mx-2">
                                <p className="assignmentdata">StartDate</p>
                                <p className="startDate">31 Des 2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="card-body text-center" style={{ display: "flex", justifyContent: "start", marginLeft: "1%" }}>
                        <div className="lbl" style={{ width: "31px" }}>
                            <label1>MM</label1>
                        </div>
                        <div className="lbl1" style={{ width: "31px" }} >
                            <label1>FM</label1>
                        </div>
                    </div>
                    <div style={{ paddingBottom: "2%", marginTop: "1%", display: "flex", color: "#67748e" }}>
                        <div className="row mt-3 ml-3">
                            <div className="col-md-4">
                                <h4 className="assignmentdetails" onClick={() => {
                                    navigate("/assignments/details");
                                }}>Details</h4>
                            </div>
                            <div className="col-md-3">
                                <h4 className="assignmentdetails" onClick={() => {
                                    navigate("/assignments/tasks")
                                }}>Task</h4>
                            </div>
                            <div className="col-md-3">
                                <h4 className="assignmentdetails" onClick={() => {
                                    navigate("/assignments/description");
                                }}>Description</h4>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </div>
            </SoftBox>

            {/* Chart code */}

            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" type="text/css" rel="stylesheet" />
            </head>

            <div className="chat " style={{ marginLeft: "18%" }}>
                {/* <h3 className=" text-center">Messaging</h3> */}
                <div className="messaging">

                    <div className="inbox_msg">
                        <div className="inbox_people">
                            <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4>Chat</h4>
                                </div>

                            </div>


                            <div className="inbox_chat">
                                <div className="chat_list active_chat">
                                    <div className="chat_people">
                                        <div className="chat_img">
                                            <img src="" />
                                        </div>
                                        <div className="chat_ib">
                                            <h5>Admin <span className="chat_date">31 Des 2024</span></h5>
                                            <p>hii</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mesgs">


                            {/* <div className={`${showBackgroundImage ? 'background-img' : 'bg-transparent'}`}> */}
                            <div className="msg_history">


                                <div className="outgoing_msg">
                                    <div className="outgoing_msg_img"> <img src="" /> </div>

                                    <div className="sent_msg">
                                        <p style={{ marginBottom: "0.4rem" }}>jii</p>
                                        <p style={{ fontSize: "small" }}>31 Des 2024</p>
                                    </div>
                                </div>

                                <div className="incoming_msg">
                                    <div className="incoming_msg_img"> <img src="" /> </div>
                                    <div className="received_msg">
                                        <div className="received_withd_msg">
                                            <p style={{ marginBottom: "0.4rem" }}>hello</p>
                                            <p style={{ fontSize: "small" }}>31 Des 2024</p>
                                            <span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                            </div>



                            <div className='type_msg'>
                                {/* <div className={`${showBackgroundChat ? 'bg-transparent' : 'input_msg_write'}`}> */}
                                <div className='input_msg_write'>
                                    {/* {!showBackgroundChat && */}
                                    <SoftInput
                                        type="text"
                                        className="write_msg"
                                        placeholder="Type a message"


                                    />
                                    {/* } */}
                                    {/* {!showBackgroundChat && */}
                                    <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true"></i></button>
                                    {/* } */}
                                </div>
                                {/* </div> */}
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default Description;