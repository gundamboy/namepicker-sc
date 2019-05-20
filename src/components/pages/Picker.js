import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionTypes from "../../reducers/actions";
import {withRouter} from "react-router";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import anime from 'animejs';

class Picker extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.state = {
			names: [],
			winners: [],
			display: false,
			currentWinner: ""
		};

		this.winnerRef = React.createRef();

	}

	clearLocalStorage(e) {
		e.preventDefault();
		console.log("clearLocalStorage");
		localStorage.clear();
		return window.location.pathname = '/';
	}

	onClick(e) {
		e.preventDefault();
		this.handlePickWinnerButton();
	}

	setLocalStorage(key, value) {
		return localStorage.setItem(key, JSON.stringify(value));
	}

	getFromLocalStorage(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	winnerStartAnimation() {
		let ml4 = {};
		ml4.opacityIn = [0,1];
		ml4.scaleIn = [0.2, 1];
		ml4.scaleOut = 3;
		ml4.durationIn = 300;
		ml4.durationOut = 600;
		ml4.delay = 100;

		let w = {};
		w.opacityIn = [0,1];
		w.scaleIn = [0.2, 1];
		w.scaleOut = 2;
		w.durationIn = 300;
		w.durationOut = 600;
		w.delay = 100;

		this.animeRef = anime.timeline({loop: false})
		.add({
			targets: 'currentWinner',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-1',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-1',
			opacity: 0,
			scale: ml4.scaleOut,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
		}).add({
			targets: '.ml4 .letters-2',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-2',
			opacity: 0,
			scale: ml4.scaleOut,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
		}).add({
			targets: '.ml4 .letters-3',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-3',
			opacity: 0,
			scale: ml4.scaleOut,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
		}).add({
			targets: '.ml4 .letters-4',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationIn
		}).add({
			targets: '.ml4 .letters-4',
			opacity: 0,
			scale: ml4.scaleOut,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
		}).add({
			targets: '.ml4',
			opacity: 0,
			duration: 500,
			delay: w.delay
		}).add({
			targets: '.currentWinner',
			opacity: w.opacityIn,
			scale: w.scaleIn,
			duration: w.durationOut,
			easing: "easeInExpo",
			delay: w.delay
			});
	}

	componentDidMount() {
		if(this.getFromLocalStorage("names") === null || this.getFromLocalStorage("names").length === 0) {
			this.setLocalStorage("names", this.props.people);

			this.setState({
				names: this.getFromLocalStorage("names"),
			});

		} else {
			this.setState({
				names: this.getFromLocalStorage("names"),
			});
		}


		if(this.getFromLocalStorage("winners") === null || this.getFromLocalStorage("winners").length === 0) {
			this.setLocalStorage("winners", this.state.winners);
			this.setState({
				winners: this.getFromLocalStorage("winners"),
			});
		} else {
			this.setState({
				winners: this.getFromLocalStorage("winners"),
			});
		}

		if(this.getFromLocalStorage("currentWinner") === null || this.getFromLocalStorage("currentWinner").length === 0) {
			this.setLocalStorage("currentWinner", this.state.currentWinner);
			this.setState({
				currentWinner: this.getFromLocalStorage("currentWinner"),
			});
		} else {
			this.setState({
				currentWinner: this.getFromLocalStorage("currentWinner"),
			});
		}

	}

	getWinnersFromState() {
		let winnersArray = this.state.winners;
		return winnersArray.map(k => {
			return (
				<CSSTransition
					key={k}
					classNames="winnerDisplay"
					timeout={300}
				>
					<li>{k}</li>
				</CSSTransition>
			);
		});
	}

	handlePickWinnerButton() {
		this.winnerStartAnimation();
		let namesArray = this.state.names;
		let randomWinner = namesArray[Math.floor(Math.random()*namesArray.length)];
		let winnerIndex = namesArray.indexOf(randomWinner);

		if(winnerIndex > -1) {
			namesArray.splice(winnerIndex, 1);
		}

		this.setLocalStorage("names", namesArray);
		this.setLocalStorage("winners", [...this.state.winners, randomWinner]);
		this.setLocalStorage("currentWinner", randomWinner);

		this.setState({
			names: this.getFromLocalStorage("names"),
			winners: this.getFromLocalStorage("winners"),
			currentWinner: this.getFromLocalStorage("currentWinner")
		});

		this.getWinnersFromState();
	}

	render() {
		const winnersList = this.getWinnersFromState();

		return (
			<div className="picker">
				<div className="all-winners container">
					<div className="grid-container">
						<div className="grid-x grid-padding-x">
							<div className="cell medium-12">
								<form action="">
									<fieldset>
										<button className="button pick-winner" onClick={this.onClick}>Pick a winner!</button>
									</fieldset>
								</form>

								<div className="winner-animation-container">
									<h1 className="ml4">
										<span className="letters letters-1">And</span>
										<span className="letters letters-2">The</span>
										<span className="letters letters-3">Winner</span>
										<span className="letters letters-4">Is</span>
									</h1>
								</div>

								<div className="currentWinner">
									{this.state.currentWinner}
								</div>
							</div>
						</div>
					</div>
					<div className="current-winners">
						<div className="grid-container">
							<div className="grid grid-padding-x">
								<h3>The Winners!</h3>
								<ul className="no-bullet winners-list">
									{winnersList}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		people: state.names,
		winners: state.winners
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setNames: (people) => {
			dispatch({
				type: ActionTypes.SUCCESS,
				payload: people
			});
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Picker));
