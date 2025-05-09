import {API_BASE_URL} from "@src/redux/api/API";
import {apiClient} from '@src/services/apiClient.js';
import {logError, logRequest, logResponse} from "@src/utils/logger.js";

const USER_ACHIEVEMENTS_ENDPOINT = `${API_BASE_URL}/user/achievements`;
const ALL_ACHIEVEMENTS_ENDPOINT = `${API_BASE_URL}/achievements`;

export const achievementApi = {
    // Get user's unlocked achievements
    async getUserAchievements(token) {
        const functionName = 'getUserAchievements';
        const endpoint = USER_ACHIEVEMENTS_ENDPOINT;

        console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Making API request to ${endpoint}`);
        logRequest(functionName, endpoint, {});

        try {
            const response = await apiClient.request({
                method: 'GET',
                url: endpoint,
                token,
            });

            console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Response received:`,
                JSON.stringify(response, null, 2));

            logResponse(functionName, endpoint, response);

            // Validate response structure
            if (!response || !('achievements' in response) || !Array.isArray(response.achievements)) {
                console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Invalid response format`, response);
                throw new Error("Invalid response format for user achievements");
            }

            console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Successfully parsed ${response.achievements.length} achievements`);

            // Check for achievements with missing fields
            const missingFields = response.achievements.some(a =>
                !a.id || !a.name || !a.achievement_type || !a.badge_image_url || !a.description);

            if (missingFields) {
                console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Warning - Some achievements have missing required fields`);
            }

            return response;
        } catch (error) {
            console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Error in API call:`, error);
            logError(functionName, endpoint, error);
            throw error;
        }
    },

    // Get all available achievements
    async getAllAchievements(token) {
        const functionName = 'getAllAchievements';
        const endpoint = ALL_ACHIEVEMENTS_ENDPOINT;

        console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Making API request to ${endpoint}`);
        logRequest(functionName, endpoint, {});

        try {
            const response = await apiClient.request({
                method: 'GET',
                url: endpoint,
                token,
            });

            console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Response received:`,
                JSON.stringify(response, null, 2));

            logResponse(functionName, endpoint, response);

            // Validate response structure
            if (!response || !('achievements' in response) || !Array.isArray(response.achievements)) {
                console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Invalid response format`, response);
                throw new Error("Invalid response format for all achievements");
            }

            console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Successfully parsed ${response.achievements.length} achievements`);

            // Check if achievements have the required threshold field
            const missingThreshold = response.achievements.some(a => a.threshold === undefined);

            if (missingThreshold) {
                console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Warning - Some achievements are missing threshold values`);
            }

            return response;
        } catch (error) {
            console.log(`[DEBUG][2025-04-06 20:00:32][emreutkan] ${functionName}: Error in API call:`, error);
            logError(functionName, endpoint, error);
            throw error;
        }
    }
};