import React from 'react';
import UserService from '../../services/UserService';

export default function ProfileCard(props) {

    const temo = async () => {
        const response = await UserService.profile();
        console.log(response);
    }
    temo();

    return (
        <div className="profile-card">
            <div className="row">
                <div className="col s3"></div>
                <div className="col s6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Profile</span>
                            <div className="profile-data container">
                                <table>
                                    <thead></thead>
                                    <tbody>
                                        <tr>
                                            <td>Name</td>
                                            <td>{props.user.name}</td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{props.user.email}</td>
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
                </div>
                <div className="col s3"></div>
            </div>
        </div>
    )
}
