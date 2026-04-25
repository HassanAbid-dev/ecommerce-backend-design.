import Stripe from "stripe";
import Order from "../models/Order";

const stripe = new Stripe(process.env.STRIPE_WEBHOOK_SECRET);

export const createPayment=async((req,res)=>{
    try {
        
    } catch (error) {
        
    }
})
