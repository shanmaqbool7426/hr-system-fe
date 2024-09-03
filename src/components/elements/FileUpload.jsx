import React, { useState } from 'react';
import { CloudUpload, CloseCross } from '../svg';
import Toast from '@/util/toast';
import { useTranslation } from 'next-i18next';

const FileUpload = ({ label, id, name, onChange, className, max, accept, uploadIcon, disabled = false }) => {
	if (!id) id = name || "attachment"
	const [selectedFile, setSelectedFile] = useState(null);
	const { t } = useTranslation()
	const handleFileChange = (event) => {
		if (event.target.files.length > 0) {
			const file = event.target.files[0]
			if (max && max < file.size) {
				event.target.value = null
				onChange && onChange(null)
				setSelectedFile(null)
				Toast.error(t('File size exceed allowed size'))
				return
			}
			let allowedFiles = accept.split(',')
			let allowCheck = false
			for (let index in allowedFiles) {
				if (allowedFiles[index] === file.type) {
					allowCheck = true
					break;
				}
				allowCheck = file.type.split('/')[0] === allowedFiles[index].split('/')[0]
				if (allowedFiles[index].split('/')[1] !== '*') {
					allowCheck = file.type.split('/')[1] === allowedFiles[index].split('/')[1]
				}
				if (allowCheck) {
					break;
				}
			}
			if (!allowCheck) {
				event.target.value = null
				onChange && onChange(null)
				setSelectedFile(null)
				Toast.error(t('Selected file is not allowed'))
				return
			}
			setSelectedFile(event.target.files[0])
			console.log("Selected File", event.target.files[0]);

			onChange && onChange(event.target.files[0])
		} else {
			setSelectedFile(null)
			onChange && onChange(null)
		}

	};

	return (
		<label className={`zt-fileUpload ${className}`} htmlFor={id}>
			<span className='zt-fileUploadText'>{selectedFile ? selectedFile.name : label}</span>
			{!selectedFile && <span className='zt-fileUploadIcon'>{uploadIcon ? uploadIcon : <CloudUpload />}</span>}
			{selectedFile && <span className='zt-fileUploadIcon' onClick={(event) => {
				event.preventDefault()
				setSelectedFile(null)
				onChange && onChange(null)
			}}><CloseCross /></span>}
			<input id={id} type="file" accept={accept} onChange={handleFileChange} disabled={disabled} />
		</label>
	);
};

FileUpload.defaultProps = {
	accept: "image/*"
}

export default FileUpload;
