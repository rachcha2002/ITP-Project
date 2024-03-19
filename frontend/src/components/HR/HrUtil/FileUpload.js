import React, { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import pdfImage from "../HrImages/pdf-file.png"; // Path to your custom PDF image

const FileUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file && !props.existingFileName) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    if (file) {
      fileReader.readAsDataURL(file);
    } else {
      setPreviewUrl(props.existingFile); // Set existing file URL as preview URL
    }
  }, [file, props.existingFileName]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickFileHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".pdf"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={pdfImage} alt="Preview" />}
          {previewUrl && (
            <p className="file-upload__name">
              {file
                ? file.name
                : (
                    <a
                      href={props.existingFileName}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {props.existingFileDisplayName || "View File"}
                    </a>
                  ) || "No file chosen"}
            </p>
          )}
        </div>

        <Button variant="dark" onClick={pickFileHandler}>
          PICK PDF
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default FileUpload;
