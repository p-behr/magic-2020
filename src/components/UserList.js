import React, {useState} from "react";
import UserRow from "./UserRow";
import UserForm from "./UserForm";
import { useUsers } from "../hooks/UserProvider";
import Button from "react-bootstrap/Button";

const blankUser = {
    userId: '',
    userName: '',
    security: ''
}

const defaultFormState = {
    showForm : false,
    currentUser: blankUser,
    mode: ""
}

export default function UserList () {

    const {users} = useUsers();

    const [formState, setFormState] = useState(defaultFormState);

    const handleAdd = () => {
        console.log(`Add button pressed`);
        setFormState({
            showForm: true,
            currentUser: blankUser,
            mode: "add"
        });
    }

    const handleEdit = (user) => {
        console.log(`Edit button pressed for ${JSON.stringify(user)}`)
        setFormState({
            showForm: true,
            currentUser: user,
            mode: "edit"
        });
    }

    const handleDelete = (user) => {
        console.log(`Delete button pressed for ${JSON.stringify(user)}`)
        setFormState({
            showForm: true,
            currentUser: user,
            mode: "delete"
        });
    }

    return (
        <>
            <Button variant="primary" onClick={handleAdd}>New User</Button>
            <UserForm
                mode={formState.mode}
                show={formState.showForm}
                currentUser={formState.currentUser}
                onCancel={()=>setFormState(defaultFormState)}
            />

            <div>
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>User ID</th>
                            <th>User Name</th>
                            <th>Security</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users.length > 0 ? (
                                users.map((user) => (
                                    <UserRow
                                        key={user.userId}
                                        user={user}
                                        editButtonClick={handleEdit}
                                        deleteButtonClick={handleDelete}
                                    />
                                ))
                            ) : (
                                <tr><td colSpan={4}>No users found - Please Add New User.</td></tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )

}