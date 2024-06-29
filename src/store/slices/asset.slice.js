import { createSlice } from "@reduxjs/toolkit";

export const assetSlice = createSlice({
    name: "asset",
    initialState: {
        is_loading: false,
        asset_details: null,
        asset_list: [],
        asset_history: [],
    },
    reducers: {
        setLoading(state, action) {
            state.is_loading = action.payload
        },
        setAssetList(state, action) {
            state.asset_list = action.payload.list
        },
        setAsset(state, action) {
            let index = state.asset_list.findIndex((item) => item._id === action.payload._id)
            if (index !== -1)
                state.asset_list[index] = action.payload
        },
        setAssetDetails(state, action) {
            state.asset_details = action.payload
        },
        removeAsset(state, action) {
            state.asset_list = state.asset_list.filter((item) => item._id !== action.payload)
        },
        pushAsset(state, action) {
            state.asset_list.push(action.payload)
        },
        setAssetHistory(state, action) {
            state.asset_history = action.payload
        }
    },
});

export const {
    setLoading,
    setAssetList,
    setAsset,
    removeAsset,
    pushAsset,
    setAssetHistory,
    setAssetDetails,
} = assetSlice.actions;

export default assetSlice.reducer;
