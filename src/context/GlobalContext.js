import { createContext } from 'react';

const globalInitialState = {
  photos: [],
};
const GlobalContext = createContext(globalInitialState);

export { GlobalContext, globalInitialState };
