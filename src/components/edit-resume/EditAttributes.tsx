import { AttributeType, BuildResumeRequest } from "../../graphql/graphql-types";
import { resumeContext } from "./resume-context";
import { useContext } from "react";
import { TextField } from "../common/TextField";
import { textFieldStyles } from "../../styles/textfield";
import { AtSymbolIcon, DevicePhoneMobileIcon, HomeIcon } from "@heroicons/react/24/outline";
import { joinStrings } from "../../styles/join-strings";

const AttributeIcons: Record<AttributeType, typeof AtSymbolIcon> = {
    Address: HomeIcon,
    Email: AtSymbolIcon,
    Phone: DevicePhoneMobileIcon,
};

export const EditAttributes = () => {
    const { attributes, updateResume } = useContext(resumeContext);

    return (
        <div className={"flex flex-col gap-4 container mx-auto"}>
            {attributes.map((attribute) => {
                const IconComponent = AttributeIcons[attribute.name];
                return (
                    <fieldset key={attribute.name} className={joinStrings(["inline-flex gap-2 items-center"])}>
                        <label
                            htmlFor={attribute.name}
                            className={textFieldStyles.label({ class: "w-24 text-center" })}
                        >
                            {attribute.name}
                        </label>
                        <div
                            className={textFieldStyles.input({
                                variant: "withIcon",
                                class: "w-full",
                            })}
                        >
                            {<IconComponent className={textFieldStyles.icon()} />}
                            <TextField
                                id={attribute.name}
                                className={textFieldStyles.inputWithIcon()}
                                commitChange={(value) => {
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
                                initialValue={attribute.value}
                            />
                        </div>
                    </fieldset>
                );
            })}
        </div>
    );
};
