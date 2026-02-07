const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');

// Crear servidor web para mostrar el QR
const app = express();
const PORT = process.env.PORT || 3000;

let qrCodeData = '';
let isReady = false;

// Página web para mostrar el QR
app.get('/', (req, res) => {
    if (isReady) {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Bot WhatsApp - Conectado</title>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    }
                    .container {
                        background: white;
                        padding: 40px;
                        border-radius: 20px;
                        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                        text-align: center;
                    }
                    h1 { color: #25D366; }
                    .status {
                        background: #25D366;
                        color: white;
                        padding: 15px 30px;
                        border-radius: 10px;
                        font-size: 18px;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>✅ Bot Conectado</h1>
                    <p style="font-size: 18px;">Tu bot de WhatsApp está funcionando correctamente</p>
                    <div class="status">🟢 Activo y recibiendo mensajes</div>
                    <p style="margin-top: 30px; color: #666;">
                        Los clientes pueden enviar mensajes a tu WhatsApp
                    </p>
                </div>
            </body>
            </html>
        `);
    } else if (qrCodeData) {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Bot WhatsApp - Escanear QR</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    }
                    .container {
                        background: white;
                        padding: 40px;
                        border-radius: 20px;
                        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                        text-align: center;
                        max-width: 500px;
                    }
                    h1 {
                        color: #25D366;
                        margin-bottom: 10px;
                    }
                    .subtitle {
                        color: #666;
                        margin-bottom: 30px;
                    }
                    .qr-container {
                        background: #f5f5f5;
                        padding: 20px;
                        border-radius: 15px;
                        margin: 20px 0;
                    }
                    img {
                        max-width: 300px;
                        width: 100%;
                        height: auto;
                    }
                    .instructions {
                        text-align: left;
                        background: #f9f9f9;
                        padding: 20px;
                        border-radius: 10px;
                        margin-top: 20px;
                    }
                    .instructions ol {
                        margin: 10px 0;
                        padding-left: 20px;
                    }
                    .instructions li {
                        margin: 8px 0;
                    }
                    .refresh-btn {
                        background: #25D366;
                        color: white;
                        border: none;
                        padding: 12px 30px;
                        border-radius: 8px;
                        font-size: 16px;
                        cursor: pointer;
                        margin-top: 20px;
                    }
                    .refresh-btn:hover {
                        background: #128C7E;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🤖 Bot de WhatsApp</h1>
                    <p class="subtitle">Escanea este código QR para conectar</p>
                    
                    <div class="qr-container">
                        <img src="${qrCodeData}" alt="QR Code" />
                    </div>
                    
                    <div class="instructions">
                        <strong>📱 Pasos para conectar:</strong>
                        <ol>
                            <li>Abre <strong>WhatsApp</strong> en tu teléfono</li>
                            <li>Ve a <strong>Menú (⋮)</strong> → <strong>Dispositivos vinculados</strong></li>
                            <li>Toca <strong>"Vincular un dispositivo"</strong></li>
                            <li>Escanea este código QR</li>
                        </ol>
                    </div>
                    
                    <button class="refresh-btn" onclick="location.reload()">
                        🔄 Actualizar página
                    </button>
                    
                    <p style="margin-top: 20px; color: #999; font-size: 14px;">
                        El código QR se actualiza automáticamente
                    </p>
                </div>
                
                <script>
                    // Auto-refresh cada 5 segundos para ver si ya está conectado
                    setTimeout(() => location.reload(), 5000);
                </script>
            </body>
            </html>
        `);
    } else {
        res.send(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Bot WhatsApp - Iniciando</title>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                        margin: 0;
                        background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
                    }
                    .container {
                        background: white;
                        padding: 40px;
                        border-radius: 20px;
                        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
                        text-align: center;
                    }
                    .loader {
                        border: 5px solid #f3f3f3;
                        border-top: 5px solid #25D366;
                        border-radius: 50%;
                        width: 50px;
                        height: 50px;
                        animation: spin 1s linear infinite;
                        margin: 20px auto;
                    }
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>⏳ Iniciando Bot...</h1>
                    <div class="loader"></div>
                    <p>Espera unos segundos mientras el bot se conecta</p>
                    <p style="color: #666; font-size: 14px; margin-top: 20px;">
                        La página se actualizará automáticamente
                    </p>
                </div>
                <script>
                    setTimeout(() => location.reload(), 3000);
                </script>
            </body>
            </html>
        `);
    }
});

// Iniciar servidor web
app.listen(PORT, () => {
    console.log(`🌐 Servidor web corriendo en puerto ${PORT}`);
    console.log(`📱 Abre esta URL para ver el código QR: http://localhost:${PORT}`);
    console.log(`☁️  En Railway/Render, la URL será proporcionada automáticamente`);
});

// Inicializar el cliente de WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Menú del negocio
const MENU = {
    empanadas: [
        { id: 1, nombre: 'Empanada de Carne', precio: 50 },
        { id: 2, nombre: 'Empanada de Pollo', precio: 50 },
        { id: 3, nombre: 'Empanada de Queso', precio: 45 },
        { id: 4, nombre: 'Empanada de Jamón y Queso', precio: 55 },
        { id: 5, nombre: 'Empanada de Res Mechada', precio: 60 }
    ],
    hamburguesas: [
        { id: 6, nombre: 'Hamburguesa Clásica', precio: 120 },
        { id: 7, nombre: 'Hamburguesa con Queso', precio: 140 },
        { id: 8, nombre: 'Hamburguesa Doble Carne', precio: 180 },
        { id: 9, nombre: 'Hamburguesa BBQ', precio: 160 },
        { id: 10, nombre: 'Hamburguesa Especial de la Casa', precio: 200 }
    ],
    bebidas: [
        { id: 11, nombre: 'Refresco', precio: 30 },
        { id: 12, nombre: 'Agua', precio: 20 },
        { id: 13, nombre: 'Jugo Natural', precio: 40 }
    ]
};

// Almacenar pedidos temporales por usuario
const pedidosActivos = {};

// Generar código QR
client.on('qr', async (qr) => {
    console.log('📱 Código QR recibido');
    // Convertir QR a imagen base64
    qrCodeData = await qrcode.toDataURL(qr);
    console.log('✅ Código QR disponible en la página web');
});

// Cliente conectado
client.on('ready', () => {
    console.log('✅ Bot de WhatsApp conectado y listo!');
    isReady = true;
    qrCodeData = ''; // Limpiar QR ya que está conectado
});

// Manejo de desconexión
client.on('disconnected', (reason) => {
    console.log('❌ Bot desconectado:', reason);
    isReady = false;
});

// Manejar mensajes
client.on('message', async (message) => {
    const chat = await message.getChat();
    const userId = message.from;
    const texto = message.body.toLowerCase().trim();

    // Comandos principales
    if (texto === 'hola' || texto === 'menu' || texto === 'inicio') {
        await enviarMenuPrincipal(chat);
    }
    else if (texto === '1' || texto === 'empanadas') {
        await enviarMenuEmpanadas(chat);
    }
    else if (texto === '2' || texto === 'hamburguesas') {
        await enviarMenuHamburguesas(chat);
    }
    else if (texto === '3' || texto === 'bebidas') {
        await enviarMenuBebidas(chat);
    }
    else if (texto === 'pedido' || texto === 'ver pedido') {
        await verPedidoActual(chat, userId);
    }
    else if (texto === 'confirmar') {
        await confirmarPedido(chat, userId);
    }
    else if (texto === 'cancelar') {
        await cancelarPedido(chat, userId);
    }
    else if (texto === 'info' || texto === 'informacion') {
        await enviarInformacion(chat);
    }
    else if (texto.startsWith('agregar ')) {
        await agregarProducto(chat, userId, texto);
    }
    else if (texto.startsWith('quitar ')) {
        await quitarProducto(chat, userId, texto);
    }
    else {
        await chat.sendMessage(
            '❓ No entendí tu mensaje.\n\n' +
            'Escribe *MENU* para ver las opciones disponibles.'
        );
    }
});

// Funciones del bot (las mismas que en la versión original)
async function enviarMenuPrincipal(chat) {
    const mensaje = 
        '🍔 *BIENVENIDO A NUESTRO NEGOCIO* 🥟\n\n' +
        '¿Qué te gustaría pedir hoy?\n\n' +
        '1️⃣ *Empanadas*\n' +
        '2️⃣ *Hamburguesas*\n' +
        '3️⃣ *Bebidas*\n\n' +
        '📝 *Ver Pedido* - Ver tu pedido actual\n' +
        '✅ *Confirmar* - Confirmar tu pedido\n' +
        '❌ *Cancelar* - Cancelar tu pedido\n' +
        'ℹ️ *Info* - Horarios y ubicación\n\n' +
        '_Escribe el número o nombre de la categoría_';
    
    await chat.sendMessage(mensaje);
}

async function enviarMenuEmpanadas(chat) {
    let mensaje = '🥟 *EMPANADAS* 🥟\n\n';
    MENU.empanadas.forEach(item => {
        mensaje += `*${item.id}.* ${item.nombre} - $${item.precio}\n`;
    });
    mensaje += '\n💡 Para agregar usa: *agregar 1 x3*\n';
    mensaje += '(agrega 3 empanadas de carne)\n\n';
    mensaje += 'Escribe *MENU* para volver';
    
    await chat.sendMessage(mensaje);
}

async function enviarMenuHamburguesas(chat) {
    let mensaje = '🍔 *HAMBURGUESAS* 🍔\n\n';
    MENU.hamburguesas.forEach(item => {
        mensaje += `*${item.id}.* ${item.nombre} - $${item.precio}\n`;
    });
    mensaje += '\n💡 Para agregar usa: *agregar 6 x2*\n';
    mensaje += '(agrega 2 hamburguesas clásicas)\n\n';
    mensaje += 'Escribe *MENU* para volver';
    
    await chat.sendMessage(mensaje);
}

async function enviarMenuBebidas(chat) {
    let mensaje = '🥤 *BEBIDAS* 🥤\n\n';
    MENU.bebidas.forEach(item => {
        mensaje += `*${item.id}.* ${item.nombre} - $${item.precio}\n`;
    });
    mensaje += '\n💡 Para agregar usa: *agregar 11 x1*\n';
    mensaje += '(agrega 1 refresco)\n\n';
    mensaje += 'Escribe *MENU* para volver';
    
    await chat.sendMessage(mensaje);
}

async function agregarProducto(chat, userId, texto) {
    const match = texto.match(/agregar\s+(\d+)\s+x(\d+)/);
    
    if (!match) {
        await chat.sendMessage(
            '❌ Formato incorrecto.\n' +
            'Usa: *agregar [número] x[cantidad]*\n' +
            'Ejemplo: agregar 1 x3'
        );
        return;
    }

    const productoId = parseInt(match[1]);
    const cantidad = parseInt(match[2]);
    const producto = encontrarProducto(productoId);
    
    if (!producto) {
        await chat.sendMessage('❌ Producto no encontrado. Verifica el número.');
        return;
    }

    if (!pedidosActivos[userId]) {
        pedidosActivos[userId] = [];
    }

    const index = pedidosActivos[userId].findIndex(p => p.id === productoId);
    if (index >= 0) {
        pedidosActivos[userId][index].cantidad += cantidad;
    } else {
        pedidosActivos[userId].push({
            ...producto,
            cantidad: cantidad
        });
    }

    await chat.sendMessage(
        `✅ *Agregado al pedido:*\n` +
        `${cantidad}x ${producto.nombre}\n\n` +
        `Escribe *Ver Pedido* para revisar tu orden`
    );
}

async function quitarProducto(chat, userId, texto) {
    const match = texto.match(/quitar\s+(\d+)/);
    
    if (!match || !pedidosActivos[userId]) {
        await chat.sendMessage('❌ Formato incorrecto o no tienes productos.\nUsa: *quitar [número]*');
        return;
    }

    const productoId = parseInt(match[1]);
    const index = pedidosActivos[userId].findIndex(p => p.id === productoId);

    if (index >= 0) {
        const producto = pedidosActivos[userId][index];
        pedidosActivos[userId].splice(index, 1);
        await chat.sendMessage(`✅ ${producto.nombre} eliminado del pedido`);
    } else {
        await chat.sendMessage('❌ Ese producto no está en tu pedido');
    }
}

async function verPedidoActual(chat, userId) {
    if (!pedidosActivos[userId] || pedidosActivos[userId].length === 0) {
        await chat.sendMessage('🛒 Tu pedido está vacío.\n\nEscribe *MENU* para comenzar a ordenar.');
        return;
    }

    let mensaje = '🛒 *TU PEDIDO ACTUAL:*\n\n';
    let total = 0;

    pedidosActivos[userId].forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += `${item.cantidad}x ${item.nombre}\n`;
        mensaje += `   $${item.precio} c/u = $${subtotal}\n\n`;
    });

    mensaje += `💰 *TOTAL: $${total}*\n\n`;
    mensaje += '✅ Escribe *CONFIRMAR* para finalizar\n';
    mensaje += '❌ Escribe *CANCELAR* para borrar todo\n';
    mensaje += '➕ Escribe *MENU* para agregar más';

    await chat.sendMessage(mensaje);
}

