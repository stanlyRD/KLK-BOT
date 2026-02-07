# ☁️ GUÍA: Bot de WhatsApp en la Nube (24/7)

## 🏆 LA MEJOR OPCIÓN: Railway.app

**¿Por qué Railway?**
✅ Muy fácil de usar (el más simple de los 3)
✅ $5 USD de crédito gratis al mes (suficiente para el bot)
✅ Se mantiene encendido 24/7 automáticamente
✅ No pide tarjeta de crédito al inicio
✅ Interfaz moderna y simple

---

## 📊 COMPARACIÓN DE SERVICIOS

| Característica | Railway | Render | Heroku |
|---------------|---------|---------|---------|
| **Facilidad** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Plan Gratuito** | $5/mes crédito | 750 horas/mes | Ya no existe* |
| **Tarjeta requerida** | No (al inicio) | Sí | Sí |
| **Siempre activo** | Sí | Sí** | Sí |
| **Velocidad deploy** | ⚡ Rápido | ⚡ Rápido | 🐢 Medio |
| **Mi recomendación** | 🥇 #1 | 🥈 #2 | 🥉 #3 |

*Heroku eliminó su plan gratuito en 2022
**Render duerme después de 15 min sin uso en plan gratis

---

# 🚀 INSTALACIÓN EN RAILWAY (RECOMENDADO)

## Paso 1: Preparar el código

Primero necesitamos hacer unos pequeños ajustes al bot para que funcione en Railway.

### 1.1 Modificar package.json

Agrega esta línea en la sección "scripts":

```json
{
  "scripts": {
    "start": "node bot-whatsapp.js",
    "railway": "node bot-whatsapp.js"
  },
  "engines": {
    "node": "18.x"
  }
}
```

### 1.2 Crear archivo railway.json

Crea un archivo llamado `railway.json` con este contenido:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

## Paso 2: Crear cuenta en Railway

1. Ve a: **https://railway.app/**
2. Haz clic en **"Start a New Project"** o **"Login"**
3. Regístrate con **GitHub** (es lo más fácil)
   - Si no tienes GitHub, créate una cuenta gratis en https://github.com

## Paso 3: Subir tu código a GitHub

### Opción A: Usando GitHub Desktop (MÁS FÁCIL)

1. Descarga **GitHub Desktop**: https://desktop.github.com/
2. Instálalo y conecta tu cuenta de GitHub
3. Clic en **"File" → "New Repository"**
   - Name: `bot-whatsapp-empanadas`
   - Local path: Selecciona la carpeta de tu bot
4. Clic en **"Create Repository"**
5. Clic en **"Publish repository"** (arriba)
6. ✅ ¡Listo! Tu código está en GitHub

### Opción B: Manualmente por la web

1. Ve a **https://github.com/new**
2. Nombre: `bot-whatsapp-empanadas`
3. Haz clic en **"Create repository"**
4. Sigue las instrucciones para subir archivos
5. Arrastra todos los archivos del bot

## Paso 4: Desplegar en Railway

1. En Railway, haz clic en **"New Project"**
2. Selecciona **"Deploy from GitHub repo"**
3. Autoriza a Railway a acceder a GitHub
4. Selecciona tu repositorio `bot-whatsapp-empanadas`
5. Railway empezará a desplegar automáticamente ⚡

## Paso 5: Ver el código QR

**IMPORTANTE:** Necesitarás ver los logs para obtener el código QR.

1. En Railway, haz clic en tu proyecto
2. Ve a la pestaña **"Deployments"**
3. Haz clic en el deployment activo
4. Selecciona **"View Logs"**
5. Espera a que aparezca el código QR en los logs

**PROBLEMA:** Los códigos QR en texto son difíciles de escanear en Railway.

### SOLUCIÓN: Modificar el bot para generar QR por URL

Voy a darte una versión mejorada que genera un link con el QR.

## Paso 6: Mantener el bot activo

Railway mantiene tu bot funcionando 24/7 automáticamente.

**Créditos:**
- Plan gratuito: $5 USD/mes de crédito
- Tu bot consumirá aproximadamente $3-4/mes
- Suficiente para mantenerlo funcionando sin pagar

---

# 🔧 ALTERNATIVA: Render.com

Si prefieres Render, aquí está el proceso:

## Instalación en Render

1. Ve a **https://render.com/**
2. Regístrate con GitHub
3. Clic en **"New +" → "Web Service"**
4. Conecta tu repositorio de GitHub
5. Configuración:
   - **Name:** bot-whatsapp
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free
6. Clic en **"Create Web Service"**

**NOTA:** Render en plan gratuito "duerme" después de 15 minutos sin actividad, lo cual puede desconectar WhatsApp.

---

# ⚠️ PROBLEMA CON EL CÓDIGO QR EN LA NUBE

Los servicios en la nube no tienen interfaz gráfica para mostrar el QR fácilmente.

## SOLUCIÓN: Bot mejorado con QR por HTTP

Voy a crear una versión que:
1. Genera el QR y lo sirve en una página web
2. Accedes a una URL para escanearlo
3. Mucho más fácil para la nube

¿Quieres que te cree esa versión mejorada?

---

# 💰 COSTOS APROXIMADOS

## Railway (Recomendado)
- **Gratis:** $5 crédito/mes
- **Consumo del bot:** ~$3-4/mes
- **Resultado:** Prácticamente gratis los primeros meses
- **Después:** $5/mes si se acaba el crédito

## Render
- **Gratis:** 750 horas/mes
- **PERO:** Se duerme cada 15 min
- **Resultado:** No ideal para WhatsApp
- **Plan Starter:** $7/mes (sin dormirse)

## Heroku
- **Ya no tiene plan gratuito**
- **Costo mínimo:** $7/mes
- **No recomendado** para empezar

---

# 🎯 MI RECOMENDACIÓN FINAL

**Para tu bot de WhatsApp, usa Railway:**

1. ✅ Es el más fácil
2. ✅ Prácticamente gratis al inicio
3. ✅ No se duerme (importante para WhatsApp)
4. ✅ Muy buena documentación

**Siguiente paso:** ¿Quieres que te cree la versión mejorada del bot con QR por HTTP para que sea más fácil de usar en la nube?

---

# 📞 AYUDA ADICIONAL

Si tienes problemas:
1. Revisa los logs en Railway/Render
2. Asegúrate de que todos los archivos estén en GitHub
3. Verifica que el `package.json` tenga las dependencias correctas

¿Necesitas ayuda con algún paso específico?
