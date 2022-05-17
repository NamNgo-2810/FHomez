import React, { useState } from "react";
import { storage } from "../../services/firebase.service";

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
        if(images.length !== 0) {
            const promises = [];
            images.forEach((image) => {
                const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
                    async () => {
                        await storage
                            .ref("images")
                            .child(image.name)
                            .getDownloadURL()
                            .then((urls) => {
                                setUrls((prevState) => [...prevState, urls]);
                            });
                    }
                );
            });
    
            Promise.all(promises)
                .then(() => alert("All images uploaded"))
                .catch((err) => console.log(err));
        }else {
            alert("Pls choose at least 1 image")
        }
    };

    console.log("images: ", images);
    console.log("urls", urls);

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
                    alt="avatar"
                />
            ))}
        </div>
    );
};

export default UploadForm;
