import React from "react";
import Button from "react-bootstrap/Button";
import { FaTrash, FaEdit } from "react-icons/fa";

const User = ({user, editButtonClick=f=>f, deleteButtonClick=f=>f }) => {

    return (
        <tr>
            <td>{user.userId}</td>
            <td>{user.userName}</td>
            <td>{user.security}</td>
            <td>
                <Button variant="outline-dark" onClick={()=>editButtonClick(user)}>< FaEdit /></Button>
                &nbsp;
                <Button variant="outline-danger" onClick={()=>deleteButtonClick(user)}>< FaTrash /></Button>
            </td>
        </tr>
    )
}

export default User;