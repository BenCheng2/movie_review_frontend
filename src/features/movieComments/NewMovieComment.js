import {useSelector} from "react-redux";
import {selectAllUsers, useGetUsersQuery} from "../users/usersApiSlice";
import NewMovieCommentForm from "./NewMovieCommentForm";
import useTitle from "../../hooks/useTitle";
import PulseLoader from "react-spinners/PulseLoader";


const NewMovieComment = () => {
    useTitle('Movie Note: New Note')

    const { users } = useGetUsersQuery("usersList", {
        selectFromResult: ({ data }) => ({
            users: data?.ids.map(id => data?.entities[id])
        }),
    })

    if (!users?.length) return <PulseLoader color={"#FFF"} />

    const content = users ? <NewMovieCommentForm users={users}/> : <p>Loading...</p>

    return content
}

export default NewMovieComment