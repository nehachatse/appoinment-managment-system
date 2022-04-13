import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './Schedular.module.css';
import { useContext, useEffect, useRef, useState } from 'react';
import { AvailabilityContext } from '../../Context/AvailabilityProvider';
import axios from 'axios';
import Slots from './Slots';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import loading from '../../img/Scanning.gif';

export const Button = styled.button`
    width: 150px;
    height: 40px;
    // margin: 1.5rem 1rem 0 auto;
    cursor: pointer;
    border: 1.5px solid rgb(0,124,157); 
    border-radius: 5px;
    background: white;
    color: rgb(0,124,157);
    font-size: 1.05rem;

    &:hover{
        background: rgb(0,124,157);
        color: white;
    }
    
`;

export default function Schedular(){
    let {doctor, setBooked} = useContext(AvailabilityContext);
    const [date, setDate] = useState(new Date());
    const [isLoading, setLoading] = useState(true);
    const [appHistory, setAppHistory] = useState([]);
    const [availSlot, setAvailSlot] = useState([]);
    const [appoinment, setAppoinment] = useState({"slot": "", "cause": ""});
    const [msg, setMsg] = useState(false);
    let navigate = useNavigate();

    useEffect( () => {
        axios.get('http://localhost:3000/appoitments')
        .then(res => ( 
            setLoading(false),
            setAppHistory(res.data) 
        ))
        .catch( err => console.log(err) )
    }, [])

    useEffect( () => {
        filterHistory();
    }, [date, appHistory])

    // console.log("history=", appHistory)
    const filterHistory = () => {
        console.log("===", appHistory)
        let reqDoctor = appHistory?.filter( ele =>(    
            console.log(doctor.name, ele.Name,ele.Date,date.toDateString(), doctor.name == ele.Name, ele.Date == date.toDateString()), 
            doctor.name == ele.Name && ele.Date == date.toDateString() 
        ));
        console.log("reqDoctor", reqDoctor)
        if(reqDoctor.length > 0){
            let filled_slots = [];
            for(let slot of reqDoctor){
                filled_slots.push(slot.Slot)
            }
            // console.log(filled_slots)
            let filteredSlots = [];
            for(let slot of doctor.slots){
                if(filled_slots.includes(slot)){
                    continue;
                }
                filteredSlots.push(slot);
            }
            if(filteredSlots.length == 0){
                setMsg(true);
            }
        
            setAvailSlot(filteredSlots)
        }
        else{
            setMsg(false)
            setAvailSlot(doctor.slots);
        }
    }
    const selectedSlot = (slot) => {

        setAppoinment( { ...appoinment, ["slot"]: slot })
    }
    const selectedCause = (e) => {
        
        setAppoinment( {...appoinment, ["cause"]: e.target.value} );
    }
    const bookAppoinment = () => {
        if(appoinment.cause == "" || appoinment.slot == ""){
            alert("Please select")
        }
        else{
            let payload = {
                "doctor_id": doctor.id,
                "Name": doctor.name,
                "Date" : date.toDateString(),
                "Slot": appoinment.slot,
                "Cause": appoinment.cause
            }
            setBooked(payload);

            axios.post("https://apollo-database.herokuapp.com/appoitments", payload)
            .then(res => navigate('/success'))
            .catch(err => console.log(err))
        }
    }

    return isLoading ? <img src={loading} alt="gif" width="100px" style={{marginTop:"30%"}}/> : (
        <div>
            <div style={{ width:"50%", margin:"10px auto"}}><Calendar onChange={setDate} value={date}/> </div>
            {msg && <h3>Appoinment is not available for <span>{date.toDateString()}</span>, Please try to select another date.</h3> }
            
            <div style={{width:"75%", margin:"50px auto"}}>
                <h3>Select Slot</h3>
                <div style={{display:"flex", flexWrap:"wrap"}}>             
                    {     
                        availSlot.map( (slot, ind) => <Slots data={slot} selectedSlot={selectedSlot} key={ind}/>)
                        // : <h3>Appoinment is not available for {date}, Please try to select another date.</h3>
                    }
                </div>
            </div>
            

            <select onChange={(e) => selectedCause(e)} className={styles.select}>
                <option value="">Select Cause</option>
                {
                    doctor.speciality.map( (spec) => <option value={spec} key={spec}>{spec}</option>)
                }
            </select>
            <Button onClick={bookAppoinment}>BOOK</Button>
        </div>
    )
}