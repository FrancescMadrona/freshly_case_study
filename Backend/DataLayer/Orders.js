//IMPORT DB CONNECTION
const db = require("./DBconnection");


class Orders {
    constructor() {

    }

    //CREATE THE FUNCTIONS

    /*paramsCheck(req){
        let err = { "code": 500, "msg": "" };
        //console.log("i'm params check after letting error.")
        if (req.body) {

            console.log("i'm inside the if, so there are missing params")

            err['msg'] = "body is empty";
            res.status(500).json(err);
            return;
        }
        console.log("I passed the if !req.body, so body is defined.")
        console.log("ERROR??: ", err);
        return;

    }*/


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

    /*OLD VERSION
    //get all the notes.
    getNotes(res) {
        db.query(
            "select * from notebook", (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    getLastId(res) {
        db.query(
            "select id from notebook order by id desc limit 1", (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    //post a single note to database.
    postNote(req, res) {
        let err = { "code": 500, "msg": "" };
        if (!req.body) {
            err['msg'] = "body is empty";
            res.status(500).json(err);
            return;
        }
        //then check params
        if (req.body.id === undefined || req.body.title === undefined || req.body.description === undefined) {
            err["msg"] = "missing params"
            res.status(500).json(err);
            return;
        }
        const id = req.body.id
        const title = req.body.title;
        const description = req.body.description;
        db.query(
            `insert into notebook (id, title, description) values ("${id}", "${title}", "${description}")`, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    deleteNote(req, res){
        let err = { "code": 500, "msg": "" };
        if (!req.body) {
            err['msg'] = "body is empty";
            res.status(500).json(err);
            return;
        }
        //then check params
        if (req.body.id === undefined) {
            err["msg"] = "missing params"
            res.status(500).json(err);
            return;
        }
        const id = req.body.id;
        db.query(
            `delete from notebook where id=${id}`, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    updateNote(req, res){
        let err = { "code": 500, "msg": "" };
        if (!req.body) {
            err['msg'] = "body is empty";
            res.status(500).json(err);
            return;
        }
        //then check params
        if (req.body.id === undefined || req.body.title === undefined || req.body.description === undefined ) {
            err["msg"] = "missing params"
            res.status(500).json(err);
            return;
        }
        const id = req.body.id;
        const title = req.body.title;
        const description = req.body.description;
        db.query(
            `update notebook set title = "${title}", description = "${description}" where id=${id}`, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }
    */

    //HERE THE NEW FUNCTIONS!

    //Get all orders with all data (id, reference, date, name, surname, address1, address2, country, productos, state)
    //Big query with all data
    //SELECT orders.id_order as 'id_order', reference, date_add, customer.firstname, customer.lastname, address.address1, address.address2, address.city, country_lang.name as country, order_detail.product_name as product, order_state_lang.name as 'current_state' from orders INNER JOIN customer on orders.id_customer=customer.id_customer INNER join address on orders.id_address_delivery=address.id_address LEFT join country_lang on address.id_country=country_lang.id_country INNER join order_detail on orders.id_order=order_detail.id_order inner join order_state_lang on orders.current_state=order_state_lang.id_order_state;

    //Get all data from orders except products.
    getOrders(res) {
        const query = "SELECT orders.id_order as 'id_order', reference, DATE_FORMAT(date_add, '%d/%m/%Y' ) date_add, customer.firstname, customer.lastname, address.address1, address.address2, address.city, country_lang.name as country, order_state_lang.name as 'current_state' from orders INNER JOIN customer on orders.id_customer=customer.id_customer INNER join address on orders.id_address_delivery=address.id_address LEFT join country_lang on address.id_country=country_lang.id_country inner join order_state_lang on orders.current_state=order_state_lang.id_order_state"
        db.query(
            query, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
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





    //FILTER-->
    //Get all orders WHERE DATE

    //Get all orders WHERE FIRSTNAME

    //Get all orders WHERE LASTNAME

    //Get all orders WHERE ADDRESS

    //Get all orders WHERE COUNTRY
    getOrderByCountryName(req, res) {
        const query = `SELECT orders.id_order as 'id_order', reference, DATE_FORMAT(date_add, '%d/%m/%Y' ) date_add, customer.firstname, customer.lastname, address.address1, address.address2, address.city, country_lang.name as country, order_state_lang.name as 'current_state' from orders INNER JOIN customer on orders.id_customer=customer.id_customer INNER join address on orders.id_address_delivery=address.id_address LEFT join country_lang on address.id_country=country_lang.id_country inner join order_state_lang on orders.current_state=order_state_lang.id_order_state where country_lang.name = '${req.params.name}'`;
        db.query(
            query, (err, result) => {
                this.queryResult(err, result, res);
            }
        );
    }

    //Get all orders WHERE PRODUCTOS

    //Get all orders WHERE STATUS NAME
    getOrderByStatusName(req, res) {
        const query = `SELECT orders.id_order as 'id_order', reference, DATE_FORMAT(date_add, '%d/%m/%Y' ) date_add, customer.firstname, customer.lastname, address.address1, address.address2, address.city, country_lang.name as country, order_state_lang.name as 'current_state' from orders INNER JOIN customer on orders.id_customer=customer.id_customer INNER join address on orders.id_address_delivery=address.id_address LEFT join country_lang on address.id_country=country_lang.id_country inner join order_state_lang on orders.current_state=order_state_lang.id_order_state where order_state_lang.name = '${req.params.name}'`;
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

