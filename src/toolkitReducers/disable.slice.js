import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, privateFetch, publicFetch, getToken, clearToken } from '../helpers'
import moment from 'moment'

export const getTypes = createAsyncThunk(
    'async/getTypes',
    async function (param, options) {
        const response = await publicFetch('api/type')

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const getDevices = createAsyncThunk(
    'async/getDevices',
    async function (param, options) {
        const response = await publicFetch('api/device')

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const getModels = createAsyncThunk(
    'async/getModels',
    async function (param, options) {
        const response = await publicFetch('api/model')

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const getMotos = createAsyncThunk(
    'async/getMotos',
    async function (param, options) {
        const response = await publicFetch('api/moto')

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)

export const getGlobalProfit = createAsyncThunk(
    'async/getGlobalProfit',
    async function (param, options) {
        const response = await fetch(process.env.REACT_APP_API_URL + 'get_global_profit/')

        const data = await response.json();

        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)

const actionsSlice = createSlice({
    name: 'state',
    initialState: {
        currenciesFetch: null,
        kissFields: null,
        isTooltip: false,
        motos: null,
        types: null,
        devices: null,
        models: null,
        error: ''
    },
    reducers: {
        textTooltipClear: (state, action) => {
            state.tooltipText = ''
        },
        closeTooltip: (state, action) => {
            state.isTooltip = false
        },
        openTooltip: (state, action) => {
            state.isTooltip = true
        },
        clearData: (state) => {
            state.currenciesFetch = null
            state.kissFields = null
            state.isTooltip = false
            state.motos = null
            state.types = null
            state.devices = null
            state.models = null
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        //get getGlobalProfit
        builder.addCase(getGlobalProfit.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(getGlobalProfit.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            state.globalProfit = action.payload
            state.error = ''
        })
        builder.addCase(getGlobalProfit.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })

        //get getMotos
        builder.addCase(getMotos.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(getMotos.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.motos = payload

            state.error = ''
        })
        builder.addCase(getMotos.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //get getModels
        builder.addCase(getModels.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(getModels.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.models = payload

            state.error = ''
        })
        builder.addCase(getModels.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //get tyupes
        builder.addCase(getTypes.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(getTypes.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.types = payload

            state.error = ''
        })
        builder.addCase(getTypes.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //get devices
        builder.addCase(getDevices.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(getDevices.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            const { payload } = action;

            state.devices = payload

            state.error = ''
        })
        builder.addCase(getDevices.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
    }
})

export const {
    textTooltipClear,
    closeTooltip,
    openTooltip,
    clearData
} = actionsSlice.actions

export default actionsSlice.reducer;