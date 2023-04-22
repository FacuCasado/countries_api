const { Router } = require('express');
const postActivities = require('../controllers/PostActivities')
const getActivities = require('../controllers/getActivities')
const deleteActivities = require('../controllers/deleteActivities');
const getActivityByName = require('../controllers/getActivityByName');
const router=Router();

router.post("/", postActivities);
router.get("/", getActivities);
router.get("/:name", getActivityByName);
router.delete("/:id", deleteActivities);

module.exports=router;