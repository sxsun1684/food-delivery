import foodModel from "../models/foodModel.js"
import fs from "fs"

//add food items
const addFoodItem=async(req,res)=>{
    // const { name, description, price, category } = req.body;
    // if (!name || !description || !price || !category) {
    //     return res.json({ success: false, message: "All fields are required" });
    // }
    let image_filename = `${req.file.filename}`
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image: image_filename,
    })
    try {
        // 保存到数据库
        await food.save();
        res.status(200).json({ success: true, message: "Food has been added" });
    } catch (error) {
        // 详细记录错误
        console.log("Error saving food item:", error);
        res.status(500).json({ success: false, message: "Error saving food item", error: error.message });
    }

}
// all food list
const listOfFood = async (req, res) => {
    try {
        // Query all food
        const foods = await foodModel.find({});
        res.status(200).json({ success: true, data: foods });
    } catch (error) {
        console.log("Error fetching food list:", error);
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};


const removeFoodItem = async (req, res) => {
    try {
        // 根据 id 查找食物项目
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        
        // 删除数据库中的食物项目
        await foodModel.findByIdAndDelete(req.body.id);
        
        try {
            // 删除与该食物项目相关的图片文件
            await fs.unlink(`uploads/${food.image}`);
            res.status(200).json({ success: true, message: "Food and image removed" });
        } catch (fileError) {
            // 如果图片删除失败，只返回警告，并不会影响食物项目的删除
            console.error(`Error deleting image file: ${fileError}`);
            res.status(200).json({ success: true, message: "Food removed, but failed to delete image" });
        }
        
    } catch (error) {
        console.error(`Error removing food item: ${error}`);
        res.status(500).json({ success: false, message: "Error processing request" });
    }
};

export {addFoodItem,listOfFood,removeFoodItem}
