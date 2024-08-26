import axios from "axios"
import { BASE_URL } from "./config"
import { tokenStorage } from "@state/storage"
import { useAuthStore } from "@state/authStorage"
import { resetAndNavigate } from "@utils/NavigationUtils"
import { appAxios } from "./apiInterceptors"

export const customerLogin = async (phone: string) => {
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`, { phone })
        const { accessToken, refreshToken, customer } = response.data
        tokenStorage.set("accessToken", accessToken)
        tokenStorage.set("refreshToken", refreshToken)
        const { setUser } = useAuthStore.getState()
        setUser(customer)
    } catch (error) {
        console.log(error, "Failed to login")

    }
}


export const refreshUser = async (setUser: any) => {
    try {
        const response = await appAxios.get('/user')
        setUser(response?.data?.user)
    } catch (error) {
        console.log(error, "Failed to login")
    }
}

export const refresh_tokens = async () => {
    try {
        const refreshToken = tokenStorage.getString("refreshToken") as string
        const response = await axios.post(`${BASE_URL}/refresh-token`, { refreshToken })
        const new_access_token = response.data.accessToken
        const new_refresh_token = response.data.accessToken
        tokenStorage.set("accessToken", new_access_token)
        tokenStorage.set("refreshToken", new_refresh_token)
        return new_access_token
    } catch (error) {
        console.log(error, "Refresh token error❌")
        tokenStorage.clearAll()
        resetAndNavigate("CustomerLogin")

    }
}

export const deliveryLogin = async (loginDetails: object) => {
    const { email, password } = loginDetails as any
    try {
        const response = await axios.post(`${BASE_URL}/delivery/login`, { email, password })
        const { accessToken, refreshToken, deliveryPartner } = response.data
        tokenStorage.set("accessToken", accessToken)
        tokenStorage.set("refreshToken", refreshToken)
        const { setUser } = useAuthStore.getState()
        setUser(deliveryPartner)
    } catch (error) {
        console.log(error, "Failed to login")

    }
}