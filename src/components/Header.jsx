import logo from '../assets/logo_transparent.png'
import '../styles/Header.css'

function Header() {
  return (
    <div className='header'>
        <img src= {logo} className="logo" alt="logo"></img>
    </div>
  )
}

export default Header