import React from 'react'
import styles from "./styles.module.css"

const Loader1 = () => {
    return (
        <div id="container" className={styles.wrapper}>
            <svg viewBox="0 0 100 100">
                <defs>
                    <filter id="shadow">
                        <feDropShadow dx="0" dy="0" stdDeviation="1.5" 
                            floodColor="#fc6767"/>
                    </filter>
                </defs>
                <circle className={styles.spinner} cx="50" cy="50" r="45"/>
            </svg>
        </div>
    )
}

export default Loader1
