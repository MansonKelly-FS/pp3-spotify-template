import React from 'react'; 
import { PiSpotifyLogo, PiHouse, PiSignOut } from "react-icons/pi";

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
			<a><PiHouse /></a>
			<a><PiSignOut /></a>
		</span>
	</nav>
        );
    }
}