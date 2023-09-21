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
    
    static async parseData(files: FileList): Promise<{streamingData: Array<Artist>}> {

        const formData = new FormData();

        const fileArray: Promise<string>[] = []

        Array.from(files).forEach((file) => {
            fileArray.push(getBase64(file))
            console.log(file)
        })

        return Promise.all(fileArray).then((v) => {
            console.log(JSON.stringify(v))
            
            formData.append("streams", JSON.stringify(v))
            
            
            return fetch(apiPath + "test", { method: "POST", body: JSON.stringify(v) })
                .then((r) => r.json())
                .then((p) => { return p })
        })
    }
        
    /*
    static async parseData(files: FileList): Promise<{streamingData: Array<Artist>}> {

        const formData = new FormData();

        const fileArray: File[] = []

        Array.from(files).forEach((file) => {
            fileArray.push(file)
        })
    
        
        formData.append("files", encodeURIComponent(JSON.stringify(fileArray)))
        console.log(fileArray)

        for (const value of formData.values()) {
            console.log(value);
        }
    
        return fetch(apiPath + "test", { method: "POST", body: formData })
            .then((r) => r.json())
            .then((p) => { return p })
        
    }
    */
    
}