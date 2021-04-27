export const create = (createState) => {
  let state;

  const listeners = new Set();

  const setState = (partial, replace) => {
    const next = typeof partial === "function" ? partial(state) : partial;
    if (next !== state) {
      const prev = state;
      state = replace ? next : Object.assign({}, state, next);

      listeners.forEach((listener) => listener(state, prev));
    }
  };

  const getState = () => state;

  const subscribeWithSelector = (
    listener,
    selector,
    equalityFn = Object.is
  ) => {
    const current = selector(state);

    function listenerToAdd() {
      const next = selector(state);

      if (!equalityFn(current, next)) {
        const previous = current;
        listener((current = next), previous);
      }
    }

    listeners.add(listenerToAdd);
    return () => listeners.delete(listenerToAdd);
  };

  const subscribe = (listener, selector, equalityFn) => {
    if (selector || equalityFn) {
      return subscribeWithSelector(listeners, selector, equalityFn);
    }

    listeners.add(listener);
    return () => listeners.delete(listener);
  };

  const destroy = () => listeners.clear();

  const api = { setState, getState, subscribe, destroy };

  state = createState(setState, getState, api);

  return api;
};
