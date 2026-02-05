import { AttributeType } from "../../graphql/graphql-types";
import { resumeContext } from "./resume-context";
import { useContext } from "react";
import { Mail, Phone, Home } from "lucide-react";
import { 
    TextInput, 
    Stack, 
    Group, 
    Text, 
    rem 
} from "@mantine/core";

const AttributeIcons: Record<AttributeType, any> = {
    Address: Home,
    Email: Mail,
    Phone: Phone,
};

export const EditAttributes = () => {
    const { attributes, updateResume } = useContext(resumeContext);

    return (
        <Stack gap="sm" maw={1000} mx="auto" w="100%">
            {attributes.map((attribute) => {
                const IconComponent = AttributeIcons[attribute.name];
                return (
                    <TextInput
                        key={attribute.name}
                        label={attribute.name}
                        leftSection={<IconComponent size={16} />}
                        value={attribute.value}
                        onChange={(e) => {
                            const value = e.currentTarget.value;
                            if (attribute.name.includes("Phone")) {
                                updateResume({ phoneNumber: value });
                            }

                            if (attribute.name.includes("Email")) {
                                updateResume({ email: value });
                            }

                            if (attribute.name.includes("Address")) {
                                updateResume({ address: value });
                            }
                        }}
                        variant="filled"
                        radius="md"
                    />
                );
            })}
        </Stack>
    );
};