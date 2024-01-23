import React, { useEffect, useState } from 'react';
import '../chat/Chat.css';
import SoftInput from 'components/SoftInput';
import axios from 'axios';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import { ApiPost } from 'config/Api/ApiData';

const Chat = () => {
    const [room, setRoom] = useState({
        receiverId: "",

    })
    const [roomRecord, setRoomRecord] = useState([]);

    const [chat, setChat] = useState({
        receiverId: "",
        roomId: "",
        message: ""
    })
    const [chatRecord, setChatRecord] = useState([]);
    // console.log(chatRecord,"chatRecord");

    const [search, setSearch] = useState();

    // const handleChange = (e) => {
    //     setChat({
    //         ...chat,
    //         [e.target.name]:e.target.value
    //     })
    // }

    const createRoom = () => {
        const body = {
            receiverId: room?.receiverId,
        }

        ApiPost(`${EndPoint.ROOM_CREATE}`, body)
            .then((res) => {
                // console.log(res, "aaaaaaaaaaaaaaaaaa");
            })
    }

    const getRoom = () => {
        ApiGet(`${EndPoint.ROOM_GET}`)
            .then((res) => {
                // console.log(res, "response");
                setRoomRecord(res?.data)
            })
    }

    const createChat = () => {
        const body = {
            receiverId: chat?.receiverId,
            roomId: chat?.roomId,
            message: chat?.message
        }

        ApiPost(`${EndPoint.CHAT_CREATE}`, body)
            .then((res) => {
                // console.log(res, "aaaaaaaaaaaaaaaaaa");
                if (res?.status === 201) {
                    setChat({
                        ...chat,
                        message: ""
                    })
                }
                getChat(chat?.roomId);
            })
    }

    const getChat = (roomId) => {
        ApiGet(`${EndPoint.CHAT_GET}?roomId=${roomId}`)
            .then((res) => {
                console.log(res, "responsechat");
                setChatRecord(res?.data);
            })
    }

    const getSearch = () => {
        ApiGet(`${EndPoint.SEARCH_GET}`)
            .then((res) => {
                // console.log(res,"aaaaaaaaaaaaaaaaaaa");  
            })
    }

    const handleRoomId = (item) => {
        if (localStorage.getItem("id") != item?.receiver?._id) {
            setChat({ ...chat, receiverId: item?.receiver?._id, roomId: item?._id })
        } else {
            setChat({ ...chat, receiverId: item?.sender?._id, roomId: item?._id })
        }

        getChat(item?._id);
    }
    const handleChat = (item) => {
        if (localStorage.getItem("id") != item?.receiver?._id) {
            setChat({ ...chat, receiverId: item?.receiver?._id, roomId: item?._id })
        } else {
            setChat({ ...chat, receiverId: item?.sender?._id, roomId: item?._id })
        }

        getChat(item?._id);
    }




    useEffect(() => {
        getRoom("")
        // getChat("")
        // getSearch("")
    }, [])

    return (
        <>
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
                                <div className="srch_bar">
                                    <div className="stylish-input-group">
                                        <input type="text" className="search-bar" placeholder="Search" />
                                        <span className="input-group-addon">
                                            <button type="button"> <i className="fa fa-search" aria-hidden="true"></i> </button>
                                        </span> </div>
                                </div>
                            </div>
                            {roomRecord && roomRecord?.map((item) => (
                                <div key={item.id} className="rowroom" id="adstodos">
                                    <div className="inbox_chat">
                                        <div className="chat_list active_chat">
                                            <div className="chat_people">
                                                <div className="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                                <div className="chat_ib" onClick={() => handleRoomId(item)}>
                                                    <h5>{item?.sender?.firstName} <span className="chat_date">Dec 25</span></h5>
                                                    <p>{item?.messager?.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mesgs">
                            <div className="msg_history">


                                {chatRecord && chatRecord?.map((item) => (
                                    <div key={item.id} className="rowchat" id="adstodos">
                                        {(localStorage.getItem("id") == item?.senderId) ?
                                            <div className="outgoing_msg">
                                                <div className="sent_msg" onClick={() => handleChat(item)}>
                                                    {/* <p>Test which is a new approach to have all
                                                                     solutions</p> */}
                                                    <p>{item?.message}</p>
                                                    <span className="time_date">{item?.createdAt} </span> </div>
                                            </div>
                                            :
                                            <div className="incoming_msg">
                                                <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                                <div className="received_msg">
                                                    <div className="received_withd_msg">
                                                        <p>{item?.message}</p>
                                                        <span className="time_date"> {item?.createdAt}</span>
                                                        {/* <span className="time_date"> 11:01 AM    |    June 9</span> */}
                                                        </div>
                                                </div>
                                            </div>
                                        }



                                    </div>
                                ))}
                                {/* <div className="incoming_msg">
                                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                    <div className="received_msg">
                                        <div className="received_withd_msg">
                                            <p>Test, which is a new approach to have</p>
                                            <span className="time_date"> 11:01 AM    |    Yesterday</span></div>
                                    </div>
                                </div>
                                <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Apollo University, Delhi, India Test</p>
                                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                                </div>
                                <div className="incoming_msg">
                                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                    <div className="received_msg">
                                        <div className="received_withd_msg">
                                            <p>We work directly with our designers and suppliers,
                                                and sell direct to you, which means quality, exclusive
                                                products, at a price anyone can afford.</p>
                                            <span className="time_date"> 11:01 AM    |    Today</span></div>
                                    </div>
                                </div>
                                <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Apollo University, Delhi, India Test</p>
                                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                                </div>
                                <div className="incoming_msg">
                                    <div className="incoming_msg_img"> <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil" /> </div>
                                    <div className="received_msg">
                                        <div className="received_withd_msg">
                                            <p>We work directly with our designers and suppliers,
                                                and sell direct to you, which means quality, exclusive
                                                products, at a price anyone can afford.</p>
                                            <span className="time_date"> 11:01 AM    |    Today</span></div>
                                    </div>
                                </div>
                                <div className="outgoing_msg">
                                    <div className="sent_msg">
                                        <p>Apollo University, Delhi, India Test</p>
                                        <span className="time_date"> 11:01 AM    |    Today</span> </div>
                                </div> */}
                            </div>
                            <div className="type_msg">
                                <div className="input_msg_write">
                                    <SoftInput
                                        type="text"
                                        className="write_msg"
                                        placeholder="Type a message"
                                        value={chat?.message}
                                        onChange={e => setChat(prev => ({ ...prev, message: e.target.value }))}
                                    />
                                    <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true" onClick={createChat}></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <p className="text-center top_spac"> Design by <a target="_blank" href="https://www.linkedin.com/in/sunil-rajput-nattho-singh/">Sunil Rajput</a></p> */}

                </div>
            </div>



        </>
    )
}

export default Chat;