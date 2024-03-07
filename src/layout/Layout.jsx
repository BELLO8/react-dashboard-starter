import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBarMenu } from '../components/Menu/SideBarMenu'

export const Layout = () => {
    return (
        <div className="flex bg-[#FAFAFA] ">
            <SideBarMenu />
            <main className="p-6 mb-3 w-14 grow min-h-screen">
                <Outlet />
            </main>
        </div>
    )
}
