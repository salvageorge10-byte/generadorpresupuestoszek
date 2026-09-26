# Generador de presupuestos · ZEK Webs

Herramienta interna para armar presupuestos de desarrollo web y descargarlos en PDF.

- Escribís el Instagram del cliente, elegís el plan, el monto y la moneda (ARS / USD / EUR).
- Lo que incluye cada plan se marca solo; se pueden sacar o agregar ítems.
- **Descargar PDF** abre el diálogo de impresión → «Guardar como PDF».
- **Recibos:** abrís un presupuesto guardado, elegís «Recibo anticipo» o «Recibo saldo» y sale el
  comprobante con número correlativo, monto en letras y saldo pendiente. No es factura.
- Los presupuestos guardados quedan en el navegador (localStorage), no en un servidor.

HTML + CSS + JS sin build. Para cambiar precios de lista o lo que incluye cada plan:
editar `PLANES` e `ITEMS` en `app.js`.

En Vercel se publica como sitio estático: sin framework, sin comando de build,
directorio de salida la raíz.
