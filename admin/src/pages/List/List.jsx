import React, { useEffect, useState } from 'react';
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets,url} from '../../assets/assets';

const List = () => {
    // const url = "http://localhost:4000";
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchList = async () => {
        setLoading(true); // Set loading state                                                                                                                                   
        try {
            const response = await axios.get(`${url}/api/food/list`);
            console.log(response.data);
            if (response.data.success) {
                setList(response.data.data);
                // toast.success("Food list fetched successfully!");
            } else {
                toast.error("Failed to fetch food list.");
            }
        } catch (error) {
            toast.error("Network error. Please try again later.");
        } finally {
            setLoading(false); // End loading state
        }
    };
    // const removeFood = async (foodId) => {
    //     const response = await axios.post(`${url}/api/food/remove`, {
    //         id: foodId
    //     })
    //     await fetchList();
    //     if (response.data.success) {
    //         toast.success(response.data.message);
    //     }
    //     else {
    //         toast.error("Error")
    //     }
    // }
    const removeFood = async (id) => {
        try {
            const response = await axios.post(`${url}/api/food/remove`, {
                id: id
            })
            await fetchList(); // Retrieve the list to refresh the data
            if (response.data.success) {
                toast.success("Food item removed successfully");
            } else {
                toast.error("Failed to remove food item");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        }
    };

    useEffect(() => { fetchList() }, [])
    return (
        <div className='list add flex-col'>
            <p>All Food List</p>
            <div className='list-table'>
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {loading ? (
                    <p>Loading...</p> // 当数据正在加载时显示
                ) : list.length === 0 ? (
                    <div className='no-content'>
                    <h1>Oops! No foods available</h1>  
                    <img src={assets.notAvailable} alt="" />
                    </div>
                ) : (
                    list.map((item) => (
                        <div key={item._id} className='list-table-format'>
                            <img src={`${url}/images/${item.image}`} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>${item.price}</p>
                            {/* <p className='cursor' onClick={() => removeFood(item._id)}>Delete</p> */}
                            <img className='deletion' src={assets.delete_icon} onClick={() => removeFood(item._id)} alt=''/>
                        </div>
                    ))
                )}

            </div>
        </div>
    );
};

export default List;
