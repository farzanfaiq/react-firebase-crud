import React, {useEffect, useState} from "react";
import MainLayout from '../../layout';
import AddEditUserPopup from './add_edit';

export default function Users(){

    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('Add');
    
    function handleOpen(){
        setShowModal(true);
    }

    function handleClose(){
        setShowModal(false);
    }

    useEffect(()=>{
        
    })

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
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Gender</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={5} className="text-center">No data available</td>
                    </tr>
                </tbody>
            </table>
            <AddEditUserPopup handleCloseParent={handleClose} show={showModal}/>
            
        </MainLayout>
    );
}