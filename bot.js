require('dotenv').config();
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Inicializar cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth()
});

// Mostrar QR para escanear en consola
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// Confirmación de conexión
client.on('ready', () => {
  console.log('✅ ¡Leonardo está listo para responder en WhatsApp!');
});

// Catálogo de cursos
const cursos = `🎨 Tenemos activa la promoción:\n` +
  `1. *Curso de hamburguesas* – $10.000\n` +
  `2. *Curso de piano* – $12.000\n` +
  `3. *Curso de Civil 3D* – $70.000\n` +
  `4. *SketchUp y render 3D* – $80.000\n` +
  `5. *Cartilla violín* – $8.000\n` +
  `6. *Cartilla viola* – $8.000\n` +
  `7. *Cartilla chelo* – $8.000\n` +
  `8. *Cartilla contrabajo* – $8.000\n` +
  `9. *Técnica vocal* – $8.000\n\n` +
  `✅ Escribe el número del curso que te interesa.`;

// Enlaces Drive de cada curso
const enlacesDrive = {
  "1": "https://drive.google.com/file/d/1M8soUQWbilqWnUJm2OaTgoBPiZe7Qkw6/view?usp=sharing",
  "2": "https://drive.google.com/file/d/1CR_YVDGGoY5eBpTLresAoEZVuwtgJoAe/view?usp=sharing",
  "3": "https://drive.google.com/file/d/19eJOw8Hg-UdqwT8w9scPk1JdBX3QpVCl/view?usp=sharing",
  "4": "https://drive.google.com/file/d/17YzP96XDKj35CEnMFpJs2Mm8iFB399fM/view?usp=sharing",
  "5": "https://drive.google.com/file/d/1buYDkFrVHA8DCFsimo_uw5e3DsPvp0YF/view?usp=sharing",
  "6": "https://drive.google.com/file/d/1p-MmqI6nmVHAYWRKL_lwNqLkqDbPM3TA/view?usp=sharing",
  "7": "https://drive.google.com/file/d/1zgbNO4rijs-nSshxEdtRO1fnk3IKsH72/view?usp=sharing",
  "8": "https://drive.google.com/file/d/11KGRN1Mrp4FZj31uBS0KTujope_9Bvse/view?usp=sharing",
  "9": "https://drive.google.com/file/d/11KGRN1Mrp4FZj31uBS0KTujope_9Bvse/view?usp=sharing"
};

// Manejo de mensajes
client.on('message', async (message) => {
  const texto = message.body.toLowerCase().trim();

  // Si envía foto o audio
  if (message.hasMedia) {
    await message.reply('🕵️‍♂️ Recibido. Estoy analizando tu imagen o audio y en breve te respondo.');
    return;
  }

  // Si elige un número de curso
  if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(texto)) {
    await message.reply(
      `🎁 ¡Excelente elección!\n\n` +
      `Haz la transferencia a:\n` +
      `📱 NEQUI: *3005251101*\n` +
      `🏦 BANCOLOMBIA: *Ahorros 082-000270-52*\n\n` +
      `📸 Luego de pagar, envía la *captura* para recibir el link 📥`
    );
    return;
  }

  // Si Rafa usa #enviar N
  if (texto.startsWith('#enviar')) {
    const partes = texto.split(' ');
    const curso = partes[1];
    const chat = await message.getChat();

    if (enlacesDrive[curso]) {
      const usuario = message.getQuotedMessage 
        ? await message.getQuotedMessage() 
        : message;
      await usuario.reply(
        `✅ ¡Gracias por tu compra!\n\nAquí tienes tu curso:\n${enlacesDrive[curso]}\n\n📩 Si tienes preguntas, escribe *atención*.`
      );
    } else {
      await message.reply('❌ Curso no válido. Usa por ejemplo: `#enviar 2`');
    }
    return;
  }

  // Mensaje por defecto
  await message.reply(`👋 Bienvenido a *Contenidos digitales*, soy *Leonardo*.\n\n${cursos}`);
});

// 🚀 Inicializar cliente (¡importante!)
client.initialize();
