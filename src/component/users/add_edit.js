import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UsersDataService from "../../services/users";


const userDataPayload = {
    first_name: "",
    last_name: "",
    gender: "",
    phone: ""
};

export default function AddEditUserPopup(props){
    
    const [show, setShow] = useState(false);
    const [userData, setUserData] =  useState(userDataPayload);

    function handleSubmit(e){
       UsersDataService.create(userData).then((e)=>{
            alert('User created successfully.')
       }).catch((e)=>{
            alert(e)
       }).finally((e)=>{
            handleClose();
       })
    }   

    function handleChangeInput(e){
        let name = e.target.name;
        let value = e.target.value;
        setUserData(values => ({...values, [name]: value}))
    }

    function handleClose(){
        setShow(false);
        props.handleCloseParent();
        setUserData(userDataPayload);
    }

    useEffect(()=>{
        setShow(props.show);
    })

    return (
        <Modal show={show} onHide={handleClose} size="md">
            <Modal.Header closeButton>
                <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12 pt-1">
                        <label className="form-label">First Name</label>
                        <input type="text" name="first_name" id="first_name" className="form-control" onChange={handleChangeInput} />
                    </div>
                    <div className="col-md-12 pt-1">
                        <label className="form-label">Last Name</label>
                        <input type="text" name="last_name" id="last_name" className="form-control" onChange={handleChangeInput} />
                    </div>
                    <div className="col-md-6 pt-1">
                        <label className="form-label">Gender</label>
                        <select name="gender" id="gender" className="form-control" onChange={handleChangeInput}>
                            <option value="">-- Select --</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="col-md-6 pt-1">
                        <label className="form-label">Phone</label>
                        <input type="text" name="phone" id="phone" className="form-control" onChange={handleChangeInput}/>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}