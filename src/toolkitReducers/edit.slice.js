import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { setToken, privateFetch, publicFetch, clearToken } from '../helpers'
import moment from 'moment'

export const editTypes = createAsyncThunk(
    'async/editTypes',
    async function (param, options) {
        const response = await publicFetch('api/type', {
            method: "PATCH",
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
export const editDevices = createAsyncThunk(
    'async/editDevices',
    async function (param, options) {
        const formData = new FormData();

        param.id && formData.append('id', param.id);
        formData.append('name', param.name);
        param.price && formData.append('price', param.price);
        formData.append('title', param.title);

        param.typeId && formData.append('typeId', param.typeId);
        param.motoId && formData.append('motoId', param.motoId);

        if (Array.isArray(param.modelId)) {
            // Якщо так, додаємо кожен елемент масиву окремо
            param.modelId.forEach(id => formData.append('modelId', id));
        } else {
            // Якщо modelId не є масивом, додаємо його як одиночний елемент
            param.modelId && formData.append('modelId', param.modelId);
        }

        param.images?.forEach((img, index) => {
            return typeof img === 'string' ? formData.append('images', img) : formData.append(`images`, img.file);
        });

        const response = await publicFetch('api/device', {
            method: "PATCH",
            body: formData
        }, true)

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const editRozborka = createAsyncThunk(
    'async/editRozborka',
    async function (param, options) {
        const formData = new FormData();

        param.id && formData.append('id', param.id);
        formData.append('name', param.name);
        param.price && formData.append('price', param.price);
        formData.append('title', param.title);

        param.typeId && formData.append('typeId', param.typeId);
        param.motoId && formData.append('motoId', param.motoId);

        if (Array.isArray(param.modelId)) {
            // Якщо так, додаємо кожен елемент масиву окремо
            param.modelId.forEach(id => formData.append('modelId', id));
        } else {
            // Якщо modelId не є масивом, додаємо його як одиночний елемент
            param.modelId && formData.append('modelId', param.modelId);
        }

        if (Array.isArray(param.years)) {
            param.years.forEach(year => formData.append('yearId', year));
        } else {
            param.years && formData.append('yearId', param.years);
        }

        param.images?.forEach((img, index) => {
            return typeof img === 'string' ? formData.append('images', img) : formData.append(`images`, img.file);
        });

        const response = await publicFetch('api/rozborka', {
            method: "PATCH",
            body: formData
        }, true)

        const data = await response.json()
        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)
export const editModels = createAsyncThunk(
    'async/editModels',
    async function (param, options) {
        const response = await publicFetch('api/model', {
            method: "PATCH",
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
export const editMotos = createAsyncThunk(
    'async/editMotos',
    async function (param, options) {
        const formData = new FormData();

        formData.append('id', param.id);
        formData.append('mark', param.mark);
        formData.append('image', param.image);

        const response = await publicFetch('api/moto', {
            method: "PATCH",
            body: formData
        }, true)

        const data = await response.json()

        if (!response.ok) {
            return options.rejectWithValue(data);
        }

        return data
    }
)

const editeSlice = createSlice({
    name: 'edit',
    initialState: {
        error: ''
    },
    reducers: {},
    extraReducers: (builder) => {
        //edit editMotos
        builder.addCase(editMotos.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(editMotos.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(editMotos.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //edit editModels
        builder.addCase(editModels.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(editModels.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(editModels.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //edit tyupes
        builder.addCase(editTypes.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(editTypes.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(editTypes.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //edit rozborka
        builder.addCase(editRozborka.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(editRozborka.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(editRozborka.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
        //edit devices
        builder.addCase(editDevices.pending, (state, action) => {
            state.fething = "loading"
        })
        builder.addCase(editDevices.fulfilled, (state, action) => {
            state.fething = "fullfilled"
            state.error = ''
        })
        builder.addCase(editDevices.rejected, (state, action) => {
            state.fething = "rejected"
            state.error = action.payload
        })
    }
})

export default editeSlice.reducer;