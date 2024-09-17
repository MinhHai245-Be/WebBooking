const Hotel = require("../models/hotels");
const Room = require("../models/rooms");
const Transaction = require("../models/transaction");
const User = require("../models/user");

exports.homePageAdmin = async (req, res, next) => {
  try {
    const recentTransaction = await Transaction.find()
      .sort({ dateStart: -1 })
      .limit(8);
    const userCount = await User.countDocuments();
    const transactionCount = await Transaction.countDocuments();
    const totalRevenue = await Transaction.aggregate([
      { $group: { _id: null, total: { $sum: "$price" } } },
    ]);
    const avgmonthRevenue = await Transaction.aggregate([
      {
        $group: {
          _id: {
            month: { $month: "$startDate" },
            year: { $year: "$startDate" },
          },
          monthTotal: { $sum: "$price" },
        },
      },
      { $group: { _id: null, avg: { $avg: "$monthTotal" } } },
    ]);
    res.status(200).json({
      recentTransaction,
      userCount,
      transactionCount,
      totalRevenue,
      avgmonthRevenue,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHotels = (req, res, next) => {
  Hotel.find()
    .then((hotels) => {
      res.status(201).json(hotels);
    })
    .catch((err) => {
      res.status(500).json({ message: err });
    });
};

exports.postDeleteHotel = async (req, res, next) => {
  try {
    const { id } = req.body;
    const hotel = await Hotel.findById(id);

    const isDeleteHotel = Hotel.deleteOne({ _id: id });
    if (isDeleteHotel) {
      isDeleteRooms = await Room.deleteMany({ _id: { $in: hotel.rooms } });
      if (isDeleteRooms) {
        res.json({ idDeleteHotel: true });
      } else {
        res.json({ idDeleteHotel: false });
      }
    }
  } catch (error) {
    res.status(500).json({ massage: err });
  }
};

exports.postNewHotel = async (req, res, next) => {
  try {
    const {
      name,
      city,
      type,
      distance,
      description,
      images,
      address,
      title,
      price,
      featured,
      rooms,
    } = req.body;
    const idrooms = [];
    for (const room of rooms) {
      if (room == "2 Bed Room" || room == "Basedment Double Room") {
        const newRoomHotel = new Room({
          desc: description,
          maxPeople: 2,
          price: price,
          roomNumbers: [101, 102],
          title: room,
        });
        newRoomHotel.save();
        idrooms.push(newRoomHotel._id.toString());
      } else {
        const newRoomHotel = new Room({
          desc: description,
          maxPeople: 2,
          price: price,
          roomNumbers: [101],
          title: room,
        });
        newRoomHotel.save();
        idrooms.push(newRoomHotel._id);
      }
    }
    const newhotel = new Hotel({
      address: address,
      cheapestPrice: price,
      city: city,
      desc: description,
      distances: distance,
      featured: featured,
      name: name,
      photos: images,
      rooms: idrooms,
      title: title,
      type: type,
      rating: 0,
    });
    const isNewHotel = await newhotel.save();

    if (isNewHotel) {
      res.status(200).json({ isNew: true });
    }
  } catch (error) {
    res.status(500).json({ massage: err });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const { page } = req.params;
    // Lay danh sach trang va phan trang
    const skip = (page - 1) * 9;
    const rooms = await Room.find().skip(skip).limit(9);

    // Lay tong so room
    const countRoom = await Room.countDocuments();
    const totalPages = Math.ceil(countRoom / 9);

    res.status(200).json({ rooms, totalPages });
  } catch (error) {
    res.status(500).json({ massage: err });
  }
};

exports.postDeleteRoom = async (req, res, next) => {
  try {
    const { id } = req.body;
    const roomDelete = await Room.deleteOne({ _id: id });
    if (roomDelete) {
      const roomHotelDelete = await Hotel.updateMany({ $pull: { rooms: id } });
      if (roomHotelDelete) {
        res.status(200).json({ idDeleteRoom: true });
      } else {
        res.status(200).json({ isDeleteRoom: false });
      }
    }
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};
exports.getNewRoom = async (req, res) => {
  try {
    const namehotel = await Hotel.find().select("name");
    res.status(200).json(namehotel);
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};

exports.postNewRoom = async (req, res) => {
  try {
    const { title, price, description, maxpeoples, rooms, nameHotel } =
      req.body;
    const newroom = new Room({
      desc: description,
      maxPeople: maxpeoples,
      price: price,
      roomNumbers: rooms,
      title: title,
    });
    const isNewroom = await newroom.save();
    if (isNewroom) {
      const updateRoomsHotel = await Hotel.findOneAndUpdate(
        { name: nameHotel },
        { $push: { rooms: newroom._id.toString() } },
        { new: true }
      );
      if (updateRoomsHotel) {
        res.json({ isNewRooms: true });
      } else {
        res.json({ isNewRooms: false });
      }
    }
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};

exports.getTransactionsPage = async (req, res) => {
  try {
    const { page } = req.params;
    const skip = (page - 1) * 9;
    const countTransactions = await Transaction.countDocuments();
    const totalPage = Math.ceil(countTransactions / 9);
    const transactions = await Transaction.find().skip(skip).limit(9);
    res.status(200).json({ transactions, totalPage });
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};

exports.getInforHotelUpdated = async (req, res) => {
  try {
    const { id } = req.params;
    const hotel = await Hotel.findById(id);
    res.status(200).json(hotel);
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};

exports.getUpdatedHotel = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      city,
      type,
      distance,
      description,
      images,
      address,
      title,
      price,
      featured,
      rooms,
    } = req.body;

    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      {
        address: address,
        cheapestPrice: price,
        city: city,
        desc: description,
        distances: distance,
        featured: featured,
        name: name,
        photos: images,
        title: title,
        type: type,
      },
      { new: true }
    );
    if (updatedHotel) {
      res.status(200).json({ isUpdatedHotel: true });
    }
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};

exports.getInforroom = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await Room.findById(id);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};

exports.postInforoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, price, description, maxpeoples, rooms, nameHotel } =
      req.body;
    const updatedroom = await Room.findByIdAndUpdate(
      id,
      {
        title,
        price,
        maxpeoples,
        description,
        rooms,
      },
      { new: true }
    );
    if (updatedroom) {
      res.status(200).json({ isUpdateroom: true });
    }
  } catch (error) {
    res.status(500).json({ massage: error });
  }
};
