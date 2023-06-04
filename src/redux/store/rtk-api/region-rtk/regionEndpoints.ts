import staffApi from "./regionApi";
import { IRegion } from "./region.type";

export const homeEndpoints = staffApi.injectEndpoints({
  endpoints: (builder) => ({
    getRegion: builder.query<IRegion[], string>({
      query: () => ({
        url: `region`,
        method: "GET",
        params: {
          page: 1,
          limit: 200,
        },
      }),
      providesTags: ["region"],
    }),
  }),
});

export const { useGetRegionQuery } = homeEndpoints;
