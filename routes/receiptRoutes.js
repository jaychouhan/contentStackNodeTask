const express = require('express');
const router = express.Router();
let { addReceipt, checkValidity, getReceipts } = require('../controllers/receiptController');

/**
 * @swagger
 * /v1/tollplaza/receipts:
 *   get:
 *     description: All Receipts
 *     responses:
 *       200:
 *         description: Returns all the previously generated toll receipts.
 */
router.get('/receipts', getReceipts);
/**
 * @swagger
 * /v1/tollplaza/receipts:
 *   post:
 *     parameters:
 *      - in: body
 *        name: Receipt
 *        description: Generate a new toll receipt where in 2 parameters are required a vehicleRegistrationNum in the following patter "AP-05-BJ-9353" & "isReturn" will be boolean
 *        schema:
 *          type: object
 *          properties:
 *            vehicleRegistrationNum:
 *              type: string
 *            isReturn:
 *              type: boolean
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/receipts', addReceipt);
/**
 * @swagger
 * /v1/tollplaza/checkValidity:
 *   post:
 *     parameters:
 *      - in: body
 *        name: Receipt validity
 *        description: This api will take in "id" of 7 digit as a parameter and will check whether the provided id receipt is valid or not, validation criteria is post 24hrs after generation
 *        schema:
 *          type: object
 *          properties:
 *            id:
 *              type: string
 *     responses:
 *       200:
 *         description: Created
 */
router.post('/checkValidity',checkValidity);

module.exports = router