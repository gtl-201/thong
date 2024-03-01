/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Button from "../../component/button";
import Header from "../../component/header";
import ListItem from "../../component/listItem";
import { firestore } from "../../firebase";
import { Link } from "react-router-dom";

interface Combo {
    id: string;
    name: string;
    include: {
        id: string;
        name: string;
        prices: string;
        url: string;
    }[];
    prices: string;
    url: string
}


export default function Home() {
    const [data, setData] = useState<Combo[] | undefined>(undefined);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        firestore.get('combo').then(data => {
            setData(data)
            setLoading(false)
        }).catch(error => {
            console.error('Error fetching data:', error);
            const tmp: [] = [];
            setData(tmp)
            setLoading(false)
        });

    }, [])
    // console.log(data);

    return (
        <div className="w-full bg-[#FBFBFB]">
            <Header headerOnly={true}></Header>
            <div className="mx-[30px] flex flex-col items-center">
                <div className="font-Fredoka font-semibold text-[45px] ">
                    Top <span className="text-[#E44F4F]">Combo</span> hot
                </div>
                <div className="flex items-center text-wrap ">
                    Còn rất nhiều món ngon khác trong
                    {/* <div className="mx-1"> */}
                    <Link to='/allMenu' className="mx-1" aria-current="page">
                        <Button text="Menu"></Button>
                    </Link>
                    {/* </div> */}
                    <div className="hidden sm:block">
                        (Bấm để xem ngay)
                    </div>
                </div>
            </div>
            <ListItem
                loading={loading}
                data={data}
            />
        </div>
    )
}