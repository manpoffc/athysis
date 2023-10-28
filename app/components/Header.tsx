import Link from 'next/link';
import React from 'react';

interface HeaderProps {
  // Define your props here if needed
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <header className='flex justify-between p-4 items-center'>
      <h1 className='font-extrabold text-4xl text-slate-700 uppercase'>Athysis</h1>
      
    </header>
  );
};

export default Header;
