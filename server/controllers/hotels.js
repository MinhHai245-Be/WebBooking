const Hotel = require("../models/hotels");
const Room = require("../models/rooms");
const Transaction = require("../models/transaction");

exports.getHomePage = (req, res, next) => {
  const imageFiles = {
    "Da Nang": "DaNang.jpg",
    "Ha Noi": "HaNoi.jpg",
    "Ho Chi Minh": "HCM.jpg",
  };
  const cities = ["Ha Noi", "Ho Chi Minh", "Da Nang"];
  Hotel.aggregate([
    {
      $group: {
        _id: "$city", // Nhóm theo trường city
        count: { $sum: 1 }, // Tính tổng số lượng khách sạn trong từng thành phố
      },
    },
    {
      $sort: { count: -1 }, // Sắp xếp kết quả theo số lượng (tuỳ chọn)
    },
  ])
    .then((result) => {
      // Thiet lap obj ten thanh pho va so luong khach san trong thanh pho
      const resultMap = result.reduce((map, item) => {
        map[item._id] = item.count;
        return map;
      }, {});

      const finalResult = cities.map((city) => {
        return {
          city: city,
          count: resultMap[city] || 0,
          image: imageFiles[city],
        };
      });
      // Xử lý kết quả ở đây, ví dụ gửi phản hồi cho client
      res.status(200).json(finalResult);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

exports.getHotelType = (req, res, next) => {
  const hoteltype = ["hotel", "apartment", "resort", "villa", "cabin"];

  Hotel.aggregate([
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 }, // Tinh tong theo loai khach san
      },
    },
    {
      $sort: { count: -1 },
    },
  ])
    .then((types) => {
      const typeresult = types.reduce((map, item) => {
        map[item._id] = item.count;
        return map;
      }, {});
      const mapResult = hoteltype.map((type) => {
        return {
          type: type,
          count: typeresult[type] || 0,
        };
      });
      res.status(200).json(mapResult);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getRatingHotel = (req, res, next) => {
  Hotel.find()
    .sort({ rating: -1 })
    .limit(3)
    .then((top) => {
      res.status(200).json(top);
    })
    .catch((err) => {
      res.status(500).json({ massange: err });
    });
};

exports.postSearch = async (req, res) => {
  try {
    const { destination, date, options } = req.body;
    //Tìm kiếm các khách sạn theo thành phố
    const hotels = await Hotel.find({ $text: { $search: destination } });
    // Duyệt qua từng khách sạn và kiểm tra điều kiện phòng trống
    const availableHotels = [];

    for (const hotel of hotels) {
      const availableRooms = [];
      let totalAvailableRooms = 0;
      // Tìm tất cả các loại phòng của khách sạn
      const rooms = await Room.find({ _id: { $in: hotel.rooms } });

      for (const room of rooms) {
        for (const roomNumber of room.roomNumbers) {
          // Kiểm tra xem phòng này đã được đặt trong khoảng thời gian yêu cầu chưa
          const isBooked = await Transaction.findOne({
            hotel: hotel.name,
            room: { $in: roomNumber },
            $and: [
              { dateStart: { $lte: new Date(date[0].endDate) } },
              { dateEnd: { $gte: new Date(date[0].startDate) } },
            ],
          });
          if (!isBooked) {
            availableRooms.push(room);
            totalAvailableRooms++;
          }
        }
      }

      // Nếu có đủ số phòng mong muốn thì thêm khách sạn vào danh sách kết quả
      if (totalAvailableRooms >= options.room) {
        availableHotels.push(hotel);
      }
    }
    // Trả về danh sách khách sạn thỏa mãn điều kiện
    res.status(200).json(availableHotels);
  } catch (error) {
    res.status(500).json({ message: "Có lỗi xảy ra!", error: error.message });
  }
};

exports.postHotelInfor = (req, res) => {
  const { id } = req.body;
  Hotel.findById(id).then((hotel) => {
    res.status(200).json(hotel);
  });
};

exports.postBooking = async (req, res) => {
  const { id, date } = req.body;
  // Lay id room cua hotel
  const roomshotel = await Hotel.findById(id).select("name rooms");
  let rooms = [];
  //Loc cac phong con trong
  for (const idroom of roomshotel.rooms) {
    let roominfo = await Room.findById(idroom);
    for (let i = 0; i <= roominfo.roomNumbers.length; i++) {
      isroom = await Transaction.findOne({
        hotel: roomshotel.name,
        room: { $in: roominfo.roomNumbers[i] },
        $and: [
          { dateStart: { $lte: new Date(date[0].endDate) } },
          { dateEnd: { $gte: new Date(date[0].startDate) } },
        ],
      });
      if (isroom) {
        roominfo.roomNumbers[i] = null;
      }
    }
    const room = roominfo.roomNumbers.filter((item) => item !== null);
    roominfo.roomNumbers = room;
    if (room.length > 0) {
      rooms.push(roominfo);
    }
  }
  res.status(200).json(rooms);
};

exports.postTransaction = async (req, res) => {
  try {
    const { username, idhotel, fullname, email, cardnumber, date } =
      req.body.data;
    const { card, price, roomsinfo } = req.body;
    const transaction = new Transaction({
      user: username,
      hotel: idhotel,
      room: roomsinfo,
      dateStart: new Date(date[0].startDate),
      dateEnd: new Date(date[0].endDate),
      price: price,
      payment: card,
    });
    const isSave = await transaction.save();
    if (isSave) {
      res.status(200).json({ isSaveTran: true });
    }
  } catch (error) {
    res.status(500).json({ massange: err });
  }
};

exports.getTranofUser = (req, res) => {
  const { user } = req.params;
  Transaction.find({ user: user })
    .then((tran) => {
      res.status(200).json(tran);
    })
    .catch((err) => {
      res.status(500).json({ massage: err });
    });
};
