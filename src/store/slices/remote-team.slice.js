import { createSlice } from "@reduxjs/toolkit";

export const remoteTeamSlice = createSlice({
    name: "remoteteam",
    initialState: {
        is_loading: false,
        team_list: []
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload;
        },
        setTeams(state, action) {
            state.team_list = action.payload;
        },
        pushTeam(state, action) {
            state.team_list.push(action.payload);
        },
        setTeam(state, action) {
            let index = state.team_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.team_list[index] = action.payload
        },
        removeTeam(state, action) {
            state.team_list = state.team_list.filter((item) => item._id !== action.payload)
        },
    },
});

export const {
    setLoading,
    setTeams,
    setTeam,
    pushTeam,
    removeTeam
} = remoteTeamSlice.actions;

export default remoteTeamSlice.reducer;
