import React from 'react'
import { useLogout } from '../hooks/useLogout'

function ProfileCard({user}) {

    const { logout } = useLogout();

  return (
    <>
    <div>
    <img src={user.photoURL} alt="" />
    <p>Name: {user.displayName}</p>
    <p>Username: {user.reloadUserInfo.screenName}</p>
    <p>Email: {user.email}</p>
    <p>User ID: {user.uid}</p>
    </div>
    <button onClick={logout}>logout</button>
    </>
  )
}

export default ProfileCard