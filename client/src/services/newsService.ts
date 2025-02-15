import { blendkoApi } from "./api";

const getToken = () => {
    if(typeof localStorage !== 'undefined') {
        return localStorage.getItem('token')
    }
    return null;
};

export const newsService = blendkoApi.injectEndpoints({
    endpoints: (builder) => ({
        getNews: builder.query({
            query: (page = 1) => ({
              url: `/news?page=${page}`,
              method: 'GET',
            }),
            serializeQueryArgs: ({ endpointName }) => {
              return endpointName;
            },
            merge: (currentCache, newItems) => {
              if (currentCache) {
                return {
                  ...newItems,
                  news: [...currentCache.news, ...newItems.news],
                };
              }
              return newItems;
            },
            forceRefetch({ currentArg, previousArg }) {
              return currentArg !== previousArg;
            },
            providesTags: ['News'],
          }),

        getSingleNews: builder.query({
            query: (id: string) => ({
                url: `/news/${id}`,
                method: 'GET',
            }),
            providesTags: ['News'],
        }),

        createNews: builder.mutation({
            query: (newsData) => ({
                url: '/news/new',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
                body: newsData,
            }),
            invalidatesTags: ['News'],
        }),

        updateNews: builder.mutation({
            query: ({id, newsData }) => ({
                url: `/news/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newsData),
            }),
            invalidatesTags: ['News'],
        }),

        deleteNews: builder.mutation({
            query: (id: string) => ({
                url: `/news/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${getToken()}`,
                },
            }),
            invalidatesTags: ['News'],
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetNewsQuery,
    useGetSingleNewsQuery,
    useCreateNewsMutation,
    useUpdateNewsMutation,
    useDeleteNewsMutation,
} = newsService;