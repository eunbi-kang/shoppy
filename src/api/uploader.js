export async function uploadImage(file) {
    const data = new FormData();
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    console.log(process.env.REACT_APP_CLOUDINARY_PRESET);
    console.log(process.env.REACT_APP_CLOUDINARY_URL);
    console.log(process.env.REACT_APP_CLOUDINARY_TEST);
    return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        method: 'POST',
        body: data,
    }) //
    .then(res => res.json()) //
    .then(data => data.url);
}