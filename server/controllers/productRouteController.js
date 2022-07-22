const Product = require("../model/productModel");
const Categories = require("../model/categoryModel");

// get all products -> '/api/products'
exports.getProducts = async (req, res, next) => {
  try {
    console.log(req.query);
    let filter = {};
    let searchTerm = req.query.searchTerm;
    let itemPerPage = parseInt(req.query.perPage);
    filter.category = req.query.ctg;
    let currentPage = parseInt(req.query.page);

    const products = await Product.find()
      .sort("createdAt")
      .skip(currentPage * itemPerPage - itemPerPage)
      .limit(itemPerPage);

    let totalProduct = await Product.countDocuments();
    let totalPage = totalProduct / itemPerPage;
    // console.log(products);
    // console.log(Math.round(totalPage));

    res.status(200).json({
      success: true,
      products,
      totalPage,
    });
  } catch (e) {
    next(e);
  }
};

// getSingleProducts -> '/api/products/:id'
exports.getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (e) {
    next(e);
  }
};

//get featuredProducts
exports.getFeaturedProducts = async (req, res, next) => {
  try {
    let categorys = await Categories.find({}).select("name");
    let results = [];
    for (let category of categorys) {
      let products = await Product.find({
        $and: [
          { category: category._id },
          { isFeatured: true },
          { isActive: true },
        ],
      }).select(
        "name price regularPrice images discount category  stock filter"
      );

      let data = {
        _id: category._id,
        name: category.name,
        products,
      };

      results.push(data);
    }

    // console.log(results);
    res.status(200).json({
      success: true,
      results,
    });
  } catch (e) {
    next(e);
  }
};

// createProductReview -> '/api/products/create-review/:productId
exports.createProductReview = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "No Product Found",
      });
    }

    const review = {
      user: req.user._id,
      image: req.user.avatar.url,
      name: req.user.name,
      ratings: Number(req.body.ratings),
      comments: req.body.comment,
    };

    const isReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((review) => {
        if (review.user.toString() === req.user._id.toString()) {
          review.comments = req.body.comment;
          review.ratings = Number(req.body.ratings);
        }
      });
      // product.numOfReviews = product.reviews.length
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    product.ratings =
      product.reviews.reduce((acc, item) => item.ratings + acc, 0) /
      product.reviews.length;
    await product.save();

    res.status(200).json({
      success: true,
      message: "review create success",
    });
  } catch (e) {
    next(e);
  }
};
