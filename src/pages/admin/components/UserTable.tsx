import "./main.css"
import { defaultProfilePicture as profilePicture } from '../../../utils/core'
import { titleCase } from '../../../utils/functions'
import { useEffect, useState } from 'react'
import { primaryColor } from "../../../utils/data"
import Loading from "./Loading"
import { useNavigate } from "react-router-dom"

const UsersTable = ({ users, isoLoading }: any) => {

    const navigate = useNavigate()
    const tableHeadData = ["", "Name", "Roll no", "Phone", "Email", "Gender", "Education", "Role", "Status"]
    const [_window, set_Window] = useState<any>(null)

    useEffect(() => {
        set_Window(window)
    }, [])

    const copyToClipboard = (e: any) => {
        e?.stopPropagation()
        const originalText = e?.target?.textContent;
        if (!originalText) return;

        _window.navigator.clipboard.writeText(originalText).then(() => {
            const tooltip = document.createElement('span');
            tooltip.textContent = 'Copied';
            tooltip.className = 'tooltip';
            document.body.appendChild(tooltip);
            const rect = e.target.getBoundingClientRect();
            tooltip.style.top = `${rect.top + window.scrollY + 8}px`;
            tooltip.style.left = `${rect.left + window.scrollX + 8}px`;

            setTimeout(() => {
                document.body.removeChild(tooltip);
            }, 1000);
        })

    };

    return (
        <>
            <div className='w-full h-fit overflow-auto users-data-display-table'>
                <table border={1} className='border border-[#ccc] cursor-pointer'>
                    <tr className='border-b border-[#ccc] sticky top-0'>
                        {tableHeadData?.map((data: string) => <th key={data}
                            className="border-r border-[#ccc] p-2 text-white font-normal"
                            style={{ background: primaryColor }}
                        >{data}</th>)}
                    </tr>
                    <>
                        {
                            !isoLoading ? users?.map((user: any, i: number) => (
                                <tr className='border-b border-[#ccc]' key={i}
                                    onClick={() => navigate(`/admin`)}
                                >
                                    <td className='border-r border-[#ccc] p-2 bg-[#f8f8f8]'>
                                        <div className='w-[30px] h-[30px]'>
                                            <img src={user?.profilePhoto || profilePicture} alt="user image"
                                                onError={(e: any) => e.target.src = profilePicture}
                                                className='w-[30px] h-[30px] object-cover object-center bg-[#efefef]'
                                            />
                                        </div>
                                    </td>
                                    <td className='border-r border-[#ccc] p-2 bg-[#f8f8f8] text-[#444] font-normal cursor-pointer' onClick={(e: any) => copyToClipboard(e)} >{`${user?.firstName ? user?.firstName : "N/A"} ${user?.lastName ? user?.lastName : "N/A"}`}</td>
                                    <td className='border-r border-[#ccc] p-2 bg-[#f8f8f8] text-[#444] font-normal cursor-pointer' onClick={(e: any) => copyToClipboard(e)}>{user?.rollNo ? user?.rollNo : 'N/A'}</td>
                                    <td className='border-r border-[#ccc] p-2 bg-[#f8f8f8] text-[#444] font-normal cursor-pointer' onClick={(e: any) => copyToClipboard(e)}>{user?.phoneNumber ? user?.phoneNumber : user?.phoneNumberHome ? user?.phoneNumberHome : "N/A"}</td>
                                    <td className='border-r border-[#ccc] p-2 bg-[#f8f8f8] text-[#444] font-normal cursor-pointer lowercase' onClick={(e: any) => copyToClipboard(e)}>{user?.email ? user?.email?.toLowerCase() : "N/A"}</td>
                                    <td className='border-r border-[#ccc] p-2 bg-[#f8f8f8] text-[#444] font-normal cursor-pointer' onClick={(e: any) => copyToClipboard(e)}>{user?.gender ? titleCase(user?.gender) : "N/A"}</td>
                                    <td className='border-r border-[#ccc] p-2 bg-[#f8f8f8] text-[#444] font-normal cursor-pointer' onClick={(e: any) => copyToClipboard(e)}>{user?.education ? titleCase(user?.education) : "N/A"}</td>
                                    <td className='border-r border-[#ccc] p-2 bg-[#f8f8f8] text-[#444] font-normal'>{user?.isAdmin ? "Admin" : "Student"}</td>
                                    <td className='border-r border-[#ccc] p-2 bg-[#f8f8f8] text-[#444] font-normal'>{user?.isSuspended ? "Suspended" : user?.isDisabled ? "Disabled" : "Active"}</td>
                                </tr>
                            )) : <Loading />
                        }
                    </>
                </table>
            </div>
        </>
    )
}

export default UsersTable