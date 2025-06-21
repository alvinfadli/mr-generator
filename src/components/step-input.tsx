import type React from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { PlusIcon, Trash2 } from "lucide-react";

interface StepInputProps {
    label: string;
    value: string;
    items: string[];
    placeholder?: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onAdd: () => void;
    onRemove: (index: number) => void;
}

const StepInput: React.FC<StepInputProps> = ({
    label,
    value,
    items,
    placeholder = "Enter item...",
    onChange,
    onAdd,
    onRemove,
}) => {
    const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") {
            e.preventDefault();
            onAdd();
        }
    };

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium text-slate-700">
                {label}
            </Label>
            <div className="flex gap-2">
                <Input
                    type="text"
                    value={value}
                    placeholder={placeholder}
                    className="flex-1 dark:bg-slate-800"
                    onChange={onChange}
                    onKeyDown={handleEnter}
                />
                <Button
                    asChild
                    onClick={onAdd}
                    variant={"outline"}
                    size={"sm"}
                    className="h-9 bg-slate-50 px-2.5 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-950"
                    disabled={!value?.trim}
                >
                    <span>
                        <PlusIcon className="h-4 w-4 text-slate-900 dark:text-slate-300" />
                    </span>
                </Button>
            </div>
            {items.length > 0 && (
                <div className="space-y-2">
                    {items.map((item: string, index: number) => (
                        <div
                            key={`${item}-${index}`}
                            className="flex items-center justify-between rounded-md bg-slate-100 px-3 py-2 text-sm dark:bg-slate-800"
                        >
                            <span className="flex-1">{item}</span>
                            <Button
                                asChild
                                onClick={() => onRemove(index)}
                                variant={"ghost"}
                                size={"sm"}
                                className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                                aria-label={`Remove ${item}`}
                            >
                                <span>
                                    <Trash2 className="h-3 w-3" />
                                </span>
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { StepInput };
