import { createContext } from "react";

const IpType = createContext();

const IpContext = ({ children }) => {
    const ip = "10.33.12.74"; 
    return (
        <IpType.Provider value={{ ip }}>
            {children}
        </IpType.Provider>
    )
};

export { IpContext, IpType }