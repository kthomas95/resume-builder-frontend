import { Button } from "@mantine/core";
import { Download } from "lucide-react";
import * as React from "react";

export const BuildPdfButton = (props: { id: string }) => {
    return (
        <Button
            component="a"
            href={`${import.meta.env.VITE_BUILD_RESUME_URL}${props.id}`}
            target="_blank"
            size="lg"
            radius="xl"
            leftSection={<Download size={20} />}
            style={{ boxShadow: "var(--mantine-shadow-xl)" }}
        >
            Build PDF
        </Button>
    );
};
