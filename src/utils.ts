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
}
