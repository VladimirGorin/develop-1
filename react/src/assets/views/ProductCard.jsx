import React, { useState } from "react";

const ProductCard = ({ product, handleSelectedProduct }) => {
    const [lot, setLot] = useState(1);

    const handleLotChange = (event) => {
        const inputValue = event.target.value;

        // Если значение пустое, обновляем состояние
        if (inputValue === "" || /^[0-9]{1,2}$/.test(inputValue)) {
            setLot(inputValue);
        }
    };
    return (
        <div className="product animated fadeInDown">
            <div className="image--product">
                <img src={product.icon} alt="" />
            </div>
            <div className="product-data">
                <div className="product--information">
                    <div className="product--title">
                        <h2>{product.title}</h2>
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
                                product.id,
                                product.price,
                                product.title,
                                lot
                            )
                        }
                    >
                        <p>ДОСТАВКА</p>
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
