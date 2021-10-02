import React, { useEffect, useState } from 'react';
import './home.css';
import { Navbar, Image, Dropdown, Col, Row, Button, ProgressBar, Form, Container } from 'react-bootstrap';
import { Formik } from 'formik';
import { useHistory } from 'react-router-dom';
import { getUserDetails, logout } from '../services/util/auth';
import CSSLoader from '../components/cssLoader';
import FileUploadBox from '../components/upload-box';
import { connectGoogleAccountRequest, disconnectGoogleAccountRequest, initiateGoogleRequest, uploadImageToDriveRequest } from '../services/util/upload';

function Home(props) {
    let [state, setState] = useState({
        user_name: '',
        is_google_drive_connected: false,
        user_image_url: null,
        drive_connected_email: null
    });
    let [is_page_loading, set_page_loading] = useState(false);
    let [isGoogleConnectionLoading, setGoogleConnectionLoading] = useState(false);
    let [isGoogleDisconnectionLoading, setGoogleDisconnectionLoading] = useState(false);
    let [isUploadLoading, setUploadLoading] = useState(false);
    let [uploadPrecentage, setUploadPrecentage] = useState(0);
    const history = useHistory();

    const dropdownSelect = (e) => {
        if (e === '1') {
            logout();
            history.push("/");
        }
    }

    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
            className="userIcon"
            href=""
            ref={ref}
            onClick={e => {
                e.preventDefault();
                onClick(e);
            }}
        >
            <div className="svgIconsMainDiv">
                <div className="userIconSvgDiv">
                    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="24" cy="24" r="23" stroke="#2DA6C0" strokeOpacity="0.75" strokeWidth="1.5" />
                        <circle cx="24" cy="24" r="23" stroke="#2DA6C0" strokeOpacity="0.75" strokeWidth="1.5" />
                        <path d="M23.9999 22.584C27.5378 22.584 30.4166 19.7052 30.4166 16.1673V15.0007C30.4166 11.4627 27.5378 8.58398 23.9999 8.58398C20.462 8.58398 17.5833 11.4627 17.5833 15.0007V16.1673C17.5833 19.7052 20.462 22.584 23.9999 22.584Z" fill="#2DA6C0" fillOpacity="0.75" />
                        <path d="M32.9122 26.1926C30.9568 25.611 27.8232 24.918 24 24.918C20.1768 24.918 17.0432 25.611 15.0878 26.1926C13.0917 26.7864 11.75 28.5848 11.75 30.6673V34.8346C11.75 35.1566 12.0113 35.418 12.3333 35.418H35.6667C35.9887 35.418 36.25 35.1566 36.25 34.8346V30.6673C36.25 28.5848 34.9083 26.7864 32.9122 26.1926Z" fill="#2DA6C0" fillOpacity="0.75" />
                    </svg>
                </div>
                <div className="arrowIconSvgDiv">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 7.5L10 12.5L15 7.5" stroke="#2DA6C0" strokeOpacity="0.75" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                {children}
            </div>
        </a>
    ));

    const connectGoogleAccount = async () => {
        setGoogleConnectionLoading(true);
        let respond = await initiateGoogleRequest();
        if (respond.success === true) {
            window.location.replace(respond.data.redirect_url);
            setGoogleConnectionLoading(false);
        } else {
            setGoogleConnectionLoading(false);
        }
    }

    const disconnectGoogleAccount = async () => {
        setGoogleDisconnectionLoading(true);
        let respond = await disconnectGoogleAccountRequest();
        if (respond.success === true) {
            setGoogleDisconnectionLoading(false);
            loadUserData();
        } else {
            setGoogleDisconnectionLoading(false);
        }
    }

    const submitForm = async (values) => {
        setUploadLoading(true);
        let respond = await uploadImageToDriveRequest(values.images[0], setUploadPrecentage);
        if (respond.success === true){
            setUploadLoading(false);
        }else{
            setUploadLoading(false);
        }
    }

    async function loadUserData() {
        set_page_loading(true);
        const query = new URLSearchParams(window.location.search);
        const token = query.get('code')
        if (token) {
            let respond = await connectGoogleAccountRequest(token);
            if (respond.success === true) {
                let res = await getUserDetails();
                if (res.success === true) {
                    setState(res.data);
                    window.location.replace('/home');
                    set_page_loading(false);
                } else {
                    set_page_loading(false);
                }
            } else {
                set_page_loading(false);
            }
        } else {
            let respond = await getUserDetails();
            if (respond.success === true) {
                setState(respond.data);
                set_page_loading(false);
            } else {
                set_page_loading(false);
            }
        }

    }

    useEffect(() => {
        loadUserData();
    }, [])

    return (
        <div className="mainContainer">
            {is_page_loading ?
                <div className="loadingDiv">
                    <Col sm={{ span: 4, offset: 4 }}>
                        <CSSLoader />
                    </Col>
                </div>
                :
                <div>
                    <div className="topNavComponent">
                        <Navbar expand="lg">
                            <div className="userDetails">
                                <p className="currentUserName">{state.user_name}</p>
                                <Dropdown
                                    alignRight={true}
                                    onSelect={(e) => dropdownSelect(e)}
                                >
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="dropdownMenu">
                                        <div className="userDetailsBox">
                                            <div className="userAvatarContainer">
                                                <Image src={state.user_image_url ? state.user_image_url : `${process.env.REACT_APP_BASE_URL}/images/navigation_dropdown_avatar.png`} fluid className="userAvatar" />
                                            </div>
                                            <div className="userDetailsContainer">
                                                <p className="userDetailsTopic">{state.user_name}</p>
                                            </div>
                                        </div>
                                        <Dropdown.Item eventKey="1" className="dropdownTextLogout"><i className="signoutIcon fas fa-sign-out-alt"></i>Logout</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </Navbar>
                    </div>
                    <div className="mt-5">
                        <Col sm={{ span: 10, offset: 1 }}>
                            {state.is_google_drive_connected ?
                                <div>
                                    <div className="accountContainerBox">
                                        <div>
                                            <Row>
                                                <Col sm={4} md={3} lg={2} xl={1} className="align-self-center">
                                                    <Image src={`${process.env.REACT_APP_BASE_URL}/images/google_drive_logo.png`} fluid />
                                                </Col>
                                                <Col className="align-self-center">
                                                    <p className="activeAccountSubTopic">Google Drive</p>
                                                    <p className="accountDescription">{state.drive_connected_email}</p>
                                                </Col>
                                                <Col md={4} lg={3} xl={2} className="align-self-center">
                                                    <div className="disconnectButton" onClick={!isGoogleDisconnectionLoading ? () => disconnectGoogleAccount() : null}>
                                                        <span>
                                                            Disconnect
                                                        </span>
                                                        {isGoogleDisconnectionLoading ?
                                                            <span className="disconnectIcon">
                                                                <i className="fas fa-circle-notch fa-spin" aria-hidden="true"></i>
                                                            </span>
                                                            :
                                                            <span className="disconnectIcon">
                                                                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M10.8736 21.3168C11.633 21.8521 12.5585 22.1667 13.5563 22.1667L19.3896 22.1667V24.5H21.723L21.723 9.43417L19.3896 11.9897L19.3896 19.8333L13.5563 19.8333C13.1652 19.8333 12.7963 19.7367 12.4722 19.566L10.8736 21.3168ZM9.51732 19.8361L11.2618 17.9255C11.2363 17.7875 11.223 17.6453 11.223 17.5V10.5C11.223 9.21317 12.2695 8.16667 13.5563 8.16667L19.3896 8.16667V9.02355L21.723 6.468V3.5H19.3896V5.83333L13.5563 5.83333C10.9826 5.83333 8.88965 7.92633 8.88965 10.5V12.8333H3.05631L3.05631 15.1667H8.88965V17.5C8.88965 18.3506 9.11827 19.1487 9.51732 19.8361ZM26.3896 10.5V8.16667H22.8896V10.5H26.3896ZM26.3896 19.8333V17.5H22.8896V19.8333H26.3896Z" fill="#EB5757" />
                                                                    <line x1="23.9341" y1="5.17596" x2="7.99907" y2="21.9963" stroke="#EB5757" stroke-width="1.5" />
                                                                </svg>
                                                            </span>
                                                        }

                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </div>
                                    <div className="mt-5">
                                        <Formik
                                            onSubmit={(values) => submitForm(values)}
                                            initialValues={{}}>

                                            {({
                                                errors,
                                                handleChange,
                                                handleSubmit,
                                                setFieldValue,
                                                submitCount,
                                                resetForm,
                                                values
                                            }) => (
                                                <Form noValidate onSubmit={handleSubmit}>
                                                    <Col sm={{ span: 10, offset: 1 }}>
                                                        <FileUploadBox
                                                            isMultiUpload={false}
                                                            maxFileSize={5242880}
                                                            maxFilesNumber={1}
                                                            name='images'
                                                            acceptFileTypes={"image/jpeg, image/png, image/jpg"}
                                                            viewBoxIcon={<i className="fa fa-picture-o fa-4x" aria-hidden="true"></i>}
                                                            uploadFileTopic={'Upload Image To Drive'}
                                                            onlyAcceptedFileTypesLabel={'Only jpeg,png,jpg files will be accepted.'}
                                                            maximumFileSizeInMBLabel={'5'}
                                                            setFieldValue={setFieldValue}
                                                            errorMessage={submitCount > 0 && errors.uploadfiles}
                                                            isInvalid={(submitCount > 0 && errors.uploadfiles) ? true : false}
                                                        />
                                                        {uploadPrecentage > 0 &&
                                                            <div className="mt-3 mb-3">
                                                                <ProgressBar animated now={uploadPrecentage} className="uploadingPrograssBar" />
                                                            </div>
                                                        }
                                                    </Col>
                                                    <Col sm={{ span: 10, offset: 1 }} >
                                                        <Col sm={6} md={5} lg={4} xl={3} className="pl-0">
                                                            <Button
                                                                type="submit"
                                                                className="connectBtn"
                                                                disabled={isUploadLoading ? true : false}
                                                            >
                                                                Upload Image
                                                                {isUploadLoading ? <span>&nbsp;&nbsp;<i className="fas fa-circle-notch fa-spin" aria-hidden="true"></i></span> : null}
                                                            </Button>
                                                        </Col>
                                                    </Col>
                                                </Form>
                                            )}
                                        </Formik>
                                    </div>
                                </div>
                                :
                                <div className="accountContainerBox">
                                    <div>
                                        <Row>
                                            <Col sm={4} md={3} lg={2} xl={1} className="align-self-center">
                                                <Image src={`${process.env.REACT_APP_BASE_URL}/images/google_drive_logo.png`} fluid />
                                            </Col>
                                            <Col className="align-self-center">
                                                <p className="accountSubTopic">Connect with Google Drive</p>
                                                <p className="accountDescription">Connect Google account which you want to use google drive </p>
                                            </Col>
                                            <Col md={4} lg={3} xl={2} className="align-self-center">
                                                <Button
                                                    type="button"
                                                    className="connectBtn"
                                                    disabled={isGoogleConnectionLoading ? true : false}
                                                    onClick={() => connectGoogleAccount()}
                                                >
                                                    Connect
                                                    {isGoogleConnectionLoading ? <span>&nbsp;&nbsp;<i className="fas fa-circle-notch fa-spin" aria-hidden="true"></i></span> : null}
                                                </Button>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            }
                        </Col>
                    </div>
                </div>
            }
        </div>
    )
}

export default Home;
