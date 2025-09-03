import { DateValue } from "@mantine/dates";

function addPrefix(n: number): string {
    if (n < 10) {
        return `0${n}`;
    }
    return `${n}`;
}

export function parseTextDateValue(ds: string): Date {
    const parsedDate = Date.parse(ds);
    return new Date(parsedDate);
}

export function addHours(d: Date, hours: number): Date {
    const changedDate = d;
    changedDate.setHours(changedDate.getHours() + hours);
    return changedDate;
}

export function formatTextDateValue(ds: string | undefined, hourShift: number) {
    if (ds) {
        const parsedDate = Date.parse(ds);
        const convertedDate = new Date(parsedDate);

        const year: string = convertedDate.getFullYear().toString();
        const month: string = addPrefix(convertedDate.getMonth() + 1);
        const day: string = addPrefix(convertedDate.getDate());
        const hour: string = addPrefix(convertedDate.getHours() - hourShift);
        const min: string = addPrefix(convertedDate.getMinutes());
        // const sec: string = addPrefix(convertedDate.getSeconds());

        return `${day}/${month}/${year} ${hour}:${min}`;
    }
    return "";
}

export function formatDateValue(d: DateValue | string | undefined) {
    if (d instanceof Date) {
        const year: string = d.getFullYear().toString();
        const month: string = addPrefix(d.getMonth() + 1);
        const day: string = addPrefix(d.getDate());
        const hour: string = addPrefix(d.getHours() - 3);
        const min: string = addPrefix(d.getMinutes());
        const sec: string = addPrefix(d.getSeconds());
        // eslint-disable-next-line max-len
        return `${year}-${month}-${day}T${hour}:${min}:${sec}.000Z`;
    }
    return "";
}

export const datetimeToMKS = (strDate: string) => {
    const dtime = Date.parse(strDate);
    const ndtime = new Date(dtime);

    const year: string = ndtime.getFullYear().toString();
    const month: string = addPrefix(ndtime.getMonth() + 1);
    const day: string = addPrefix(ndtime.getDate());
    const hour: string = addPrefix(ndtime.getHours());
    const min: string = addPrefix(ndtime.getMinutes());

    // return `${ndtime.getDay()}/${ndtime.getMonth() + 1}/${ndtime.getFullYear()} ${ndtime.getHours()}:${ndtime.getMinutes()} `;
    return `${day}/${month}/${year} ${hour}:${min}`;
};

export function formatTimestampToHHmm(timestamp: number): string {
    const date = new Date(timestamp * 1000); // timestamp в секундах -> миллисекунды
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
}
