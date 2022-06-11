const router = require("express").Router();

const {
  getProducts,
  getSingleProduct,
  getFeaturedProducts,
  createProductReview,
} = require("../controllers/productRouteController");

const { isAuthintecated } = require("../midlewares/authMidleware");

router.get("/", getProducts);
router.get("/featuredProducts", getFeaturedProducts);
router.get("/:id", getSingleProduct);
router.post("/create-review/:productId", isAuthintecated, createProductReview);

module.exports = router;
