/*import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showListingDetails } from '../actions/listingsActions';
import { showListingDetailsPopup, showEditListingPopup } from '../actions/popupActions';
import styles from './ViewPosts.module.css';

function ViewPosts() {
    const dispatch = useDispatch();
    const { listings, loading, error, currentQuery } = useSelector(state => state.listings);
    const currentUser = useSelector(state => state.auth.userId); 

    console.log('Current User ID:', currentUser); 

    const handleClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showListingDetailsPopup());
    };

    const handleEditClick = (listing) => {
        dispatch(showListingDetails(listing)); 
        dispatch(showEditListingPopup());
    };

    const renderFilterDescription = () => {
        if (!currentQuery) return 'All Listings';
        const descriptions = [];

        if (currentQuery.listingType) {
            const type = currentQuery.listingType === 'sale' ? 'Sale' : 'Rent';
            descriptions.push(`Type: ${type}`);
        } else {
            descriptions.push('Type: All');
        }

        if (currentQuery.listingType) descriptions.push(`Type: ${currentQuery.listingType}`);
        if (currentQuery.minPrice) descriptions.push(`Min Price: $${currentQuery.minPrice}`);
        if (currentQuery.maxPrice) descriptions.push(`Max Price: $${currentQuery.maxPrice}`);
        if (currentQuery.bedrooms) descriptions.push(`Bedrooms: ${currentQuery.bedrooms}`);
        if (currentQuery.bathrooms) descriptions.push(`Bathrooms: ${currentQuery.bathrooms}`);
        if (currentQuery.propertyType) descriptions.push(`Type: ${currentQuery.propertyType}`);

        return descriptions.join(', ') || 'Filtered Listings';
    };


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <h2 className={styles.containerTitle}>{renderFilterDescription()}</h2>
            <h4>Showing {listings.length} Results</h4>

            <div className={styles.gridContainer}>
                {listings.length > 0 ? (
                    listings.map(listing => {
                        return (
                            <div key={listing.listing_id} className={styles.box} onClick={() => handleClick(listing)}>
                                <div className={styles.top}>
                                    {listing.image && (
                                        <img src={`http://localhost:3131/${listing.image}`} alt="Listing" className={styles.img} />
                                    )}
                                    <span className={styles.iconContainer}>
                                        <i className="fas fa-heart"></i>
                                        <i className="fas fa-exchange-alt" style={{ marginLeft: '5px' }}></i>
                                    </span>
                                </div>
                                <div className={styles.bottom}>
                                    <h3 className={styles.title}>{listing.address}</h3>
                                    <p className={styles.description}>{listing.property_type}</p>
                                    <div className={styles.advants}>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bedrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-th-large ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bedrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bathrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-shower ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bathrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Area</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-vector-square ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.area}
                                                    <span className={styles.advantsSubText}> Sq Ft</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.price}>
                                        <span className={styles.priceTitle}>For Sale</span>
                                        <span className={styles.priceValue}>${listing.price}</span>
                                    </div>
                                    {currentUser && listing.user_id === currentUser && (
                                        <button onClick={(e) => { e.stopPropagation(); handleEditClick(listing); }} 
                                        className={styles.editButton}>
                                            Edit Listing
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No listings available.</div>
                )}
            </div>
        </div>
    );
}

export default ViewPosts;
*/










