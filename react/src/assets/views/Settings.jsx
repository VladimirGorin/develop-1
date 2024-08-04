import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import moment from "moment";

export default function Settings() {
    const { user, account } = useStateContext();
    const current_emailRef = useRef();
    const emailRef = useRef();
    const password_confirm_emailRef = useRef();

    const current_passwordRef = useRef();
    const passwordRef = useRef();
    const password_confirmationRef = useRef();

    const { setUser, setToken, setAccount, isLoading, setIsLoading } =
        useStateContext();

    const [errorPassword, setErrorPassword] = useState(null);
    const [successPassword, setSuccessPassword] = useState(null);
    const [errorEmail, setErrorEmail] = useState(null);
    const [successEmail, setSuccessEmail] = useState(null);

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setAccount({});
            setToken(null);
        });
    };

    const changePasswordData = (ev) => {
        ev.preventDefault();

        const changePassword = {
            current_password: current_passwordRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: password_confirmationRef.current.value,
            user: password_confirmationRef.current.value,
        };

        axiosClient
            .post("/updatePassword", changePassword)
            .then(({ data }) => {
                setSuccessPassword(data.message);
                setErrorPassword("");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrorPassword(response.data.message);
                    setSuccessPassword("");
                }
            });
    };

    const changeEmailData = (ev) => {
        ev.preventDefault();

        const changeEmail = {
            current_email: current_emailRef.current.value,
            email: emailRef.current.value,
            password_confirm_email: password_confirm_emailRef.current.value,
        };

        axiosClient
            .post("/updateEmail", changeEmail)
            .then(({ data }) => {
                setSuccessEmail(data.message);
                setErrorEmail("");
            })

            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrorEmail(response.data.message);
                    setSuccessEmail("");
                }
            });
    };

    return (
        <div className="container">
            <div className="settingsBoard animated fadeInDown">
                <div className="settingsChange">
                    {isLoading && (
                        <div className="isLoading">
                            <div className="loading"></div>
                        </div>
                    )}
                    {!isLoading && (
                        <div className="changeData">
                            <div className="changeTitle">
                                <p>ИЗМЕНЕНИЕ ДАННЫХ АККАУНТА</p>
                                <div className="settings">
                                    <Link to="/dashboard">
                                        <div className="undo"></div>
                                    </Link>
                                    <div className="exitBtn">
                                        <a href="#" onClick={onLogout}>
                                            <button>ВЫЙТИ</button>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="changeBoard animated fadeInDown">
                                <div className="passwordChangeBoard pass">
                                    <div className="titleChange">
                                        <h1>ИЗМЕНЕНИЕ ПАРОЛЯ</h1>
                                    </div>
                                    <div className="inputData">
                                        <input
                                            ref={current_passwordRef}
                                            type="text"
                                            placeholder="Пароль"
                                        />
                                        <input
                                            ref={passwordRef}
                                            type="text"
                                            placeholder="Новый пароль"
                                        />
                                        <input
                                            ref={password_confirmationRef}
                                            type="text"
                                            placeholder="Подтвердите пароль"
                                        />
                                    </div>
                                    <div className="btnChangePassword">
                                        <button
                                            onClick={changePasswordData}
                                            className="blinkLight"
                                        >
                                            <h1>ИЗМЕНИТЬ</h1>
                                        </button>
                                        {errorPassword && (
                                            <div className="error animated fadeInDown">
                                                <p>{errorPassword}</p>
                                            </div>
                                        )}
                                        {successPassword && (
                                            <div className="success animated fadeInDown">
                                                <p>{successPassword}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="emailChangeBoard">
                                    <div className="passwordChangeBoard">
                                        <div className="titleChange ">
                                            <h1>ИЗМЕНЕНИЕ ПОЧТЫ</h1>
                                        </div>
                                        <div className="inputDataEmail">
                                            <input
                                                ref={current_emailRef}
                                                type="Почта"
                                                placeholder="Почта"
                                            />
                                            <input
                                                ref={emailRef}
                                                type="Новая почта"
                                                placeholder="Новая почта"
                                            />
                                            <input
                                                ref={password_confirm_emailRef}
                                                type="password"
                                                placeholder="Пароль"
                                            />
                                        </div>
                                        <div className="btnChangeEmail">
                                            <button
                                                onClick={changeEmailData}
                                                className="blinkLight"
                                            >
                                                <h1>ИЗМЕНИТЬ</h1>
                                            </button>
                                            {errorEmail && (
                                                <div className="error">
                                                    <p>{errorEmail}</p>
                                                </div>
                                            )}
                                            {successEmail && (
                                                <div className="success">
                                                    <p>{successEmail}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="settingsInfo">
                    {!isLoading && (
                        <div className="advanced">
                            <div className="decorative"></div>
                            <div className="advancedTitle">
                                <h1>ПОСЛЕДНИЕ ИЗМЕНЕНИЯ</h1>
                            </div>
                            <div className="accountDetails">
                                <div className="titleBar">
                                    <p>Пароль изменён:</p>
                                    <p>Почта изменена:</p>
                                    <p>Пополнение:</p>
                                    <p>VIP статус:</p>
                                </div>
                                <div className="dataAccount">
                                    <h1>
                                        {moment(user.updated_password).format(
                                            "YYYY.MM.DD HH:mm"
                                        )}
                                    </h1>
                                    <h1>
                                        {moment(user.updated_email).format(
                                            "YYYY.MM.DD HH:mm"
                                        )}
                                    </h1>
                                    <h1>
                                        {account.activated == 0
                                            ? "Заблокирован"
                                            : "Активен"}
                                    </h1>
                                    <h1>
                                        {account.membership == 0
                                            ? "Неактивен"
                                            : "Активен"}
                                    </h1>
                                </div>
                            </div>
                            <div className="decorative"></div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
