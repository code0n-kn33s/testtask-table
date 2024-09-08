import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, privateFetch, publicFetch, clearToken } from '../helpers'
import moment from 'moment'

export const deleteTypes = createAsyncThunk(
    'async/deleteTypes',
    async function (param, options) {
        console.log('param :>> ', param);
        const response = await privateFetch('api/type/?id=' + param, {
            method: "DELETE",

        })

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const deleteDevices = createAsyncThunk(
    'async/deleteDevices',
    async function (param, options) {
        const response = await privateFetch('api/device/?id=' + param, {
            method: "DELETE",

        })
        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const deleteRozborka = createAsyncThunk(
    'async/deleteRozborka',
    async function (param, options) {
        const response = await privateFetch('api/rozborka/?id=' + param, {
            method: "DELETE",

        })
        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const deleteModels = createAsyncThunk(
    'async/deleteModels',
    async function (param, options) {
        const response = await privateFetch('api/model/?id=' + param, {
            method: "DELETE",

        })

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const deleteYears = createAsyncThunk(
    'async/deleteYears',
    async function (param, options) {
        const response = await privateFetch('api/years/?id=' + param, {
            method: "DELETE",

        })

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const deleteMotos = createAsyncThunk(
    'async/deleteMotos',
    async function (param, options) {

        const response = await privateFetch('api/moto/?id=' + param, {
            method: "DELETE",
        }, true)

        const data = await response.json()

        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)

const deleteSlice = createSlice({
    name: 'delete',
    initialState: {
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        //delete deleteMotos
        builder.addCase(deleteMotos.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(deleteMotos.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(deleteMotos.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //delete deleteYears
        builder.addCase(deleteYears.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(deleteYears.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(deleteYears.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //delete deleteModels
        builder.addCase(deleteModels.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(deleteModels.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(deleteModels.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //delete tyupes
        builder.addCase(deleteTypes.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(deleteTypes.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(deleteTypes.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //delete rozborka
        builder.addCase(deleteRozborka.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(deleteRozborka.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(deleteRozborka.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //delete devices
        builder.addCase(deleteDevices.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(deleteDevices.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(deleteDevices.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
    }
})

export default deleteSlice.reducer;