/*

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showListingDetails } from '../actions/listingsActions';
import { showListingDetailsPopup, showEditListingPopup } from '../actions/popupActions';
import { fetchFilteredListings } from '../actions/listingsActions'; // Import the fetchFilteredListings action
import styles from './ViewPosts.module.css';

function ViewPosts() {
    const dispatch = useDispatch();
    const { listings, loading, error, currentQuery } = useSelector(state => state.listings);
    const currentUser = useSelector(state => state.auth.userId);

    console.log('Current User ID:', currentUser);

    const handleClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showListingDetailsPopup());
    };

    const handleEditClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showEditListingPopup());
    };

    const handleRemoveFilter = (filterKey) => {
        const updatedQuery = { ...currentQuery };
        delete updatedQuery[filterKey];
        dispatch(fetchFilteredListings(updatedQuery));
    };

    const renderFilters = () => {
        if (!currentQuery) return null;

        const filters = [];

        if (currentQuery.listingType) {
            const type = currentQuery.listingType === 'sale' ? 'Sale' : 'Rent';
            filters.push({ key: 'listingType', label: `Type: ${type}` });
        }

        if (currentQuery.minPrice) filters.push({ key: 'minPrice', label: `Min Price: $${currentQuery.minPrice}` });
        if (currentQuery.maxPrice) filters.push({ key: 'maxPrice', label: `Max Price: $${currentQuery.maxPrice}` });
        if (currentQuery.bedrooms) filters.push({ key: 'bedrooms', label: `Bedrooms: ${currentQuery.bedrooms}` });
        if (currentQuery.bathrooms) filters.push({ key: 'bathrooms', label: `Bathrooms: ${currentQuery.bathrooms}` });
        if (currentQuery.propertyType) filters.push({ key: 'propertyType', label: `Type: ${currentQuery.propertyType}` });

        return filters;
    };

    const filters = renderFilters();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.filtersContainer}>
                {filters && filters.map(filter => (
                    <div key={filter.key} className={styles.filterBubble}>
                        {filter.label}
                        <span className={styles.filterRemove} onClick={() => handleRemoveFilter(filter.key)}>x</span>
                    </div>
                ))}
            </div>
            <div className={styles.resultsText}>Showing {listings.length} Results</div>

            <div className={styles.gridContainer}>
                {listings.length > 0 ? (
                    listings.map(listing => {
                        return (
                            <div key={listing.listing_id} className={styles.box} onClick={() => handleClick(listing)}>
                                <div className={styles.top}>
                                    {listing.image && (
                                        <img src={`http://localhost:3131/${listing.image}`} alt="Listing" className={styles.img} />
                                    )}
                                    <span className={styles.iconContainer}>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                </div>
                                <div className={styles.bottom}>
                                    <h3 className={styles.title}>{listing.address}</h3>
                                    <p className={styles.description}>{listing.property_type}</p>
                                    <div className={styles.advants}>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bedrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-th-large ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bedrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bathrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-shower ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bathrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Area</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-vector-square ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.area}
                                                    <span className={styles.advantsSubText}> Sq Ft</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.price}>
                                        <span className={styles.priceTitle}>For Sale</span>
                                        <span className={styles.priceValue}>${listing.price}</span>
                                    </div>
                                    {currentUser && listing.user_id === currentUser && (
                                        <button onClick={(e) => { e.stopPropagation(); handleEditClick(listing); }}
                                        className={styles.editButton}>
                                            Edit Listing
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No listings available.</div>
                )}
            </div>
        </div>
    );
}

export default ViewPosts;
*/






























