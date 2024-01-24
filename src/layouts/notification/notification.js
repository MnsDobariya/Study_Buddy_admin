import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { ApiGet } from 'config/Api/ApiData';
import '../../layouts/notification/notification.css';
import { EndPoint } from 'config/EndPoint/Endpoint';
import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { toast } from 'react-toastify';

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

  useEffect(() => {
    getNotificationData("")
  }, [])


  const handleClose = () => {
    setOpen(false);
  };

  const deleteRecord = (id) => {
    axios.delete(`http://localhost:3000/api/v1/notification/delete/${id}`)
        .then((res) => {
            getNotificationData();
        })
        toast.success("Delete successfully")
}

  return (
    <>
      <div className="notification" style={{ display: "flex", marginTop: "5%" }}>
        <h3 style={{ marginLeft: "20%",marginBottom:"2%", fontWeight: "500", color: "#344767" }}>Notification List</h3>
      </div>

      {notificationData && notificationData?.map((item) => (
        <div key={item.id} className="rowtodos mt-1" id="adstodos">

          <div className="cardnotification" style={{ width: 500 }}>
            <div className="card-body">
              <div style={{ display: "flex" }}>
                <p className="cardnotification-title">{item.title}</p>
                <div style={{ marginLeft: "auto", display: "flex" ,marginRight:"3%",marginTop:"1%"}} >
                  <FontAwesomeIcon icon={faTrash} onClick={() => {
                    setOpen(true);
                    setDeleteId(item.id);
                  }} />
                </div>
              </div>
              <p className="cardnotification-text">Message : {item.description}</p>
            </div>
          </div>
        </div>
      ))}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-container": {
            "& .MuiPaper-root": {
              width: "100%",
              maxWidth: "500px",  // Set your width here
            },
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Delete
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure Delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button className="btn btn-primary" onClick={() => {
                deleteRecord(deleteId)
                handleClose(true)
            }}>Yes</Button> */}
          {/* <Button className="btn btn-secondary" onClick={handleClose} autoFocus>
                No
            </Button> */}
          <button type="button" className="btn btn-secondary" onClick={handleClose} >No</button>
          <button type="button" className="btn btn-danger" onClick={() => {
            deleteRecord(deleteId)
            handleClose(true)
          }}>Yes</button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Notification