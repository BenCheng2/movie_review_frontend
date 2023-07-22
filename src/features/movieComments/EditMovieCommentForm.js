import { useState, useEffect } from "react"
import { useUpdateMovieCommentMutation, useDeleteMovieCommentMutation } from "./movieCommentsApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditMovieCommentForm = ({ movieComment, users }) => {

    const [updateMovieComment, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateMovieCommentMutation()

    const [deleteMovieComment, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteMovieCommentMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(movieComment.title)
    const [text, setText] = useState(movieComment.text)
    const [movieId, setMovieId] = useState(movieComment.movieId)
    const [completed, setCompleted] = useState(movieComment.completed)
    const [userId, setUserId] = useState(movieComment.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/movieComments')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)

    const onMovieIdChanged = e => setMovieId(e.target.value)

    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId, movieId].every(Boolean) && !isLoading

    const onSaveMovieCommentClicked = async (e) => {
        if (canSave) {
            await updateMovieComment({ id: movieComment.id, user: userId, title, text, movieId, completed })
        }
    }

    const onDeleteMovieCommentClicked = async () => {
        await deleteMovieComment({ id: movieComment.id })
    }

    const created = new Date(movieComment.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(movieComment.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                    <h2>Edit Note #{movieComment.ticket}</h2>
                    <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveMovieCommentClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteMovieCommentClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div>
                </div>
                <label className="form__label" htmlFor="note-title">
                    Title:</label>
                <input
                    className={`form__input ${validTitleClass}`}
                    id="note-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                />

                <label className="form__label" htmlFor="note-text">
                    Text:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="note-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />

                <label className="form__label" htmlFor="text">
                    MovieId:</label>
                <textarea
                    className={`form__input form__input--text ${validTextClass}`}
                    id="text"
                    name="text"
                    value={movieId}
                    onChange={onMovieIdChanged}
                />

                <div className="form__row">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container" htmlFor="note-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="form__label form__checkbox-container" htmlFor="note-username">
                            ASSIGNED TO:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
            </form>
        </>
    )

    return content
}

export default EditMovieCommentForm