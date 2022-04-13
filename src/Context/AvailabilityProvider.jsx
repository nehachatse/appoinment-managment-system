import { createContext, useState} from "react"

export const AvailabilityContext = createContext();

export default function AvailabilityProvider({children}){
    const [doctor, setDoctor] = useState(undefined);
    const [booked, setBooked] = useState({});

    return(
        <AvailabilityContext.Provider value={{doctor, setDoctor, booked, setBooked}}> 
            {children}
        </AvailabilityContext.Provider>
    )
}