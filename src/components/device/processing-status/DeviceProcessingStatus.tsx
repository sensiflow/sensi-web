import * as React from "react";
import GreenOnlineCircle from "./green_online_circle";
import RedOfflineSquare from "./red_offline_square";
import YellowPausedRectangles from "./yellow_paused_state";
import { DeviceProcessingState } from "../../../model/device";
import ThreeDotsPendingAnimation from "./ThreeDotsPendingAnimation";

export default function DeviceProcessingStatus(props: {
  state: DeviceProcessingState;
  fontSize?: "small" | "medium" | "large";
}) {
  switch (props.state) {
    case DeviceProcessingState.ACTIVE:
      return <GreenOnlineCircle fontSize={props.fontSize ?? "small"} />;
    case DeviceProcessingState.INACTIVE:
      return <RedOfflineSquare fontSize={props.fontSize ?? "small"} />;
    case DeviceProcessingState.PAUSED:
      return <YellowPausedRectangles fontSize={props.fontSize ?? "small"} />;
    case DeviceProcessingState.PENDING:
      return <ThreeDotsPendingAnimation fontSize={props.fontSize ?? "small"} />;
  }
}
