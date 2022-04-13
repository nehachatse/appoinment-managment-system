import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {AvailabilityContext} from '../../Context/AvailabilityProvider';
import styles from './Doctor.module.css';

export default function DoctorMeta({doctor}){
    let navigate = useNavigate();
    let {setDoctor} = useContext(AvailabilityContext);

    const scheduleAppoinment = (data) => {
        setDoctor(data)
        navigate('/schedule')
    }

    const appoinmentHistory = (data) => {
        setDoctor(data)
        navigate('/history')
    }

    return (
        <tr>
            <td>{doctor.name}</td>
            <td> {doctor.speciality.join(", ")} </td>
            <td> {doctor.duration} </td>
            <td> Rs. {doctor.cost} </td>
            <td onClick={() => appoinmentHistory(doctor)} className={styles.view}>View</td>
            <td onClick={() => scheduleAppoinment(doctor)} className={styles.book}>Book</td>
        </tr>
    )
}