//use express
const express = require('express');
const router = express();

const Orders = require("../DataLayer/Orders");
const Order = new Orders;

const cors = require('cors');



router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

router.use(cors());


router.use((err, req, res, next) => {
    // This check makes sure this is a JSON issue.
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        let err = { "code": 400, "msg": "Invalid JSON" }
        return res.status(err.code).json(err); // Bad request
    }
    next();
});


//Here I would like to extract the endpoints and put them in another file called endpoints.js and where i import the router with all the config.

router.get("/api/orders", (req, res)=>{
    Order.getOrders(res);
});
//Get all products 
router.get("/api/products", (req, res)=>{
    Order.getProducts(res);
});
//Get all products by order
router.get("/api/products/order/:id", (req, res)=>{
    Order.getProductsByOrderId(req, res);
});
//get all from one order.
router.get("/api/order/:id", (req, res)=>{
    Order.getOrderById(req, res);
});

//get all orders by status and country
router.get("/api/orders/:status/:country", (req, res)=>{
    Order.getOrderByStatusAndCountry(req, res);
});

//get all orders by status name
router.get("/api/orders/status/:name", (req, res)=>{
    Order.getOrderByStatusName(req, res);
});
//get all orders by country
router.get("/api/orders/country/:name", (req, res)=>{
    Order.getOrderByCountryName(req, res);
});

//get all status
router.get("/api/status", (req, res)=>{
    Order.getAllStatus(res);
});

//get all countries
router.get("/api/countries", (req, res)=>{
    Order.getAllCountries(res);
});

/*
router.post('/api/note/post', (req, res) => {
    Notes.postNote(req, res);
});
  
router.post('/api/note/delete', (req, res) => {
    Notes.deleteNote(req, res);
});

router.post('/api/note/update', (req, res) => {
    Notes.updateNote(req, res);
});
*/

//declare the port we gonna use
const port = process.env.PORT;

//Then listen to the port. and console log the port which the router listen.
router.listen(port, () => console.log("Listening on port: " + port));


// module.exports = router;