import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";
import RecaptchaChange from "../assets/views/recaptcha";
import Modal from "../assets/views/TermsOfUseModal";
import { useTranslation } from "react-i18next";

const ModalRegister = ({ onClose, onSwitchToLogin }) => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const [errors, setErrors] = useState(null);
    const [checked, setChecked] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);

    const { t, i18n } = useTranslation();

    const { setUser, setToken } = useStateContext();

    const handleRecaptchaChange = (value) => {
        setRecaptchaToken(value);
    };

    async function onSubmit(ev) {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
            recaptchaToken: recaptchaToken,
            agreement: checked,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                onClose(); // Close the modal after successful registration
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    }

    const handleTermsOfUse = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setChecked(false);
        setModalOpen(false);
    };

    const handleAgreement = () => {
        setChecked(true);
        setModalOpen(false);
    };

    const handleOverlayClick = () => {
        onClose();
        // Removed the undefined setUserData call
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
                className="modal-content animated fadeInDown"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="form">
                    <form onSubmit={onSubmit}>
                        <div className="titleRegistration">
                            <h1 className="title">{t("modal.registration")}</h1>
                            {errors && (
                                <div className="alert">
                                    {Object.keys(errors).map((key) => (
                                        <p key={key}>{errors[key][0]}</p>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="loginSignup">
                            <input
                                ref={nameRef}
                                type="text"
                                placeholder={t("modal.login")}
                            />
                            <input
                                ref={emailRef}
                                type="email"
                                placeholder={t("modal.email")}
                            />
                            <input
                                ref={passwordRef}
                                type="password"
                                placeholder={t("modal.password")}
                            />
                            <input
                                ref={passwordConfirmationRef}
                                type="password"
                                placeholder={t("modal.confirmPassword")}
                            />
                            <div className="termsOfUse">
                                <div className="checkBox">
                                    <input
                                        type="checkbox"
                                        checked={checked}
                                        onChange={handleTermsOfUse}
                                    />
                                </div>
                                <div className="titleTermsOfUse">
                                    <h1>{t("modal.terms")}</h1>
                                </div>
                                <Modal
                                    isOpen={isModalOpen}
                                    onClose={handleModalClose}
                                    agreement={handleAgreement}
                                />
                            </div>
                            <RecaptchaChange onChange={handleRecaptchaChange} />
                            <button className="btn btn-block">
                                {t("modal.registration")}
                            </button>
                            <p className="message">
                                <span className="link" onClick={onSwitchToLogin}>
                                    {t("modal.alreadyRegistered")}{" "}
                                    {t("modal.sign")}
                                </span>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModalRegister;
