import { useState } from "react";
import axios from "axios";
import React from "react";
import "./FileUpload.css";

const FileUpload = ({ contract, account }) => {
  const [file, setFile] = useState(null);
  const [filename, setFilename] = useState("No image selected");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              pinata_api_key: "a1613b9d7240bbd90b56",
              pinata_secret_api_key: "729ea7353915fa201c13a86445f09181e7d22e15b87efbe878b4013a5f7d6431",
            },
          }
        );

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
        console.log(ImgHash);

        // Interact with the smart contract
        await contract.add(account, ImgHash);

        alert("Successfully Image Uploaded");
        setFilename("No image selected");
        setFile(null);
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload image: " + error.message);
      }
    } else {
      alert("Please select a file to upload.");
    }
  };

  const retrieveFile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFilename(selectedFile.name);
    }
  };

  return (
    <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input id="file-upload" type="file" name="data" onChange={retrieveFile} />
        <span className="textArea">Image: {filename}</span>
        <button type="submit" className="upload">
          Upload
        </button>
      </form>
    </div>
  );
};

export default FileUpload;
