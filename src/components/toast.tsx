import {toast} from "react-toastify";
export enum ToastType{
    WARNING,
    INFO,
    SUCCESS,
    ERROR
}
export const appToast = (
    type: ToastType,
    content: String
) => {
    const toastOptions = {position: toast.POSITION.TOP_CENTER}
    switch (type) {
        case ToastType.WARNING:
            return toast.warning(content, toastOptions);
        case ToastType.INFO:
            return toast.info(content, toastOptions);
        case ToastType.SUCCESS:
            return toast.success(content, toastOptions);
        case ToastType.ERROR:
            return toast.error(content, toastOptions);
    }
}

