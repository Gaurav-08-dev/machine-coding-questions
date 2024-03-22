import { useRef } from "react";
const useEffectHook = (effect, deps) => {
  const isFirstRender = useRef(true);
  const prevDeps = useRef([]);

  //   first render

  if (isFirstRender.current) {
    isFirstRender.current = false;
    const cleanup = effect();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }

  // when deps changes or no deps array

  const depsChanged = deps
    ? JSON.stringify(deps) !== JSON.stringify(prevDeps.current)
    : true;

  if (depsChanged) {
    const cleanup = effect();
    return () => {
      if (cleanup && typeof cleanup === "function" && deps) {
        cleanup();
      }
    };
  }

  prevDeps.current = deps || [];
};

export default useEffectHook;
