/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../button";
import fakeImg from "../../assets/header/lau.jpg"
import { limitWords, formatPrices, AddToOrder } from "../../utils";
import loadingGif from '../../assets/loading/main.gif'
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
                        <div className="flex bg-[#FFFFFF] mb-[2px] px-2 py-3 items-center shadow-lg w-[100%] md:w-[90%] lg:w-[80%] md:rounded-lg md:my-2" key={key}>
                            <div className="snap-x snap-mandatory w-[7rem] h-[7rem] rounded-lg overflow-hidden">
                                {/* {item.urls && item.urls.length > 0 &&
                                    item.urls.map((itemUrl: string) =>
                                        <div className="snap-always snap-center">
                                            <img src={itemUrl ? itemUrl : fakeImg} alt="" className="w-[7rem] h-[7rem]" />
                                        </div>
                                    )} */}
                                <img src={item.urls[0] ? item.urls[0] : fakeImg} alt="" className="h-[7rem]" />

                            </div>
                            <div className="pl-3 w-full">
                                <div className="font-Fredoka font-semibold text-[22px]">{item.name ? item.name : ''}</div>
                                <div className="w-full font-Fredoka font-normal text-[15px] text-[#A9A9A9] text-wrap hover:text-black">{limitWords(item.desc ? item.desc : `Bao Gom: Thi bo 3 chi, Thit bo My, Thit Lon 3 Chi, Sot Trung muoi, Rau, Banh Mi, Kim Chi, Nam Kim Cham`, 18)}</div>
                                <div className="font-Fredoka w-full flex justify-between pt-3">
                                    <div>{item.prices ? formatPrices(item.prices) : '??'} vnd</div>
                                    <Button text="+" onclick={() => AddToOrder(item)}></Button>
                                </div>
                            </div>
                        </div>
                    )
                })
                : loading && loading === true
                    ? <div className="flex justify-center bg-[#E8DFDD] w-full"><img src={loadingGif} alt="" className="w-[200px]" /></div>
                    : <div className="flex bg-[#FFFFFF] justify-center text-center w-full font-Fredoka text-3xl py-7 text-red-400 uppercase">
                        Hiện tại chưa có món nào!
                    </div>
            }
        </div>
    )

}
export default ItemListVertical;