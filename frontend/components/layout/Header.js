import React, {useContext} from 'react'
import Link from 'next/link'
import Image from "next/image";

import AuthContext from '@/contex/AuthContext';

const Header = () => {

  const {loading, user, logout} = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  }

  return (
    <div className="navWrapper">
      <div className="navContainer">
        <Link href="/">
          <div className="logoWrapper">
            <div className="logoImgWrapper">
              <Image width="50" height="50" src="/images/logo.png" alt=""/>
            </div>
            <span className="logo1">Job</span>
            <span className="logo2">ler</span>
          </div>
        </Link>
        <div className="btnsWrapper">
          <Link href="/employer/jobs/new">
            <button className="postAJobButton">
              <span>Post A Job</span>
            </button>
          </Link>
          {user ? (
            <div className="dropdown ml-3">
              <a
                className="btn dropdown-toggle mr-4"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>Hi, {user.first_name}</span>{" "}
              </a>
              <div
                className="dropdown-menu"
                aria-labelledby="dropDownMenuButton"
              >
                <Link href="/employer/jobs" className="dropdown-item">My Jobs</Link>
                <Link href="/me/applied" className="dropdown-item">Jobs Applied</Link>
                <Link href="/me" className="dropdown-item">Profile</Link>
                <Link href="/upload/resume" className="dropdown-item">Upload Resume</Link>
                <Link href="/" className="dropdown-item text-danger" onClick={logoutHandler}> Logout </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link href="/login">
                <button className="loginButtonHeader">
                  <span>Login</span>
                </button>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  )
}
export default Header





