import axiosHome from "../apiConfig/axiosHome";

const getAll = () => {
   return axiosHome.get("get_all_home")
}

const getById = (id) => {
    return axiosHome.get("get_by_home_id",id)
}


const search = (keyword) => {

}


export const productService = {
    getAll,
    getById,
    search
}