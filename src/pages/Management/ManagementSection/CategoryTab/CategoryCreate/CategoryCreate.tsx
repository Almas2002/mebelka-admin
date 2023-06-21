import {
  Badge,
  Box,
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Formik } from "formik";

import MainBaseButton from "../../../../../components/Button/MainBaseButton/MainBaseButton";
import { StyledMainInput } from "../../../../../components/Input/StyledMainInput";
import { useCreateCategoryMutation } from "../../../../../redux/store/rtk-api/management-rtk/managementEndpoints";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { UploadFile } from "../../../../../components/entities";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";

const CategoryCreate = () => {
  const [create] = useCreateCategoryMutation();

  const [icon, setIcon] = useState<File | undefined>();

  return (
    <Stack>
      <Typography>Добавить категорию</Typography>

      <Formik
        initialValues={{ value: "" }}
        onSubmit={async (values, helper) => {
          const formData = new FormData();
          formData.append("title", values.value);
          icon && formData.append("file", icon);

          await create(formData);
          helper.resetForm();
          setIcon(undefined)
        }}
      >
        {({ values, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Stack direction={"row"} spacing={2}>
              <StyledMainInput
                value={values.value}
                onChange={handleChange}
                name={"value"}
                bordercolor={"primary"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <ChoosePicture icon={icon} setIcon={setIcon} />
                    </InputAdornment>
                  ),
                }}
              />
              <MainBaseButton
                bgcolor="primary.main"
                sx={{ width: "120px" }}
                type="submit"
              >
                Добавить
              </MainBaseButton>
            </Stack>
          </form>
        )}
      </Formik>
    </Stack>
  );
};

export default CategoryCreate;

const ChoosePicture: React.FC<{
  icon: File | undefined;
  setIcon: (value: File | undefined) => void;
}> = ({ icon, setIcon }) => {
  const [file, setFile] = useState<File | undefined>();

  useEffect(() => {
    setFile(icon);
  }, [icon]);

  const handleSetFile = (file: File) => {
    setFile(file);
    setIcon(file);
  };

  const handleRemoveFile = () => {
    setFile(undefined);
    setIcon(undefined);
  };

  return (
    <UploadFile
      trigger={
        <Tooltip title={"Добавить иконку для категорий"}>
          <IconButton aria-label="toggle password visibility" edge="end">
            {file ? (
              <Badge
                badgeContent={
                  <IconButton size="small" onClick={handleRemoveFile}>
                    <ClearIcon fontSize="small" color="primary" />
                  </IconButton>
                }
              >
                <Box
                  component="img"
                  src={URL.createObjectURL(
                    new Blob([file], { type: "application/image" })
                  )}
                  sx={{
                    width: "45px",
                    height: "45px",
                    backgroundColor: "secondary.200",
                    backgroundRepeat: "no-repeat",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Badge>
            ) : (
              <AddRoundedIcon />
            )}
          </IconButton>
        </Tooltip>
      }
      handleSetFile={handleSetFile}
    />
  );
};
