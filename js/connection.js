// Create a connection and define table
const Con = (dbname, tables) => {
  const db = new Dexie(dbname);
  // delete default tables
  db.version(1).stores(tables);
  console.log(`${dbname} Database is Created...!`);
  return db;
};

// add bulk items in the database tabke
const addItem = (dbname, items) => {
  dbname.bulkPut(items);
  console.log(`Data Inserted successfully...!`);
};

// get all elements
const Collection = element => {
  let item = document.querySelectorAll(element);
  return item;
};

// getData from the database
const getData = (dbname, fn) => {
  let index = 0;
  dbname.each((table) => {
    // table => return the table object data
    fn(table, index++); // call function with data argument
  });
};

// added in the cart
const add_Cart = button => {
  button.disabled = true; // disabled button
  button.value = ""; // remove text
  button.textContent = "Item Added"; // specify new text
  console.log("Added in the Cart");
};


export default Con;
export {
  addItem,
  Collection,
  getData,
  add_Cart
};