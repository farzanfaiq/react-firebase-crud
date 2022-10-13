import React, {useEffect, useState} from "react";
import MainLayout from '../../layout';
import AddEditUserPopup from './add_edit';
import UsersDataService from "../../services/users";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Users(){

    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('add');
    const [userList, setUserList] = useState([]);
    const [editUserData, setEditUserData] = useState(null);
    const [editUserUUID, setEditUserUUID] = useState(null);
    const [deletingUUID, setDeletingUUID] = useState(null);
    
    
    function handleOpen(){
        setShowModal(true);
        setActionType('add');
    }

    function handleClose(){
        setShowModal(false);
        setActionType('add');
    }

    function handleEditUser(e){
        let uuid = e.target.dataset.uuid;
        let result = userList.find(item => item.uuid === uuid);
        delete result.uuid;
        setShowModal(true);
        setActionType('edit');
        setEditUserData(result);
        setEditUserUUID(uuid);
    }   

    function handleDeleteUser(e){
        let uuid = e.target.dataset.uuid;
        setDeletingUUID(uuid)
        UsersDataService.delete(uuid).then((data)=>{
            alert('Data deleted successfully')
        }).catch((err)=>{
            alert(err)
        }).finally((res)=>{
            setDeletingUUID(null)
        })
    }

    function fetchUserList(){
        UsersDataService.getAll().then((data)=>{
            setUserList(data);
        }).catch((err)=>{
            alert(err)
        });
    }

    useEffect(()=>{
        console.log('useEffect')
        fetchUserList();
    }, []);

    return (
        <MainLayout>
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-primary btn-md float-end" type="button" onClick={handleOpen}>Add</button>
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Sno</th>
                        <th>UUID</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userList.length > 0 && userList.map((elem, ind)=>{
                        return (
                            <tr key={ind}>    
                                <td>{(ind + 1)}</td>
                                <td>{elem.uuid}</td>
                                <td>{elem.first_name}</td>
                                <td>{elem.last_name}</td>
                                <td>{elem.gender}</td>
                                <td>{elem.phone}</td>
                                <td>
                                    <button className="btn btn-info btn-sm" data-uuid={elem.uuid} onClick={handleEditUser}>
                                        Edit
                                    </button>
                                    <button className="btn btn-danger btn-sm" data-uuid={elem.uuid} onClick={handleDeleteUser} disabled={elem.uuid == deletingUUID}>
                                        Delete {elem.uuid == deletingUUID && <FontAwesomeIcon icon={faSpinner} />}
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    
                    {!userList.length && 
                        <tr>
                            <td colSpan={7} className="text-center">No data available</td>
                        </tr>
                    }
                    
                </tbody>
            </table>
            <AddEditUserPopup 
                handleCloseParent={handleClose} 
                show={showModal} 
                user={editUserData} 
                actionType={actionType}
                uuid={editUserUUID} 
            />
        </MainLayout>
    );
}