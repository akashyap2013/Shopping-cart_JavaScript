import createElement from "./cartUI.js";
import Con, {
  getData
} from "./connection.js";
import products from "./products.js";

const container = document.querySelector(".container");
const wrapper = document.querySelector(".appendTo");
const removemsg = document.querySelector(".removemsg");

// create database Cart with table name Tcart
const dbcart = Con("Cart", {
  Tcart: "++id,pname"
});

// create cart dynamicaly
getData(dbcart.Tcart, (values) => {
  products.forEach(element => {
    // compare every cart with the products
    if (values.pname == element.name) {
      cardElements(element.src, element.name, element.price, (btn) => {
        btn.addEventListener("click", event => {
          //console.log(event.target.dataset.itemName);
          let itemName = event.target.dataset.itemName;
          // call dexie get method
          dbcart.Tcart.get({
            pname: itemName
          }, (item) => {
            // console.log(item.id);
            dbcart.Tcart.delete(item.id);
            removemsg.className += " addmsg";
            setTimeout(() => {
              location.reload()
            }, 4000);
          });
        })
      });
    }
  });
});


// remove all button
createElement("button", "btn btn-danger float-right clearAll px-5", container, clear => {
  clear.textContent = "Clear All";
  clear.addEventListener("click", (event) => {
    dbcart.delete().then(() => {
      console.log("Database successfully deleted");
      dbcart.close();
      location.reload();
    }).catch((err) => {
      console.error("Could not delete database");
    })
  });
});


function cardElements(imgsrc, itemname, price, fn) {
  // <div class="card m-3"></div>
  createElement("div", "card m-3", wrapper, cartdiv => {
    // <div class="row no-gutters"></div>
    createElement("div", "row first-row no-gutters", cartdiv, row => {
      // <div class="col-md-4 img-div"></div>
      createElement("div", "col-md-4", row, col_md_4 => {
        // <img src="../assets/Experia Tablet - 900x610.png" class="card-img-top" />
        createElement("img", "card-img-top", col_md_4, img => {
          // img source path
          img.src = imgsrc;
        });
        // <div class="col-md-8"></div>
        createElement("div", "col-md-8", row, col_md_8 => {
          // <div class="row">
          createElement("div", "row", col_md_8, newRow => {
            // <div class="col-md-8 col-sm-12"></div>
            createElement("div", "col-md-8", newRow, innercol8 => {
              // <div class="card-body"></div>
              createElement("div", "card-body", innercol8, cartbody => {
                // <h5 class="card-title">Card title</h5>
                createElement("h5", "card-title", cartbody, h5 => {
                  // h5 heading tag with text
                  h5.textContent = itemname;
                });
                // <p class="card-text text-secondary m-0">Seller: dailytuitionelectronics</p>
                createElement(
                  "p",
                  "card-text text-secondary m-0",
                  cartbody,
                  p => {
                    // paragraph with text
                    p.textContent = "Seller: dailytuitionelectronics";
                  }
                );
                // <h5 class="py-2">$529.99</h5>
                createElement("h5", "py-2", cartbody, h5 => {
                  // h5 heading tag with price tag
                  h5.textContent = price;
                });
              });
            });
            // <div class="col-md-4 col-sm-12 py-1"></div>
            createElement(
              "div",
              "col-md-4 col-sm-12 py-1",
              newRow,
              innercol4 => {
                // <button class="btn btn-warning my-3">Save Later</button>
                createElement(
                  "button",
                  "btn btn-warning my-3",
                  innercol4,
                  btn1 => {
                    btn1.textContent = "Save Later";
                  }
                );
                // <button class="btn btn-danger">Remove</button>
                createElement("button", "btn btn-danger remove", innercol4, btn2 => {
                  btn2.setAttribute("data-item-name", itemname);
                  btn2.textContent = "Remove";
                  fn(btn2);
                });
              }
            );
          });
        });
      });
    });
  });
  return true;
}