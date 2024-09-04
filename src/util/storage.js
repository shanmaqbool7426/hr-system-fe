import axios from "axios";

class StorageClass {
    async upload(file, directory, multiple = false) {
        return new Promise(async (resolve, reject) => {
            try {
                let payload = new FormData()
                payload.append('attachment', file)
                const res = await axios.post(`${process.env.NEXT_PUBLIC_STORAGE_URL}/${directory}`, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': process.env.NEXT_PUBLIC_STORAGE_KEY
                    }
                })
                const files = res.data.data.map(item => {
                    item = { ...item }
                    item.url = `${process.env.NEXT_PUBLIC_STORAGE_URL}/${item.url}`
                    return item
                })
                if (multiple) {
                    return resolve(files)
                } else {
                    return resolve(files[0])
                }
            } catch (error) {
                return reject(error)
            }
        })
    }
}
const Storage = new StorageClass
export default Storage 