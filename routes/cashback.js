var Cashback = require('../models/cashback');
var Store = require('../models/store');
var MileStone = require('../models/milestone')
var CustomerBill = require('../models/customerbills');
var checksum = require('../models/checksum.js');
var request = require('request');



module.exports = {
    setCashback: function (req, res) {
        var token = getToken(req.headers);
        if (token) {
            var cashback = {
                store_id: req.body.store_id,
                min_cashback: req.body.min_cashback,
                avg_cashback: req.body.avg_cashback,
                is_giftcard: req.body.enableGiftcard,
                giftOptions: {
                    gift1: {
                        enabled: req.body.giftOptions.gift1.enabled,
                        name: req.body.giftOptions.gift1.name,
                        image: req.body.giftOptions.gift1.image,
                        price: req.body.giftOptions.gift1.price
                    },
                    gift2: {
                        enabled: req.body.giftOptions.gift2.enabled,
                        name: req.body.giftOptions.gift2.name,
                        image: req.body.giftOptions.gift2.image,
                        price: req.body.giftOptions.gift2.price
                    },
                    gift3: {
                        enabled: req.body.giftOptions.gift3.enabled,
                        name: req.body.giftOptions.gift3.name,
                        image: req.body.giftOptions.gift3.image,
                        price: req.body.giftOptions.gift3.price
                    },
                    gift4: {
                        enabled: req.body.giftOptions.gift4.enabled,
                        name: req.body.giftOptions.gift4.name,
                        image: req.body.giftOptions.gift4.image,
                        price: req.body.giftOptions.gift4.price
                    },
                    gift5: {
                        enabled: req.body.giftOptions.gift5.enabled,
                        name: req.body.giftOptions.gift5.name,
                        image: req.body.giftOptions.gift5.image,
                        price: req.body.giftOptions.gift5.price
                    }
                },
                _meta: {
                    created_time: Date.now(),
                    updated_time: null,
                    is_active: true,
                    is_deleted: false
                }
            };

            var query = ({
                    store_id: req.body.store_id
                }),
                update = cashback,
                options = {
                    upsert: true,
                    new: true,
                    setDefaultsOnInsert: true
                };

            // Find the document
            Cashback.findOneAndUpdate(query, update, options, function (error, result) {
                if (error) return res.json({
                    success: false,
                    message: 'Cashback not set.',
                    reason: error
                })
                res.json({
                    success: true,
                    message: 'Cashback set successfully.'
                });
            });
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    },

    getCashback: function (req, res) {
        var token = getToken(req.headers);
        if (token) {
            Cashback.findOne({
                'store_id': req.body.store_id
            }, function (err, cashback) {
                if (err) throw err;
                if (!cashback) res.status(200).send({
                    success: false,
                    message: 'Cashback not found, Create One.'
                });
                else
                    res.status(200).send({
                        success: true,
                        message: cashback
                    });
            }).select({
                "_meta": 0,
                "_id": 0,
                "__v": 0
            });
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    },   


    getUserCashback: async function (req, res) {
        var token = getToken(req.headers);
        if (token) {
            var store_id = req.body.store_id;
            var cbDetails = await cashbackDetails(store_id);
            var cbBucket = await cashbackBucketDetails(store_id);
            var msDetails = await mileStoneDetails(store_id);
            if (cbDetails === null || cbBucket === null) {
                return res.json({
                    success: false,
                    message: "Cashback Not found"
                });
            }
            var min_cashback = cbDetails.min_cashback,
                avg_cashback = cbDetails.avg_cashback,
                paytm_number = req.body.paytm_number,
                bill_amount = req.body.bill_amount;

            let calculatedCB = bill_amount * (avg_cashback / 100);
            var max_cashback = cbBucket.cashbackBucket > 0 ? calculatedCB + cbBucket.cashbackBucket : calculatedCB;
            let userCashback = randomIntFromInterval(min_cashback, max_cashback)
            cbBucket.cashbackBucket += calculatedCB - userCashback;
            cbBucket.balance -= userCashback;

            if (cbBucket.balance < userCashback) {
                return res.status(200).send({
                    sucess: true,
                    message: "Amount Insufficient in store"
                });
            }

            var updatedStoreDetails = {
                "cashbackBucket": cbBucket.cashbackBucket,
                "balance": cbBucket.balance
            }

            var newBill = new CustomerBill({
                store_id: req.body.store_id,
                bill_number: req.body.bill_id,
                bill_amount: req.body.bill_amount,
                paytm_number: req.body.paytm_number,
                _meta: {
                    created_time: Date.now(),
                    updated_time: null,
                    is_active: true,
                    is_deleted: false
                }
            });
            newBill.save();


            CustomerBill.countDocuments({
                paytm_number: paytm_number,
                store_id: store_id
            }, function (err, count) {
                Store.findOneAndUpdate({
                    _id: store_id
                }, updatedStoreDetails, {
                    upsert: true
                }, function (err, doc) {
                    if (err) res.send({
                        error: err
                    });
                    else res.send({
                        sucess: true,
                        message: {
                            Cashback: userCashback,
                            Visits: count + 1,
                            MileStone: msDetails.visits_needed,
                            diff: msDetails.visits_needed - count + 1
                        }
                    });
                })
            })
        } else {
            res.status(401).send({
                sucess: false,
                message: "Token Invalid"
            });
        }
    },

    paytmTestApi: function (req, res) {

        var token = getToken(req.headers);
        if (token) {
            var store_id = req.body.store_id;

        console.log("--------paytm----");
        var samarray = new Array();

        samarray = {
            "request": {
                "transaction_type": 'production',
                "requestType": "VERIFY",
                "merchantGuid": "91bf881e-3896-4e16-9b1c-2d4c7002c81b",
                "merchantKey": "1wADBv8UALjm9#Gr",
                "merchantOrderId": "ORDS33954359",
                "salesWalletName": null,
                "salesWalletGuid": "a897a0d3-3959-48cb-97a9-fac2e37f1c57",
                "payeeEmailId": null,
                "payeePhoneNumber": "8547228318",
                "payeeSsoId": "",
                "appliedToNewUsers": "Y",
                "amount": "1",
                "currencyCode": "INR",
                "PaytmMerchantWebsite" : "http://www.craydo.co/Demo"
            },
            "metadata": "Testing Data",
            "ipAddress": "127.0.0.1",
            "platformName": "PayTM",
            "operationType": "SALES_TO_USER_CREDIT"
        };


        var finalstring = JSON.stringify(samarray);
        checksum.genchecksumbystring(finalstring, "1wADBv8UALjm9#Gr", function (err, result) {
            request({
                url: 'https://trust.paytm.in/wallet-web/salesToUserCredit', //URL to hit
                //  qs: finalstring, //Query string data
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'mid': 'Craydo88510575278239',
                    'checksumhash': result
                },
                body: finalstring //Set the body as a string
            }, function (error, response, body) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(response);
                    console.log(response.statusCode, body);
                    res.send(body);
                }
            });
        });
    }
}

}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

var cashbackBucketDetails = async (store_id) => {
    return Store.findById({
        _id: store_id
    }).exec();
}

var cashbackDetails = async (store_id) => {
    return Cashback.findOne({
        store_id: store_id
    }).exec()
}

var mileStoneDetails = async (store_id) => {
    return MileStone.findOne({
        store_id: store_id
    }).exec()
}