/*
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showListingDetails } from '../actions/listingsActions';
import { showListingDetailsPopup, showEditListingPopup } from '../actions/popupActions';
import { fetchFilteredListings } from '../actions/listingsActions'; // Import the fetchFilteredListings action
import styles from './ViewPosts.module.css';

function ViewPosts() {
    const dispatch = useDispatch();
    const { listings, loading, error, currentQuery } = useSelector(state => state.listings);
    const currentUser = useSelector(state => state.auth.userId);

    console.log('Current User ID:', currentUser);

    const handleClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showListingDetailsPopup());
    };

    const handleEditClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showEditListingPopup());
    };

    const handleRemoveFilter = (filterKey) => {
        const updatedQuery = { ...currentQuery };
        delete updatedQuery[filterKey];
        dispatch(fetchFilteredListings(updatedQuery));
    };

    const renderFilters = () => {
        if (!currentQuery) return null;

        const filters = [];

        if (currentQuery.listingType) {
            const type = currentQuery.listingType === 'sale' ? 'Sale' : 'Rent';
            filters.push({ key: 'listingType', label: `Type: ${type}` });
        }

        if (currentQuery.minPrice) filters.push({ key: 'minPrice', label: `Min Price: $${currentQuery.minPrice}` });
        if (currentQuery.maxPrice) filters.push({ key: 'maxPrice', label: `Max Price: $${currentQuery.maxPrice}` });
        if (currentQuery.bedrooms) filters.push({ key: 'bedrooms', label: `Bedrooms: ${currentQuery.bedrooms}` });
        if (currentQuery.bathrooms) filters.push({ key: 'bathrooms', label: `Bathrooms: ${currentQuery.bathrooms}` });
        if (currentQuery.propertyType) filters.push({ key: 'propertyType', label: `Type: ${currentQuery.propertyType}` });

        return filters;
    };

    const filters = renderFilters();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.filtersContainer}>
                {filters && filters.map(filter => (
                    <div key={filter.key} className={styles.filterBubble}>
                        {filter.label}
                        <span className={styles.filterRemove} onClick={() => handleRemoveFilter(filter.key)}>x</span>
                    </div>
                ))}
            </div>
            <div className={styles.resultsText}>Showing {listings.length} Results</div>

            <div className={styles.gridContainer}>
                {listings.length > 0 ? (
                    listings.map(listing => {
                        const images = listing.images ? listing.images.split(',') : [];
                        const featuredImage = images.length > 0 ? images[0] : null;

                        return (
                            <div key={listing.listing_id} className={styles.box} onClick={() => handleClick(listing)}>
                                <div className={styles.top}>
                                    {featuredImage && (
                                        <img src={`http://localhost:3131/${featuredImage}`} alt="Listing" className={styles.img} />
                                    )}
                                    <span className={styles.iconContainer}>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                </div>
                                <div className={styles.bottom}>
                                    <h3 className={styles.title}>{listing.address}</h3>
                                    <p className={styles.description}>{listing.property_type}</p>
                                    <div className={styles.advants}>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bedrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-th-large ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bedrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bathrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-shower ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bathrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Area</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-vector-square ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.area}
                                                    <span className={styles.advantsSubText}> Sq Ft</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.price}>
                                        <span className={styles.priceTitle}>For Sale</span>
                                        <span className={styles.priceValue}>${listing.price}</span>
                                    </div>
                                    {currentUser && listing.user_id === currentUser && (
                                        <button onClick={(e) => { e.stopPropagation(); handleEditClick(listing); }}
                                        className={styles.editButton}>
                                            Edit Listing
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No listings available.</div>
                )}
            </div>
        </div>
    );
}

export default ViewPosts;
*/


















