import { HTMLInputTypeAttribute, useEffect, useState } from "react";

export interface TextFieldProps {
    className?: string;
    placeholder?: string;
    initialValue: string;
    commitChange: (value: string) => void;
    type?: HTMLInputTypeAttribute;
    asTextArea?: boolean;
    id?: string;
}

export const TextField = ({
    className,
    commitChange,
    initialValue,
    placeholder,
    type,
    id,
    asTextArea,
}: TextFieldProps) => {
    const [value, setValue] = useState(initialValue);
    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const Component = asTextArea ? "textarea" : "input";

    return (
        <Component
            type={type ?? "text"}
            id={id}
            placeholder={placeholder}
            className={className}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => commitChange(value)}
        />
    );
};
