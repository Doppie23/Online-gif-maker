import { useEffect, useRef } from "react";

export default function useTimeout() {
  const timeOutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const timeOut = timeOutRef;
    return () => {
      if (timeOut.current) {
        clearTimeout(timeOut.current);
      }
    };
  }, [timeOutRef]);

  return { timeOutRef };
}