/*


import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { showListingDetails } from '../actions/listingsActions';
import { showListingDetailsPopup, showEditListingPopup } from '../actions/popupActions';
import { fetchFilteredListings } from '../actions/listingsActions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './ViewPosts.module.css';

function ViewPosts() {
    const dispatch = useDispatch();
    const { listings, loading, error, currentQuery } = useSelector(state => state.listings);
    const currentUser = useSelector(state => state.auth.userId);

    const handleClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showListingDetailsPopup());
    };

    const handleEditClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showEditListingPopup());
    };

    const handleRemoveFilter = (filterKey) => {
        const updatedQuery = { ...currentQuery };
        delete updatedQuery[filterKey];
        dispatch(fetchFilteredListings(updatedQuery));
    };

    const renderFilters = () => {
        if (!currentQuery) return null;

        const filters = [];

        if (currentQuery.listingType) {
            const type = currentQuery.listingType === 'sale' ? 'Sale' : 'Rent';
            filters.push({ key: 'listingType', label: `Type: ${type}` });
        }

        if (currentQuery.minPrice) filters.push({ key: 'minPrice', label: `Min Price: $${currentQuery.minPrice}` });
        if (currentQuery.maxPrice) filters.push({ key: 'maxPrice', label: `Max Price: $${currentQuery.maxPrice}` });
        if (currentQuery.bedrooms) filters.push({ key: 'bedrooms', label: `Bedrooms: ${currentQuery.bedrooms}` });
        if (currentQuery.bathrooms) filters.push({ key: 'bathrooms', label: `Bathrooms: ${currentQuery.bathrooms}` });
        if (currentQuery.propertyType) filters.push({ key: 'propertyType', label: `Type: ${currentQuery.propertyType}` });

        return filters;
    };

    const filters = renderFilters();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <div className={styles.nextArrow}>→</div>,
        prevArrow: <div className={styles.prevArrow}>←</div>,
    };

    return (
        <div className={styles.container}>
            <div className={styles.filtersContainer}>
                {filters && filters.map(filter => (
                    <div key={filter.key} className={styles.filterBubble}>
                        {filter.label}
                        <span className={styles.filterRemove} onClick={() => handleRemoveFilter(filter.key)}>x</span>
                    </div>
                ))}
            </div>
            <div className={styles.resultsText}>Showing {listings.length} Results</div>

            <div className={styles.gridContainer}>
                {listings.length > 0 ? (
                    listings.map(listing => {
                        const images = listing.images ? listing.images.split(',') : [];

                        return (
                            <div key={listing.listing_id} className={styles.box} onClick={() => handleClick(listing)}>
                                <div className={styles.top}>
                                    <Slider {...sliderSettings}>
                                        {images.map((image, index) => (
                                            <div key={index} className={styles.carouselCell}>
                                                <img src={`http://localhost:3131/${image}`} alt={`Listing ${index}`} className={styles.img} />
                                            </div>
                                        ))}
                                    </Slider>
                                    <span className={styles.iconContainer}>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                </div>
                                <div className={styles.bottom}>
                                    <h3 className={styles.title}>{listing.address}</h3>
                                    <p className={styles.description}>{listing.property_type}</p>
                                    <div className={styles.advants}>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bedrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-th-large ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bedrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bathrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-shower ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bathrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Area</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-vector-square ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.area}
                                                    <span className={styles.advantsSubText}> Sq Ft</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.price}>
                                        <span className={styles.priceTitle}>For Sale</span>
                                        <span className={styles.priceValue}>${listing.price}</span>
                                    </div>
                                    {currentUser && listing.user_id === currentUser && (
                                        <button onClick={(e) => { e.stopPropagation(); handleEditClick(listing); }}
                                        className={styles.editButton}>
                                            Edit Listing
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No listings available.</div>
                )}
            </div>
        </div>
    );
}

export default ViewPosts;
*/











