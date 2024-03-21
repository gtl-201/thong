/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../button";
import fakeImg from "../../assets/header/lau.jpg"
import { limitWords, formatPrices, AddToOrder } from "../../utils";
import loadingGif from '../../assets/loading/main.gif'
import { Link } from "react-router-dom";
interface ItemListVerticalProps {
    loading: boolean;
    data?: {
        id: string;
        name: string;
        prices: string;
        url: string[];
        desc: string;
    }[]
}

const ItemListVertical: React.FC<ItemListVerticalProps> = ({ data, loading }) => {
    return (
        <div className="w-full bg-[#F5F5F5] flex flex-col items-center">
            {(data && data.length != 0)
                ? data.map((item: any, key: number) => {
                    return (
                        <div
                            key={key}
                            className="flex bg-[#FFFFFF] mb-[2px] px-2 py-3 items-center shadow-lg w-[100%] md:w-[90%] lg:w-[80%] md:rounded-lg md:my-2"
                            onClick={() => AddToOrder(item)}
                        >
                            <div className="snap-x snap-mandatory w-28 h-24 rounded-lg overflow-hidden bg-[#5c5b5bbd] flex justify-center items-center">
                                {/* {item.urls && item.urls.length > 0 &&
                                    item.urls.map((itemUrl: string) =>
                                        <div className="snap-always snap-center">
                                            <img src={itemUrl ? itemUrl : fakeImg} alt="" className="w-[7rem] h-[7rem]" />
                                        </div>
                                    )} */}
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
                                <Button
                                    icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="white" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    `}
                                    textSize="30px"
                                    onclick={() => AddToOrder(item)}
                                    bgIcon="#EA5958" />
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