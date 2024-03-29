import React, { useEffect, useState } from 'react';
import '../chat/Chat.css';
import SoftInput from 'components/SoftInput';
import axios from 'axios';
import { ApiGet } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import { ApiPost } from 'config/Api/ApiData';
import Moment from 'react-moment/dist';
import moment from 'moment';
import { Category, HideImage } from '@mui/icons-material';
import { Menu, MenuItem } from '@mui/material';
import SoftButton from 'components/SoftButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Chat = () => {
    const [roomRecord, setRoomRecord] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [showBackgroundImage, setShowBackgroundImage] = useState(true);
    const [showBackgroundHeader, setShowBackgroundHeader] = useState(true);
    const [showBackgroundChat, setShowBackgroundChat] = useState(true);
    const [isSearchShow, setIsSearchShow] = useState(false);

    // console.log('showBackgroundImage', showBackgroundImage);

    const [chat, setChat] = useState({
        receiverId: "",
        roomId: "",
        message: ""
    })
    const [chatRecord, setChatRecord] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [search, setSearch] = useState();
    const [headerImage, setHeaderImage] = useState({
        firstName: "",
        profileImage: ""
    });
    console.log(headerImage,"headerIamge");
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }
    // const handleChange = (e) => {
    //     setChat({
    //         ...chat,
    //         [e.target.name]:e.target.value
    //     })
    // }

    const createRoom = (receiverUserData) => {
        console.log(receiverUserData, 'receiverUserData')
        const body = {
            receiverId: receiverUserData?._id
        }

        ApiPost(`${EndPoint.ROOM_CREATE}`, body)
            .then((res) => {
                getRoom();
            })
    }

    const getRoom = () => {
        ApiGet(`${EndPoint.ROOM_GET}`)
            .then((res) => {
                // Populate last message for each room
                const updatedRoomRecord = res?.data.map(room => {
                    return {
                        ...room,
                        lastMessage: room?.messager?.message || "No messages"
                    };
                });
                setRoomRecord(updatedRoomRecord);
                setSearchResults([]);
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
                setChatRecord(res?.data);
            })
    }

    const getSearch = () => {
        ApiGet(`${EndPoint.SEARCH_GET}?firstName=${search}`)
            .then((res) => {
                // console.log(res,"resnposesearch");
                setSearchResults(res?.data);
            })
    }

    const handleRoomId = (item) => {
        if (localStorage.getItem("id") !== item?.receiver?._id) {
            setChat({ ...chat, receiverId: item?.receiver?._id, roomId: item?._id });
        } else {
            setChat({ ...chat, receiverId: item?.sender?._id, roomId: item?._id });
        }

        getChat(item?._id);
        // setSearchResults(item?._id);
        setHeaderImage({
            firstName: localStorage.getItem("id") == item?.sender?._id ? item?.receiver?.firstName : item?.sender?.firstName,
            profileImage: item?.sender?.profileImage
        });
    }

    // const handleChat = (item) => {
    //     if (localStorage.getItem("id") != item?.receiver?._id) {
    //         setChat({ ...chat, receiverId: item?.receiver?._id, roomId: item?._id })
    //     } else {
    //         setChat({ ...chat, receiverId: item?.sender?._id, roomId: item?._id })
    //     }

    //     getChat(item?._id);
    // }


    // const handleChange = (e) => {
    //     setSearch({
    //         ...search,
    //         [e.target.name]:e.target.value,
    //     })
    // }

    const getProfileImage = (image) => {
        // console.log(image,"image");
        return image ? `http://localhost:3000${image}` : 'https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg';
    }

    useEffect(() => {
        getRoom("")
    }, [])

    const onKeyBtn = (e) => {
        if (e.key === "Enter")
            createChat();
    }

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
                                        {
                                            isSearchShow && (
                                                <input
                                                    type="text"
                                                    name='search'
                                                    className="search-bar"
                                                    // value={search}
                                                    placeholder="Search"
                                                    style={{border:"0px",outline:"none"}}
                                                    onChange={(e) => {
                                                        // handleChange(e);
                                                        setSearch(e.target.value);
                                                    }}
                                                // onKeyPress={(e) => {
                                                //     if (e.key === "Enter") {
                                                //         e.preventDefault();
                                                //         getSearch();
                                                //         handleClick();
                                                //     }
                                                // }}
                                                />
                                            )
                                        }

                                        {
                                            !isSearchShow ?
                                                <SoftButton
                                                    // type="button"
                                                    variant="gradient"
                                                    color="info"
                                                    aria-controls="simple-menu"
                                                    aria-haspopup="true"
                                                    onClick={(e) => {
                                                        // setSearch(e.target.value);
                                                        // getSearch();
                                                        // // handleOpen(true);
                                                        // handleClick(e);
                                                        setIsSearchShow(true)
                                                    }}
                                                    style={{border:"0px",outline:"none"}}
                                                    >
                                                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: "6px", marginBottom: "1%" }} />
                                                    {/* <FontAwesomeIcon icon={faPlus} style={{paddingRight:"3px",marginBottom:"1%"}}/>  */}
                                                    New Chat
                                                </SoftButton>
                                                :
                                                <button
                                                    type="button"
                                                    aria-controls="simple-menu"
                                                    aria-haspopup="true"
                                                    style={{ background: "none", height: "32px", border: "0", outline: "0" }}
                                                    onClick={(e) => {
                                                        setSearch(e.target.value);
                                                        getSearch();
                                                        // handleOpen(true);
                                                        // setIsSearchShow(false)
                                                        handleClick(e);
                                                    }}> <i className="fa fa-search" aria-hidden="true"></i>
                                                </button>
                                        }

                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={handleClose}
                                            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                            transformOrigin={{ horizontal: "right" }}

                                            sx={{
                                                "& .css-cmyovl-MuiPaper-root-MuiMenu-paper-MuiPopover-paper": {
                                                    border: " 0 solid rgba(0, 0, 0, 0.125)",
                                                    borderRadius: "1rem",
                                                    boxShadow: "0rem 1.25rem 1.6875rem 0rem rgba(0, 0, 0, 0)",
                                                },
                                                "& .MuiPaper-root": {
                                                    left: "274px !important",
                                                    width: "21.8%"
                                                }
                                            }}
                                        >
                                            {(searchResults && searchResults.length) ?
                                                searchResults.map((item) => (
                                                    <MenuItem key={item.id} onClick={() => createRoom(item)}>
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            <img src={getProfileImage(item?.profileImage)} alt="Profile" style={{ width: 30, height: 30, borderRadius: "50%", marginRight: 10 }} />
                                                            {item?.firstName}
                                                        </div>
                                                    </MenuItem>
                                                ))

                                                :
                                                (
                                                    <MenuItem >
                                                        <div style={{ display: "flex", alignItems: "center" }}>
                                                            NO RECORD FOUND
                                                        </div>
                                                    </MenuItem>
                                                )
                                            }
                                        </Menu>
                                    </div>
                                </div>
                            </div>

                            {roomRecord && roomRecord?.map((item) => (
                                <div key={item.id} className="rowroom" id="adstodos">
                                    <div className="inbox_chat">
                                        <div className="chat_list active_chat">
                                            <div className="chat_people">
                                                <div className="chat_img">
                                                    <img src={getProfileImage(item?.sender?.profileImage)} />
                                                </div>
                                                <div className="chat_ib" onClick={() => {
                                                    handleRoomId(item)
                                                    setShowBackgroundImage(false)
                                                    setShowBackgroundHeader(false)
                                                    setShowBackgroundChat(false)
                                                }}>
                                                    <h5>{localStorage.getItem("id") == item?.sender?._id ? item?.receiver?.firstName : item?.sender?.firstName} <span className="chat_date">{moment(item?.createdAt).format('DD/MM/YYYY LTS')}</span></h5>
                                                    <p>{item?.messager?.message}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mesgs">

                            <div className={`${showBackgroundHeader ? 'bg-transparent' : 'card-header p-1 bg-light border border-top-0 border-left-0 border-right-0'}`} style={{ color: " rgba(96, 125, 139,1.0)", height: "55px" }}>
                                {
                                    !showBackgroundHeader && <img className="float-left" style={{ width: " 45px", height: "45px" }} src={getProfileImage(headerImage?.profileImage)} />
                                }
                                <h6 className="float-left" style={{ margin: "0px", marginLeft: "10px" }}>{headerImage?.firstName}
                                </h6>
                            </div>
                            <div className={`${showBackgroundImage ? 'background-img' : 'bg-transparent'}`}>
                                <div className="msg_history">
                                    {chatRecord && chatRecord?.map((item) => (
                                        <div key={item.id} className="rowchat " id="adstodos">
                                            {(localStorage.getItem("id") == item?.senderId?.id) ?
                                                <div className="outgoing_msg">
                                                    <div className="outgoing_msg_img"> <img src={getProfileImage(item?.senderId?.profileImage)} /> </div>

                                                    <div className="sent_msg">
                                                        <p style={{ marginBottom: "0.4rem" }}>{item?.message}</p>
                                                        <p style={{ fontSize: "small" }}>{moment(item?.createdAt).format('DD/MM/YYYY LTS')}</p>
                                                    </div>
                                                </div>
                                                :
                                                <div className="incoming_msg">
                                                    <div className="incoming_msg_img"> <img src={getProfileImage(item?.senderId?.profileImage)} /> </div>
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
                                    <div className={`${showBackgroundChat ? 'bg-transparent' : 'input_msg_write'}`}>
                                        <div className='input_msg_write'>
                                            {!showBackgroundChat &&
                                                <SoftInput
                                                    type="text"
                                                    className="write_msg"
                                                    placeholder="Type a message"
                                                    value={chat?.message}
                                                    onChange={e => setChat(prev => ({ ...prev, message: e.target.value }))}
                                                    onKeyPress={(e) => onKeyBtn(e)}

                                                />}
                                            {!showBackgroundChat &&
                                                <button className="msg_send_btn" type="button"><i className="fa fa-paper-plane-o" aria-hidden="true" onClick={createChat}></i></button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Chat;