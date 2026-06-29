import { ref } from 'vue'
import { useRequest } from './core/request.js';
export function useResources(resources) {
    const items = ref(null)
    const item = ref(null)
    const { error, isLoading, get, post, put, del } = useRequest()
    const getById = async (id) => {
        const response = await get(`/api/${resources}/${id}`)
        item.value = response.data.data
    }
    const getAll = async () => {
        const response = await get(`/api/${resources}`)
        items.value = response.data
    }
    const create = async (form) => {
        const response = await post(`/api/${resources}`, form)
        item.value = response.data.data
    }
    const update = async (form, id) => {
        const response = await put(`/api/${resources}/${id}`, form)
        item.value = response.data.data
    }
    const remove = async (id) => {
        const response = await del(`/api/${resources}/${id}`)
    }
    return { error, isLoading, items, item, getById, getAll, create, remove, update }
}
