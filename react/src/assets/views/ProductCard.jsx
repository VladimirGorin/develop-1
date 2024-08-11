import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product, handleSelectedProduct }) => {
    const [lot, setLot] = useState(1);
    const { i18n } = useTranslation();

    const lang = i18n.language;

    const handleLotChange = (event) => {
        const inputValue = event.target.value;

        if (inputValue === "" || /^[0-9]{1,2}$/.test(inputValue)) {
            setLot(inputValue);
        }
    };

    // Выбор заголовка в зависимости от текущего языка
    const title = lang === "ru" ? product.title_ru : product.title_en;
    const category = lang === "ru" ? product.category_ru : product.category_en;
    const description = lang === "ru" ? product.desc_ru : product.desc_en;

    return (
        <div className="product animated fadeInDown">
            <div className="image--product">
                {/* <img src={product.icon} alt={title} /> */}
                <img src={`assets/products/${product.icon}`} alt={title} />
            </div>
            <div className="product-data">
                <div className="product--information">
                    <div className="product--title" placeholder={description}>
                        <h2>{title}</h2>
                    </div>
                    <div className="product--price">
                        <h3>{lot == 0 ? product.price : product.price * lot} WP</h3>
                    </div>
                </div>
                <div className="expressBtn">
                    <button
                        className="blinkLight"
                        onClick={(ev) =>
                            handleSelectedProduct(
                                ev,
                                product,
                                product.id,
                                product.price,
                                title,
                                product.item_code,
                                lot
                            )
                        }
                    >
                        <p>Подробнее</p>
                    </button>
                    {product.islot == true && (
                        <div className="lotProducts">
                            <input
                                type="text"
                                size="10"
                                value={lot}
                                onChange={handleLotChange}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
