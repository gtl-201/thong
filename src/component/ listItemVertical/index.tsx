/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../button";
import Header from "../header";
import fakeImg from "../../assets/header/lau.jpg"
import { limitWords, formatPrices } from "../../utils";

interface ItemListVerticalProps {
    // img?: string;
    // rating?: string;
    // price?: string;
}

const ItemListVertical: React.FC<ItemListVerticalProps> = () => {
    const fakeData = {
        'id1': {
            name: 'Ten combo 1',
            prices: '125000',
            url: '',
            saled: '5',
            desc: 'gom thit bo, thit nuong, thi cha, thit xien',
            include: 'id'
        },
        'id2': {
            name: 'Ten combo 2',
            prices: '125000',
            url: '',
            saled: '5',
            desc: 'gom thit bo, thit nuong, thi cha, thit xien',
            include: 'id'
        },
        'id3': {
            name: 'Ten combo 3',
            prices: '125000',
            url: '',
            saled: '5',
            desc: 'gom thit bo, thit nuong, thi cha, thit xien',
            include: 'id'
        },
        'id4': {
            name: 'Ten combo 4',
            prices: '125000',
            url: '',
            saled: '5',
            desc: 'gom thit bo, thit nuong, thi cha, thit xien',
            include: 'id'
        },
        'id5': {
            name: 'Ten combo 5',
            prices: '125000',
            url: '',
            saled: '5',
            desc: 'gom thit bo, thit nuong, thi cha, thit xien',
            include: 'id'
        },
    }

    return (
        <div className="w-full bg-[#F5F5F5] flex flex-col items-center">
            {Object.entries(fakeData).map((item) => {
                return (
                    <div className="flex bg-[#FFFFFF] mb-[2px] px-2 py-3 items-center shadow-lg w-[100%] md:w-[90%] lg:w-[80%] md:rounded-lg md:my-2" key={item[0]}>
                        <img src={item[1].url ? item[1].url : fakeImg} alt="" className="w-[7rem] h-[7rem] rounded-lg " />
                        <div className="pl-3 w-full">
                            <div className="font-Fredoka font-semibold text-[22px]">{item[1].name ? item[1].name : ''}</div>
                            <div className="w-full font-Fredoka font-normal text-[15px] text-[#A9A9A9] text-wrap hover:text-black">{limitWords(item[1].desc ? item[1].desc : `Bao Gom: Thi bo 3 chi, Thit bo My, Thit Lon 3 Chi, Sot Trung muoi, Rau, Banh Mi, Kim Chi, Nam Kim Cham`, 18)}</div>
                            <div className="font-Fredoka w-full flex justify-between pt-3">
                                <div>{item[1].prices ? formatPrices(item[1].prices) : '??'} vnd</div>
                                <Button text="+"></Button>
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    )

}
export default ItemListVertical;