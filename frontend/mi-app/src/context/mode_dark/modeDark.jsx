import React, { createContext, useReducer, useState } from 'react';

export const ModeDarkContext = createContext({
    darkMode: false,
    setDarkMode: () => {},
});


export const ModeDarkContextProvider = ({ children }) => {
    const [darkModeContext, setDarkModeContext] = useState(false);
    console.log(darkModeContext);
    const values = {
        darkModeContext,
        setDarkModeContext,
    };

    return (
        <ModeDarkContext.Provider value={values}>
            {children}
        </ModeDarkContext.Provider>
    );
    
};