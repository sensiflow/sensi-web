import * as React from "react";

export const useSSE = ({
  sseProvider,
  active,
  event,
  eventListener,
  errorListener,
  dependencies,
}: {
  sseProvider: () => EventSource | null;
  active: boolean;
  event: string;
  eventListener: (event: MessageEvent) => void;
  errorListener: (event: Event) => void;
  dependencies: any[];
}) => {
  const sseRef = React.useRef<EventSource>(null);

  const sseCleanUp = (sseRef: React.MutableRefObject<EventSource>) => {
    sseRef.current?.close();
    sseRef.current = null;
  };

  React.useEffect(() => {
    if (active && sseRef.current === null) {
      const source = sseProvider();
      sseRef.current = source;
      source.addEventListener(event, eventListener);
      source.onerror = (e) => {
        errorListener(e);
        sseCleanUp(sseRef);
      };
    } else {
      sseCleanUp(sseRef);
    }

    return () => {
      sseCleanUp(sseRef);
    };
  }, [dependencies]);
};
