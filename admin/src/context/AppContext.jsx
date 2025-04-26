
import { createContext } from "react";


export const AppContext = createContext()

const AppContextProvider = (props) => {

const value = {
    // doctors, 
    // currencySymbol,
    // token, setToken
}

return (
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)

}

export default AppContextProvider