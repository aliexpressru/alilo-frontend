import axios from 'axios';
import { notifications } from '@mantine/notifications';

export const http = axios.create({
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

http.interceptors.response.use(
    (response) => {
        try {
            // If the API returned { status: false, message: "..." }
            if (response.data?.status === false) {
                const errorMessage = response.data.message || 'Operation failed';
                debugger;
                notifications.show({
                    title: 'Error',
                    message: errorMessage,
                    color: 'red',
                    autoClose: 5000,
                });

                // Create a proper Error object for rejection
                return response;
            }
            return response;
        } catch (interceptorError) {
            return interceptorError;
        }
    },
    (error) => {
        // Handle network errors or server errors (5xx, 4xx)
        let errorMessage = 'Network error';

        // Safely extract error message
        if (error.response) {
            // Handle API response errors
            errorMessage = error.response.data?.message ||
                error.response.statusText ||
                `HTTP error ${error.response.status}`;
        } else if (error.request) {
            // The request was made but no response was received
            errorMessage = 'No response from server';
        } else if (error.message) {
            // Something happened in setting up the request
            errorMessage = error.message;
        }

        notifications.show({
            title: 'Error',
            message: errorMessage,
            color: 'red',
            autoClose: 5000,
        });

        return Promise.reject(error);
    }
);
