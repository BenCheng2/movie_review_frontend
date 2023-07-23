import {Link} from 'react-router-dom';

import React from 'react';

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1 className="home_title">Welcome to <span className="nowrap">Movie Review Sharing Center!</span></h1>
            </header>
            <main className="public__main">
                <p>This is a student project managing the movie reviews containing notes and comments over the movies.</p>
                <br/>
                <p>The project is made by React, NodeJS, Express, MongoDB Atlas and TailwindCSS</p>
                <br/>
                <p>Owner: Ben Cheng</p>
            </main>
            <footer>
                <Link to="/login">User Login</Link>
            </footer>
        </section>


    )
    return content;
}

export default Public;