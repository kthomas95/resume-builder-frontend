import * as React from "react";
import { ResumeTextFragment } from "../../../__generated__/graphql";
import { EditParagraph } from "./EditParagraph";
import { EditBulletPoints } from "./EditBulletPoints";
import { EditColumns } from "./EditColumns";
import { TextContentIndexContext } from "./text-content-context";

interface TextContentEditorProps {
    text: ResumeTextFragment;
}

export const TextContentEditor = ({ text, index }: TextContentEditorProps & { index: number }) => {
    return (
        <TextContentIndexContext value={index}>
            {text.__typename === "Paragraph" && <EditParagraph {...text} />}
            {text.__typename === "BulletPoints" && <EditBulletPoints {...text} />}
            {text.__typename === "Columns" && <EditColumns {...text} />}
        </TextContentIndexContext>
    );
};
// export const RenderTextContent = ({ contentItems }: { contentItems: ResumeTextFragment[] }) => (
//     <Stack gap="md">
//         {contentItems?.map((content, index) => <TextContentEditor key={index} text={content} index={index} />)}
//     </Stack>
// );
