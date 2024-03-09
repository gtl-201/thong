/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../component/header";
import loadingGif from '../../assets/loading/main.gif'
import { AddToOrder, formatPrices } from "../../utils";
import Button from "../../component/button";

export default function DetailFood() {
    // const searchParams = new URLSearchParams(location.search);
    // const dataString = searchParams.get('data');
    // console.log(dataString);

    // let data: any = null;
    // try {
    //     data = JSON.parse(dataString || '');

    // } catch (error) {
    //     console.error('Error parsing data:', error);
    // }
    const data: any = JSON.parse(localStorage.getItem('detailFood') || 'null');
    console.log(data.name);


    return (
        <div className="w-full flex flex-col bg-[#FBFBFB] items-center">
            <div className="z-10 w-full">
                <Header headerOnly={false}></Header>
            </div>
            <div className="z-0 -mt-5 md:mt-5 w-full md:w-[50rem] lg:w-[60rem] flex flex-col items-center">
                <div className="w-full h-fit overflow-x-scroll overflow-y-hidden max-h-[30rem] rounded-none md:rounded-2xl shadow-lg flex space-x-3 bg-red-200">

                    {data.urls && data.urls.length > 0 ? data.urls.map((item: any) => {
                        return (

                            <img src={item ? item : loadingGif} alt="" className="max-h-[30rem]" />

                        )
                    })
                        : null}

                </div>
                <div className="flex justify-between w-full md:w-[40rem] lg:w-[60rem] px-[30px] py-[20px] md:px-[10px]">
                    <div className="">
                        <div className="font-Fredoka font-bold text-[25px] capitalize">{data && data.name ? data.name : ''}</div>
                        <div className="font-Fredoka font-normal text-[18px] -mt-2">{data && data.desc
                            ? data.desc
                            : data.include
                                ? data.include.map((item: any, key: number) => {
                                    return (
                                        <div key={key} className="flex items-center mt-2">
                                            <img className="w-12 rounded-md" src={item.urls ? item.urls[0] : loadingGif} alt="" />
                                            <div className="pl-3">
                                                {item.name ? item.name : 'null'}
                                                <div>{item.prices ? formatPrices(item.prices) + '₫' : 'null'}</div>
                                            </div>
                                        </div>

                                    )
                                })
                                : ''}
                        </div>
                    </div>
                    <div className="flex flex-col items-end ">
                        {/* <div className="font-Fredoka font-bold text-[30px] capitalize ">{data && data.prices ? formatPrices(data.prices) : ''}</div> */}
                        <Button
                            icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" class="w-12 h-12">
                            <path d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                            `}
                            bgIcon="#EA5958"
                            onclick={() => { AddToOrder(data) }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}