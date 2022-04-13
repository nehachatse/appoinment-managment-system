import {Routes, Route } from 'react-router-dom';
import Doctor from '../Components/DoctorMeta/Doctor';
import Home from '../Components/Home/Home';
import Schedular from '../Components/Schedular/Schedular';
import Success from '../Components/Schedular/Success';
import History from '../Components/History/History';
export default function Router(){
    return (
        <Routes>
            <Route path='/' element={ <Home/>} />
            <Route path='/doctor' element={ <Doctor/>} />
            <Route path='/schedule' element={ <Schedular/>}/>
            <Route path='/success' element={<Success/>} />
            <Route path='/history' element={<History/>} />
        </Routes>
    )
}