import {
  IProductInfoColor,
  IProductInfoDecor,
} from "./../../../../types/Management/IProductInfo";
import managementApi from "./managementApi";
import { IGetMarkaResponse } from "../../../../types/Management/Marka";

export const managementEndpoints = managementApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategory: builder.query<IGetMarkaResponse, any>({
      query: (arg) => ({
        url: `category`,
        params: { parentId: arg.parentId, page: 1, limit: 200 },
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    createCategory: builder.mutation<any, FormData | { title: string }>({
      query: (body) => ({
        url: "category",
        method: "POST",
        body,
      }),
      invalidatesTags: ["category"],
    }),
    deleteCategory: builder.mutation<any, { id: number }>({
      query: (arg) => ({
        url: `category/${arg.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["category"],
    }),

    // product-info
    getProductInfoColor: builder.query<IProductInfoColor[], any>({
      query: () => ({
        url: `product-info/color`,
        method: "GET",
        params: {
          page: 1,
          limit: 200,
        },
      }),
      providesTags: ["product-info-color"],
    }),
    createProdctInfoColor: builder.mutation<
      any,
      { title: string; value: string }
    >({
      query: (body) => ({
        url: "product-info/color",
        method: "POST",
        body,
      }),
      invalidatesTags: ["product-info-color"],
    }),
    getProductInfoDecor: builder.query<IProductInfoDecor[], any>({
      query: () => ({
        url: `product-info/decor`,
        method: "GET",
        params: {
          page: 1,
          limit: 200,
        },
      }),
      providesTags: ["product-info-decor"],
    }),
    createProdctInfoDecor: builder.mutation<any, { title: string }>({
      query: (body) => ({
        url: "product-info/decor",
        method: "POST",
        body,
      }),
      invalidatesTags: ["product-info-decor"],
    }),
    getProductInfoFrame: builder.query<IProductInfoDecor[], any>({
      query: () => ({
        url: `product-info/frame`,
        method: "GET",
        params: {
          page: 1,
          limit: 200,
        },
      }),
      providesTags: ["product-info-frame"],
    }),
    createProdctInfoFrame: builder.mutation<any, { title: string }>({
      query: (body) => ({
        url: "product-info/frame",
        method: "POST",
        body,
      }),
      invalidatesTags: ["product-info-frame"],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,

  useGetProductInfoColorQuery,
  useCreateProdctInfoColorMutation,
  useGetProductInfoDecorQuery,
  useCreateProdctInfoDecorMutation,
  useGetProductInfoFrameQuery,
  useCreateProdctInfoFrameMutation,
} = managementEndpoints;
