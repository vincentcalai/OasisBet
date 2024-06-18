import { useEffect, useState } from "react";

export function getSessionStorageOrDefault(key, defaultVal){
    const storedItem = sessionStorage.getItem(key);
    if(!storedItem){
        return defaultVal;
    }
    return JSON.parse(storedItem);
}

export function useSessionStorage(key, defaultVal){
    const [value, setValue] = useState(getSessionStorageOrDefault(key,defaultVal));
    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(value))
    });

    return [value, setValue];
}