import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  isAuthenticated: false,
  remember: JSON.parse(sessionStorage.getItem('remember')) ?? false
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setGlobalCredentials: (state, action) => {
      state.token = action.payload.token
      state.isAuthenticated = true
    },
    logout: state => {
      state.token = null
      state.isAuthenticated = false
    },
    setRemember: (state, action) => {
      state.remember = action.payload.remember
    }
  }
})

export const { setGlobalCredentials, logout, setRemember } = authSlice.actions
export default authSlice.reducer
