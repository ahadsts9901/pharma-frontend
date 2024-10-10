import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {
        isLogin: null,
        isAdminDrawerOpen: false,
    },
}

export const userSlice: any = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state: { user: {} }, action) => {
            state.user = {
                ...state?.user, ...action.payload, isLogin: true
            }
        },
        logout: (state: { user: {} | null }) => {
            state.user = { ...state?.user, isLogin: false }
        },
        setIsAdminDrawerOpen: (state: any, action: any) => {
            state.isAdminDrawerOpen = action?.payload
        }
    }
})

export const { login, logout, setIsAdminDrawerOpen } = userSlice.actions

export default userSlice.reducer