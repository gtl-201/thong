/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../component/header";

import ManagerOrder from "../../component/managerOrder";


export default function AllOrder() {
    return (
        <div className='flex flex-col items-center w-full bg-[#F5F5F5]'>
            <Header headerOnly={false}></Header>
            <div className="font-Fredoka font-semibold text-[30px] text-center my-2">
                Chuc <span className="text-[#E44F4F]">quy khach</span> ngon mieng
            </div>
            
            <ManagerOrder />
        </div>
    )
}