/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import Button from '../button';
import { formatPrices, formatDateByTimeStamp } from '../../utils';
import fakeImg from '../../assets/loading/blueCatCoffee.gif'
import { firestore } from '../../firebase';
import { Link } from 'react-router-dom';

interface ManagerOrderProps {
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
}

const ManagerOrder: React.FC<ManagerOrderProps> = () => {
    const [billData, setBillData] = useState<any[]>([])
    const [sortByStatus, setSortByStatus] = useState('unPay')
    // const [sortByTable, setSortByTable] = useState('all')
    useEffect(() => {
        getBillInprocess()
    }, [])
    const getBillInprocess = (sortField?: string) => {
        firestore.get('bill').then(billData_1 => {
            const sort = (unPayBill: any) => {
                unPayBill.sort((a: any, b: any) => {
                    const timeA = a.timeJoin.seconds;
                    const timeB = b.timeJoin.seconds;
                    return timeB - timeA;
                });
                // console.log(JSON.stringify(unPayBill));
                // console.log(unPayBill);
                setBillData(unPayBill)
            }
            if (sortField === 'all') {
                const unPayBill = billData_1;
                sort(unPayBill)
            } else if (sortField === 'pay') {
                const unPayBill = billData_1.filter((bill: any) => bill.status === sortField);
                sort(unPayBill)
            } else {
                const unPayBill = billData_1.filter((bill: any) => bill.status === 'unPay');
                sort(unPayBill)
            }

        }).catch(error => {
            console.error('Error fetching data:', error);
        });
    }


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
    const groupBillsByDay = (bills: any[]) => {
        const groupedBills: { [key: string]: any[] } = {};

        bills.forEach(bill => {
            const date = new Date(bill.timeJoin.seconds * 1000); // Chuyển đổi timestamp thành ngày
            const dayKey = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

            if (!groupedBills[dayKey]) {
                groupedBills[dayKey] = [];
            }

            groupedBills[dayKey].push(bill);
        });

        return groupedBills;
    }

    const updateCountInclude = (operation: '+' | '-', idBill: string, idInclude: string, collection: string) => {
        const newData = billData.map(bill => {
            if (bill.id === idBill) {
                const updatedListDishes = bill.listDishes.map((dish: any) => {
                    if (dish.id === idInclude) {
                        if (operation === '+') {
                            return { ...dish, count: (dish.count || 1) + 1 };
                        } else if (operation === '-' && dish.count && dish.count > 1) {
                            return { ...dish, count: dish.count - 1 };
                        }
                    }
                    return dish;
                });
                return { ...bill, listDishes: updatedListDishes };
            }
            return bill;
        });

        const updatedData = newData.find(item => item.id === idBill);
        firestore.update(collection, idBill, updatedData).then(() => {
            setBillData(newData)
        }).catch(error => {
            console.log(error);
        });
    }
    const removeItem = (idBill: string, idInclude: string, collection: string) => {
        const newData = billData.map(item => {
            if (item.id === idBill) {
                // Lọc ra các phần tử có id khác với idInclude
                const newListDishes = item.listDishes.filter((dish: any) => dish.id !== idInclude);
                return { ...item, listDishes: newListDishes };
            }
            return item;
        });

        const updatedData = newData.find(item => item.id === idBill); // Find the updated document

        firestore.update(collection, idBill, updatedData).then(() => {
            setBillData(newData)
        }).catch(error => {
            console.log(error);
        });
    }
    const updateStatusInclude = (idBill: string, idInclude: string, collection: string) => {
        const newData = billData.map(bill => {
            if (bill.id === idBill) {
                const updatedListDishes = bill.listDishes.map((dish: any) => {
                    if (dish.id === idInclude) {
                        if (dish.status === 'done') {
                            return { ...dish, status: 'doing' };
                        } else {
                            return { ...dish, status: 'done' };
                        }
                    }
                    return dish;
                });
                return { ...bill, listDishes: updatedListDishes };
            }
            return bill;
        });

        const updatedData = newData.find(item => item.id === idBill);
        firestore.update(collection, idBill, updatedData).then(() => {
            setBillData(newData)
        }).catch(error => {
            console.log(error);
        });
    }
    const updateStatusBill = (idBill: string, collection: string, table: string) => {
        const newData = billData.map(bill => {
            if (bill.id === idBill) {
                const dataTableUpdate = { id: table, enable: true }
                firestore.update('table', table, dataTableUpdate)
                return { ...bill, status: 'pay' };
            }
            return bill;
        });

        // Now you can use updatedData to update Firestore
        // Example: firestore.update(collection, idBill, updatedData);

        const updatedData = newData.find(item => item.id === idBill);
        firestore.update(collection, idBill, updatedData).then(() => {
            setBillData(newData)
        }).catch(error => {
            console.log(error);
        });
    }

    const removeBill = (idBill: string, table: string) => {
        firestore.delete('bill', idBill).then(() => {
            setBillData(prevBillData => prevBillData.filter(bill => bill.id !== idBill));
            const dataTableUpdate = { id: table, enable: true }
            firestore.update('table', table, dataTableUpdate)
        }
        ).catch(error => {
            console.error('Error fetching data:', error);
        });
    }

    const addMoreFood = (idBill: string) => {
        localStorage.setItem('idBill', idBill)
    }

    const addMoreBill = () => {
        localStorage.removeItem('idBill')
    }

    return (
        <div className="flex flex-wrap w-[100%] md:w-[95%] lg:w-[60rem] justify-center">
            {/* Các Món Đã Gọi */}
            <div className='w-full flex justify-between mb-2 ml-4'>
                <div className='flex justify-start items-center'>
                    <div className='font-Fredoka font-semibold text-[20px] uppercase mr-2 w-16'>Status</div>
                    <select
                        id="sort"
                        className="px-3 block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                        onChange={(e) => {
                            setSortByStatus(e.target.value)
                            getBillInprocess(e.target.value)
                        }}
                        value={sortByStatus}
                    >
                        <option value={'unPay'} defaultChecked>Inprocess</option>
                        <option value={'pay'}>Payed</option>
                        <option value={'all'}>All</option>
                    </select>
                </div>
                <Link to='/allMenu' className='mb-2'>
                    <Button text='Thêm Hoá Đơn' textSize='16px' onclick={() => addMoreBill()}></Button>
                </Link>
            </div>

            {/* <div className='w-full flex justify-start mb-2'>
                <div className='font-Fredoka font-semibold text-[20px] uppercase mr-2 w-16'>Table</div>
                <select
                    id="sort"
                    className="px-3 block w-36 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    onChange={(e) => setSortByTable(e.target.value)}
                // value={selectedType}
                >
                    <option value={'All'} defaultChecked>All</option>
                </select>
            </div> */}
            {Object.entries(groupBillsByDay(billData)).map(([day, billsInDay], index: number) => (
                <div key={index} className='px-5 w-full mb-6 shadow-xl border-t-2 bg-[#FFFEFA] rounded-lg py-5'>
                    <div className='font-Fredoka font-semibold text-[30px] w-full uppercase flex justify-between items-center'>
                        {`Ngày ${day}`}
                    </div>
                    {/* Hiển thị các bill trong nhóm */}
                    {billsInDay.map((item: any) => (
                        <div className='px-5 w-full py-5 mb-4 border-2 rounded-lg relative'>
                            <div
                                onClick={() => {
                                    removeBill(item.id, item.table)
                                }}
                                className='absolute bg-red-500 px-2 rounded-lg text-white py-1 top-2 right-2 cursor-pointer font-Fredoka font-normal text-[18px] hover:scale-110 duration-200'
                            >Xoá hđ</div>
                            <div className='font-Fredoka font-semibold text-[21px] w-full uppercase text-gray-500 flex justify-start items-center'>
                                <div className='w-4 h-4 bg-yellow-400 rounded-full mr-2'></div>
                                Table {item.table + ' - Join: ' + formatDateByTimeStamp(item.timeJoin.seconds)}
                                {item.timeout ? formatDateByTimeStamp(item.timeout.seconds) : ''}
                                <div className={item.status === 'unPay' ? 'text-yellow-600 pl-2' : 'text-green-600 pl-2'}>{item.status === 'unPay' ? 'inProcess' : 'Done'}</div>
                            </div>
                            {item.listDishes.map((itemBillInprocess: any, key: number) => {
                                return (
                                    <div className='flex w-full justify-between mt-4' key={key}>
                                        <div className='flex'>
                                            <div className='w-24 h-24 max-h-44 overflow-hidden bg-blue-400 rounded-md shadow-md mr-3 flex justify-center items-center'>
                                                <img src={itemBillInprocess.urls && itemBillInprocess.urls.length > 0 ? itemBillInprocess.urls[0] : fakeImg} alt="unloaded" className='w-24' />
                                            </div>
                                            <div
                                                onClick={() => updateStatusInclude(item.id, itemBillInprocess.id, 'bill')}
                                                className='overflow-hidden'>
                                                <div
                                                    className={itemBillInprocess.status && itemBillInprocess.status === 'done' ? 'font-Fredoka font-semibold text-[22px] text-green-600' : 'font-Fredoka font-semibold text-[22px]'}
                                                >
                                                    {itemBillInprocess.name ? itemBillInprocess.name : 'null'}
                                                </div>
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
                                            <div className='flex justify-end items-center'>
                                                {item.status !== 'pay' && <div className='hover:scale-150 transition-transform w-5 h-5 inline-flex rounded-full mr-1 justify-center items-center bg-red-500' onClick={() => updateCountInclude('+', item.id, itemBillInprocess.id, 'bill')}>+</div>}
                                                x{itemBillInprocess.count ? itemBillInprocess.count : 1}
                                                {item.status !== 'pay' && <div className='hover:scale-150 transition-transform w-5 h-5 inline-flex rounded-full ml-1 justify-center items-center bg-red-500' onClick={() => updateCountInclude('-', item.id, itemBillInprocess.id, 'bill')}>-</div>}
                                            </div>
                                            {item.status !== 'pay' && <div
                                                className='cursor-pointer font-Fredoka font-normal text-[18px] text-red-700 hover:scale-110 duration-200'
                                                onClick={() => {
                                                    removeItem(item.id, itemBillInprocess.id, 'bill')
                                                }}
                                            >
                                                Xoá
                                            </div>}
                                        </div>
                                    </div>
                                )
                            }
                            )}
                            <div className='w-full border-t-2 mt-5 pt-3 items-center flex justify-between'>
                                <div>
                                    <div className='font-Fredoka font-normal text-[18px]'>Tổng cộng</div>
                                    <div className='font-Fredoka font-semibold text-[24px] text-blue-600 flex'>
                                        <div>{sumAllPrices(JSON.stringify(item.listDishes))}</div>
                                        <div className='text-red-500 ml-1'>VND</div>
                                    </div>
                                </div>
                                {item.status !== 'pay' && <div className='flex flex-col items-end'>
                                    <Link to='/allMenu' className='mb-2'>
                                        <Button onclick={() => addMoreFood(item.id)} text='Thêm món' textSize='20px' bg='#3CA0F5'></Button>
                                    </Link>
                                    <Button onclick={() => updateStatusBill(item.id, 'bill', item.table)} text='Thanh toán' textSize='20px' bg='#41A146'></Button>
                                </div>}
                            </div>
                            {/* <div className='tborder-t-2 mt-5'></div> */}
                            {/* <div className='text-center font-Fredoka font-bold text-[20px] mt-2 mb-7 bg-transparent'>END</div> */}
                        </div>
                    ))}
                </div>
            ))}
            {billData.length == 0 && <div>Khong co hoa don nao phu hop</div>}


        </div>
    );
}

export default ManagerOrder;
