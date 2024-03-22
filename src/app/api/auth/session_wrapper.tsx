"use client"
import { getServerSession, Session } from 'next-auth';
import { SessionProvider, useSession } from 'next-auth/react';
import React from 'react'
import { authOptions } from './[...nextauth]/options';




const SessionWrapper = async ({children}) => {
    const session = await getServerSession(req, res, authOptions)
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  )
}

export default SessionWrapper