import { APIInit } from "../types/user";


export const getData = async <T>(url: string): Promise<T> => await callAPI(url, 'GET')

export const updateData = async <T, U>(url: string, data: U): Promise<T> => await callAPI(url, 'PUT', data)

export const deleteData = async <T>(url: string): Promise<T> => await callAPI(url, 'DELETE')

export const createData = async <T, U>(url: string, data: U): Promise<T> => await callAPI(url, 'POST', data)

export const fetchData = async <T>(url: string): Promise<T> => await callAPI(url, 'GET')

const callAPI = async <T, U>(url: string, method: string, data?: U): Promise<T> => {
    const options: APIInit = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        ...(data && { body: JSON.stringify(data) })
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json() as T;
};