import express from "express"
import {addFoodItem,listOfFood,removeFoodItem} from "../controllers/foodController.js"
import multer from "multer"

const foodRouter = express.Router();
const storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        return cb(null,`${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage})
foodRouter.post("/add",upload.single('image'),addFoodItem);
foodRouter.get("/list",listOfFood);
foodRouter.post("/remove",removeFoodItem);



export default foodRouter;