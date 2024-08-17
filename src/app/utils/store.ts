import {create} from "zustand";
import {ProductType, UserType} from '@/app/types'
import toast from 'react-hot-toast'

interface userStoreType {
    user : UserType;
    setUser : (newUser:UserType) => void
}

export const useUserStore = create<userStoreType>((set)=>({
    user: {
        username:"",
        email:"",
        id:"",
        isAdmin:false,
        cart:[],
    },
    setUser: (newuser) => set({user: newuser}),
}))

interface productStoreType {
    products: ProductType[];
    setProducts: (newProducts:ProductType[]) => void;
}

export const useProductStore = create<productStoreType>((set)=>({
    products:[],
    setProducts: (newProducts) => set({products: newProducts}),
}))

export const useFilterDropDownStore = create((set)=>({
    isFilterDropdownOpen: false,
    toggleFilterDropDown: () => set((state:any) => ({isFilterDropdownOpen: !state.isFilterDropdownOpen}))
}))

export const useSuccessStore = create(()=>({
    successToast: () => toast.success('Added to cart'),
    errorToast: () => toast.error('Login First'),
}))