
/**
 * The sidebar-resize event is fired when the sidebar is resized by the user,
 * this happens when the user clicks the resize button on the sidebar.
 * 
 * The detail allows to carry information about the event, in this case the delay to perform an action.
 * The bubble option is set to true so that the event is propagated to the window.
 */
export const sidebarEventName = 'sidebar-resize';

export interface ISideBarData {
    delay: number;
  }