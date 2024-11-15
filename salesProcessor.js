const fs = require("fs");

// Class to represent each sales record
class SalesRecord {
  constructor(date, item, quantity, price) {
    this.date = date;
    this.item = item;
    this.quantity = parseInt(quantity);
    this.price = parseFloat(price);
  }
}

class SalesRecordProcessor {
  constructor() {
    this.salesData = [];
    this.totalSales = 0;
    this.monthSales = {};
    this.monthItemQuantity = {};
    this.monthItemRevenue = {};
  }

  loadData(filePath) {
    const data = fs.readFileSync(filePath, "utf-8").split("\n").slice(1);

    data.forEach((line) => {
      if (!line.trim()) return;
      const [date, item, quantity, price] = line.split(",");
      const record = new SalesRecord(date, item, quantity, price);
      this.salesData.push(record);
    });
  }

  calculateTotals() {
    this.salesData.forEach((record) => {
      const revenue = record.quantity * record.price;
      this.totalSales += revenue;
      const month = this.extractMonth(record.date);

      // if the month is not already present
      if (!this.monthSales[month]) {
        this.monthSales[month] = 0;
        this.monthItemQuantity[month] = {};
        this.monthItemRevenue[month] = {};
      }
      this.monthSales[month] += revenue;

      // Track quantities sold per item for the month
      if (!this.monthItemQuantity[month][record.item]) {
        this.monthItemQuantity[month][record.item] = 0;
        this.monthItemRevenue[month][record.item] = 0;
      }
      this.monthItemQuantity[month][record.item] += record.quantity;
      this.monthItemRevenue[month][record.item] += revenue;
    });
  }

  generateReport() {
    console.log(`Total Sales of the Store: $${this.totalSales.toFixed(2)}`);

    console.log(`\nMonth-wise Sales Totals:`);
    for (const month in this.monthSales) {
      console.log(`${month}: $${this.monthSales[month].toFixed(2)}`);
    }

    console.log(`\nMost Popular Item (by Quantity) in Each Month:`);
    for (const month in this.monthItemQuantity) {
      const popularItem = this.findMostPopularItem(month);
      console.log(`${month}: ${popularItem}`);
    }

    console.log(`\nTop Revenue-Generating Item in Each Month:`);
    for (const month in this.monthItemRevenue) {
      const topItem = this.findTopRevenueItem(month);
      console.log(`${month}: ${topItem}`);
    }

    console.log(`\nStatistics for Most Popular Items:`);
    for (const month in this.monthItemQuantity) {
      const popularItem = this.findMostPopularItem(month);
      this.calculateItemStats(month, popularItem);
    }
  }

  extractMonth(date) {
    return date.slice(0, 7);
  }

  findMostPopularItem(month) {
    const items = this.monthItemQuantity[month];
    return Object.keys(items).reduce((a, b) => (items[a] > items[b] ? a : b));
  }

  findTopRevenueItem(month) {
    const items = this.monthItemRevenue[month];
    return Object.keys(items).reduce((a, b) => (items[a] > items[b] ? a : b));
  }

  calculateItemStats(month, item) {
    const quantities = this.salesData
      .filter(
        (record) =>
          this.extractMonth(record.date) === month && record.item === item
      )
      .map((record) => record.quantity);

    const minOrder = Math.min(...quantities);
    const maxOrder = Math.max(...quantities);
    const avgOrder = quantities.reduce((a, b) => a + b, 0) / quantities.length;

    console.log(
      `${month} - ${item}: Min Orders = ${minOrder}, Max Orders = ${maxOrder}, Average Orders = ${avgOrder.toFixed(
        2
      )}`
    );
  }
}

module.exports = SalesRecordProcessor;
