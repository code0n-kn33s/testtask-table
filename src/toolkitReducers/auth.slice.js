import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, privateFetch, getToken, clearToken, setStorage } from '../helpers'

let lang = localStorage.getItem('lang')

if(!lang) localStorage.setItem('lang', "en")

export const getUserData = createAsyncThunk(
    'async/getUserData',
    async function (param, options) {
            const response = await privateFetch('api/user/check')
            const data = await response.json()

            if (!response.ok) {
                return options.rejectWithValue(data);
            }


            return data
    }
)


export const registerNewUser = createAsyncThunk(
    'async/registerNewUser',
    async function (param, options) {
        const response = await fetch(process.env.REACT_APP_API_URL + 'register_user/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: param.username,
                email: param.email,
                password: param.password,
                ref_id: param.refID,
            })
        })

        const data = await response.json();

        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)

export const loginUser = createAsyncThunk(
    'async/loginUser',
    async function (param, options) {
        const response = await fetch(process.env.REACT_APP_API_URL + 'api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: param.login,
                password: param.password,
                role: 'admin',
            })
        })

        const data = await response.json();

        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuth: false,
        fething: false,
        registered: false,
        error: '',
        authError: '',
        registerErrors: '',
        liq: false
        // liq: true
    },
    reducers: {
        userLogout: (state, action) => {
            // state={...state}
            state.user = null
            state.isAuth = false
            state.fething = false
            state.error = ''
            state.registerErrors = ''

            clearToken()
        },
        resetRegister: (state) => {
            state.registered = false
        },
        clearUserData: (state, action) => {
            state.user = null
            state.isAuth = false
            state.fething = false
            state.error = ''
            state.registerErrors = ''

        },
        openLiq: (state, action) => {
            state.liq = true
        },
        closeLiq: (state) => {
            state.liq = false
        },
    },
    extraReducers:
        (builder) => {
            builder.addCase(getUserData.pending, (state, action) => {
                state.fething = "loading"
            })
            builder.addCase(getUserData.fulfilled, (state, action) => {
                state.fething = "fullfilled"

                action.payload && setStorage(action.payload?.user)
                // /dashboard/get_crypto_prices/
                state.isAuth = true
                if (action.payload) {
                    state.user = action.payload

                }
                state.error = ''
                state.registerErrors = ''

            })
            builder.addCase(getUserData.rejected, (state, action) => {
                state.fething = "rejected"
                state.error = action.error.message || action.error.stack
            })

            builder.addCase(loginUser.pending, (state, action) => {
                state.fething = "loading"
            })
            builder.addCase(loginUser.fulfilled, (state, action) => {
                state.fething = "fulfilled"

                if (action.payload.token) {
                    setToken(action.payload)

                    state.isAuth = true
                    state.user = action.payload
                    state.error = ''
                    state.registerErrors = ''

                }
                console.log('action :>> ', action);
            })
            builder.addCase(loginUser.rejected, (state, action) => {
                state.fething = "rejected"
                console.log('action :>> ', action);
                state.authError = action.error.message && action.payload.message
            })
            builder.addCase(registerNewUser.pending, (state, action) => {
                state.fething = "loading"
                state.registerErrors = ''
            })
            builder.addCase(registerNewUser.fulfilled, (state, action) => {
                state.fething = "fulfilled"
                state.registered = true
                state.registerErrors = ''

            })
            builder.addCase(registerNewUser.rejected, (state, action) => {
                state.fething = "rejected"

                state.registerErrors = action.payload
            })

        }
})

export const { userLogout, clearUserData, resetRegister , openLiq,
    closeLiq} = authSlice.actions

export default authSlice.reducer;