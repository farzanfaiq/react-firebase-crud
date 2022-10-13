import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UsersDataService from "../../services/users";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const userDataPayload = {
    first_name: "",
    last_name: "",
    gender: "",
    phone: ""
};

export default function AddEditUserPopup(props){
    
    const [show, setShow] = useState(false);
    const [actionType, setActionType] = useState('add');
    const [userData, setUserData] =  useState(userDataPayload);
    const [userUUID, setUserUUID] =  useState(null);
    const [formSubmit, setFormSubmit] = useState(false);

    function createUser(userData){
        UsersDataService.create(userData).then((e)=>{
            alert('User created successfully.')
        }).catch((e)=>{
            alert(e)
        }).finally((e)=>{
            setFormSubmit(false);
            handleClose();
            
        }) 
    }

    function updateUser(uuid, userData){
        UsersDataService.update(uuid, userData).then((e)=>{
            alert('User Updated successfully.')
        }).catch((e)=>{
            alert(e)
        }).finally((e)=>{
            setFormSubmit(false);
            handleClose();
        }) 
    }

    function handleSubmit(e){
        setFormSubmit(true);
        if(actionType == 'add'){
            createUser(userData);
        }else if(actionType == 'edit'){
            updateUser(userUUID, userData);
        }
    }   
    
    function handleChangeInput(e){
        const { name, value } = e.target;
        setUserData(prevState  => ({...prevState, [name]: value}));
    }

    function handleClose(){
        setShow(false);
        setFormSubmit(false);
        props.handleCloseParent();
        setUserData(userDataPayload);
    }

    useEffect(()=>{
        setShow(props.show);
        setActionType(props.actionType);
        if(actionType == 'edit'){
            setUserUUID(props.uuid)
            setUserData(props.user)
        }
    });

    return (
        <Modal show={show} onHide={handleClose} size="md">
            <Modal.Header closeButton>
                <Modal.Title>
                    {props.actionType == 'add' ? 'Add User' : ''}
                    {props.actionType == 'edit' ? 'Edit User' : ''}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="row">
                    <div className="col-md-12 pt-1">
                        <label className="form-label">First Name</label>
                        <input type="text" name="first_name" id="first_name" className="form-control" onChange={handleChangeInput} value={userData.first_name} />
                    </div>
                    <div className="col-md-12 pt-1">
                        <label className="form-label">Last Name</label>
                        <input type="text" name="last_name" id="last_name" className="form-control" onChange={handleChangeInput} value={userData.last_name} />
                    </div>
                    <div className="col-md-6 pt-1">
                        <label className="form-label">Gender</label>
                        <select name="gender" id="gender" className="form-control" value={userData.gender} onChange={handleChangeInput}>
                            <option value="">-- Select --</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="col-md-6 pt-1">
                        <label className="form-label">Phone</label>
                        <input type="text" name="phone" id="phone" className="form-control" onChange={handleChangeInput} value={userData.phone} />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit} disabled={formSubmit}>
                    Save Changes {formSubmit && <FontAwesomeIcon icon={faSpinner} />}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}