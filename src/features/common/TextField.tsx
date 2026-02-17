import { ChangeEvent, CSSProperties, useEffect, useState } from "react";
import { TextInput, Textarea } from "@mantine/core";

export interface TextFieldProps {
    className?: string;
    placeholder?: string;
    initialValue: string;
    commitChange: (value: string) => void;
    type?: string;
    asTextArea?: boolean;
    id?: string;
    label?: string;
    style?: CSSProperties;
    size?: string;
    fw?: number | string;
    variant?: string;
    styles?: any;
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
    label,
    style,
    size,
    fw,
    variant,
    styles,
}: TextFieldProps) => {
    const inputStateProps = useTextFieldValue(initialValue);

    if (asTextArea) {
        return (
            <Textarea
                id={id}
                label={label}
                placeholder={placeholder}
                onBlur={() => commitChange(inputStateProps.value)}
                {...inputStateProps}
                variant={variant ?? "filled"}
                radius="md"
                autosize
                minRows={2}
                style={style}
                size={size}
                fw={fw}
                styles={styles}
            />
        );
    }

    return (
        <TextInput
            type={type ?? "text"}
            id={id}
            label={label}
            placeholder={placeholder}
            onBlur={() => commitChange(inputStateProps.value)}
            {...inputStateProps}
            variant={variant ?? "filled"}
            radius="md"
            style={style}
            size={size}
            fw={fw}
            styles={styles}
        />
    );
};