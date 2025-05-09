// services/apiClient.js
import axios from 'axios';
import {API_BASE_URL} from '@src/redux/api/API';
import {logError, logRequest, logResponse} from '@src/utils/logger.js';

class ApiClient {
    constructor(baseURL) {
        this.client = axios.create({
            baseURL,
            timeout: 10000,
        });

        this.client.interceptors.request.use((config) => {
            const functionName = config.url?.split('/').pop() || 'unknown';
            logRequest(functionName, config.url || '', config.data);
            return config;
        });

        this.client.interceptors.response.use(
            (response) => {
                const functionName = response.config.url?.split('/').pop() || 'unknown';
                logResponse(functionName, response.config.url || '', response.data);
                return response;
            },
            (error) => {
                const functionName = error.config.url?.split('/').pop() || 'unknown';
                logError(functionName, error.config.url || '', error);
                throw error;
            }
        );
    }

    async request(config) {
        if (config.token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${config.token}`,
            };
        }
        const response = await this.client(config);
        return response.data;
    }
}

export const apiClient = new ApiClient(API_BASE_URL);