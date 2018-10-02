import Immutable from 'seamless-immutable';

/**
 * Global state structure
 */
export const GlobalState = Immutable({
    count: 0,
    error: false,
    lastUpdate: 0,
    light: false,
    placeholderData: [],
  });
