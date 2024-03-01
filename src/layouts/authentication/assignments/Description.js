import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Description = () => {
    const navigate = useNavigate();

    return (
        <>
           

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