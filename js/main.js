import Con, {
    addItem,
    Collection,
    getData,
    add_Cart
} from "./connection.js";
import products from "./products.js";


let buttons = document.querySelectorAll(".card-body .btn"); // get all buttons
const count_cart = document.getElementById("count-cart"); // get count-cart span tag

// create database Cart with table name Tcart
const dbcart = Con("Cart", {
    Tcart: "++id,pname"
});
dbcart.open();



// On window load add products in the table
window.onload = () => {
    // specify text for cart-title using product object
    const card_title = Collection(".card-title");
    card_title.forEach((ele, index) => {
        ele.textContent = products[index].name;
    });

    // specify text for img source using product object
    const img = Collection(".card-img-top");
    img.forEach((ele, index) => {
        ele.src = products[index].src;
    });

    // specify text for price using product object
    const price = Collection(".price");
    price.forEach((ele, index) => {
        ele.textContent = products[index].price;
    });

    let btndata = []; // to store data attribute value
    // get data attribute value and store them in the array
    buttons.forEach((element, index) => {
        btndata[index] = element.dataset.productName;
    });

    // get the data from database table Tcart
    getData(dbcart.Tcart, value => { // value => we have Tcart table object
        btndata.forEach(data => { // data => button data attribute values
            if (data == value.pname) { // if data attribute values is equal to pname
                buttons.forEach(btn => { // get buttons one by one
                    if (btn.dataset.productName == value.pname) { // check if obtained btn data is equal to pname
                        add_Cart(btn);
                    }
                })
            }
        })
    });
};



// get existing database
const databases = Dexie.getDatabaseNames();
databases.then(result => { // result => return database array
    result.forEach(value => { // get that database array elements
        if (value === "Cart") { // check if we have cart database
            dbcart.Tcart.count(value => { // count number of row in the table
                if (value != 0) {
                    // count items
                    count_cart.textContent = value;
                    // add transition class to count-cart class
                    count_cart.classList.add("scale-cart");
                }
            });
        }
    });
});





buttons.forEach(ele => {
    ele.addEventListener("click", event => {


        // get the product using data attribute.
        const dataname = event.target.dataset.productName;

        // store that data in the Tcart table
        addItem(dbcart.Tcart, [{
            pname: dataname
        }]);


        // cart item count 
        dbcart.Tcart.count(value => {
            // count items
            count_cart.textContent = value;
            // add transition class to count-cart class
            count_cart.classList.add("scale-cart");
        });


        /**
         * Create a code for added cart item
         */
        // call add_cart function from the module
        add_Cart(event.target);
    });
});