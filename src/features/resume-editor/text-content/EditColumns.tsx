import { ColumnsFragment } from "../../../__generated__/graphql";
import { Group, Stack } from "@mantine/core";
import { TextField } from "../../common/TextField";
import { ContentUpdater } from "../../../types";
import * as React from "react";
import { useContext } from "react";

import { useUpdateTextContent } from "./text-content-context";

export const EditColumns = (props: ColumnsFragment) => {
    const onUpdate = useUpdateTextContent();
    const columnItems = props.columnItems || [];
    return (
        <Group grow align="flex-start">
            {columnItems.map((col: any, colIndex: number) => (
                <Stack key={colIndex} gap="xs">
                    <TextField
                        label="Column Label"
                        initialValue={col.label}
                        commitChange={(val) => {
                            const newColumns = [...columnItems];
                            newColumns[colIndex] = { ...col, label: val };
                            onUpdate({
                                type: ContentUpdater.Type.UpdateColumns,
                                items: newColumns,
                            });
                        }}
                    />
                    {col.items?.map((item: string, itemIndex: number) => (
                        <TextField
                            key={itemIndex}
                            initialValue={item}
                            commitChange={(val) => {
                                const newItems = [...col.items];
                                newItems[itemIndex] = val;
                                const newColumns = [...columnItems];
                                newColumns[colIndex] = { ...col, items: newItems };
                                onUpdate({
                                    type: ContentUpdater.Type.UpdateColumns,
                                    items: newColumns,
                                });
                            }}
                        />
                    ))}
                </Stack>
            ))}
        </Group>
    );
};
