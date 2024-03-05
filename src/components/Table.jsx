import React from 'react'

export const Table = () => {
    return (
        <div><div className="overflow-x-auto border border-[#E2E8F0] rounded-lg shadow-sm">
            <table className="table ">
                {/* head */}
                <thead>
                    <tr>
                        <th className='text-xs text-medium'>Nom et prenoms</th>
                        <th>Username</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                </tbody>
            </table>
        </div></div>
    )
}
