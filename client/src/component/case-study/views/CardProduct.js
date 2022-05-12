import React from "react";

function CardGood(props) {
    const { name, thumbnail, price, quantity, disable } = props;

    return (
        <div className="wrapper-card">
            <div className="product-img">
                <img src={thumbnail} height="200" width="200" />
            </div>
            <div className="product-info">
                <div className="product-text">
                    <h1>{name}</h1>
                    <h2>{quantity} Remain</h2>
                </div>
                <div className="product-price-btn">
                    <p><span>{price}</span></p>
                    <button type="button" disabled={disable}>Buy Now</button>
                </div>
            </div>
        </div>
    )
}

export default CardGood;