const fileExtension = (file: File) => {
    const filename = file.name;
    const fileExtensionsPosition = file.name.lastIndexOf(".");
    return fileExtensionsPosition > 0
        ?  filename.substring(fileExtensionsPosition)
        : ''
}

const storeFileContentAsEntity = (reader: FileReader) => {
    if (reader.result) {
        console.log(reader.result.toString())
    }
}

const fileToString = (file: File) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => storeFileContentAsEntity(reader);
}

export const objectFileLoader = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files) {
        const [file] = target.files;
        console.log(`Read file called: ${file.name}`);
        fileExtension(file) === ".obj" && fileToString(file)
    }
}