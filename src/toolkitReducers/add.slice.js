import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, privateFetch, publicFetch, addToken, clearToken } from '../helpers'
import moment from 'moment'

export const addTypes = createAsyncThunk(
    'async/addTypes',
    async function (param, options) {
        console.log('param', param)
        const response = await publicFetch('api/type', {
            method: "POST",
            body: JSON.stringify({
                name: param
            })
        })

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const addDevices = createAsyncThunk(
    'async/addDevices',
    async function (param, options) {

        const formData = new FormData();

        param.name && formData.append('name', param.name);
        param.price && formData.append('price', parseInt(param.price));
        param.title && formData.append('title', param.title);

        param.typeId && formData.append('typeId', parseInt(param.typeId));
        param.motoId && formData.append('motoId', parseInt(param.motoId));
        if (Array.isArray(param.modelId)) {
            // Якщо так, додаємо кожен елемент масиву окремо
            param.modelId.forEach(id => formData.append('modelId', id));
        } else {
            // Якщо modelId не є масивом, додаємо його як одиночний елемент
            param.modelId && formData.append('modelId', param.modelId);
        }

        param.images?.forEach((img, index) => {
            formData.append(`images`, img.file);
        });

        const response = await publicFetch('api/device/create', {
            method: "POST",
            body: formData
        }, true)

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const addRasborka = createAsyncThunk(
    'async/addRasborka',
    async function (param, options) {

        const formData = new FormData();

        param.name && formData.append('name', param.name);
        param.price && formData.append('price', parseInt(param.price));
        param.title && formData.append('title', param.title);

        param.typeId && formData.append('typeId', parseInt(param.typeId));
        param.motoId && formData.append('motoId', parseInt(param.motoId));

        if (Array.isArray(param.modelId)) {
            param.modelId.forEach(id => formData.append('modelId', id));
        } else {
            param.modelId && formData.append('modelId', param.modelId);
        }

        if (Array.isArray(param.years)) {
            param.years.forEach(year => formData.append('yearId', year));
        } else {
            param.years && formData.append('yearId', param.years);
        }

        param.images?.forEach((img, index) => {
            formData.append(`images`, img.file);
        });

        const response = await publicFetch('api/rozborka/create', {
            method: "POST",
            body: formData
        }, true)

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const addModels = createAsyncThunk(
    'async/addModels',
    async function (param, options) {
        const response = await publicFetch('api/model', {
            method: "POST",
            body: JSON.stringify({
                ...param
            })
        })

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const addYears = createAsyncThunk(
    'async/addYears',
    async function (param, options) {
        const response = await publicFetch('api/years', {
            method: "POST",
            body: JSON.stringify(
                {years: param}
            )
        })

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const addMotos = createAsyncThunk(
    'async/addMotos',
    async function (param, options) {


        const formData = new FormData();
        formData.append('mark', param.mark);
        param.image && formData.append('image', param.image);

        const response = await publicFetch('api/moto/create', {
            method: "POST",
            body: formData
        }, true)

        const data = await response.json()

        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)

const addedSlice = createSlice({
    name: 'add',
    initialState: {
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        //add addMotos
        builder.addCase(addMotos.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(addMotos.fulfilled, (state, action) => {
            state.fething = "fullfilled"

            state.error = ''
        })
        builder.addCase(addMotos.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //add addYears
        builder.addCase(addYears.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(addYears.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(addYears.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //add addModels
        builder.addCase(addModels.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(addModels.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(addModels.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //add tyupes
        builder.addCase(addTypes.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(addTypes.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(addTypes.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //add rozborka
        builder.addCase(addRasborka.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(addRasborka.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(addRasborka.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //add devices
        builder.addCase(addDevices.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(addDevices.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(addDevices.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
    }
})

export default addedSlice.reducer;