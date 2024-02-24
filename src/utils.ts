/* eslint-disable @typescript-eslint/no-explicit-any */

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