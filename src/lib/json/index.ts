export const parseJsonFromFile = async (file: File) => {
    return new Promise<any>((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.onload = (event) => {
            const text = event.target?.result as string
            resolve(JSON.parse(text))
        }
        fileReader.onerror = error => reject(error)
        fileReader.readAsText(file)
    })
}