import * as React from "react";
import { useSSE } from "../logic/hooks/use-sse";
import { apiCore } from "../api/core";
import Obtainable from "./obtainable";

const PeopleCount = (props: {
  deviceID: number;
  toggle: boolean;
  reason: string;
}) => {
  const [peopleCount, setPeopleCount] = React.useState<number>(null);

  console.log("PeopleCount: ", props.deviceID, props.toggle, props.reason);

  useSSE({
    sseProvider: () => apiCore.getDevicePeopleCountSSE(props.deviceID),
    active: props.toggle,
    event: "people-count", // TODO: Constants
    eventListener: (event) => {
      // Event Handler
      const count = parseInt(event.data);
      console.log("People count update received: ", count);
      setPeopleCount(count);
    },
    errorListener: (error) => {
      // Error Handler
      if (error.type === "error") {
        // TODO: Send toast like error message
        setPeopleCount(null);
      }
      console.log("People count SSE connection closed. Cleaning up...");
    },
    dependencies: [props.deviceID],
  });

  return (
    <Obtainable
      value={peopleCount}
      toggle={props.toggle && peopleCount !== null}
      reason={props.reason}
    />
  );
};

export default PeopleCount;
