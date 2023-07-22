import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons"
import {useNavigate} from 'react-router-dom'

import {useSelector} from 'react-redux'
import {selectMovieCommentById} from './movieCommentsApiSlice'

const MovieComments = ({movieCommentId}) => {

    const movieComment = useSelector(state => selectMovieCommentById(state, movieCommentId))

    const navigate = useNavigate()

    if (movieComment) {
        const created = new Date(movieComment.createdAt).toLocaleString('en-US', {day: 'numeric', month: 'long'})

        const updated = new Date(movieComment.updatedAt).toLocaleString('en-US', {day: 'numeric', month: 'long'})

        const handleEdit = () => navigate(`/dash/moviecomments/${movieCommentId}`)

        return (
            <tr className="table__row">
                <td className="table__cell note__status">
                    {movieComment.completed
                        ? <span className="note__status--completed">Completed</span>
                        : <span className="note__status--open">Open</span>
                    }
                </td>
                <td className="table__cell note__created">{created}</td>
                <td className="table__cell note__updated">{updated}</td>
                <td className="table__cell note__title">{movieComment.title}</td>
                <td className="table__cell note__username">{movieComment.username}</td>

                <td className="table__cell">
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare}/>
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default MovieComments