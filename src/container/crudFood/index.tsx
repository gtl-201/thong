/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import ListItem from "../../component/ listItemVertical";
import { firestore } from "../../firebase";
import { useEffect, useState } from "react";

export default function CrudFood() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<{ [key: string]: any } | null>(null);
    const [collection, setCollection] = useState('all')
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        firestore.getMultiCollection(['meat', 'drink', 'sideDishes', 'combo']).then((data: any) => {
            setData(data)
            setLoading(false)
            if (data && data['meat']) {
                data['meat'].forEach((item: any) => {
                    item.collection = 'meat';
                });
            }
            if (data && data['drink']) {
                data['drink'].forEach((item: any) => {
                    item.collection = 'drink';
                });
            }
            if (data && data['sideDishes']) {
                data['sideDishes'].forEach((item: any) => {
                    item.collection = 'sideDishes';
                });
            }
            if (data && data['combo']) {
                data['combo'].forEach((item: any) => {
                    item.collection = 'combo';
                });
            }
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
    const [showSort, setShowSort] = useState(false)
    const mergeData = (data: { [key: string]: any } | null) => {
        const mergedData: any[] = [];

        if (data && Object.keys(data).length > 0) {
            // Duyệt qua các thuộc tính của đối tượng data và thêm các phần tử vào mảng mergedData
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const category = data[key];
                    mergedData.push(...category.map((item: any) => ({
                        id: item.id,
                        urls: item.urls,
                        name: item.name,
                        prices: item.prices,
                        desc: item.desc,
                        collection: key
                    })));
                }
            }
        }

        return mergedData;
    };

    return (
        <div className="w-full bg-[#F5F5F5] flex flex-col items-center">
            <div className="font-Fredoka font-semibold text-[30px] text-center">
                Crud <Link to='/addFood' className="text-[#E44F4F]">Food+</Link>

            </div>
            <div className=" flex items-center">
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
                <div onClick={() => setShowSort(!showSort)} className="text-center relative w-24 m-2 px-5 py-1 text-xl rounded-lg bg-white shadow-lg uppercase">

                    {collection}
                    {showSort
                        && <div className="flex flex-col justify-between my-2 absolute right-0 top-7 shadow-2xl bg-white z-40 rounded-lg">
                            <div onClick={() => setCollection('all')}
                                style={collection == 'all' ? { backgroundColor: 'black', color: 'white' } : {}}
                                className="cursor-pointer rounded-lg hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2 border-b-2" aria-current="page">All</div>

                            <div onClick={() => setCollection('combo')}
                                style={collection == 'combo' ? { backgroundColor: 'black', color: 'white' } : {}}
                                className="cursor-pointer rounded-lg hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2 border-b-2" aria-current="page">Combo</div>

                            <div onClick={() => setCollection('meat')}
                                style={collection == 'meat' ? { backgroundColor: 'black', color: 'white' } : {}}
                                className="cursor-pointer rounded-lg hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2 border-b-2" aria-current="page">Thịt</div>

                            <div onClick={() => setCollection('sideDishes')}
                                style={collection == 'sideDishes' ? { backgroundColor: 'black', color: 'white' } : {}}
                                className="cursor-pointer rounded-lg hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2 border-b-2" aria-current="page">Đồ ăn kèm</div>

                            <div onClick={() => setCollection('drink')}
                                style={collection == 'drink' ? { backgroundColor: 'black', color: 'white' } : {}}
                                className="cursor-pointer rounded-lg hover:text-black text-center text-[#7A787A] mx-1 px-1 md:px-2 border-b-2" aria-current="page">Nước</div>
                        </div>}
                </div>
            </div>




            {((dataOnSearch.length != 0 && searchKeyword !== '') || (dataOnSearch.length == 0 && searchKeyword !== ''))
                && <div className="flex justify-between my-2 text-red-400">
                    Kết quả tương ứng
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
                                ? collection == 'all' ? mergeData(data) : data[collection]
                                : null
                }
                ud={true}
            />
        </div>
    )
}