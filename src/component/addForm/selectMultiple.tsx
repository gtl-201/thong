/* eslint-disable @typescript-eslint/no-explicit-any */
import { limitText } from "../../utils";
import { useEffect, useState } from "react";
interface SelectMultipleProps {
    dataFoods: any[];
    onSelectedValuesChange: (selectedValues: any[]) => void;
}

const SelectMultiple: React.FC<SelectMultipleProps> = ({ dataFoods, onSelectedValuesChange }) => {
    const [dataSearchFood, setDataSearchFood] = useState<any[] | null>(null);

    const [selectedValues, setSelectedValues] = useState<any[]>([]);
    const [searchFood, setSearchFood] = useState('')
    const [select, setSelect] = useState(false)
    const setAndCallBackSelectedValue = (value: any)=>{
        setSelectedValues(value)
        onSelectedValuesChange(value);
    }
    const handleOptionClick = (value: string) => {
        if (!selectedValues.includes(value)) {
            setAndCallBackSelectedValue([...selectedValues, value])
            setSearchFood('')
            // setSelect(false)
        } else {
            setAndCallBackSelectedValue(selectedValues.filter(item => item !== value));
            setSearchFood('')
            // setSelect(false)
        }
    };
    const handleRemoveValue = (valueToRemove?: any) => {
        if (valueToRemove) {
            setAndCallBackSelectedValue(selectedValues.filter(item => item !== valueToRemove))
        } else {
            setAndCallBackSelectedValue([])
            setSearchFood('')
            setSelect(false)
        }
    };

    const filterFoodByName = (searchText: string) => {
        if (!searchText) {
            // Nếu ô input rỗng, trả về toàn bộ danh sách món ăn
            return dataFoods;
        } else {
            // Nếu có nội dung trong ô input, lọc danh sách món ăn dựa trên tên chứa nội dung đã nhập
            return dataFoods ? dataFoods.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase())) : null;
        }
    }
    useEffect(() => {
        const filteredFood = filterFoodByName(searchFood);
        setDataSearchFood(filteredFood);
    }, [searchFood]);
    return (
        <div className="relative">
            <label htmlFor="SelectMultiFood" className="block text-sm  mt-5 mb-1 font-Fredoka font-semibold text-[27px] leading-6 text-gray-900">Chon Mon</label>
            <div
                id="SelectMultiFood"
                className=" border-2 bg-white rounded-md py-1 pl-2 h-fit flex justify-between">
                <div className="flex max-w-[60%] flex-wrap">
                    {selectedValues.map((value, index) => (
                        <span onClick={() => handleRemoveValue(value)} key={index} className="block w-fit my-1 rounded-md mr-[0.5rem] py-1 pl-2 pr-1 capitalize bg-[#D8DBE0]">
                            {limitText(dataFoods && dataFoods.length > 0 && dataFoods.filter(item => item.id === value)[0].name, 30)}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="ml-1 w-5 h-5 inline-flex justify-center items-center pb-[0.2rem]">
                                <path d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </span>
                    ))}
                </div>
                <input
                    type="text"
                    id='searchFood'
                    className="-my-1 w-full"
                    value={searchFood}
                    // onBlur={() => setSelect(false)}
                    onFocus={() => searchFood != '' && setSelect(true)}
                    onChange={(e) => {
                        setSearchFood(e.target.value);
                        e.target.value == '' ? setSelect(false) : setSelect(true)
                    }}
                />
                <div className="flex items-center">
                    <svg onClick={() => handleRemoveValue()} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#727376" className="w-10 h-10 px-2 hover:scale-110 transition-transform">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <div className="text-[#bbbdc0] mb-1 text-xl">|</div>

                    <svg onClick={() => setSelect(!select)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#727376" className="w-10 h-10 px-2 hover:scale-110 transition-transform">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
            </div>
            {select
                && <select
                    id="selectBox"
                    multiple
                    className="absolute -ml-2 w-full md:w-[47.5rem] lg:w-[57.5rem] border-2 border-t-0 shadow-lg left-2"
                >
                    {dataSearchFood && dataSearchFood.length > 0 && dataSearchFood.map((item: any, index: number) => (
                        <option
                            value={item.id} key={index}
                            onClick={() => handleOptionClick(item.id)}
                            className={selectedValues.includes(item.id) ? "text-blue-600 font-semibold" : ''}
                        >

                            {selectedValues.includes(item.id) ? '💖 ' : '💌 '}
                            {item.name}
                        </option>
                    ))}
                </select>}
        </div>
    )
}
export default SelectMultiple;