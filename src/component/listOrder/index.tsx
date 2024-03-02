/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Button from '../button';
import { formatPrices, removeAllOrder, removeItemOrder } from '../../utils';
import fakeImg from '../../assets/loading/blueCatCoffee.gif'

interface ListOrderProps {
    data?: {
        id: string;
        name: string;
        include: {
            name: string;
            id: string;
            prices: string;
            url: string;
        }[];
        url: string;
        prices: string
    } | {
        id: string;
        name: string;
        prices: string;
        url: string;
        desc: string;
    }[];
}

const ListOrder: React.FC<ListOrderProps> = () => {

    const [data, setData] = useState(localStorage.getItem('dataOrder'))
    const sumAllPrices = (): string => {
        // Lấy dữ liệu từ localStorage
        let totalPrice = 0;
        if (data) {
            // Chuyển đổi dữ liệu từ chuỗi JSON thành một mảng
            const dataArray: any[] = JSON.parse(data);

            // Duyệt qua mảng để tính tổng giá của các mặt hàng
            dataArray.forEach(item => {
                // Kiểm tra xem mặt hàng có count lớn hơn 1 không
                if (item.count && item.count > 1 && item.prices) {
                    // Nếu có, tính tổng giá bằng giá của mặt hàng nhân với count
                    totalPrice += parseInt(item.prices) * item.count;
                } else if (item.prices) {
                    // Nếu không, tính tổng giá bằng giá của mặt hàng
                    totalPrice += parseInt(item.prices);
                }
            });
        }

        return formatPrices(totalPrice.toString())
    }

    const removeAllItem = () => {
        removeAllOrder('dataOrder');
        setData(null);
    }
    const removeItem = (id: string, name: string, storageKey: string) => {
        removeItemOrder(id, name, storageKey)
        setData(localStorage.getItem('dataOrder'))
    }
    const updateCount = (id: string, name: string, count: number) => {
        const dataParsed = data ? JSON.parse(data) : [];

        dataParsed.forEach((item: any, index: number) => {
            if (item.id === id && item.name === name) {
                // Nếu tìm thấy item với id và name tương ứng, cập nhật trường count
                const newData = { ...item, count };
                dataParsed[index] = newData;
            }
        });
        setData(JSON.stringify(dataParsed));
        localStorage.setItem('dataOrder', JSON.stringify(dataParsed));
    };


    return (
        <div className="flex flex-wrap p-5 rounded-lg mb-24 w-[100%] md:w-[95%] lg:w-[60rem] justify-center bg-[#FFFEFA]">
            <div className="flex justify-between w-full mb-8">
                <div className='font-Fredoka font-semibold text-[21px]'>Các món đã chọn</div>
                <div
                    className='font-Fredoka font-normal text-[18px] text-red-700 hover:scale-110 duration-200'
                    onClick={() => removeAllItem()}
                >
                    Xoá toàn bộ
                </div>
            </div>

            {data && JSON.parse(data).map((item: any) => {
                return (
                    <div key={item.key} className='flex justify-between w-full my-2'>
                        <div className='flex'>
                            <div className='w-24 h-24 bg-blue-400 rounded-md shadow-md mr-3 flex justify-center items-center'>
                                <img src={item.url ? item.url : fakeImg} alt="unloaded" className='w-full' />
                            </div>
                            <div className='overflow-hidden'>
                                <div className='font-Fredoka font-semibold text-[22px]'>{item.name ? item.name : 'null'}</div>
                                <div className='w-full font-Fredoka font-normal text-[15px] text-[#A9A9A9] text-wrap hover:text-black'>
                                    {item.desc && item.desc}
                                    {item.include && item.include.map((itemInclude: any) => {
                                        return (
                                            <div key={itemInclude.id} className="flex items-center">
                                                <img className="w-5 rounded-md mr-1" src={itemInclude.url ? itemInclude.url : fakeImg} alt="" />
                                                {itemInclude.name ? itemInclude.name + '-' : 'null-'}
                                                {itemInclude.prices ? formatPrices(itemInclude.prices) + 'VND' : 'null'}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className='flex justify-left items-center'>
                                    <div
                                        onClick={() => updateCount(item.id, item.name, item.count ? item.count + 1 : 1)}
                                        className='rounded-full bg-green-500 text-white w-5 h-5 flex justify-center items-center mr-1 hover:scale-110 duration-200'>+</div>
                                    {item.count ? item.count : 1}
                                    <div
                                        onClick={() => updateCount(item.id, item.name, item.count && item.count != 1 ? item.count - 1 : 1)}
                                        className='rounded-full bg-[#EA5958] text-white w-5 h-5 flex justify-center items-center ml-1 hover:scale-110 duration-200'>-</div>
                                </div>
                            </div>

                        </div>


                        <div className='text-right'>
                            <div className='font-Fredoka font-normal text-[21px]'>{item.prices ? formatPrices(item.prices) + '₫' : 'null'}</div>
                            <div
                                className='font-Fredoka font-normal text-[18px] text-red-700 hover:scale-110 duration-200'
                                onClick={() => removeItem(item.id, item.name, 'dataOrder')}
                            >
                                Xoá
                            </div>
                        </div>
                    </div>
                )
            })}


            <div className='flex justify-between w-full border-t-2 mt-5 pt-3 items-center'>
                <div>
                    <div className='font-Fredoka font-normal text-[18px]'>Tổng cộng</div>
                    <div className='font-Fredoka font-semibold text-[24px] text-blue-600 flex'>
                        <div>{sumAllPrices()}</div>
                        <div className='text-red-500 ml-1'>VND</div>
                        {/* {formatPrices(sumAllPrices().toString())} VND */}
                    </div>
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