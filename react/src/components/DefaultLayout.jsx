import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { NavLink } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import { useTranslation } from "react-i18next";
import Modal from "../assets/views/TermsOfUseModal";
import ModalPrivatePolicy from "../assets/views/PrivatePolicyModal";

import languageRuImg from "../img/svg/flag/Flag_of_Russia.svg";
import languageEnImg from "../img/svg/flag/Flag_of_the_United_Kingdom_(3-5).svg.png";

export default function DefaultLayout() {
    const {
        user,
        token,
        setUser,
        setUsers,
        setAccount,
        setToken,
        setPersons,
        notification,
        setIsLoading,
        setProducts,
        setAdvancedInfo,
        setPurchasedLog,
        setPayLog,
        setConnectionVipLog,
    } = useStateContext();

    const { t, i18n } = useTranslation();
    const location = useLocation();

    const checkMainPage = () => {
        return location.pathname == '/' || location.pathname == '/site' ? 'mainPage' : 'otherPage';
    }

    const [userRole, setUserRole] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showUserAgreementModal, setShowUserAgreementModal] = useState(false); 
    const [showPrivatePolicyModal, setShowPrivatePolicyModal] = useState(false); 

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                return;
            }

            setIsLoading(true);

            try {
                const productResponse = await axiosClient.get("/shugoproduct");
                setProducts(productResponse.data.data);

                const userResponse = await axiosClient.get("/user");
                setUser(userResponse.data.user);
                setAccount(userResponse.data.account);
                setPersons(userResponse.data.persons);
                setPayLog(userResponse.data.payLog);
                setUserRole(userResponse.data.user.role);
                setPurchasedLog(userResponse.data.purchasedLog);
                setConnectionVipLog(userResponse.data.connectionVipLog);

                if(userRole == "admin"){
                    const advancedInfo = await axiosClient.get("/getAllUsers");
                    setAdvancedInfo(advancedInfo.data.data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [token]);

    useEffect(() => {
        const userLang = navigator.language || navigator.userLanguage;
        const defaultLang = userLang.startsWith("ru") ? "ru" : "en";
        i18n.changeLanguage(defaultLang);
    }, [i18n]);

    if (
        !token &&
        location.pathname !== "/site" &&
        location.pathname !== "/download"
    ) {
        return <Navigate to="/login" />;
    }

    const onLogout = (ev) => {
        ev.preventDefault();

        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    };

    const handleOpenLoginModal = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false); 
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleOpenRegisterModal = () => {
        setShowRegisterModal(true);
        setShowLoginModal(false); 
    };

    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
    };

    const handleOpenUserAgreementModal = () => {
        setShowUserAgreementModal(true);
    };

    const handleCloseUserAgreementModal = () => {
        setShowUserAgreementModal(false);
    };

    const handleOpenPrivatePolicyModal = () => {
        setShowPrivatePolicyModal(true);
    };

    const handleClosePrivatePolicyModal = () => {
        setShowPrivatePolicyModal(false);
    };

    const handleAgreement = () => {
        setShowUserAgreementModal(false);
    };

    const handlePrivatePolicy = () => {
        setShowPrivatePolicyModal(false);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="content_header">
                        <NavLink to="/site" className={"pc"}>
                            <div className="logoAion"></div>
                        </NavLink>
                        <div className="mobileLogo">
                            <NavLink to="/site">
                                <div className="logoAion"></div>
                            </NavLink>
                            {token && <div>
                                <div className="playerInfo">
                                    {token && (
                                        <div className="information--player">
                                            <div className="username">
                                                <p>{user.name}</p>
                                            </div>
                                            <div className="balance">
                                                <p>{user.coin} WP</p>
                                            </div>
                                        </div>
                                    )}
                                    {token && (
                                        <div className="exit">
                                            <button
                                                onClick={onLogout}
                                                className="btn-logout"
                                                href="#"
                                            ></button>
                                        </div>
                                    )}
                                </div>
                            </div>}
                        </div>
                        {token && <div className="headerInfo">
                            {userRole === "admin" && (
                                <NavLink
                                    to="/adminpanel"
                                    className="nav-link"
                                    activeclassname="activeLink"
                                >
                                    <h1>{t("header.adminPanel")}</h1>
                                </NavLink>
                            )}
                                <>
                                    <NavLink
                                        to="/site"
                                        className="nav-link"
                                        activeclassname="activeLink"
                                    >
                                        <h1>{t("header.site")}</h1>
                                    </NavLink>

                                    <NavLink
                                        to="/dashboard"
                                        className="nav-link"
                                        activeclassname="activeLink"
                                    >
                                        <h1>{t("header.dashboard")}</h1>
                                    </NavLink>
                                    <NavLink
                                        to="/download"
                                        className="nav-link"
                                        activeclassname="activeLink"
                                    >
                                        <h1>{t("header.download")}</h1>
                                    </NavLink>
                                    <NavLink
                                        to="/donate"
                                        className="nav-link"
                                        activeclassname="activeLink"
                                    >
                                        <h1>{t("header.donate")}</h1>
                                    </NavLink>
                                    <NavLink
                                        to="/shugoexpress"
                                        className="nav-link"
                                        activeclassname="activeLink"
                                    >
                                        <h1>{t("header.shugoExpress")}</h1>
                                    </NavLink>
                                </>
                        </div>}
                        {token && <div className="playerInfoWrapper">
                            <div className="playerInfo">
                                <div className="information--player">
                                    <div className="username">
                                        <p>{user.name}</p>
                                    </div>
                                    <div className="balance">
                                        <p>{user.coin} WP</p>
                                    </div>
                                </div>
                                <div className="exit">
                                    <button
                                        onClick={onLogout}
                                        className="btn-logout"
                                        href="#"
                                    ></button>
                                </div>
                            </div>
                        </div>}
                        {!token && (
                            <div className="sign">
                                <div className="reg">
                                    <button
                                        onClick={handleOpenRegisterModal}
                                        id="registration"
                                    >
                                        <p>{t("header.startNow")}</p>
                                    </button>
                                    {showRegisterModal && (
                                        <ModalRegister
                                            onClose={handleCloseRegisterModal}
                                            onSwitchToLogin={handleOpenLoginModal}
                                        />
                                    )}
                                </div>
                                <div className="sign-in">
                                    <button
                                        onClick={handleOpenLoginModal}
                                        id="sign-in"
                                    ></button>
                                    {showLoginModal && (
                                        <ModalLogin
                                            onClose={handleCloseLoginModal}
                                            onSwitchToRegister={handleOpenRegisterModal}
                                        />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </header>
                <main className={checkMainPage()}>
                    <Outlet />
                    {checkMainPage() !== 'otherPage' && <div className="social-icons">
                        <a href="https://t.me/aionworld">
                            <div className="telegram"></div>
                        </a>
                        <a href="https://discord.gg/kyGwe46BDE">
                            <div className="discord"></div>
                        </a>
                        <a href="https://vk.com/world.aion">
                            <div className="vk"></div>
                        </a>
                        <div className="language-button">
                            <button className="current-language">
                                {i18n.language === "en" ? (
                                    <img
                                        src={languageEnImg}
                                        alt="English"
                                        onClick={() => changeLanguage("ru")}
                                    />
                                ) : (
                                    <img
                                        src={languageRuImg}
                                        alt="Русский"
                                        onClick={() => changeLanguage("en")}
                                    />
                                )}
                            </button>
                        </div>
                    </div>}
                </main>
                {notification && (
                    <div className="notification">{notification}</div>
                )}
                <footer>
                    <div
                        style={{
                            display: "inline-block",
                            position: "fixed",
                            bottom: 0,
                            right: 0,
                        }}
                    >
                        <a
                            href="https://aion.mmotop.ru/servers/37732/votes/new"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <img
                                src="https://mmotop.ru/uploads/rating_img/mmo_37732.png"
                                border="0"
                                id="mmotopratingimg"
                                alt="Рейтинг серверов mmotop"
                            />
                        </a>
                    </div>

                    <div className="footer-link">
                        <div className="footer-links">
                            <p onClick={handleOpenUserAgreementModal}>
                                {t("footer.userAgreement")} 
                            </p>
                            <p onClick={handleOpenPrivatePolicyModal}>
                                {t("footer.privatePolicy")} 
                            </p>
                            <p>{t("footer.copyright")}</p>
                            <a href="#">
                                {/* <p>{t("paymentSecurity")}</p> */}
                            </a>
                        </div>

                        {/* <div className="language-button">
                            <button className="current-language">
                                {i18n.language === "en" ? (
                                    <img
                                        src={languageEnImg}
                                        alt="English"
                                        onClick={() => changeLanguage("ru")}
                                    />
                                ) : (
                                    <img
                                        src={languageRuImg}
                                        alt="Русский"
                                        onClick={() => changeLanguage("en")}
                                    />
                                )}
                            </button>
                        </div> */}
                    </div>
                </footer>
                <Modal 
                    isOpen={showUserAgreementModal}
                    onClose={handleCloseUserAgreementModal}
                    agreement={handleAgreement}
                />
                <ModalPrivatePolicy 
                    isOpen={showPrivatePolicyModal}
                    onClose={handleClosePrivatePolicyModal}
                    agreement={handlePrivatePolicy}
                />
            </div>
        </div>
    );
}
