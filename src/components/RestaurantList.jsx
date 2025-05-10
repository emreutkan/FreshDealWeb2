import React, { useEffect } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getRestaurantsByProximity } from "@src/redux/thunks/restaurantThunks";

function RestaurantList() {
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurant.restaurantsProximity);
    const loading = useSelector((state) => state.restaurant.restaurantsProximityLoading);

    useEffect(() => {
        dispatch(getRestaurantsByProximity());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="text-center my-4">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (!restaurants || restaurants.length === 0) {
        return (
            <div className="no-restaurants my-4">
                <p>No restaurants found in your area.</p>
                <p>Try changing your delivery address or check back later.</p>
            </div>
        );
    }

    return (
        <div className="restaurant-list">
            <div className="row">
                {restaurants.map((restaurant) => (
                    <div className="col-md-4 mb-4" key={restaurant.id}>
                        <Link to={`/Restaurant/${restaurant.id}`} className="restaurant-card">
                            <div className="card h-100">
                                <div className="card-img-container">
                                    <img
                                        src={restaurant.image_url || 'https://via.placeholder.com/300x200?text=Restaurant'}
                                        className="card-img-top"
                                        alt={restaurant.restaurantName}
                                    />
                                    {restaurant.category && (
                                        <span className="category-badge">{restaurant.category}</span>
                                    )}
                                    <button className="favorite-btn">
                                        <i className="bi bi-heart"></i>
                                    </button>
                                </div>
                                <div className="card-body">
                                    <div className="restaurant-header">
                                        <h5 className="card-title">{restaurant.restaurantName}</h5>
                                        <div className="rating-container">
                                            <i className="bi bi-star-fill"></i>
                                            <span className="rating">{restaurant.rating.toFixed(1)}</span>
                                        </div>
                                    </div>
                                    <p className="card-text restaurant-desc">{restaurant.restaurantDescription}</p>
                                    <div className="restaurant-info">
                                        <div className="info-item">
                                            <i className="bi bi-geo-alt"></i>
                                            <span>{restaurant.distance_km ? `${restaurant.distance_km.toFixed(1)} km away` : 'Distance unavailable'}</span>
                                        </div>
                                        {restaurant.delivery && (
                                            <div className="info-item">
                                                <i className="bi bi-truck"></i>
                                                <span>{Math.round(15 + (restaurant.distance_km || 3) * 5)} min</span>
                                            </div>
                                        )}
                                        {restaurant.pickup && (
                                            <div className="info-item">
                                                <i className="bi bi-bag"></i>
                                                <span>Pickup</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="restaurant-footer">
                                        {restaurant.deliveryFee !== undefined && restaurant.delivery && (
                                            <div className="footer-item">
                                                <span className="footer-label">Delivery Fee:</span>
                                                <span className="footer-value">
                          {restaurant.deliveryFee > 0 ? `${restaurant.deliveryFee.toFixed(2)} $` : 'Free'}
                        </span>
                                            </div>
                                        )}
                                        {restaurant.minOrderAmount !== undefined && restaurant.delivery && (
                                            <div className="footer-item">
                                                <span className="footer-label">Min Order:</span>
                                                <span className="footer-value">${restaurant.minOrderAmount.toFixed(2)}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .restaurant-card {
                    text-decoration: none;
                    color: inherit;
                    display: block;
                    transition: transform 0.2s;
                }

                .restaurant-card:hover {
                    transform: translateY(-5px);
                }

                .card {
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                    height: 100%;
                    border: none;
                }

                .card-img-container {
                    position: relative;
                }

                .card-img-top {
                    height: 180px;
                    object-fit: cover;
                }

                .category-badge {
                    position: absolute;
                    left: 12px;
                    top: 12px;
                    background-color: rgba(80, 112, 60, 0.85);
                    padding: 6px 12px;
                    border-radius: 20px;
                    color: white;
                    font-size: 12px;
                    font-weight: 600;
                }

                .favorite-btn {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    background-color: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.15);
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .favorite-btn:hover {
                    background-color: #f8f9fa;
                }

                .favorite-btn i {
                    font-size: 20px;
                    color: #757575;
                }

                .restaurant-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                }

                .card-title {
                    font-weight: 700;
                    font-size: 18px;
                    margin-bottom: 0;
                    flex: 1;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .rating-container {
                    display: flex;
                    align-items: center;
                    background-color: #F0F9EB;
                    padding: 4px 8px;
                    border-radius: 12px;
                    gap: 4px;
                }

                .rating-container i {
                    color: #50703C;
                    font-size: 14px;
                }

                .rating {
                    font-weight: 600;
                    font-size: 14px;
                    color: #333;
                }

                .restaurant-desc {
                    color: #6B7280;
                    font-size: 14px;
                    margin-bottom: 12px;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .restaurant-info {
                    display: flex;
                    flex-wrap: wrap;
                    margin: 8px 0;
                    gap: 12px;
                }

                .info-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .info-item i {
                    color: #50703C;
                    font-size: 16px;
                }

                .info-item span {
                    font-size: 14px;
                    color: #4B5563;
                }

                .restaurant-footer {
                    display: flex;
                    justify-content: space-between;
                    margin-top: 12px;
                    padding-top: 12px;
                    border-top: 1px solid #F3F4F6;
                }

                .footer-item {
                    display: flex;
                    align-items: center;
                    gap: 4px;
                }

                .footer-label {
                    font-size: 13px;
                    color: #6B7280;
                }

                .footer-value {
                    font-size: 13px;
                    font-weight: 600;
                    color: #50703C;
                }

                .no-restaurants {
                    text-align: center;
                    padding: 30px;
                    background-color: #f8f9fa;
                    border-radius: 8px;
                }
            `}</style>
        </div>
    );
}

export default RestaurantList;