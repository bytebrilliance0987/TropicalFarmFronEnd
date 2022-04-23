export function toBase64(file: File){
    return new Promise((resolve, rejects) => {
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error: any) => rejects(error);
    })
}