import { useParams } from 'react-router-dom'
import { useGetMovieCommentsQuery } from './movieCommentsApiSlice'
import useAuth from '../../hooks/useAuth'
import PulseLoader from 'react-spinners/PulseLoader'
import useTitle from '../../hooks/useTitle'
import EditMovieCommentForm from "./EditMovieCommentForm";

const EditMovieComment = () => {
    useTitle('Movie Note: Edit Note')

    const { id } = useParams()

    const { username, isManager, isAdmin } = useAuth()

    const { movieComment } = useGetMovieCommentsQuery("movieCommentsList", {
        selectFromResult: ({ data }) => ({
            movieComment: data?.entities[id]
        }),
    })

    const { users } = useGetMovieCommentsQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!movieComment || !users?.length) return <PulseLoader color={"#FFF"} />


    if (!isManager && !isAdmin) {
        if (movieComment.username !== username) {
            return <p className="errmsg">No access</p>
        }
    }

    const content = <EditMovieCommentForm movieComment={movieComment} users={users} />

    return content
}
export default EditMovieComment