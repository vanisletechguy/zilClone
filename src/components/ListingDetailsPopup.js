/*import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideListingDetails } from '../actions/listingsActions';
import styles from './ListingDetailsPopup.module.css';

const ListingDetailsPopup = () => {
    const dispatch = useDispatch();
    const { selectedListing } = useSelector(state => state.listings);

    if (!selectedListing) return null;

    const handleClose = () => {
        dispatch(hideListingDetails());
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button onClick={handleClose} className={styles.closeButton}>Close</button>
                <div className={styles.imageContainer}>
                    {selectedListing.image && (
                        <img src={`http://localhost:3131/${selectedListing.image}`} alt="Listing" className={styles.img} />
                    )}
                </div>
                <div className={styles.details}>
                    <h2>{selectedListing.address}</h2>
                    <p>Type: {selectedListing.property_type}</p>
                    <p>Listing Type: {selectedListing.listing_type}</p>
                    <p>Price: ${selectedListing.price}</p>
                    <p>Bedrooms: {selectedListing.bedrooms}</p>
                    <p>Bathrooms: {selectedListing.bathrooms}</p>
                    <p>Area: {selectedListing.area} Sq Ft</p>
                </div>
            </div>
        </div>
    );
};

export default ListingDetailsPopup;
*/



import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { hideListingDetails } from '../actions/listingsActions';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './ListingDetailsPopup.module.css';

const ListingDetailsPopup = () => {
    const dispatch = useDispatch();
    const { selectedListing } = useSelector(state => state.listings);

    if (!selectedListing) return null;

    const handleClose = () => {
        dispatch(hideListingDetails());
    };

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

    const images = selectedListing.images ? selectedListing.images.split(',') : [];

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <button onClick={handleClose} className={styles.closeButton}>Close</button>
                <div className={styles.imageContainer}>
                    {images.length > 1 ? (
                        <Slider {...sliderSettings}>
                            {images.map((image, index) => (
                                <div key={index} className={styles.carouselCell}>
                                    <img src={`http://localhost:3131/${image}`} alt={`Listing ${index}`} className={styles.img} />
                                </div>
                            ))}
                        </Slider>
                    ) : (
                        images.length === 1 && (
                            <img src={`http://localhost:3131/${images[0]}`} alt="Listing" className={styles.img} />
                        )
                    )}
                </div>
                <div className={styles.details}>
                    <h2>{selectedListing.address}</h2>
                    <p>Type: {selectedListing.property_type}</p>
                    <p>Listing Type: {selectedListing.listing_type}</p>
                    <p>Price: ${selectedListing.price}</p>
                    <p>Bedrooms: {selectedListing.bedrooms}</p>
                    <p>Bathrooms: {selectedListing.bathrooms}</p>
                    <p>Area: {selectedListing.area} Sq Ft</p>
                </div>
            </div>
        </div>
    );
};

export default ListingDetailsPopup;








