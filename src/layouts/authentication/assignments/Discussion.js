import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import SoftInput from 'components/SoftInput';
import { ApiPost } from 'config/Api/ApiData';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

/* eslint-disable */


const Discussion = ({ assignmentDetails }) => {
    const [discussionRoomRecord, setDiscussionRoomRecord] = useState([]);
    const [discussionChat, setDiscussionChat] = useState({
        discussionroomId: "",
        message: "",
    });
    


    const navigate = useNavigate();


    const createDiscussionChat = () => {
        const body = {
            discussionroomId: discussionChat?.discussionroomId,
            message: discussionChat?.message,
        }

        ApiPost(`${EndPoint.DISCUSSIONCHAT_CREATE}`, body)
            .then((res) => {
                console.log(res, "chatres");
            })
    }

    const getDiscussionChat = () => {
        ApiGet(`${EndPoint.DISCUSSIONCHAT_GET}`)
            .then((res) => {
                // console.log(res,"chatRespone");
            })
    }

    const getDiscussionRoom = () => {
        ApiGet(`${EndPoint.DISCUSSIONROOM_GET}?assignmentId=${assignmentDetails?.id}`)
            .then((res) => {
                console.log(res,"chatRespone");
            })
    }
    useEffect(() => {
        getDiscussionRoom("");
        // console.log(assignmentDetails,"qqqqqqqqqqq");
    }, []);


    return (
        <>


            {/* Chart code */}

            <link href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
            <script src="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js"></script>
            <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
            <head>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" type="text/css" rel="stylesheet" />
            </head>

            <div className="" style={{ marginLeft: "18%" }}>
                {/* <h3 className=" text-center">Messaging</h3> */}
                <div className="messaging">

                    <div className="inbox_msg">
                        <div className="inbox_people2">
                            {/* <div className="headind_srch">
                                <div className="recent_heading">
                                    <h4>Chat</h4>
                                </div>

                            </div> */}
                                {assignmentDetails?.members?.map((item) => (
                                    <div key={item.id} className="inbox_chat">
                                        {/* {console.log(item?.firstName,"item")} */}
                                        <div className="chat_list active_chat" style={{backgroundColor:"white"}}>
                                            <div className="chat_people">
                                                <div className="chat_img">
                                                    <img src="" />
                                                </div>
                                                <div className="chat_ib">
                                                    <h5>{item?.firstName} <span className="chat_date">{moment(item?.createdAt).format('DD MMM YYYY')}</span></h5>
                                                    <p>hii</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </div>
                        <div className="mesgsDiscussion">


                            {/* <div className={`${showBackgroundImage ? 'background-img' : 'bg-transparent'}`}> */}
                            <div className="msg_historyDiscussion">


                                <div className="outgoing_msg" style={{margin:"26px 11px 26px"}}>
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
                                        
                                        onChange={e => setDiscussionChat(prev => ({ ...prev, message: e.target.value }))}

                                    />
                                    {/* } */}
                                    {/* {!showBackgroundChat && */}
                                    <button className="msg_send_btn" type="button" style={{background: "linear-gradient(310deg, #2152ff, #21d4fd)"}}><i className="fa fa-paper-plane-o" aria-hidden="true" onClick={createDiscussionChat}></i></button>
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

export default Discussion;