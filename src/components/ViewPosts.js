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

        if (currentQuery.userId) filters.push({ key: 'userId', label: `UserId: $${currentQuery.userId}` });
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
                style={{ ...style, display: "block", right: "10px", fontSize: "95px" }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
            />
        );
    };

    const PrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div
                className={`${className} ${styles.slickArrow}`}
                style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
                onClick={(e) => {
                    e.stopPropagation();
                    onClick();
                }}
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
        appendDots: dots => (
            <div
                style={{ marginTop: "20px" }}
                onClick={(e) => e.stopPropagation()}
            >
                <ul style={{margin: "0px", padding: "0px"}}> {dots} </ul>
            </div>
        ),
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

                                    {images.length > 1 ? (
                                        <Slider {...sliderSettings}>
                                            {images.map((image, index) => (
                                                <div key={index} className={styles.carouselCell}>
                                                    <img src={`${image}`} alt={`Listing ${index}`} className={styles.img} />
                                                </div>
                                            ))}
                                        </Slider>
                                    ) : (
                                        <img src={`${images[0]}`} alt="Listing" className={styles.img} />
                                    )} { /* 
                                        <img src={`${IMAGES_URL}/${images[0]}`} alt="Listing" className={styles.img} /> */}

                                    <span className={styles.iconContainer}>
                                        <i className="fas fa-heart"></i>
                                    </span>
                                </div>
                                <div className={styles.bottom} >
                                    <div className={styles.titleContainer}>
                                        <h3 className={styles.title}>{listing.address}</h3>
                                        <span className={styles.listingType}>{listing.listing_type}</span>
                                    </div>

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
                                                <span className={styles.advantsText}>{listing.square_footage}
                                                    <span className={styles.advantsSubText}> Sq Ft</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                        <div className={styles.price}>
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

