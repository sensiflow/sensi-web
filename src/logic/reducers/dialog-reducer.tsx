export type DialogReducerAction<T> =
    {
      type: "open",
      target: T
    }
    |
    {
      type: "close",
      target: T
    }

export type DialogReducerState = {
    [key: string]: boolean
}

/**
 * Generic reducer for dialogs
 * 
 * @param T an enum of dialog keys
 * @param S the state of the reducer
 * @param state the state of the reducer
 * @param action the action to be dispatched
 * @param dialogsAssociation an object that maps the enum keys to the state keys
 * @returns 
 */
export const DialogReducer = <T extends string,S extends DialogReducerState>(state : S, action: DialogReducerAction<T> , dialogsAssociation) => {

    const isOpen = action.type === "open" ? true : false;
    const target = action.target;
    const dialogKey = dialogsAssociation[target];

    return {
        ...state,
        [dialogKey]: isOpen
    }
}
