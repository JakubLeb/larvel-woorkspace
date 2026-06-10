import { ref } from 'vue'
export function useRequest() {
    const data = ref(null)
    const error = ref(null)
    const isLoading = ref(false)
    const request = async (url, options = {}) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await axios.request({
                method: options.method || 'GET',
                url: url,
                headers: {...options.headers},
                data: options.payload,
            })
            data.value = response.data
            return response.data
        } catch (e) {
            if (e.response) {
                if (e.response?.status == 422) {
                    error.value = e?.response?.data?.errors;
                } else {
                    error.value = `${e.response?.status} - ${e.response.data?.message}`
                }
            } else {
                error.value = e.message
            }
            throw e
        } finally {
            isLoading.value = false
        }
    }
    const get = (url) => request(url, {method: 'GET'})
    const post = (url, payload) => request(url, {method: 'POST', payload})
    const put = (url, payload) => request(url, {method: 'PUT', payload})
    const del = (url) => request(url, {method: 'DELETE'})
    return {data, error, isLoading, request, get, post, put, del}
}
