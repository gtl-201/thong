/* eslint-disable @typescript-eslint/no-explicit-any */

import ReactDOM from "react-dom";
import { event } from "./EventEmitter";

export const limitWords = (str: any, limit: number) => {
    const words = str.split(' ');
    if (words.length > limit) {
        return words.slice(0, limit).join(' ') + '...' + '(Bấm để xem thêm)';
    }
    return str;
};

export const formatPrices = (price: string) => {
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCurrency = (number: number): string => {
    const suffixes = ["K", "M", "B", "T"];
    const base = 1000;
    let suffixIndex = 0;

    while (number >= base * base && suffixIndex < suffixes.length - 1) {
        suffixIndex++;
        number /= base;
    }

    const shortValue = (number / base).toPrecision(3);
    const suffix = suffixes[suffixIndex];

    return shortValue + suffix;
};

export const AddToOrder = (
    dataAddToOrder: {
        id: string;
        name: string;
        include: {
            name: string;
            id: string;
            prices: string;
            url: string;
        }[];
        url: string;
        prices: string
    } | {
        id: string;
        name: string;
        prices: string;
        url: string;
        desc: string;
    }) => {
    if (!dataAddToOrder) {
        // Xử lý khi dataAddToOrder là undefined
        console.log('dataAddToOrder is undefined');
        return;
    }
    console.log('Add to card order');
    const value = localStorage.getItem('dataOrder');
    let newData: any;

    if (value) {
        const existingData: any[] = JSON.parse(value);

        // Tìm kiếm ID trong mảng existingData
        let found = false;
        existingData.forEach((item: any) => {
            if (item.id === dataAddToOrder.id && item.name === dataAddToOrder.name) {
                // Nếu ID đã tồn tại, tăng giá trị của trường count
                item.count = (item.count || 1) + 1;
                found = true;
            }
        });

        // Nếu không tìm thấy ID, thêm mới vào mảng
        if (!found) {
            newData = { ...dataAddToOrder, count: 1 };
            existingData.push(newData);
        }

        // Cập nhật giá trị trong localStorage
        localStorage.setItem('dataOrder', JSON.stringify(existingData).replace(/\\/g, ''));
    } else {
        // Nếu không có dữ liệu trong localStorage, tạo một mảng mới và lưu nó
        newData = { ...dataAddToOrder, count: 1 };
        localStorage.setItem('dataOrder', JSON.stringify([newData]).replace(/\\/g, ''));
    }

    console.log('!!!!!!!!', localStorage.getItem('dataOrder'));
    event.emit('storage');
    notifications('success', 'Them thanh cong')

};

export const removeAllOrder = (storageKey: string) => {
    localStorage.removeItem(storageKey)
    event.emit('storage');
    // console.log('!!!!!!!!',localStorage.getItem('dataOrder'));
    // notifications('danger', 'Đã xoá tất cả món')
}


export const removeItemOrder = (id: string, name: string, storageKey: string) => {
    // Lấy dữ liệu từ localStorage
    const data = localStorage.getItem(storageKey);
    if (data) {
        // Chuyển đổi dữ liệu từ chuỗi JSON thành một mảng
        const dataArray: any[] = JSON.parse(data);

        // Lọc ra các mục không có id hoặc name trùng khớp với id và name cần xóa
        const newDataArray = dataArray.filter(item => item.id !== id || item.name !== name);

        // Cập nhật lại dữ liệu trong localStorage với mảng mới đã lọc
        localStorage.setItem(storageKey, JSON.stringify(newDataArray));
        event.emit('storage');
    }
    // notifications('danger', 'Đã xoá món')

}

export const notifications = (type: 'success' | 'danger' | 'warning', content: string) => {
    let Component = null
    if (type === 'success') {
        Component = (<div id="toast-success" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{content}</div>
            <button onClick={() => removeNotifyContainer()} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-success" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>)
    } else if (type === 'danger') {
        Component = <div id="toast-danger" className="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
                <span className="sr-only">Error icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{content}</div>
            <button onClick={() => removeNotifyContainer()} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-danger" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    } else if (type === 'warning') {
        Component = (<div id="toast-warning" className="flex items-center w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
            <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-orange-500 bg-orange-100 rounded-lg dark:bg-orange-700 dark:text-orange-200">
                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                </svg>
                <span className="sr-only">Warning icon</span>
            </div>
            <div className="ms-3 text-sm font-normal">{content}</div>
            <button onClick={() => removeNotifyContainer()} type="button" className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-warning" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>)
    }
    const notifyContainer = document.getElementById('notifyContainer');
    if (Component !== null) {
        ReactDOM.render(Component, notifyContainer);
    }
    let timeout: any = null
    // Hàm để loại bỏ phần tử notifyContainer
    const removeNotifyContainer = () => {
        if (notifyContainer) {
            ReactDOM.unmountComponentAtNode(notifyContainer);
        }
        if (timeout) {
            clearTimeout(timeout)
        }
    };
    // Thực hiện loại bỏ sau 5 giây
    timeout = setTimeout(removeNotifyContainer, 2000);
}
