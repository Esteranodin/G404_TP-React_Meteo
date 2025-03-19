import React from 'react'
import '../styles/Header.css'
import logo from '../assets/logo_transparent.png'

function Header() {
  return (
    <div className='header'>
        <img src= {logo} className="logo" alt="logo"></img>
    </div>
  )
}

export default Header