import React, { createContext } from 'react';

const Context = createContext();

interface Props {
  children: string | Node;
  value: Record<string, unknown>;
}

const Provider = ({ children, value }: Props) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);

export default Context;

export { Provider };
