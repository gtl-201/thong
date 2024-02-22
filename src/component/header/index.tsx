import React from 'react';
import Button from "../../component/button";
import Avt from '../../assets/logo/demo.png';
import Hotpot from '../../assets/header/lau.jpg';

interface HeaderProps {
}

const Header: React.FC<HeaderProps> = () => {

    return (

        <div className="w-full bg-[#FDF0E9] md:flex pt-5 pb-20 justify-center rounded-b-3xl">
            <div className="sm:w-full md:w-[60rem] px-5">
                <div className="flex justify-between w-full content-center ">
                    <div className="content-center flex">
                        <div className="text-blue-500 tracking-wider text-3xl font-semibold font-Fredoka">Th</div>
                        <div className="text-red-500 tracking-wider text-3xl font-semibold font-Fredoka">ong</div>
                    </div>

                    <div className="hidden md:ml-6 md:block">
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-black text-[#7A787A] px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                            <a href="#" className="hover:text-black text-[#7A787A] px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                            <a href="#" className="hover:text-black text-[#7A787A] px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                            <a href="#" className="hover:text-black text-[#7A787A] px-3 py-2 text-sm font-medium" aria-current="page">Dashboard</a>
                        </div>
                    </div>

                    <div className="block md:hidden">
                        <Button
                            icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                                </svg>
                                `}
                            onclick={() => {
                                console.log('menuBar Clicked');
                            }} />
                    </div>
                </div>

                <div className="columns-2 flex content-center justify-between mt-4">
                    <div className="w-[100%] md:w-[60%] lg:w-[50%] mt-3  self-center">
                        <div className="text-4xl font-bold text-[#EB5659] whitespace-normal">
                            Rất nhiều <br />
                            Món ngon đang đợi
                        </div>

                        <div className="flex items-center my-3">
                            <img src={Avt} alt="" className="w-[35px] h-[35px] md:w-[29px] md:h-[29px] rounded-full drop-shadow-md mr-1" />
                            <div>Chúc quý khách có một bữa ăn ngon miệng</div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
                            </svg>
                            `}
                                text='Hotline' />

                            <Button
                                icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                              </svg>
                              
                            `}
                                bg='#3C71FF'
                                text='Facebook' />
                        </div>

                    </div>

                    <div className="hidden md:w-[40%] lg:w-[50%] sm:flex justify-end">
                        <img src={Hotpot} alt="" className="max-h-[3rem] sm:max-h-[20rem] w-auto overflow-hidden rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
