// import { Link } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../component/button";
import Header from "../../component/header";
import ListItem from "../../component/listItem";
import { firestore } from "../../firebase";

export default function Home() {
    useEffect(() => {
        firestore.get('meat').then((x) => console.log(x)
        )
    }, [])

    return (
        <div className="w-full bg-[#FBFBFB]">
            <Header headerOnly={true}></Header>
            <div className="mx-[30px] flex flex-col items-center">
                <div className="font-Fredoka font-semibold text-[45px] ">
                    Top <span className="text-[#E44F4F]">Combo</span> hot
                </div>
                <div className="flex items-center text-wrap ">
                    Còn rất nhiều món ngon khác trong
                    <div className="mx-1">
                        <Button text="Menu" onclick={() => { window.location.href = '/allMenu' }}></Button>
                    </div>
                    <div className="hidden sm:block">
                        (Bấm để xem ngay)
                    </div>
                </div>
            </div>
            <ListItem></ListItem>
        </div>
    )
}