
import { cart } from "../models/cartSchema.model.js";
import { ProductModel } from "../models/productSchema.model.js";


export const AddCart= async (req,res)=>{
    const userId= req.user.id;
    const quantity= req.body.quantity;
    const productId= req.params.id;
    if(!quantity || quantity <= 0){
    return res.status(400).json({
        message: "Quantity must be greater than 0"
    })
}

    try {
        
        //find product

        const producthere= await ProductModel.findById(productId);
        if(!producthere) {
            return res.status(404).json({message: "this product not present"});
        }
        // if present
        let existingCart = await cart.findOne( {userId} );


        // if alredady exists 
        if(existingCart){
            // // check same product exit or. not
            const sameproduct= existingCart.products.find(x=>x.productId.toString()===productId);

            // if same product exists
            if(sameproduct){
                sameproduct.quantity+=quantity;
            }
 
            else{
                existingCart.products.push({
                productId,
                quantity
            })
            }

            existingCart.totalprice += producthere.price*quantity;

             await existingCart.save();

            return res.status(200).json({
                message: "Cart updated successfully",
                cart: existingCart
            });

        }

        const totalprice =producthere.price * quantity;

        //const products= {productId, quantity}
    
        // create cart 
        const newcart= await cart.create({
            userId,
            products: [ {productId, quantity}],
            totalprice
        })

        res.status(201).json({message: "create successuly"});


        
    } catch (error) {
        res.status(500).json({message: "internal server error"});
    }

}

export const removeCart= async (req,res)=> {
    const userId= req.user.id;
    const productId= req.params.id;

    try {
         // find product
        const ispresentProduct=  await ProductModel.findById(productId);


        if(!ispresentProduct) { return res.status(404).json({message: "this ithem not present"})}

        // find cart
        const existingCart = await cart.findOne({ userId });
        // if cart not present 
        if (!existingCart) {

            return res.status(404).json({
                message: "Cart is not present in user"
            });

        }
        // if cart present 
      // check product is presernt in user     
      const existingProduct = existingCart.products.find(

            item => item.productId.toString() === productId

        );

        // if not present 
        if (!existingProduct) {

            return res.status(404).json({
                message: "This product is not present in your cart"
            });

        }
        // quantity decrease
        if (existingProduct.quantity > 1) {

            existingProduct.quantity -= 1;
    
        }
        // delete product from cart 
        else{existingCart.products= existingCart.products.filter(x=>
            x.productId.toString()!==productId
        )}

        // total price is
        existingCart.totalprice -= ispresentProduct.price;

       
        // safety
        if (existingCart.totalprice < 0) {
            existingCart.totalprice = 0;
        }

        // if cart empty delete cart
        if (existingCart.products.length === 0) {

            await cart.findByIdAndDelete(existingCart._id);

            return res.status(200).json({
                message: "Cart deleted because no products left"
            });

        }

        //save cart

        await existingCart.save();

        return res.status(200).json({

            message: "Product removed successfully",

            cart: existingCart

        });


        
    } catch (error) {
        res.status(500).json({message: "internal server problem"});
        if(process.env.node_env==='devolopment')console.log(error);
    }

}

export const getCart= async (req,res)=>{
    const userId= req.user.id;

    try {
        const userCart= await cart.findOne({userId}).populate("products.productId");;

    
        if(!userCart){
            return res.status(404).json({message: "cart is empty"});
        }
    
        return res.status(200).json({message: "see your cart", products: userCart.products, totalprice: userCart.totalprice} );
    } catch (error) {
        res.status(500).json({message: "internal server problem"});
        if(process.env.node_env==='devolopment')console.log(error);
    }
    
}