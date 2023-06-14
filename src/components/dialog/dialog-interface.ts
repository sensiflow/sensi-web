import { Theme } from "@mui/material";

export interface DialogProps<T> {
    isOpen: boolean
    handleClose: () => void
    onSubmit: (input: T) => void
    theme: Theme
}