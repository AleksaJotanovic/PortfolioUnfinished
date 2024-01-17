import Order from "../models/Order.js";
import { CreateError } from "../middlewares/error.js";
import { CreateSuccess } from "../middlewares/success.js";
import { v4 as uuid } from "uuid";
import puppeteer from "puppeteer";
import fs from 'fs';
import nodemailer from 'nodemailer'
import { accountingMailMessage } from "../middlewares/emailhtmls.js";



export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({});
        return next(CreateSuccess(200, "Order controller says: Orders fetching successfull :)", orders));
    } catch (error) {
        return next(CreateError(500, "Order controller says: Failed at fetching orders"));
    }
};


export const addOrder = async (req, res, next) => {
    try {
        if (req.body) {
            const newOrder = new Order({ ...req.body, _id: uuid() });
            await newOrder.save();
            return res.send();
        } else {
            return res.status(400).send("Order controller says: Error while adding Order :(");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};


export const updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            return res.status(200).send();
        } else {
            return res.status(400).send("Order controller says: Failed at order updating, order not found :(");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
};


export const deleteOrder = async (req, res, next) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            await Order.findByIdAndDelete(req.params.id);
            return res.status(200).send();
        } else {
            return res.status(400).send("Order controller says: Failed at order delete, order not found :(");
        }
    } catch (error) {
        return res.status(500).send("Order controller says: Error catched in order delete :(");
    }
};


export const sendAccounting = async (req, res, next) => {
    try {
        const order = await Order.findById(req.body.orderId);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(req.body.accounting, { waitUntil: 'domcontentloaded' });
        await page.emulateMediaType('screen');
        await page.pdf({
            path: process.env.THIS_DIR + 'public/pdf/accounting.pdf',
            printBackground: true,
            format: 'A4',
        });
        await browser.close();

        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jotanovicaleksa@gmail.com",
                pass: "tvasvzcsohdlnytb"
            }
        });
        const mailDetails = {
            from: "jotanovicaleksa@gmail.com",
            to: order.shipping.email,
            subject: "Your accounting!",
            html: accountingMailMessage(),
            attachments: [{
                filename: 'accounting.pdf',
                path: process.env.THIS_DIR + 'public/pdf/accounting.pdf',
                contentType: 'application/pdf'
            }],
        };

        if (fs.existsSync(process.env.THIS_DIR + 'public/pdf/accounting.pdf')) {
            mailTransporter.sendMail(mailDetails, async (err) => {
                if (err) {
                    return next(CreateError(400, err));
                } else {
                    return next(CreateSuccess(200, "Accounting sent successfully!"));
                }
            });
        } else {
            return next(CreateError(404, "File does not exists"));
        }
    } catch (error) {
        console.log(error);
    }

};

export const sendStatusEmail = async (req, res, next) => {
    try {
        const mailTransporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "jotanovicaleksa@gmail.com",
                pass: "tvasvzcsohdlnytb"
            }
        });
        const mailDetails = {
            from: "jotanovicaleksa@gmail.com",
            to: req.body.shipping.email,
            subject: "Order Status!",
            html: req.body.orderStatusMail
        };

        mailTransporter.sendMail(mailDetails, async (err) => {
            if (err) {
                return next(CreateError(400, err));
            } else {
                return next(CreateSuccess(200, "Status change mail successfully sent :)"));
            }
        });
    } catch (error) {
        return next(CreateSuccess(500, "Error catched while sending status mail", error));
    }
};
