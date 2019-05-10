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
		const testPeople = [
			"Johnny Test",
			"Johnny Test 2"
		];
		const peopleArray = Object.keys(testPeople);
		const testpeople = peopleArray.map(k => {
			//console.log(this.props.people[k]);
			return (
				<li key={k}>{testPeople[k]}</li>
			);
		});

		let names = this.props.people;
		const people = names.map(k => {
			console.log(this.props.people[k]);
			return (
				<li key={k}>{k}</li>
			);
		});

		return (
			<div className="picker">
				<div className="grid-container">
					<div className="grid-x grid-padding-x">
						<div className="cell medium-6">
							<p className="test">Test People</p>
							<ul>{testpeople}</ul>
						</div>

						<div className="cell medium-6">
							<p className="test">People From State</p>
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
		}
	};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Picker));
