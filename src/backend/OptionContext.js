import { createContext } from 'react';

const OptionContext = createContext({
  sort: 'none',
  setSort: () => {},
  distance: 0.3,
  setDistance: () => {},
});

export default OptionContext;
