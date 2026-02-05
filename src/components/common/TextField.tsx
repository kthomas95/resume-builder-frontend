import { ChangeEvent, useEffect, useState } from "react";
import { TextInput, Textarea } from "@mantine/core";

export interface TextFieldProps {
    className?: string;
    placeholder?: string;
    initialValue: string;
    commitChange: (value: string) => void;
    type?: string;
    asTextArea?: boolean;
    id?: string;
}

export const useTextFieldValue = (initialValue?: string) => {
    const [value, setValue] = useState(initialValue ?? "");
    useEffect(() => {
        setValue(initialValue ?? "");
    }, [initialValue]);

    return {
        onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValue(e.currentTarget.value),
        value,
    };
};

export const TextField = ({
    commitChange,
    initialValue,
    placeholder,
    type,
    id,
    asTextArea,
}: TextFieldProps) => {
    const inputStateProps = useTextFieldValue(initialValue);

    if (asTextArea) {
        return (
            <Textarea
                id={id}
                placeholder={placeholder}
                onBlur={() => commitChange(inputStateProps.value)}
                {...inputStateProps}
                variant="filled"
                radius="md"
                autosize
                minRows={2}
            />
        );
    }

    return (
        <TextInput
            type={type ?? "text"}
            id={id}
            placeholder={placeholder}
            onBlur={() => commitChange(inputStateProps.value)}
            {...inputStateProps}
            variant="filled"
            radius="md"
        />
    );
};