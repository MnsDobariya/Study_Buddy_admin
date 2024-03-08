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
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch, useSelector } from 'react-redux';

const today = dayjs();
const tomorrow = dayjs().add(1, 'day');

const Calendar = () => {

    const dispatch = useDispatch();
    const calendar = useSelector((state) => state.calendar);
    // console.log('calendar', calendar)
    const [calendarEvent, setCalendarEvent] = useState({
        title: "",
        startdate: "",
        enddate: ""
    });

    const [open, setOpen] = useState();

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
        setError({
            title: "",
            description: "",
            file: ""
        })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        const textRegex = /^[A-Za-z\s]+$/;

        setCalendarEvent({
            ...calendarEvent,
            [name]: value
        })

        if (name === "title") {
            if (!textRegex.test(value)) {
                setError({
                    ...error,
                    [name]: "please Enter Text Only",
                });
            } else {
                setError({
                    ...error,
                    [name]: "",
                })
            }
        }
        if (value.trim() === "") {
            setError({
                ...error,
                [name]: "",
            });
        }

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
        const error = {};
        if (!calendarEvent.title) {
            error.title = "Please Title Required";
        }

        if (
            error.title
        ) {
            setError(error);
            return;
        }

        const body = {
            Title: calendarEvent?.title,
            StartDate: startDate,
            EndDate: endDate,
        }

        ApiPut(`${EndPoint.EVENT_PUT}/${calendarEvent?.id}`, body)
            .then((res) => {
                toast.success("Update successfully");
                handleClose();
                getCalendarRecord();
            });
    }
    const Save = () => {
        const error = {};
        if (!calendarEvent.title) {
            error.title = "Please Title Required";
        }

        if (
            error.title
        ) {
            setError(error);
            return;
        }

        const body = {
            Title: calendarEvent?.title,
            StartDate: startDate,
            EndDate: endDate,
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
        const handleAddBookShortcut = (e) => {
            if (e.key === "s" && e.altKey) {
                e.preventDefault();
                Save();
            }
        };
        document.addEventListener("keydown", handleAddBookShortcut);
        hotkeys("alt + c", (e) => {
            e.preventDefault();
            handleClose();
        });

        return () => {
            document.removeEventListener("keydown", handleAddBookShortcut);
            hotkeys.unbind("alt + c");
        }

    }, [])

    return (
        <>
            <div style={{ width: "80%", marginLeft: "19%", height: "50%", marginTop: "2%" }}>
                <div style={{ display: "flex", gap: "81%" }}>
                    <h4 style={{ marginBottom: "2%", textAlign: "left", fontSize: "larger", fontWeight: "500", color: "#344767" }}>Calendar</h4>
                    <SoftButton variant="gradient" color="info" marginLeft="50%" style={{ height: "10%", border: "0px", outline: "none" }} onClick={() => {
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
                            <div className="col-sm-12 mx-t3 mb-5">
                                <h3 style={{ textAlign: "center", paddingTop: "6%", fontSize: "larger", fontWeight: "500", color: "#344767" }}>
                                    Event
                                </h3>
                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <label htmlFor="name-f" >Title</label>
                                <SoftInput
                                    type="text"
                                    name="title"
                                    value={calendarEvent?.title}
                                    placeholder="Title"
                                    onChange={(e) => {
                                        setError({
                                            ...error,
                                            title: "",
                                        })
                                        handleChange(e);
                                    }}
                                />
                                {error.title && <p style={{ color: "red", fontSize: "60%" }}>{error.title} </p>}

                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="Start Date">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            selectsStart
                                            startDate={startDate}
                                            endDate={endDate}
                                            defaultValue={today}
                                            minDate={tomorrow}
                                            format="DD/MM/YYYY"
                                            views={['year', 'month', 'day']}
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    marginLeft: "18rem",
                                                },
                                                "&  .MuiButtonBase-root  ": {
                                                    border: "none",
                                                    outline: "none"
                                                },
                                            }}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <div className="col-sm-10 form-group" style={{ marginLeft: "8%" }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoItem label="End Date">
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={startDate}
                                            defaultValue={today}
                                            format="DD/MM/YYYY"
                                            views={['year', 'month', 'day']}
                                            sx={{
                                                "& .MuiSvgIcon-root": {
                                                    marginLeft: "18rem",
                                                },
                                                "&  .MuiButtonBase-root  ": {
                                                    border: "none",
                                                    outline: "none"
                                                },
                                            }}
                                        />
                                    </DemoItem>
                                </LocalizationProvider>
                            </div>
                            <FormGroup style={{ marginTop: "0%", marginLeft: "13%" }}>
                                {/* <FormControlLabel control={<Checkbox />} label="All Day Event?" /> */}
                            </FormGroup>
                            <SoftBox mt={4} style={{ display: "flex", justifyContent: "center", gap: "20%", marginLeft: "26%", width: "51%", marginTop: "4%" }}>

                                {calendarEvent?.id ?
                                    <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%", border: "0px", outline: "none", }} onClick={updateEvent}>
                                        update
                                    </SoftButton> :
                                    <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%", border: "0px", outline: "none", }} onClick={Save}>
                                        Save
                                    </SoftButton>
                                }
                                <SoftButton className="add-teacher" variant="gradient" color="info" marginLeft="50%" style={{ marginTop: "3%", border: "0px", outline: "none", }} onClick={handleClose}>
                                    cancle
                                </SoftButton>
                            </SoftBox>
                        </form>
                    </div>
                </Modal>
            </SoftBox>
        </>
    )
}


export default Calendar;