import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { ApiGet } from 'config/Api/ApiData';
import '../../layouts/notification/notification.css';
import { EndPoint } from 'config/EndPoint/Endpoint';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';
import { token } from 'stylis';

const Notification = () => {
  const [notificationData, setNotificationDate] = useState();
  const [deleteId, setDeleteId] = useState();

  const [open, setOpen] = useState(false);

  const getNotificationData = () => {
    ApiGet(`${EndPoint.NOTIFICATION_GET}`)
      .then((res) => {
        setNotificationDate(res?.data)
      })
  }

  const token = localStorage.getItem("token");

  useEffect(() => {
    getNotificationData("")
  }, [])


  const handleClose = () => {
    setOpen(false);
  };

  const deleteRecord = (id) => {
    axios.delete(`http://localhost:3000/api/v1/notification/delete/${id}`,
      { headers: { "Authorization": `Bearer ${token}` } })
      .then((res) => {
        getNotificationData();
      })
    toast.success("Delete successfully")
  }

  return (
    <>
      <div className="notification" style={{ display: "flex", marginTop: "5%" }}>
        <h3 style={{ marginLeft: "20%", marginBottom: "2%", fontSize: "larger", fontWeight: "500", color: "#344767" }}>Notification List</h3>
      </div>

      {(notificationData && notificationData.length) ?
        notificationData?.map((item) => (
          <div key={item.id} className="rowtodos mt-1" id="adstodos">

            <div className="cardnotification" style={{ width: 750, marginLeft: '34%', height: 100, paddingBottom: "8%" }}>
              <div className="card-body">
                <div style={{ display: "flex" }}>
                  <p className="cardnotification-title">{item.title}</p>
                  <div style={{ marginLeft: "auto", display: "flex", marginRight: "3%", marginTop: "1%" }} >
                    <FontAwesomeIcon icon={faTrash} style={{ cursor: 'pointer' }} onClick={() => {
                      setOpen(true);
                      setDeleteId(item._id);
                    }} />
                  </div>
                </div>
                <p className="cardnotification-text">Message : {item.description}</p>
              </div>
            </div>
          </div>
        ))
        :
        (
          // <div className='noRecord' style={{ marginLeft: "50%", marginTop: "15%" }}>
          <div className="cardnotification" style={{ width: 300, marginLeft: '45%', height: 100, marginTop: "15%" }}>
            <div className="card-body">
              <div style={{ display: "flex" }}>
                <p className="cardnotification-title"></p>
                <div style={{ marginLeft: "35%", marginTop: "5%" }} >
                  No Record
                </div>
              </div>
              <p className="cardnotification-text"></p>
            </div>
          </div>
          // </div>
        )
      }

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              height: "40%",
              width: "100%",
              maxWidth: "500px",
              borderRadius: "0.5rem",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          {/* Delete */}
          <FontAwesomeIcon icon={faXmark} style={{ marginLeft: "95%", height: "22px" }} onClick={handleClose} />
        </DialogTitle>
        <svg data-slot="icon" fill="none" strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ width: "30%", marginLeft: "36%" }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" style={{ color: "red" }}></path>
        </svg>
        {/* <FontAwesomeIcon icon={faCircleXmark} /> */}
        {/* <link  rel="shortcut icon" href="https://image.similarpng.com/very-thumbnail/2020/11/InCorrect-icon-in-sticker-style-on-transparent-background-PNG.png" /> */}
        <DialogContent style={{ overflowY: "hidden" }}>
          <DialogContentText id="alert-dialog-description" style={{ textAlign: "center" }}>
            Are you sure Delete?
          </DialogContentText>
          <DialogContentText style={{ textAlign: "center" }}>
            Do you really want to delete these record?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ marginRight: "25%", paddingBottom: "5%" }}>

          <button type="button" className="btn btn-danger" onClick={() => {
            deleteRecord(deleteId)
            handleClose(true)
          }}
            style={{ width: "30%", backgroundColor: "#dc3545" }}
          >Yes</button>
          <button type="button" className="btn btn-secondary" onClick={handleClose} style={{ width: "30%", backgroundColor: "#6c757d" }} >No</button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Notification