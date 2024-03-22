import { useEffect, useRef } from "react";

const areDepsEqual = (prevDeps, currentDeps) => {
  if (prevDeps === null) return false;

  if (prevDeps.length !== currentDeps.length) return false;

  for (let i = 0; i < prevDeps.length; i++) {
    if (prevDeps[i] !== currentDeps[i]) return false;
  }

  return true;
};

const useMemoHook = (callback, deps) => {
    
  const memoisedRef = useRef(null);

  //   Change in deps
  if (!memoisedRef.current || !areDepsEqual(memoisedRef.current.deps, deps)) {
    memoisedRef.current = {
      value: callback(),
      deps,
    };
  }

  //   cleanup
  useEffect(() => {
    return () => {
      memoisedRef.current = null;
    };
  }, []);

  //   return the memoised value
  return memoisedRef.current.value;
};

export default useMemoHook;