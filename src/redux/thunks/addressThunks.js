import {createAsyncThunk} from '@reduxjs/toolkit';

import {addAddress, removeAddress} from "@src/redux/slices/addressSlice";
import {getUserDataThunk} from "@src/redux/thunks/userThunks";
import {tokenService} from "@src/services/tokenService.js";
import {addAddressAPI, deleteAddressAPI, updateAddressAPI} from "@src/redux/api/addressAPI.js";

export const addAddressAsync = createAsyncThunk(
    'address/addAddressAsync',
    async (address, {rejectWithValue, dispatch}) => {
        const tempId = `temp-${Date.now()}`;
        // Make sure is_primary is set in the temp address too
        const tempAddress = {...address, id: tempId, is_primary: true};
        console.log('Address payload in thunk:', address);

        // Add temp address with is_primary: true
        dispatch(addAddress(tempAddress));

        const token = await tokenService.getToken();


        try {
            // Explicitly create the payload with is_primary
            const addressPayload = {
                ...address,
                is_primary: true
            };

            // Log the exact payload being sent to API
            console.log('Sending to API:', addressPayload);

            if (!token) {
                return rejectWithValue('Authentication token is missing');
            }
            const response = await addAddressAPI(addressPayload, token);

            // Log the response to see what the API returns
            console.log('API Response:', response);

            // Remove the temporary address
            dispatch(removeAddress(tempId));

            // Update user data to get the latest address list
            await dispatch(getUserDataThunk({token}));

            // Check the nested address object's is_primary property
            if (response?.address && !response.address.is_primary) {
                // Make an API call to set this address as primary
                setPrimaryAddress(response.address.id);
            }

            // Return the address object from the response
            return response.address;
        } catch (error) {
            dispatch(removeAddress(tempId));
            if (!token) {
                return rejectWithValue('Authentication token is missing');
            }
            await dispatch(getUserDataThunk({token}));

            return rejectWithValue(
                error.response?.data?.message ||
                error.response?.data ||
                'Failed to add address'
            );
        }
    }
);

// Update address - No changes needed
export const updateAddress = createAsyncThunk(
    'address/updateAddress',
    async ({id, updates}, {dispatch, rejectWithValue}) => {
        try {
            const token = await tokenService.getToken();
            if (!token) {
                console.error('Authentication token is missing.');
                return rejectWithValue('Authentication token is missing.');
            }
            updates.is_primary = true; // temporary solution updated address
            const response = await updateAddressAPI(id, updates, token);
            await dispatch(getUserDataThunk({token}));
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update address');
        }
    }
);
export const setPrimaryAddress = createAsyncThunk(
    'address/setPrimaryAddress',
    async (addressId, {getState, dispatch, rejectWithValue}) => {
        try {
            const state = getState();
            const token = await tokenService.getToken();
            if (!token) {
                return rejectWithValue('Authentication token is missing.');
            }

            const addressToUpdate = state.address.addresses.find(
                (addr) => addr.id === addressId
            );
            if (!addressToUpdate) {
                console.log('Address not found');
            }

            const updatedAddress = await updateAddressAPI(addressId, {is_primary: true}, token);

            await dispatch(getUserDataThunk({token}));

            console.log('Successfully updated primary address:', updatedAddress);
            return updatedAddress;
        } catch (error) {
            console.error('Error setting primary address:', error);
            return rejectWithValue(
                error.response?.data?.message || 'Failed to set primary address'
            );
        }
    }
);

export const deleteAddressAsync = createAsyncThunk(
    'address/deleteAddressAsync',
    async (addressId, {rejectWithValue, dispatch}) => {
        try {
            const token = await tokenService.getToken();
            if (!token) {
                return rejectWithValue('Authentication token is missing.');
            }

            await deleteAddressAPI(addressId, token);

            await dispatch(getUserDataThunk({token}));

        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                error.response?.data ||
                'Failed to delete address'
            );
        }
    }
);