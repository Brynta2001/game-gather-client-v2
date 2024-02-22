"use client";

import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react'

export const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user){
    return (
      <div className='flex gap-3 md:gap-5'>
        <p>{session.user.fullName}</p>
        <Link href={'/dashboard'} className='black_btn'>Games</Link>
        <button className='outline_btn' onClick={ () => signOut() }>Sign Out</button>
      </div>
    )
  }else{
    return (
      <div className='flex gap-3 md:gap-5'>
        <button className='black_btn' onClick={ ()=>signIn('', {callbackUrl: '/dashboard'}) }>Sign In</button>
        <Link href={'/signup'} className='black_btn'>Sign Up</Link>
      </div>
    )
  }    
 
}