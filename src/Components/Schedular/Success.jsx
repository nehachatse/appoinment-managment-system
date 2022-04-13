import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AvailabilityContext } from "../../Context/AvailabilityProvider";
import { Button } from "./Schedular";
import styles from './Schedular.module.css';

export default function Success(){
    let {booked} = useContext(AvailabilityContext);
    let navigate = useNavigate();
    return(
        <div className={styles.success}>
            <h2>Booked Appoinment Successfully!</h2>
            <div>
                <p>Your appoinment for <span> {booked.Cause}</span> has been booked on <span>{booked.Date} </span>between <span>{booked.Slot}</span><br/>
                 with <span>{booked.Name}</span>.<br/>
                </p>
                <h3>Thank you.</h3>
            </div>
            <Button onClick={() => navigate('/')}>GO TO HOME</Button>
        </div>
    )
}