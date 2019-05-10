import React from 'react';
import logo from "../../assets/logo.png";


function Header() {
	return (
		<header>
			<div className="grid-container">
				<div className="grid-x grid-padding-x">
					<div className="cell medium-3">
						<img src={logo} alt=""/>
					</div>
					<div className="cell medium-9">
						<h4>title</h4>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header;