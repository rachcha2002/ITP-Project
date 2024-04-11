const RecordController = require("../controllers/sm/record-controller");
const quotationController = require("../controllers/sm/quotationController");

const router = require("express").Router();

router.get("/records", RecordController.getRecords);

router.get("/record/:id", RecordController.getRecordById);

router.post("/records", RecordController.createRecord);

router.delete("/archive-record/:id", RecordController.deleteRecordById);

router.patch("/update-record/:id",RecordController.updateRecordById );

// Route to create a new quotation
router.post("/quotations", quotationController.createQuotation);

// Route to get all quotations
router.get("/quotations", quotationController.getAllQuotations);

  
module.exports = router;