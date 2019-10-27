import React from 'react';

const LanguageContext = React.createContext();

export const LanguageContextProvider = props => {
  const {t, children} = props;

  return (
    <LanguageContext.Provider value={{t: t}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const withLanguageContext = ChildComponent => props => (
  <LanguageContext.Consumer>
    {context => <ChildComponent {...props} t={context} />}
  </LanguageContext.Consumer>
);
