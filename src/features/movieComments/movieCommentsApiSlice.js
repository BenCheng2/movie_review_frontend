import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import {apiSlice} from "../../app/api/apiSlice"

const movieCommentsAdapter = createEntityAdapter({
    sortComparer: (a, b) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = movieCommentsAdapter.getInitialState()

export const movieCommentsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getMovieComments: builder.query({
            query: () => '/movieComments',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedMovieComments = responseData.map(movieComment => {
                    movieComment.id = movieComment._id
                    return movieComment
                });
                return movieCommentsAdapter.setAll(initialState, loadedMovieComments)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        {type: 'MovieComment', id: 'LIST'},
                        ...result.ids.map(id => ({type: 'MovieComment', id}))
                    ]
                } else return [{type: 'MovieComment', id: 'LIST'}]
            }
        }),
        addNewMovieComment: builder.mutation({
            query: initialMovieComment => ({
                url: '/movieComments',
                method: 'POST',
                body: {
                    ...initialMovieComment,
                }
            }),
            invalidatesTags: [
                {type: 'MovieComment', id: "LIST"}
            ]
        }),
        updateMovieComment: builder.mutation({
            query: initialMovieComment => ({
                url: '/movieComments',
                method: 'PATCH',
                body: {
                    ...initialMovieComment,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'MovieComment', id: arg.id}
            ]
        }),
        deleteMovieComment: builder.mutation({
            query: id => ({
                url: `/movieComments/`,
                method: 'DELETE',
                body: {
                    id
                }
            }),
            invalidatesTags: (result, error, arg) => [
                {type: 'MovieComment', id: arg.id}
            ]
        })

    })
})

export const {
    useGetMovieCommentsQuery,
    useAddNewMovieCommentMutation,
    useUpdateMovieCommentMutation,
    useDeleteMovieCommentMutation
} = movieCommentsApiSlice;

export const selectMovieCommentsResult = movieCommentsApiSlice.endpoints.getMovieComments.select()

const selectMovieCommentsData = createSelector(
    selectMovieCommentsResult,
    movieCommentsResult => movieCommentsResult.data
)

export const {
    selectAll: selectAllMovieComments,
    selectById: selectMovieCommentById,
    selectIds: selectMovieCommentIds
} = movieCommentsAdapter.getSelectors(state => selectMovieCommentsData(state) ?? initialState)