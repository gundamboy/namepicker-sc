import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionTypes from "../../reducers/actions";
import {withRouter} from "react-router";
import {CSSTransition} from "react-transition-group";
import anime from 'animejs';
import {stack as Menu} from 'react-burger-menu';

class Picker extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.onClick.bind(this);
		this.resetGame = this.resetGame.bind(this);
		this.state = {
			sc_names: [],
			sc_winners: [],
			display: false,
			sc_currentWinner: ""
		};

		this.winnerRef = React.createRef();
		console.log(props);

	}

	resetGame(e) {
		e.preventDefault();
		localStorage.removeItem("scholarship_names");
		localStorage.removeItem("scholarship_winners");
		localStorage.removeItem("current_scholarship_winner");
		//return window.location.pathname = '/';
		this.props.history.goBack();
	}

	onClick(e) {
		e.preventDefault();
		this.handlePickWinnerButton();
	}

	static setLocalStorage(key, value) {
		return localStorage.setItem(key, JSON.stringify(value));
	}

	static getFromLocalStorage(key) {
		return JSON.parse(localStorage.getItem(key));
	}

	winnerStartAnimation() {
		let ml4 = {};
		ml4.opacityIn = [0,1];
		ml4.scaleIn = [0.2, 1];
		ml4.scaleOut = 3;
		ml4.durationIn = 300;
		ml4.durationOut = 600;
		ml4.delay = 0;

		let w = {};
		w.opacityIn = [0,1];
		w.scaleIn = [0.2, 1];
		w.scaleOut = 2;
		w.durationIn = 300;
		w.durationOut = 600;
		w.delay = 0;

		this.animeRef = anime.timeline({loop: false})
		.add({
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
			targets: '.currentWinner',
			opacity: ml4.opacityIn,
			scale: ml4.scaleIn,
			duration: ml4.durationOut,
			easing: "easeInExpo",
			delay: ml4.delay
			});
	}

	componentDidMount() {
		if(Picker.getFromLocalStorage("scholarship_names") === null || Picker.getFromLocalStorage("scholarship_names").length === 0) {
			Picker.setLocalStorage("scholarship_names", this.props.people);

			this.setState({
				sc_names: Picker.getFromLocalStorage("scholarship_names"),
			});

		} else {
			this.setState({
				sc_names: Picker.getFromLocalStorage("scholarship_names"),
			});
		}


		if(Picker.getFromLocalStorage("scholarship_winners") === null || Picker.getFromLocalStorage("scholarship_winners").length === 0) {
			Picker.setLocalStorage("scholarship_winners", this.state.sc_winners);
			this.setState({
				sc_winners: Picker.getFromLocalStorage("scholarship_winners"),
			});
		} else {
			this.setState({
				sc_winners: Picker.getFromLocalStorage("scholarship_winners"),
			});
		}

		if(Picker.getFromLocalStorage("current_scholarship_winner") === null || Picker.getFromLocalStorage("current_scholarship_winner").length === 0) {
			Picker.setLocalStorage("current_scholarship_winner", this.state.currentWinner);
			this.setState({
				sc_currentWinner: Picker.getFromLocalStorage("current_scholarship_winner"),
			});
		} else {
			this.setState({
				sc_currentWinner: Picker.getFromLocalStorage("current_scholarship_winner"),
			});
		}

	}

	getWinnersFromState() {
		let winnersArray = this.state.sc_winners;
		return winnersArray.map(k => {
			return (
				<CSSTransition
					key={k}
					classNames="winnerDisplay"
					timeout={300}
				>
					<p>{k}</p>
				</CSSTransition>
			);
		});
	}

	handlePickWinnerButton() {
		this.winnerStartAnimation();
		let namesArray = this.state.sc_names;
		let randomWinner = namesArray[Math.floor(Math.random()*namesArray.length)];
		let winnerIndex = namesArray.indexOf(randomWinner);

		if(winnerIndex > -1) {
			namesArray.splice(winnerIndex, 1);
		}

		Picker.setLocalStorage("scholarship_names", namesArray);
		Picker.setLocalStorage("current_scholarship_winner", [...this.state.sc_winners, randomWinner]);
		Picker.setLocalStorage("current_scholarship_winner", randomWinner);

		this.setState({
			sc_names: Picker.getFromLocalStorage("scholarship_names"),
			sc_winners: Picker.getFromLocalStorage("current_scholarship_winner"),
			sc_currentWinner: Picker.getFromLocalStorage("current_scholarship_winner")
		});

		this.getWinnersFromState();
	}

	render() {
		const winnersList = this.getWinnersFromState();

		return (
			<div className="picker" id="outer-container">
				<Menu width={700}>
					<button className="button clear reset" onClick={this.resetGame}>Reset The GiveAway</button>
					<h3>The Winners!</h3>
					<div className="wrap">
						{winnersList}
					</div>
				</Menu>
				<div id="page-wrap">
					<div className="grid-container">
						<div className="grid-x grid-padding-x">
							<div className="cell medium-12">
								<form className="picker-form" action="">
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
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		people: state.sc_names,
		winners: state.sc_winners
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
