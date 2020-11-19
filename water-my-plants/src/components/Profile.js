import React, {useState, useEffect, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { PlantContext } from '../contexts/PlantContext';

const Profile = () => { 
    const { initialUser } = useContext(PlantContext);
    const [update, setUpdate] = useState(false);
    const [userValues, setUserValues] = useState([]);
    const [valueToEdit, setValueToEdit] = useState(initialUser);

    const userID = localStorage.getItem("id");

    useEffect(() => {
        const fetchUsers = () => {
            axiosWithAuth()
              .get(`/api/users/${userID}`)
              .then(res => {
                setUserValues(res.data)
            })
            .catch(err => {
              console.log(err)
            });
          };
          fetchUsers();
    }, [userID]);

    const saveNewInfo = (e) => {
        e.preventDefault();
        axiosWithAuth()
        .put(`/api/users/${userValues.id}`, userValues)
        .then((res) => {
            setUpdate(false)
            setUserValues(userValues.map(value => {
                return value.id === valueToEdit.id ? res.data : value;
            }));
        })
        .catch((err) => {
            console.log(err)
        });
    };

    const handleChange = (e) => {
        e.persist();
        setUserValues({
            ...userValues,
            [e.target.name]: e.target.value
        })
    };

    const onClickEdit = (value) => {
        setUpdate(true);
        setValueToEdit(value);
    };

    return (
        <div className="profile-wrapper">
            <div className="profile-values">
                <h2>{userValues.firstName}'s Profile</h2>
                <div className="user">
                    <p>First Name: {userValues.firstName}</p>
                    <p>Last Name: {userValues.lastName}</p>
                    <p>Email: {userValues.email}</p>
                    <button onClick = {onClickEdit}>Update My Info</button>
                </div>
            </div>
            <div className="spacer"/>
            {update && (
                <form className="profile-form" onSubmit = {saveNewInfo}>
                    <label>First Name:
                        <input
                            type = 'text'
                            name = 'firstName'
                            value = {userValues.firstName}
                            onChange = {handleChange}
                        />
                    </label>
                    <label>Last Name:
                        <input
                            type = 'text'
                            name = 'lastName'
                            value = {userValues.lastName}
                            onChange = {handleChange}
                        />
                    </label>
                    <label>Email:
                        <input
                            type = 'email'
                            name = 'email'
                            value = {userValues.email}
                            onChange = {handleChange}
                        />
                    </label>
                    <label>Password:
                        <input
                            type = 'password'
                            name = 'password'
                            value = {userValues.password}
                            onChange = {handleChange}
                        />
                    </label>
                    <div className="button-row">
                        <button>Save Info</button>
                        <button onClick={() => setUpdate(false)}>Cancel</button>
                    </div>
                </form>
            )};
        </div>
    );
};

export default Profile;