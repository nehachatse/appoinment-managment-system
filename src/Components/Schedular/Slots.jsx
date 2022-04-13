import styles from './Schedular.module.css';

export default function Slots({data, selectedSlot}){
    const onSelect = (e) => {
        e.target.style.backgroundColor = 'rgb(0,124,157)';
        selectedSlot(data)
    }
    return(
        <div className={styles.slot} onClick={(e) => onSelect(e)}>
            {data}
        </div>
    )
}