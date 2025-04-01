import { ChangeEvent, HTMLInputTypeAttribute, useEffect, useState } from "react";

export interface TextFieldProps {
    className?: string;
    placeholder?: string;
    initialValue: string;
    commitChange: (value: string) => void;
    type?: HTMLInputTypeAttribute;
    asTextArea?: boolean;
    id?: string;
}

export const useTextFieldValue = (initialValue?: string) => {
    const [value, setValue] = useState(initialValue ?? "");
    useEffect(() => {
        setValue(initialValue ?? value);
    }, [initialValue]);

    return {
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.target.value),
        value,
    };
};

export const TextField = ({
    className,
    commitChange,
    initialValue,
    placeholder,
    type,
    id,
    asTextArea,
}: TextFieldProps) => {
    const inputStateProps = useTextFieldValue(initialValue);

    const Component = asTextArea ? "textarea" : "input";

    return (
        <Component
            type={type ?? "text"}
            id={id}
            placeholder={placeholder}
            className={className}
            onBlur={() => commitChange(inputStateProps.value)}
            {...inputStateProps}
        />
    );
};
