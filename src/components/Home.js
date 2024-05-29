import React from 'react';
import styles from './Home.module.css'; 
import heroImage from '../hero.webp';

function Home() {
    return (
        <div className={styles.homeContainer}>
            <div className={styles.heroSection}>
                <img src={heroImage} alt="Hero" className={styles.heroImage} />
                <div className={styles.heroText}>
                </div>
            </div>
            <div className={styles.cardsContainer}>
                <div className={styles.card}>
                    <h2>Rent a Home</h2>
                    <p>Find the perfect rental property for you and your family.</p>
                </div>
                <div className={styles.card}>
                    <h2>Buy a Home</h2>
                    <p>Explore listings to buy your dream home.</p>
                </div>
                <div className={styles.card}>
                    <h2>Sell a Home</h2>
                    <p>Get the best value for your property.</p>
                </div>
            </div>
        </div>
    );
}

export default Home;



