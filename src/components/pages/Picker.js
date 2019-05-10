import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as ActionTypes from "../../reducers/actions";
import {withRouter} from "react-router";

class Picker extends Component {
	componentDidMount() {

	}

	componentWillUpdate(nextProps, nextState) {

	}

	render() {
		const peopleArray = Object.keys(this.props.people);
		const people = peopleArray.map(k => {
			//console.log(this.props.people[k]);
			return (
				<li key={k}>{this.props.people[k]}</li>
			);
		});

		return (
			<div className="picker">
				<div className="grid-container">
					<div className="grid-x grid-padding-x">
						<div className="cell">
							<ul>{people}</ul>
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
		},
		setWinner: (winner) => {
			dispatch({
				type: ActionTypes.WINNER,
				payload: winner
			})
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Picker));
