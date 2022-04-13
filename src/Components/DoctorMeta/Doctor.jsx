import axios from 'axios';
import styles from './Doctor.module.css';
import { useEffect, useState } from 'react';
import DoctorMeta from './DoctorMeta';
import loading from '../../img/Scanning.gif';

export default function Doctor(){
    const [doctorsData, setDoctorsData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect( () => {
        axios.get('https://apollo-database.herokuapp.com/doctors')
        .then( (res) => (
            setLoading(false),
            setDoctorsData(res.data)
        ))
        .catch( err => console.log(err));
    }, [])

    return isLoading ? <img src={loading} alt="gif" width="100px" style={{marginTop:"30%"}}/> : (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>DOCTOR NAME</th>
                        <th>SPECIALITY</th>
                        <th>AVAILABILITY</th>
                        <th>FEES</th>
                        <th>HISTORY</th>
                        <th>APPOINMENT</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        doctorsData.map( (doctor, index) => <DoctorMeta doctor={doctor} key={index} />)
                    }
                </tbody>
            </table>
        </div>
    )
}