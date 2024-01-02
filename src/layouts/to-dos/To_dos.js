import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SoftButton from "components/SoftButton";
import React from "react";
import '../to-dos/To_dos.css';
import { useNavigate } from "react-router-dom";

const To_dos = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="to-dos" style={{ display: "flex", marginTop: "5%" }}>
                <p style={{ marginLeft: "21%", fontWeight: "700" ,color:"#344767"}}>To-dos List</p>
                <SoftButton variant="gradient" color="info" style={{ marginBottom: "1%", marginLeft: "60%" }} onClick={() => navigate("/todos/addtodos")}>
                    Add To-dos
                </SoftButton>
            </div>
            <div className="card w-75">
                <div className="card-body">
                    <div style={{ display: "flex" }}>
                        <p className="card-title">With supporting text below as a natural lead-in to additional content.</p>
                        <label className='low'>
                            <span className=''>LOW</span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                            <FontAwesomeIcon icon={faPen} />
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <p className="card-text">Finish by:31 Des 2023</p>
                    {/* <a href="#" className="btn btn-primary">Button</a> */}
                </div>
            </div >
            <div className="card w-75">
                <div className="card-body">
                    <div style={{ display: "flex" }}>
                        <p className="card-title">With supporting text below as a natural lead-in to additional content.</p>
                        <label className='high'>
                            <span className=''>HIGH</span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                            <FontAwesomeIcon icon={faPen} />
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <p className="card-text">Finish by:31 Des 2023</p>
                    {/* <a href="#" className="btn btn-primary">Button</a> */}
                </div>
            </div>
            <div className="card w-75">
                <div className="card-body">
                    <div style={{ display: "flex" }}>
                        <p className="card-title">With supporting text below as a natural lead-in to additional content.</p>
                        <label className='medium'>
                            <span className=''>MEDIUM</span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                            <FontAwesomeIcon icon={faPen} />
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <p className="card-text">Finish by:31 Des 2023</p>
                    {/* <a href="#" className="btn btn-primary">Button</a> */}
                </div>
            </div>
            <div className="card w-75">
                <div className="card-body">
                    <div style={{ display: "flex" }}>
                        <p className="card-title">With supporting text below as a natural lead-in to additional content.</p>
                        <label className='low'>
                            <span className=''>LOW</span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                            <FontAwesomeIcon icon={faPen} />
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <p className="card-text">Finish by:31 Des 2023</p>
                    {/* <a href="#" className="btn btn-primary">Button</a> */}
                </div>
            </div>
            <div className="card w-75">
                <div className="card-body">
                    <div style={{ display: "flex" }}>
                        <p className="card-title">With supporting text below as a natural lead-in to additional content.</p>
                        <label className='high'>
                            <span className=''>HIGH</span>
                        </label>
                        <div style={{ marginLeft: "auto", display: "flex", gap: "39px" }} >
                            <FontAwesomeIcon icon={faPen} />
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                    </div>
                    <p className="card-text">Finish by:31 Des 2023</p>
                    {/* <a href="#" className="btn btn-primary">Button</a> */}
                </div>
            </div>
            
        </>
    )
}

export default To_dos;