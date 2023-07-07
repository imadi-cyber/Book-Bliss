import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51NQ6BNSAUfZMHfy4PpDp2dsep4rRlCeHHmJCs05BQhTcrmnNo9wX1Jo8QjxGaCW8LB4no89wYiS3gcAvSFMMDd4F00kVtj7fDg');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1NQ6wrSAUfZMHfy41ME9weCE' },
          { shipping_rate: 'shr_1NQ6yvSAUfZMHfy4icOQXdZM' },
        ],
        line_items: req.body.map((item) => {
          const img = item.image[0].asset._ref;
          const newImage = img.replace('image-', 'https://cdn.sanity.io/images/swmcq5ur/production/').replace('-jpeg', '.jpeg');

          return {
            price_data: { 
              currency: 'inr',
              product_data: { 
                name: item.name,
                images: [newImage],
              },
              unit_amount: item.price*100,
            },
            adjustable_quantity: {
              enabled:true,
              minimum: 1,
            },
            quantity: item.quantity
          }
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}