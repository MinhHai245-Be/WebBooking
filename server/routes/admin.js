const express = require("express");

const adminControllers = require('../controllers/admin')
const router = express.Router();

router.get("/", adminControllers.homePageAdmin);

router.get("/hotels", adminControllers.getHotels);
router.post("/deletehotel", adminControllers.postDeleteHotel);
router.post("/newhotel", adminControllers.postNewHotel);

router.get("/rooms/:page", adminControllers.getRooms);
router.post("/deleteroom", adminControllers.postDeleteRoom);
router.get('/newroom', adminControllers.getNewRoom)
router.post('/newroom',  adminControllers.postNewRoom);


router.get('/transactions/:page', adminControllers.getTransactionsPage);
router.get('/infohotelupdated/:id', adminControllers.getInforHotelUpdated);

router.post('/updatedhotel/:id', adminControllers.getUpdatedHotel);


router.get('/inforoom/:id', adminControllers.getInforroom)

router.post('/inforoom/:id', adminControllers.postInforoom)
module.exports = router;
