import { Link } from "react-router-dom";
import Header from "../../component/header";
import ListItem from "../../component/ listItemVertical";

export default function Menu() {
    return (
        <div className="w-full bg-[#F5F5F5] flex flex-col items-center">
            <Header headerOnly={false}></Header>
            <div className="font-Fredoka font-semibold text-[30px] text-center">
                Chuc <span className="text-[#E44F4F]">quy khach</span> ngon mieng
            </div>

            <div className="flex justify-between my-2">
                <a href="#" className="hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2 text-sm font-medium" aria-current="page">Cac loai Thit</a>
                <div className="border-r-2 w-0" />
                <a href="#" className="hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2 text-sm font-medium" aria-current="page">Cac loai Vien</a>
                <div className="border-r-2 w-0" />
                <a href="#" className="hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2 text-sm font-medium" aria-current="page">Do an kem</a>
                <div className="border-r-2 w-0" />
                <a href="#" className="hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2 text-sm font-medium" aria-current="page">Cac Loai Nuoc</a>
            </div>
            <ListItem/>
        </div>
    )
}