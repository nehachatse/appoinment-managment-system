import styles from './Home.module.css';

export default function Home(){
    return (
        <div className={styles.cont}>
            <h2>Welocome to Apollo Hospital!</h2>
            <h3 style={{marginTop: "3rem"}}>You can book your Appoitment to doctor by simply following below steps.</h3>
            <div>
                <ol>
                    <li>Go to Book Apointment Tab on top right corner of the page.</li>
                    <li>There will be doctor list, click on book appoinment infront of require doctor.</li>
                    <li>Select date from calender</li>
                    <li>Choose available time slot</li>
                    <li>And finally click on Book to book appoinment</li>
                </ol>
            </div>
            
        </div>
    )
}