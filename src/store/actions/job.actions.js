import axios from '@/util/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchJobs = createAsyncThunk(
    'jobs/fetchJobs',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('/add-new-jobs/getJobs');
            console.error('Fetched jobs:', response);
            const data =  response;
            return data;
        } catch (error) {
            console.error('Fetch jobs error:', error);
            return rejectWithValue(error.response.data);
        }
    }
);


export const createJob = createAsyncThunk(
    'jobs/createJob',
    async (jobData, { rejectWithValue }) => {
        try {
            const response = await axios.post('/add-new-jobs/create', jobData);
            console.error('Job created:', response);
            return response;
        } catch (error) {
            console.error('Create job error:', error);
            return rejectWithValue(error.response.data);
        }
    }
);
