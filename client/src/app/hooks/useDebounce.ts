import { useEffect, useState } from "react";

export default function useDebounce(value: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            console.log(value);
            setDebouncedValue(value);
        }, delay);

        // Cleanup function to clear the timer on value or delay change
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}