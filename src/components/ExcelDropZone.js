import React, {useCallback, useEffect, useRef} from 'react';
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
			let name = item["Name"];
			name = name.toLowerCase()
				.split(' ')
				.map((s)=> s.charAt(0).toUpperCase() + s.substring(1))
				.join(' ');
			names.push(name);
		});
	};


	return names;
};

const ExcelDropZone = (props) => {
	let people = useRef([]);
	let go = useRef(false);
	const onDrop = useCallback(acceptedFiles => {

		acceptedFiles.forEach(file => {
			people.current = parseExcel(file);
			props.setNames(people.current);
			go.current = true;
		});

	}, [props]);

	useEffect(() => () => {
		if(go.current === true) {
			setTimeout(function () {
				props.history.push('/picker');
			}, 300);
		}
	});


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