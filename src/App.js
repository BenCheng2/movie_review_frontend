import {Routes, Route, Router} from "react-router-dom";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import MovieCommentsList from "./features/movieComments/MovieCommentsList";
import UsersList from "./features/users/UsersList";
import EditUser from "./features/users/EditUser";
import NewUserForm from "./features/users/NewUserForm";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";
import MovieComments from "./features/movieComments/MovieComments";
import NotesList from "./features/notes/NotesList";
import NewMovieCommentForm from "./features/movieComments/NewMovieCommentForm";
import NewMovieComment from "./features/movieComments/NewMovieComment";
import EditMovieCommentForm from "./features/movieComments/EditMovieCommentForm";
import EditMovieComment from "./features/movieComments/EditMovieComment";
import PersistLogin from "./features/auth/PersistLogin";
import RequireAuth from './features/auth/RequireAuth'
import {ROLES} from './config/roles'
import useTitle from "./hooks/useTitle";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<Public/>}/>
                <Route path="login" element={<Login/>}/>

                <Route element={<PersistLogin/>}>
                    <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]}/>}>
                        <Route element={<Prefetch/>}>
                            <Route path="dash" element={<DashLayout/>}>
                                <Route index element={<Welcome/>}/>

                                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]}/>}>
                                    <Route path={"users"}>
                                        <Route index element={<UsersList/>}/>
                                        <Route path=":id" element={<EditUser/>}/>
                                        <Route path="new" element={<NewUserForm/>}/>
                                    </Route>
                                </Route>

                                <Route element={<RequireAuth allowedRoles={[ROLES.Manager, ROLES.Admin]}/>}>
                                <Route path={"notes"}>
                                    <Route index element={<NotesList/>}/>
                                    <Route path=":id" element={<EditNote/>}/>
                                    <Route path="new" element={<NewNote/>}/>
                                </Route>
                                </Route>

                                <Route path={"movieComments"}>
                                    <Route index element={<MovieCommentsList/>}/>
                                    <Route path=":id" element={<EditMovieComment/>}/>
                                    <Route path="new" element={<NewMovieComment/>}/>
                                </Route>
                            </Route>{/* end dash */}
                        </Route>
                    </Route>
                </Route>
            </Route>
        </Routes>
    )
}

export default App;
