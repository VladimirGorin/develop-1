import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";

const Modal = ({
    isOpen,
    product,
    persons,
    onConfirm,
    onClose,
    purchaseStatus,
    isBtnStoreVisible,
    copyTextToClipboard,
    selectPerson,
    selectedPerson
}) => {
    if (!isOpen) return null;

    const [lot, setLot] = useState(1);
    const [gift, setGift] = useState(null);
    const [textPrice, setTextPrice] = useState("0");
    const [price, setPrice] = useState(product?.price);

    const { i18n } = useTranslation();

    const lang = i18n.language;

    const handleLotChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue === "" || /^[0-9]{1,2}$/.test(inputValue)) {
            setLot(inputValue);
        }
    };

    const handleGiftChange = (event) => {
        const inputValue = event.target.value;

        setGift(inputValue);
    };

    useEffect(() => {
        const calc = lot == 0 ? product?.price : product?.price * lot;
        setPrice(calc)
        setTextPrice(`${calc} WP`);
    }, [lot, setTextPrice, product?.price]);

    const title = lang === "ru" ? product.title_ru : product.title_en;
    const category = lang === "ru" ? product.category_ru : product.category_en;
    const description = lang === "ru" ? product.desc_ru : product.desc_en;

    return ReactDOM.createPortal(
        <>
            <div className="modal">
                <div className="modal--body">
                    {isBtnStoreVisible && (


                        <div className="modal--content">
                            <h1>
                                [{category}] {title}
                            </h1>

                            <div className="modal--wrap">
                                <div className="modal--info">
                                    <div className="modal--stats">
                                        <span>{description}</span>
                                    </div>
                                    <br />
                                    <div className="modal--item- id">
                                        <span>
                                            Скопируйте в игровой чат для
                                            просмотра деталей предмета:
                                        </span>
                                        <div className="modal--item-form">
                                            <input
                                                type="text"
                                                value={`[item: ${product?.item_code}]`}
                                                id="modalItemCode"
                                                readOnly
                                            />

                                            <button
                                                className="blinkLight"
                                                onClick={() => {
                                                    copyTextToClipboard(
                                                        "modalItemCode"
                                                    );
                                                }}
                                            >
                                                Copy
                                            </button>
                                        </div>
                                    </div>
                                    <br />
                                    <div className="modal--item- gift">
                                        <span>Или сделайте подарок:</span>
                                        <div className="modal--item-form">
                                            <input
                                                type="text"
                                                placeholder="Nickname"
                                                onChange={handleGiftChange}
                                                value={gift}
                                            />

                                            {/* <button className="blinkLight" onClick={() => {copyTextToClipboard("modalItemCode")}}>Copy</button> */}
                                        </div>
                                    </div>
                                    <br />
                                    <div className="modal--item- price">
                                        <span>Цена: {textPrice}</span>
                                        <div className="modal--item-form lot">
                                            <input
                                                type="text"
                                                min={1}
                                                onChange={handleLotChange}
                                                value={lot}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="modal--item- person">
                                        <span>Выберете персонажа</span>
                                        <div className="modal--item-form persons">
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
                                                    персонаж
                                                </option>

                                                {Object.keys(persons).map(
                                                    (key) => (
                                                        <option
                                                            key={
                                                                persons[key].id
                                                            }
                                                            value={`${persons[key].id}:${persons[key].name}`}
                                                            data-classicon={
                                                                persons[key]
                                                                    .player_class
                                                            }
                                                        >
                                                            {persons[key].name}{" "}
                                                            {persons[key].level}{" "}
                                                            LVL
                                                        </option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <br />

                                    <div className="modal--item- buy">
                                        <button
                                            id="confirm"
                                            onClick={(ev) => {
                                                const data = {
                                                    id: product.id,
                                                    price,
                                                    title,
                                                    item_code: product.item_code,
                                                    lot: lot == 0 ? 1 : lot,
                                                    personId: selectedPerson ? selectedPerson.id : null,
                                                    personName: selectedPerson ? selectedPerson.name : null,
                                                }

                                                onConfirm(data)
                                            }}
                                            className="blinkLight"
                                        >
                                            Buy (-{textPrice})
                                        </button>
                                    </div>
                                    <br />
                                    <br />
                                    <div id="purchaseStatus">
                                        <p>{purchaseStatus}</p>
                                    </div>
                                </div>
                                <div className="modal--image">
                                    <img
                                        src={`assets/products/${product.icon}`}
                                        alt={title}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <button id="close" onClick={onClose} className="blinkLight">
                        <p>ЗАКРЫТЬ</p>
                    </button>
                </div>
            </div>
        </>,
        document.body
    );
};

export default Modal;
