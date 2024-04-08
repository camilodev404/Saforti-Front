export const generateFormId = () => {
    const timestamp = new Date().getTime();
    const id = "FISO-PN-" + timestamp;
    return id;
}