import {combineReducers} from "@reduxjs/toolkit"

import authSlice from './auth.slice'
import stateSlice from './actions.slice'
import addedSlice from './add.slice'
import deleteSlice from './delete.slice'
import editSlice from './edit.slice'

export * from './add.slice'
export * from './auth.slice'
export * from './actions.slice'
export * from './delete.slice'
export * from './edit.slice'

const rootReducer = combineReducers({
    auth: authSlice,
    state: stateSlice,
    add: addedSlice,
    delete: deleteSlice,
    edit: editSlice,
})

export default rootReducer;
