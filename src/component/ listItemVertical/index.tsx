/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../button";
import fakeImg from "../../assets/header/lau.jpg"
import { limitWords, formatPrices, AddToOrder } from "../../utils";
import loadingGif from '../../assets/loading/main.gif'
import { Link } from "react-router-dom";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";
interface ItemListVerticalProps {
    loading: boolean;
    data?: {
        id: string;
        name: string;
        prices: string;
        url: string[];
        desc: string;
        collection?: string
    }[];
    ud?: boolean;
}

const ItemListVertical: React.FC<ItemListVerticalProps> = ({ data, loading, ud }) => {
    const [dataOnDeleted, setDataOnDeleted] = useState<any[]>([]);
    useEffect(() => {
        setDataOnDeleted(data || []);
    }, [data]);

    const deleteFood = (collection: string, id: string) => {
        const confirmDelete = window.confirm("Bạn có chắc muốn xoá món này không?");

        confirmDelete && firestore.delete(collection, id).then(() => {
            const newData = dataOnDeleted.filter((item: any) => item.id !== id);
            setDataOnDeleted(newData);
        }).catch((err) => console.log(err));

        // console.log(dataOnDeleted);
    }
    return (
        <div className="w-full bg-[#F5F5F5] flex flex-col items-center">
            {(dataOnDeleted && dataOnDeleted.length != 0)
                ? dataOnDeleted.map((item: any, key: number) => {
                    return (
                        <div
                            key={key}
                            className="flex bg-[#FFFFFF] mb-[2px] px-2 py-3 items-center shadow-lg w-[100%] md:w-[90%] lg:w-[80%] md:rounded-lg md:my-2"
                            onClick={() => ud !== true && AddToOrder(item)}
                        >
                            <div className="snap-x snap-mandatory w-28 h-24 rounded-lg overflow-hidden bg-[#5c5b5bbd] flex justify-center items-center">
                                <img src={item.urls[0] ? item.urls[0] : fakeImg} alt="" className="w-28" />
                            </div>
                            <div className="pl-3 w-full flex justify-between items-center">
                                <div className="font-Fredoka w-full">
                                    <div className="font-Fredoka font-semibold text-[22px]">{item.name ? item.name : ''}</div>
                                    {item.desc
                                        ? <div
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                localStorage.setItem('detailFood', JSON.stringify(item))
                                            }}
                                            className="w-fit"
                                        >
                                            <Link
                                                to={{
                                                    pathname: '/detailFood',
                                                }}
                                            >
                                                <div className="w-full font-Fredoka font-normal text-[15px] text-[#A9A9A9] text-wrap hover:text-black">{limitWords(item.desc ? item.desc + ' (Chi tiet...)' : `Loi tai xuong`, 18)}</div>
                                                <div>{item.prices ? formatPrices(item.prices) : '??'} vnd</div>
                                            </Link>
                                        </div>
                                        : item.include
                                        && item.include.map((item: any, key: number) => {
                                            return (
                                                <div key={key} className="flex">
                                                    {/* <img className="w-12 rounded-md" src={item.urls ? item.urls[0] : loadingGif} alt="" /> */}
                                                    <div className="flex">
                                                        <div className="py-0 my-0 w-[5.5rem]">{item.name ? (key + 1) + '. ' + item.name : 'null'}</div>
                                                        <div className="py-0 my-0">{item.prices ? '(' + formatPrices(item.prices) + '₫)' : 'null'}</div>
                                                    </div>
                                                </div>
                                            )
                                        })}

                                    {item.include
                                        && <div
                                            className="text-red-500 hover:scale-110 transition-transform w-fit"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                localStorage.setItem('detailFood', JSON.stringify(item))
                                            }}
                                        >
                                            <Link
                                                to={{
                                                    pathname: '/detailFood',
                                                }}
                                            >
                                                Chi tiết...
                                            </Link>
                                        </div>}
                                </div>
                                {ud
                                    ? <div className="gap-1 flex flex-col">
                                        <Button
                                            icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                          </svg>`}
                                            textSize="30px"
                                            onclick={() => { }}
                                            bgIcon="#34A0F5"
                                            bg="#34A0F5" />

                                        <Button
                                            icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                          </svg>`}
                                            textSize="30px"
                                            onclick={() => deleteFood(item.collection, item.id)}
                                            bgIcon="#EA5958" />
                                    </div>
                                    : <Button
                                        icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                            `}
                                        textSize="30px"
                                        onclick={() => AddToOrder(item)}
                                        bgIcon="#EA5958" />}
                            </div>
                        </div>
                    )
                })
                : loading && loading === true
                    ? <div className="flex justify-center bg-[#E8DFDD] w-full"><img src={loadingGif} alt="" className="w-[200px]" /></div>
                    : <div className="flex justify-center text-center w-full font-Fredoka text-3xl py-7 text-red-400 uppercase">
                        Hiện tại chưa có món nào!
                    </div>
            }
        </div>
    )

}
export default ItemListVertical;