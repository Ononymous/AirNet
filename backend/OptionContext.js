import { createContext } from 'react';

const OptionContext = createContext({
    sort: 'none',
    setSort: () => {},
    distance: 0.1,
    setDistance: () => {},
});

export default OptionContext;