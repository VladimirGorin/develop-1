import React, { useState, useEffect } from "react";
import axiosClient from "../axios-client";

const Modal = ({
    editedUser,
    onSaveChanges,
    onClose,
    isLoading,
    setIsLoading,
}) => {
    const [userData, setUserData] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        if (!editedUser) return;
        setUserData(editedUser.combineAccountData || {});
    }, [editedUser]);

    const handleInputChange = (fieldName, e) => {
        const { value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleSave = async () => {
        try {
            setIsLoading(true); 
            const response = await axiosClient.post("/updateAccount", userData);
            onSaveChanges(userData);
        } catch (error) {
            setError(
                "Ошибка при отправке данных на сервер:",
                error.response.data.message
            );
        } finally {
            setIsLoading(false); 
            onClose();
        }
    };
    const handleOverlayClick = () => {
        onClose();
        setUserData({});
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div
                className="modal-content animated fadeInDown"
                onClick={(e) => e.stopPropagation()}
            >
                {isLoading ? (
                    <div className="logoAion"></div>
                ) : (
                    <form>
                        <div className="logoAion"></div>
                        <div className="gm animated fadeInDown">
                            <label>
                                Name:
                                <input
                                    type="text"
                                    value={userData.name}
                                    onChange={(e) =>
                                        handleInputChange("name", e)
                                    }
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="text"
                                    value={userData.email}
                                    onChange={(e) =>
                                        handleInputChange("email", e)
                                    }
                                />
                            </label>
                            <label>
                                Role:
                                <input
                                    type="text"
                                    value={userData.role}
                                    onChange={(e) =>
                                        handleInputChange("role", e)
                                    }
                                />
                            </label>
                            <label>
                                Coin:
                                <input
                                    type="text"
                                    value={userData.coin}
                                    onChange={(e) =>
                                        handleInputChange("coin", e)
                                    }
                                />
                            </label>
                            <label>
                                Activated:
                                <input
                                    type="text"
                                    value={userData.activated}
                                    onChange={(e) =>
                                        handleInputChange("activated", e)
                                    }
                                />
                            </label>
                            <label>
                                Account ID:
                                <input
                                    type="text"
                                    value={userData.account_id}
                                    onChange={(e) =>
                                        handleInputChange("account_id", e)
                                    }
                                />
                            </label>
                            <label>
                                Access Level:
                                <input
                                    type="text"
                                    value={userData.access_level}
                                    onChange={(e) =>
                                        handleInputChange("access_level", e)
                                    }
                                />
                            </label>
                            <label>
                                Membership:
                                <input
                                    type="text"
                                    value={userData.membership}
                                    onChange={(e) =>
                                        handleInputChange("membership", e)
                                    }
                                />
                            </label>
                            <button type="button" onClick={handleSave}>
                                <p>СОХРАНИТЬ</p>
                            </button>
                            {/* <div className="alert">{error}</div> */}
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Modal;
