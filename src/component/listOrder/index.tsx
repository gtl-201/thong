import React from 'react';
import imgtmp from '../../assets/header/lau.jpg';
import loadingGif from '../../assets/loading/main.gif'
import Button from '../button';
import { formatCurrency } from '../../utils';
import { Link } from 'react-router-dom';

interface ListOrderProps {
    id?: string
}

const ListOrder: React.FC<ListOrderProps> = ({ id }) => {
    //   const [clicked, setClicked] = useState(false);

    // const handleClick = () => {
    //     console.log('Add to card ListOrder');
    // };

    return (
        <div className="flex flex-wrap p-5 rounded-lg mb-24 w-[100%] md:w-[95%] lg:w-[60rem] justify-center bg-[#FFFEFA]">
            <div className="flex justify-between w-full mb-8">
                <div className='font-Fredoka font-semibold text-[21px]'>Các món đã chọn</div>
                <div
                    className='font-Fredoka font-normal text-[18px] text-red-700 hover:scale-110 duration-200'
                    onClick={() => console.log('Xoa toan bo Clicked')}
                >
                    Xoá toàn bộ
                </div>
            </div>
            <div className='flex justify-between w-full'>
                <div className='flex'>
                    <div className='w-24 h-24 bg-red-800 rounded-md shadow-md mr-3'>
                        <img src="" alt="unloaded" />
                    </div>
                    <div>
                        <div className='font-Fredoka font-semibold text-[22px]'>name</div>
                        <div className='w-full font-Fredoka font-normal text-[15px] text-[#A9A9A9] text-wrap hover:text-black'>desc</div>
                    </div>
                </div>

                <div className='flex justify-center items-center'>
                    <div className='rounded-full bg-green-500 text-white w-5 h-5 flex justify-center items-center mr-1 hover:scale-110 duration-200'>+</div>
                    {1}
                    <div className='rounded-full bg-[#EA5958] text-white w-5 h-5 flex justify-center items-center ml-1 hover:scale-110 duration-200'>-</div>
                </div>
                <div>
                    <div className='font-Fredoka font-normal text-[21px]'>prices</div>
                    <div
                        className='font-Fredoka font-normal text-[18px] text-red-700 hover:scale-110 duration-200'
                        onClick={() => console.log('Xoa 1item Clicked')}
                    >
                        Xoá
                    </div>
                </div>
            </div>

            <div className='flex justify-between w-full border-t-2 mt-5 pt-3 items-center'>
                <div>
                    <div className='font-Fredoka font-normal text-[18px]'>Tổng cộng</div>
                    <div className='font-Fredoka font-semibold text-[24px] text-blue-600'>Prices</div>
                </div>
                <Button text="Gọi Luôn"
                    icPosition='right'
                    // bgIcon='#EA5958'
                    icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        `}
                />
            </div>
        </div>
    );
}

export default ListOrder;