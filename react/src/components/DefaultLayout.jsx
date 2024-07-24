import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { NavLink } from "react-router-dom";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import { useTranslation } from "react-i18next";

// import languageRuImg from "../img/site/language/ru.svg";
import languageRuImg from "../img/svg/flag/Flag_of_Russia.svg";
import languageEnImg from "../img/svg/flag/Flag_of_the_United_Kingdom_(3-5).svg.png";
// import languageEnImg from "../img/site/language/en.svg";

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

    const [userRole, setUserRole] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                return;
            }

            setIsLoading(true);

            try {
                const productResponse = await axiosClient.get("/shugoproduct");
                setProducts(productResponse.data.data);

                const advancedInfo = await axiosClient.get("/getAllUsers");
                setAdvancedInfo(advancedInfo.data.data);

                const userResponse = await axiosClient.get("/user");
                setUser(userResponse.data.user);
                setAccount(userResponse.data.account);
                setPersons(userResponse.data.persons);
                setPayLog(userResponse.data.payLog);
                setUserRole(userResponse.data.user.role);
                setPurchasedLog(userResponse.data.purchasedLog);
                setConnectionVipLog(userResponse.data.connectionVipLog);
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
    };

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };

    const handleOpenRegisterModal = () => {
        setShowRegisterModal(true);
    };

    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
    };

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div className="content_header">
                        <NavLink to="/site">
                            <div className="logoAion"></div>
                        </NavLink>
                        <div className="headerInfo">
                            {userRole === "admin" && (
                                <NavLink
                                    to="/adminpanel"
                                    className="nav-link"
                                    activeclassname="activeLink"
                                >
                                    <h1>{t("header.adminPanel")}</h1>
                                </NavLink>
                            )}
                            {token && (
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
                            )}
                        </div>
                    </div>

                    <div>
                        <div className="playerInfo">
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
                                                onClose={
                                                    handleCloseRegisterModal
                                                }
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
                                            />
                                        )}
                                    </div>
                                </div>
                            )}

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
                    </div>
                </header>
                <main>
                    <Outlet />
                    <div className="social-icons">
                        <a href="https://t.me/aionworld">
                            <div className="telegram"></div>
                        </a>
                        <a href="https://discord.gg/kyGwe46BDE">
                            <div className="discord"></div>
                        </a>
                        <a href="https://vk.com/world.aion">
                            <div className="vk"></div>
                        </a>
                        <a href="">
                            <div className="bug"></div>
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
                    </div>
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
                        {/* <div className="footer-links">
                            <a href="#">
                                <p>{t("privacyPolicy")}</p>
                            </a>
                            <a href="#">
                                <p>{t("userAgreement")}</p>
                            </a>
                            <a href="#">
                                <p>{t("paymentSecurity")}</p>
                            </a>
                        </div> */}

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
            </div>
        </div>
    );
}
