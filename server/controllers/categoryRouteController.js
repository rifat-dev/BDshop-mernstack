const Categories = require("../model/categoryModel");

exports.createCategory = async (req, res, next) => {
  try {
    console.log(req.body);
    const category = await Categories.create(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      category,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAllCategory = async (req, res, next) => {
  const categorys = await Categories.find({}).select("-description");
  // console.log(categorys);
  res.status(200).json({
    success: true,
    categorys,
  });
};

exports.updateCategory = async (req, res, next) => {};
exports.deleteCategory = async (req, res, next) => {};
