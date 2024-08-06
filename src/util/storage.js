import axios from "axios";

class Storage {
    async upload(file, directory) {
        return new Promise(async (resolve, reject) => {
            try {
                let payload = new FormData()
                payload.append('attachment', file)
                const { url } = await axios.post(`${process.env.NEXT_PUBLIC_STORAGE_URL}/${directory}`, payload, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Autherization': process.env.NEXT_PUBLIC_STORAGE_KEY
                    }
                })
                return resolve({url})
            } catch (error) {
                return reject(error)
            }
        })
    }
}

export default new Storage