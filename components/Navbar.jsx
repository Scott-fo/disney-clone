import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


const Navbar = ({ account }) => {
  return (
    <div className='nav-bar'>
      <div className='logo-wrapper'>
        <Link href="/">
          <Image src={"/disney.png"} alt="Disney Logo" width={90} height={50} />
        </Link>
      </div>
      <div className='account-info'>
        <p>Welcome {account.username}</p>
        <img className="avatar" src={account.avatar.url} />
      </div>
    </div>
  )
}

export default Navbar