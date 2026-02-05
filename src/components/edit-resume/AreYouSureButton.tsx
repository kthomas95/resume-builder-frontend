import { useState } from "react";
import { Button, Group } from "@mantine/core";
import { Trash2, X, Check } from "lucide-react";

export const AreYouSureButton = ({ finalizeDelete, label }: { finalizeDelete: () => void; label?: string }) => {
    const [areYouSureDelete, setAreYouSureDelete] = useState<boolean>(false);
    
    return (
        <Group gap="xs">
            <Button
                color="red"
                variant={areYouSureDelete ? "filled" : "light"}
                leftSection={areYouSureDelete ? <Check size={16} /> : <Trash2 size={16} />}
                onClick={() => {
                    if (!areYouSureDelete) {
                        setAreYouSureDelete(true);
                    } else {
                        finalizeDelete();
                    }
                }}
            >
                {areYouSureDelete ? "Confirm Deletion" : (label ?? "Remove")}
            </Button>
            
            {areYouSureDelete && (
                <Button 
                    variant="default" 
                    leftSection={<X size={16} />}
                    onClick={() => setAreYouSureDelete(false)}
                >
                    Cancel
                </Button>
            )}
        </Group>
    );
};