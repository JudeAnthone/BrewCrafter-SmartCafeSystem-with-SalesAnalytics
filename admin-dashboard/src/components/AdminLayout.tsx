import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function AdminLayout(){
  return(
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 bg-white min-h-screen">
        <Outlet />
      </main>
    </div>
  )
}