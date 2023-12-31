const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");
const reduceProperties = require("../utils/reduce-properties");

const reduceCritics = reduceProperties("review_id", {
  preferred_name: ["critic", null, "preferred_name"],
  surname: ["critic", null, "surname"],
  organization_name: ["critic", null, "organization_name"],
});

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  critic_critic_id: "critic.critic_id",
  critic_created_at: "critic.created_at",
  critic_updated_at: "critic.updated_at"
});

function read(reviewId) {
  return knex("reviews").select("*").where({ review_id: reviewId }).first();
}

function returnUpdate(review_id) {
  return knex("reviews as r")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.*")
    .where({ "r.review_id": review_id })
    .first()
    .then(addCritic);
}

function update(updatedReview) {
  return knex("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*");
}
function destroy(review) {
  return knex("reviews")
  .where({ review_id: review.review_id })
  .del();
}

module.exports = {
    reduceCritics,
    addCritic,
    update,
    delete: destroy,
    read,
    returnUpdate
  };