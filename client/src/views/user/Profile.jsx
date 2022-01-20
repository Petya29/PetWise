import React from 'react';
import { useSelector } from 'react-redux';
import ProfileCard from '../../components/user/ProfileCard';

export default function Profile() {

    const user = useSelector(state => state.auth.user);

    return (
        <div className="profile-view">
            <ProfileCard user={user} />
        </div>
    )
}
