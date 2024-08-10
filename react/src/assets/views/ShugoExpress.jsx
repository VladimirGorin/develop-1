import React, { useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Modal from "./Modal";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function ShugoExpress() {
    const {
        products,
        setUser,
        persons,
        user,
        setPurchasedLog,
        setConnectionVipLog,
    } = useStateContext();
    const [selectedPerson, setSelectedPerson] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [isModalOpen, setModalOpen] = useState(false);
    const [purchaseStatus, setPurchaseStatus] = useState("");
    const [isBtnStoreVisible, setBtnStoreVisible] = useState(true);
    const [activeCategory, setActiveCategory] = useState("all");
    const [lot] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedProduct, setSelectedProduct] = useState({
        id: "",
        price: "",
        title: "",
        item_code: "",
        lot: lot,
        personId: selectedPerson.id,
        personName: selectedPerson.name,
    });

    const { i18n } = useTranslation();
    const lang = i18n.language;

    const selectPerson = (ev) => {
        const selectedValue = ev.target.value;
        const [selectedPersonId, selectedPersonName] = selectedValue.split(":");

        setSelectedPerson({ id: selectedPersonId, name: selectedPersonName });
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
        setActiveCategory(event.target.value);
    };

    const handleSelectedProduct = (
        ev,
        productId,
        productPrice,
        productTitle,
        item_code,
        lot
    ) => {
        setSelectedProduct((prevState) => ({
            ...prevState,
            id: productId,
            price: productPrice * lot,
            title: productTitle,
            item_code: item_code,
            lot: lot == 0 ? 1 : lot,
            personId: selectedPerson ? selectedPerson.id : null,
            personName: selectedPerson ? selectedPerson.name : null,
        }));

        setModalOpen(true);
    };

    const handleConfirmPurchase = () => {
        setPurchaseStatus("В ОБРАБОТКЕ...");

        axiosClient
            .post("/productPurchase", selectedProduct)
            .then(({ data }) => {
                setPurchaseStatus(data.status);
                setUser(data.user);
                setPurchasedLog(data.purchasedLog);
                setConnectionVipLog(data.connectionVipLog);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setError(response.data.message);
                }
            });

        setBtnStoreVisible(false);
    };

    const handleModalClose = () => {
        setBtnStoreVisible(true);
        setSelectedProduct({
            id: "",
            price: "",
            title: "",
            item_code: "",
            lot: lot,
            personId: "",
            personName: "",
        });
        setPurchaseStatus("");
        setModalOpen(false);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredProducts =
        selectedCategory === "all"
            ? Object.values(products)
            : Object.values(products).filter((product) => {
                const category =
                    lang === "ru" ? product.category_ru : product.category_en;
                return category === selectedCategory;
            });


    const filteredAndSearchedProducts = filteredProducts.filter((product) =>

        product.title_ru && product.title_ru.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <div className="expressBoard animated fadeInDown">
                <div className="expressContent">
                    <div className="express--header">
                        <div className="express--category">
                            <div className="header--category">
                                <div className="premium">
                                    <button></button>
                                    <Link to="/purchaseHistory">
                                        <div className="history--buys">
                                            <span data-tooltip="История покупок" data-flow="top">
                                                <button></button>
                                            </span>
                                        </div>
                                    </Link>
                                    <Link to="/paymentHistory">
                                        <div className="payment--history">
                                            <span data-tooltip="История пополнений" data-flow="top"></span>
                                            <button></button>
                                        </div>
                                    </Link>
                                </div>

                                <div className="search--express">
                                    <form className="find">
                                        <input
                                            type="text"
                                            placeholder="Начните поиск..."
                                            value={searchTerm}
                                            onChange={handleSearchChange}
                                        />
                                    </form>
                                </div>
                            </div>
                            <div className="balanceWP">
                                <h3>{user.coin} WP</h3>
                            </div>
                        </div>
                    </div>
                    <div className="express--scroll">
                        <div className="express--products">

                            {filteredAndSearchedProducts.length > 0 ? (
                                filteredAndSearchedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        item_code={product.item_code}
                                        handleSelectedProduct={handleSelectedProduct}
                                        lot={lot}
                                    />
                                ))
                            ) : (
                                <p>Нет продуктов для отображения</p>
                            )}
                            <Modal
                                isOpen={isModalOpen}
                                title={selectedProduct.title}
                                lot={lot}
                                price={selectedProduct.price}
                                onConfirm={handleConfirmPurchase}
                                onClose={handleModalClose}
                                purchaseStatus={purchaseStatus}
                                isBtnStoreVisible={isBtnStoreVisible}
                            />
                            <div className="expressBurgerMenu mob">
                                <div className="expressSelect">
                                    <div className="selHero">
                                        <select className="select-Hero" onChange={selectPerson}>
                                            <option defaultValue={"selectDefault"} className="selectDefault" hidden>
                                                Выберите персонажа:
                                            </option>

                                            {Object.keys(persons).map((key) => (
                                                <option
                                                    key={persons[key].id}
                                                    value={`${persons[key].id}:${persons[key].name}`}
                                                    data-classicon={persons[key].player_class}
                                                >
                                                    {persons[key].name} {persons[key].level} LVL
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className={`expressmenu`}>
                                    <ul>
                                        <li
                                            className={activeCategory === "all" ? "activeCategory" : ""}
                                            onClick={() => handleCategoryChange({ target: { value: "all" } })}
                                        >
                                            <h2> ВСЕ ПРОДУКТЫ</h2>
                                        </li>
                                        {Array.from(
                                            new Set(
                                                Object.values(products).map(
                                                    (product) =>
                                                        lang === "ru"
                                                            ? product.category_ru
                                                            : product.category_en
                                                )
                                            )
                                        ).map((category) => (
                                            <li
                                                key={category}
                                                className={
                                                    activeCategory === category
                                                        ? "activeCategory"
                                                        : ""
                                                }
                                                onClick={() =>
                                                    handleCategoryChange({ target: { value: category } })
                                                }
                                            >
                                                <h2>{category}</h2>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="expressBurgerMenu">
                    <div className="expressSelect">
                        <div className="selHero">
                            <select className="select-Hero" onChange={selectPerson}>
                                <option defaultValue={"selectDefault"} className="selectDefault" hidden>
                                    Выберите персонажа:
                                </option>

                                {Object.keys(persons).map((key) => (
                                    <option
                                        key={persons[key].id}
                                        value={`${persons[key].id}:${persons[key].name}`}
                                        data-classicon={persons[key].player_class}
                                    >
                                        {persons[key].name} {persons[key].level} LVL
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className={`expressmenu`}>
                        <ul>
                            <li
                                className={activeCategory === "all" ? "activeCategory" : ""}
                                onClick={() => handleCategoryChange({ target: { value: "all" } })}
                            >
                                <h2> ВСЕ ПРОДУКТЫ</h2>
                            </li>
                            {Array.from(
                                new Set(
                                    Object.values(products).map(
                                        (product) =>
                                            lang === "ru"
                                                ? product.category_ru
                                                : product.category_en
                                    )
                                )
                            ).map((category) => (
                                <li
                                    key={category}
                                    className={
                                        activeCategory === category
                                            ? "activeCategory"
                                            : ""
                                    }
                                    onClick={() =>
                                        handleCategoryChange({ target: { value: category } })
                                    }
                                >
                                    <h2>{category}</h2>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
