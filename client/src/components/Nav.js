import React from 'react'; 
import { PiSpotifyLogo, PiHouse, PiSignOut } from "react-icons/pi";
import { Link } from 'react-router-dom';

export default class Nav extends React.Component {
    render() {
        return (
        <nav>
		<span className="logo">
			<PiSpotifyLogo />
		</span>
		<form>
			<input type="text" name="search" placeholder="Search" />
		</form>
		<span className="navIcons">
			<Link to='/'><PiHouse /></Link>
			<Link to='/logout'><PiSignOut /></Link>
		</span>
	</nav>
        );
    }
}