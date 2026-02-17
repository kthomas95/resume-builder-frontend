import { ChangeEvent, CSSProperties, InputHTMLAttributes, useEffect, useState } from "react";
import { TextInput, Textarea, InputVariant } from "@mantine/core";
import { useDebounce } from "react-use";
import { useDebouncedValue } from "@mantine/hooks";

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
    variant?: InputVariant;
    styles?: any;
}

export interface UseTextFieldValueResult {
    inputProps: Pick<InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, "value" | "onChange" | "onBlur">;
    isUpdated: boolean;
}

export const useTextFieldValue = (
    serverValue: string,
    delay: number,
    commitChange: (value: string) => void,
): UseTextFieldValueResult => {
    const [value, setValue] = useState(serverValue);

    const [debouncedLocalValue] = useDebouncedValue(value, delay);

    useEffect(() => {
        if (serverValue !== value) {
            commitChange(value);
        }
    }, [debouncedLocalValue]);

    useEffect(() => {
        setValue(serverValue);
    }, [serverValue]);

    return {
        inputProps: {
            onChange: (e) => setValue(e.currentTarget.value),
            value,
            onBlur: () => commitChange(value),
        },
        isUpdated: serverValue === value,
    };
};

/**
 * @deprecated Use regular input components with [[useTextFieldValue]]
 */
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
    const { inputProps } = useTextFieldValue(initialValue, 500, commitChange);

    if (asTextArea) {
        return (
            <Textarea
                id={id}
                label={label}
                placeholder={placeholder}
                {...inputProps}
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
            {...inputProps}
            variant={variant ?? "filled"}
            radius="md"
            style={style}
            size={size}
            fw={fw}
            styles={styles}
        />
    );
};
