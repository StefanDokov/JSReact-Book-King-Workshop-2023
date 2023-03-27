import { useState } from "react";


export const useLocalStorage = (key, initialValues) => {
    const [state, setState] = useState(() => {
        const persistedUnparsed = localStorage.getItem(key);
        if (persistedUnparsed) {
            const persistedState = JSON.parse(persistedUnparsed);
            
            return persistedState;
        }
         return initialValues;
    });
    
    const setLocalStorageState = (value) => {
        setState(value);

        localStorage.setItem(key, JSON.stringify(value));
    };
    
    
    return [
        state,
        setLocalStorageState,
    ]
}