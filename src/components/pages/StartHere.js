import React, {Component} from 'react';
import ExcelDropZone from "../ExcelDropZone";

class StartHere extends Component {

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log("prevProps: ", prevProps);
		console.log("currentProps: ", this.props);
		console.log("componentDidUpdate");
	}

	render() {
		return (
			<div className="start-here">
				<div className="grid-container">
					<div className="grid-x grid-padding-x">
						<div className="cell">
							<div className="callout secondary">
								<div className="excel-upload-wrapper">
									<ExcelDropZone onChange={this.handleChange} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default StartHere;