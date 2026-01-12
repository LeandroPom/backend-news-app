// controllers/mercadoPago/payment.js
require("dotenv").config();
const { MercadoPagoConfig, Preference } = require("mercadopago");

const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' }});

module.exports = async ({ user_id, user_name, mail, product_name, product_price, amount}) => {

  try {
    const preference = new Preference(client);

    const body = {
      items: [
        {
          title: product_name,
          quantity: amount,
          unit_price: Number(product_price),
          currency_id: "ARS",
        },
      ],

      payer: {
        email: mail,
        name: user_name,
      },

      back_urls: {
        success: `${process.env.BACKEND_URL}/payments/success`,
        failure: `${process.env.BACKEND_URL}/payments/failure`,
        pending: `${process.env.BACKEND_URL}/payments/pending`,
      },

      notification_url: `${process.env.BACKEND_URL}/payments/notification`,

      // referencia mínima para identificar la compra
      external_reference: `${user_id}|${product_name}`,
    };

    const result = await preference.create({ body });

    return {
      init_point: result.init_point,
      mp_preference_id: result.id,
      external_reference: body.external_reference,
    };

  } catch (error) {
    throw new Error(`payment: ${error.message}`);
  }
};









// require("dotenv").config(); 
// const { MercadoPagoConfig, Payment, Preference } = require("mercadopago");
// const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN;
// // console.log(MP_ACCESS_TOKEN)

// // Configurar Mercado Pago con el Access Token
// const client = new MercadoPagoConfig({ accessToken: MP_ACCESS_TOKEN, options: { timeout: 5000, idempotencyKey: 'abc' } });

// module.exports = async ( user_id, mail, price) => {
//     try {

//     // Ajustar el campo name: eliminar espacios iniciales/finales y reemplazar espacios por "_"
//     // const sanitizedName = name.trim().replace(/\s+/g, "_");

//     //ecuperar el email
//     const email = mail

//     // **Aplicar el 10% extra al precio**
//     const finalPrice = Number(price) * 1.10; // 🔹 Aumentamos un 10% el precio

//     const title = "test Premium"

//     const preference = new Preference(client);

//     // Configurar los datos del cuerpo de la solicitud
//     const body = {
//       items: [
//         {
//           title: title,
//           quantity: 1, // Siempre se compra un solo ticket
//           unit_price: finalPrice, // Precio unitario
//           currency_id: "ARS", // Moneda en pesos argentinos
//         },
//       ],
//       payer: {
//         name: email,
//         email: mail,
//         identification: {
//           type: "DNI",
//           number: dni,
//         },
//         phone: {
//           number: phone,
//         },
//       },

//       back_urls: {
//         success: `${process.env.BACKEND_URL}/payments/success`,
//         failure: `${process.env.BACKEND_URL}/payments/failure`,
//         pending: `${process.env.BACKEND_URL}/payments/pending`,
//       },

//       // auto_return: "approved", // Retorno automático en pagos aprobados

//       notification_url: `${process.env.BACKEND_URL}/payments/notification`, // Notificaciones automáticas

//       external_reference: `user_id: ${user_id}, mail: ${mail}`, // Referencia única para el ticket

//       payment_methods: {
//         excluded_payment_types: [
//           { id: "Premium" }, // Excluir pagos en efectivo
//         ],
//       },

//     };

//     // Crear la preferencia en Mercado Pago
//     const result = await preference.create({ body });

//     return {
//       init_point: result.init_point, // URL para realizar el pago
//       payment_id: result.id, // ID del pago generado
//       external_reference: result.external_reference, // refereancias externas 
//     };

//   } catch (error) {
//     console.error("Error al crear el pago:", error);

//     // Mostrar mensaje detallado de error
//     if (error.response && error.response.data) {
//       throw new Error(`Error al procesar el pago: ${JSON.stringify(error.response.data)}`);
//     } else {
//       throw new Error("Error desconocido al procesar el pago.");
//     }
    
//   }
// };
