import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);
export default function UserProvider ({ url, children }) {

    const [users, setUsers] = useState();
    const [message, setMessage] = useState({});

    const resetMessage = () => {
        setMessage({});
    }

    useEffect(() => {
        fetchData();
    }, [url]);

    const fetchData = () => {

        let message = {"type" : null, "text" : null}

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
            .then(response => {
                // The default message type & message text will be based on response.ok
                if (response.ok) {
                    message.type = 'success';
                    message.text = 'User List successfully fetched!';
                } else {
                    message.type = 'danger';
                    message.text = 'Tried to fetch the User List; server responded with an error';
                }
                // Then we need to parse the response body into JSON
                return response.json();
            })
            .then(data => {
                // If "success" is sent as part of the response it will
                // override the default value derived from response.ok
                if (data.success !== undefined) {
                    message.type = data.success ? "success" : "danger";
                }
                // If "message" is sent as part of the response it will
                // override the default value derived from response.ok
                if (data.message !== undefined) {
                    message.text = data.message;
                }
                // Then we need to load the users array
                return setUsers(data.users);
            })
            .catch(err => {
                message.type = "danger";
                message.text = err.toString();
                // console.log(err);
            })
            .finally( () => setMessage(message) );
        } else {
            if (url.alert) {
                alert(`GET hostname:port/path`);
            }
            setUsers([]);
        }
    }

    const addUserRequest = (user) => {
        const addUser = (user) => {
            setUsers([...users, {...user}]);
        }
        const isDuplicateUser = (newUser) => {
            let error = false;
            users.forEach((user)=>{
                if (user.userId === newUser.userId) {
                    error = true;
                }
            });
            return error;
        }

        if (url.post) {
            if (url.alert) {
                alert(`POST ${url.post} - {userId:"${user.userId}", userName:"${user.userName}", userSecurity:"${user.security}"}`);
            }

            fetch(url.post, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(response => {
                // The default message type & message text will be based on response.ok
                if (response.ok) {
                    message.type = 'success';
                    message.text = 'User successfully added!';
                } else {
                    message.type = 'danger';
                    message.text = 'Tried to add the User; server responded with an error';
                }
                // Then we need to parse the response body into JSON
                return response.json();
            })
            .then(data => {
                // If "success" is sent as part of the response it will
                // override the default value derived from response.ok
                if (data.success !== undefined) {
                    message.type = data.success ? "success" : "danger";
                }
                // If "message" is sent as part of the response it will
                // override the default value derived from response.ok
                if (data.message !== undefined) {
                    message.text = data.message;
                }
                // If "users" is sent as part of the response it will
                // override the user array we have locally
                if (data.users) {
                    setUsers(data.users);

                // If no "users" is returned, we check for success;
                // If success then we'll add the new user to the local array.
                } else if (message.type === "success") {
                    addUser(user);
                }
            })
            .catch(err => {
                message.type = "danger";
                message.text = err.toString();
                // console.log(err);
            })
            .finally( () => setMessage(message) );
        } else {
            if (url.alert) {
                alert(`POST hostname:port/path {userId:"${user.userId}", userName:"${user.userName}", userSecurity:"${user.security}"}`);
            }
            if (!isDuplicateUser(user)) {
                addUser(user);
            }
        }
    }


    const updateUserRequest = (user) => {
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

        if (url.post) {
            if (url.alert) {
                alert(`PUT ${url.post} - {userId:"${user.userId}", userName:"${user.userName}", userSecurity:"${user.security}"}`);
            }

            fetch(url.post, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(response => {
                // The default message type & message text will be based on response.ok
                if (response.ok) {
                    message.type = 'success';
                    message.text = 'User successfully changed!';
                } else {
                    message.type = 'danger';
                    message.text = 'Tried to change the User; server responded with an error';
                }
                // Then we need to parse the response body into JSON
                return response.json();
            })
            .then(data => {
                // If "success" is sent as part of the response it will
                // override the default value derived from response.ok
                if (data.success !== undefined) {
                    message.type = data.success ? "success" : "danger";
                }
                // If "message" is sent as part of the response it will
                // override the default value derived from response.ok
                if (data.message !== undefined) {
                    message.text = data.message;
                }
                // If "users" is sent as part of the response it will
                // override the user array we have locally
                if (data.users) {
                    setUsers(data.users);

                // If no "users" is returned, we check for success;
                // If success then we'll update the user to the local array.
                } else if (message.type === "success") {
                    updateUser(user);
                }
            })
            .catch(err => {
                message.type = "danger";
                message.text = err.toString();
                // console.log(err);
            })
            .finally( () => setMessage(message) );
        } else {
            if (url.alert) {
                alert(`PUT hostname:port/path {userId:"${user.userId}", userName:"${user.userName}", userSecurity:"${user.security}"}`);
            }
            updateUser(user);
        }
    }

    const deleteUserRequest = (user) => {

        const deleteUser = (deleteUser) => {
            setUsers(users.filter(user => user.userId !== deleteUser.userId));
        }

        if (url.post) {
            if (url.alert) {
                alert(`DELETE ${url.post} - {userId:"${user.userId}", userName:"${user.userName}", userSecurity:"${user.security}"}`);
            }

            fetch(url.post, {
                method: 'DELETE',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'omit',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            })
            .then(response => {
                // The default message type & message text will be based on response.ok
                if (response.ok) {
                    message.type = 'success';
                    message.text = 'User successfully deleted!';
                } else {
                    message.type = 'danger';
                    message.text = 'Tried to delete the User; server responded with an error';
                }
                // Then we need to parse the response body into JSON
                return response.json();
            })
            .then(data => {
                // If "success" is sent as part of the response it will
                // override the default value derived from response.ok
                if (data.success !== undefined) {
                    message.type = data.success ? "success" : "danger";
                }
                // If "message" is sent as part of the response it will
                // override the default value derived from response.ok
                if (data.message !== undefined) {
                    message.text = data.message;
                }
                // If "users" is sent as part of the response it will
                // override the user array we have locally
                if (data.users) {
                    setUsers(data.users);

                // If no "users" is returned, we check for success;
                // If success then we'll delete the user from the local array.
                } else if (message.type === "success") {
                    deleteUser(user);
                }
            })
            .catch(err => {
                message.type = "danger";
                message.text = err.toString();
            })
            .finally( () => setMessage(message) );
        } else {
            if (url.alert) {
                alert(`DELETE hostname:port/path {userId:"${user.userId}", userName:"${user.userName}", userSecurity:"${user.security}"}`);
            }
            deleteUser(user);
        }

    }

    return (
        <UserContext.Provider value={{
            users,
            addUserRequest,
            updateUserRequest,
            deleteUserRequest,
            fetchData,
            message,
            resetMessage
        }}>
            {children}
        </UserContext.Provider>
    );
}