import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFilteredListings } from '../actions/listingsActions';
import styles from './FilterBar.module.css'; 

const FilterBar = () => {
    const dispatch = useDispatch();

    const [filters, setFilters] = useState({
        listingType: '',
        minPrice: '',
        maxPrice: '',
        bedrooms: '',
        bathrooms: '',
        propertyType: ''
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        dispatch(fetchFilteredListings(filters));
    };

    return (
        <div className={styles.filterBar}>
            <div className={styles.filterContent}>
                <div className={styles.filterItem}>
                    <label className={styles.label}>
                        Listing Type:
                        <select name="listingType" value={filters.listingType} 
                        onChange={handleChange} className={styles.select}>
                            <option value="">All</option> 
                            <option value="sale">Sale</option>
                            <option value="rent">Rent</option>
                        </select>
                    </label>
                </div>
                <div className={styles.filterItem}>
                    <label className={styles.label}>
                        Min Price:
                        <input type="number" name="minPrice" 
                        value={filters.minPrice} onChange={handleChange} 
                        placeholder="No Min" className={styles.input} />
                    </label>
                </div>
                <div className={styles.filterItem}>
                    <label className={styles.label}>
                        Max Price:
                        <input type="number" name="maxPrice" 
                        value={filters.maxPrice} onChange={handleChange} 
                        placeholder="No Max" className={styles.input} />
                    </label>
                </div>
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
                    <button onClick={handleSearch} 
                    className={styles.searchButton}>Search</button>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;

