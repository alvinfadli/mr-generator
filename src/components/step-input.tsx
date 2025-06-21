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
                    className="flex-1"
                    onChange={onChange}
                    onKeyDown={handleEnter}
                />
                <Button
                    onClick={onAdd}
                    variant={"outline"}
                    size={"sm"}
                    className="px-3 h-9"
                    disabled={!value?.trim}
                    type="button"
                >
                    <PlusIcon className="h-4 w-4" />
                </Button>
            </div>
            {items.length > 0 && (
                <div className="space-y-2">
                    {items.map((item: string, index: number) => (
                        <div
                            key={`${item}-${index}`}
                            className="flex items-center justify-between rounded-md bg-slate-50 px-3 py-2 text-sm"
                        >
                            <span className="flex-1">{item}</span>
                            <Button
                                onClick={() => onRemove(index)}
                                variant={"ghost"}
                                size={"sm"}
                                className="h-6 w-6 p-0 text-slate-400 hover:text-red-500"
                                type="button"
                                aria-label={`Remove ${item}`}
                            >
                                <Trash2 className="h-3 w-3" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export { StepInput };
