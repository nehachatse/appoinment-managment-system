import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styles from '../DoctorMeta/Doctor.module.css';
import { AvailabilityContext } from "../../Context/AvailabilityProvider";
import loading from '../../img/Scanning.gif';

export default function History(){
    let {doctor} = useContext(AvailabilityContext);
    const [history, setHistory] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect( () => {
        axios.get(`https://apollo-database.herokuapp.com/appoitments`)
        .then(res => (
            setLoading(false),
            filteredHistory(res.data)
        ))
        .catch(err => console.log(err));
    }, [])

    const filteredHistory = (data) => {
        let filteredData = data.filter( (ele) => ele.Name == doctor.name);
        setHistory(filteredData);
    }

    return isLoading ? <img src={loading} alt="gif" width="100px" style={{marginTop:"30%"}}/> : (
        <div>
            <h2>Doctor Name: {doctor.name}</h2>
            <h3>Total Appoinments: {history.length}</h3>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Slot</th>
                        <th>Cause</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        history?.map( (his, ind) => (
                            <tr key={ind}>
                                <td>{his.Date}</td>
                                <td> {his.Slot} </td>
                                <td>{his.Cause}</td>
                            </tr>
                        ) ) 
                    }
                </tbody>
            </table>
        </div>
    )
}