/*





import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { showListingDetails } from '../actions/listingsActions';
import { showListingDetailsPopup, showEditListingPopup } from '../actions/popupActions';
import { fetchFilteredListings } from '../actions/listingsActions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './ViewPosts.module.css';

function ViewPosts() {
    const dispatch = useDispatch();
    const { listings, loading, error, currentQuery } = useSelector(state => state.listings);
    const currentUser = useSelector(state => state.auth.userId);

    const handleClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showListingDetailsPopup());
    };

    const handleEditClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showEditListingPopup());
    };

    const handleRemoveFilter = (filterKey) => {
        const updatedQuery = { ...currentQuery };
        delete updatedQuery[filterKey];
        dispatch(fetchFilteredListings(updatedQuery));
    };

    const renderFilters = () => {
        if (!currentQuery) return null;

        const filters = [];

        if (currentQuery.listingType) {
            const type = currentQuery.listingType === 'sale' ? 'Sale' : 'Rent';
            filters.push({ key: 'listingType', label: `Type: ${type}` });
        }

        if (currentQuery.minPrice) filters.push({ key: 'minPrice', label: `Min Price: $${currentQuery.minPrice}` });
        if (currentQuery.maxPrice) filters.push({ key: 'maxPrice', label: `Max Price: $${currentQuery.maxPrice}` });
        if (currentQuery.bedrooms) filters.push({ key: 'bedrooms', label: `Bedrooms: ${currentQuery.bedrooms}` });
        if (currentQuery.bathrooms) filters.push({ key: 'bathrooms', label: `Bathrooms: ${currentQuery.bathrooms}` });
        if (currentQuery.propertyType) filters.push({ key: 'propertyType', label: `Type: ${currentQuery.propertyType}` });

        return filters;
    };

    const filters = renderFilters();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <div className={styles.container}>
            <div className={styles.filtersContainer}>
                {filters && filters.map(filter => (
                    <div key={filter.key} className={styles.filterBubble}>
                        {filter.label}
                        <span className={styles.filterRemove} onClick={() => handleRemoveFilter(filter.key)}>x</span>
                    </div>
                ))}
            </div>
            <div className={styles.resultsText}>Showing {listings.length} Results</div>

            <div className={styles.gridContainer}>
                {listings.length > 0 ? (
                    listings.map(listing => {
                        const images = listing.images ? listing.images.split(',') : [];

                        return (
                            <div key={listing.listing_id} className={styles.box}>
                                <div className={styles.top}>
                                    <Slider {...sliderSettings}>
                                        {images.map((image, index) => (
                                            <div key={index} className={styles.carouselCell}>
                                                <img src={`http://localhost:3131/${image}`} alt={`Listing ${index}`} className={styles.img} />
                                            </div>
                                        ))}
                                    </Slider>
                                    <span className={styles.iconContainer}>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                </div>
                                <div className={styles.bottom} onClick={() => handleClick(listing)}>
                                    <h3 className={styles.title}>{listing.address}</h3>
                                    <p className={styles.description}>{listing.property_type}</p>
                                    <div className={styles.advants}>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bedrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-th-large ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bedrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bathrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-shower ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bathrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Area</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-vector-square ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.area}
                                                    <span className={styles.advantsSubText}> Sq Ft</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.price}>
                                        <span className={styles.priceTitle}>For Sale</span>
                                        <span className={styles.priceValue}>${listing.price}</span>
                                    </div>
                                    {currentUser && listing.user_id === currentUser && (
                                        <button onClick={(e) => { e.stopPropagation(); handleEditClick(listing); }}
                                        className={styles.editButton}>
                                            Edit Listing
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No listings available.</div>
                )}
            </div>
        </div>
    );
}

export default ViewPosts;
*/












import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Slider from 'react-slick';
import { showListingDetails } from '../actions/listingsActions';
import { showListingDetailsPopup, showEditListingPopup } from '../actions/popupActions';
import { fetchFilteredListings } from '../actions/listingsActions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './ViewPosts.module.css';

function ViewPosts() {
    const dispatch = useDispatch();
    const { listings, loading, error, currentQuery } = useSelector(state => state.listings);
    const currentUser = useSelector(state => state.auth.userId);

    const handleClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showListingDetailsPopup());
    };

    const handleEditClick = (listing) => {
        dispatch(showListingDetails(listing));
        dispatch(showEditListingPopup());
    };

    const handleRemoveFilter = (filterKey) => {
        const updatedQuery = { ...currentQuery };
        delete updatedQuery[filterKey];
        dispatch(fetchFilteredListings(updatedQuery));
    };

    const renderFilters = () => {
        if (!currentQuery) return null;

        const filters = [];

        if (currentQuery.listingType) {
            const type = currentQuery.listingType === 'sale' ? 'Sale' : 'Rent';
            filters.push({ key: 'listingType', label: `Type: ${type}` });
        }

        if (currentQuery.minPrice) filters.push({ key: 'minPrice', label: `Min Price: $${currentQuery.minPrice}` });
        if (currentQuery.maxPrice) filters.push({ key: 'maxPrice', label: `Max Price: $${currentQuery.maxPrice}` });
        if (currentQuery.bedrooms) filters.push({ key: 'bedrooms', label: `Bedrooms: ${currentQuery.bedrooms}` });
        if (currentQuery.bathrooms) filters.push({ key: 'bathrooms', label: `Bathrooms: ${currentQuery.bathrooms}` });
        if (currentQuery.propertyType) filters.push({ key: 'propertyType', label: `Type: ${currentQuery.propertyType}` });

        return filters;
    };

    const filters = renderFilters();

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;













const NextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styles.slickArrow}`}
                style={{ ...style, display: "block", right: "10px" }}
                onClick={onClick}
            />
        );
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styles.slickArrow}`}
                style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
                onClick={onClick}
            />
        );
    };









    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className={styles.container}>
            <div className={styles.filtersContainer}>
                {filters && filters.map(filter => (
                    <div key={filter.key} className={styles.filterBubble}>
                        {filter.label}
                        <span className={styles.filterRemove} onClick={() => handleRemoveFilter(filter.key)}>x</span>
                    </div>
                ))}
            </div>
            <div className={styles.resultsText}>Showing {listings.length} Results</div>

            <div className={styles.gridContainer}>
                {listings.length > 0 ? (
                    listings.map(listing => {
                        const images = listing.images ? listing.images.split(',') : [];
                        console.log('Listing Images:', images); // Log to verify images array


                        return (
                            <div key={listing.listing_id} className={styles.box}>
                                <div className={styles.top}>


                                    {images.length > 1 ? (
                                        <Slider {...sliderSettings}>
                                            {images.map((image, index) => (
                                                <div key={index} className={styles.carouselCell}>
                                                    <img src={`http://localhost:3131/${image}`} alt={`Listing ${index}`} className={styles.img} />
                                                </div>
                                            ))}
                                        </Slider>
                                    ) : (
                                        <img src={`http://localhost:3131/${images[0]}`} alt="Listing" className={styles.img} />
                                    )}


                                        {/*images.length > 0 ? (
                                        <div >
                                        <Slider {...sliderSettings}>
                                            {images.map((image, index) => (
                                                <div key={index} className={styles.carouselCell}>
                                                    <img src={`http://localhost:3131/${image}`} alt={`Listing ${index}`} className={styles.img} />
                                                </div>
                                            ))}
                                        </Slider>
                                        </div>
                                    ) : (
                                        <img src="default-image-url.jpg" alt="Default" className={styles.img} />
                                    )*/}



                                    <span className={styles.iconContainer}>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                </div>
                                <div className={styles.bottom} onClick={() => handleClick(listing)}>
                                    <h3 className={styles.title}>{listing.address}</h3>
                                    <p className={styles.description}>{listing.property_type}</p>
                                    <div className={styles.advants}>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bedrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-th-large ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bedrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Bathrooms</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-shower ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.bathrooms}</span>
                                            </div>
                                        </div>
                                        <div className={styles.advantsItem}>
                                            <span className={styles.advantsTitle}>Area</span>
                                            <div className={styles.advantsDetail}>
                                                <i className={`fas fa-vector-square ${styles.advantsIcon}`}></i>
                                                <span className={styles.advantsText}>{listing.area}
                                                    <span className={styles.advantsSubText}> Sq Ft</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.price}>
                                        <span className={styles.priceTitle}>For Sale</span>
                                        <span className={styles.priceValue}>${listing.price}</span>
                                    </div>
                                    {currentUser && listing.user_id === currentUser && (
                                        <button onClick={(e) => { e.stopPropagation(); handleEditClick(listing); }}
                                        className={styles.editButton}>
                                            Edit Listing
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No listings available.</div>
                )}
            </div>
        </div>
    );
}

export default ViewPosts;

