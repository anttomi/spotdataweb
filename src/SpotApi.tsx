import { Artist } from "./interfaces"

const apiPath = "http://localhost:8080/"

const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        
        fileReader.onload = () => {
            resolve(fileReader.result as string)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
        
    })
}

export class SpotApi {
    
    static async getParsedData(files: FileList): Promise<{streamingData: Array<Artist>}> {

        const formData = new FormData();

        const fileArray: Promise<string>[] = []

        Array.from(files).forEach((file) => {
            fileArray.push(getBase64(file))
        })

        return Promise.all(fileArray).then((v) => {
            //console.log(encodeURIComponent(JSON.stringify(v)))
            
            formData.append("streams", JSON.stringify(v))
    
            return fetch(apiPath + "test", { method: "POST", body: encodeURIComponent(JSON.stringify(v)) })
                .then((r) => r.json())
                .then((p) => { return p })
        })
    }
}