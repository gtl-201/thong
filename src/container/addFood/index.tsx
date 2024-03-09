/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../component/header";

import AddForm from "../../component/addForm";


export default function AddFood() {


    return (
        <div className="w-full bg-[#F5F5F5] flex flex-col items-center">
            <Header headerOnly={false}></Header>
            <AddForm></AddForm>
        </div>
    )
}