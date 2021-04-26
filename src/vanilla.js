export const create = () => {
  let state;

  const listeners = new Set();

  const setState = () => {};

  const getState = () => state;

  const subscribeWithSelector = () => {};

  const subscribe = () => {};

  const destroy = () => listeners.clear();

  const api = { setState, getState, subscribe, destroy };

  // state = createState()

  return api;
};
