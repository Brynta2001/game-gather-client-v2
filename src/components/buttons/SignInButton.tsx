"use client";

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

export const SignInButton = () => {
    const { data: session } = useSession();
    console.log(session);

    if (session && session.user)
  return (
    <div>
        <p>{session.user.fullName}</p>
        <Link href={'/api/auth/signout'} className='outline_btn'>Sign Out</Link>
    </div>
  )
  return (
    <div>
        <Link href={'/api/auth/signin'} className='black_btn'>Sign In</Link>
        {/* <button onClick={()=>signIn()}>Sign In</button> */}
        <Link href={'/signup'} className='black_btn'>Sign Up</Link>
    </div>
  )
}