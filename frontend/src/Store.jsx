import React, { createContext, useReducer } from "react";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  empInfo: localStorage.getItem("empInfo")
    ? JSON.parse(localStorage.getItem("empInfo"))
    : null,
  mode: localStorage.getItem("mode")
    ? localStorage.getItem("mode")
    : window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light",
};

function reducer(state, action) {
  switch (action.type) {
    case "SWITCH_MODE":
      localStorage.setItem("mode", state.mode === "dark" ? "light" : "dark");
      return { ...state, mode: state.mode === "dark" ? "light" : "dark" };
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "EMPLOYEE_SIGNIN":
      return { ...state, empInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        mode:
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
      };
      case "EMPLOYEE_SIGNOUT":
        return {
          mode:
            window.matchMedia &&
            window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light",
        };
    default:
      return state;
  }
}

const Store = createContext({
  state: initialState,
  dispatch: () => initialState,
});

function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }} {...props} />;
}

export { Store, StoreProvider };
