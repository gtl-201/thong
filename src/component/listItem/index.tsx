/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import imgtmp from '../../assets/header/lau.jpg';
import loadingGif from '../../assets/loading/main.gif'
import Button from '../button';
import { AddToOrder, formatCurrency } from '../../utils';
import { Link } from 'react-router-dom';

interface ItemListProps {
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
    }[];
    dataOrder?: {
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
    };
    loading: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ data, loading }) => {

    return (
        <div className='flex justify-center'>
            <div className="flex flex-wrap mt-[2rem] w-[60rem] justify-center">
                {(data && data.length != 0)
                    ? data.map((item: any, key: number) => {
                        return (
                            <div key={key} onClick={() => AddToOrder(item)} className='cursor-pointer flex-wrap shadow-sm bg-[#FDE9DE] my-10 lg:mx-14 mx-10 w-[13rem] rounded-[2rem] relative'>
                                <div className='shadow-lg w-[12.5rem] h-[12.5rem] overflow-hidden rounded-full border-[12px] border-[#E95758] absolute ml-[3.5rem] -mt-[3.5rem]'>
                                    <img src={item.url ? item.url : imgtmp} alt="" className='min-h-[12.5rem] min-w-[12.5rem] shadow-inner' />
                                </div>
                                <div className='mt-3 ml-3'>
                                    <Button text='+'></Button>
                                </div>
                                <div className='mx-4 my-5 mt-[6rem]'>
                                    <div className='font-Fredoka font-bold text-[22px] text-wrap tracking-wide capitalize '>{item.name}</div>
                                    <div className='flex flex-col'>
                                        {item.include && item.include.length != 0
                                            ? item.include.map((item2:any, key:number) => {
                                                return (
                                                    <div key={key} className="flex justify-between">
                                                        {/* <div>{item2.url ? item2.url : 'ko co'}</div> */}
                                                        <div>{item2.name ? item2.name : 'Null'}</div>
                                                        <div>{item2.prices ? item2.prices : 'Null'}</div>
                                                    </div>
                                                )
                                            })
                                            : null
                                        }
                                    </div>
                                    <div className='flex justify-between w-[11rem] mt-2'>
                                        <div className='font-Fredoka font-medium text-[25px] text-wrap tracking-wide capitalize'>
                                            {item.prices ? formatCurrency(parseInt(item.prices)) : 'Null'}
                                        </div>
                                        <div className='flex cursor-pointer' onClick={(e) => e.stopPropagation()}>
                                            <Link
                                                to={{
                                                    pathname: '/detailFood',
                                                    search: `?data=${JSON.stringify(item)}`,
                                                }}
                                            >
                                                <Button
                                                    text='Chi tiết'
                                                    textSize='sm' />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                    : loading && loading === true
                        ? <div className="flex justify-center bg-[#E8DFDD] w-full"><img src={loadingGif} alt="" className="w-[200px]" /></div>
                        : <div className="flex text-center bg-[#FFFFFF] justify-center w-full font-Fredoka text-3xl py-7 text-red-400 uppercase">
                            Hiện tại chưa có món nào!
                        </div>
                }

            </div>
        </div>
    );
}

export default ItemList;