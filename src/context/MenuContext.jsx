import React, { useState } from "react";

export const Context = React.createContext();
export const ContextProvider = ({ children }) => {
    const [menuActive, setMenuActive] = useState(false);

    return (
        <Context.Provider value={{menuActive, setMenuActive }}>
            {children}
        </Context.Provider>
    );
};