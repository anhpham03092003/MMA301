import { createContext } from "react";

const IpType = createContext();

const IpContext = ({ children }) => {
    const ip = "192.168.67.102"; 
    return (
        <IpType.Provider value={{ ip }}>
            {children}
        </IpType.Provider>
    )
};

export { IpContext, IpType }