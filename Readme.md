# Ice Cream Sales Processor

This project processes ice cream sales data from a CSV file and generates various reports, including total sales, month-wise sales totals, most popular items, and top revenue-generating items.

## Files

- `ice_cream_sales.csv`: Contains the sales data.
- `index.js`: Entry point of the application.
- `salesProcessor.js`: Contains the logic for processing sales data.
- `Readme.md`: Project documentation.

## Usage

1. Ensure you have Node.js installed.
2. Place your sales data in `ice_cream_sales.csv`.
3. Run the application using the following command:

```sh
node ./index.js
```

## Classess

**SalesRecord** : Represent a single sales record
```sh
#Constructor
new SalesRecord(date, item, quantity, price)
```
-	```date``` : The date of the sale
-	```item``` : The item sold.
-	```quantity``` : The quantity sold.
-	```price``` : The price per unit.

<br>

**SalesRecordProcessor** : Processes the sales data and generates reports

#### Methods
-	```loadData(filePath)``` : Loads sales data from the specified CSV file.
-	```calculateTotals()``` : Calculates total sales and month-wise sales data.
-	```generateReport()``` : Generates and prints the sales report.
-	```extractMonth(date)``` : Extracts the month from a date string.
-	```findMostPopularItem(month)``` : Finds the most popular item for a given month.
-	```findTopRevenueItem(month)``` : Finds the top revenue-generating item for a given month.
-	```calculateItemStats(month, item)``` : Calculates and prints statistics for a given item in a given month.


<br>

### Sample Output
```js
Total Sales of the Store: $...

Month-wise Sales Totals:
2024-01: $...
2024-02: $...

Most Popular Item (by Quantity) in Each Month:
2024-01: Vanilla
2024-02: Chocolate

Top Revenue-Generating Item in Each Month:
2024-01: Vanilla
2024-02: Chocolate

Statistics for Most Popular Items:
2024-01 - Vanilla: Min Orders = ..., Max Orders = ..., Average Orders = ...
```