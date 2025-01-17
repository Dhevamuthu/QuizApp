const Category = require("../models/CategoryModel");

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (err) {
        console.log(err);
        res.status(500).send({ error: 'Failed to fetch categories' });
    }
};
