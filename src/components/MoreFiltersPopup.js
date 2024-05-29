import React from 'react';
import styles from './MoreFiltersPopup.module.css';

const MoreFiltersPopup = ({ filters, handleChange, handleSearch, closePopup }) => {
    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button className={styles.closeButton} onClick={closePopup}>×</button>
                <div className={styles.filterItem}>
                    <label className={styles.label}>
                        Bedrooms:
                        <input type="number" name="bedrooms" 
                        value={filters.bedrooms} onChange={handleChange} 
                        placeholder="Any" className={styles.input} />
                    </label>
                </div>
                <div className={styles.filterItem}>
                    <label className={styles.label}>
                        Bathrooms:
                        <input type="number" name="bathrooms" 
                        value={filters.bathrooms} onChange={handleChange} 
                        placeholder="Any" className={styles.input} />
                    </label>
                </div>
                <div className={styles.filterItem}>
                    <label className={styles.label}>
                        Property Type:
                        <select name="propertyType" value={filters.propertyType} 
                        onChange={handleChange} className={styles.select}>
                            <option value="">Any</option>
                            <option value="house">House</option>
                            <option value="condo">Condo</option>
                            <option value="apartment">Apartment</option>
                        </select>
                    </label>
                </div>
                <div className={styles.filterItem}>
                    <button onClick={handleSearch} className={styles.searchButton}>Apply Filters</button>
                </div>
            </div>
        </div>
    );
};

export default MoreFiltersPopup;

