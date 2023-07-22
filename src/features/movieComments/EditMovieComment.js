import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectMovieCommentById} from './movieCommentsApiSlice'
import { selectAllUsers } from '../users/usersApiSlice'
import EditMovieCommentForm from './EditMovieCommentForm'

const EditMovieComment = () => {
    const { id } = useParams()

    const movieComment = useSelector(state => selectMovieCommentById(state, id))
    const users = useSelector(selectAllUsers)
    const content = movieComment && users ? <EditMovieCommentForm movieComment={movieComment} users={users} /> : <p>Loading...</p>

    return content
}
export default EditMovieComment