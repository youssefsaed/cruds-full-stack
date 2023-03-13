import { Router } from "express";
import * as product_Controller from './product.controller.js'

const router=Router()


router.post('/AddProduct',product_Controller.AddProduct)
router.get('/GetAllProduct',product_Controller.GetAllProduct)
router.put('/UpdateProduct/:Pid',product_Controller.UpdateProduct)
router.delete('/DeleteProduct/:Pid',product_Controller.DeleteProduct)
router.get('/SearchTitleProduct/:character',product_Controller.SearchTitleProduct)
router.get('/SearchCategoryProduct/:character',product_Controller.SearchCategoryProduct)
router.delete('/DeleteAllProduct',product_Controller.DeleteAllProduct)







export default router