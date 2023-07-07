import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
    if(!stripePromise) {
        stripePromise = loadStripe('pk_test_51NQ6BNSAUfZMHfy4icarDUnCYHqXVkQzaDi6L4CfTq0wlxndzR3TYgKHcI7HmBIyRHRwry23YuM4RY0qkLPjPTxw00THYgwJgv');
    }
    return stripePromise;
}

export default getStripe;