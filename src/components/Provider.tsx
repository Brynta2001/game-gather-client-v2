"use client";

import { SessionProvider } from 'next-auth/react';
import React, { ReactNode } from 'react'

interface Props {
    children: ReactNode;
}
// Provider component wraps the entire application with the SessionProvider from next-auth.
function Provider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
  
}

export default Provider