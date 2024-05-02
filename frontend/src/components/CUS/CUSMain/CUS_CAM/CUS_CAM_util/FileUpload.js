import React, { useRef, useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import pdfImage from "../../../../../images/cam/pdf-file.png"; // Path to your custom PDF image

const FileUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

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
        accept=".pdf,.png,.jpg,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`hr-image-upload ${props.center && "center"}`}>
        <div className="hr-image-upload__preview">
          {previewUrl && <img src={pdfImage} alt="Preview" />}
          {previewUrl && (
            <p className="file-upload__name">
              {file ? file.name : "No file chosen"}
            </p>
          )}
        </div>

        <Button variant="dark" onClick={pickFileHandler}>
          PICK FILE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default FileUpload;