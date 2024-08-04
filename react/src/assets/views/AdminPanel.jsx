import React, { useState, useEffect } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Modal from "../../components/ModalEditing";

const AdminPanel = () => {
    const { advancedInfo, setAdvancedInfo } = useStateContext();
    const [activeButton, setActiveButton] = useState("usersPanel");
    const [onlinePlayers, setOnlinePlayers] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);
    const [expanded, setExpanded] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editedPlayer, setEditedPlayer] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
    };

    useEffect(() => {
        const fetchAdvancedInfo = async () => {
            try {
                const response = await axiosClient.get("/getAllUsers");
                setAdvancedInfo(response.data);
            } catch (error) {
                console.error("Error fetching advanced info:", error);
            }
        };

        fetchAdvancedInfo();
    }, []);

    useEffect(() => {
        if (advancedInfo && advancedInfo.onlinePlayers) {
            setOnlinePlayers(advancedInfo.onlinePlayers);
            setUsers(advancedInfo.users);
        }
        if (advancedInfo && advancedInfo.users) {
            setUsers(advancedInfo.users);
        }
    }, [advancedInfo]);

    const handlePlayerClick = (player) => {
        setSelectedPlayer(player);
        setExpanded(!expanded);
    };

    const handleEditPlayer = (player) => {
        setEditedPlayer(player);
        setShowModal(true);
    };

    const handleEditUser = (userName) => {
        const userData = {
            name: userName,
        };
        setShowModal(true);
        setIsLoading(true); // Установим isLoading в true перед отправкой запроса
        axiosClient
            .post("/getAdvancedInfo", userData)
            .then((response) => {
                setEditedUser(response.data);
                setIsLoading(false); 
            })
            .catch((error) => {
                setIsLoading(false); 
            });
    };

    const handleSaveChanges = (editedData) => {
        // editedData содержит отредактированные данные
        setIsEditing(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditedUser({});
        setIsLoading(false);
    };

    const renderContent = () => {
        let filteredUsers = users;
        if (searchTerm) {
            filteredUsers = users.filter((user) =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        switch (activeButton) {
            case "usersPanel":
                return (
                    <div className="admin-panel">
                        <div className="online">
                            <div id="serverInformation">
                                <div className="dropdown">
                                    <div className="dropdown">
                                        <div className="serverOnline"></div>
                                        <div className="dropdown-content">
                                            {onlinePlayers.map(
                                                (player, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() =>
                                                            handlePlayerClick(
                                                                player
                                                            )
                                                        }
                                                    >
                                                        {player.name}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <h2>{onlinePlayers.length}</h2>
                            </div>

                            <div className="search">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    placeholder="Поиск"
                                />
                            </div>
                        </div>
                        <table className="player-table">
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>User Name</th>
                                    <th></th>
                                    <th>Действия</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{user.name}</td>
                                        <td>{user.account_id}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    handleEditUser(user.name)
                                                }
                                                className="editUser"
                                            >
                                                <p>ИЗМЕНИТЬ</p>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                );
            case "toolsPanel":
                return (
                    <div className="admin-panel">
                        {/* <button>
                            <h2>СОЗДАТЬ АККАУНТ</h2>
                        </button> */}
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="container container-adminPanel">
            <div className="purchase--history animated fadeInDown">
                <div className="table-history">
                    <div className="table--header animated fadeInDown">
                        <button
                            className={
                                activeButton === "usersPanel"
                                    ? " activeHistory"
                                    : ""
                            }
                            onClick={() => handleButtonClick("usersPanel")}
                        >
                            <h1>ПОЛЬЗОВАТЕЛИ</h1>
                        </button>
                        <button
                            className={
                                activeButton === "toolsPanel"
                                    ? " activeHistory"
                                    : ""
                            }
                            onClick={() => handleButtonClick("toolsPanel")}
                        >
                            <h1>ИНСТРУМЕНТЫ</h1>
                        </button>
                    </div>
                    <div className="purchase--information animated fadeInDown">
                        {renderContent()}
                    </div>
                </div>
            </div>
            {showModal && (
                <Modal
                    editedUser={editedUser}
                    onSaveChanges={handleSaveChanges}
                    onClose={handleCloseModal}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading} // send setIsLoading in conponent Modals
                />
            )}
        </div>
    );
};

export default AdminPanel;
