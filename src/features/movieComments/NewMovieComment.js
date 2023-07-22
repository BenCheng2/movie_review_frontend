import {useSelector} from "react-redux";
import {selectAllUsers} from "../users/usersApiSlice";
import NewMovieCommentForm from "./NewMovieCommentForm";


const NewMovieComment = () => {
    const users = useSelector(selectAllUsers)

    const content = users ? <NewMovieCommentForm users={users}/> : <p>Loading...</p>

    return content
}

export default NewMovieComment