const receiptSchema = require('../requestSchema/receiptInputSchema');
const receiptService = require('../service/receiptService');
const constants = require('../utility/constants');

async function addReceipt(req,res){
    let inputBody = receiptSchema.receiptInputSchema.validate(req.body);
    if(inputBody.error){
        res.status(constants.statusCodes.badRequest).json({ sucess: false ,message: "vehicleRegistrationNum cannot be empty and must be valid vehicle registration number & isReturn flag must not be empty" })
    }else{
        bodyWithAmount = setAmount(req.body);
        let response = await receiptService.addReceiptService(bodyWithAmount);
        if (response.requestSuccessStatus == true) {
            res.status(constants.statusCodes.successfullyAdded).json(response);
        } else {
            res.status(constants.statusCodes.internalServer).json(response);
        }
    }
}

function setAmount(body){
    if(body.isReturn){
        body["amount"] = constants.amount.return;
        return body
    }else{
        body["amount"] = constants.amount.oneWay;
        return body;
    }
}

async function checkValidity(req,res){
    let inputBody = receiptSchema.checkValidityInputSchema.validate(req.body);
    if(inputBody.error){
        res.status(constants.statusCodes.badRequest).json({ sucess: false ,message: "id of length 7 digit required" })
    }else{
        let response = await receiptService.checkValidityService(req.body);
        if (response.requestSuccessStatus == true) {
            res.status(constants.statusCodes.success).json(response);
        } else {
            res.status(constants.statusCodes.internalServer).json(response);
        }
    }
}

async function getReceipts(req,res){
    let response = await receiptService.getAllReceiptService();
    res.status(constants.statusCodes.success).json(response);
}

module.exports = {
    addReceipt,
    checkValidity,
    getReceipts
}