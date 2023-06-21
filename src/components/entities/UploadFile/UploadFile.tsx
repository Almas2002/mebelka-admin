import { Icon, IconButton, Stack, Typography } from "@mui/material";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import AddIcon from "@mui/icons-material/Add";

import "./UploadFile.modules.scss";

type Props = {
  handleSetFile: (file: File) => void;
  trigger: React.ReactNode;
};

const UploadFile: React.FC<Props> = ({ handleSetFile, trigger }) => {
  const filePicker = useRef<any>(null);

  const handleChange = (e: any) => {
    const input = e.target;

    if (!input.files?.length) {
      return;
    }

    handleSetFile(input.files[0]);
  };

  const handleAddImageClick = () => {
    filePicker.current.click();
  };

  return (
    <>
      <div onClick={handleAddImageClick}>{trigger}</div>
      <input
        type="file"
        ref={filePicker}
        className="hiddenImagePicker"
        onChange={handleChange}
        accept="image/*,.png,.jpg,.jpeg,.web"
      />
    </>
  );
};

export default UploadFile;
