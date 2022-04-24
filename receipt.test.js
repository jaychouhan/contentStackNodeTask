const request = require("supertest")("http://localhost:5000/v1/tollplaza");
const expect = require("chai").expect;
const constants = require('./utility/constants');

describe("GET /receipts", function () {
  it("returns all receipts", async function () {
    const response = await request.get("/receipts");
    let receiptCount = response.body.data.length;
    expect(response.status).to.eql(constants.statusCodes.success);
    expect(response.body.data.length).to.eql(receiptCount);
    expect(response.body.requestSuccessStatus).to.eql(true);
    expect(response.body.dataSuccessStatus).to.eql(true);
    expect(response.body.message).to.eql("All Receipts fetched successfully");
  });
});

describe("POST /receipts", function () {
    it("Try to add badSchema noBody receipt", async function () {
      const response = await request.post("/receipts")
                                    .send({});
      expect(response.status).to.eql(constants.statusCodes.badRequest);
      expect(response.body.sucess).to.eql(false);
      expect(response.body.message).to.eql("vehicleRegistrationNum cannot be empty and must be valid vehicle registration number & isReturn flag must not be empty");
    });
});

describe("POST /receipts", function () {
    it("Try to add badSchema contains only single value in body i.e vehicleRegistrationNum receipt", async function () {
      const response = await request.post("/receipts")
                                    .send({"vehicleRegistrationNum":"AP-05-BJ-9353"});
      expect(response.status).to.eql(constants.statusCodes.badRequest);
      expect(response.body.sucess).to.eql(false);
      expect(response.body.message).to.eql("vehicleRegistrationNum cannot be empty and must be valid vehicle registration number & isReturn flag must not be empty");
    });
});

describe("POST /receipts", function () {
    it("Try to add badSchema contains only single value in body i.e isReturn receipt", async function () {
      const response = await request.post("/receipts")
                                    .send({"isReturn":true});
      expect(response.status).to.eql(constants.statusCodes.badRequest);
      expect(response.body.sucess).to.eql(false);
      expect(response.body.message).to.eql("vehicleRegistrationNum cannot be empty and must be valid vehicle registration number & isReturn flag must not be empty");
    });
});

describe("POST /receipts", function () {
    it("Try to add badSchema contains both value in body i.e vehicleRegistrationNum & isReturn receipt, but value of vehicleRegistrationNum is wrong", async function () {
      const response = await request.post("/receipts")
                                    .send({
                                        "vehicleRegistrationNum":"AP-05-bj-93534",
                                        "isReturn":true
                                    });
      expect(response.status).to.eql(constants.statusCodes.badRequest);
      expect(response.body.sucess).to.eql(false);
      expect(response.body.message).to.eql("vehicleRegistrationNum cannot be empty and must be valid vehicle registration number & isReturn flag must not be empty");
    });
});

describe("POST /receipts", function () {
    it("Try to add correct Schema contains both value in body i.e vehicleRegistrationNum & isReturn receipt", async function () {
        const response = await request.post("/receipts")
                                    .send({
                                        "vehicleRegistrationNum":"AP-05-BJ-9353",
                                        "isReturn":true
                                    });
        expect(response.status).to.eql(constants.statusCodes.successfullyAdded);
        expect(response.body.requestSuccessStatus).to.eql(true);
        expect(response.body.dataSuccessStatus).to.eql(true);
        expect(response.body.message).to.eql("Receipt added successfully");
    });
});

describe("POST /checkValidity", function () {
    it("Try to add badSchema no Body  ", async function () {
        const response = await request.post("/checkValidity")
                                    .send({});
        expect(response.status).to.eql(constants.statusCodes.badRequest);
        expect(response.body.sucess).to.eql(false);
        expect(response.body.message).to.eql("id of length 7 digit required");
    });
});

describe("POST /checkValidity", function () {
    it("Try to add badSchema id less than 7 digit  ", async function () {
        const response = await request.post("/checkValidity")
                                    .send({"id":"H8OUZp"});
        expect(response.status).to.eql(constants.statusCodes.badRequest);
        expect(response.body.sucess).to.eql(false);
        expect(response.body.message).to.eql("id of length 7 digit required");
    });
});

describe("POST /checkValidity", function () {
    it("Try to post proper 7 digit id WHICH IS NOT IN DB  ", async function () {
        const response = await request.post("/checkValidity")
                                    .send({"id":"H8OUZpd"});
        expect(response.status).to.eql(constants.statusCodes.success);
        expect(response.body.requestSuccessStatus).to.eql(true);
        expect(response.body.dataSuccessStatus).to.eql(false);
        expect(response.body.message).to.eql("Receipt with id: H8OUZpd not found");
    });
});

describe("POST /checkValidity", function () {
    it("Try to post proper 7 digit id which is proper and receipt is expired", async function () {
        const response = await request.post("/checkValidity")
                                    .send({"id":"H8OUZpD"});
        expect(response.status).to.eql(constants.statusCodes.success);
        expect(response.body.requestSuccessStatus).to.eql(true);
        expect(response.body.dataSuccessStatus).to.eql(false);
        expect(response.body.message).to.eql("Return receipt invalid");
    });
});

describe("POST /checkValidity", function () {
    it("Try to post proper 7 digit id which is proper and receipt is valid", async function () {
        const response = await request.post("/receipts")
                                    .send({
                                        "vehicleRegistrationNum":"AP-05-BJ-9353",
                                        "isReturn":true
                                    });
        let id = response.body.data.id;
        const validityResponse = await request.post("/checkValidity")
                                            .send({"id":id});
        expect(validityResponse.status).to.eql(constants.statusCodes.success);
        expect(validityResponse.body.requestSuccessStatus).to.eql(true);
        expect(validityResponse.body.dataSuccessStatus).to.eql(true);
        expect(validityResponse.body.message).to.eql("Return receipt valid");
    });
});