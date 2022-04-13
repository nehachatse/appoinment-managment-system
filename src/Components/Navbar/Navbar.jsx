import styled from 'styled-components';
import styles from './Navbar.module.css';
import logo from '../../img/logo.png';
import { useNavigate } from 'react-router-dom';

const IconContainer = styled.div`
    width: 100px;
    height: 100%;
    padding-left: 50px; 
`;
const Button = styled.button`
    width: 170px;
    height: 50px;
    margin: 1.5rem 1rem 0 auto;
    cursor: pointer;
    border: 1.5px solid rgb(0,124,157); 
    border-radius: 5px;
    background: white;
    color: rgb(0,124,157);
    font-size: 1.05rem;

    &:hover{
        box-shadow: 1px 3px 15px rgb(0,124,157)
    }
    &:active{
        background: rgb(0,124,157);
        color: white;
    }
`;
export default function Navbar(){
    let navigate = useNavigate();

    return (
        <div className={styles.cont}>
            <IconContainer>
                <img src={logo} alt="logo" width='100%' />
            </IconContainer>
            <Button onClick={() => navigate("/doctor")}>Book Appoinment</Button>
        </div>
    )
}