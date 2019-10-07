import React from 'react';
import { Link } from 'react-router-dom';
import {Cookies, withCookies} from "react-cookie";
import {instanceOf} from "prop-types";

class Nav extends React.Component{

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props){
        super(props);
    }

    render() {

        return(
            <nav className="mb-1 navbar navbar-expand-lg navbar-dark default-color">
                <span className="navbar-brand">SM</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent-333"
                        aria-controls="navbarSupportedContent-333" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent-333">
                    { !this.props.cookies.cookies.isConnected ?
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">sign In
                                    <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        </ul> :
                        <ul className="navbar-nav ml-auto nav-flex-icons">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333"
                                   data-toggle="dropdown" aria-haspopup="true"
                                   aria-expanded="false">
                                    <i className="fas fa-user"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-default"
                                     aria-labelledby="navbarDropdownMenuLink-333">
                                    <Link className="dropdown-item" to={`/playlists`}>My PlayList</Link>
                                    <Link className="dropdown-item" to="/logout">Logout</Link>
                                </div>
                            </li>
                        </ul>
                    }

                </div>
            </nav>
        );
    }
}

export default withCookies(Nav);