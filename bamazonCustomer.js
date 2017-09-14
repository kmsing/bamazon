var mysql = require("mysql");
var prompt = require("prompt");
var inquirer = require('inquirer');
var colors = require('colors');

// Settings to connect to the Bamazon database
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
  database: 'Bamazon'
});

var start = function(){

	 connection.query("SELECT * FROM Products", function(err, result) {
		return (table(result));
	  
	  });

//display all of the items available for sale. 
//Include the ids, names, and prices of products for sale.

connection.connect(function(err) {
     if (err) throw err;
});

function showInventory() {
     connection.query('SELECT * FROM products', function(err, res) {
     	if (err) throw err;
               console.log("Products of Bamazon");
               console.log("-------------------");
 
               for(var i = 0; i < res.length; i++) {
          	console.log("Item ID: " + res[i].id + " | Product: " + res[i].ProductName + " | Department: " + res[i].DepartmentName + " | Price: " +  res[i].Price + " | Quantity: " + res[i].StockQuantity);
          }

//Prompt ask them the ID of the product they would like to buy.
//Prompt ask how many units of the product they would like to buy.
inquirer.prompt([

          	
          	{
          		type: "input",
          		message: "Please enter the item id.",
          		name: "id"
          	},

               {
          		type: "input",
          		message: "How many would you like to buy?",
          		name: "quantity"
          	}

//check if your store has enough of the product to meet the customer's request.
//if your store does have enough of the product, you should fulfill the customer's order.
//show the customer the total cost of their purchase.
]).then(function (order) {
          	
                    var quantity = order.quantity;
                    var itemId = order.id;
                    connection.query('SELECT * FROM products WHERE id=' + itemId, function(err, selectedItem) {
                    	if (err) throw err;
                         if (selectedItem[0].StockQuantity - quantity >= 0) {
                              console.log("Bamazon's Inventory has enough of that item (".green + selectedItem[0].ProductName.green + ")!");
                              console.log("Quantity in Stock: " + selectedItem[0].StockQuantity + " Order Quantity: " + quantity);
                              console.log("Amount charged is" + (order.quantity * selectedItem[0].Price) +  " dollars.");

                              // Calculate the new quantity to update in the database
                    		  var newQuantity = (res[0].StockQuantity - currentAmount);
                    		  var totalCost = res[0].Price*currentAmount;
                 
                              connection.query('UPDATE products SET StockQuantity=? WHERE id=?', [selectedItem[0].StockQuantity - quantity, itemId],
                              function(err, inventory) {
                              	if (err) throw err;
                                   
                                   showInventory();
                          
                              });  

                         }

                         else {
                              console.log("Please decrease your amount. Therea are only" + selectedItem[0].StockQuantity + " " + selectedItem[0].ProductName + " in stock now.");
                              showInventory();
                         }
                    });
          });
     });
}

showInventory();
