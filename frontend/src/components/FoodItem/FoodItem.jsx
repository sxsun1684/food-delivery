import React, {useContext} from 'react';
import { assets } from '../../assets/assets'
import "./FoodItem.css"
import {StoreContext} from "../../context/StoreContext.jsx";

const FoodItem = ({id, name, description,price, image}) => {

    const {cartItems, addToCart, removeCartItems,url}=useContext(StoreContext);

    return (
        <div className="food-item">
            <div className="food-item-container">
                <img src={image} alt="" className="food-item-img"/>
                {!cartItems[id]
                    ? <img className="add-item" onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>
                    : <div className="item-counter">
                        <img onClick={()=>removeCartItems(id)} src={assets.remove_icon_red} alt=""/>
                        <p>{cartItems[id]}</p>
                        <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
                    </div>
                }
            </div>
            <div className="food-info">
                <div className="food-rating">
                    <p>{name}</p>
                    <img src={assets.rating_stars} alt=""/>
                </div>
                <p className="food-item-desc">{description}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;
