import {useContext} from 'react';
import "./Cart.css";
import {StoreContext} from "../../context/StoreContext.jsx";
import {useNavigate} from 'react-router-dom';

const Cart = () => {
    const {cartItems, food_list, removeCartItems, getTotalCartNumber} = useContext (StoreContext);
    const navigate = useNavigate ();
    return (
        <div className="cart">
            <div className="cart-items">
                <div className="cart-title">
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br/>
                <hr/>
                {food_list.map ((item, index) => {
                    if (cartItems[item._id] > 0) {
                        return (
                            <div>
                                <div className="cart-title cart-item">
                                    <img src={item.image} alt=""/>
                                    <p>{item.name}</p>
                                    <p>${item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>${item.price * cartItems[item._id]}</p>
                                    <p onClick={() => removeCartItems (item._id)} className="delete">Delete</p>
                                </div>
                                <hr/>
                            </div>
                        );
                    }
                })}
            </div>
            <div className="cart-calculate">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="total-info">
                            <p>Subtotal</p>
                            <p>${getTotalCartNumber ()}</p>
                        </div>
                        <div className="total-info">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartNumber () === 0 ? 0 : 16}</p>
                        </div>
                        <hr/>
                        <div className="total-info">
                            <b>Total</b>
                            <b>${getTotalCartNumber () === 0 ? 0 : getTotalCartNumber () + 16}</b>
                        </div>
                    </div>
                    <button onClick={() => navigate ('/order')}>Ready To Checkout</button>
                </div>
                <div className="cart-discount">
                    <div>
                        <p>If you have a discount code, enter it here.</p>
                        <div className="cart-discount-input">
                            <input type="text" placeholder="promo code"/>
                            <button>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
