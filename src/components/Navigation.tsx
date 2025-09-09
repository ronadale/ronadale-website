'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleMailingListClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isMobile) {
      window.open('https://ronadale.us16.list-manage.com/subscribe?u=ac2562b4eb29481b9b4e402c0&id=16df52952d', '_blank');
    } else {
      setShowEmailInput(true);
    }
  };

  const handleEmailSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && email.trim()) {
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = 'https://ronadale.us16.list-manage.com/subscribe/post';
      form.target = '_blank';
      
      const uField = document.createElement('input');
      uField.type = 'hidden';
      uField.name = 'u';
      uField.value = 'ac2562b4eb29481b9b4e402c0';
      
      const idField = document.createElement('input');
      idField.type = 'hidden';
      idField.name = 'id';
      idField.value = '16df52952d';
      
      const emailField = document.createElement('input');
      emailField.type = 'hidden';
      emailField.name = 'EMAIL';
      emailField.value = email;
      
      form.appendChild(uField);
      form.appendChild(idField);
      form.appendChild(emailField);
      
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      
      setEmail('');
      setShowEmailInput(false);
    }
  };

  const handleEmailBlur = () => {
    if (email === '') {
      setShowEmailInput(false);
    }
  };


  return (
    <nav className="nav-bar">
      <div className="nav-left">
        <Link href="/" className="logo">RONADALE</Link>
      </div>
      
      <div className="nav-center-wrapper">
        <div className="nav-right desktop-nav">
          <Link href="/exhibitions">exhibitions</Link>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Link href="/contact">info</Link>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {!isMobile && !showEmailInput ? (
            <a href="#" onClick={handleMailingListClick}>mailing list</a>
          ) : !isMobile && showEmailInput ? (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEmailSubmit}
              onBlur={handleEmailBlur}
              autoFocus
              style={{
                fontFamily: '"Comic Sans MS", cursive, sans-serif',
                fontSize: '14px',
                background: 'none',
                border: 'none',
                outline: 'none',
                textAlign: 'left',
                width: '80px'
              }}
            />
          ) : (
            <a href="#" onClick={handleMailingListClick}>mailing list</a>
          )}
        </div>
      </div>
      
      <div 
        className="mobile-menu-toggle"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Image 
          src="/menu_icon.svg" 
          alt="Menu" 
          width={19} 
          height={19} 
        />
      </div>

      {showMobileMenu && (
        <div className="mobile-menu">
          <Link href="/exhibitions" onClick={() => setShowMobileMenu(false)}>exhibitions</Link>
          <Link href="/contact" onClick={() => setShowMobileMenu(false)}>info</Link>
          <a href="#" onClick={handleMailingListClick}>mailing list</a>
        </div>
      )}

    </nav>
  );
};

export default Navigation;