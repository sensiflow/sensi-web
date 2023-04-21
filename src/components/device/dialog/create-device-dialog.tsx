import { useForm } from 'react-hook-form';
import * as React from 'react';
import { DeviceInputDTO } from '../../../api/dto/input/device-input';
import { DeviceDialogProps } from './device-dialog-interface';
import DeviceDialog from './device-dialog';

export const CreateDeviceDialog = (
    { isOpen, handleClose, onSubmit, theme }: DeviceDialogProps 
) => {
  
  const form = useForm<DeviceInputDTO>()
  const { reset,  formState: { isSubmitSuccessful }} = form;

  React.useEffect(() => {
      if(isSubmitSuccessful){
        reset() 
      }
  }, [isSubmitSuccessful, reset]);

  return (
    <DeviceDialog
      dialogTitle="Add Device"
      isOpen={isOpen}
      handleClose={handleClose}
      onSubmit={onSubmit}
      theme={theme}
      requiredTextFields={["name", "description", "streamUrl"]}
      defaultValues={{} as DeviceInputDTO}
    />
  );
};

export default CreateDeviceDialog;