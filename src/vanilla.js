export const create = (createState) => {
  let state;

  const listeners = new Set();

  const setState = () => {};

  const getState = () => state;

  const subscribeWithSelector = (
    listener,
    selector,
    equalityFn = Object.is
  ) => {
    const current = selector(state);

    function listenerToAdd() {
      const next = selector(state);
      
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
