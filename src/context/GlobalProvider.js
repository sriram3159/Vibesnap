import { useReducer, useCallback, useMemo } from "react";
import GlobalReducer from "./GlobalReducer.js";
import { GlobalContext, globalInitialState } from "./GlobalContext.js";
import { GLOBAL_REDUCER_ACTIONS } from "../constants/actionTypes.js";

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, globalInitialState);

  const setPhotos = useCallback((photos) => {
    dispatch({
      type: GLOBAL_REDUCER_ACTIONS.SET_PHOTOS,
      payload: photos,
    });
  }, []);

  const contextData = useMemo(
    () => ({
      photos: state.photos,
      setPhotos,
    }),
    [state.photos]
  );

  return <GlobalContext.Provider value={contextData}>{children}</GlobalContext.Provider>;
};

export { GlobalContext, GlobalProvider };
