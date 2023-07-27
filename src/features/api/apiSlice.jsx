import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
  }),
  tagTypes: ['videos', 'Video', 'RelatedVideos'],
  endpoints: (builder) => ({
    getVideos: builder.query({
      query: () => '/videos',
      keepUnusedDataFor: 600, // value in second
      providesTags: ['videos'],
    }),

    getVideo: builder.query({
      query: (videoId) => `/videos/${videoId}`,
      providesTags: (result, error, arg) => [{ type: 'Video', id: arg }],
    }),

    getRelatedVideos: builder.query({
      query: ({ id, title }) => {
        const tags = title.split(' ')
        const likes = tags.map((tag) => `title_like=${tag}`)
        const queryString = `/videos?${likes.join('&')}&_limit=4`
        return queryString
      },
      providesTags: (result, error, arg) => [
        { type: 'RelatedVideos', id: arg.id },
      ],
    }),

    addVideo: builder.mutation({
      query: (data) => ({
        url: '/videos',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['videos'],
    }),

    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        'Videos',
        { type: 'Video', id: arg.id },
        { type: 'RelatedVideos', id: arg.id },
      ],
    }),
  }),
})

export const {
  useGetVideosQuery,
  useGetVideoQuery,
  useGetRelatedVideosQuery,
  useAddVideoMutation,
  useEditVideoMutation,
} = apiSlice
