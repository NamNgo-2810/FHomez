import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaWindowClose } from 'react-icons/fa';

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 200,
  height: 200,
  padding: 4,
  boxSizing: "border-box",
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden",
  width:'100%',
  height:'100%',
  position: "relative"
};

const img = {
  display: "block",
  width: "100%",
  height: "100%",
};

const PreviewImage = ({files,setFiles}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
    },
    maxFiles: 5,
    maxSize: 1500000,
    required: true,
    multiple: true,
    onDrop: (acceptedFiles) => {
      if(acceptedFiles.length === 1) {
        let newImg = Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0])
        })
        setFiles((prev) => [...prev, newImg]);
      }else {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
      }
    }
  });

  const thumbs = files.map((file,index) => (
    <div style={thumb} key={index}>
      <div style={thumbInner}>
        <img
          alt={file.path}
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded -> error if delete an item from list
          // onLoad={() => {
          //   URL.revokeObjectURL(file.preview);
          // }}
        />
        <FaWindowClose onClick={() => handleDelete(index)} style={{position: 'absolute',right:'0px',top:'-4px',color: 'white',cursor: 'pointer'}}>X</FaWindowClose>
      </div>
    </div>
  ));

  const handleDelete = (id) => {
    let newFiles = files.filter((file,index) => index !== id)
    setFiles(newFiles);
  }

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p style={{height:'100px',backgroundColor:'#f2e3e3',border:'1px dashed black',borderRadius:'5px',textAlign:'center',lineHeight:'100px'}}>Kéo thả hoặc bấm để chọn hình ảnh</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
};

export default PreviewImage;
