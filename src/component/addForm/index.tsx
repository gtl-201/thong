/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "../button";
import { limitText, notifications } from "../../utils";
import { useEffect, useState } from "react";
import { firestore, storage } from "../../firebase";
import SelectMultiple from "./selectMultiple";
import loadingGif from '../../assets/loading/main.gif'

interface AddFormProps {
    loading?: boolean;
    data?: {
        id: string;
        name: string;
        prices: string;
        url: string;
        desc: string;
    }[]
}

const AddForm: React.FC<AddFormProps> = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [desc, setDesc] = useState('')
    const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
    const [selectedType, setSelectedType] = useState<string>('meat');
    const [loading, setLoading] = useState(false)

    // {SATRT Search Food For Combo}
    const [dataFoods, setdataFoods] = useState<any[] | null>(null);
    useEffect(() => {
        firestore.getMultiCollection(['meat', 'drink', 'sideDishes']).then(data => {
            const mergedArray = Object.entries(data).reduce((accumulator, [key, value]) => {
                console.log(key);
                return accumulator.concat(value.map((item: any) => ({
                    id: item.id,
                    name: item.name,
                    prices: item.prices,
                    desc: item.desc,
                    urls: item.urls
                })));
            }, []);
            setdataFoods(mergedArray)


        }).catch(error => {
            console.error('Error fetching data:', error);
            const tmp: [] = [];
            setdataFoods(tmp)
        });
    }, [])
    const [selectedValues, setSelectedValues] = useState<string[]>([])
    // {END Search Food For Combo}


    const handleCreateFood = () => {
        // console.log(name, price, desc, selectedFiles, selectedType);
        if (name != '' && price != '' && selectedFiles.length > 0 && selectedType != '') {
            setLoading(true)
            const type = 'photos';
            const uploadTasks = selectedFiles.map((uploadFile) => {
                return storage.upload(`${type}/${new Date().getTime()}-${uploadFile.name}`, uploadFile);
            });

            Promise.all(uploadTasks)
                .then((fileSrcs) => {
                    const urls = fileSrcs.map(fileSrc => fileSrc);

                    if (desc !== '' && selectedType != 'combo') {
                        const dataFood = {
                            name: name,
                            prices: price,
                            desc: desc,
                            urls: urls
                        };
                        firestore.add(selectedType, dataFood).then(dataSetFood => {
                            console.log('added food', dataSetFood);
                            setName('')
                            setPrice('')
                            setDesc('')
                            setSelectedFiles([])
                            setSelectedType('meat')
                            notifications('success', 'Them thanh cong')
                            setLoading(false)
                        }).catch(error => {
                            console.error('Error add data:', error);
                            notifications('warning', 'Them that bai', error)
                            setLoading(false)

                        });
                    } else if (selectedType === 'combo') {
                        const include: object[] = []
                        selectedValues?.forEach((selectedId: string) => {
                            const foundItem = dataFoods?.find(foodItem => foodItem.id === selectedId);
                            if (foundItem) {
                                include.push(foundItem);
                            }
                        });
                        const dataCombo = {
                            name: name,
                            prices: price,
                            include: include,
                            urls: urls,
                        }
                        console.log(dataCombo);
                        firestore.add(selectedType, dataCombo).then(dataSetCombo => {
                            console.log('added food', dataSetCombo);
                            setName('')
                            setPrice('')
                            setSelectedValues([])
                            setSelectedFiles([])
                            setSelectedType('meat')
                            notifications('success', 'Them combo thanh cong')
                            setLoading(false)

                        }).catch(error => {
                            console.error('Error add data:', error);
                            notifications('warning', 'Them that bai', error)
                            setLoading(false)
                        });
                    } else {
                        notifications('warning', 'Them that bai', 'Khong duoc bo trong o nao')
                        setLoading(false)
                    }
                })
                .catch((error: any) => {
                    console.error('Error uploading files:', error);
                    notifications('warning', 'Them that bai', error)
                    setLoading(false)
                });
        } else {
            notifications('warning', 'Them that bai', 'Khong duoc bo trong o nao')
            setLoading(false)
        }
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);

            const validFiles = files.filter(file => file.type.startsWith('image/')); // Lọc chỉ các tệp hình ảnh

            const uniqueFiles = validFiles.filter(newFile => !selectedFiles.some(existingFile => existingFile.name === newFile.name));
            console.log(uniqueFiles);

            // Tạo một mảng mới chứa thông tin về các tệp đã chọn
            // const fileData = uniqueFiles.map(file => ({
            //     name: file.name,
            //     lastModified: file.lastModified,
            //     // lastModifiedDate: file.lastModifiedDe,
            //     size: file.size,
            //     type: file.type,
            //     webkitRelativePath: file.webkitRelativePath
            // }));

            // // Thêm các tệp không trùng vào danh sách các tệp đã chọn
            setSelectedFiles(prevFiles => [...prevFiles, ...uniqueFiles]);
        }
    };
    const removeImage = (name: string) => {
        setSelectedFiles(prevFiles => prevFiles.filter((item) => item.name !== name));
    };

    return (
        <div className="w-full bg-[#F5F5F5] flex flex-col items-center mb-10">
            {loading && <div className="absolute z-40 flex justify-center bg-[#e8dfdd76] w-full">
                <img src={loadingGif} alt="" className="opacity-50 w-full" />
            </div>}
            <div className="w-full md:w-[50rem] lg:w-[60rem] px-5">
                <div className="font-Fredoka font-semibold text-[27px] mt-3 text-center uppercase">Them Mon</div>
                <div className="sm:col-span-3">
                    <label htmlFor="selectType" className="block text-sm  mt-5 mb-1 font-Fredoka font-semibold text-[27px] leading-6 text-gray-900">Phân loại</label>
                    <div className="mt-2">
                        <select
                            id="selectType"
                            name="selectType"
                            className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            onChange={(e) => setSelectedType(e.target.value)}
                            value={selectedType}
                        >
                            <option value={'meat'} defaultChecked>Thịt</option>
                            <option value={'drink'}>Đồ uống</option>
                            <option value={'sideDishes'}>Ăn kèm</option>
                            <option value={'combo'}>COMBO</option>
                        </select>
                    </div>
                </div>

                <label htmlFor="Name" className="block text-sm  mt-5 mb-1 font-Fredoka font-semibold text-[27px] leading-6 text-gray-900">Tên</label>
                <input
                    type="text"
                    name="Name"
                    id="Name"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />

                <label htmlFor="Price" className="block text-sm  mt-5 mb-1 font-Fredoka font-semibold text-[27px] leading-6 text-gray-900">Giá</label>
                <input
                    type="number"
                    name="Price"
                    id="Price"
                    className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                    }}
                />

                {selectedType === 'combo'
                    ? <SelectMultiple
                        dataFoods={dataFoods ? dataFoods : []}
                        onSelectedValuesChange={(selectedValues) => setSelectedValues(selectedValues)}
                    />
                    : <div>
                        <label htmlFor="Desc" className="block text-sm  mt-5 mb-1 font-Fredoka font-semibold text-[27px] leading-6 text-gray-900">Mô tả</label>
                        <input
                            type="text"
                            name="Desc"
                            id="Desc"
                            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            value={desc}
                            onChange={(e) => {
                                setDesc(e.target.value);
                            }}
                        />
                    </div>}

                {selectedFiles.length > 0 ? (
                    <div>
                        <h2 className="font-Fredoka font-semibold text-[20px] mt-5">Hình ảnh đã chọn {'(' + selectedFiles.length + ')'}:
                            <label htmlFor="file-upload" className="ml-2 relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                <span className="mx-3">Upload more file</span>
                                <input
                                    id="file-upload"
                                    accept="video/*,image/*"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    multiple
                                    onChange={(e) => {
                                        handleFileChange(e)
                                    }}
                                />
                            </label>
                        </h2>
                        <ul className="flex flex-wrap justify-around rounded-lg border border-dashed border-gray-900/25">
                            {Array.from(selectedFiles).map((file, index) => (
                                <div className="mx-2 my-3" key={index}>
                                    <li className="">{limitText(file.name, 13)}</li>
                                    <li className="overflow-hidden h-28 w-28 relative bg-blue-500 shadow-lg rounded-lg flex justify-center items-center">
                                        {/* <div className="absolute">x</div> */}
                                        <div className="absolute top-1 right-1">
                                            <Button text="x" onclick={() => removeImage(file.name)}></Button>
                                        </div>
                                        <img
                                            src={URL.createObjectURL(file)}
                                            alt=""
                                            className="min-w-28"
                                        />
                                    </li>

                                </div>
                            ))}
                        </ul>

                    </div>
                ) : (
                    <div className="col-span-full">
                        <label htmlFor="Desc" className="block text-sm  mt-5 mb-1 font-Fredoka font-semibold text-[27px] leading-6 text-gray-900">Hình ảnh</label>
                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
                                </svg>
                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                        <span>Upload a file</span>
                                        <input
                                            id="file-upload"
                                            accept="video/*,image/*"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                            multiple
                                            onChange={(e) => {
                                                handleFileChange(e)
                                            }}
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex justify-end mt-5">
                    <Button
                        text="TẠO MÓN LUÔN"
                        icPosition="right" icon={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                    <path strokeLinecap="round" stroke-linejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
                    </svg>
                    `}
                        onclick={() => handleCreateFood()}

                    />
                </div>
            </div>
        </div>
    )

}
export default AddForm;