import foodModel from "../models/foodModel.js"
import fs from "fs"

//add food items
const addFoodItem=async(req,res)=>{
    let image_filename = `${req.file.filename}`
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category:req.body.category,
        image: image_filename,
    })
    try {
        // Save to database
        await food.save();
        res.status(200).json({ success: true, message: "Food has been added" });
    } catch (error) {
        // Detailed recording error
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
        // Find food items by id
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }
        // Delete food items from the database
        await foodModel.findByIdAndDelete(req.body.id);
        try {
            // Delete image files associated with this food item
            await fs.unlink(`uploads/${food.image}`);
            res.status(200).json({ success: true, message: "Food and image removed" });
        } catch (fileError) {
            // If the image deletion fails, only a warning is returned and the deletion of food items is not affected
            console.error(`Error deleting image file: ${fileError}`);
            res.status(200).json({ success: true, message: "Food removed, but failed to delete image" });
        }
    } catch (error) {
        console.error(`Error removing food item: ${error}`);
        res.status(500).json({ success: false, message: "Error processing request" });
    }
};

export {addFoodItem,listOfFood,removeFoodItem}
