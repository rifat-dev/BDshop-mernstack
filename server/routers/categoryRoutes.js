const router = require("express").Router();

const {
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryRouteController");
const { isAdmin, isAuthintecated } = require("../midlewares/authMidleware");

router.post("/create", isAuthintecated, isAdmin("admin"), createCategory);
router.get("/all", getAllCategory);

module.exports = router;
