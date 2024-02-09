import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    currentUser: null,
    token: null,
    notification: null,
    setUser: () => {},
    setAccount: () => {},
    setToken: () => {},
    setNotification: () => {},
    setPersons: () => {},
    setIsLoading: () => {},
});

export const ContextProvider = ({ children }) => {
    const [persons, setPersons] = useState({});
    const [user, setUser] = useState({});
    const [account, setAccount] = useState({});
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
    const [notification, _setNotification] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const setToken = (token) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    const setNotification = (message) => {
        _setNotification(message);

        setTimeout(() => {
            _setNotification("");
        }, 5000);
    };

    return (
        <StateContext.Provider
            value={{
                user,
                setUser,
                account,
                setAccount,
                token,
                setToken,
                notification,
                setNotification,
                persons,
                setPersons,
                isLoading,
                setIsLoading,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
