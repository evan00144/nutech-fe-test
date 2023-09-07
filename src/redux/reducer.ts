// Part 1
import { createSlice } from "@reduxjs/toolkit"

// Part 2
export interface item {
    user: any,
    menuLayanan:any[]|null
    banner:any[]|null
}
const initialState: item = {
    user: null,
    menuLayanan:null,
    banner:null
}

// Part 3
export const itemSlicer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: any) => {
            state.user={
                ...state.user,
                ...action.payload
            }
        },
        setMenulayanan: (state, action: any) => {
            state.menuLayanan=[...action.payload]
        }
        ,
        setBanner: (state, action: any) => {
            state.banner=[...action.payload]
        }
    }
})

// Part 4
export const { setUser,setMenulayanan,setBanner } = itemSlicer.actions
export default itemSlicer.reducer
