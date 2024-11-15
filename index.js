const SalesRecordProcessor = require("./salesProcessor");

const processor = new SalesRecordProcessor();
processor.loadData("ice_cream_sales.csv");
processor.calculateTotals();
processor.generateReport();
