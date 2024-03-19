/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Button from '../button';
import { formatPrices, notifications, removeAllOrder, removeItemOrder } from '../../utils';
import fakeImg from '../../assets/loading/blueCatCoffee.gif'
import { firestore } from '../../firebase';

interface ListOrderProps {
    data?: {
        id: string;
        name: string;
        include: {
            name: string;
            id: string;
            prices: string;
            urls: string;
        }[];
        urls: string;
        prices: string
    } | {
        id: string;
        name: string;
        prices: string;
        urls: string;
        desc: string;
    }[];
    table: string;
    onCreateOrUpdateBill: (dataTableInProcess: any) => void;
}

const ListOrder: React.FC<ListOrderProps> = ({ table, onCreateOrUpdateBill }) => {

    const [data, setData] = useState(localStorage.getItem('dataOrder'))
    const [billInprocessData, setBillInprocessData] = useState<any>()
    useEffect(() => {
        getBillInprocess()
    }, [])

    const getBillInprocess = () => {
        const idBill = localStorage.getItem('idBill') || '';
        firestore.getByDoc('bill', idBill).then(billInprocessData_1 => {
            // console.log(billInprocessData_1.status); 
            if (billInprocessData_1.status && billInprocessData_1.status === 'unPay') {
                setBillInprocessData(billInprocessData_1)
                onCreateOrUpdateBill(billInprocessData_1.table)
                return billInprocessData_1
            }
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }
    const mergeDataAndUpdateBill = (data1: any[], data2: any): any => {
        // Duyệt qua từng phần tử trong data1
        data1.forEach(item1 => {
            // Kiểm tra xem có phần tử nào trong listDishes của data2 có cùng 'id' và 'name' với item1 không
            const existingItemIndex = data2.listDishes.findIndex((item2: any) => item2.id === item1.id && item2.name === item1.name);
            if (existingItemIndex !== -1) {
                // Nếu tìm thấy phần tử có 'id' và 'name' giống nhau, cộng count của item1 vào count của phần tử tương ứng trong data2
                data2.listDishes[existingItemIndex].count += item1.count;
            } else {
                // Nếu không tìm thấy, thêm item1 vào cuối listDishes của data2
                data2.listDishes.push(item1);
            }
        });
        const idBill = localStorage.getItem('idBill') || '';
        firestore.update('bill', idBill, data2).then(() => {
            removeAllItem()
            getBillInprocess()
        }).catch(error => {
            console.log(error);
        })
        return data2;
        console.log(data2);

    };

    const sumAllPrices = (dataSum: any): string => {
        // Lấy dữ liệu từ localStorage
        let totalPrice = 0;
        if (dataSum) {
            // Chuyển đổi dữ liệu từ chuỗi JSON thành một mảng
            const dataSumArray: any[] = JSON.parse(dataSum);

            // Duyệt qua mảng để tính tổng giá của các mặt hàng
            dataSumArray.forEach(item => {
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

    const createBill = (dataBill: {
        id: string;
        name: string;
        include?: {
            name: string;
            id: string;
            prices: string;
            urls: string;
        }[];
        desc?: string;
        urls: string;
        prices: string;
    }[]
    ) => {
        // const timestamp_now = serverTimestamp();
        const intervalId = new Date();
        const newDataBill = {
            listDishes: dataBill,
            status: 'unPay',
            table: table,
            timeJoin: intervalId,
            timeOut: null
        };

        // console.log(newDataBill);

        firestore.add('bill', newDataBill).then(billData_1 => {
            localStorage.removeItem('dataOrder')
            setData(null)
            getBillInprocess()
            console.log('added bill', billData_1);
            const dataTable = { id: table, enable: false }
            console.log(dataTable);
            firestore.update('table', table, dataTable)
            onCreateOrUpdateBill(table);
        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }


    return (
        <div className="flex flex-wrap py-5 rounded-lg mb-24 w-[100%] md:w-[95%] lg:w-[60rem] justify-center bg-[#FFFEFA]">
            <div className="flex justify-between w-full mb-8 px-5">
                <div className='font-Fredoka font-semibold text-[21px]'>Các món đã chọn</div>
                <div
                    className='cursor-pointer font-Fredoka font-normal text-[18px] text-red-700 hover:scale-110 duration-200'
                    onClick={() => removeAllItem()}
                >
                    Xoá toàn bộ
                </div>
            </div>

            {/* Các Mon đã Chọn */}
            {data ? JSON.parse(data).map((item: any, key: number) => {
                return (
                    <div key={key} className='flex justify-between w-full my-2 px-5'>
                        <div className='flex'>
                            <div className='w-24 h-24 bg-blue-400 rounded-md shadow-md mr-3 flex justify-center items-center max-h-44 overflow-hidden'>
                                <img src={item.urls && item.urls.length > 0 ? item.urls[0] : fakeImg} alt="unloaded" className='w-24' />
                            </div>
                            <div className='overflow-hidden'>
                                <div className='font-Fredoka font-semibold text-[22px]'>{item.name ? item.name : 'null'}</div>
                                <div className='w-full font-Fredoka font-normal text-[15px] text-[#A9A9A9] text-wrap hover:text-black'>
                                    {item.desc && item.desc}
                                    {item.include && item.include.map((itemInclude: any, key: number) => {
                                        return (
                                            <div key={key} className="flex items-center">
                                                <img className="w-5 rounded-md mr-1"
                                                    src={itemInclude.urls && itemInclude.urls.length > 0 ? itemInclude.urls[0] : fakeImg} alt="" />
                                                {itemInclude.name ? itemInclude.name + '-' : 'null-'}
                                                {itemInclude.prices ? formatPrices(itemInclude.prices) + 'VND' : 'null'}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className='flex justify-left items-center'>
                                    <div
                                        onClick={() => updateCount(item.id, item.name, item.count ? item.count + 1 : 1)}
                                        className='cursor-pointer rounded-full bg-green-500 text-white w-5 h-5 flex justify-center items-center mr-1 hover:scale-110 duration-200'>+</div>
                                    {item.count ? item.count : 1}
                                    <div
                                        onClick={() => updateCount(item.id, item.name, item.count && item.count != 1 ? item.count - 1 : 1)}
                                        className='cursor-pointer rounded-full bg-[#EA5958] text-white w-5 h-5 flex justify-center items-center ml-1 hover:scale-110 duration-200'>-</div>
                                </div>
                            </div>

                        </div>


                        <div className='text-right'>
                            <div className='font-Fredoka font-normal text-[21px]'>{item.prices ? formatPrices(item.prices) + '₫' : 'null'}</div>
                            <div
                                className='cursor-pointer font-Fredoka font-normal text-[18px] text-red-700 hover:scale-110 duration-200'
                                onClick={() => removeItem(item.id, item.name, 'dataOrder')}
                            >
                                Xoá
                            </div>
                        </div>
                    </div>
                )
            })
                : <div>Bạn chưa chọn món nào</div>}

            {/* Tổng tiền & Nút Gọi Món */}
            <div className='mx-5 flex justify-between w-full border-t-2 mt-5 pt-3 items-center'>
                <div>
                    <div className='font-Fredoka font-normal text-[18px]'>Tổng cộng</div>
                    <div className='font-Fredoka font-semibold text-[24px] text-blue-600 flex'>
                        <div>{sumAllPrices(data)}</div>
                        <div className='text-red-500 ml-1'>VND</div>
                        {/* {formatPrices(sumAllPrices().toString())} VND */}
                    </div>
                </div>
                <div className=''>
                    <Button
                        text={billInprocessData && billInprocessData !== null ? 'Gọi Thêm' : "Gọi Luôn"}
                        icPosition='right'
                        // bgIcon='#EA5958'
                        icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" class="w-6 h-6">
                            <path strokeLinecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                            </svg>
                        `}
                        onclick={() => {
                            if (data) {
                                if (billInprocessData && billInprocessData !== null) {
                                    mergeDataAndUpdateBill(data ? JSON.parse(data) : [], billInprocessData)
                                } else {
                                    if (table) {
                                        createBill(JSON.parse(data));
                                    } else {
                                        notifications('danger', "Chua chon ban")
                                    }
                                }
                            } else {
                                notifications('danger', "Chua co mon");
                            }
                        }
                        }
                    />
                </div>
            </div>


            {/* Các Món Đã Gọi */}
            {billInprocessData && billInprocessData !== null &&
                <div className='px-5 w-full mt-10 pt-5 border-t-2 border-orange-400'>
                    <div className='font-Fredoka font-semibold text-[21px] w-full text-center uppercase text-red-500'>Các món đã gọi</div>
                    {billInprocessData.listDishes.map((itemBillInprocess: any, key: number) => {
                        return (
                            <div className='flex w-full justify-between mt-4' key={key}>
                                <div className='flex'>
                                    <div className='w-24 h-24 max-h-44 overflow-hidden bg-blue-400 rounded-md shadow-md mr-3 flex justify-center items-center'>
                                        <img src={itemBillInprocess.urls && itemBillInprocess.urls.length > 0 ? itemBillInprocess.urls[0] : fakeImg} alt="unloaded" className='w-24' />
                                    </div>
                                    <div className='overflow-hidden'>
                                        <div className='font-Fredoka font-semibold text-[22px]'>{itemBillInprocess.name ? itemBillInprocess.name : 'null'}</div>
                                        <div className='w-full font-Fredoka font-normal text-[15px] text-[#A9A9A9] text-wrap hover:text-black'>
                                            {itemBillInprocess.desc && itemBillInprocess.desc}
                                            {itemBillInprocess.include && itemBillInprocess.include.map((itemInclude: any, key: number) => {
                                                return (
                                                    <div key={key} className="flex items-center">
                                                        <img className="w-5 rounded-md mr-1" src={itemInclude.urls && itemInclude.urls.length > 0 ? itemInclude.urls[0] : fakeImg} alt="" />
                                                        {itemInclude.name ? itemInclude.name + '-' : 'null-'}
                                                        {itemInclude.prices ? formatPrices(itemInclude.prices) + 'VND' : 'null'}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div className='text-right pt-2'>
                                    <div className='font-Fredoka font-normal text-[21px]'>{itemBillInprocess.prices ? formatPrices(itemBillInprocess.prices) + '₫' : 'null'}</div>
                                    x{itemBillInprocess.count ? itemBillInprocess.count : 1}
                                </div>
                            </div>
                        )
                    }
                    )}
                    {/* Tổng tiền hoá đơn */}
                    <div className='w-full border-t-2 mt-5 pt-3 items-center'>
                        <div className='font-Fredoka font-normal text-[18px]'>Tổng cộng</div>
                        <div className='font-Fredoka font-semibold text-[24px] text-blue-600 flex'>
                            <div>{sumAllPrices(JSON.stringify(billInprocessData.listDishes))}</div>
                            <div className='text-red-500 ml-1'>VND</div>
                        </div>
                    </div>
                </div>
            }


        </div>
    );
}

export default ListOrder;
