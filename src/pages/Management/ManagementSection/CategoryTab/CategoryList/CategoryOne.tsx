import {
  Badge,
  Box,
  Button,
  CircularProgress,
  IconButton,
  InputAdornment,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import { FC, useState } from "react";
import { $image_api } from "../../../../../api";
import BaseAccordion from "../../../../../components/BaseAccordion/StepperAccordion";
import MainBaseButton from "../../../../../components/Button/MainBaseButton/MainBaseButton";
import { StyledMainInput } from "../../../../../components/Input/StyledMainInput";
import { MainButton } from "../../../../../components/styled-components/StyledButton";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../../../../redux/store/rtk-api/management-rtk/managementEndpoints";
import { IMarka } from "../../../../../types/Management/Marka";
import CategoryUpdate from "./CategoryUpdate";

interface Props {
  data: IMarka;
  parent?: boolean;
}

const CategoryOne: FC<Props> = ({ data, parent }) => {
  const [create] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [expanded, setExpanded] = useState<string | false>(false);

  const { data: childData, isLoading } = useGetCategoryQuery(
    { parentId: data.id },
    { skip: expanded ? false : true }
  );

  const handleDelete = () => {
    deleteCategory({ id: data.id });
  };

  return (
    <BaseAccordion
      summary={
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{data.title}</Typography>
          {data.icon && (
            <Box
              component="img"
              sx={{
                width: "45px",
                height: "45px",
                backgroundRepeat: "no-repeat",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={`${$image_api}/${data.icon}`}
            />
          )}
        </Stack>
      }
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <Stack spacing={2}>
        {parent && <CategoryUpdate category={data} />}

        <Stack>
          <Typography>Добавить Подкатегорию</Typography>

          <Formik
            initialValues={{ value: "" }}
            onSubmit={async (values, formikHelper) => {
              const formData = new FormData();

              formData.append("categoryId", String(data.id));
              formData.append("title", String(values.value));

              await create(formData);
              formikHelper.resetForm();
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
                  />
                  <MainBaseButton
                    bgcolor="primary.main"
                    sx={{ width: "120px" }}
                    type="submit"
                  >
                    Добавить
                  </MainBaseButton>
                  <MainBaseButton
                    onClick={handleDelete}
                    bgcolor="error.main"
                    sx={{ width: "120px" }}
                  >
                    Удалить {data.title}
                  </MainBaseButton>
                </Stack>
              </form>
            )}
          </Formik>
        </Stack>

        {isLoading && <Typography>Загрузка...</Typography>}

        {childData &&
          childData.count > 0 &&
          childData.data.map((row) => <CategoryOne data={row} />)}
      </Stack>
    </BaseAccordion>
  );
};

export default CategoryOne;
