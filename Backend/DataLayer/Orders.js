//IMPORT DB CONNECTION
const db = require("./DBconnection");


class Orders {
    constructor() {

    }

    //CREATE THE FUNCTIONS

    //Send the response and report the error. This prevent crashing the api server if something went wrong.
    queryResult(err, result, res) {
        const answer = {
            data: null,
            status: 200,
            error: null,
        }
        if (err) {
            res.status(400).json(err);
            return;
        }
        answer.data = result;
        res.status(200).json(answer);
    }

    //Get all orders with all his products.
    getProducts(res) {
        const query = "SELECT orders.id_order as 'id_order', order_detail.product_name as product from orders inner join order_detail on order_detail.id_order=orders.id_order"
        db.query(
            query, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    //SELECT order_detail.product_name as product from orders inner join order_detail on order_detail.id_order=orders.id_order where orders.id_order = 3
    getProductsByOrderId(req, res) {
        const query = `SELECT order_detail.product_name as product from orders inner join order_detail on order_detail.id_order=orders.id_order where orders.id_order = ${req.params.id}`;
        db.query(
            query, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    //Get one order with all data (id, reference, date, name, surname, address1, address2, country, productos, state)
    getOrderById(req, res) {
        const query = `SELECT orders.id_order as 'id_order', reference, DATE_FORMAT(date_add, '%d/%m/%Y' ) date_add, customer.firstname, customer.lastname, address.address1, address.address2, address.city, country_lang.name as country, order_state_lang.name as 'current_state' from orders INNER JOIN customer on orders.id_customer=customer.id_customer INNER join address on orders.id_address_delivery=address.id_address LEFT join country_lang on address.id_country=country_lang.id_country inner join order_state_lang on orders.current_state=order_state_lang.id_order_state where orders.id_order = ${req.params.id}`;
        db.query(
            query, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    //Get all orders WHERE STATUS AND COUNTRY
    getOrders(req, res) {
        if (req.params.status == "none") {
            req.params.status = '%';
        }
        if (req.params.country == "none") {
            req.params.country = '%';
        }
        const query = `SELECT orders.id_order as 'id_order', reference, DATE_FORMAT(date_add, '%d/%m/%Y' ) date_add, customer.firstname, customer.lastname, address.address1, address.address2, address.city, country_lang.name as country, order_state_lang.name as 'current_state' from orders INNER JOIN customer on orders.id_customer=customer.id_customer INNER join address on orders.id_address_delivery=address.id_address LEFT join country_lang on address.id_country=country_lang.id_country inner join order_state_lang on orders.current_state=order_state_lang.id_order_state where order_state_lang.name like '${req.params.status}' and country_lang.name like '${req.params.country}'`;
        db.query(
            query, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }


    //Get all STATUS
    getAllStatus(res) {
        const query = `SELECT * FROM order_state_lang`;
        db.query(
            query, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    //Get all COUNTRIES
    getAllCountries(res) {
        const query = `SELECT * FROM country_lang`;
        db.query(
            query, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    //CREATE NEW ORDER
    //insert into .... 


    //UPDATE ORDER


}

module.exports = Orders;

