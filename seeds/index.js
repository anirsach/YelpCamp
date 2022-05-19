const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const ente = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 100; i++) {
        const random = Math.floor(Math.random() * 1000);
        const random1 = Math.floor(Math.random() * 100);
        const n = new Campground({
            city: `${cities[random].city}`,
            location: `${cities[random].longitude}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. At asperiores iure reprehenderit, necessitatibus nobis ex dolore temporibus nihil sint assumenda qui iusto voluptate provident impedit rerum hic obcaecati a sit.',
            price: random1
        })


        await n.save()
    }
}

ente();