import { Button, Stack, Typography } from "@mui/material";
import { Formik } from "formik";
import { FC, useState } from "react";
import BaseAccordion from "../../../../../components/BaseAccordion/StepperAccordion";
import MainBaseButton from "../../../../../components/Button/MainBaseButton/MainBaseButton";
import { StyledMainInput } from "../../../../../components/Input/StyledMainInput";
import { MainButton } from "../../../../../components/styled-components/StyledButton";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "../../../../../redux/store/rtk-api/management-rtk/managementEndpoints";

interface Props {
  data: { id: number; title: string };
}

const CategoryOne: FC<Props> = ({ data }) => {
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
      summary={data.title}
      expanded={expanded}
      setExpanded={setExpanded}
    >
      <Stack spacing={2}>
        <Stack>
          <Typography>Добавить Подкатегорию</Typography>

          <Formik
            initialValues={{ value: "" }}
            onSubmit={(values) => {
              create({ categoryId: data.id, title: values.value });
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
                    Удалить
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
