const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  user: { type: String, required: true },
  hotel: { type: String, ref: 'hotels', required: true },
  room: [{ type: Number, required: true }],
  dateStart: { type: Date, required: true },
  dateEnd: { type: Date, required: true },
  price: { type: Number, required: true },
  payment: { type: String, required: true, enum: ['Credit Card', 'Cash'] },
  status: { type: String, required: true, enum: ['Booked', 'Checkin', 'Checkout'], default: 'Booked' },
}, { timestamps: true });

module.exports  = mongoose.model('transaction', TransactionSchema);
