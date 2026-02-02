import { useState } from "react";
import { buttonStyles } from "../../styles/button";

export const AreYouSureButton = ({ finalizeDelete, label }: { finalizeDelete: () => void; label?: string }) => {
    const [areYouSureDelete, setAreYouSureDelete] = useState<boolean>(false);
    const handleDelete = () => {};
    return (
        <div className={"flex gap-2 justify-end"}>
            <button
                className={"btn btn-error"}
                onClick={() => {
                    if (!areYouSureDelete) {
                        setAreYouSureDelete(true);
                    } else {
                        finalizeDelete();
                    }
                }}
            >
                {areYouSureDelete ? "Confirm Deletion" : (label ?? "Remove")}
            </button>
            {areYouSureDelete && (
                <button onClick={() => setAreYouSureDelete(false)} className={"btn btn-outline"}>
                    Don't Delete
                </button>
            )}
        </div>
    );
};
