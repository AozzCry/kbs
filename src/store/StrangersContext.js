import React, { createContext, useState, useCallback } from "react";

import useHttp from "../hooks/useHttp";

const StrangersContext = createContext({
  strangers: [],
  setStrangers: () => {},
  getStrangers: () => {},
  strangersIsLoading: null,
  strangersError: null,
});

export const StrangersContextProvider = (props) => {
  const [strangers, setStrangers] = useState([]);

  const {
    error: strangersError,
    isLoading: strangersIsLoading,
    sendRequest: strangersRequest,
  } = useHttp();

  const getStrangers = useCallback(
    async (inputValue) => {
      const strangers = await strangersRequest({
        url: "/api/users/search",
        method: "POST",
        body: { str: inputValue },
      });
      setStrangers(strangers);
      if (!strangers) setStrangers([]);
    },
    [strangersRequest]
  );

  return (
    <StrangersContext.Provider
      value={{
        strangers,
        setStrangers,
        getStrangers,
        strangersError,
        strangersIsLoading,
      }}
    >
      {props.children}
    </StrangersContext.Provider>
  );
};

export default StrangersContext;
