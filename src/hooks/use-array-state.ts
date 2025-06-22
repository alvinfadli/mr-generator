import { useCallback, useState } from "react";

interface ArrayStateHook {
    items: string[];
    addItem: (item: string) => void;
    removeItem: (index: number) => void;
    editItem: (index: number, newItem: string) => void;
    clearItems: () => void;
}

const useArrayState = (initialValue: string[] = []): ArrayStateHook => {
    const [items, setItems] = useState<string[]>(initialValue);

    const addItem = useCallback((item: string): void => {
        setItems((prev) => [...prev, item.trim()]);
    }, []);

    const removeItem = useCallback((index: number): void => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const editItem = useCallback((index: number, newItem: string): void => {
        setItems(prev => prev.map((item, i) => i === index ? newItem : item));
    }, []);

    const clearItems = useCallback((): void => {
        setItems([]);
    }, []);

    return { items, addItem, removeItem, editItem, clearItems };
};

export { useArrayState };
