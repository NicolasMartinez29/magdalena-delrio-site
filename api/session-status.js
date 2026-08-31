const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Método no permitido' });
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    return res.status(500).json({ error: 'Falta configurar STRIPE_SECRET_KEY.' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sessionId = req.query.session_id;
  if (!sessionId) return res.status(400).json({ error: 'Falta session_id.' });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return res.status(200).json({
      status: session.payment_status,
      email: session.customer_details ? session.customer_details.email : null,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'No se pudo confirmar el pago.' });
  }
};
