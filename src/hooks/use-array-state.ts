import { useCallback, useState } from "react";

interface ArrayStateHook {
    items: string[];
    addItem: (item: string) => void;
    removeItem: (index: number) => void;
    clearItems: () => void;
}

const useArrayState = (initialValue: string[] = []): ArrayStateHook => {
    const [items, setItems] = useState<string[]>(initialValue);

    const addItem = useCallback((item: string): void => {
        if (item.trim()) {
            setItems((prev) => [...prev, item.trim()]);
        }
    }, []);

    const removeItem = useCallback((index: number): void => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const clearItems = useCallback((): void => {
        setItems([]);
    }, []);

    return { items, addItem, removeItem, clearItems };
};

export { useArrayState };
