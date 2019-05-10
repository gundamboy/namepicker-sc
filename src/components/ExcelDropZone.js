import React, {useCallback, useEffect, useState, useRef} from 'react';
import {withRouter} from "react-router";
import {connect} from "react-redux";
import * as ActionTypes from "../reducers/actions"
import {useDropzone} from 'react-dropzone';
import * as XLSX from 'xlsx';

const parseExcel = (file) => {
	let names = [];

	const reader = new FileReader();
	reader.readAsArrayBuffer(file);
	reader.onload = (e) => {
		const binaryStr = reader.result;
		const data = new Uint8Array(binaryStr);
		const wb = XLSX.read(data, {type: 'array'});
		const first_sheet = wb.SheetNames[0];
		const json_array = XLSX.utils.sheet_to_json(wb.Sheets[first_sheet]);

		json_array.forEach(function (item) {
			names.push(item['Name']);
		});
	};

	return names;
};

const ExcelDropZone = (props) => {
	const [files, setFiles] = useState(0);
	let people = useRef([]);
	let go = false;
	const onDrop = useCallback(acceptedFiles => {
		setFiles(acceptedFiles.map(file => Object.assign(file, {
			preview: URL.createObjectURL(file)
		})));

		acceptedFiles.forEach(file => {
			people.current = parseExcel(file);
			props.setNames(people.current);
			go = true;
			console.log("people from parse", people.current);
		});

		console.log("people from props", props.people);

	}, []);

	let count = 0;
	useEffect(() => () => {
		console.log("count: ", count);
		if(go === true) {
			console.log("people from props (useEffect)", props.people);
			count++;
		}
	}, [props]);


	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop
	});


	return (
		<section className="dzContainer">
			<div {...getRootProps({className: 'dropzone'})}>
				<div className="icon-wrapper">
					<i className="far fa-file-excel fa-7x"></i>
				</div>
				<input onChange={props.onChange} name="dpImage" className="dropzoneInput" {...getInputProps()} />
				{
					isDragActive ?
						<p><span className="defaultText">Drop the files here ...</span></p> :
						<p><span className="defaultText">To get started, drag and drop or click to load the excel file. Make sure there is a column labeled "Name".</span></p>
				}
			</div>
		</section>
	)
};

const mapStateToProps = (state) => {
	return {
		people: state.names,
		winners : state.winners
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExcelDropZone));