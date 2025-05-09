import axios from "axios";

import {logError, logRequest, logResponse} from "@src/utils/logger.js";
import {API_BASE_URL} from "@src/redux/api/API";

const RESTAURANTS_ENDPOINT = `${API_BASE_URL}/restaurants`;
const GET_RESTAURANTS_IN_PROXIMITY_API_ENDPOINT = `${RESTAURANTS_ENDPOINT}/proximity`;
const GET_RECENT_RESTAURANTS_ENDPOINT = `${API_BASE_URL}/user/recent-restaurants`;
const GET_FLASH_DEALS_ENDPOINT = `${API_BASE_URL}/flash-deals`;

export const getRecentRestaurants = async (token) => {
    const functionName = 'getRecentRestaurants';
    const endpoint = GET_RECENT_RESTAURANTS_ENDPOINT;

    logRequest(functionName, endpoint, {});

    try {
        const response = await axios.get(endpoint, {
            headers: {Authorization: `Bearer ${token}`},
        });
        logResponse(functionName, endpoint, response.data);
        return response.data;
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};

export const getRestaurantsInProximity = async (
    latitude,
    longitude,
    radius = 10,
    token
) => {
    const functionName = 'getRestaurantsByProximityAPI';
    const endpoint = GET_RESTAURANTS_IN_PROXIMITY_API_ENDPOINT;
    const payload = {latitude, longitude, radius};

    logRequest(functionName, endpoint, payload);

    try {
        const response = await axios.post(endpoint, payload, {
            headers: {Authorization: `Bearer ${token.trim()}`},
        });
        logResponse(functionName, endpoint, response.data);
        return response.data.restaurants;
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};


export const getRestaurant = async (restaurantId) => {
    const functionName = 'getRestaurant';
    const endpoint = `${RESTAURANTS_ENDPOINT}/${restaurantId}`;

    logRequest(functionName, endpoint, {});

    try {
        const response = await axios.get(endpoint);
        logResponse(functionName, endpoint, response.data);
        return response.data;
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};

export const getAllRestaurants = async (token) => {
    const functionName = 'getAllRestaurants';

    logRequest(functionName, RESTAURANTS_ENDPOINT, {});

    try {
        const response = await axios.get(RESTAURANTS_ENDPOINT, {
            headers: {Authorization: `Bearer ${token}`}
        });
        logResponse(functionName, RESTAURANTS_ENDPOINT, response.data);
        return response.data;
    } catch (error) {
        logError(functionName, RESTAURANTS_ENDPOINT, error);
        throw error;
    }
};

export const createRestaurant = async (
    formData,
    token
) => {
    const functionName = 'createRestaurant';
    const endpoint = RESTAURANTS_ENDPOINT;

    logRequest(functionName, endpoint, formData);

    try {
        const response = await axios.post(endpoint, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        logResponse(functionName, endpoint, response.data);
        return response.data.restaurant;
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};

export const updateRestaurant = async (
    restaurantId,
    formData,
    token
) => {
    const functionName = 'updateRestaurant';
    const endpoint = `${RESTAURANTS_ENDPOINT}/${restaurantId}`;

    logRequest(functionName, endpoint, formData);

    try {
        const response = await axios.put(endpoint, formData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        logResponse(functionName, endpoint, response.data);
        return response.data.restaurant;
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};

export const addRestaurantComment = async (
    restaurantId,
    commentData,
    token
) => {
    const functionName = 'addRestaurantComment';
    const endpoint = `${RESTAURANTS_ENDPOINT}/${restaurantId}/comments`;

    const sanitizedData = {
        ...commentData,
        rating: Math.round(commentData.rating),
        purchase_id: parseInt(String(commentData.purchase_id))
    };

    logRequest(functionName, endpoint, sanitizedData);

    try {
        const response = await axios.post(endpoint, sanitizedData, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
        logResponse(functionName, endpoint, response.data);
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};

export const getRestaurantBadges = async (
    restaurantId,
    token
) => {
    const functionName = 'getRestaurantBadges';
    const endpoint = `${RESTAURANTS_ENDPOINT}/${restaurantId}/badges`;

    logRequest(functionName, endpoint, {});

    try {
        const response = await axios.get(endpoint, {
            headers: {Authorization: `Bearer ${token}`}
        });
        logResponse(functionName, endpoint, response.data);
        return response.data.badge_points || [];
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};

export const getRestaurantCommentAnalysis = async (
    restaurantId,
    token
) => {
    const functionName = 'getRestaurantCommentAnalysis';
    const endpoint = `${RESTAURANTS_ENDPOINT}/${restaurantId}/comment-analysis`;

    logRequest(functionName, endpoint, {});

    try {
        const response = await axios.get(endpoint, {
            headers: {Authorization: `Bearer ${token}`}
        });
        logResponse(functionName, endpoint, response.data);
        return response.data;
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};

export const getRestaurantComments = async (restaurantId) => {
    const functionName = 'getRestaurantComments';
    const endpoint = `${RESTAURANTS_ENDPOINT}/${restaurantId}/comments`;

    logRequest(functionName, endpoint, {});

    try {
        const response = await axios.get(endpoint);
        logResponse(functionName, endpoint, response.data);

        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to fetch comments');
        }

        return response.data.comments;
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};

export const deleteRestaurant = async (restaurantId, token) => {
    const functionName = 'deleteRestaurant';
    const endpoint = `${RESTAURANTS_ENDPOINT}/${restaurantId}`;

    logRequest(functionName, endpoint, {});

    try {
        const response = await axios.delete(endpoint, {
            headers: {Authorization: `Bearer ${token}`}
        });
        logResponse(functionName, endpoint, response.data);
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};

export const getFlashDeals = async (
    latitude,
    longitude,
    radius = 30,
    token
) => {
    const functionName = 'getFlashDeals';
    const endpoint = GET_FLASH_DEALS_ENDPOINT;
    const payload = {latitude, longitude, radius};

    logRequest(functionName, endpoint, payload);

    try {
        const response = await axios.post(endpoint, payload, {
            headers: {Authorization: `Bearer ${token.trim()}`},
        });
        logResponse(functionName, endpoint, response.data);
        return response.data.restaurants;
    } catch (error) {
        logError(functionName, endpoint, error);
        throw error;
    }
};