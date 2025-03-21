import { useState, useEffect } from 'react';
import logo from '../assets/logo_transparent.png';
import '../styles/Header.css';

function Header() {
  const [isTransparent, setIsTransparent] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsTransparent(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`header ${isTransparent ? 'header-transparent' : ''}`}>
      <img src={logo} className="logo" alt="logo" />
    </div>
  );
}

export default Header;