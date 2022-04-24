const receiptModel = require('../models/receipt');

async function addReceiptService(body){
    const receipt = new receiptModel(body);
    try {
        const newReceipt = await receipt.save();
        return generateRespone(true,true,newReceipt,"Receipt added successfully");
    } catch (error) {
        console.log(error);
        return generateRespone(false,false,null,"Failed to add receipt");
    }
}

async function getAllReceiptService(){
    try {
        let allReceiptsData = await receiptModel.find({});
        return generateRespone(true,true,allReceiptsData,"All Receipts fetched successfully");
    } catch (error) {
        console.log(error);
        return generateRespone(false,false,null,"Failed to add receipt");
    }
}

async function checkValidityService(body){
    let receipt;
    try {
        receipt = await receiptModel.findOne({id:body.id}).exec();
        if(receipt == null){
            return generateRespone(true,false,null,`Receipt with id: ${body.id} not found`)
        }
    } catch (error) {
        return generateRespone(false,false,null,error.message)
    }
    if(receipt.isReturn){
        var receiptDate = new Date(receipt.createdAt);
        var currentDate = new Date();
        var differenceInHours= Math.floor(Math.abs(currentDate - receiptDate)/36e5);
        if(differenceInHours < 24){
            return generateRespone(true,true,receipt,"Return receipt valid");
        }else{
            return generateRespone(true,false,receipt,"Return receipt invalid")
        }

    }else{
        return generateRespone(true,false,null,`Receipt with id: ${body.id} is only one-way`);
    }
}

function generateRespone(requestSuccessStatus,dataSuccessStatus,data,message){
    return {
        requestSuccessStatus: requestSuccessStatus,
        dataSuccessStatus: dataSuccessStatus,
        data: data,
        message: message
    }
}

module.exports={
    addReceiptService,
    checkValidityService,
    getAllReceiptService
}