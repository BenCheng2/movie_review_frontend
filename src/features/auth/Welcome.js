import React from 'react';
import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Welcome = () => {
    const {username, isManager, isAdmin} = useAuth();

    const date = new Date();
    const today = new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'long'}).format(date);

    const content = (
        <section className={"welcome"}>
            <p>{today}</p>
            <h1>Welcome {username} !</h1>
            <p><Link className="link" to={"/dash/notes"}>View Movie Notes</Link></p>
            <p><Link className="link" to={"/dash/notes/new"}>Add New Movie Notes</Link></p>

            <p><Link className="link" to={"/dash/moviecomments"}>View Movie Comments</Link></p>
            <p><Link className="link" to={"/dash/moviecomments/new"}>Add New Movie Comment</Link></p>

            {(isManager || isAdmin) && <p><Link className="link" to={"/dash/users"}>View User Settings</Link></p>}
            {(isManager || isAdmin) && <p><Link className="link" to={"/dash/users/new"}>Add New User</Link></p>}
        </section>
    )

    return content;
}

export default Welcome;