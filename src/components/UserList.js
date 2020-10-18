import React, {useState} from "react";
import UserRow from "./UserRow";
import UserForm from "./UserForm";
import Button from "react-bootstrap/Button";

import { useUsers } from "../hooks/UserProvider";


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

    const {users, fetchData} = useUsers();

    const [formState, setFormState] = useState(defaultFormState);
    const [filter, setFilter] = useState("");

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    }

    const handleAdd = () => {
        console.log(`Add button pressed`);
        setFormState({
            showForm: true,
            currentUser: blankUser,
            mode: "add"
        });
    }

    const handleEdit = (user) => {
        setFormState({
            showForm: true,
            currentUser: user,
            mode: "edit"
        });
    }

    const handleDelete = (user) => {
        setFormState({
            showForm: true,
            currentUser: user,
            mode: "delete"
        });
    }

    return (
        <>
            <Button variant="primary" onClick={handleAdd}>New User</Button>

            <br />
            Filter:
            <input
                type="text"
                value={filter}
                onChange={handleFilterChange}
            />
            <Button variant="outline-primary" onClick={fetchData}>
                Refresh
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-counterclockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"></path>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"></path>
                </svg>
            </Button>
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
                                users.filter((user) =>
                                    filter === "" || user.userName.toUpperCase().includes(filter.toUpperCase())
                                ).map((user) => (
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