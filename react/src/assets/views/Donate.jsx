import React, { useState } from "react";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import Payment from "../../components/payment";

const Donate = () => {
    const { t } = useTranslation(); // Initialize the useTranslation hook

    const [activeButton, setActiveButton] = useState("informationButton");

    const handleButtonClick = (buttonName) => {
        setActiveButton((prevButton) =>
            prevButton === buttonName ? prevButton : buttonName
        );
    };

    const buttons = [
        // { label: "ИНФОРМАЦИЯ", className: "informationBu" },
        { label: "YOOMONEY", className: "yoomoneyButton" },
        // { label: "LAVA", className: "lavaButton" },
        // { label: "PAYPALYCH", className: "paypalychButton" },
    ];

    const renderContent = () => {
        switch (activeButton) {
            case "informationButton":
                return (
                    <div className="donatePay animated fadeInDown">
                        <div className="paymentTitle">
                            <div className="donate--title">
                                <p>{t("donate.rules.intro")}</p>{" "}
                                {/* Localized content */}
                            </div>
                        </div>
                        <div className="paymentRules animated fadeInDown">
                            <div className="donate--rules">
                                <ul>
                                    <li>{t("donate.rules.wpReward")}</li>
                                    <li>
                                        {t("donate.rules.voluntarySupport")}
                                    </li>
                                    <li>
                                        {t(
                                            "donate.rules.expressionOfGratitude"
                                        )}
                                    </li>
                                    <li>
                                        {t("donate.rules.serverMaintenance")}
                                    </li>
                                    <li>
                                        {t("donate.rules.finalTransactions")}
                                    </li>
                                    <li>{t("donate.rules.virtualLoss")}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            case "yoomoneyButton":
                return (
                    <div>
                        <Payment />
                    </div>
                );

            // Cases for other buttons (lavaButton, paypalychButton) can be added similarly
            default:
                return null;
        }
    };

    return (
        <div className="container">
            <div className="donateBoard animated fadeInDown">
                <div className="donateContent">
                    <div className="paymentSystems">
                        <div className="informationPayment">
                            <button
                                className={`informationButton animated fadeInDown ${
                                    "informationButton" === activeButton
                                        ? "activePayment"
                                        : ""
                                }`}
                                onClick={() =>
                                    handleButtonClick("informationButton")
                                }
                            >
                                <h2>{t("donate.rules.title")}</h2>{" "}
                                {/* Localized button label */}
                            </button>
                        </div>
                        <div className="paymentMethods">
                            {buttons.map((button, index) => (
                                <div key={index} className={button.className}>
                                    <button
                                        className={`${button.className} ${
                                            button.className === activeButton
                                                ? "activePayment"
                                                : ""
                                        }`}
                                        onClick={() =>
                                            handleButtonClick(button.className)
                                        }
                                    >
                                        <h2>{button.label}</h2>
                                    </button>
                                </div>
                            ))}
                            <div className="unavailable-container">
                                <div className="unavailable">
                                    <div className="icon">&#9888;</div>
                                </div>
                                <div className="unavailable">
                                    <div className="icon">&#9888;</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="additionalContent">{renderContent()}</div>
                </div>
            </div>
        </div>
    );
};

export default Donate;
