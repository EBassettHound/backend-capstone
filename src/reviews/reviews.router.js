const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../utils/methodNotAllowed");

router
  .route("/:reviewId")
  .put(controller.update)
  .delete(controller.delete)
  .all(methodNotAllowed);

module.exports = router;