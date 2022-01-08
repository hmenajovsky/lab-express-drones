const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require("../models/Drone.model");

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  Drone.find()
    .then((dbResponse) => {
      res.render("drones/list.hbs", {
      drones : dbResponse
    });
})
.catch((e) => console.error(e));
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs");
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  try {   
 
    await Drone.create(req.body);
      res.redirect("/drones")
    } catch(err) {
      res.render("drones/create")
      next(err);
    }
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  Drone
  .findById(req.params.id)
  .then((dbResponse) =>
    res.render("drones/update-form.hbs", {droneToEdit: dbResponse })
  )
  .catch(next);
 
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  try {
    await Drone.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/drones");
  } catch (err) {
    res.render("drones/update-form.hbs");
    next(err);
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.redirect("/drones");
  } catch (err) {
    res.render("drones");
    next(err);
  }

});

module.exports = router;
