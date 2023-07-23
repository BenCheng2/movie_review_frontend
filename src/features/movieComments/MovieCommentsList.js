import {useGetMovieCommentsQuery} from "./movieCommentsApiSlice";
import MovieComments from "./MovieComments";
import useAuth from "../../hooks/useAuth";

const MovieCommentsList = () => {
    const {username, isManager, isAdmin} = useAuth();

    const {
        data: movieComments,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetMovieCommentsQuery(undefined, {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <p>Loading...</p>

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = movieComments

        let filteredIds
        if (isManager || isAdmin) {
            filteredIds = [...ids]
        } else {
            filteredIds = ids.filter(movieCommentId => entities[movieCommentId].username === username)
        }

        const tableContent = ids?.length && filteredIds.map(movieCommentId => <MovieComments key={movieCommentId} movieCommentId={movieCommentId} />)

        content = (
            <table className="table table--notes">
                <thead className="table__thead">
                <tr>
                    <th scope="col" className="table__th note__status">Username</th>
                    <th scope="col" className="table__th note__created">Created</th>
                    <th scope="col" className="table__th note__updated">Updated</th>
                    <th scope="col" className="table__th note__title">Title</th>
                    <th scope="col" className="table__th note__username">Owner</th>
                    <th scope="col" className="table__th note__edit">Edit</th>
                </tr>
                </thead>
                <tbody>
                {tableContent}
                </tbody>
            </table>
        )
    }

    return content
}
export default MovieCommentsList