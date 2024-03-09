/* eslint-disable @typescript-eslint/no-explicit-any */
import Header from "../../component/header";
import { useState } from "react";
import Button from "../../component/button";
import { firestore } from "../../firebase";
import { notifications } from "../../utils";


export default function EnterCode() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interface DataItem {
        active: boolean;
        id: string;
    }
    const [code, setCode] = useState('')
    const handleCheckCode = () => {
        if (code !== '') {
            firestore.get('adminCode').then(data => {
                if (data.some((item: DataItem) => item.id === localStorage.getItem('code'))) {
                    notifications('success','Code dung','da mo full quyen')
                }else{
                    notifications('warning','Code sai','Hay thu nhap lai')
                    
                }
            }).catch(error => {
                console.error('Error fetching data:', error);
                notifications('warning', error)
            });
            
            localStorage.setItem('code', code)
        } else {
            notifications('warning', 'Code trong, nhap lai')
        }
    }

    return (
        <div className="w-full bg-[#F5F5F5] flex flex-col items-center">
            <Header headerOnly={false}></Header>
            <div className="col-span-full w-full md:w-[50rem] lg:w-[60rem] px-5">
                <label htmlFor="AdminCode" className="block text-sm text-center mt-5 mb-3 font-Fredoka font-semibold text-[28px] leading-6 text-gray-900">Nhap Admin Code</label>

                <input
                    type="text"
                    name="AdminCode"
                    id="AdminCode"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={code}
                    onChange={(e) => {
                        setCode(e.target.value);
                    }}
                />
                <div className="flex justify-center mb-4 mt-3">
                    <Button text='Kiem tra' icPosition="right" icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                    <path strokeLinecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                    `}
                        onclick={() => handleCheckCode()} />
                </div>
            </div>
        </div>
    )
}