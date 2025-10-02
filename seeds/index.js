const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedhelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connectidb.campgrounds.find()on error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '68d943cd19c3e11c4efed88e',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Beautiful campsite near the water",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dopm2bunl/image/upload/v1759228662/YelpCamp/xl17yazshenxs0ffzcpn.jpg',
                    filename: 'YelpCamp/xl17yazshenxs0ffzcpn',
                },
                {
                    url: 'https://res.cloudinary.com/dopm2bunl/image/upload/v1759228662/YelpCamp/b1sfrwqon4dqfnbsgzjb.jpg',
                    filename: 'YelpCamp/b1sfrwqon4dqfnbsgzjb',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});