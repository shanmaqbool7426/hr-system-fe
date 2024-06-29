import axiosInstance from "./axios";

export function capitalize(value) {
    if (value)
        return value.charAt(0).toUpperCase() + value.slice(1);
    return ""
}


export function uploader(file, onComplete) {
    return new Promise(async (resolve, reject) => {
        try {
            let payload = new FormData()
            payload.append('attachment', file)
            const { url } = await axiosInstance.post('/files/upload', payload, {
                header: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            return resolve(onComplete(url))
        } catch (error) {
            return reject(error)
        }
    })
}