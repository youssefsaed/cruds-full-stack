import { Op } from "sequelize";
import { productModel } from "../../../DB/models/product.model.js";


export const AddProduct = async (req, res) => {
    try {
        const { title, price, taxes, ads, discount,total, category } = req.body
        const product = await productModel.create({ title, price, taxes, ads, discount,total, category })
        return res.json({ message: "success", product })
    } catch (error) {
        res.json({ message: "CatchError", error })
    }
}

export const GetAllProduct = async (req, res) => {
    try {
        const products = await productModel.findAll()
        return res.json({ message: "success", products })
    } catch (error) {
        res.json({ message: "CatchError", error })
    }
}


export const UpdateProduct = async (req, res) => {
    try {
        const { title, price, taxes, ads, discount,total, category } = req.body
        const { Pid } = req.params
        const data = await productModel.update({ title, price, taxes, ads, discount,total, category }, { where: { Pid } })
        if (data[0] == 0) {
            return res.json({ message: "Invalid Id" })

        }
        return res.json({ message: "success" })
    } catch (error) {
        res.json({ message: "CatchError", error })
    }

}


export const DeleteProduct = async (req, res) => {
    try {
        const { Pid } = req.params
        const data = await productModel.destroy({ where: { Pid } })
        if (data == 0) {
            return res.json({ message: "Invalid Id" })

        }
        return res.json({ message: "success" })
    } catch (error) {
        res.json({ message: "CatchError", error })
    }

}

export const SearchTitleProduct = async (req, res) => {
    try {
        const { character } = req.params
        const products = await productModel.findAll({
            where: {
                title: {
                    [Op.like]: `${character}%`
                }
            }
        })
        return res.json({ message: "success", products })
    } catch (error) {
        console.log(error);
        res.json({ message: "CatchError", error })
    }

}


export const SearchCategoryProduct = async (req, res) => {
    try {
        const { character } = req.params
        const products = await productModel.findAll({
            where: {
                category: {
                    [Op.like]: `${character}%`
                }

            }
        })
        return res.json({ message: "success", products })
    } catch (error) {
        res.json({ message: "CatchError", error })
    }

}



export const DeleteAllProduct = async (req, res) => {
    try {
        const products = await productModel.destroy({ where: {}, truncate: true })
        return res.json({ message: "success" })
    } catch (error) {
        res.json({ message: "CatchError", error })
    }

}
