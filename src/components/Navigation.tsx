'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navigation = () => {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState('');
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleMailingListClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEmailInput(true);
  };

  const handleEmailSubmit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // Here you can integrate with your mailing list provider
      console.log('Email submitted:', email);
      // Reset after submission
      setEmail('');
      setShowEmailInput(false);
      // You could show a success message here
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
      
      <div className="nav-center-wrapper">
        <div className="nav-right desktop-nav">
          <Link href="/current">exhibitions</Link>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <Link href="/contact">info</Link>
          <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
          {!showEmailInput ? (
            <a href="#" onClick={handleMailingListClick}>mailing list</a>
          ) : (
            <span>
              mailing list{' '}
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={handleEmailSubmit}
                onBlur={handleEmailBlur}
                autoFocus
                className="email-input"
                style={{ textAlign: 'left', width: 'auto' }}
              />
            </span>
          )}
        </div>
      </div>

      {showMobileMenu && (
        <div className="mobile-menu">
          <Link href="/current" onClick={() => setShowMobileMenu(false)}>exhibitions</Link>
          <Link href="/contact" onClick={() => setShowMobileMenu(false)}>info</Link>
          {!showEmailInput ? (
            <a href="#" onClick={handleMailingListClick}>mailing list</a>
          ) : (
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={handleEmailSubmit}
              onBlur={handleEmailBlur}
              autoFocus
              className="email-input"
            />
          )}
        </div>
      )}

    </nav>
  );
};

export default Navigation;