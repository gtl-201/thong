/* eslint-disable @typescript-eslint/no-explicit-any */

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
    
};

export const removeAllOrder = (storageKey: string) => {
    localStorage.removeItem(storageKey)
    // console.log('!!!!!!!!',localStorage.getItem('dataOrder'));
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
    }
}
