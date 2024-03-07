import React from 'react'
import { Outlet } from 'react-router-dom'
import { SideBarMenu } from '../components/Menu/SideBarMenu'

export const Layout = () => {
    return (
        <div className="flex bg-[#FAFAFA] ">
            <SideBarMenu />
            <main className="w-14 grow min-h-screen">
                <Outlet />
            </main>
        </div>
    )
}
