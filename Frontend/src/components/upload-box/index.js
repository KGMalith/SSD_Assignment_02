import React from 'react';
import styles from './upload-box.module.css';
import Dropzone from 'react-dropzone'
import { CustomAlert } from '../alert';

export default function FileUploadBox(props) {
    return (
        <div>
            <Dropzone multiple={props.isMultiUpload} maxFiles={props.maxFilesNumber} maxSize={props.maxFileSize} accept={props.acceptFileTypes} onDrop={acceptedFiles => { props.setFieldValue(props.name, acceptedFiles);}}>
                {({ getRootProps, getInputProps, fileRejections, acceptedFiles }) => (
                    <section>
                        <div {...getRootProps({ className: props.isInvalid === true ? styles.dropzoneInvalid: styles.dropzone })}>
                            <input {...getInputProps()} />
                            {props.viewBoxIcon}
                            <p><b>{props.uploadFileTopic}</b></p>
                            <span>Drag 'n' drop your file, or click to select file</span>
                            <em>({props.onlyAcceptedFileTypesLabel})</em>
                        </div>
                        {props.errorMessage && <p className={styles.errormessage}>{props.errorMessage}</p>}
                        <span className={styles.fileSizeLabel}>Maximum upload file size: <b>{props.maximumFileSizeInMBLabel}MB</b></span>
                        <aside>
                            {
                                acceptedFiles && acceptedFiles.map(file => (
                                    <CustomAlert keyCode={file.path} cssClassType={'successAlert'} alertLabel={file.path} />
                                ))
                            }
                            {
                                fileRejections.map(({ file, errors }) => (
                                    <div key={file.path}>
                                        {errors.map(e => (
                                            <CustomAlert keyCode={e.code} cssClassType={'errorAlert'} alertLabel={e.code === 'file-too-large' ? `File is larger than ${props.maximumFileSizeInMBLabel}MB` : e.code === 'file-invalid-type' ? 'Invalid file type' : e.code === 'too-many-files'?'Maximum 10 files allowed':e.message} />
                                        ))}
                                    </div>
                                ))
                            }
                        </aside>
                    </section>
                )}
            </Dropzone>
        </div>
    )
}
