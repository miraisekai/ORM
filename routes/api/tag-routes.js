const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  let tags;
  try {
    tags = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
  } catch (err) {
    res.status(500).json(err);
  }

  res.status(200).json(tags);
});

router.get("/:id", async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  let tag;
  try {
    tag = await Tag.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ],
    });
  } catch (err) {
    res.status(500).json(err);
  }

  res.json(tag);
});

router.post("/", async (req, res) => {
  // create a new tag
  let tag;
  try {
    tag = Tag.create(req.body);
  } catch (err) {
    res.status(500).json(err);
  }

  res.json(tag);
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  let tag;
  try {
    tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }

  res.json(tag);
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  let tags;
  try {
    tags = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }

  res.json(tags);
});

module.exports = router;
