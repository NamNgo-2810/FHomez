import React, { useState } from "react";
import {
    storage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from "../../services/home.service";

const UploadForm = () => {
    const [images, setImages] = useState([]);
    const [urls, setUrls] = useState([]);
    const [progress, setProgress] = useState(0);

    const handleChange = (e) => {
        for (let i = 0; i < e.target.files.length; i++) {
            const newImage = e.target.files[i];
            newImage["id"] = Math.random();
            setImages((prevState) => [...prevState, newImage]);
        }
    };

    const handleUpload = () => {
        const promises = [];
        const metadata = {
            contentType: "image/jpeg",
        };

        images.map((image) => {
            const storageRef = ref(storage, image.name);
            const uploadTask = uploadBytesResumable(
                storageRef,
                image,
                metadata
            );
            promises.push(uploadTask);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress);
                },
                (error) => {
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setUrls((prevState) => [...prevState, downloadURL]);
                            console.log("File available at", downloadURL);
                        }
                    );
                }
            );
        });
    };

    return (
        <div>
            <progress value={progress} max="100" />
            <br />
            <br />
            <input type="file" multiple onChange={handleChange} />
            <button onClick={handleUpload}>Upload</button>
            <br />
            <br />
            {urls.map((url, i) => (
                <img
                    key={i}
                    style={{ width: "500px" }}
                    src={url || "http://via.placeholder.com/300"}
                    alt="firebase-image"
                />
            ))}
        </div>
    );
};

export default UploadForm;
