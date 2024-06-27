const fs = require("fs");
// const PRODUCTS = require("../data/products.json");
const Product = require("../models/products.model");

function makeCriteria(query){
    const criteria = {}

    if(query.name !== undefined && query.name.trim() !== ""){
        criteria.name = { $regex: query.name, $options: "i" }
    }

    if(query.minPrice !== undefined && query.minPrice !== "") {
        if(criteria.price === undefined){
            criteria.price = {}
        }
        criteria.price.$gte = parseInt(query.minPrice)
    }

    if(query.maxPrice !== undefined && query.maxPrice !=="") {
        if(criteria.price === undefined){
            criteria.price = {}
        }
        criteria.price.$lte = parseInt(query.maxPrice)
    }

    if(query.inStock !== undefined){
        criteria.quantity = {$gte: 1}
    }

    if (query.categories !== undefined && query.categories.trim() !== "") {
        const categoryRegex = new RegExp(query.categories.trim(), 'i');
        criteria.categories = { $regex: categoryRegex };
    }
    return criteria
}

// function getProducts(req, res) {
//   res.status(200).json(PRODUCTS);
// }

async function getProducts(req, res){
    const {query} = req;
    const criteria = makeCriteria(query)
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;

  try {
        const totalProducts = await Product.countDocuments(criteria);
        const totalPages = Math.ceil(totalProducts / limit);
        const products = await Product.find(criteria)
            .skip((page - 1) * limit)
            .limit(limit);
      
        res.json({
            products,
            pagination: {
                totalProducts,
                totalPages,
                currentPage: page
            }
        });
        
  } catch (err) {
    console.log("products.controller, getProducts. Error while getting products", err);
    res.status(500).json({ message: err.message });
  }
}

// function getProductById(req, res) {
//   const { id } = req.params;

//   const product = PRODUCTS.find((product) => {
//     return product._id === id;
//   });

//   if (!product) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   res.status(200).json(product);
// }

async function getProductById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      res.json(product);
    } catch (err) {
      if (err.name === "CastError") {
        console.log(
          `product.controller, getProductById. product not found with id: ${id}`
        );
        return res.status(404).json({ message: "Product not found" });
      }
      console.log(
        `product.controller, getProductById. Error while getting product with id: ${id}`,
        err.name
      );
      res.status(500).json({ message: err.message });
    }
}

// function deleteProduct(req, res) {
//   const { id } = req.params;

//   const products = [...PRODUCTS];
//   const productIndex = products.findIndex((product) => {
//     return product._id === id;
//   });

//   if (productIndex === -1) {
//     return res.status(404).json({ message: "Product not found" });
//   }

//   products.splice(productIndex, 1);

//   fs.writeFileSync("./data/products.json", JSON.stringify(products));
//   res.status(200).json({ message: "Item deleted" });
// }

async function deleteProduct(req, res) {
    const { id } = req.params;
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        console.log(
          `product.controller, deletedProduct. Product not found with id: ${id}`
        );
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json({ message: "Product deleted" });
    } catch (err) {
      console.log(
        `product.controller, deletedProduct. Error while deleting product with id: ${id}`
      );
      res.status(500).json({ message: err.message });
    }
}

// function createProduct(req, res){
//   const products = [...PRODUCTS];
//   const data = req.body
  
//   products.push(data)
//   fs.writeFileSync("./data/products.json", JSON.stringify(products));

//   return res.status(200).json({ message: `Item added: ${data} ` });
// }

async function createProduct(req, res){
    const productToAdd = req.body;
    const newProduct = new Product(productToAdd);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(201).json(savedProduct);
    } catch (err) {
      console.log(
        "product.controller, createProduct. Error while creating product",
        err
      );
  
      if (err.name === "ValidationError") {
        // Mongoose validation error
        console.log(`product.controller, createProduct. ${err.message}`);
        res.status(400).json({ message: err.message });
      } else {
        // Other types of errors
        console.log(`product.controller, createProduct. ${err.message}`);
        res.status(500).json({ message: "Server error while creating product" });
      }
    }
}

// function editProduct(req, res){
//     const { id } = req.params;
//     let products = [...PRODUCTS];


//     const product = products.find((product) => {
//         return product._id === id;
//     });

//     const newProduct = {...product, ...req.body}
    
//     products = products.map((product) => {
//         if(product._id === id){
//             return newProduct
//         }
//         return product
//     })

//    fs.writeFileSync("./data/products.json", JSON.stringify(products));

//     return res.status(200).json({ newProduct});
// }

async function editProduct(req, res){
  const { id } = req.params;
  const { name, price, quantity, categories } = req.body;

  console.log(categories);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, price, quantity, categories },
      { new: true, runValidators: true } // validate before updating
    );

    if (!updatedProduct) {
      console.log(
        `product.controller, updateProduct. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(updatedProduct);
  } catch (err) {
    console.log(
      `product.controller, updateProduct. Error while updating product with id: ${id}`,
      err
    );

    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`product.controller, updateProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`product.controller, updateProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while updating product" });
    }
  }
}

async function getProductsCount(req, res) {
    const name = req.query.name || "";
    try {
      const count = await PRODUCT.countDocuments({
        name: { $regex: name, $options: "i" }, // "i" for case-insensitive
      });
      res.json({ count });
    } catch (err) {
      console.log(
        "product.controller, getProductsCount. Error while getting products count",
        err
      );
      res.status(500).json({ message: err.message });
    }
}

module.exports = {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  editProduct,
};