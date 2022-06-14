import React, { useCallback, useEffect, useState } from 'react';

let logoutTimer;

const AppContext = React.createContext({
  token: '',
  isLoggedIn: false,
  login: token => {},
  logout: () => {},
});

const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('token');
  const storedExpirationDate = localStorage.getItem('expirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AppContextProvider = props => {
  const [authVis, setAuthVis] = useState(false);
  const [theme, setTheme] = useState(false);
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [userKey, setUserKey] = useState(localStorage.getItem('userKey'));
  const tokenData = retrieveStoredToken();

  let initialToken;
  if (tokenData) initialToken = tokenData.token;

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const usernameSetter = username => {
    setUsername(username);
  };

  const userKeySetter = key => {
    setUserKey(key);
  };

  const toggleAuthVis = () => {
    setAuthVis(!authVis);
  };

  const themeToggler = () => {
    setTheme(!theme);
  };

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');

    if (logoutTimer) clearTimeout(logoutTimer);
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }

    localStorage.setItem('username', username);
    localStorage.setItem('userKey', userKey);
  }, [tokenData, logoutHandler, username]);

  const contextValue = {
    authVis,
    toggleAuthVis,
    theme,
    themeToggler,
    username,
    usernameSetter,
    userKey,
    userKeySetter,
    token,
    userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContext;
