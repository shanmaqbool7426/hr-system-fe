import { createSlice } from "@reduxjs/toolkit";

export const helpdeskSlice = createSlice({
    name: "helpdesk",
    initialState: {
        is_loading: false,
        ticket_list: []
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload;
        },
        setTickets(state, action) {
            state.ticket_list = action.payload;
        },
        pushTicket(state, action) {
            state.ticket_list.push(action.payload);
        },
        setTicket(state, action) {
            let index = state.ticket_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.ticket_list[index] = action.payload
        },
        removeTicket(state, action) {
            state.ticket_list = state.ticket_list.filter((item) => item._id !== action.payload)
        },
    },
});

export const {
    setLoading,
    setTickets,
    setTicket,
    pushTicket,
    removeTicket
} = helpdeskSlice.actions;

export default helpdeskSlice.reducer;
