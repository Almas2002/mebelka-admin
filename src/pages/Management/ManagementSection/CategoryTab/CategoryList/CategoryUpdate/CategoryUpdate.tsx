import { Badge, Box, Button, IconButton, Stack, Tooltip } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { MainButton } from "../../../../../../components/Button/MainBaseButton";
import { UploadFile } from "../../../../../../components/entities";
import { BaseSelect } from "../../../../../../components/entities/Select";
import { StyledMainInput } from "../../../../../../components/Input/StyledMainInput";
import {
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from "../../../../../../redux/store/rtk-api/management-rtk/managementEndpoints";
import { IMarka } from "../../../../../../types/Management/Marka";
import ClearIcon from "@mui/icons-material/Clear";
import { $image_api } from "../../../../../../api";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const CategoryUpdate: React.FC<{ category: IMarka }> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  const [updateCategory] = useUpdateCategoryMutation();

  const formik = useFormik({
    initialValues: {
      title: category.title,
      categoryId: undefined,
      file: undefined,
    },
    onSubmit: async (values, formikHelpers) => {
      if (file) {
        await updateCategory({
          id: category.id,
          formData: {
            categoryId: values.categoryId,
            title: values.title,
            file: file as File,
          },
        });
      } else {
        await updateCategory({
          id: category.id,
          formData: {
            categoryId: values.categoryId,
            title: values.title,
          },
        });
      }
      formikHelpers.resetForm();
    },
  });

  const { values, handleChange, handleSubmit, setFieldValue } = formik;

  const { data, isLoading } = useGetCategoryQuery("", {
    skip: isOpen ? false : true,
  });

  const newData = data?.data.map((row) => ({ id: row.id, value: row.title }));

  const [value, setValue] = useState<string>("");
  const handleSetValue = (value: string) => {
    setValue(value);
    setFieldValue("categoryId", value);
  };

  const [file, setFile] = useState<File | string | undefined>(category.icon);

  console.log("file: ", file);

  const hanldeSetIcon = (value?: File) => {
    setFile(value);
  };

  return isOpen ? (
    <form onSubmit={handleSubmit}>
      <Stack spacing={1}>
        <StyledMainInput
          value={values.title}
          onChange={handleChange}
          name={"title"}
          bordercolor={"primary"}
        />
        <BaseSelect
          value={value}
          setValue={handleSetValue}
          title="Выбрать категорию"
          row={newData}
        />

        <ChoosePicture image={file} setImage={hanldeSetIcon} />

        <div>
          <MainButton type="submit" sx={{ width: "auto" }}>
            Обновить
          </MainButton>
        </div>
      </Stack>
    </form>
  ) : (
    <MainButton onClick={() => setIsOpen(true)}>Обновить</MainButton>
  );
};

export default CategoryUpdate;

export const ChoosePicture: React.FC<{
  setImage: (value: File | undefined) => void;
  image?: string | File;
}> = ({ image, setImage }) => {
  const handleSetFile = (file: File) => {
    setImage(file);
  };

  return (
    <UploadFile
      trigger={
        <Tooltip title={"Добавить иконку для категорий"}>
          <IconButton aria-label="toggle password visibility" edge="end">
            {image ? (
              <Box
                component="img"
                src={
                  typeof image === "string"
                    ? `${$image_api}/${image}`
                    : URL.createObjectURL(
                        new Blob([image], { type: "application/image" })
                      )
                }
                sx={{
                  width: "45px",
                  height: "45px",
                  backgroundColor: "secondary.200",
                  backgroundRepeat: "no-repeat",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
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
