import axiosAdmin from "../apiConfig/axiosAdmin"

const deleteUser = (id) => {
    return axiosAdmin.delete("user", {user_id: id})
}

const blogApproval = (id) => {
    return axiosAdmin.post("blogApproval", {motel_id: id})
}

const acceptOwner = (id) => {
    return axiosAdmin.post("acceptOwner", {user_id: id})
}

const declineOwner = (id) => {
    return axiosAdmin.post("declineOwner", {user_id: id})
}



export const adminService = {
    deleteUser,
    blogApproval,
    acceptOwner,
    declineOwner
}