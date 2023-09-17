
const apiPath = "http://localhost:8080/"

const getBase64 = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(file)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        fileReader.onerror = (error) => {
            reject(error)
        }
    })
}

export class SpotApi {

    static async parseData(files: FileList): Promise<object> {

        const formData = new FormData();

        const fileArray: string[] = []

        Array.from(files).forEach((file) => {
            getBase64(file).then((f) => fileArray.push(f))
        })

        console.log(fileArray)
        formData.append("files", encodeURIComponent(JSON.stringify(fileArray)))

        for (const value of formData.values()) {
            console.log(value);
        }

        return fetch(apiPath + "test", { method: "POST", body: formData })
            .then((r) => r.json())
            .then((p) => { return p })
    }

}