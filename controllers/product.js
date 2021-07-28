const Product = require('../models/productModel');

module.exports.GetAllProducts = async (req, res)=> {
    const products = await Product.find({});
    res.json(products);
};


module.exports.AddProduct = async (req, res)=> {
    const {name, price, description, image, brand, category, countInStock, user} = req.body;

    const product = new Product({
        name : name, 
        price : price,
        description : description,
        brand : brand,
        category : category,
        countInStock : countInStock,
        image : image,
        user : user
    });

    const createdProduct = await product.save()
    res.status(201).json(createdProduct);
};

module.exports.UpdateProduct = async (req, res)=> {
    const {name, price, description, image, brand, category, countInStock} = req.body;

    const product = await Product.findById(req.params.id);

    if(product) {
        product.name = name // assign product new value destructured from req.body
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.status(201).json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found'});
    }
};

module.exports.DeleteProduct = async (req, res)=> {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.status(204).json({ message: 'Product deleted'});
    } else {
        res.status(404).json({ message: 'Product not found'});
    }
};

module.exports.GetProductByID = async (req, res)=> {
    const product = await Product.findById(req.params.id)
        if(product){
           res.status(201).json(product); 
        } else {
            res.status(404).json({ message: 'Product not found'})
        }; 
};
