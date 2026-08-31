// Catálogo con precios oficiales (en centavos). Única fuente de verdad para el cobro:
// el frontend nunca envía precios, solo IDs — así nadie puede manipular el monto a pagar.
module.exports = {
  'piedra-proteccion': { name: 'Piedra Ritual de Protección', unitAmount: 2600, image: 'assets/obsidian-stone.jpg' },
  'aceite-maggy': { name: 'Aceite Ritual Maggy', unitAmount: 3800, image: 'assets/maggy-oil.jpg' },
  'cacao-latido-zen': { name: 'Néctar de Cacao Latido Zen', unitAmount: 3200, image: 'assets/cacao-jar.jpg' },
  'bruma-lavanda': { name: 'Bruma de Lavanda Paz Interior', unitAmount: 2800, image: 'assets/spray-lavender.jpg' },
  'bano-limpieza': { name: 'Baño de Limpieza', unitAmount: 3200, image: 'assets/soap-bag.jpg' },
  'sal-limpieza': { name: 'Sal de Limpieza', unitAmount: 2600, image: 'assets/sal-maggy-leaf.jpg' },
  'atado-botanico': { name: 'Atado Botánico', unitAmount: 2200, image: 'assets/incense-bag.jpg' },
  'kit-limpieza': { name: 'Kit Ritual de Limpieza', unitAmount: 6800, image: 'assets/herb-jar.jpg' },
};
