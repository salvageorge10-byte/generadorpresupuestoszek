/* ==========================================================================
   ZEK · Generador de presupuestos
   Todo en el navegador. PLANES e ITEMS son la única fuente de verdad:
   si cambia un precio de lista o lo que incluye un plan, se cambia acá.
   ========================================================================== */

(function () {
  'use strict';

  var CONTACTO = {
    whatsapp: '+54 9 221 671-5279',
    instagram: '@zek.webs',
    web: 'zekwebs.site'
  };

  /* Catálogo de ítems. Los textos de los que ya usaban los presupuestos
     (ej. el de Emanuel) se copiaron tal cual. */
  var GRUPOS = [
    { id: 'diseno',  nombre: 'Diseño y experiencia' },
    { id: 'tienda',  nombre: 'Tienda y gestión' },
    { id: 'presencia', nombre: 'Presencia y contenido' },
    { id: 'acomp',   nombre: 'Acompañamiento' }
  ];

  var ITEMS = [
    { id: 'landing', grupo: 'diseno', titulo: 'Landing page profesional',
      detalle: 'una página con toda la información clave de tu negocio, ordenada para que te escriban.' },
    { id: 'avanzada', grupo: 'diseno', titulo: 'Web avanzada, completa y moderna',
      detalle: 'estructura pensada para transmitir profesionalismo desde el primer vistazo.' },
    { id: 'diseno', grupo: 'diseno', titulo: 'Diseño personalizado',
      detalle: 'hecho para tu negocio desde cero, sin plantillas.' },
    { id: 'responsive', grupo: 'diseno', titulo: 'Diseño adaptado a celulares, tablets y PC',
      detalle: 'se ve y funciona bien en cualquier pantalla.' },
    { id: 'animaciones', grupo: 'diseno', titulo: 'Animaciones avanzadas',
      detalle: 'transiciones y efectos que hacen la navegación más atractiva.' },
    { id: 'personalizacion', grupo: 'diseno', titulo: 'Mayor personalización',
      detalle: 'más margen para adaptar cada sección a tu marca.' },

    { id: 'tiendawa', grupo: 'tienda', titulo: 'Tienda con carrito y pedido por WhatsApp',
      detalle: 'el cliente selecciona los productos, los agrega al carrito y la web lo envía a WhatsApp con el pedido en un mensaje ya preestablecido.' },
    { id: 'tiendaonline', grupo: 'tienda', titulo: 'Tienda online con sistema de ventas',
      detalle: 'catálogo, carrito y ventas desde la misma web.' },
    { id: 'panel', grupo: 'tienda', titulo: 'Panel de administración',
      detalle: 'podés modificar productos, precios, descripciones y más, de forma simple.' },
    { id: 'reservas', grupo: 'tienda', titulo: 'Sistema de reservas o turnos',
      detalle: 'tus clientes reservan desde la web sin tener que escribirte.' },

    { id: 'dominio', grupo: 'presencia', titulo: 'Dominio propio gratis',
      detalle: 'incluido sin costo durante el primer año.' },
    { id: 'seoopt', grupo: 'presencia', titulo: 'SEO optimizado',
      detalle: 'la web preparada para que Google la encuentre y la muestre bien.' },
    { id: 'seoav', grupo: 'presencia', titulo: 'SEO avanzado',
      detalle: 'optimización profunda para que tu negocio aparezca en las búsquedas de Google.' },
    { id: 'whatsapp', grupo: 'presencia', titulo: 'Botón directo a WhatsApp',
      detalle: 'contacto inmediato desde cualquier sección del sitio.' },
    { id: 'info', grupo: 'presencia', titulo: 'Información del negocio',
      detalle: 'horarios, ubicación, datos de contacto, galería de fotos y acceso a tus redes.' },

    { id: 'soporte15', grupo: 'acomp', titulo: '15 días de soporte',
      detalle: 'ayuda con cambios y consultas después de la entrega.' },
    { id: 'soporte30', grupo: 'acomp', titulo: '30 días de soporte',
      detalle: 'ayuda con cambios y consultas después de la entrega.' }
  ];

  /* Precios de lista en pesos (hoja de planes 2026). El monto de cada
     presupuesto se escribe a mano; esto solo lo precarga. */
  var PLANES = [
    { id: 'basico', nombre: 'Plan Básico', corto: 'Básico', precio: 149000,
      bajada: 'Una landing page profesional para que tu negocio tenga presencia online.',
      items: ['landing', 'diseno', 'responsive', 'whatsapp', 'info'],
      resumen: 'Desarrollo de una landing page a medida, adaptada a cualquier dispositivo, con la información clave del negocio, galería de fotos y contacto directo por WhatsApp.' },
    { id: 'profesional', nombre: 'Plan Profesional', corto: 'Profesional', precio: 219000,
      bajada: 'Una web avanzada y moderna, con dominio propio y SEO optimizado.',
      items: ['avanzada', 'diseno', 'responsive', 'animaciones', 'dominio', 'seoopt', 'whatsapp', 'info', 'soporte15'],
      resumen: 'Desarrollo de un sitio web a medida, moderno y adaptado a cualquier dispositivo, con dominio propio el primer año, SEO optimizado y 15 días de soporte después de la entrega.' },
    { id: 'premium', nombre: 'Plan Premium', corto: 'Premium', precio: 329000,
      bajada: 'Web completa con tienda online y sistema de reservas o turnos.',
      items: ['avanzada', 'diseno', 'responsive', 'animaciones', 'personalizacion', 'tiendaonline', 'reservas', 'dominio', 'seoav', 'whatsapp', 'info', 'soporte30'],
      resumen: 'Desarrollo de un sitio web a medida con tienda online y sistema de reservas o turnos, adaptado a cualquier dispositivo, con dominio propio el primer año, SEO avanzado y 30 días de soporte después de la entrega.' },
    { id: 'completo', nombre: 'Plan Completo', corto: 'Tienda WhatsApp', precio: 290000,
      bajada: 'Una web avanzada, moderna y lista para recibir pedidos por WhatsApp.',
      items: ['avanzada', 'responsive', 'animaciones', 'tiendawa', 'panel', 'dominio', 'seoav', 'whatsapp', 'info', 'soporte30'],
      resumen: 'Desarrollo de un sitio web a medida, moderno y adaptado a cualquier dispositivo, con una tienda con carrito que envía cada pedido a WhatsApp y un panel propio para actualizar productos, precios e información sin depender de nadie.' },
    { id: 'custom', nombre: 'Plan a medida', corto: 'A medida', precio: null,
      bajada: '',
      items: ['diseno', 'responsive', 'whatsapp'],
      resumen: 'Desarrollo de un sitio web a medida, adaptado a cualquier dispositivo.' }
  ];

  var MONEDAS = {
    ARS: { simbolo: '$', nombre: 'pesos argentinos' },
    USD: { simbolo: 'US$', nombre: 'dólares estadounidenses' },
    EUR: { simbolo: '€', nombre: 'euros' }
  };

  var LS_DRAFT = 'zek-presupuestos:borrador';
  var LS_SAVED = 'zek-presupuestos:guardados';

  /* ---------------- estado ---------------- */

  var state;

  function hoyISO() {
    var d = new Date();
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 10);
  }

  function pagoPorDefecto(conDominio) {
    return conDominio
      ? '50% al inicio para comenzar el desarrollo y registrar el dominio; 50% restante contra la entrega final del sitio.'
      : '50% al inicio para comenzar el desarrollo; 50% restante contra la entrega final del sitio.';
  }

  function planPorId(id) {
    for (var i = 0; i < PLANES.length; i++) if (PLANES[i].id === id) return PLANES[i];
    return PLANES[0];
  }

  function estadoDesdePlan(planId, base) {
    var p = planPorId(planId);
    var s = base || {};
    s.plan = p.id;
    s.planNombre = p.nombre;
    s.planBajada = p.bajada;
    s.items = p.items.slice();
    s.resumen = p.resumen;
    if (s.moneda === undefined) s.moneda = 'ARS';
    s.monto = (p.precio !== null && s.moneda === 'ARS') ? String(p.precio) : (s.montoManual ? s.monto : '');
    s.montoManual = false;
    if (!s.pagoManual) s.pago = pagoPorDefecto(s.items.indexOf('dominio') !== -1);
    return s;
  }

  function estadoNuevo() {
    return estadoDesdePlan('completo', {
      id: null,
      instagram: '',
      nombre: '',
      moneda: 'ARS',
      fecha: hoyISO(),
      validez: '15',
      plazo: '',
      extras: [],
      pagoManual: false
    });
  }

  /* ---------------- utilidades ---------------- */

  function esc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function limpiarInstagram(v) {
    v = String(v || '').trim();
    var m = v.match(/instagram\.com\/([A-Za-z0-9._]+)/i);
    if (m) v = m[1];
    v = v.replace(/^@+/, '').replace(/[/?#].*$/, '').trim();
    return v ? '@' + v : '';
  }

  function parseMonto(v) {
    // acepta "290000", "290.000", "1.250,50", "1250.5"
    v = String(v || '').replace(/[^\d.,]/g, '');
    if (!v) return null;
    if (v.indexOf(',') !== -1) v = v.replace(/\./g, '').replace(',', '.');
    else if ((v.match(/\./g) || []).length > 1 || /\.\d{3}$/.test(v)) v = v.replace(/\./g, '');
    var n = parseFloat(v);
    return isFinite(n) ? n : null;
  }

  function formatoMonto(n, moneda) {
    if (n == null) return '—';
    var decimales = Math.round(n) === n ? 0 : 2;
    var num = new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: decimales, maximumFractionDigits: decimales
    }).format(n);
    var sim = MONEDAS[moneda].simbolo;
    return moneda === 'ARS' ? sim + num : sim + ' ' + num;
  }

  function fechaLarga(iso) {
    if (!iso) return '';
    var p = iso.split('-');
    var d = new Date(+p[0], +p[1] - 1, +p[2]);
    return d.toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function leer(key, def) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : def; }
    catch (e) { return def; }
  }
  function escribir(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); return true; }
    catch (e) { return false; }
  }

  /* ---------------- formulario ---------------- */

  var form = document.getElementById('form');
  var $ = function (id) { return document.getElementById(id); };

  function pintarPlanes() {
    $('plans').innerHTML = PLANES.map(function (p) {
      var precio = p.precio !== null ? formatoMonto(p.precio, 'ARS') : 'Precio libre';
      return '<button type="button" class="plan-opt" data-plan="' + p.id + '" aria-pressed="' + (state.plan === p.id) + '">' +
        '<b>' + esc(p.corto) + '</b><span>' + esc(precio) + '</span></button>';
    }).join('');
  }

  function pintarItems() {
    var html = GRUPOS.map(function (g) {
      var filas = ITEMS.filter(function (it) { return it.grupo === g.id; }).map(function (it) {
        var on = state.items.indexOf(it.id) !== -1;
        return '<label class="check"><input type="checkbox" data-item="' + it.id + '"' + (on ? ' checked' : '') + '>' +
          '<span>' + esc(it.titulo) + '</span></label>';
      }).join('');
      return '<div class="item-grp"><p>' + esc(g.nombre) + '</p>' + filas + '</div>';
    }).join('');

    if (state.extras.length) {
      html += '<div class="item-grp"><p>Agregados</p>' + state.extras.map(function (x, i) {
        return '<div class="check extra-row"><span>' + esc(x.titulo) + '</span>' +
          '<button type="button" class="link" data-quitar="' + i + '">Quitar</button></div>';
      }).join('') + '</div>';
    }
    $('items').innerHTML = html;
  }

  function volcarFormulario() {
    form.instagram.value = state.instagram;
    form.nombre.value = state.nombre;
    form.planNombre.value = state.planNombre;
    form.planBajada.value = state.planBajada;
    form.monto.value = state.monto;
    form.querySelector('input[name="moneda"][value="' + state.moneda + '"]').checked = true;
    form.resumen.value = state.resumen;
    form.fecha.value = state.fecha;
    form.validez.value = state.validez;
    form.plazo.value = state.plazo;
    form.pago.value = state.pago;
    pintarPlanes();
    pintarItems();
    pintarPrecioLista();
  }

  function pintarPrecioLista() {
    var p = planPorId(state.plan);
    $('precioLista').textContent = p.precio !== null
      ? 'Precio de lista del plan: ' + formatoMonto(p.precio, 'ARS') + '. Escribí el monto que le querés cobrar.'
      : 'Plan a medida: escribí el monto que le querés cobrar.';
  }

  form.addEventListener('input', function (e) {
    var t = e.target;
    if (t.dataset.item) {
      var id = t.dataset.item;
      if (t.checked) { if (state.items.indexOf(id) === -1) state.items.push(id); }
      else state.items = state.items.filter(function (x) { return x !== id; });
      if (id === 'dominio' && !state.pagoManual) {
        state.pago = pagoPorDefecto(t.checked);
        form.pago.value = state.pago;
      }
    } else if (t.name === 'moneda') {
      state.moneda = t.value;
    } else if (t.name && t.name in state) {
      state[t.name] = t.value;
      if (t.name === 'monto') state.montoManual = true;
      if (t.name === 'pago') state.pagoManual = true;
    }
    render();
  });

  form.instagram.addEventListener('blur', function () {
    var v = limpiarInstagram(form.instagram.value);
    form.instagram.value = v;
    state.instagram = v;
    render();
  });

  $('plans').addEventListener('click', function (e) {
    var b = e.target.closest('[data-plan]');
    if (!b) return;
    estadoDesdePlan(b.dataset.plan, state);
    volcarFormulario();
    render();
  });

  $('items').addEventListener('click', function (e) {
    var b = e.target.closest('[data-quitar]');
    if (!b) return;
    state.extras.splice(+b.dataset.quitar, 1);
    pintarItems();
    render();
  });

  $('extraAdd').addEventListener('click', function () {
    var t = $('extraTitulo').value.trim();
    if (!t) { $('extraTitulo').focus(); return; }
    state.extras.push({ titulo: t, detalle: $('extraDetalle').value.trim() });
    $('extraTitulo').value = '';
    $('extraDetalle').value = '';
    pintarItems();
    render();
  });

  $('resumenReset').addEventListener('click', function () {
    state.resumen = planPorId(state.plan).resumen;
    form.resumen.value = state.resumen;
    render();
  });

  /* ---------------- documento ---------------- */

  function render() {
    var s = state;
    var monto = parseMonto(s.monto);
    var conDominio = s.items.indexOf('dominio') !== -1;
    var cliente = s.nombre && s.instagram
      ? esc(s.nombre) + ' <span class="d-ig">' + esc(s.instagram) + '</span>'
      : esc(s.nombre || s.instagram || '—');

    var grupos = GRUPOS.map(function (g) {
      var lis = ITEMS.filter(function (it) {
        return it.grupo === g.id && s.items.indexOf(it.id) !== -1;
      }).map(function (it) {
        return '<li><b>' + esc(it.titulo) + '</b> — ' + esc(it.detalle) + '</li>';
      });
      if (!lis.length) return '';
      return '<div class="d-grp"><h3>' + esc(g.nombre) + '</h3><ul>' + lis.join('') + '</ul></div>';
    }).join('');

    if (s.extras.length) {
      grupos += '<div class="d-grp"><h3>Adicionales</h3><ul>' + s.extras.map(function (x) {
        return '<li><b>' + esc(x.titulo) + '</b>' + (x.detalle ? ' — ' + esc(x.detalle) : '') + '</li>';
      }).join('') + '</ul></div>';
    }

    var cond = [];
    if (s.pago.trim()) cond.push('<li><b>Forma de pago</b> — ' + esc(s.pago.trim()) + '</li>');
    cond.push('<li><b>Pago único</b> — el monto corresponde al desarrollo completo del sitio, expresado en ' + MONEDAS[s.moneda].nombre + '.</li>');
    if (s.plazo.trim()) cond.push('<li><b>Plazo de entrega</b> — ' + esc(s.plazo.trim()) + '.</li>');
    if (conDominio) cond.push('<li><b>Dominio</b> — incluido el primer año; la renovación a partir del segundo año queda a cargo del cliente.</li>');

    var validez = parseInt(s.validez, 10);

    $('doc').innerHTML =
      '<header class="d-head">' +
        '<div class="d-brand"><img src="assets/zek-logo-white-2026.png" alt=""><span>ZEK WEBS</span></div>' +
        '<h1>Presupuesto de desarrollo web</h1>' +
        '<p>Todo lo que incluye tu sitio web, en un solo plan.</p>' +
      '</header>' +

      '<dl class="d-meta">' +
        '<div><dt>Preparado para</dt><dd>' + cliente + '</dd></div>' +
        '<div><dt>Presentado por</dt><dd>ZEK Webs</dd></div>' +
        '<div><dt>Fecha</dt><dd>' + esc(fechaLarga(s.fecha)) + '</dd></div>' +
        (validez > 0 ? '<div><dt>Validez</dt><dd>' + validez + (validez === 1 ? ' día' : ' días') + '</dd></div>' : '') +
      '</dl>' +

      (s.resumen.trim() ? '<section class="d-sec"><h2>Resumen de la propuesta</h2><p>' + esc(s.resumen.trim()) + '</p></section>' : '') +

      '<section class="d-plan">' +
        '<div class="d-plan-name"><h2>' + esc(s.planNombre || 'Plan') + '</h2>' +
          (s.planBajada ? '<p>' + esc(s.planBajada) + '</p>' : '') + '</div>' +
        '<div class="d-plan-price"><strong' + (monto == null ? ' class="empty"' : '') + '>' + esc(formatoMonto(monto, s.moneda)) + '</strong>' +
          '<span>Pago único · ' + s.moneda + '</span></div>' +
      '</section>' +

      '<section class="d-items">' + (grupos || '<p class="d-empty">Marcá al menos un ítem.</p>') + '</section>' +

      '<section class="d-sec"><h2>Forma de pago y condiciones</h2><ul class="d-cond">' + cond.join('') + '</ul></section>' +

      '<footer class="d-foot">' +
        '<p>Quedamos a disposición para cualquier consulta.</p>' +
        '<p class="d-contact"><span>WhatsApp <b>' + CONTACTO.whatsapp + '</b></span>' +
        '<span>Instagram <b>' + CONTACTO.instagram + '</b></span>' +
        '<span><b>' + CONTACTO.web + '</b></span></p>' +
      '</footer>';

    escribir(LS_DRAFT, state);
  }

  /* ---------------- guardar, cargar, PDF ---------------- */

  function aviso(t) {
    $('status').textContent = t;
    clearTimeout(aviso.t);
    aviso.t = setTimeout(function () { $('status').textContent = ''; }, 3500);
  }

  function pintarGuardados() {
    var lista = leer(LS_SAVED, []);
    if (!lista.length) {
      $('savedList').innerHTML = '<li class="empty">Todavía no guardaste ninguno.</li>';
      return;
    }
    $('savedList').innerHTML = lista.map(function (q) {
      return '<li><button type="button" class="saved-open" data-abrir="' + q.id + '">' +
        '<b>' + esc(q.instagram || q.nombre || 'Sin cliente') + '</b>' +
        '<span>' + esc(q.planNombre) + ' · ' + esc(formatoMonto(parseMonto(q.monto), q.moneda)) + ' · ' + esc(fechaLarga(q.fecha)) + '</span>' +
        '</button><button type="button" class="link" data-borrar="' + q.id + '" aria-label="Borrar presupuesto de ' + esc(q.instagram) + '">Borrar</button></li>';
    }).join('');
  }

  $('save').addEventListener('click', function () {
    if (!state.instagram && !state.nombre) { aviso('Poné el Instagram del cliente antes de guardar.'); form.instagram.focus(); return; }
    var lista = leer(LS_SAVED, []);
    if (!state.id) state.id = Date.now().toString(36);
    var copia = JSON.parse(JSON.stringify(state));
    lista = lista.filter(function (q) { return q.id !== state.id; });
    lista.unshift(copia);
    aviso(escribir(LS_SAVED, lista) ? 'Guardado.' : 'No se pudo guardar en este navegador.');
    pintarGuardados();
  });

  $('savedList').addEventListener('click', function (e) {
    var a = e.target.closest('[data-abrir]');
    var b = e.target.closest('[data-borrar]');
    var lista = leer(LS_SAVED, []);
    if (a) {
      var q = lista.filter(function (x) { return x.id === a.dataset.abrir; })[0];
      if (q) { state = q; volcarFormulario(); render(); aviso('Abierto el de ' + (q.instagram || q.nombre) + '.'); }
    } else if (b) {
      if (!confirm('¿Borrar este presupuesto guardado?')) return;
      escribir(LS_SAVED, lista.filter(function (x) { return x.id !== b.dataset.borrar; }));
      if (state.id === b.dataset.borrar) state.id = null;
      pintarGuardados();
    }
  });

  $('nuevo').addEventListener('click', function () {
    state = estadoNuevo();
    volcarFormulario();
    render();
    form.instagram.focus();
  });

  function imprimir() {
    if (!state.instagram && !state.nombre) { verVista('form'); aviso('Falta el Instagram del cliente.'); form.instagram.focus(); return; }
    if (parseMonto(state.monto) == null) { verVista('form'); aviso('Falta el monto.'); form.monto.focus(); return; }
    // el título es el nombre de archivo que propone "Guardar como PDF"
    var titulo = document.title;
    document.title = 'Presupuesto ZEK - ' + (state.instagram || state.nombre).replace(/^@/, '');
    window.print();
    document.title = titulo;
  }
  $('print').addEventListener('click', imprimir);
  $('printM').addEventListener('click', imprimir);

  /* ---------------- celular: vistas y escala de la hoja ---------------- */

  var mobile = window.matchMedia('(max-width: 1100px)');

  function verVista(v) {
    document.body.dataset.view = v;
    var bs = document.querySelectorAll('.mbar [data-view]');
    for (var i = 0; i < bs.length; i++) bs[i].setAttribute('aria-pressed', String(bs[i].dataset.view === v));
    escalar();
    window.scrollTo(0, 0);
  }

  // la hoja mide 210 mm fijos; en pantallas angostas se reduce entera
  // para verla completa, en vez de desplazarla de costado
  function escalar() {
    var doc = $('doc');
    if (!mobile.matches) { doc.style.removeProperty('--z'); return; }
    var disponible = doc.parentNode.clientWidth - 32;
    if (disponible <= 0) return;
    doc.style.setProperty('--z', Math.min(1, disponible / 794).toFixed(3));
  }

  document.querySelector('.mbar').addEventListener('click', function (e) {
    var b = e.target.closest('[data-view]');
    if (b) verVista(b.dataset.view);
  });
  window.addEventListener('resize', escalar);
  if (mobile.addEventListener) mobile.addEventListener('change', escalar);

  /* ---------------- arranque ---------------- */

  state = leer(LS_DRAFT, null);
  if (!state || !state.items) state = estadoNuevo();
  if (!state.extras) state.extras = [];
  volcarFormulario();
  render();
  pintarGuardados();
  escalar();
})();
