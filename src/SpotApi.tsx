
//Deprecated
/*

const apiPath = "http://localhost:8080/"

export class SpotApi {
    
    static async getParsedData(files: FileList): Promise<{streamingData: Array<Artist>}> {

        const formData = new FormData();

        
        return Promise.all(fileArray).then((v) => {
            //console.log(encodeURIComponent(JSON.stringify(v)))
            
            formData.append("streams", JSON.stringify(v))
    
            return fetch(apiPath + "test", { method: "POST", body: encodeURIComponent(JSON.stringify(v)) })
                .then((r) => r.json())
                .then((p) => { return p })
        })
    }
}
*/