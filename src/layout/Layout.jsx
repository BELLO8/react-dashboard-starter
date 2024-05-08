import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { SideBarMenu } from '../components/Menu/SideBarMenu'

export const Layout = () => {
    const navigate = useNavigate()
    // useEffect(() => {
    //     if (!isLoggedIn()) {
    //         navigate('/login')
    //     }
    // }, [navigate])
    return (
        <div className="flex bg-[#FAFAFA] w-full min-h-screen ">
            <SideBarMenu />
            <main className="w-14 grow min-h-screen">
                <Outlet />
            </main>
        </div>
    )
}
