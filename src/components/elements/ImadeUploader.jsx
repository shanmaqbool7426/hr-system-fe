import React, { useState } from 'react';

const ImageUpload = ({ label, id, onChange, className, max, accept, uploadIcon, ...props }) => {
    const [fileName, setFileName] = useState(null);

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            try {
                let fileURL = await Storage.upload(file, auth_user?.company?._id, (url) => {
                    formik.setFieldValue('fileURL', url);
                });
            } catch (error) {
                console.error("File upload failed", error);
            }
        } else {
            setFileName('No file chosen');
        }
    };

    return (
        <div>
            <label className='text-sm font-medium mb-1 block text-start dark:text-white'>{label ? label : "Upload File"}</label>
            <div className='rounded-lg flex items-center border border-themeGrayscale300 dark:border-gray-700'>
                <label htmlFor="upload" className='zt-uploadLabel'>Choose File</label>
                <input type="file" id="upload" className='hidden' onChange={handleFileChange} />
                <span className='ps-2 text-sm'>{fileName}</span>
            </div>
        </div>
    );
};

ImageUpload.defaultProps = {
    accept: "image/*"
}

export default ImageUpload;
