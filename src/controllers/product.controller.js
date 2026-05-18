import { productSchema } from "../validation/schema/product.schema.js";
import { ProductModel } from "../models/productSchema.model.js";
import {uploadfilecloudinary, cloudinary } from "../services/cloudinary.js";

export const createProduct = async (req, res)=>{

    try{

        const validationProduct = productSchema.safeParse(req.body);
        // validation error
        if(!validationProduct.success){
            return res.status(400)
            .json({error: validationProduct.error.issues.map((err)=> err.message).join(", ")}); 
        }
        const {name, quantity, price, description, category, status, rating, reviews} = validationProduct.data;
            // check file here or not
        if(!req.file){
                return res.status(400).json({error: "Product image is required"});
            }
        // upload image to cloudinary
        const result= await uploadfilecloudinary(req.file);
        const image= result.url;
        const sellerId= req.user.id;
        const imagePublicId= result.imagePublicId;


        // create product
        const newproduct = await ProductModel.create({
            name,
            quantity,
            price,
            description,
            category,
            image,
            sellerId,
            status,
            rating,
            reviews,
            imagePublicId
        })

        res.status(201).json({message: "Product created successfully", product: newproduct});

    } catch(error){
        res.status(500).json({error: "internal server error"});
    }
}

// delete prouduct

export const deleteProduct =async (req, res)=>{
    try { 
        const id= req.params.id;
        //console.log(id);
        const product = await ProductModel.findById(id);
        //console.log(product);
        if(!product){
            return res.status(404).json({error: "Product not found"});
        }
        // deelte product from clodudaniar
        if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
        }

        //delete product;
        await ProductModel.findByIdAndDelete(id);
        //for my testing (delete korte hbe pore)
        //console.log("delete product controller");
        return res.status(200).json({message: "Product deleted successfully"});

    }catch(error){
        return res.status(500).json({error: "internal server error"});
    }
}

// edit prouct 

export const updateProduct= async (req, res)=>{
    try{
        const id= req.params.id;
        const product= await ProductModel.findById(id);
        if(!product){
            return res.status(404).json({error: "Product not found"});
        }
         const {name, quantity, price, description, category, status, rating, reviews} = req.body;

         // image if change
         let imagechange= false;
         let image= product.image;
         if(req.file){
            await cloudinary.uploader.destroy(product.imagePublicId);
            const result= await uploadfilecloudinary(req.file);
           image= result.url;
           var imagePublicId=result.imagePublicId;
            imagechange= true;
         }
         const updatproducts= {
            ...(name!==undefined && {name}),
            ...(quantity!==undefined && {quantity}),
            ...(price!==undefined && {price}),
            ...(description!==undefined && {description}),
            ...(category!==undefined && {category}),
            ...(rating!==undefined && {rating}),
            ...(reviews!==undefined && {reviews}),
            ...(imagechange===true && {image}),
            ...(status !== undefined && { status }),
            ...(imagechange===true && {imagePublicId}),

         }
         const update= await ProductModel.findByIdAndUpdate(
            id,
            updatproducts, 
            {new: true, runValidators: true}
         )

        res.status(200).json({ message: "update successfully"});  

    } catch (err){
        res.status(500).json({ error: "internal server problem" });
    }
}

