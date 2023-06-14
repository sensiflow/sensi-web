import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";
import * as React from "react";
import {DialogProps} from "../../dialog/dialog-interface";
import {useForm} from "react-hook-form";
import {GroupInputDTO} from "../../../api/dto/input/group-input";
import { dialogSx } from "../../dialog/styles";
import {DescriptionConstraints, NameConstraints} from "../../../model/group";
interface CreateGroupDialogProps extends DialogProps<GroupInputDTO>{
    dialogTitle: string;
}

export const CreateGroupDialog = (
    {
        theme,
        isOpen,
        dialogTitle,
        handleClose,
        onSubmit,
    }: CreateGroupDialogProps
) => {

    const {
        reset,
        handleSubmit,
        register,
        formState: {
            isSubmitSuccessful,
            errors
        }} = useForm<GroupInputDTO>();

    React.useEffect(() => {
        reset()
    }, [isOpen]);

    return (
        <div>
            <Dialog open={isOpen} onClose={handleClose}
                    sx={dialogSx(theme)}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Name"
                            fullWidth
                            margin="normal"
                            {...register('name', { ...NameConstraints, required: 'Name is required' })}
                            error={!!errors.name}
                            helperText={errors.name?.message}
                            color='secondary'
                        />
                        <TextField
                            label="Description"
                            fullWidth
                            margin="normal"
                            {...register('description', { ...DescriptionConstraints})}
                            error={!!errors.description}
                            helperText={errors.description?.message}
                            color='secondary'
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" type="submit">
                            Submit
                        </Button>
                    </DialogActions>

                </form>
            </Dialog>
        </div>
    );
};