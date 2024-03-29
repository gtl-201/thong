/* eslint-disable @typescript-eslint/no-explicit-any */
import ListItem from "../../component/ listItemVertical";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";

export default function Menu() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<{ [key: string]: any } | null>(null);
    const [collection, setCollection] = useState('meat')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        firestore.getMultiCollection(['meat', 'drink', 'sideDishes', 'combo']).then(data => {
            setData(data)
            setLoading(false)
        }).catch(error => {
            console.error('Error fetching data:', error);
            const tmp: [] = [];
            setData(tmp)
            setLoading(false)
        });

    }, [])

    const [searchKeyword, setSearchKeyword] = useState("");
    const [dataOnSearch, setDataOnSearch] = useState<any[]>([]);
    const searchByName = (keyword: string) => {
        const results: any[] = [];
        data ? Object.values(data).forEach(category => {
            // console.log('cate',category);
            category.forEach((item: any) => {
                // console.log('item',item.name != undefined && item.name.toLowerCase());
                if (item.name && item.name.toLowerCase().includes(keyword.toLowerCase())) {
                    results.push(item);
                }


            });
        }) : null;
        // console.log(results);
        if (keyword != '') {
            setDataOnSearch(results)
        } else {
            setDataOnSearch([])
        }
        // return results;
    }

    return (
        <div className="w-full bg-[#F5F5F5] flex flex-col items-center">
            <div className="font-Fredoka font-semibold text-[30px] text-center">
                Chuc <span className="text-[#E44F4F]">quy khach</span> ngon mieng
            </div>
            <div className=" flex relative">
                <input
                    type="search"
                    placeholder="Search..."
                    value={searchKeyword}
                    onChange={(e) => {
                        setSearchKeyword(e.target.value);
                        searchByName(e.target.value)
                    }}
                    className="h-10 px-2 rounded-md shadow-md w-60 m-2"
                />
            </div>
            {((dataOnSearch.length != 0 && searchKeyword !== '') || (dataOnSearch.length == 0 && searchKeyword !== ''))
                ? <div className="flex justify-between my-2 text-red-400">
                    Kết quả tương ứng
                </div>
                : <div className="flex justify-between my-2">
                    <div onClick={() => setCollection('combo')}
                        style={{ color: collection == 'combo' ? 'black' : '#7A787A' }}
                        className="cursor-pointer hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2" aria-current="page">Combo</div>
                    <div className="border-r-2 w-0" />

                    <div onClick={() => setCollection('meat')}
                        style={{ color: collection == 'meat' ? 'black' : '#7A787A' }}
                        className="cursor-pointer hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2" aria-current="page">Thịt</div>
                    <div className="border-r-2 w-0" />

                    <div onClick={() => setCollection('sideDishes')}
                        style={{ color: collection == 'sideDishes' ? 'black' : '#7A787A' }}
                        className="cursor-pointer hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2" aria-current="page">Đồ ăn kèm</div>
                    <div className="border-r-2 w-0" />

                    <div onClick={() => setCollection('drink')}
                        style={{ color: collection == 'drink' ? 'black' : '#7A787A' }}
                        className="cursor-pointer hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2" aria-current="page">Nước</div>
                </div>
            }

            <ListItem
                loading={loading}
                data={
                    (dataOnSearch.length != 0 && searchKeyword !== '')
                        ? dataOnSearch
                        : (dataOnSearch.length == 0 && searchKeyword !== '')
                            ? null
                            : data
                                ? data[collection]
                                : null
                }
            />
        </div>
    )
}