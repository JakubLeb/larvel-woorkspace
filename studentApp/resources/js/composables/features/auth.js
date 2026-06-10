import { ref } from 'vue'
import { useRequest } from './core/request.js';
const user = ref(JSON.parse(localStorage.getItem('user')))
const isLogged = ref(user.value ? true : false)
export function useAuth() {
    const { error, isLoading, get, post } = useRequest()
    const login = async (form) => {
        try {
            await get('/sanctum/csrf-cookie');
            const response = await post('/api/login', form)
            setUserState(true, response.user)
        } catch (e) {
            setUserState(false)
            console.log("Details about errors passed by the reactive error viariable!")
        }
    }
    const register = async (form) => {
        try {
            await get('/sanctum/csrf-cookie');
            const response = await axios.post('/api/register', form)
            setUserState(true, response.user)
        } catch (e) {
            setUserState(false)
            console.log("Details about errors passed by the reactive error viariable!")
        }
    }
    const logout = async () => {
        post('/api/logout')
        setUserState(false)
    }
    const setUserState = async (state, payload = null) => {
        user.value = payload
        isLogged.value = state
        localStorage.setItem("user", JSON.stringify(user.value));
    }
    return { user, isLogged, error, isLoading, register, login, logout, setUserState }
}
