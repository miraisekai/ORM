const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  let categories;
  try {
    categories = await Category.findAll({
      include: [Product],
    });
  } catch (err) {
    res.status(500).json(err);
  }

  res.status(200).json(categories);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  let categories;
  try {
    categories = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product],
    });
  } catch (err) {
    res.status(500).json(err);
  }

  res.json(categories);
});

router.post("/", (req, res) => {
  // create a new category
  let category;
  try {
    category = Category.create(req.body);
  } catch (err) {
    res.status(500).json(err);
  }

  res.json(category);
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  let category;
  try {
    category = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }

  res.json(category);
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  let categories;
  try {
    categories = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }

  res.json(categories);
});

module.exports = router;
