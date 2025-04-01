import React, { createContext, useState, useEffect, useMemo } from "react";

export const MesContext = createContext(null);

const MesContextProvider = ({ children }) => {
    // const backend_url = "https://dochaki-mes-backend.onrender.com";
    const backend_url = "http://localhost:10019";
    const [rawMaterials, setRawMaterials] = useState([]);
    const [loginSignup, setLoginSignup] = useState(true);
    const [userData, setUserData] = useState({});
    const [token, setToken] = useState(() => JSON.parse(localStorage.getItem("authToken")));

    useEffect(() => {
        const handleStorageChange = () => {
            setToken(JSON.parse(localStorage.getItem("authToken")));
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    const readDate = (date) =>
        new Date(date).toLocaleString("en-IN", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

    const contextValue = useMemo(() => ({
        backend_url,
        rawMaterials,
        setRawMaterials,
        readDate,
        loginSignup,
        setLoginSignup,
        userData,
        setUserData,
        token,
        setToken,  // Allow token updates dynamically
    }), [backend_url, rawMaterials, loginSignup, userData, token]);

    return (
        <MesContext.Provider value={contextValue}>
            {children}
        </MesContext.Provider>
    );
};

export default MesContextProvider;
