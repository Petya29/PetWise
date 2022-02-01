import React, { useEffect, useRef, useState } from 'react';
import UserService from '../../services/UserService';
import AppLoader from '../UI/AppLoader/AppLoader';

export default function ProfileCard() {

    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    let getProfile = useRef(() => { });

    getProfile = async () => {
        try {
            setLoading(true);

            const response = await UserService.profile();
            setUser(response.data);

            setLoading(false);
        } catch (e) {
            console.log(e)
            setLoading(false);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);


    return (
        <div className="profile-card">
            <div className="row">
                <div className="col s3"></div>
                <div className="col s6">
                    {loading
                        ?
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text center-align">
                                <AppLoader style={{ width: "50px", height: "50px" }} color="#ffffff" />
                            </div>
                        </div>
                        :
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Profile</span>
                                <div className="profile-data container">
                                    <table>
                                        <thead></thead>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{user.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{user.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Count</td>
                                                <td>{user.count}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="card-action">
                                <a href="#!" className="waves-effect waves-light btn-small">
                                    <i className="material-icons right">edit</i>
                                    Edit
                                </a>
                            </div>
                        </div>
                    }
                </div>
                <div className="col s3"></div>
            </div>
        </div>
    )
}
