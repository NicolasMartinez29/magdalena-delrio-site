const Stripe = require('stripe');
const PRODUCTS = require('./products');

const MAX_QTY_PER_ITEM = 20;
const MAX_LINE_ITEMS = 30;

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'El sitio aún no tiene configurada la pasarela de pago (falta STRIPE_SECRET_KEY).' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const items = Array.isArray(body.items) ? body.items : [];

    if (items.length === 0 || items.length > MAX_LINE_ITEMS) {
      return res.status(400).json({ error: 'Carrito vacío o inválido.' });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const line_items = items.map(item => {
      const product = PRODUCTS[item.id];
      if (!product) throw new Error(`Producto desconocido: ${item.id}`);
      const qty = Math.min(MAX_QTY_PER_ITEM, Math.max(1, parseInt(item.qty, 10) || 1));
      const nameWithSize = item.size ? `${product.name} (${item.size})` : product.name;
      return {
        quantity: qty,
        price_data: {
          currency: 'usd',
          unit_amount: product.unitAmount,
          product_data: {
            name: nameWithSize,
            images: [`${origin}/${product.image}`],
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      shipping_address_collection: { allowed_countries: ['MX', 'US'] },
      success_url: `${origin}/?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancel`,
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'No se pudo iniciar el pago.' });
  }
};
