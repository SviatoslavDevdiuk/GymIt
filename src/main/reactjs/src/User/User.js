import React, {useState} from 'react';
import {Button, Collapse} from 'react-bootstrap';


const User = ({id, firstName, lastName, email, address, phoneNumber, accountNumber, editClick, deleteClick}) => {
    const [open, setOpen] = useState(false);


    return (
        <>

            <tr>
                <td onClick={() => setOpen(!open)}>{id}</td>
                <td onClick={() => setOpen(!open)}>{firstName}</td>
                <td onClick={() => setOpen(!open)}>{lastName}</td>
                <td onClick={() => setOpen(!open)}>{email} </td>
                <td>
                    <Button
                        onClick={() => editClick()}>edit</Button>
                </td>
                <td>
                    <Button onClick={() => deleteClick(id)}>delete</Button>
                </td>
            </tr>
            <Collapse in={open}>
                <tr>
                    <td colSpan="3">
                        Address: {address.country + ',' + address.city + ',' + address.street + ' ' + address.streetNumber}
                    </td>
                    <td colSpan="1">
                        Phone number: {phoneNumber}
                    </td>
                    <td colSpan="3">
                        Account number: {accountNumber}
                    </td>
                </tr>
            </Collapse>
        </>

    )


};
export default User;