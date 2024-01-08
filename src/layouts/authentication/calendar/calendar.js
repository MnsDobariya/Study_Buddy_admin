import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'
import React, { useEffect, useState } from 'react'
import SoftButton from 'components/SoftButton';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list';
import SoftBox from 'components/SoftBox';
import SoftInput from 'components/SoftInput';
import { Checkbox, FormControlLabel, FormGroup, Modal } from '@mui/material';
import SoftTypography from 'components/SoftTypography';
import { Save } from '@mui/icons-material';
import { ApiPost } from 'config/Api/ApiData';
import { EndPoint } from 'config/EndPoint/Endpoint';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { ApiGet } from 'config/Api/ApiData';
import { ApiPut } from 'config/Api/ApiData';
import { object } from 'prop-types';


const Calendar = () => {

    const [calendarEvent, setCalendarEvent] = useState({
        title: "",
        startdate: "",
        enddate: ""
    });

    const [open, setOpen] = useState()
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        getCalendarRecord()
        setOpen(false)
    }

    const handleChange = (e) => {
        setCalendarEvent({
            ...calendarEvent,
            [e.target.name]: e.target.value
        })
    }
    const getCalendarRecord = () => {
        ApiGet(`${EndPoint.EVENT_GET}`)
            .then((res) => {
                let updated = res?.data?.map((x) => ({
                    ...x,
                    title: x?.Title,
                    start: x?.StartDate,
                    end: x?.EndDate
                }))

                setCalendarEvent(updated);
            })
    };
    useEffect(() => {
        getCalendarRecord();

    }, [])

    const handleClick = (e) => {

        const data = { ...e?.event?._def?.extendedProps }
        data.id = e?.event?._def?.publicId

        setCalendarEvent({
            title: data?.Title,
            startdate: data?.StartDate,
            enddate: data?.EndDate,
            id: data?.id
        })
        handleOpen();
    }

    const updateEvent = () => {
        const body = {
            Title: calendarEvent?.title,
            StartDate: calendarEvent?.startdate,
            EndDate: calendarEvent?.enddate
        }
        ApiPut(`${EndPoint.EVENT_PUT}/${calendarEvent?.id}`, body)

            .then((res) => {
                toast.success("Update successfully");
                handleClose();
                getCalendarRecord();
            });
            
    }
    const Save = () => {

        const body = {
            Title: calendarEvent?.title,
            StartDate: calendarEvent?.startdate,
            EndDate: calendarEvent?.enddate
        }

        ApiPost(`${EndPoint.EVENT_CREATE}`, body)
            .then((res) => {
                if (res.status === 201) {
                    setCalendarEvent({
                        title: "",
                        startdate: "",
                        enddate: ""
                    })
                    getCalendarRecord()
                    navigate('/calendar')
                    handleClose()
                    toast.success('Add Event Successfully')
                }
            })
    }

    return (
        <>
            <div style={{ width: "80%", marginLeft: "19%", height: "50%", marginTop: "2%" }}>
                <div style={{ display: "flex", gap: "81%" }}>
                    <h4 style={{ marginBottom: "2%", textAlign: "left" }}>Calendar</h4>
                    <SoftButton variant="gradient" color="info" marginLeft="50%" style={{ height: "10%" }} onClick={() => {
                        handleOpen(true)
                    }} >
                        Add Event
                    </SoftButton>
                </div>

                <form className="border p-3" style={{ fontSize: "14px" }}>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={{
                            right: 'prev,next today',
                            left: 'title',
                            center: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                        }}
                        initialView='dayGridMonth'
                        weekends={true}
                        events={calendarEvent}
                        eventClick={(data) => {
                            handleClick(data)
                        }
                        }

                    />
                </form>
            </div >
            <SoftBox mt={4} mb={1}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="form_wrapper">
                        <div className="form_container">
                            <div className="row clearfix">
                                <div className="">
                                    <form>
                                        <div className="input_field">
                                            <SoftBox mb={0.5}>
                                                <SoftBox mb={0} ml={0.5}>
                                                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                        Title
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    type="text"
                                                    name="title"
                                                    value={calendarEvent?.title}
                                                    placeholder="Title"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                />
                                            </SoftBox>
                                        </div>
                                        <div className="input_field">
                                            <SoftBox mb={0.5}>
                                                <SoftBox mb={0} ml={0.5}>
                                                    <SoftTypography component="label" variant="caption" fontWeight="bold">
                                                        Start
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    type="date"
                                                    name="startdate"
                                                    value={calendarEvent?.startdate}
                                                    placeholder="dd/MM/yyyy"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                />
                                            </SoftBox>
                                        </div>
                                        <div className="input_field">
                                            <SoftBox mb={0.5}>
                                                <SoftBox mb={0} ml={0.5}>
                                                    <SoftTypography component="label" variant="caption" fontWeight="bold" >
                                                        End
                                                    </SoftTypography>
                                                </SoftBox>
                                                <SoftInput
                                                    type="date"
                                                    name="enddate"
                                                    value={calendarEvent?.enddate}
                                                    placeholder="dd/MM/yyyy"
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                />
                                            </SoftBox>
                                        </div>
                                        <FormGroup style={{ marginTop: "10%", marginLeft: "7%" }}>
                                            <FormControlLabel control={<Checkbox />} label="All Day Event?" />
                                        </FormGroup>

                                        <SoftBox mt={4} mb={1} style={{ display: "flex", justifyContent: "center", justifyContent: "space-between" }}>
                                            {
                                                calendarEvent?.id ?
                                                    <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={updateEvent} >
                                                        update
                                                    </SoftButton> : <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" onClick={Save} >
                                                        Save
                                                    </SoftButton>

                                            }
                                            <SoftButton variant="gradient" color="info" marginLeft="50%" onClick={handleClose} >
                                                Cancel
                                            </SoftButton>
                                        </SoftBox>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </SoftBox>
        </>
    )
}


export default Calendar;