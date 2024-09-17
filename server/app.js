const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const mongoose = require('mongoose')

const app = express();

const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')
const hotelRouter =  require('./routes/hotels')
app.use(cors())
// Cấu hình body-parser
// Phân tích application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyparser())

// Cấu hình Express để phục vụ các file ảnh tĩnh từ thư mục 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API để lấy danh sách ảnh (tên file)


app.use('/user', userRouter);

app.use('/hotels', hotelRouter)
app.use('/admin', adminRouter)




mongoose.connect('mongodb+srv://minhhai:2452001hai@cluster0.xbww7.mongodb.net/booking').then(a => {
    app.listen(5000, () => {
        console.log('Run server!')
    })
}).catch(err => {
    console.log(err)
});