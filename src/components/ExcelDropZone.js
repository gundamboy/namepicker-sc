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
	let people = useRef([]);
	let go = false;
	const onDrop = useCallback(acceptedFiles => {

		acceptedFiles.forEach(file => {
			people.current = parseExcel(file);
			console.log("people from parse", people.current);

			props.setNames(people.current);
			console.log("people from props", props.people);

			go = true;
		});

	}, []);

	useEffect(() => () => {
		console.log("props before IF: ", props);
		if(props.people.length > 0) {
			console.log("props.people is not zero.");
			console.log("props.people.length: ", props.people.length);
			console.log("props.people: ", props.people);
		} else {
			console.log("props.people is zero.");
		}

		console.log("props after IF: ", props);

		if(go === true) {
			console.log("people from props (useEffect)", props.people);

			setTimeout(function () {
				props.history.push('/picker');
			}, 300);

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

			<div className="count">
				There are: <code>{props.people.length}</code> names in the array;
			</div>
		</section>
	)
};

const mapStateToProps = (state) => {
	return {
		people: state.names
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExcelDropZone));