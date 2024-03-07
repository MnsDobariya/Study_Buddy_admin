import { Avatar } from '@mui/material';
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
    // console.log('assignmentDetails', assignmentDetails)
    const [discussionChatRecord, setDiscussionChatRecord] = useState([]);
    // console.log('discussionChatRecord', discussionChatRecord)
    const [discussionChat, setDiscussionChat] = useState({
        discussionroomId: "",
        message: "",
    });

    const [discussionRoomId, setDiscussionRoomId] = useState([]);
    // console.log(discussionRoomId,"discussionRoomId");  


    const navigate = useNavigate();


    const createDiscussionChat = () => {
        const body = {
            discussionroomId: discussionRoomId?.id,
            message: discussionChat?.message,
        }

        ApiPost(`${EndPoint.DISCUSSIONCHAT_CREATE}`, body)
            .then((res) => {
                if (res?.status === 201) {
                    setDiscussionChat({
                        ...discussionChat,
                        message: ""
                    })
                    getDiscussionChat(res?.data?.discussionroomId)
                }
            })
    }

    const getDiscussionChat = (roomId) => {
        ApiGet(`${EndPoint.DISCUSSIONCHAT_GET}?discussionroomId=${roomId}`)
            .then((res) => {
                console.log(res, "chatRespone++++");
                setDiscussionChatRecord(res?.data)
            })
    }

    const getDiscussionRoom = () => {
        ApiGet(`${EndPoint.DISCUSSIONROOM_GET}?assignmentId=${assignmentDetails?.assignmentDetail?.id}`)
            .then((res) => {
                // console.log(res,"chatRespone");
                setDiscussionRoomId(res?.data)

                getDiscussionChat(res?.data?.id);

            })
    }
    useEffect(() => {
        getDiscussionRoom("");
        // console.log(assignmentDetails,"qqqqqqqqqqq");
    }, []);

    const onKeyBtn = (e) => {
        if (e.key === "Enter")
            createDiscussionChat();
    }
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
                            {/* <h4 style={{marginTop:"5%"}}>Study Buddies</h4> */}

                            {discussionRoomId?.members?.map((item) => (
                                <div key={item.id} className="inbox_chat">
                                    {/* {console.log(item?.firstName,"item")} */}


                                    <div div className="chat_list active_chat" style={{ backgroundColor: "white" }}>
                                        <div className="chat_people">
                                            <div className="chat_img">
                                                {/* <img src="" /> */}
                                                <Avatar style={{ backgroundColor: "#17c1e8", color: "black",fontSize: "initial",fontWeight:"500" }} sx={{ width: 35, height: 35 }}>
                                                    {/* {item.firstName + " " + item.lastname} */}
                                                    {`${item.firstName.charAt(0).toUpperCase()}${item.lastName.charAt(0).toUpperCase()}`}
                                                </Avatar>
                                            </div>
                                            <div className="chat_ib">
                                                <h5>{item?.firstName} <span className="chat_date">{moment(item?.createdAt).format('DD MMM YYYY')}</span></h5>
                                                <p>{item?.email}</p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>
                        <div className="mesgsDiscussion">


                            {/* <div className={`${showBackgroundImage ? 'background-img' : 'bg-transparent'}`}> */}
                            <div className="msg_historyDiscussion">

                                {discussionChatRecord && discussionChatRecord?.map((item) => (
                                    <div key={item.id} className="rowchat " id="adstodos">
                                        {(localStorage.getItem("id") == item?.senderId?.id) ?


                                            <div className="outgoing_msg" style={{ margin: "26px 11px 26px" }}>
                                                <div className="outgoing_msg_img"> 
                                                <Avatar style={{ backgroundColor: "#17c1e8", color: "black",fontSize: "initial",fontWeight:"500" }} sx={{ width: 35, height: 35 }}>
                                                    {/* {item.firstName + " " + item.lastname} */}
                                                    {`${item.senderId.firstName.charAt(0).toUpperCase()}${item.senderId.lastName.charAt(0).toUpperCase()}`}
                                                </Avatar>
                                                 </div>

                                                <div className="sent_msg">
                                                    <p style={{ marginBottom: "0.4rem" }}>{item?.message}</p>
                                                    {console.log('item', item)}
                                                    <p style={{ fontSize: "small" }}>{moment(item?.createdAt).format('DD/MM/YYYY LTS')}</p>
                                                </div>
                                            </div>
                                            :
                                            <div className="incoming_msg">
                                                <div className="incoming_msg_img"> 
                                                <Avatar style={{ backgroundColor: "#17c1e8", color: "black",fontSize: "initial",fontWeight:"500" }} sx={{ width: 35, height: 35 }}>
                                                    {/* {item.firstName + " " + item.lastname} */}
                                                    {`${item.senderId.firstName.charAt(0).toUpperCase()}${item.senderId.lastName.charAt(0).toUpperCase()}`}
                                                </Avatar>
                                                
                                                 </div>
                                                <div className="received_msg">
                                                    <div className="received_withd_msg">
                                                        <p style={{ marginBottom: "0.4rem" }}>{item?.message}</p>
                                                        <p style={{ fontSize: "small" }}>{moment(item?.createdAt).format('DD/MM/YYYY LTS')}</p>
                                                        <span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))}

                            </div>



                            <div className='type_msg'>
                                {/* <div className={`${showBackgroundChat ? 'bg-transparent' : 'input_msg_write'}`}> */}
                                <div className='input_msg_write'>
                                    {/* {!showBackgroundChat && */}
                                    <SoftInput
                                        type="text"
                                        className="write_msg"
                                        placeholder="Type a message"
                                        value={discussionChat?.message}
                                        onChange={e => setDiscussionChat(prev => ({ ...prev, message: e.target.value }))}
                                        onKeyPress={(e) => onKeyBtn(e)}

                                    />
                                    {/* } */}
                                    {/* {!showBackgroundChat && */}
                                    <button className="msg_send_btn" type="button" style={{ background: "linear-gradient(310deg, #2152ff, #21d4fd)" }}><i className="fa fa-paper-plane-o" aria-hidden="true" onClick={createDiscussionChat}></i></button>
                                    {/* } */}
                                </div>
                                {/* </div> */}
                            </div>
                            {/* </div> */}
                        </div>

                    </div>
                </div>
            </div >


        </>
    )
}

export default Discussion;