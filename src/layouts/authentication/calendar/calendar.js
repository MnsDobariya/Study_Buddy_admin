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
import { ApiGet } from 'config/Api/ApiData';
import { ApiPut } from 'config/Api/ApiData';
import { object } from 'prop-types';
import hotkeys from 'hotkeys-js';
import '../calendar/calendar.css';


const Calendar = () => {

    const [calendarEvent, setCalendarEvent] = useState({
        title: "",
        startdate: "",
        enddate: ""
    });

    const [open, setOpen] = useState();

    const [error, setError] = useState({
        title: "",
        startdate: "",
        enddate: ""
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        getCalendarRecord();
        setOpen(false);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        const textRegex = /^[A-Za-z\s]+$/;

        if (name === "title") {
            if (!textRegex.test(value)) {
                setError({
                    ...error,
                    [name]: "",
                });
                return;
            }
        }
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
        handleOpen(true);
    }

    const updateEvent = () => {

        const body = {
            Title: calendarEvent?.title,
            StartDate: calendarEvent?.startdate,
            EndDate: calendarEvent?.enddate,
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
                    getCalendarRecord();
                    handleClose();
                    toast.success('Add Event Successfully');
                }
            })
    }

    const onKeyBtn = (e) => {
        if (e.key === "Enter") {
            if (calendarEvent?.id) {
                updateEvent();
            } else {
                Save();
            }
        }
    }

    useEffect(() => {
        hotkeys("alt + c", (e) => {
            e.preventDefault();
            handleClose();
        });

        return () => {
            hotkeys.unbind("alt + c");
        }

    })

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
                            handleClick(data);
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
                    <div className="container" style={{ marginTop: "10%" }}>
                        <form className="calender">
                            {/* <div className="row jumbotron box8"> */}
                            <div className="col-sm-12 mx-t3 mb-4">
                                <h3 style={{ textAlign: "center", marginTop: "5%", paddingTop: "3%", color: "#344767" }}>
                                    Event
                                </h3>
                                {/* <h2 className="text-center" style={{ paddingTop: "5%", color: "#344767" }}></h2> */}
                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-f" >Title</label>
                                <SoftInput
                                    type="text"
                                    name="title"
                                    value={calendarEvent?.title}
                                    placeholder="Title"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-l" >Start</label>
                                <SoftInput
                                    type="date"
                                    name="startdate"
                                    value={calendarEvent?.startdate}
                                    placeholder="dd/MM/yyyy"
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                />
                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-1" >End</label>
                                <SoftInput
                                    type="date"
                                    name="enddate"
                                    placeholder="dd/MM/yyyy"
                                    value={calendarEvent?.enddate}
                                    onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    onKeyPress={(e) => onKeyBtn(e)}
                                />
                            </div>
                            <FormGroup style={{ marginTop: "0%", marginLeft: "13%" }}>
                                <FormControlLabel control={<Checkbox />} label="All Day Event?" />
                            </FormGroup>
                            <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "26%", width: "51%", marginTop: "4%" }}>

                                {calendarEvent?.id ?
                                    <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%" }} onClick={updateEvent}>
                                        update
                                    </SoftButton> :
                                    <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%" }} onClick={Save}>
                                        Save
                                    </SoftButton>
                                }
                                <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%" }} onClick={handleClose}>
                                    cancle
                                </SoftButton>
                            </SoftBox>

                            {/* </div> */}
                        </form>
                    </div>
                </Modal>
            </SoftBox>
        </>
    )
}


export default Calendar;