const express = require("express");
const hotelsControllers = require("../controllers/hotels");
const router = express.Router();

router.get("/homepage", hotelsControllers.getHomePage);

router.get("/hoteltype", hotelsControllers.getHotelType);

router.get("/ratinghotel", hotelsControllers.getRatingHotel);

router.post("/search", hotelsControllers.postSearch);

router.post("/hotelinformation", hotelsControllers.postHotelInfor);

router.post("/booking", hotelsControllers.postBooking);

router.post("/transaction", hotelsControllers.postTransaction);

router.get("/transaction/:user", hotelsControllers.getTranofUser);

module.exports = router;
