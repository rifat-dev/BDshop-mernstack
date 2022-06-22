const router = require("express").Router();

const {
  newProduct,
  getAdminProducts,
  adminGetUsers,
  adminGetSingleUser,
  adminGetAllOrders,
  adminGetSingleOrder,
  updateAdminProduct,
  deleteAdminProduct,
  updateAdminOrder,
  createCoupon,
  getAllCoupons,
} = require("../controllers/adminRouteController");

const { isAdmin, isAuthintecated } = require("../midlewares/authMidleware");

// admin products routes
router.get("/products", isAuthintecated, isAdmin("admin"), getAdminProducts);
router.post("/products/new", isAuthintecated, isAdmin("admin"), newProduct);
router.put(
  "/products/:productId",
  isAuthintecated,
  isAdmin("admin"),
  updateAdminProduct
);
router.delete(
  "/products/:productId",
  isAuthintecated,
  isAdmin("admin"),
  deleteAdminProduct
);

// admin user routes
router.get("/users", isAuthintecated, isAdmin("admin"), adminGetUsers);
router.get("/users/:id", isAuthintecated, isAdmin("admin"), adminGetSingleUser);

// admin products routes
router.get("/orders", isAuthintecated, isAdmin("admin"), adminGetAllOrders);
router.put(
  "/orders/:orderId",
  isAuthintecated,
  isAdmin("admin"),
  updateAdminOrder
);

// admin coupon
router.get("/coupon/getAll", isAuthintecated, isAdmin("admin"), getAllCoupons);
router.post("/coupon/create", isAuthintecated, isAdmin("admin"), createCoupon);
module.exports = router;
