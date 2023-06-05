import React from 'react'
import {
    RiHome6Line,
    RiPercentLine,
    RiPieChartLine,
    RiMailLine,
    RiLogoutCircleRLine
} from "react-icons/ri"

const Sidevar = (props) => {
    const {showMenu}=props;
    return (
        <div className={`bg-[#1F1D2A] z-50 fixed lg:left-0 top-0 w-28 h-full flex flex-col justify-between py-1 rounded-tr-lg rounded-br-lg
        transition-all ${showMenu?"lef-0":"-left-full"}`}>
            <div>
            <h1 className='text-2xl text-gray-300 uppercase font-bold text-center my-5'>Logo</h1>
            <ul className='pl-4'>
                <li className='bg-[#282836] p-4 rounded-tl-xl rounded-bl-xl'>
                    <a href="#" className='bg-[#DD826F] p-4 flex rounded-lg justify-center  text-white'>
                        <RiHome6Line className='text-2xl  '/>
                    </a>
                </li>
                <li className='hover:bg-[#282836] p-4 rounded-tl-xl rounded-bl-xl group transition-colors'>
                    <a href="#" className='group-hover:bg-[#DD826F] p-4 flex rounded-lg justify-center text-[#DD826F] group-hover:text-white transition-colors' >
                        <RiPercentLine className='text-2xl  '/>
                    </a>
                </li>
                <li className='hover:bg-[#282836] p-4 rounded-tl-xl rounded-bl-xl group transition-colors'>
                    <a href="#" className='group-hover:bg-[#DD826F] p-4 flex rounded-lg justify-center text-[#DD826F] group-hover:text-white transition-colors' >
                        <RiPieChartLine className='text-2xl  '/>
                    </a>
                </li>
                <li className='hover:bg-[#282836] p-4 rounded-tl-xl rounded-bl-xl group transition-colors'>
                    <a href="#" className='group-hover:bg-[#DD826F] p-4 flex rounded-lg justify-center text-[#DD826F] group-hover:text-white transition-colors' >
                        <RiMailLine className='text-2xl  '/>
                    </a>
                </li>
            </ul>
            </div>
            <div>
                <ul className='pl-4'>
                <li className='hover:bg-[#282836] p-4 rounded-tl-xl rounded-bl-xl group transition-colors'>
                    <a href="#" className='group-hover:bg-[#DD826F] p-4 flex rounded-lg justify-center text-[#DD826F] group-hover:text-white transition-colors' >
                        <RiLogoutCircleRLine className='text-2xl  '/>
                    </a>
                </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidevar