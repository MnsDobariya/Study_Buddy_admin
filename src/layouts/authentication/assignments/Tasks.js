import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SoftBox from 'components/SoftBox';
import SoftButton from 'components/SoftButton';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Tasks = ()  => {
    const navigate = useNavigate();

    return (
        <>
            
            <SoftBox>
                <div className="cardTasks w-75">

                    <div className="card-Tasks" style={{ height: "110px" }}>

                        <div style={{ padding: "22px 22px 8px 22px", color: "#344767", fontSize: "initial" }}>
                            <p>Assignment Details</p>
                        </div>
                        <div className="card-Tasks2">
                            <div className="lbltasks">
                                <label1>M</label1>
                            </div>
                            <h5 style={{ padding: "8px", fontSize: "medium", color: "#67748e" }}> Assignment Details</h5>
                            <label className='dateTasks'>
                                <span className=''><p> DUE DATE: 30 MAR 2024</p></span>
                            </label>
                            <div className="mr-5" style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                                <FontAwesomeIcon icon={faPen}
                                    style={{ cursor: "pointer" }}
                                />
                                <FontAwesomeIcon icon={faTrash}
                                    style={{ cursor: "pointer" }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </SoftBox>
        </>

    )
}

export default Tasks;