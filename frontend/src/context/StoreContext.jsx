import {createContext,useEffect, useState} from "react";
import {food_list} from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext (null);

const StoreContextProvider = ({children}) => {
    const url = "http://localhost:4000"
    const [cartItems, setCartItems] = useState ({});
    const [token, setToken] = useState("")
    // const [food_list, setFoodList] = useState([]);
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems ((prev) => (
                {...prev, [itemId] : 1}
            ));
        } else {
            setCartItems ((prev) => (
                {...prev, [itemId] : prev[itemId] + 1}
            ));
        }
    };
    const removeCartItems = (itemId) => {
        setCartItems ((prev) => (
            {...prev, [itemId] : prev[itemId] - 1}
        ));
    };
    
    // useEffect(()=>{
    //     console.log(cartItems)},[cartItems])
    const getTotalCartNumber = () => {
        let totalFee = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemChosen = food_list.find ((goods) => goods._id === item);
                totalFee += itemChosen.price * cartItems[item];
            }
        }
        return totalFee;
    };
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/food/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };
    
    
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
            }
            
        }
        loadData()
    }, [])
    
    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeCartItems,
        getTotalCartNumber,
        url,
        token,
        setToken
    };
    return (
        <StoreContext.Provider value={contextValue}>
            {children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
