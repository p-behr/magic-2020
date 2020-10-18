import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);
export default function UserProvider ({ url, children }) {

    const [users, setUsers] = useState();


    useEffect(() => {
        if (url.get) {
            if (url.alert) {
                alert(`GET ${url.get}`);
            }
            fetch(url.get, {
                method: 'GET',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => setUsers(data.users))
            .catch(console.error);
        } else {
            alert(`GET hostname:port/path`);
            setUsers([]);
        }
    }, [url]);


    const addUserRequest = (user) => {
        console.log(`Adding user ${user}`);


        const isDuplicateUser = (newUser) => {
            let error = false;
            users.forEach((user)=>{
                if (user.userId === newUser.userId) {
                    // alert('Duplicate user id is not allowed');
                    error = true;
                }
            });
            return error;
        }


        const addUser = (user) => {
            setUsers([
                ...users,
                {
                    userId: user.userId,
                    userName: user.userName,
                    security: user.security
                }
            ]);
        }
        // if (url.post) {
        //     fetch(url.post, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(user),
        //     })
        //     .then(response => {
        //         if (response.ok) {
        //             addUser(user);
        //         }
        //         return response.json();
        //     })
        //     .then(data => console.log(data))
        //     .catch(console.error);
        // } else {
            if (url.alert) {
                alert(`POST hostname:port/path {userId:"${user.userId}", userName:"${user.userName}", userSecurity:"${user.security}"}`);
            }
            if (!isDuplicateUser(user)) {
                addUser(user);
                return {
                    "success": true,
                    "message" : 'User added'
                }
            }
            return {
                "success": false,
                "message" : 'Duplicate UserID not allowed'
            }
    // }
    }


    const updateUserRequest = (user) => {
        // console.log(`Updating user ${user}`);
        const updateUser = (newUser) => {
            setUsers(
                users.map(oldUser => (
                    oldUser.userId === newUser.userId ? {
                            userId: newUser.userId,
                            userName: newUser.userName,
                            security: newUser.security
                        } : oldUser
                ))
            );
        }
        // if (url.post) {
        //     fetch(url.post, {
        //         method: 'PUT',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(user),
        //     })
        //     .then(response => {
        //         if (response.ok) {
        //             updateUser(user);
        //         }
        //         return response.json();
        //     })
        //     .then(data => console.log(data))
        //     .catch(console.error);
        // } else {
            if (url.alert) {
                alert(`PUT hostname:port/path {userId:"${user.userId}", userName:"${user.userName}", userSecurity:"${user.security}"}`);
            }
            updateUser(user);
            return {
                "success": true,
                "message" : 'User changed'
            }
    // }
    }

    const deleteUserRequest = (user) => {
        console.log(`Deleting user ${user}`);
        const deleteUser = (deleteUser) => {
            setUsers(users.filter(user => user.userId !== deleteUser.userId));
        }
        // if (url.post) {
        //     fetch(url.post, {
        //         method: 'DELETE',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(user),
        //     })
        //     .then(response => {
        //         if (response.ok) {
        //             deleteUser(user);
        //         }
        //         return response.json();
        //     })
        //     .then(data => console.log(data))
        //     .catch(console.error);
        // } else {
            if (url.alert) {
                alert(`DELETE hostname:port/path {userId:"${user.userId}", userName:"${user.userName}", userSecurity:"${user.security}"}`);
            }
            deleteUser(user);
            return {
                "success": true,
                "message" : 'User deleted'
            }
    // }
    }

    return (
        <UserContext.Provider value={{ users, addUserRequest, updateUserRequest, deleteUserRequest }}>
            {children}
        </UserContext.Provider>
    );
};