async function confirmarPedido(chat, userId) {
    if (!pedidosActivos[userId] || pedidosActivos[userId].length === 0) {
        await chat.sendMessage('❌ No tienes ningún pedido activo.');
        return;
    }

    let mensaje = '✅ *PEDIDO CONFIRMADO*\n\n';
    let total = 0;

    pedidosActivos[userId].forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        mensaje += `${item.cantidad}x ${item.nombre} - $${subtotal}\n`;
    });

    mensaje += `\n💰 *Total a pagar: $${total}*\n\n`;
    mensaje += '📍 Ubicación: [Tu dirección aquí]\n';
    mensaje += '⏰ Tiempo estimado: 30-45 minutos\n\n';
    mensaje += '¡Gracias por tu orden! 🎉\n';
    mensaje += 'Nos pondremos en contacto contigo pronto.';

    await chat.sendMessage(mensaje);
    delete pedidosActivos[userId];
}

async function cancelarPedido(chat, userId) {
    if (!pedidosActivos[userId]) {
        await chat.sendMessage('No tienes ningún pedido activo.');
        return;
    }

    delete pedidosActivos[userId];
    await chat.sendMessage('❌ Pedido cancelado.\n\nEscribe *MENU* cuando quieras ordenar de nuevo.');
}

async function enviarInformacion(chat) {
    const mensaje = 
        'ℹ️ *INFORMACIÓN DEL NEGOCIO*\n\n' +
        '📍 *Ubicación:*\n' +
        '[Tu dirección aquí]\n\n' +
        '⏰ *Horarios:*\n' +
        'Lunes a Domingo\n' +
        '11:00 AM - 10:00 PM\n\n' +
        '📱 *Contacto:*\n' +
        'WhatsApp: [Tu número]\n' +
        'Instagram: @tunegocio\n\n' +
        '🚗 *Delivery disponible*\n' +
        'También puedes recoger en local\n\n' +
        'Escribe *MENU* para hacer tu pedido';
    
    await chat.sendMessage(mensaje);
}

function encontrarProducto(id) {
    for (let categoria in MENU) {
        const producto = MENU[categoria].find(p => p.id === id);
        if (producto) return producto;
    }
    return null;
}

// Iniciar el cliente
client.initialize();

console.log('🚀 Bot iniciando...');
console.log('📱 Espera a que se genere el código QR');
