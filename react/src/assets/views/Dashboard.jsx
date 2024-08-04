import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";
import axiosClient from "../../axios-client";
import { useEffect, useState } from "react";
import { format } from "@formkit/tempo";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
    const {
        user,
        account,
        setUser,
        setToken,
        setAccount,
        persons,
        setPersons,
        isLoading,
    } = useStateContext();

    const { t } = useTranslation();

    const [selectedPerson, setSelectedPerson] = useState("");
    const [classIcon, setClassIcon] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [animateClass, setAnimateClass] = useState(false);

    const currentDate = new Date();
    const expireDate = new Date(account.expire);
    const isNotExpired = expireDate > currentDate;

    useEffect(() => {
        setAnimateClass(true);
        const timeoutId = setTimeout(() => {
            setAnimateClass(false);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [selectedPerson]);

    const selectPerson = (ev) => {
        const selectedPersonId = ev.target.value;
        setSelectedPerson(selectedPersonId);
        const selectedClassIcon =
            ev.target.options[ev.target.selectedIndex].getAttribute(
                "data-classicon"
            );
        setClassIcon(selectedClassIcon);
    };

    const RepairHero = (ev) => {
        ev.preventDefault();
        const personId = {
            id: selectedPerson,
        };
        axiosClient
            .post("/repairPerson", personId)
            .then(({ data }) => {
                setSuccess(data.success);
                setError(data.error);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setError(response.data.message);
                    setSuccess("");
                }
            });
    };

    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setAccount({});
            setToken(null);
            setPersons({});
        });
    };

    return (
        <div className="container">
            <div className="controlPanel">
                <div className="mainBoard animated fadeInDown">
                    <div className="account">
                        {isLoading && (
                            <div className="isLoading">
                                <div className="loading"></div>
                            </div>
                        )}
                        {!isLoading && (
                            <div className="accountTitle">
                                <div className="toolBar">
                                    <p>{t("dashboard.personalCabinet")}</p>
                                    <div className="settings">
                                        <Link to="/settings">
                                            <div className="tool">
                                                <div className="toolIcon"></div>
                                            </div>
                                        </Link>
                                        <div className="exitBtn">
                                            <a href="#" onClick={onLogout}>
                                                <button>
                                                    {t("dashboard.logout")}
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="accountBoard animated fadeInDown">
                                    <div className="accountInfo">
                                        <div className="userBoard">
                                            <div className="classIcons">
                                                {classIcon && (
                                                <img
                                                        src={`assets/classes/${classIcon}.webp`}
                                                        className={`${
                                                            animateClass
                                                                ? "animated fadeInDown"
                                                                : ""
                                                        }`}
                                                />
                                                )}
                                            </div>
                                            <div className="selHero">
                                                <select
                                                    className="select-Hero"
                                                    onChange={selectPerson}
                                                >
                                                    <option
                                                        defaultValue={
                                                            "selectDefault"
                                                        }
                                                        className="selectDefault"
                                                        hidden
                                                    >
                                                        {t(
                                                            "dashboard.selectCharacter"
                                                        )}
                                                    </option>

                                                    {Object.keys(persons).map(
                                                        (key) => (
                                                            <option
                                                                key={
                                                                    persons[key]
                                                                        .id
                                                                }
                                                                value={
                                                                    persons[key]
                                                                        .id
                                                                }
                                                                data-classicon={
                                                                    persons[key]
                                                                        .player_class
                                                                }
                                                            >
                                                                {
                                                                    persons[key]
                                                                        .name
                                                                }{" "}
                                                                {
                                                                    persons[key]
                                                                        .level
                                                                }{" "}
                                                                LVL
                                                            </option>
                                                        )
                                                    )}
                                                </select>
                                                {error && (
                                                    <div className="error animated fadeInDown">
                                                        <p>{error}</p>
                                                    </div>
                                                )}
                                                {success && (
                                                    <div className="success animated fadeInDown">
                                                        <p>{success}</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="fixCharacter">
                                        <div
                                            className="fixBtn blinkLight"
                                            onClick={RepairHero}
                                        >
                                            <button>
                                                <p>{t("dashboard.repair")}</p>
                                            </button>
                                        </div>
                                        <h2>{t("dashboard.repairNotice")}</h2>
                                    </div>
                                </div>
                                <div className="payment animated fadeInDown">
                                    <div className="topUp">
                                        <div className="paymentBoard">
                                            <div className="bonus--table">
                                                <p>
                                                    {t(
                                                        "dashboard.mmotopBonuses"
                                                    )}
                                                </p>
                                            </div>
                                            <div className="bonus--account">
                                                <button
                                                    className="blinkLight"
                                                    id="mmotop-link"
                                                >
                                                    <a href="https://aion.mmotop.ru/servers/37732">
                                                        <p>
                                                            {t(
                                                                "dashboard.mmotop"
                                                            )}
                                                        </p>
                                                    </a>
                                                </button>
                                                <button
                                                    className="blinkGreenLight"
                                                    id="mmotop-bonus"
                                                >
                                                    <a href="https://aion.mmotop.ru/servers/37732/votes/new">
                                                        <p>
                                                            {t(
                                                                "dashboard.getBonus"
                                                            )}
                                                        </p>
                                                    </a>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="vipAccount">
                                        <div className="statusVipAccount">
                                            <div className="imageVip"></div>
                                            <p>{t("dashboard.vipAccount")}</p>
                                        </div>

                                        <Link to="/shugoexpress">
                                            <button className="blinkLight">
                                                <p>{t("dashboard.connect")}</p>
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="accountStatus">
                        {!isLoading && (
                            <>
                                <div className="achievement">
                                    <div className="achievementTitle">
                                        <p>{t("dashboard.achievements")}</p>
                                    </div>
                                    <div className="achievement__row">
                                        <div className="achievementValue">
                                            <h1>0 / 0</h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="advanced">
                                    <div className="decorative"></div>
                                    <div className="advancedTitle">
                                        <p>{t("dashboard.account")}</p>
                                    </div>
                                    <div className="accountDetails">
                                        <div className="titleBar">
                                            <p>{t("dashboard.created")}</p>
                                            <p>{t("dashboard.lastLogin")}</p>
                                            <p>
                                                {t("dashboard.accountStatus")}
                                            </p>
                                            <p>{t("dashboard.vipStatus")}</p>
                                        </div>
                                        <div className="dataAccount">
                                            <h1>
                                                {format({
                                                    format: "D MMMM, YYYY HH:mm",
                                                    date: user.created_at,
                                                    locale: "ru",
                                                    genitive: true,
                                                })}
                                            </h1>
                                            <h1>
                                                {format({
                                                    format: "D MMMM, YYYY HH:mm",
                                                    date: account.expire_access_level,
                                                    locale: "ru",
                                                    genitive: true,
                                                })}
                                            </h1>
                                            <h1>
                                                {account.activated == 0
                                                    ? t("dashboard.blocked")
                                                    : t("dashboard.active")}
                                            </h1>
                                            <h1>
                                                {isNotExpired && (
                                                    <h1>{`${Math.ceil(
                                                        (expireDate.getTime() -
                                                            currentDate.getTime()) /
                                                        (1000 *
                                                            60 *
                                                            60 *
                                                            24)
                                                    )}`}</h1>
                                                )}
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="decorative"></div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
