import React, { useState, createRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import RecaptchaChange from "../assets/views/recaptcha";
import { useStateContext } from "../contexts/ContextProvider";
import { useTranslation } from "react-i18next";

const ModalLogin = ({ onClose, isLoading, setIsLoading, onSwitchToRegister }) => {
    const emailRef = createRef();
    const passwordRef = createRef();
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const { setUser, setToken } = useStateContext();
    const [message, setMessage] = useState(null);
    const { t, i18n } = useTranslation();

    async function onSubmit(ev) {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            recaptchaToken: recaptchaToken,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                onClose(); // Close the modal after successful login
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setMessage(response.data.message);
                }
            });
    }

    const handleRecaptchaChange = (value) => {
        setRecaptchaToken(value);
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
                <div className="formWrapper animated fadeInDown">
                    <div className="form">
                        <form onSubmit={onSubmit}>
                            <div className="loginTitle">
                                <h1 className="title">
                                    {t("modal.authorization")}
                                </h1>
                            </div>
                            <div className="login">
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
                                <RecaptchaChange
                                    onChange={handleRecaptchaChange}
                                />
                                {message && (
                                    <div className="alert">
                                        <p>{message}</p>
                                    </div>
                                )}
                                <button className="btn btn-block">
                                    {t("modal.sign")}
                                </button>
                                <p className="message">
                                    <span className="link" onClick={onSwitchToRegister}>
                                        {t("modal.notRegistered")}{" "}
                                        {t("modal.сreateAccount")}
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalLogin;
