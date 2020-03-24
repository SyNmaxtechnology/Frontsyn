(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<router-outlet></router-outlet>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- ============================================================== -->\n<!-- Main wrapper - style you can find in pages.scss -->\n<!-- ============================================================== -->\n<section id=\"wrapper\" class=\"login-register login-sidebar\" style=\"background-image:url(../assets/images/background/login-register.jpg);\">\n    <div class=\"login-box card\">\n        <div class=\"card-body\">\n            <form class=\"form-horizontal form-material\" id=\"loginform\" action=\"index.html\">\n                <!-- <a href=\"javascript:void(0)\" class=\"text-center db\"><img src=\"../assets/images/logo-icon.png\" alt=\"Home\" /><br/><img src=\"../assets/images/logo-text.png\" alt=\"Home\" /></a>-->\n                <div class=\"form-group m-t-40\">\n                    <div class=\"col-xs-12\">\n                        <input [(ngModel)]=\"objLogin.usuario\" name=\"usuario\" class=\"form-control\" type=\"text\" required=\"\" placeholder=\"Usuario\">\n                    </div>\n                </div>\n                <div class=\"form-group\">\n                    <div class=\"col-xs-12\">\n                        <input [(ngModel)]=\"objLogin.contrasena\" name=\"contrasena\" class=\"form-control\" type=\"password\" required=\"\" placeholder=\"Contraseña\">\n                    </div>\n                </div>\n                <div class=\"form-group row\">\n                    <div class=\"col-md-12\">\n                        <div class=\"checkbox checkbox-primary pull-left p-t-0\">\n                            <input id=\"checkbox-signup\" type=\"checkbox\" class=\"filled-in chk-col-light-blue\">\n\n                        </div>\n                    </div>\n                </div>\n                <div class=\"form-group text-center m-t-20\">\n                    <div class=\"col-xs-12\">\n                        <button class=\"btn btn-info btn-lg btn-block text-uppercase btn-rounded\" (click)=\"autenticarUsuario($event,objLogin)\" type=\"submit\">Iniciar Sesión</button>\n                    </div>\n                </div>\n            </form>\n            <!-- No funciona este codigo pero puede funcionar despues-->\n            <form class=\"form-horizontal\" id=\"recoverform\" action=\"index.html\">\n                <div class=\"form-group \">\n                    <div class=\"col-xs-12\">\n                        <h3>Recover Password</h3>\n                        <p class=\"text-muted\">Enter your Email and instructions will be sent to you! </p>\n                    </div>\n                </div>\n                <div class=\"form-group \">\n                    <div class=\"col-xs-12\">\n                        <input class=\"form-control\" type=\"text\" required=\"\" placeholder=\"Email\">\n                    </div>\n                </div>\n                <div class=\"form-group text-center m-t-20\">\n                    <div class=\"col-xs-12\">\n                        <button class=\"btn btn-primary btn-lg btn-block text-uppercase waves-effect waves-light\" type=\"submit\">Reset</button>\n                    </div>\n                </div>\n            </form>\n            <!-- FIN DE CODIGO DE RECUPERAR CONTRASEÑA-->\n        </div>\n    </div>\n</section>\n<!-- ============================================================== -->\n<!-- End Wrapper -->\n<!-- ============================================================== -->");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/categoria/categoria.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/categoria/categoria.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>Categoría</h1>\n<br>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"form_buscar_categoria\">\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-8\">\n                <input [(ngModel)]=\"query\" name=\"query\" type=\"text\" id=\"query\" class=\"form-control\" placeholder=\"Buscar por código o nombre de la categoría\">\n            </div>\n            <div class=\"form-group col-md-3\">\n                <button type=\"submit\" class=\"btn btn-primary\" (click)=\"buscarCategoria($event,query)\">Buscar</button>\n            </div>\n        </div>\n    </form>\n</div>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"formCategoria\">\n\n        <div class=\"form-group col-md-6\">\n            <label for=\"descripcion\">Descripción</label>\n            <input [(ngModel)]=\"objCategoria.descripcion\" type=\"text\" name=\"descripcion\" id=\"descripcion\" class=\"form-control\">\n        </div>\n        <div class=\"form-group col-md-6\">\n            <label for=\"descripcion\">Código</label>\n            <input [(ngModel)]=\"objCategoria.codigo\" type=\"text\" name=\"codigo\" id=\"codigo\" class=\"form-control\">\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"procesarCategoria($event, objCategoria)\">Guardar</button>\n    </form>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/cliente/cliente.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/cliente/cliente.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>Cliente</h1>\n<br>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"form_buscar_cliente\">\n        <div class=\"form-row\" id=\"buscador_cliente\">\n            <div class=\"form-group col-md-8\">\n                <input [(ngModel)]=\"query\" name=\"query\" type=\"text\" id=\"query\" class=\"form-control\" placeholder=\"Buscar por cédula o nombre de cliente\">\n            </div>\n            <div class=\"form-group col-md-3\">\n                <button type=\"submit\" class=\"btn btn-primary\" (click)=\"buscarCliente($event,query)\">Buscar</button>\n            </div>\n        </div>\n    </form>\n</div>\n<br>\n<br>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"form_cliente\">\n\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm\">\n                    <div class=\"form-group\">\n                        <label for=\"cliente_nombre_comercial\">Nombre Comercial</label>\n                        <input [(ngModel)]=\"objCliente.cliente_nombre_comercial\" type=\"text\" name=\"cliente_nombre_comercial\" id=\"cliente_nombre_comercial\" class=\"form-control\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"cliente_nombre\">Nombre</label>\n                        <input [(ngModel)]=\"objCliente.cliente_nombre\" type=\"text\" name=\"cliente_nombre\" id=\"cliente_nombre\" class=\"form-control\">\n                    </div>\n                </div>\n                <div class=\"col-sm\">\n                    <div class=\"container\">\n                        <div class=\"row\" id=\"seccionExoneracion\">\n                            <div class=\"col-sm\">\n                                <div class=\"custom-control custom-checkbox\">\n                                    <input [(ngModel)]=\"objCliente.exentoIVA\" name=\"exentoIVA\" id=\"exentoIVA\" type=\"checkbox\" class=\"custom-control-input\" id=\"exentoIVA\">\n                                    <label class=\"custom-control-label\" for=\"exentoIVA\">Exento IVA</label>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label>Tipo Exoneracion</label>\n                                    <select [(ngModel)]=\"objCliente.tipoExoneracion\" name=\"tipoExoneracion\" id=\"tipoExoneracion\" class=\"form-control\">\n                                        <option value=\"\" selected>Seleccione</option>\n                                        <option *ngFor=\"let item of listaTipoExoneracion\" [ngValue]=\"item.codigo\">{{item.descripcion}}</option>\n                                    </select>\n                                </div>\n                                <div class=\"form-group\">\n                                    <label>Documento Exoneracion</label>\n                                    <input [(ngModel)]=\"objCliente.documentoExoneracion\" type=\"text\" name=\"documentoExoneracion\" class=\"form-control\" id=\"documentoExoneracion\">\n                                </div>\n                            </div>\n                            <div class=\"col-sm\">\n                                <div class=\"form-group\">\n                                    <label>Porcentaje</label>\n                                    <input [(ngModel)]=\"objCliente.porcentajeExoneracion\" type=\"number\" name=\"porcentajeExoneracion\" id=\"porcentajeExoneracion\" class=\"form-control\">\n                                </div>\n                                <div class=\"form-group\">\n                                    <label>Nombre Institución</label>\n                                    <input [(ngModel)]=\"objCliente.NombreInstitucion\" type=\"text\" name=\"nombreInstitucion\" id=\"nombreInstitucion\" class=\"form-control\">\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-4\">\n                <label for=\"cliente_tipo_identificacion\">Tipo Identificación</label>\n                <select [(ngModel)]=\"objCliente.cliente_tipo_identificacion\" id=\"cliente_tipo_identificacion\" name=\"cliente_tipo_identificacion\" class=\"form-control\">\n                    <option value=\"\" disabled selected>--SELECCIONE--</option>\n                    <option *ngFor=\"let tipo of tipoIdentificacion\" [ngValue]=\"tipo.codigo\">{{tipo.descripcion}}</option>\n                </select>\n            </div>\n            <div class=\"form-group col-md-4\">\n                <label for=\"cedula_cliente\">Cédula Cliente</label>\n                <input [(ngModel)]=\"objCliente.cedula_cliente\" type=\"text\" name=\"cedula_cliente\" id=\"cedula_cliente\" class=\"form-control\">\n            </div>\n            <div class=\"form-group col-md-4\">\n                <label for=\"identificacion_extranjero\">Identifación Extranjero</label>\n                <input [(ngModel)]=\"objCliente.identificacion_extranjero\" type=\"text\" name=\"identificacion_extranjero\" id=\"identificacion_extranjero\" class=\"form-control\">\n            </div>\n\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"provincia\">Provincia</label>\n                <select [(ngModel)]=\"objCliente.provincia\" id=\"provincia\" name=\"provincia\" class=\"form-control\" (change)=\"obtenerCantones()\">\n                    <option value=\"\" disabled selected>--Seleccione--</option>\n                    <option *ngFor=\"let provincia of listaProvincias\" [ngValue]=\"provincia.provincia\">{{provincia.nPro}}</option>\n                </select>\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"canton\">Cantón</label>\n\n                <select [(ngModel)]=\"objCliente.canton\" id=\"canton\" name=\"canton\" class=\"form-control\" (change)=\"obtenerDistritos(objCliente.provincia,objCliente.canton)\">\n                    <option value=\"\" disabled selected>--Seleccione--</option>\n                    <option *ngFor=\"let canton of listaCantones\" [ngValue]=\"canton.canton\">{{canton.nCan}}</option>\n                </select>\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"distrito\">Distrito</label>\n\n                <select [(ngModel)]=\"objCliente.distrito\" id=\"distrito\" name=\"distrito\" class=\"form-control\" (change)=\"obtenerBarrios(objCliente.provincia,objCliente.canton, objCliente.distrito)\">\n                    <option value=\"\" disabled selected>--Seleccione--</option>\n                    <option *ngFor=\"let distrito of listaDistritos\" [ngValue]=\"distrito.distrito\">{{distrito.nDis}}</option>\n                </select>\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"barrio\">Barrio</label>\n\n                <select [(ngModel)]=\"objCliente.cliente_barrio\" id=\"barrio\" name=\"barrio\" class=\"form-control\">\n                    <option value=\"\" disabled selected>--Seleccione--</option>\n                    <option *ngFor=\"let barrio of listaBarrios\" [ngValue]=\"barrio.codigo\">{{barrio.nHac}}</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"otras_senas\">Otrase Señas</label>\n                <input [(ngModel)]=\"objCliente.otras_senas\" type=\"text\" name=\"otras_senas\" id=\"otras_senas\" class=\"form-control\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"otras_senas_extranjero\">Otrase Señas Extranjero</label>\n                <input [(ngModel)]=\"objCliente.otras_senas_extranjero\" type=\"text\" name=\"otras_senas_extranjero\" id=\"otras_senas_extranjero\" class=\"form-control\">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"cliente_telefono_codigopais\">Código País</label>\n                <input type=\"text\" [(ngModel)]=\"objCliente.cliente_telefono_codigopais\" name=\"cliente_telefono_codigopais\" id=\"cliente_telefono_codigopais\" class=\"form-control\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"cliente_telefono_numtelefono\">Teléfono</label>\n                <input [(ngModel)]=\"objCliente.cliente_telefono_numtelefono\" type=\"text\" name=\"cliente_telefono_numtelefono\" id=\"cliente_telefono_numtelefono\" class=\"form-control\">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"cliente_fax_codigopais\">Código País</label>\n                <input [(ngModel)]=\"objCliente.cliente_fax_codigopais\" type=\"text\" name=\"cliente_fax_codigopais\" id=\"cliente_fax_codigopais\" class=\"form-control\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"cliente_fax_numtelefono\">Fax</label>\n                <input [(ngModel)]=\"objCliente.cliente_fax_numtelefono\" type=\"text\" name=\"cliente_fax_numtelefono\" id=\"cliente_fax_numtelefono\" class=\"form-control\">\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"cliente_correo\">Correo</label>\n            <input [(ngModel)]=\"objCliente.cliente_correo\" type=\"text\" name=\"cliente_correo\" id=\"cliente_correo\" class=\"form-control\">\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"procesarCliente($event,objCliente)\">Guardar</button>\n    </form>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/consulta/consulta.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/consulta/consulta.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1><i class=\"fa fa-file-text\"></i>Listado de documentos procesados</h1>\n<hr>\n<br>\n<div class=\"container\">\n    <div class=\"row\">\n        <div class=\"col-sm-12 col-md-6 col-lg-6\">\n            <div class=\"form-group\">\n                <p>\n                    Documento: <select [(ngModel)]=\"objBusquedaFacturas.tipoFactura\" name=\"tipo_factura\" class=\"form-control col-6\">\n                        <option value=\"\" disabled selected>--Documento--</option>\n                        <option *ngFor=\"let item of tiposDocumento\" [value]=\"item.codigo\">{{item.descripcion}}</option>\n                    </select>\n                </p>\n            </div>\n            <div class=\"form-group\">\n                <p>\n                    Fecha Inicio: <input [(ngModel)]=\"objBusquedaFacturas.fechaInicio\" type=\"date\" name=\"fechaInicio\" id=\"fechaInicio\" class=\"form-control col-6\">\n                </p>\n            </div>\n            <div class=\"form-group\">\n                <p>\n                    Fecha Final:&nbsp;&nbsp;<input [(ngModel)]=\"objBusquedaFacturas.fechaFin\" type=\"date\" name=\"fechaFin\" id=\"fechaFin\" class=\"form-control col-6\">\n                </p>\n            </div>\n            <div class=\"form-group\">\n                <p>\n                    ID Interno:&nbsp;&nbsp;&nbsp;<input [(ngModel)]=\"objBusquedaFacturas.numeroInterno\" type=\"text\" name=\"numeroInterno\" id=\"numeroInterno\" class=\"form-control col-6\" placeholder=\"Número Interno\">\n                </p>\n            </div>\n        </div>\n        <div class=\"col-sm-12 col-md-6 col-lg-6\">\n\n            <div class=\"form-group\">\n                <p>\n                    Cliente:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input [(ngModel)]=\"objBusquedaFacturas.nombreCliente\" type=\"text\" name=\"nombreCliente\" id=\"nombreCliente\" class=\"form-control col-6\"\n                        placeholder=\"Nombre cliente\">\n                </p>\n            </div>\n            <div class=\"form-group\">\n                <p>\n                    ID documento:&nbsp;&nbsp;<input [(ngModel)]=\"objBusquedaFacturas.claveNumerica\" type=\"text\" name=\"numeroExterno\" id=\"numeroExterno\" class=\"form-control col-6\" placeholder=\"Número de documento\">\n                </p>\n            </div>\n            <div class=\"form-group\">\n                <p>\n                    Consecutivo:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input [(ngModel)]=\"objBusquedaFacturas.consecutivo\" type=\"text\" name=\"numeroExterno\" id=\"numeroExterno\" class=\"form-control col-6\" placeholder=\"Consecutivo documento\">\n                </p>\n            </div>\n            <button type=\"button\" class=\"btn btn-info mr-1\" (click)=\"buscarFacturas(objBusquedaFacturas)\"><i class=\"fa fa-search\"></i></button>\n            <button type=\"button\" class=\"btn btn-info mr-1\" (click)=\"descargarReporteExcel(arrayComprobantes)\"><i class=\"fa fa-file-excel-o\"></i></button>\n            <button type=\"button\" class=\"btn btn-info\" (click)=\"cargarVistaFacturas(arrayComprobantes)\"><i class=\"fa fa-eye\"></i></button>\n        </div>\n    </div>\n\n</div>\n\n<div class=\"col-12\">\n    <hr>\n    <table class=\"table table-responsive\" id=\"tabla_detalles\">\n        <thead>\n            <tr>\n                <th>Fecha</th>\n                <th>Hora</th>\n                <th>Número Interno</th>\n                <th>Consecutivo</th>\n                <th>Número Documento</th>\n                <th>Cédula Juridica</th>\n                <th>Razón Social</th>\n                <th>Subtotal</th>\n                <th>Impuesto</th>\n                <th>Total</th>\n                <th>Estado</th>\n                <th>Acciones</th>\n            </tr>\n        </thead>\n        <tbody *ngFor=\"let factura of arrayComprobantes\">\n            <tr>\n                <td>\n                    {{factura.fecha | date: 'yyyy-MM-dd'}}\n                </td>\n                <td>\n                    {{factura.hora}}\n                </td>\n                <td>\n                    {{factura.numero_interno}}\n                </td>\n                <td>\n                    {{factura.consecutivo}}\n                </td>\n                <td class=\"col-md-2\">\n                    {{factura.clavenumerica}}\n                </td>\n                <td>\n                    {{factura.cedula_cliente}}\n                </td>\n                <td>\n                    {{factura.cliente_nombre}}\n                </td>\n                <td>\n                    {{factura.subtotal}}\n                </td>\n                <td>\n                    {{factura.totalimpuesto}}\n                </td>\n                <td>\n                    {{factura.totalcomprobante}}\n                </td>\n                <td>\n                    {{factura.status_factura}}\n                </td>\n                <td><button type=\"button\" class=\"btn btn-danger btn-xs mr-1\" (click)=\"descargarPDF(factura.id,'01')\">\n                        <i class=\"fa fa-download\"></i>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-default btn-xs\" (click)=\"anularComprobante(factura.id)\">\n                        <i class=\"fa fa-ban\"></i>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-default btn-xs mr-1\" data-toggle=\"modal\" data-target=\"#ModalCorreos\" (click)=\"cargarFactura(factura.id)\">\n                        <i class=\"fa fa-envelope-o\"></i>\n                    </button>\n                    <button type=\"button\" class=\"btn btn-default btn-xs\" (click)=\"reporteFactura(factura.id)\" data-toggle=\"modal\" data-target=\"#ModalPreFactura\">\n                        <i class=\"fa fa-search-plus\"></i>\n                    </button>\n                </td>\n            </tr>\n        </tbody>\n    </table>\n</div>\n\n\n<!-- MODAL PARA DESCRICION TOTAL DE FACTURA JUNTO CON LAS ORDENES DE CADA FACTURA -->\n\n<div class=\"modal fade\" id=\"ModalPreFactura\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"ModalPreFactura\" aria-hidden=\"true\">\n    <div class=\"modal-dialog modal-lg\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">{{objFacturaResultado.tipoFactura}}</h5>\n            </div>\n            <div class=\"modal-body\">\n\n\n                <p style=\"padding: 0%;\">\n                    <b>Factura: </b>{{this.objFacturaResultado.id}}\n                    <p><b>clave:</b> {{this.objFacturaResultado.clave}}</p>\n                    <p><b>Consecutivo:</b> {{this.objFacturaResultado.consecutivo}}</p>\n                    <p><b>Fecha:</b> {{this.objFacturaResultado.fechaFactura | date: 'yyyy-MM-dd'}}\n                        <p><b>Tipo Cambio:</b> {{this.objFacturaResultado.tipocambio}}\n                        </p>\n\n\n\n                        <div class=\"row\">\n\n                            <!-- tu tabla aquí siempre se verá al 100% en todas las resolcuiones-->\n                            <table class=\"table table-responsive\">\n                                <thead>\n                                    <tr>\n                                        <th>#</th>\n                                        <th>Descripcion</th>\n                                        <th>Cantidad</th>\n                                        <th>Descuento</th>\n                                        <th>Impuesto</th>\n                                        <th>Subtotal</th>\n                                        <th>Total</th>\n                                    </tr>\n                                </thead>\n                                <tbody *ngFor=\"let linea of arrayOrdenes\" id=\"tbody_lineas\">\n                                    <tr>\n                                        <td>\n                                            {{linea.numerolineadetalle}}\n                                        </td>\n                                        <td>\n                                            {{linea.descripcioDetalle}}\n                                        </td>\n                                        <td>\n                                            {{linea.cantidad}}\n                                            <td>\n                                                {{linea.montodescuento}}\n                                            </td>\n                                            <td>\n                                                {{linea.monto}}\n                                            </td>\n                                            <td>\n                                                {{linea.subtotal}}\n                                            </td>\n                                            <td>\n                                                {{linea.montoitotallinea}}\n                                            </td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </div>\n                        <div class=\"row\">\n                            <div class=\"form-group col-md-3\">\n                                Medio Pago\n                                <select [(ngModel)]=\"objFacturaResultado.medioPago\" class=\"form-control\">\n                                <option *ngFor=\"let item of mediosPago\" [ngValue]=\"item.id\">{{item.medio}}</option>\n                            </select>\n                            </div>\n\n                            <div class=\"form-group col-md-3\">\n                                Condicion Venta\n                                <select [(ngModel)]=\"objFacturaResultado.condicionVenta\" class=\"form-control\">\n                                    <option *ngFor=\"let item of condicionesVenta\" [ngValue]=\"item.id\">{{item.condicion}}</option>\n                        </select>\n                            </div>\n                        </div>\n\n                        <p style=\"padding: 0%;\">\n                            <h4>Totales del comprobante</h4>\n                            <h6>Subtotal: {{this.objFacturaResultado.subtotal}}</h6>\n                            <h6>Servicios Gravados: {{this.objFacturaResultado.totalservgravados}}</h6>\n                            <h6>Servicios Exentos: {{this.objFacturaResultado.totalservexentos}}</h6>\n                            <h6>Mercancías Gravadas: {{this.objFacturaResultado.totalmercanciasgravadas}}</h6>\n                            <h6>Mercancías Exentas: {{this.objFacturaResultado.totalmercanciasexentas}}</h6>\n                            <h6>Total Gravado: {{this.objFacturaResultado.totalgravado}}</h6>\n                            <h6>Total Exento: {{this.objFacturaResultado.totalexento}}</h6>\n                            <h6>Total Exonerado: {{this.objFacturaResultado.totalexonerado}}</h6>\n                            <h6>Subtotal: {{this.objFacturaResultado.subtotal}}</h6>\n                            <h6>Descuentos: {{this.objFacturaResultado.descuentoTotal}}</h6>\n                            <h6>Impuestos: {{this.objFacturaResultado.totalimpuesto}}</h6>\n                            <hr>\n                            <p><b>Total Factura:</b> {{this.objFacturaResultado.totalcomprobante}}\n                            </p>\n\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Aceptar</button>\n            </div>\n        </div>\n    </div>\n</div>\n\n\n<!--MODAL PARA ENVIAR CORREOS A 3 DESTINATARIOS -->\n\n<div class=\"modal fade\" id=\"ModalCorreos\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">Enviar Correos</h5>\n            </div>\n            <div class=\"modal-body\">\n                <div class=\"form-group\">\n                    <input type=\"text\" name=\"correo1\" id=\"correo1\" class=\"form-control\" placeholder=\"Correo 1\">\n                </div>\n                <div class=\"form-group\">\n                    <input type=\"text\" name=\"correo2\" id=\"correo2\" class=\"form-control\" placeholder=\"Correo 2\">\n                </div>\n                <div class=\"form-group\">\n                    <input type=\"text\" name=\"correo3\" id=\"correo3\" class=\"form-control\" placeholder=\"Correo 3\">\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"enviarCorreo()\">Enviar</button>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/descuento/descuento.component.html":
/*!************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/descuento/descuento.component.html ***!
  \************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>Descuento</h1>\n<br>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"form_buscar_descuento\">\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-8\">\n                <input [(ngModel)]=\"query\" name=\"query\" type=\"text\" id=\"query\" class=\"form-control\" placeholder=\"Buscar por código o nombre de la categoría\">\n            </div>\n            <div class=\"form-group col-md-3\">\n                <button type=\"submit\" class=\"btn btn-primary\" (click)=\"buscarDescuento($event,query)\">Buscar</button>\n            </div>\n        </div>\n    </form>\n</div>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"formDescuento\">\n\n        <div class=\"form-group col-md-6\">\n            <label for=\"descripcion\">Descripción</label>\n            <input [(ngModel)]=\"objDescuento.descripcion\" type=\"text\" name=\"descripcion\" id=\"descripcion\" class=\"form-control\">\n        </div>\n        <div class=\"form-group col-md-6\">\n            <label for=\"descripcion\">% Descuento</label>\n            <input [(ngModel)]=\"objDescuento.porcentaje\" type=\"number\" name=\"descuento\" id=\"descuento\" class=\"form-control\">\n        </div>\n        <button type=\"submit \" class=\"btn btn-primary \" (click)=\"procesarDescuento($event, objDescuento) \">Guardar</button>\n    </form>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/emisor/emisor.component.html":
/*!******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/emisor/emisor.component.html ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>Emisor</h1>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"formBuscarEmisor\">\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-8\">\n                <input [(ngModel)]=\"query\" name=\"query\" type=\"text\" id=\"query\" class=\"form-control\" placeholder=\"Buscar por cédula o nombre del emisor\">\n            </div>\n            <div class=\"form-group col-md-3\">\n                <button type=\"submit\" class=\"btn btn-primary\" (click)=\"buscarEmisor($event,query)\">Buscar</button>\n            </div>\n        </div>\n    </form>\n</div>\n<br>\n<br>\n<!--<div class=\"wrap\">\n    <ul class=\"tabs\">\n        <li><a href=\"#tab1\"><span class=\"fa fa-home\"></span><span class=\"tab-text\">Información Personal</span></a></li>\n        <li><a href=\"#tab2\"><span class=\"fa fa-group\"></span><span class=\"tab-text\">Información Jurídica</span></a></li>\n        <li><a href=\"#tab3\"><span class=\"fa fa-briefcase\"></span><span class=\"tab-text\">Configuración</span></a></li>\n\n    </ul>\n\n    <div class=\"secciones\">\n        <article id=\"tab1\">\n\n\n        </article>\n        <article id=\"tab2\">\n\n        </article>\n        <article id=\"tab3\">\n\n        </article>\n    </div>\n</div>-->\n\n<div class=\"col-12\">\n    <form method=\"POST\" #formEmisor=\"ngForm\" id=\"formEmisor\">\n\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"emisor_nombre\">Nombre</label>\n                <input [(ngModel)]=\"objEmisor.emisor_nombre\" name=\"emisor_nombre\" type=\"text\" class=\"form-control\" id=\"emisor_nombre\" placeholder=\"Nombre del Emisor\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"emisor_nombre\">Nombre Comercial</label>\n                <input [(ngModel)]=\"objEmisor.emisor_nombrecomercial\" name=\"nombrecomercial\" type=\"text\" class=\"form-control\" id=\"emisor_nombrecomercial\" placeholder=\"Nombre Comercial del Emisor\">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"emisor_nombre\">Tipo de Identificación</label>\n                <select id=\"emisor_tipo_identificacion\" class=\"form-control\" [(ngModel)]=\"objEmisor.tipoIdentificacion\" name=\"tipoIdentificacion\">\n                    <option selected disabled>--Seleccione--</option>\n                    <option *ngFor=\"let tipo of tipoIdentificacion\" [ngValue]=\"tipo.codigo\">{{tipo.descripcion}}</option>\n                </select>\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"emisor_nombre\">Cédula Emisor</label>\n                <input [(ngModel)]=\"objEmisor.emisor_cedula\" name=\"emisor_cedula\" type=\"text\" class=\"form-control\" id=\"emisor_cedula\" placeholder=\"Cédula Emisor\">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"\">Provincia</label>\n                <select [(ngModel)]=\"objEmisor.provincia\" name=\"provincia\" class=\"form-control\" (change)=\"obtenerCantones()\">\n                        <option selected disabled>--Seleccione--</option>\n                        <option *ngFor=\"let provincia of listaProvincias\" [ngValue]=\"provincia.provincia\">{{provincia.nPro}}</option>\n                </select>\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"\">Canton</label>\n                <select [(ngModel)]=\"objEmisor.canton\" name=\"canton=\" class=\"form-control\" (change)=\"obtenerDistritos(objEmisor.provincia,objEmisor.canton)\">\n                    <option selected disabled>--Seleccione--</option>\n                    <option *ngFor=\"let canton of listaCantones\" [ngValue]=\"canton.canton\">{{canton.nCan}}</option>\n                    </select>\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"\">Distrito</label>\n                <select [(ngModel)]=\"objEmisor.distrito\" name=\"distrito=\" id=\"distrito\" class=\"form-control\" (change)=\"obtenerBarrios(objEmisor.provincia,objEmisor.canton,objEmisor.distrito)\">\n                        <option>Seleccione</option>\n                        <option *ngFor=\"let distrito of listaDistritos\" [ngValue]=\"distrito.distrito\">{{distrito.nDis}}</option>\n                    </select>\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"\">Barrio</label>\n                <!---->\n                <select [(ngModel)]=\"objEmisor.barrio\" name=\"barrio\" id=\"barrio\" class=\"form-control\">\n                    <option>Seleccione</option>\n                    <option *ngFor=\"let barrio of listaBarrios\" [ngValue]=\"barrio.codigo\">{{barrio.nHac}}</option>\n                </select>\n            </div>\n        </div>\n\n        <div class=\"form-group\">\n            <label for=\"otras_senas\">Otras Señas</label>\n            <input [(ngModel)]=\"objEmisor.otras_senas\" name=\"otras_senas\" type=\"text\" class=\"form-control\" id=\"otras_senas\" placeholder=\"Otras señas emisor\">\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"tel_codigopais\">Codigo País</label>\n                <input [(ngModel)]=\"objEmisor.tel_codigo_pais\" name=\"tel_codigo_pais\" type=\"text\" class=\"form-control\" id=\"tel_codigopais\" placeholder=\"Código país\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"numtel\">Número de Teléfono</label>\n                <input [(ngModel)]=\"objEmisor.num_telefono\" name=\"num_telefono\" type=\"text\" class=\"form-control\" id=\"num_telefono\" placeholder=\"Número de telefono\">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"fax_codigopais\">Código País</label>\n                <input [(ngModel)]=\"objEmisor.fax_codigo_pais\" name=\"fax_codigo_pais\" type=\"text\" class=\"form-control\" id=\"fax_codigopais\" placeholder=\"Código país\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"fax_numtel\">Número de Fax</label>\n                <input [(ngModel)]=\"objEmisor.fax_num_telefono\" name=\"fax_num_telefono\" type=\"text\" class=\"form-control\" id=\"fax_num_telefono\" placeholder=\"Número de Fax\">\n            </div>\n        </div>\n        <div class=\"form-group\">\n            <label for=\"correo_emisor\">Correo Electrónico</label>\n            <input [(ngModel)]=\"objEmisor.correo\" name=\"correo\" type=\"email\" class=\"form-control\" id=\"correo_emisor\" placeholder=\"Correo Electrónico\">\n        </div>\n        <div class=\" form-row \">\n            <div class=\"form-group col-md-6 \">\n                <label for=\"casamatriz\">Casa Matriz</label>\n                <input [(ngModel)]=\"objEmisor.casamatriz\" name=\"casamatriz\" type=\"text\" class=\"form-control\" id=\"casamatriz\" placeholder=\"Casa Matriz \">\n            </div>\n            <div class=\"form-group col-md-6 \">\n                <label for=\"puntoventa\">Punto Venta</label>\n                <input [(ngModel)]=\"objEmisor.puntoventa\" name=\"puntoventa\" type=\"text\" class=\"form-control\" id=\"puntoventa\" placeholder=\"Punto Venta \">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <form method=\"POST\">\n                    <button data-toggle=\"modal\" data-target=\"#formBuscarActividad\" class=\"form-comtrol col-sm-2 col-md-1 mb-1\">\n                        <i class=\"fa fa-search\"></i>\n                    </button>\n                    <input [(ngModel)]=\"objEmisor.codigo_actividad\" name=\"codigo_actividad\" type=\"number\" id=\"codigo_actividad\" class=\"form-control\" placeholder=\"Código Actividad\">\n                </form>\n\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"codigo_actividad\">Tipo Codigo Servicio</label>\n                <select [(ngModel)]=\"objEmisor.codigo_servicio\" name=\"codigo_servicio\" id=\"codigo_servicio\" class=\"form-control\">\n                    <option>Seleccione</option>\n                    <option *ngFor=\"let servicio of tipoServicio\" [ngValue]=\"servicio.codigo\">{{servicio.tipo_codigo}}</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-4\">\n                <label for=\"client_id\">Client ID</label>\n                <input [(ngModel)]=\"objEmisor.client_id\" name=\"client_id\" type=\"text\" class=\"form-control\" id=\"client_id\" placeholder=\"Client ID\">\n            </div>\n            <div class=\"form-group col-md-4\">\n                <label for=\"API_TOKEN\">API TOKEN</label>\n                <input [(ngModel)]=\"objEmisor.API_TOKEN\" name=\"API_TOKEN\" type=\"text\" class=\"form-control\" id=\"API_TOKEN\" placeholder=\"API TOKEN\">\n            </div>\n            <div class=\"form-group col-md-4\">\n                <label for=\"API\">API</label>\n                <input [(ngModel)]=\"objEmisor.API\" name=\"API\" type=\"text\" class=\"form-control\" id=\"API\" placeholder=\"API\">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"numero_resolucion\">Número de resolución</label>\n                <input [(ngModel)]=\"objEmisor.numero_resolucion\" name=\"numero_resolucion\" type=\"text\" class=\"form-control\" id=\"numero_resolucion\" placeholder=\"Número resolución\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"fecha_resolucion\">Fecha resolución</label>\n                <input [(ngModel)]=\"objEmisor.fecha_resolucion\" name=\"fecha_resolucion\" type=\"text\" class=\"form-control\" id=\"fecha_resolucion\" placeholder=\"Fecha resolución\">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"user_hacienda\">Usuario Hacienda</label>\n                <input [(ngModel)]=\"objEmisor.user_hacienda\" name=\"user_hacienda\" type=\"text\" class=\"form-control\" id=\"user_hacienda\" placeholder=\"Usuario Hacienda\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"password_hacienda\">Contraseña</label>\n                <input [(ngModel)]=\"objEmisor.password_hacienda\" name=\"password_hacienda\" type=\"password\" class=\"form-control\" id=\"password_hacienda\" placeholder=\"Password Hacienda\">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"\">Archivo P12</label>\n                <input [(ngModel)]=\"objEmisor.file_p12\" name=\"file_p12\" type=\"file\" class=\"form-control-file\" id=\"file_p12\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"\">Contraseña</label>\n                <input [(ngModel)]=\"objEmisor.contrasenaP12\" name=\"contrasenaP12\" type=\"password\" class=\"form-control\" id=\"contrasenaP12\" placeholder=\"Contraseña archivo p12\">\n            </div>\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"procesarEmisor($event,objEmisor)\">Guardar</button>\n    </form>\n</div>\n\n\n<div class=\"modal fade\" id=\"formBuscarActividad\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <h5 class=\"modal-title\">Buscar Actividad</h5>\n            </div>\n            <div class=\"modal-body\">\n                <form method=\"POST\" id=\"formActividad\">\n                    <div class=\"form-group\">\n                        <label for=\"cedula\" class=\"col-form-label\">Cédula Emisor:</label>\n                        <input [(ngModel)]=\"objDataActividad.cedula\" name=\"cedula\" type=\"text\" class=\"form-control\" id=\"cedula\">\n                        <button type=\"submit\" class=\"btn btn-primary mt-1\" (click)=\"obtenerActividades($event,objDataActividad.cedula)\">Buscar</button>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"nombre\" class=\"col-form-label\">Nombre:</label>\n                        <input [(ngModel)]=\"objDataActividad.nombre\" name=\"nombre\" type=\"text\" class=\"form-control\" id=\"nombre\" readonly>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"descripcion\" class=\"col-form-label\">Descripcion:</label>\n                        <input [(ngModel)]=\"objDataActividad.descripcion\" name=\"descripcion\" type=\"text\" class=\"form-control\" id=\"descripcion\" readonly>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"codigo\" class=\"col-form-label\">Código:</label>\n                        <input [(ngModel)]=\"objDataActividad.codigo\" name=\"codigo\" type=\"text\" class=\"form-control\" id=\"codigo\" readonly>\n                    </div>\n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancelar</button>\n                <button type=\"button\" class=\"btn btn-primary\" (click)=\"cargarActividad(objDataActividad.codigo)\">Cargar</button>\n            </div>\n        </div>\n    </div>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/factura/factura.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/factura/factura.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1><i class=\"fa fa-file-text\"></i> Crear Documento</h1>\n<hr>\n<br>\n<div class=\"container\">\n    <!-- Stack the columns on mobile by making one full-width and the other half-width -->\n    <div class=\"row\">\n        <div class=\"col-12 col-md-8\">\n            <div class=\"form-row\">\n                <div class=\"form-group col-md-11\">\n                    <h3>Datos del Cliente</h3>\n                    <input type=\"text\" name=\"nombreCliente\" id=\"nombreCliente\" readonly class=\"form-control col-md-11\" placeholder=\"Cliente\">\n                </div>\n                <div class=\"form-group col-md-11\" style=\"align-items:flex-start;\">\n                    <input type=\"text\" name=\"nombreComercialCliente\" id=\"nombreComercialCliente\" readonly class=\"form-control col-md-11\" placeholder=\"Nombre Comercial\">\n                </div>\n                <div class=\"form-group col-md-11\">\n                    <input type=\"text\" name=\"cedulaCliente\" id=\"cedulaCliente\" readonly class=\"form-control col-md-11\" placeholder=\"Cédula\">\n                </div>\n                <div class=\"form-group col-md-11\">\n                    <input type=\"text\" name=\"correoCliente\" id=\"correoCliente\" readonly class=\"form-control col-md-11\" placeholder=\"Correo\">\n                </div>\n                <div class=\"form-group col-md-11\">\n                    <input type=\"text\" name=\"telefonoCliente\" id=\"telefonoCliente\" readonly class=\"form-control col-md-11\" placeholder=\"Teléfono\">\n                </div>\n                <div class=\"form-group col-md-8 mt-0\">\n                    <button type=\"submit\" class=\"btn btn-success col-md-2 mr-1\" data-toggle=\"modal\" data-target=\"#ModalBuscarCliente\">\n                    <i class=\"fa fa-search\"></i>\n                </button>\n                    <button type=\"submit\" class=\"btn btn-danger col-md-2 mr-1\" (click)=\"quitarCliente()\">\n                    <i class=\"fa fa-times-circle-o\"></i>\n                </button>\n                    <button type=\"submit\" class=\"btn btn-primary col-md-2 mr-1\" data-toggle=\"modal\" data-target=\"#ModalNuevoCliente\">\n                    <i class=\"fa fa-user-plus\"></i>\n                </button>\n\n                </div>\n            </div>\n        </div>\n        <div class=\"col-6 col-md-3\" style=\"float: right;\">\n            <div class=\"form-group mb-1\">\n                Fecha: <span>{{fechaActual}}</span>\n            </div>\n            <div class=\"form-group mb-1\">\n                Tipo Cambio: <span>{{objFactura.tipocambio}}</span>\n            </div>\n            <hr>\n            <div class=\"form-group mb-1\">\n                <select [(ngModel)]=\"objFactura.tipo_factura\" name=\"tipo_factura\" class=\"form-control\">\n                 <option value=\"\" disabled selected>--Tipo Documento--</option>\n                  <option *ngFor=\"let item of tipoDocumento\" [value]=\"item.codigo\">{{item.descripcion}}</option>\n                </select>\n            </div>\n            <div class=\"form-group mb-1\">\n                <select [(ngModel)]=\"objFactura.condicion_venta\" name=\"condicion_venta\" class=\"form-control\">\n                  <option value=\"\" disabled selected>--Condición Venta--</option>\n                  <option *ngFor=\"let item of condicionVenta\" [value]=\"item.id\">{{item.condicion}}</option>\n                </select>\n            </div>\n            <div class=\"form-group mb-1\">\n                <select [(ngModel)]=\"objFactura.medio_pago\" name=\"medio_pago\" class=\"form-control\">\n                <option value=\"\" disabled selected>--Medio Pago--</option>\n                <option *ngFor=\"let item of medioPago\" [value]=\"item.id\">{{item.medio}}</option>\n              </select>\n            </div>\n            <div class=\"form-group mb-1\">\n                <select [(ngModel)]=\"objFactura.codigomoneda\" name=\"codigomoneda\" class=\"form-control\">\n              <option value=\"\" disabled selected>--Moneda--</option>\n              <option *ngFor=\"let item of listaMonedas\" [value]=\"item.monedaISO\">{{item.nombreMoneda}}</option>\n            </select>\n            </div>\n        </div>\n    </div>\n    <hr>\n    <div class=\"row\">\n        <div class=\"col-12 col-md-12\">\n            <div class=\"form-row\">\n                <div class=\"form-group col-md-11\">\n                    <input [(ngModel)]=\"objBusquedaProducto.descripcion\" list=\"encodings\" class=\"col-sm-6 custom-select custom-select-sm\" id=\"txt_nombreProducto\" (ngModelChange)=\"buscarProducto(objBusquedaProducto.descripcion);\">\n                    <datalist id=\"encodings\">\n                        <option *ngFor=\"let producto of listaProductos\" [ngValue]=\"producto.idproducto\">{{producto.descripcion}}</option>\n                    </datalist>\n                    <input type=\"number\" name=\"cantidadLinea\" id=\"cantidadLinea\" class=\"form-control col-md-8 mt-2 mb-2\" placeholder=\"Cantidad\">\n                    <select class=\"form-control col-md-8 mt-1\" id=\"descuentoLinea\">\n                      <option value=\"\" selected>--Descuento--</option>\n                      <option *ngFor=\"let item of descuentos\" [ngValue]=\"item.id\">{{item.descripcion}}</option>\n                    </select>\n                </div>\n\n                <div class=\"form-group col-md-8 mt-0\">\n                    <!--<button type=\"submit\" class=\"btn btn-success col-md-2 mr-1\" data-toggle=\"modal\" data-target=\"#ModalBuscarProducto\">\n                    <i class=\"fa fa-search\"></i>\n                  </button>-->\n                    <button type=\"submit\" class=\"btn btn-success col-md-2 mr-1\" (click)=\"cargarDatosLinea();\">\n                    <i class=\"fa fa-cubes\"></i>\n                </button>\n                    <button type=\"submit\" class=\"btn btn-primary col-md-2 mr-1\" data-toggle=\"modal\" data-target=\"#ModalNuevoProducto\">\n                      <i class=\"fa fa-plus\"></i>\n                  </button>\n                </div>\n            </div>\n            <div class=\"form-row\">\n                <h2>Detalles de Comprobante</h2>\n                <table class=\"table table-responsive\" id=\"tabla_detalles\">\n                    <thead>\n                        <tr>\n                            <th>ID</th>\n                            <th>Descripción</th>\n                            <th>Cant</th>\n                            <th>Precio</th>\n                            <th>Descuento</th>\n                            <th>Impuesto</th>\n                            <th>Total</th>\n                            <th>Acciones</th>\n                        </tr>\n                    </thead>\n                    <tbody *ngFor=\"let linea of arrayDetalles\">\n                        <tr>\n                            <td>\n                                {{linea.numerolineadetalle}}\n                            </td>\n                            <td>\n                                {{linea.descripcioDetalle}}\n                            </td>\n                            <td>\n                                {{linea.cantidad}}\n                            </td>\n                            <td>\n                                {{linea.precio_linea}}\n                            </td>\n                            <td>\n                                {{linea.montodescuento}}\n                            </td>\n                            <td>\n                                {{linea.impuesto}}\n                            </td>\n                            <td>\n                                {{linea.montoitotallinea}}\n                            </td>\n                            <td><button type=\"button\" class=\"btn btn-danger\" (click)=\"quitarOrden(linea.numerolineadetalle)\">\n                                    <i class=\"fa fa-times-circle\"></i>\n                                </button>\n                            </td>\n                        </tr>\n                    </tbody>\n                </table>\n                <div class=\"form-group\">\n                    <table class=\"table table-striped\">\n                        <thead>\n                            <tr>\n                                <th>Subtotal</th>\n                                <th>Impuestos</th>\n                                <th>Descuento</th>\n                                <th>Total</th>\n                            </tr>\n                        </thead>\n                        <tbody>\n                            <tr>\n                                <td scope=\"row\">{{SubtotalComprobante}}</td>\n                                <td>{{totalImpuesto}}</td>\n                                <td>{{totalDescuento}}</td>\n                                <td>{{totalPagar}}</td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </div>\n                <!-- <div class=\"form-group\">\n                        <textarea name=\"\" id=\"\" cols=\"35\" rows=\"5\" class=\"form-control\" placeholder=\"Notas\"></textarea>\n                    </div> -->\n            </div>\n            <hr>\n            <div class=\"form-group col-md-8 mt-0\">\n                <button type=\"submit\" class=\"btn btn-success col-md-2 mr-1\">\n            <i class=\"fa fa-search\"></i>\n        </button>\n                <button type=\"submit\" class=\"btn btn-danger col-md-2 mr-1\">\n            <i class=\"fa fa-times-circle-o\" (click)=\"obtenerTotalesFactura()\"></i>\n        </button>\n                <button type=\"submit\" class=\"btn btn-danger col-md-2 mr-1\">\n            <i class=\"fa fa-times-circle-o\"></i>\n        </button>\n            </div>\n        </div>\n\n        <!-- MODAL PARA BUSCAR EL CLIENTE -->\n\n        <div class=\"modal fade\" id=\"ModalBuscarCliente\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n            <div class=\"modal-dialog\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\">Buscar Cliente</h5>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form method=\"POST\" id=\"formBuscarCliente\">\n                            <div class=\"form-group\">\n                                <label for=\"cedula\" class=\"col-form-label\">Nombre o Cédula:</label>\n                                <input [(ngModel)]=\"objDataCliente.query\" name=\"query\" type=\"text\" class=\"form-control\" id=\"cedula\">\n                                <button type=\"submit\" class=\"btn btn-primary mt-1\" (click)=\"buscarCliente($event,objDataCliente.query)\">Buscar</button>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"nombre\" class=\"col-form-label\">Nombre:</label>\n                                <input [(ngModel)]=\"objDataCliente.nombre\" name=\"nombre\" type=\"text\" class=\"form-control\" id=\"nombre\" readonly>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"codigo\" class=\"col-form-label\">Cédula:</label>\n                                <input [(ngModel)]=\"objDataCliente.cedula\" name=\"cedula\" type=\"text\" class=\"form-control\" id=\"codigo\" readonly>\n                            </div>\n                        </form>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancelar</button>\n                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"cargarCliente(objDataCliente)\">Cargar</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!--CIERRE DE MODAL DE BUSCAR CLIENTES-->\n\n\n\n        <!--MODAL DE CREAR NUEVOS CLIENTES-->\n\n\n        <div class=\"modal fade\" id=\"ModalNuevoCliente\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n            <div class=\"modal-dialog\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\">Nuevo Cliente</h5>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form method=\"POST\" id=\"formNuevoCliente\">\n                            <div class=\"form-group\">\n                                <label for=\"cliente_nombre\" class=\"col-form-label\">Nombre:</label>\n                                <input [(ngModel)]=\"objCliente.cliente_nombre\" name=\"cliente_nombre\" type=\"text\" class=\"form-control\" id=\"cliente_nombre\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"cliente_nombre_comercial\" class=\"col-form-label\">Nombre Comercial</label>\n                                <input [(ngModel)]=\"objCliente.cliente_nombre_comercial\" name=\"cliente_nombre_comercial\" type=\"text\" class=\"form-control\" id=\"cliente_nombre_comercial\">\n                            </div>\n\n                            <div class=\"form-group\">\n                                <label for=\"cliente_tipo_identificacion\" class=\"col-form-label\">Tipo Identificación:</label>\n                                <select [(ngModel)]=\"objCliente.cliente_tipo_identificacion\" name=\"cliente_tipo_identificacion\" id=\"cliente_tipo_identificacion\" class=\"form-control\">\n                                  <option value=\"\">--Seleccione--</option>\n                                  <option *ngFor=\"let item of tipoIdentificacion\" [value]=\"item.codigo\">{{item.descripcion}}</option>\n                                </select>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"cedula_cliente\" class=\"col-form-label\">Cédula</label>\n                                <input [(ngModel)]=\"objCliente.cedula_cliente\" name=\"cedula_cliente\" type=\"number\" class=\"form-control\" id=\"cedula_cliente\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"identificacion_extranjero\" class=\"col-form-label\">Identificación extranjero</label>\n                                <input [(ngModel)]=\"objCliente.identificacion_extranjero\" name=\"identificacion_extranjero\" type=\"number\" class=\"form-control\" id=\"identificacion_extranjero\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"provincia\" class=\"col-form-label\">Provincia:</label>\n                                <select [(ngModel)]=\"objCliente.provincia\" name=\"provincia\" id=\"provincia\" class=\"form-control\" (change)=\"obtenerCantones(objCliente.provincia)\">\n                                <option value=\"\">--Seleccione--</option>\n                                <option *ngFor=\"let item of provincia\" [ngValue]=\"item.provincia\">{{item.nPro}}</option>\n                              </select>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"canton\" class=\"col-form-label\">Cantón</label>\n                                <select [(ngModel)]=\"objCliente.canton\" name=\"canton\" id=\"canton\" class=\"form-control\" (change)=\"obtenerDistritos(objCliente.canton,objCliente.provincia)\">\n                              <option value=\"\">--Seleccione--</option>\n                              <option *ngFor=\"let item of canton\" [value]=\"item.canton\">{{item.nCan}}</option>\n                            </select>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"distrito\" class=\"col-form-label\">Distrito</label>\n                                <select [(ngModel)]=\"objCliente.distrito\" name=\"distrito\" id=\"distrito\" class=\"form-control\" (change)=\"obtenerBarrios(objCliente.canton,objCliente.provincia,objCliente.distrito)\">\n                            <option value=\"\">--Seleccione--</option>\n                            <option *ngFor=\"let item of distrito\" [value]=\"item.distrito\">{{item.nDis}}</option>\n                          </select>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"cliente_barrio\" class=\"col-form-label\">Barrio</label>\n                                <select [(ngModel)]=\"objCliente.cliente_barrio\" name=\"cliente_barrio\" id=\"cliente_barrio\" class=\"form-control\">\n                          <option value=\"\">--Seleccione--</option>\n                          <option *ngFor=\"let item of barrio\" [value]=\"item.codigo\">{{item.nHac}}</option>\n                        </select>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"otras_senas\" class=\"col-form-label\">Otras Señas</label>\n                                <input [(ngModel)]=\"objCliente.otras_senas\" name=\"otras_senas\" type=\"text\" class=\"form-control\" id=\"otras_senas\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"otras_senas_extranjero\" class=\"col-form-label\">Otras Señas Extranjero</label>\n                                <input [(ngModel)]=\"objCliente.otras_senas_extranjero\" name=\"otras_senas_extranjero\" type=\"text\" class=\"form-control\" id=\"otras_senas_extranjero\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"cliente_telefono_codigopais\" class=\"col-form-label\">Código País</label>\n                                <input [(ngModel)]=\"objCliente.cliente_telefono_codigopais\" name=\"cliente_telefono_codigopais\" type=\"number\" class=\"form-control\" id=\"cliente_telefono_codigopais\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"cliente_telefono_numtelefono\" class=\"col-form-label\">Teléfono</label>\n                                <input [(ngModel)]=\"objCliente.cliente_telefono_numtelefono\" name=\"cliente_telefono_numtelefono\" type=\"number\" class=\"form-control\" id=\"cliente_telefono_numtelefono\">\n                            </div>\n\n                            <div class=\"form-group\">\n                                <label for=\"cliente_fax_codigopais\" class=\"col-form-label\">Código País</label>\n                                <input [(ngModel)]=\"objCliente.cliente_fax_codigopais\" name=\"cliente_fax_codigopais\" type=\"number\" class=\"form-control\" id=\"cliente_fax_codigopais\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"cliente_fax_numtelefono\" class=\"col-form-label\">Fax</label>\n                                <input [(ngModel)]=\"objCliente.cliente_fax_numtelefono\" name=\"cliente_fax_numtelefono\" type=\"number\" class=\"form-control\" id=\"cliente_fax_numtelefono\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"cliente_correo\" class=\"col-form-label\">Correo</label>\n                                <input [(ngModel)]=\"objCliente.cliente_correo\" name=\"cliente_correo\" type=\"email\" class=\"form-control\" id=\"cliente_correo\">\n                            </div>\n                        </form>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancelar</button>\n                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"nuevoCliente(objCliente)\">Guardar</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n\n        <!--CIERRE MODAL DE CREAR CLIENTES DESDE EL MODULO DE FACTURA-->\n\n\n        <!--MODAL DE BUSCAR PRODUCTOS-->\n\n        <div class=\"modal fade\" id=\"ModalBuscarProducto\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n            <div class=\"modal-dialog\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\">Buscar Producto</h5>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form method=\"POST\" id=\"formBuscarProducto\">\n                            <div class=\"form-group\">\n                                <label for=\"query\" class=\"col-form-label\">Descripción o Código:</label>\n                                <input [(ngModel)]=\"objBusquedaProducto.query\" name=\"query\" type=\"text\" class=\"form-control\" id=\"cedula\">\n                                <button type=\"submit\" class=\"btn btn-primary mt-1\" (click)=\"buscarProducto($event,objBusquedaProducto.query)\">Buscar</button>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"descripcion\" class=\"col-form-label\">Descripción:</label>\n                                <input [(ngModel)]=\"objBusquedaProducto.descripcion\" name=\"descripcion\" type=\"text\" class=\"form-control\" id=\"descripcion\" readonly>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"codigo\" class=\"col-form-label\">Código:</label>\n                                <input [(ngModel)]=\"objBusquedaProducto.codigo\" name=\"codigo\" type=\"text\" class=\"form-control\" id=\"codigo\" readonly>\n                            </div>\n                        </form>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancelar</button>\n                        <button type=\"button\" class=\"btn btn-primary\">Cargar</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n\n        <!--FIN DE MODAL DE BUSCAR PRODUCTOS-->\n\n\n        <!-- MODAL DE CREAR PRODUCTOS -->\n\n        <div class=\"modal fade\" id=\"ModalNuevoProducto\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"exampleModalLabel\" aria-hidden=\"true\">\n            <div class=\"modal-dialog\" role=\"document\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <h5 class=\"modal-title\">Nuevo Producto</h5>\n                    </div>\n                    <div class=\"modal-body\">\n                        <form method=\"POST\" id=\"formNuevoProducto\">\n                            <div class=\"form-group\">\n                                <label for=\"descripcion\" class=\"col-form-label\">Descripción:</label>\n                                <input [(ngModel)]=\"objProducto.descripcion\" name=\"descripcion\" type=\"text\" class=\"form-control\" id=\"descripcion\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"codigo_barra\" class=\"col-form-label\">Código Barra</label>\n                                <input [(ngModel)]=\"objProducto.codigo_barra\" name=\"codigo_barra\" type=\"text\" class=\"form-control\" id=\"codigo_barra\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"precio_producto\" class=\"col-form-label\">Precio Unitario</label>\n                                <input [(ngModel)]=\"objProducto.precio_producto\" name=\"precio_producto\" type=\"number\" class=\"form-control\" id=\"precio_producto\" (keyup)=\"obtenerPrecioFinal('precio_producto','tipo_impuesto')\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"costo_unitario\" class=\"col-form-label\">Costo Unitario</label>\n                                <input [(ngModel)]=\"objProducto.costo_unitario\" name=\"costo_unitario\" type=\"number\" class=\"form-control\" id=\"costo_unitario\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"unidad_medida\" class=\"col-form-label\">Unidad Medida:</label>\n                                <select [(ngModel)]=\"objProducto.unidad_medida\" name=\"unidad_medida\" id=\"unidad_medida\" class=\"form-control\">\n                                  <option value=\"\">--Seleccione--</option>\n                                  <option *ngFor=\"let item of unidadesMedida\" [ngValue]=\"item.simbolo\">{{item.descripcion}}</option>\n                              </select>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"unidad_medida_comercial\" class=\"col-form-label\">Unidad Medida Comercial</label>\n                                <input [(ngModel)]=\"objProducto.unidad_medida_comercial\" name=\"unidad_medida_comercial\" type=\"text\" class=\"form-control\" id=\"unidad_medida_comercial\">\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"tipo_impuesto\" class=\"col-form-label\">Impuesto:</label>\n                                <select [(ngModel)]=\"objProducto.tipo_impuesto\" name=\"tipo_impuesto\" id=\"tipo_impuesto\" class=\"form-control\" (change)=\"obtenerPrecioFinal('precio_producto','tipo_impuesto')\">\n                                  <option value=\"\">--Seleccione--</option>\n                                  <option *ngFor=\"let item of tipoImpuesto\" [ngValue]=\"item.id\">{{item.descripcion}}</option>\n                              </select>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"idcategoria\" class=\"col-form-label\">Categoria:</label>\n                                <select [(ngModel)]=\"objProducto.idcategoria\" name=\"idcategoria\" id=\"idcategoria\" class=\"form-control\">\n                                  <option value=\"\">--Seleccione--</option>\n                                  <option *ngFor=\"let item of listaCategorias\" [ngValue]=\"item.id\">{{item.descripcion}}</option>\n                              </select>\n                            </div>\n                            <div class=\"form-group\">\n                                <label for=\"precio_final\" class=\"col-form-label\">Precio Final</label>\n                                <input [(ngModel)]=\"objProducto.precio_final\" name=\"precio_final\" type=\"number\" class=\"form-control\" id=\"precio_final\" readonly>\n                            </div>\n                        </form>\n                    </div>\n                    <div class=\"modal-footer\">\n                        <button type=\"button\" class=\"btn btn-secondary\" data-dismiss=\"modal\">Cancelar</button>\n                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"nuevoProducto($event,objProducto)\">Guardar</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n        <!-- FIN MODAL DE CREAR PRODUCTOS-->");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/impuesto/impuesto.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/impuesto/impuesto.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>Impuesto</h1>\n<br>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"formBuscarImpuesto\">\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-8\">\n                <input [(ngModel)]=\"query\" name=\"query\" type=\"text\" id=\"query\" class=\"form-control\" placeholder=\"Buscar por cédula o nombre del emisor\">\n            </div>\n            <div class=\"form-group col-md-3\">\n                <button type=\"submit\" class=\"btn btn-primary\" (click)=\"buscarImpuesto($event,query)\">Buscar</button>\n            </div>\n        </div>\n    </form>\n</div>\n<br>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"formImpuesto\">\n\n        <div class=\"form-group col-md-6\">\n            <label for=\"descripcion\">Descripción</label>\n            <input [(ngModel)]=\"objImpuesto.descripcion\" type=\"text\" name=\"descripcion\" id=\"descripcion\" class=\"form-control\">\n        </div>\n        <div class=\"form-group col-md-6\">\n            <label for=\"descripcion\">Porcentaje</label>\n            <input [(ngModel)]=\"objImpuesto.porcentaje\" type=\"number\" name=\"porcentaje\" id=\"porcentaje\" class=\"form-control\">\n        </div>\n        <div class=\"form-group col-md-6\">\n            <label for=\"descripcion\">Código</label>\n            <input [(ngModel)]=\"objImpuesto.codigo\" type=\"text\" name=\"codigo\" id=\"codigo\" class=\"form-control\">\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"procesarImpuesto($event,objImpuesto)\">Guardar</button>\n    </form>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/pages.component.html":
/*!**********************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/pages.component.html ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- ============================================================== -->\n<!-- Main wrapper - style you can find in pages.scss -->\n<!-- ============================================================== -->\n<div id=\"main-wrapper\">\n    <app-header></app-header>\n    <app-sidebar></app-sidebar>\n\n    <!--  PAGE WRAPPER-->\n    <div class=\"page-wrapper\">\n\n        <!-- ============================================================== -->\n        <!-- Container fluid  -->\n        <!-- ============================================================== -->\n        <div class=\"container-fluid\">\n            <!-- <app-breadcrumbs></app-breadcrumbs>-->\n\n            <!-- ============================================================== -->\n            <!-- Start Page Content -->\n            <!-- ============================================================== -->\n\n\n            <div class=\"row\">\n                <div class=\"col-12\">\n                    <div class=\"card\">\n                        <div class=\"card-body\">\n                            <router-outlet></router-outlet>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <!-- ============================================================== -->\n            <!-- End PAge Content -->\n            <!-- ============================================================== -->\n        </div>\n        <!-- ============================================================== -->\n        <!-- END Container fluid  -->\n        <!-- ============================================================== -->\n    </div>\n\n    <!--  END PAGE WRAPPER-->\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/producto/producto.component.html":
/*!**********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/producto/producto.component.html ***!
  \**********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>Producto</h1>\n<br>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"form_buscar_producto\">\n        <div class=\"form-row\" id=\"buscador_producto\">\n            <div class=\"form-group col-md-8\">\n                <input [(ngModel)]=\"query\" name=\"query\" type=\"text\" id=\"query\" class=\"form-control\" placeholder=\"Buscar por código de barra o nombre de producto\">\n            </div>\n            <div class=\"form-group col-md-3\">\n                <button type=\"submit\" class=\"btn btn-primary\" (click)=\"buscarProducto($event,query)\">Buscar</button>\n            </div>\n        </div>\n    </form>\n</div>\n<br>\n<br>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"form_producto\">\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"descripcion\">Descripción</label>\n                <input [(ngModel)]=\"objProducto.descripcion\" name=\"descripcion\" type=\"text\" id=\"descripcion\" class=\"form-control\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"descripcion\">Código Barra</label>\n                <input [(ngModel)]=\"objProducto.codigo_barra\" name=\"codigo_barra\" type=\"text\" id=\"codigo_barra\" class=\"form-control\">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"descripcion\">Precio unitario</label>\n                <input [(ngModel)]=\"objProducto.precio_producto\" name=\"precio_producto\" type=\"number\" id=\"precio_producto\" (keyup)=\"obtenerPrecioFinal('precio_producto','tipo_impuesto')\" class=\"form-control\">\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"descripcion\">Costo Unitario</label>\n                <input [(ngModel)]=\"objProducto.costo_unitario\" name=\"costo_unitario\" type=\"number\" id=\"costo_unitario\" class=\"form-control\">\n            </div>\n        </div>\n\n        <!--Precio final para hacer el calculo con el impuesto-->\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"descripcion\">Unidad Medida</label>\n                <select [(ngModel)]=\"objProducto.unidad_medida\" name=\"unidad_medida\" id=\"unidad_medida\" class=\"form-control\">\n                    <option value=\"\" disabled selected>--SELECCIONE--</option>\n                    <option *ngFor=\"let unidad of listaUnidadesMedida\" [ngValue]=\"unidad.simbolo\">{{unidad.descripcion}}</option>\n                </select>\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"descripcion\">Unidad Medida Comercial</label>\n                <input [(ngModel)]=\"objProducto.unidad_medida_comercial\" name=\"unidad_medida_comercial\" type=\"text\" id=\"unidad_medida_comercial\" class=\"form-control\">\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <!---->\n            <div class=\"form-group col-md-6\">\n                <label for=\"descripcion\">Categoría</label>\n                <select [(ngModel)]=\"objProducto.idcategoria\" name=\"idcategoria\" id=\"idcategoria\" class=\"form-control\">\n                    <option value=\"\" disabled selected>--SELECCIONE--</option>\n                    <option *ngFor=\"let categoria of listaCategorias\" [ngValue]=\"categoria.id\">{{categoria.descripcion}}</option>\n                </select>\n            </div>\n            <div class=\"form-group col-md-6\">\n                <label for=\"descripcion\">Impuesto</label>\n                <select [(ngModel)]=\"objProducto.tipo_impuesto\" name=\"tipo_impuesto\" id=\"tipo_impuesto\" class=\"form-control\" (change)=\"obtenerPrecioFinal('precio_producto','tipo_impuesto')\">\n                    <option value=\"\" disabled selected>--SELECCIONE--</option>\n                    <option *ngFor=\"let impuesto of listaImpuestos\" [ngValue]=\"impuesto.id\">{{impuesto.descripcion}}</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-6\">\n                <label for=\"descripcion\">Precio final</label>\n                <input [(ngModel)]=\"objProducto.precio_final\" name=\"precio_final\" type=\"number\" id=\"precio_final\" class=\"form-control\" readonly>\n            </div>\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"procesarDatosProducto($event,objProducto)\">Guardar</button>\n    </form>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/reporte/reporte.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/reporte/reporte.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<div class=\"form-group\">\n    <a [routerLink]=\"['/factura']\" class=\"btn btn-info\">Volver</a>\n</div>\n<div class=\"form-row flex-column\">\n    <h1>Reporte de Facturas - Total de Resultados: {{numeroComprobantes}}</h1>\n    <br>\n    <h5>Filtros: {{filtros}}</h5>\n</div>\n\n<hr>\n<div class=\"table\">\n    <table class=\"table table-responsive\">\n        <thead>\n            <tr>\n                <th> Número Interno </th>\n                <th> Consecutivo </th>\n                <th> Clave </th>\n                <th> Tipo Documento </th>\n                <th> Medio Pago </th>\n                <th> Condicion Venta </th>\n                <th> Moneda Documento </th>\n                <th> Tipo Cambio </th>\n                <th> Fecha </th>\n                <th> Hora </th>\n                <th> Identificacion Cliente </th>\n                <th> Cliente </th>\n                <th> Razón Social </th>\n                <th> Estado Documento </th>\n                <th> Subtotal </th>\n                <th> Impuestos </th>\n                <th> Descuentos </th>\n                <th> Servicios Gravados </th>\n                <th> Servicios Exentos </th>\n                <th> Servicios Exonerados </th>\n                <th> Mercancías Gravadas </th>\n                <th> Mercancías Exentas </th>\n                <th> Mercancías Exoneradas </th>\n                <th> Total Gravado </th>\n                <th> Total Exento </th>\n                <th> Total Exonerado </th>\n                <th> Venta </th>\n                <th> Venta Neta </th>\n                <th> Total Factura </th>\n                <th> IVA Devuelto </th>\n                <th> Otros Cargos </th>\n            </tr>\n        </thead>\n        <tbody *ngFor=\"let factura of arrayComprobantes\">\n            <tr>\n                <td>{{factura.NumeroInterno}}</td>\n                <td>{{factura.Consecutivo}}</td>\n                <td>{{factura.Clavenumerica}}</td>\n                <td>{{factura.TipoComprobante}}</td>\n                <td>{{factura.MedioPago}}</td>\n                <td>{{factura.CondicionVenta}}</td>\n                <td>{{factura.CodigoMoneda}}</td>\n                <td>{{factura.TipoCambio}}</td>\n                <td>{{factura.Fecha}}</td>\n                <td>{{factura.Hora}}</td>\n                <td>{{factura.CedulaCliente}}</td>\n                <td>{{factura.Cliente}}</td>\n                <td>{{factura.NombreComercial}}</td>\n                <td>{{factura.Estado}}</td>\n                <td>{{factura.Subtotal}}</td>\n                <td>{{factura.TotalImpuestos}}</td>\n                <td>{{factura.TotalDescuentos}}</td>\n                <td>{{factura.ServiciosGravados}}</td>\n                <td>{{factura.ServiciosExentos}}</td>\n                <td>{{factura.ServiciosExonerados}}</td>\n                <td>{{factura.MercanciasGravadas}}</td>\n                <td>{{factura.MercanciasExentas}}</td>\n                <td>{{factura.MercanciasExoneradas}}</td>\n                <td>{{factura.TotalGravado}}</td>\n                <td>{{factura.TotalExento}}</td>\n                <td>{{factura.TotalExonerado}}</td>\n                <td>{{factura.TotalVenta}}</td>\n                <td>{{factura.TotalVentaNeta}}</td>\n                <td>{{factura.TotalFactura}}</td>\n                <td>{{factura.TotalIVADevuelto}}</td>\n                <td>{{factura.TotalOtrosCargos}}</td>\n            </tr>\n        </tbody>\n    </table>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/usuario/usuario.component.html":
/*!********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/usuario/usuario.component.html ***!
  \********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<h1>Usuario</h1>\n<br>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"formBuscarUsuario\">\n        <div class=\"form-row\">\n            <div class=\"form-group col-md-8\">\n                <input [(ngModel)]=\"query\" name=\"query\" type=\"text\" id=\"query\" class=\"form-control\" placeholder=\"Buscar por nombre de usuario\">\n            </div>\n            <div class=\"form-group col-md-3\">\n                <button type=\"submit\" class=\"btn btn-primary\" (click)=\"obtenerUsuario($event,query)\">Buscar</button>\n            </div>\n        </div>\n    </form>\n</div>\n<br>\n<div class=\"col-12\">\n    <form method=\"POST\" id=\"formUsuario\">\n        <div class=\"container\">\n            <div class=\"row\">\n                <div class=\"col-sm\">\n                    <div class=\"form-group\">\n                        <label for=\"usuario\">Usuario</label>\n                        <input [(ngModel)]=\"objUsuario.usuario\" type=\"text\" name=\"usuario\" id=\"usuario\" class=\"form-control\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"contrasena\">Contraseña</label>\n                        <input [(ngModel)]=\"objUsuario.contrasena\" type=\"password\" name=\"contrasena\" id=\"contrasena\" class=\"form-control\">\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"Permiso\">Permiso</label>\n                        <select [(ngModel)]=\"objUsuario.idpermiso\" name=\"idpermiso\" id=\"permiso\" class=\"form-control\">\n                                <option selected value=\"\">--Seleccione--</option>\n                                <option *ngFor=\"let permiso of this.listaPermisos\" [ngValue]=\"permiso.id\">{{permiso.descripcion}}</option>\n                        </select>\n                    </div>\n                </div>\n                <div class=\"col-sm\">\n                    <div class=\"form-group\">\n                        <img  name=\"imagen\" id=\"img_usuario\" width=\"200\" height=\"200\">\n                    </div>\n                   <div class=\"form-group\">\n                        <label for=\"imagen\">Subir imagen</label>\n                        <input name=\"imagen\" type=\"file\" class=\"form-control-file\" id=\"imagen\">\n                    </div> \n                </div>\n            </div>\n        </div>\n        <button type=\"submit\" class=\"btn btn-primary\" (click)=\"procesarUsuario($event,objUsuario)\">Guardar</button>\n\n    </form>\n</div>");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/breadcrumbs/breadcrumbs.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/breadcrumbs/breadcrumbs.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- ============================================================== -->\n<!-- Bread crumb and right sidebar toggle -->\n<!-- ============================================================== -->\n<div class=\"row page-titles\">\n    <div class=\"col-md-5 align-self-center\">\n        <h3 class=\"text-themecolor\">Blank Page</h3>\n    </div>\n    <div class=\"col-md-7 align-self-center\">\n        <ol class=\"breadcrumb\">\n            <li class=\"breadcrumb-item\">\n                <a href=\"javascript:void(0)\">Home</a>\n            </li>\n            <li class=\"breadcrumb-item\">pages</li>\n            <li class=\"breadcrumb-item active\">Blank Page</li>\n        </ol>\n    </div>\n</div>\n<!-- ============================================================== -->\n<!-- End Bread crumb and right sidebar toggle -->\n<!-- ============================================================== -->");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/header/header.component.html":
/*!*******************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/header/header.component.html ***!
  \*******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- ============================================================== -->\n<!-- Topbar header - style you can find in pages.scss -->\n<!-- ============================================================== -->\n<header class=\"topbar\">\n    <nav class=\"navbar top-navbar navbar-expand-md navbar-light\">\n        <!-- ============================================================== -->\n        <!-- Logo -->\n        <!-- ============================================================== -->\n        <div class=\"navbar-header\">\n            <a class=\"navbar-brand\" href=\"index.html\">\n                <!-- Logo icon --><b>\n                            <!--You can put here icon as well // <i class=\"wi wi-sunset\"></i> //-->\n                            <!-- Dark Logo icon -->\n                            <img src=\"assets/images/logo-icon.png\" alt=\"homepage\" class=\"dark-logo\" />\n                            <!-- Light Logo icon -->\n                            <img src=\"assets/images/logo-light-icon.png\" alt=\"homepage\" class=\"light-logo\" />\n                        </b>\n                <!--End Logo icon -->\n                <!-- Logo text --><span>\n                         <!-- dark Logo text -->\n                         <img src=\"assets/images/logo-text.png\" alt=\"homepage\" class=\"dark-logo\" />\n                         <!-- Light Logo text -->    \n                         <img src=\"assets/images/logo-light-text.png\" class=\"light-logo\" alt=\"homepage\" /></span> </a>\n        </div>\n        <!-- ============================================================== -->\n        <!-- End Logo -->\n        <!-- ============================================================== -->\n        <div class=\"navbar-collapse\">\n            <!-- ============================================================== -->\n            <!-- toggle and nav items -->\n            <!-- ============================================================== -->\n            <ul class=\"navbar-nav mr-auto\">\n                <!-- This is  -->\n                <li class=\"nav-item\"> <a class=\"nav-link nav-toggler hidden-md-up waves-effect waves-dark\" href=\"javascript:void(0)\"><i class=\"ti-menu\"></i></a> </li>\n                <li class=\"nav-item\"> <a class=\"nav-link sidebartoggler hidden-sm-down waves-effect waves-dark\" href=\"javascript:void(0)\"><i class=\"ti-menu\"></i></a> </li>\n                <li class=\"nav-item hidden-sm-down\"></li>\n            </ul>\n            <!-- ============================================================== -->\n            <!-- User profile and search -->\n            <!-- ============================================================== -->\n            <ul class=\"navbar-nav my-lg-0\">\n                <!-- ============================================================== -->\n                <!-- Search -->\n                <!-- ============================================================== -->\n\n                <!-- ============================================================== -->\n                <!-- Messages -->\n                <!-- ============================================================== -->\n                <!-- <li class=\"nav-item dropdown\">\n                    <a class=\"nav-link dropdown-toggle waves-effect waves-dark\" href=\"\" id=\"2\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"mdi mdi-email\"></i>\n                        <div class=\"notify\"> <span class=\"heartbit\"></span> <span class=\"point\"></span> </div>\n                    </a>\n                    <div class=\"dropdown-menu mailbox dropdown-menu-right animated fadeIn\" aria-labelledby=\"2\">\n                        <ul>\n                            <li>\n                                <div class=\"drop-title\">You have 4 new messages</div>\n                            </li>\n                            <li>\n                                <div class=\"message-center\">\n                                     Message \n                                    <a href=\"#\">\n                                        <div class=\"user-img\"> <img src=\"assets/images/users/1.jpg\" alt=\"user\" class=\"img-circle\"> <span class=\"profile-status online pull-right\"></span> </div>\n                                        <div class=\"mail-contnet\">\n                                            <h5>Pavan kumar</h5> <span class=\"mail-desc\">Just see the my admin!</span> <span class=\"time\">9:30 AM</span> </div>\n                                    </a>\n                                     Message \n                                    <a href=\"#\">\n                                        <div class=\"user-img\"> <img src=\"assets/images/users/2.jpg\" alt=\"user\" class=\"img-circle\"> <span class=\"profile-status busy pull-right\"></span> </div>\n                                        <div class=\"mail-contnet\">\n                                            <h5>Sonu Nigam</h5> <span class=\"mail-desc\">I've sung a song! See you at</span> <span class=\"time\">9:10 AM</span> </div>\n                                    </a>\n                                     Message \n                                    <a href=\"#\">\n                                        <div class=\"user-img\"> <img src=\"assets/images/users/3.jpg\" alt=\"user\" class=\"img-circle\"> <span class=\"profile-status away pull-right\"></span> </div>\n                                        <div class=\"mail-contnet\">\n                                            <h5>Arijit Sinh</h5> <span class=\"mail-desc\">I am a singer!</span> <span class=\"time\">9:08 AM</span> </div>\n                                    </a>\n                                     Message \n                                    <a href=\"#\">\n                                        <div class=\"user-img\"> <img src=\"assets/images/users/4.jpg\" alt=\"user\" class=\"img-circle\"> <span class=\"profile-status offline pull-right\"></span> </div>\n                                        <div class=\"mail-contnet\">\n                                            <h5>Pavan kumar</h5> <span class=\"mail-desc\">Just see the my admin!</span> <span class=\"time\">9:02 AM</span> </div>\n                                    </a>\n                                </div>\n                            </li>\n                            <li>\n                                <a class=\"nav-link text-center\" href=\"javascript:void(0);\"> <strong>See all e-Mails</strong> <i class=\"fa fa-angle-right\"></i> </a>\n                            </li>\n                        </ul>\n                    </div>\n                </li> -->\n                <!-- ============================================================== -->\n                <!-- End Messages -->\n                <!-- ============================================================== -->\n                <!-- ============================================================== -->\n                <!-- ============================================================== -->\n                <!-- Language -->\n                <!-- ============================================================== -->\n                <!--<li class=\"nav-item dropdown\">\n                    <a class=\"nav-link dropdown-toggle waves-effect waves-dark\" href=\"\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"> <i class=\"flag-icon flag-icon-us\"></i></a>\n                    <div class=\"dropdown-menu dropdown-menu-right animated bounceInDown\"> <a class=\"dropdown-item\" href=\"#\"><i class=\"flag-icon flag-icon-in\"></i> India</a> <a class=\"dropdown-item\" href=\"#\"><i class=\"flag-icon flag-icon-fr\"></i> French</a> <a class=\"dropdown-item\" href=\"#\"><i class=\"flag-icon flag-icon-cn\"></i> China</a>                        <a class=\"dropdown-item\" href=\"#\"><i class=\"flag-icon flag-icon-de\"></i> Dutch</a> </div>\n                </li> -->\n                <!-- ============================================================== -->\n                <!-- Profile -->\n                <!-- ============================================================== -->\n                <li class=\"nav-item dropdown\">\n                    <a class=\"nav-link dropdown-toggle waves-effect waves-dark\" href=\"\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\"><img id=\"img_header\" src=\"\" alt=\"user\" class=\"profile-pic\" /></a>\n                    <div class=\"dropdown-menu dropdown-menu-right animated fadeIn\">\n                        <ul class=\"dropdown-user\">\n                            <li>\n                                <div class=\"dw-user-box\">\n                                    <div class=\"u-img\"><img src=\"\" id=\"img_header_box\" alt=\"user\"></div>\n                                    <div class=\"u-text\">\n                                        <h4 id=\"nombreUsuario\"></h4>\n                                        <p class=\"text-muted\"></p>\n                                    </div>\n                                </div>\n                            </li>\n                            <li role=\"separator\" class=\"divider\"></li>\n                            <li><a href=\"#\"><i class=\"ti-settings\"></i>Configuración</a></li>\n                            <li role=\"separator\" class=\"divider\"></li>\n                            <li><a (click)=\"cerrarSesion()\" href=\"#\"><i class=\"fa fa-power-off\" ></i> Salir</a></li>\n                        </ul>\n                    </div>\n                </li>\n            </ul>\n        </div>\n    </nav>\n</header>\n<!-- ============================================================== -->\n<!-- End Topbar header -->\n<!-- ============================================================== -->");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/nopagefound/nopagefound.component.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/nopagefound/nopagefound.component.html ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<p>nopagefound works!</p>\n");

/***/ }),

/***/ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/sidebar/sidebar.component.html":
/*!*********************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/shared/sidebar/sidebar.component.html ***!
  \*********************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("<!-- Left Sidebar - style you can find in sidebar.scss  -->\n<!-- ============================================================== -->\n<aside class=\"left-sidebar\">\n    <!-- Sidebar scroll-->\n    <div class=\"scroll-sidebar\">\n        <!-- Sidebar navigation-->\n        <nav class=\"sidebar-nav\">\n            <ul id=\"sidebarnav\">\n                <li class=\"nav-devider\"></li>\n                <li class=\"nav-small-cap\">MENÚ</li>\n                <li> <a class=\"has-arrow waves-effect waves-dark\" href=\"#\" aria-expanded=\"false\"><i class=\"fa fa-credit-card\" aria-hidden=\"true\"></i><span class=\"hide-menu\">Documentos<span class=\"label label-rouded label-themecolor pull-right\">4</span></span></a>\n                    <ul aria-expanded=\"false\" class=\"collapse\">\n                        <li><a [routerLink]=\"['/factura']\">Facturar</a></li>\n                        <li><a [routerLink]=\"['/consulta']\">Consultar</a></li>\n                    </ul>\n                </li>\n                <li> <a class=\"has-arrow waves-effect waves-dark\" href=\"#\" aria-expanded=\"false\"><i class=\"mdi mdi-gauge\"></i><span class=\"hide-menu\">Cliente <span class=\"label label-rouded label-themecolor pull-right\">4</span></span></a>\n                    <ul aria-expanded=\"false\" class=\"collapse\">\n                        <li><a [routerLink]=\"['/cliente']\">Minimal </a></li>\n                    </ul>\n                </li>\n                <li> <a class=\"has-arrow waves-effect waves-dark\" href=\"#\" aria-expanded=\"false\"><i class=\"fa fa-cube\"></i><span class=\"hide-menu\">Producto <span class=\"label label-rouded label-themecolor pull-right\">4</span></span></a>\n                    <ul aria-expanded=\"false\" class=\"collapse\">\n                        <li><a [routerLink]=\"['/producto']\">Minimal </a></li>\n                    </ul>\n                </li>\n                <li> <a class=\"has-arrow waves-effect waves-dark\" href=\"#\" aria-expanded=\"false\"><i class=\"mdi mdi-gauge\"></i><span class=\"hide-menu\">Impuesto <span class=\"label label-rouded label-themecolor pull-right\">4</span></span></a>\n                    <ul aria-expanded=\"false\" class=\"collapse\">\n                        <li><a [routerLink]=\"['/impuesto']\">Minimal </a></li>\n                    </ul>\n                </li>\n                <li> <a class=\"has-arrow waves-effect waves-dark\" href=\"#\" aria-expanded=\"false\"><i class=\"mdi mdi-gauge\"></i><span class=\"hide-menu\">Categoria <span class=\"label label-rouded label-themecolor pull-right\">4</span></span></a>\n                    <ul aria-expanded=\"false\" class=\"collapse\">\n                        <li><a [routerLink]=\"['/categoria']\">Minimal </a></li>\n                    </ul>\n                </li>\n                <li> <a class=\"has-arrow waves-effect waves-dark\" href=\"#\" aria-expanded=\"false\"><i class=\"mdi mdi-gauge\"></i><span class=\"hide-menu\">Descuento <span class=\"label label-rouded label-themecolor pull-right\">4</span></span></a>\n                    <ul aria-expanded=\"false\" class=\"collapse\">\n                        <li><a [routerLink]=\"['/descuento']\">Minimal </a></li>\n                    </ul>\n                </li>\n                <li> <a class=\"has-arrow waves-effect waves-dark\" href=\"#\" aria-expanded=\"false\"><i class=\"fa fa-user-md\"></i><span class=\"hide-menu\">Emisor <span class=\"label label-rouded label-themecolor pull-right\">4</span></span></a>\n                    <ul aria-expanded=\"false\" class=\"collapse\">\n                        <li><a [routerLink]=\"['/Emisor']\">Minimal </a></li>\n                    </ul>\n                </li>\n                <li *ngIf=\"mostrar()\"> <a class=\"has-arrow waves-effect waves-dark\" href=\"#\" aria-expanded=\"false\"><i class=\"fa fa-user-md\"></i><span class=\"hide-menu\">Usuario <span class=\"label label-rouded label-themecolor pull-right\">4</span></span></a>\n                    <ul aria-expanded=\"false\" class=\"collapse\">\n                        <li><a [routerLink]=\"['/usuario']\">Minimal</a></li>\n                    </ul>\n                </li>\n            </ul>\n        </nav>\n        <!-- End Sidebar navigation -->\n    </div>\n    <!-- End Sidebar scroll-->\n</aside>\n<!-- ============================================================== -->\n<!-- End Left Sidebar - style you can find in sidebar.scss  -->\n<!-- ============================================================== -->\n<!-- ============================================================== -->");

/***/ }),

/***/ "./node_modules/tslib/tslib.es6.js":
/*!*****************************************!*\
  !*** ./node_modules/tslib/tslib.es6.js ***!
  \*****************************************/
/*! exports provided: __extends, __assign, __rest, __decorate, __param, __metadata, __awaiter, __generator, __exportStar, __values, __read, __spread, __spreadArrays, __await, __asyncGenerator, __asyncDelegator, __asyncValues, __makeTemplateObject, __importStar, __importDefault */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__extends", function() { return __extends; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__assign", function() { return __assign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__rest", function() { return __rest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__decorate", function() { return __decorate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__param", function() { return __param; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__metadata", function() { return __metadata; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__awaiter", function() { return __awaiter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__generator", function() { return __generator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__exportStar", function() { return __exportStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__values", function() { return __values; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__read", function() { return __read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return __spread; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spreadArrays", function() { return __spreadArrays; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__await", function() { return __await; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncGenerator", function() { return __asyncGenerator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncDelegator", function() { return __asyncDelegator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__asyncValues", function() { return __asyncValues; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__makeTemplateObject", function() { return __makeTemplateObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importStar", function() { return __importStar; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__importDefault", function() { return __importDefault; });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result.default = mod;
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}


/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({})
], AppRoutingModule);



/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let AppComponent = class AppComponent {
    constructor() {
        this.title = 'Facturador';
    }
};
AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-root',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./app.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/app.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")).default]
    })
], AppComponent);



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _pages_pages_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/pages.module */ "./src/app/pages/pages.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _app_routes__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app.routes */ "./src/app/app.routes.ts");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _pages_emisor_emisor_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./pages/emisor/emisor.component */ "./src/app/pages/emisor/emisor.component.ts");
/* harmony import */ var _pages_descuento_descuento_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./pages/descuento/descuento.component */ "./src/app/pages/descuento/descuento.component.ts");
/* harmony import */ var _pages_categoria_categoria_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./pages/categoria/categoria.component */ "./src/app/pages/categoria/categoria.component.ts");
/* harmony import */ var _pages_impuesto_impuesto_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./pages/impuesto/impuesto.component */ "./src/app/pages/impuesto/impuesto.component.ts");
/* harmony import */ var _pages_producto_producto_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./pages/producto/producto.component */ "./src/app/pages/producto/producto.component.ts");
/* harmony import */ var _pages_cliente_cliente_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pages/cliente/cliente.component */ "./src/app/pages/cliente/cliente.component.ts");
/* harmony import */ var _pages_factura_factura_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./pages/factura/factura.component */ "./src/app/pages/factura/factura.component.ts");
/* harmony import */ var _pages_consulta_consulta_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./pages/consulta/consulta.component */ "./src/app/pages/consulta/consulta.component.ts");
/* harmony import */ var _pages_reporte_reporte_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./pages/reporte/reporte.component */ "./src/app/pages/reporte/reporte.component.ts");
/* harmony import */ var _pages_usuario_usuario_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./pages/usuario/usuario.component */ "./src/app/pages/usuario/usuario.component.ts");








// IMPORTAR LAS RUTAS DEL SISTEMA














let AppModule = class AppModule {
};
AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"],
            _login_login_component__WEBPACK_IMPORTED_MODULE_11__["LoginComponent"],
            _pages_emisor_emisor_component__WEBPACK_IMPORTED_MODULE_12__["EmisorComponent"],
            _pages_descuento_descuento_component__WEBPACK_IMPORTED_MODULE_13__["DescuentoComponent"],
            _pages_categoria_categoria_component__WEBPACK_IMPORTED_MODULE_14__["CategoriaComponent"],
            _pages_impuesto_impuesto_component__WEBPACK_IMPORTED_MODULE_15__["ImpuestoComponent"],
            _pages_producto_producto_component__WEBPACK_IMPORTED_MODULE_16__["ProductoComponent"],
            _pages_cliente_cliente_component__WEBPACK_IMPORTED_MODULE_17__["ClienteComponent"],
            _pages_factura_factura_component__WEBPACK_IMPORTED_MODULE_18__["FacturaComponent"],
            _pages_consulta_consulta_component__WEBPACK_IMPORTED_MODULE_19__["ConsultaComponent"],
            _pages_reporte_reporte_component__WEBPACK_IMPORTED_MODULE_20__["ReporteComponent"],
            _pages_usuario_usuario_component__WEBPACK_IMPORTED_MODULE_21__["UsuarioComponent"]
        ],
        imports: [
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
            _app_routes__WEBPACK_IMPORTED_MODULE_8__["APP_ROUTES"],
            _app_routing_module__WEBPACK_IMPORTED_MODULE_9__["AppRoutingModule"],
            _pages_pages_module__WEBPACK_IMPORTED_MODULE_3__["PagesModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormsModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"]
        ],
        providers: [],
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_10__["AppComponent"]]
    })
], AppModule);



/***/ }),

/***/ "./src/app/app.routes.ts":
/*!*******************************!*\
  !*** ./src/app/app.routes.ts ***!
  \*******************************/
/*! exports provided: APP_ROUTES */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "APP_ROUTES", function() { return APP_ROUTES; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _shared_nopagefound_nopagefound_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shared/nopagefound/nopagefound.component */ "./src/app/shared/nopagefound/nopagefound.component.ts");


//import { PagesComponent } from './pages/pages.component';


const appRouest = [
    /*{path: '', component: PagesComponent,
    children: [ // subrutas del componente pages
        {path: 'producto', component: ProductoComponent},
        {path: 'factura', component: FacturaComponent},
        {path: '', redirectTo: '/factura', pathMatch: 'full'}, // si la ruta esta vacía entonces redireccionar a /factura
    ]},*/
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_2__["LoginComponent"] },
    // {path: '', redirectTo: '/factura', pathMatch: 'full'}, // si la ruta esta vacía entonces redireccionar a /factura
    { path: '**', component: _shared_nopagefound_nopagefound_component__WEBPACK_IMPORTED_MODULE_3__["NopagefoundComponent"] } // si se trata de ingresar a una ruta que no existe 
];
// exportar las rutas
const APP_ROUTES = _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(appRouest, { useHash: true });


/***/ }),

/***/ "./src/app/config/config.js":
/*!**********************************!*\
  !*** ./src/app/config/config.js ***!
  \**********************************/
/*! exports provided: baseURL */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "baseURL", function() { return baseURL; });
const baseURL = () => 'https://apifacturaelectronica.herokuapp.com';

/***/ }),

/***/ "./src/app/login/login.component.css":
/*!*******************************************!*\
  !*** ./src/app/login/login.component.css ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("/*\nTemplate Name: Admin pro Admin\nAuthor: Wrappixel\nEmail: niravjoshi87@gmail.com\nFile: scss\n*/\n/*\nTemplate Name: Admin Pro Admin\nAuthor: Wrappixel\nEmail: niravjoshi87@gmail.com\nFile: scss\n*/\n/*Theme Colors*/\n/*bootstrap Color*/\n/*Light colors*/\n/*Normal Color*/\n/*Extra Variable*/\n/*******************\nLogin register and recover password Page\n******************/\n.login-register {\n    background-size: cover;\n    background-repeat: no-repeat;\n    background-position: center center;\n    height: 100%;\n    width: 100%;\n    padding: 10% 0;\n    position: fixed; }\n.login-box {\n    width: 400px;\n    margin: 0 auto; }\n.login-box .footer {\n      width: 100%;\n      left: 0px;\n      right: 0px; }\n.login-box .social {\n      display: block;\n      margin-bottom: 30px; }\n#recoverform {\n    display: none; }\n.login-sidebar {\n    padding: 0px;\n    margin-top: 0px; }\n.login-sidebar .login-box {\n      right: 0px;\n      position: absolute;\n      height: 100%; }\n  \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Q0FLQztBQUNEOzs7OztDQUtDO0FBQ0QsZUFBZTtBQUNmLGtCQUFrQjtBQUNsQixlQUFlO0FBQ2YsZUFBZTtBQUNmLGlCQUFpQjtBQUNqQjs7a0JBRWtCO0FBQ2xCO0lBQ0ksc0JBQXNCO0lBQ3RCLDRCQUE0QjtJQUM1QixrQ0FBa0M7SUFDbEMsWUFBWTtJQUNaLFdBQVc7SUFDWCxjQUFjO0lBQ2QsZUFBZSxFQUFFO0FBRW5CO0lBQ0UsWUFBWTtJQUNaLGNBQWMsRUFBRTtBQUNoQjtNQUNFLFdBQVc7TUFDWCxTQUFTO01BQ1QsVUFBVSxFQUFFO0FBQ2Q7TUFDRSxjQUFjO01BQ2QsbUJBQW1CLEVBQUU7QUFFekI7SUFDRSxhQUFhLEVBQUU7QUFFakI7SUFDRSxZQUFZO0lBQ1osZUFBZSxFQUFFO0FBQ2pCO01BQ0UsVUFBVTtNQUNWLGtCQUFrQjtNQUNsQixZQUFZLEVBQUUiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLypcblRlbXBsYXRlIE5hbWU6IEFkbWluIHBybyBBZG1pblxuQXV0aG9yOiBXcmFwcGl4ZWxcbkVtYWlsOiBuaXJhdmpvc2hpODdAZ21haWwuY29tXG5GaWxlOiBzY3NzXG4qL1xuLypcblRlbXBsYXRlIE5hbWU6IEFkbWluIFBybyBBZG1pblxuQXV0aG9yOiBXcmFwcGl4ZWxcbkVtYWlsOiBuaXJhdmpvc2hpODdAZ21haWwuY29tXG5GaWxlOiBzY3NzXG4qL1xuLypUaGVtZSBDb2xvcnMqL1xuLypib290c3RyYXAgQ29sb3IqL1xuLypMaWdodCBjb2xvcnMqL1xuLypOb3JtYWwgQ29sb3IqL1xuLypFeHRyYSBWYXJpYWJsZSovXG4vKioqKioqKioqKioqKioqKioqKlxuTG9naW4gcmVnaXN0ZXIgYW5kIHJlY292ZXIgcGFzc3dvcmQgUGFnZVxuKioqKioqKioqKioqKioqKioqL1xuLmxvZ2luLXJlZ2lzdGVyIHtcbiAgICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyIGNlbnRlcjtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgcGFkZGluZzogMTAlIDA7XG4gICAgcG9zaXRpb246IGZpeGVkOyB9XG4gIFxuICAubG9naW4tYm94IHtcbiAgICB3aWR0aDogNDAwcHg7XG4gICAgbWFyZ2luOiAwIGF1dG87IH1cbiAgICAubG9naW4tYm94IC5mb290ZXIge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBsZWZ0OiAwcHg7XG4gICAgICByaWdodDogMHB4OyB9XG4gICAgLmxvZ2luLWJveCAuc29jaWFsIHtcbiAgICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMzBweDsgfVxuICBcbiAgI3JlY292ZXJmb3JtIHtcbiAgICBkaXNwbGF5OiBub25lOyB9XG4gIFxuICAubG9naW4tc2lkZWJhciB7XG4gICAgcGFkZGluZzogMHB4O1xuICAgIG1hcmdpbi10b3A6IDBweDsgfVxuICAgIC5sb2dpbi1zaWRlYmFyIC5sb2dpbi1ib3gge1xuICAgICAgcmlnaHQ6IDBweDtcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIGhlaWdodDogMTAwJTsgfVxuICAiXX0= */");

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/pages/login.service */ "./src/app/services/pages/login.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);





let LoginComponent = class LoginComponent {
    constructor(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.objLogin = {
            usuario: '',
            contrasena: ''
        };
    }
    ngOnInit() {
    }
    autenticarUsuario(e, obj) {
        e.preventDefault();
        if (obj.usuario === '' || obj.contrasena === '') {
            return;
        }
        else {
            this.loginService.autenticarUsuario(obj)
                .subscribe(response => {
                if (response === 'Autenticado') {
                    this.router.navigate(['/factura']);
                }
                else {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire('Iniciar Sesión', response, 'success');
                }
            }, err => {
                const { status, error } = err;
                if (status === 401) {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire('Iniciar Sesión', error.message, 'error');
                }
                else if (status === 403) {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire('Iniciar Sesión', error.message, 'error');
                }
                else {
                    console.log(error);
                    sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire('Iniciar Sesión', 'Ha ocurrido un error en el servidor', 'error');
                }
            });
        }
    }
};
LoginComponent.ctorParameters = () => [
    { type: _services_pages_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
];
LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-login',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./login.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/login/login.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./login.component.css */ "./src/app/login/login.component.css")).default]
    })
], LoginComponent);



/***/ }),

/***/ "./src/app/modelos/usuario.model.ts":
/*!******************************************!*\
  !*** ./src/app/modelos/usuario.model.ts ***!
  \******************************************/
/*! exports provided: Usuario */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Usuario", function() { return Usuario; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");

class Usuario {
    deserialize(input) {
        return Object.assign(this, input);
    }
    deserializeLista(input) {
        Object.assign(this, input);
        this.permisos = input.permisos.map(permiso => this.deserialize(permiso));
        return this;
    }
}


/***/ }),

/***/ "./src/app/pages/categoria/categoria.component.css":
/*!*********************************************************!*\
  !*** ./src/app/pages/categoria/categoria.component.css ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2NhdGVnb3JpYS9jYXRlZ29yaWEuY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/categoria/categoria.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/categoria/categoria.component.ts ***!
  \********************************************************/
/*! exports provided: CategoriaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoriaComponent", function() { return CategoriaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_categoria_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/pages/categoria.service */ "./src/app/services/pages/categoria.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);




let CategoriaComponent = class CategoriaComponent {
    constructor(categoriaService) {
        this.categoriaService = categoriaService;
        this.objCategoria = {
            id: '',
            descripcion: '',
            codigo: ''
        };
        this.query = '';
    }
    ngOnInit() {
    }
    procesarCategoria(e, obj) {
        if (this.objCategoria.id === '') {
            this.nuevaCategoria(e, obj);
        }
        else {
            this.actualizarCategoria(e, obj);
        }
    }
    nuevaCategoria(e, obj) {
        e.preventDefault();
        console.log(obj);
        this.categoriaService.guardarCategoria(obj)
            .subscribe((response) => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Nueva Categoría', response.message, 'success');
            document.getElementById("formCategoria").reset();
        }, err => console.log(err));
    }
    actualizarCategoria(e, obj) {
        e.preventDefault();
        this.categoriaService.actualizarCategoria(obj)
            .subscribe((response) => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Editar Categoría', response.message, 'success');
            document.getElementById("formCategoria").reset();
        }, err => console.log(err));
    }
    buscarCategoria(e, texto) {
        e.preventDefault();
        if (texto === '') {
            return;
        }
        else {
            this.categoriaService.obtenerCategoria(texto)
                .subscribe((response) => {
                console.log(response);
                document.getElementById("form_buscar_categoria").reset();
                this.objCategoria.id = response.id;
                this.objCategoria.descripcion = response.descripcion;
                this.objCategoria.codigo = response.codigo;
            }, err => console.error(err));
        }
    }
};
CategoriaComponent.ctorParameters = () => [
    { type: _services_pages_categoria_service__WEBPACK_IMPORTED_MODULE_2__["CategoriaService"] }
];
CategoriaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-categoria',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./categoria.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/categoria/categoria.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./categoria.component.css */ "./src/app/pages/categoria/categoria.component.css")).default]
    })
], CategoriaComponent);



/***/ }),

/***/ "./src/app/pages/cliente/cliente.component.css":
/*!*****************************************************!*\
  !*** ./src/app/pages/cliente/cliente.component.css ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#seccionExoneracion {\n    border: 2px solid #D9D9D9;\n    border-radius: 5px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvY2xpZW50ZS9jbGllbnRlLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSx5QkFBeUI7SUFDekIsa0JBQWtCO0FBQ3RCIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvY2xpZW50ZS9jbGllbnRlLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjc2VjY2lvbkV4b25lcmFjaW9uIHtcbiAgICBib3JkZXI6IDJweCBzb2xpZCAjRDlEOUQ5O1xuICAgIGJvcmRlci1yYWRpdXM6IDVweDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/cliente/cliente.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/cliente/cliente.component.ts ***!
  \****************************************************/
/*! exports provided: ClienteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClienteComponent", function() { return ClienteComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_cliente_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/pages/cliente.service */ "./src/app/services/pages/cliente.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);




let ClienteComponent = class ClienteComponent {
    constructor(clienteService) {
        this.clienteService = clienteService;
        this.listaProvincias = [];
        this.listaCantones = [];
        this.listaDistritos = [];
        this.listaBarrios = [];
        this.tipoIdentificacion = [];
        this.listaTipoExoneracion = [];
        this.query = '';
        this.selected = '';
        this.objCliente = {
            id: '',
            cliente_nombre: '',
            cliente_nombre_comercial: '',
            cliente_tipo_identificacion: '',
            cedula_cliente: '',
            numero_cliente: '',
            identificacion_extranjero: '',
            provincia: '',
            canton: '',
            distrito: '',
            cliente_barrio: '',
            otras_senas: '',
            otras_senas_extranjero: '',
            cliente_telefono_codigopais: '',
            cliente_telefono_numtelefono: '',
            cliente_fax_codigopais: '',
            cliente_fax_numtelefono: '',
            cliente_correo: '',
            exentoIVA: 0,
            tipoExoneracion: '',
            porcentajeExoneracion: 0,
            NombreInstitucion: '',
            documentoExoneracion: ''
        };
        this.obtenerProvincias();
        this.tipoExoneracion();
        this.tipoIdentificacion = clienteService.tipoIdentificacion();
    }
    ngOnInit() {
    }
    buscarCliente(e, texto) {
        e.preventDefault();
        if (texto === '') {
            return;
        }
        else {
            this.clienteService.buscarCliente(texto)
                .subscribe((response) => {
                console.log(response);
                // cargar los datos en el formulario de cliente
                this.objCliente.id = response.cliente[0].id;
                const selectProvincia = document.getElementById("provincia");
                this.objCliente.cliente_nombre = response.cliente[0].cliente_nombre;
                this.objCliente.cliente_nombre_comercial = response.cliente[0].cliente_nombre_comercial;
                this.objCliente.cliente_tipo_identificacion = response.cliente[0].cliente_tipo_identificacion;
                this.objCliente.cedula_cliente = response.cliente[0].cedula_cliente;
                this.objCliente.identificacion_extranjero = response.cliente[0].identificacion_extranjero;
                this.objCliente.otras_senas = response.cliente[0].otras_senas;
                this.objCliente.otras_senas_extranjero = response.cliente[0].otras_senas_extranjero;
                this.objCliente.cliente_telefono_codigopais = response.cliente[0].cliente_telefono_codigopais;
                this.objCliente.cliente_telefono_numtelefono = response.cliente[0].cliente_telefono_numtelefono;
                this.objCliente.cliente_fax_codigopais = response.cliente[0].cliente_fax_codigopais;
                this.objCliente.cliente_fax_numtelefono = response.cliente[0].cliente_fax_numtelefono;
                this.objCliente.cliente_correo = response.cliente[0].cliente_correo;
                this.objCliente.exentoIVA = response.cliente[0].exentoIVA;
                this.objCliente.tipoExoneracion = response.cliente[0].tipoExoneracion;
                this.objCliente.porcentajeExoneracion = response.cliente[0].porcentajeExoneracion;
                this.objCliente.NombreInstitucion = response.cliente[0].NombreInstitucion;
                this.objCliente.documentoExoneracion = response.cliente[0].documentoExoneracion;
                // tslint:disable-next-line: forin
                const idProvincia = response.cliente[0].provincia;
                const idCanton = response.cliente[0].canton;
                const idDistrito = response.cliente[0].distrito;
                const idBarrio = response.cliente[0].cliente_barrio;
                for (let i in selectProvincia.options) {
                    if (typeof selectProvincia.options[i].value !== 'undefined') {
                        if (selectProvincia.options[i].value.split(':')[0] == idProvincia.trim()) {
                            // selectProvincia.options[i].selected = true;
                            this.objCliente.provincia = idProvincia;
                            this.objCliente.canton = idCanton;
                            this.objCliente.distrito = idDistrito;
                            this.objCliente.cliente_barrio = idBarrio;
                            this.obtenerCantones();
                            this.obtenerDistritos(idProvincia.trim(), idCanton.trim());
                            this.obtenerBarrios(idProvincia.trim(), idCanton.trim(), idDistrito.trim());
                        }
                    }
                }
            }, err => {
                if (err.status === 404) {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Buscar Cliente', err.error.message, 'error');
                }
            });
        }
    }
    procesarCliente(e, obj) {
        if (obj.id === '') {
            this.nuevoCliente(e, obj);
        }
        else {
            this.actualizarCliente(e, obj);
        }
    }
    nuevoCliente(e, obj) {
        e.preventDefault();
        this.objCliente.cliente_barrio.toString().trim();
        const checkExento = document.getElementById('exentoIVA');
        let estaExento = 0;
        let numero_cliente = '';
        if (obj.cedula_cliente.length === 9) {
            numero_cliente = '000' + obj.cedula_cliente;
        }
        if (obj.cedula_cliente.length === 10) {
            numero_cliente = '00' + obj.cedula_cliente;
        }
        if (obj.cedula_cliente.length === 11) {
            numero_cliente = '0' + obj.cedula_cliente;
        }
        if (obj.cedula_cliente.length === 12) {
            numero_cliente = obj.cedula_cliente;
        }
        if (checkExento.checked) {
            estaExento = 1;
        }
        obj.numero_cliente = numero_cliente;
        obj.exentoIVA = estaExento;
        this.clienteService.guardarCliente(obj)
            .subscribe((response) => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Nuevo Cliente', response.message, 'success');
            document.getElementById('form_cliente').reset();
        }, err => {
            console.log(err);
        });
    }
    actualizarCliente(e, obj) {
        e.preventDefault();
        console.log("Actualizar");
        let numero_cliente = '';
        const nombre = document.getElementById('cliente_nombre');
        const nombreComercial = document.getElementById('cliente_nombre_comercial');
        const tipoIdentificacion = document.getElementById('cliente_tipo_identificacion');
        const selectBarrio = document.getElementById("barrio");
        const otras_senas = document.getElementById("otras_senas");
        const otras_senas_extranjero = document.getElementById("otras_senas_extranjero");
        const cedula_cliente = document.getElementById("cedula_cliente");
        const identificacion_extranjero = document.getElementById("identificacion_extranjero");
        const cliente_telefono_codigopais = document.getElementById("cliente_telefono_codigopais");
        const cliente_telefono_numtelefono = document.getElementById("cliente_telefono_numtelefono");
        const cliente_fax_codigopais = document.getElementById("cliente_fax_codigopais");
        const cliente_fax_numtelefono = document.getElementById("cliente_fax_numtelefono");
        const cliente_correo = document.getElementById("cliente_correo");
        const checkExento = document.getElementById("exentoIVA");
        let estaExento = 0;
        if (cedula_cliente.value.length === 9) {
            numero_cliente = '000' + cedula_cliente.value;
        }
        if (cedula_cliente.value.length === 10) {
            numero_cliente = '00' + cedula_cliente.value;
        }
        if (cedula_cliente.value.length === 11) {
            numero_cliente = '0' + cedula_cliente.value;
        }
        if (cedula_cliente.value.length === 12) {
            numero_cliente = cedula_cliente.value;
        }
        if (checkExento.checked) {
            estaExento = 1;
        }
        obj.numero_cliente = numero_cliente;
        obj.cliente_nombre = nombre.value,
            obj.cliente_nombre_comercial = nombreComercial.value,
            obj.cliente_tipo_identificacion = tipoIdentificacion.value.split(': ')[1],
            obj.cedula_cliente = cedula_cliente.value,
            obj.identificacion_extranjero = identificacion_extranjero.value,
            obj.cliente_barrio = selectBarrio.value.split(': ')[1],
            obj.otras_senas = otras_senas.value,
            obj.otras_senas_extranjero = otras_senas_extranjero.value,
            obj.cliente_telefono_codigopais = cliente_telefono_codigopais.value,
            obj.cliente_telefono_numtelefono = cliente_telefono_numtelefono.value,
            obj.cliente_fax_codigopais = cliente_fax_codigopais.value,
            obj.cliente_fax_numtelefono = cliente_fax_numtelefono.value,
            obj.cliente_correo = cliente_correo.value,
            obj.exentoIVA = estaExento;
        this.clienteService.actualizarCliente(obj)
            .subscribe((response) => {
            console.log(response);
            this.objCliente.id = '';
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Actualizar Cliente', response.message, 'success');
            document.getElementById("form_cliente").reset();
        }, err => {
            console.log(err);
        });
    }
    obtenerProvincias() {
        // tslint:disable-next-line: semicolon
        this.clienteService.obtenerProvincias()
            .subscribe((response) => {
            this.listaProvincias = response.provincias;
        });
    }
    obtenerCantones() {
        console.log(this.objCliente);
        const idprovincia = this.objCliente.provincia;
        this.clienteService.obtenerCantones(idprovincia.trim())
            .subscribe((response) => {
            this.listaCantones = response.cantones;
        });
    }
    obtenerDistritos(idprovincia, idcanton) {
        const obj = {
            idprovincia,
            idcanton
        };
        this.clienteService.obtenerDistritos(obj)
            .subscribe((response) => {
            this.listaDistritos = response.distritos;
        });
    }
    obtenerBarrios(idprovincia, idcanton, iddistrito) {
        const obj = {
            idprovincia: idprovincia.trim(),
            idcanton: idcanton.trim(),
            iddistrito: iddistrito.trim()
        };
        this.clienteService.obtenerBarrios(obj)
            .subscribe((response) => {
            this.listaBarrios = response.barrios;
        });
    }
    tipoExoneracion() {
        this.clienteService.tipoExoneracion()
            .subscribe((response) => {
            this.listaTipoExoneracion = response.tipoExoneracion;
        }, err => console.error(err));
    }
};
ClienteComponent.ctorParameters = () => [
    { type: _services_pages_cliente_service__WEBPACK_IMPORTED_MODULE_2__["ClienteService"] }
];
ClienteComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-cliente',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./cliente.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/cliente/cliente.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./cliente.component.css */ "./src/app/pages/cliente/cliente.component.css")).default]
    })
], ClienteComponent);



/***/ }),

/***/ "./src/app/pages/consulta/consulta.component.css":
/*!*******************************************************!*\
  !*** ./src/app/pages/consulta/consulta.component.css ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#ModalPreFactura {\n    width: 800px;\n}\n\ntable#tbody_lineas{\n    overflow:scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvY29uc3VsdGEvY29uc3VsdGEuY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxlQUFlO0FBQ25CIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvY29uc3VsdGEvY29uc3VsdGEuY29tcG9uZW50LmNzcyIsInNvdXJjZXNDb250ZW50IjpbIiNNb2RhbFByZUZhY3R1cmEge1xuICAgIHdpZHRoOiA4MDBweDtcbn1cblxudGFibGUjdGJvZHlfbGluZWFze1xuICAgIG92ZXJmbG93OnNjcm9sbDtcbn0iXX0= */");

/***/ }),

/***/ "./src/app/pages/consulta/consulta.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/consulta/consulta.component.ts ***!
  \******************************************************/
/*! exports provided: ConsultaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsultaComponent", function() { return ConsultaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_consulta_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/pages/consulta.service */ "./src/app/services/pages/consulta.service.ts");



let ConsultaComponent = class ConsultaComponent {
    constructor(consultaService) {
        this.consultaService = consultaService;
        this.idfactura = '';
        this.objBusquedaFacturas = {
            fechaInicio: '',
            fechaFin: '',
            numeroInterno: '',
            nombreCliente: '',
            claveNumerica: '',
            consecutivo: '',
            tipoFactura: ''
        };
        this.objFacturaResultado = {
            id: '',
            clave: '',
            consecutivo: '',
            descuentoTotal: 0,
            porcentajeDescuentoTotal: 0,
            subtotal: 0,
            medioPago: '',
            condicionVenta: '',
            totalservgravados: 0,
            totalservexentos: 0,
            totalservexonerado: 0,
            totalmercanciasgravadas: 0,
            totalmercanciasexentas: 0,
            totalmercanciaexonerada: 0,
            totalgravado: 0,
            totalexento: 0,
            totalexonerado: 0,
            totalventa: 0,
            totaldescuentos: 0,
            totalventaneta: 0,
            totalimpuesto: 0,
            totalcomprobante: 0,
            codigomoneda: '',
            tipocambio: '',
            fechaFactura: '',
            tipoFactura: ''
        };
        this.arrayOrdenes = [];
        this.arrayComprobantes = [];
        this.tiposDocumento = [];
        this.mediosPago = [];
        this.condicionesVenta = [];
        this.tipoDocumento();
        this.medioPago();
        this.condicionVenta();
    }
    ngOnInit() {
    }
    buscarFacturas(obj) {
        const objetoFactura = {};
        objetoFactura.tipoFactura = obj.tipoFactura;
        if (obj.fechaInicio != '' && obj.fin != '') {
            // Obtener los valores de las fechas
            const fecha1 = new Date(obj.fechaInicio);
            const fecha2 = new Date(obj.fechaFin);
            // tslint:disable-next-line: one-variable-per-declaration
            let mes1, dia1, anio1;
            // tslint:disable-next-line: one-variable-per-declaration
            let mes2, dia2, anio2;
            let fechaInicio;
            let fechaFin;
            anio1 = fecha1.getFullYear().toString();
            mes1 = (fecha1.getMonth() < 10) ? String('0' + Number(fecha1.getMonth() + 1)) : String(Number(fecha1.getMonth() + 1));
            dia1 = (fecha1.getDate() < 10) ? String('0' + Number(fecha1.getDate() + 1)) : String(Number(fecha1.getDate() + 1));
            anio2 = fecha2.getFullYear().toString();
            mes2 = (fecha2.getMonth() < 10) ? String('0' + Number(fecha2.getMonth() + 1)) : String(Number(fecha2.getMonth() + 1));
            dia2 = (fecha2.getDate() < 10) ? String('0' + Number(fecha2.getDate() + 1)) : String(Number(fecha2.getDate() + 1));
            if (Number(dia1) > Number(dia2) && mes1 == mes2 && anio1 == anio2) {
                alert('La fecha de inicio no se ser mayor a la fecha de fin');
            }
            if (dia1 == dia2 && Number(mes1) > Number(mes2) && anio1 == anio2) {
                alert('La fecha de inicio no se ser mayor a la fecha de fin');
            }
            if (Number(dia1) > Number(dia2) && Number(mes1) > Number(mes2) && Number(anio1) > Number(anio2)) {
                alert('La fecha de inicio no se ser mayor a la fecha de fin');
            }
            if (Number(anio1) > Number(anio2)) {
                alert('La fecha de inicio no se ser mayor a la fecha de fin');
            }
            fechaInicio = anio1 + '-' + mes1 + '-' + dia1;
            fechaFin = anio2 + '-' + mes2 + '-' + dia2;
            objetoFactura.fechaInicio = fechaInicio;
            objetoFactura.fechaFin = fechaFin;
        }
        if (obj.numeroInterno != '') {
            objetoFactura.numeroInterno = obj.numeroInterno;
        }
        if (obj.claveNumerica != '') {
            objetoFactura.claveNumerica = obj.claveNumerica;
        }
        if (obj.consecutivo != '') {
            objetoFactura.consecutivo = obj.consecutivo;
        }
        if (obj.nombreCliente != '') {
            objetoFactura.nombreCliente = obj.nombreCliente;
        }
        this.consultaService.buscarFacturas(objetoFactura)
            .subscribe((response) => {
            console.log(response.data);
            this.arrayComprobantes = response.data;
            localStorage.setItem('comprobantes', JSON.stringify(response.data));
            localStorage.setItem('filtros', JSON.stringify(objetoFactura));
        }, err => console.error(err));
    }
    tipoDocumento() {
        this.consultaService.tipoDocumento()
            .subscribe((response) => {
            this.tiposDocumento = response.tipoDocumento;
        }, err => console.error(err));
    }
    reporteFactura(id) {
        console.log(id);
        this.consultaService.reporteFactura(id)
            .subscribe((response) => {
            if (response.factura[0].tipo_factura === '01') {
                this.objFacturaResultado.tipoFactura = 'Factura Electrónica';
            }
            else if (response.factura[0].tipo_factura === '04') {
                this.objFacturaResultado.tipoFactura = 'Tiquete Electrónico';
            }
            else if (response.factura[0].tipo_factura === '03') {
                this.objFacturaResultado.tipoFactura = 'Nota de Crédito';
            }
            // cargar datos totales y encabezado de factura
            this.objFacturaResultado.clave = response.factura[0].clavenumerica;
            this.objFacturaResultado.consecutivo = response.factura[0].consecutivo;
            this.objFacturaResultado.medioPago = response.factura[0].medio_pago;
            this.objFacturaResultado.condicionVenta = response.factura[0].condicion_venta;
            this.objFacturaResultado.fechaFactura = response.factura[0].fecha_factura;
            this.objFacturaResultado.porcentajeDescuentoTotal = response.factura[0].porcentaje_descuento_total;
            this.objFacturaResultado.descuentoTotal = response.factura[0].monto_descuento_total;
            this.objFacturaResultado.subtotal = response.factura[0].subtotal;
            this.objFacturaResultado.totalservgravados = response.factura[0].totalservgravados;
            this.objFacturaResultado.totalservexentos = response.factura[0].totalservexentos;
            this.objFacturaResultado.totalservexonerado = response.factura[0].totalservexonerado;
            this.objFacturaResultado.totalmercanciasgravadas = response.factura[0].totalmercanciasgravadas;
            this.objFacturaResultado.totalmercanciasexentas = response.factura[0].totalmercanciasexentas;
            this.objFacturaResultado.totalmercanciaexonerada = response.factura[0].totalmercanciaexonerada;
            this.objFacturaResultado.totalgravado = response.factura[0].totalgravado;
            this.objFacturaResultado.totalexento = response.factura[0].totalexento;
            this.objFacturaResultado.totalexonerado = response.factura[0].totalexonerado;
            this.objFacturaResultado.totalventa = response.factura[0].totalventa;
            this.objFacturaResultado.totaldescuentos = response.factura[0].totaldescuentos;
            this.objFacturaResultado.totalventaneta = response.factura[0].totalventaneta;
            this.objFacturaResultado.totalimpuesto = response.factura[0].totalimpuesto;
            this.objFacturaResultado.totalcomprobante = response.factura[0].totalcomprobante;
            this.objFacturaResultado.tipocambio = response.factura[0].tipocambio;
            this.objFacturaResultado.id = response.factura[0].id;
            this.arrayOrdenes = response.ordenes;
            console.log(this.arrayOrdenes);
        }, err => console.error(err));
    }
    medioPago() {
        this.consultaService.medioPago()
            .subscribe((response) => {
            console.log(response);
            this.mediosPago = response.medioPago;
        }, err => console.error(err));
    }
    condicionVenta() {
        this.consultaService.condicionVenta()
            .subscribe((response) => {
            console.log(response);
            this.condicionesVenta = response.condicionVenta;
        }, err => console.error(err));
    }
    descargarPDF(id, tipo) {
        try {
            this.consultaService.descargarPDF({ id, tipo });
        }
        catch (err) {
            console.error(err);
        }
    }
    enviarCorreo() {
        const tipo = '02';
        const id = this.idfactura;
        const listaCorreos = [];
        const correo1 = document.getElementById('correo1').value;
        const correo2 = document.getElementById('correo2').value;
        const correo3 = document.getElementById('correo3').value;
        if (correo1.length > 0) {
            listaCorreos.push(correo1);
        }
        if (correo2.length > 0) {
            listaCorreos.push(correo2);
        }
        if (correo3.length > 0) {
            listaCorreos.push(correo3);
        }
        $('#ModalCorreos').modal('hide');
        this.consultaService.enviarCorreo({ id, tipo, listaCorreos })
            .subscribe(response => {
            console.log(response);
        }, err => console.log(err));
    }
    cargarFactura(id) {
        this.idfactura = id;
    }
    descargarReporteExcel(obj) {
        console.log(obj);
        try {
            if (this.arrayComprobantes.length === 0) {
                return;
            }
            else {
                this.consultaService.reporteExcel(this.arrayComprobantes);
            }
        }
        catch (err) {
            console.error(err);
        }
    }
    cargarVistaFacturas(obj) {
        try {
            this.consultaService.cargarVistaFacturas(obj);
        }
        catch (err) {
            console.error(err);
        }
    }
    anularComprobante(id) {
        this.consultaService.anularComprobante(id)
            .subscribe(response => {
            console.log(response);
        }, err => console.error(err));
    }
};
ConsultaComponent.ctorParameters = () => [
    { type: _services_pages_consulta_service__WEBPACK_IMPORTED_MODULE_2__["ConsultaService"] }
];
ConsultaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-consulta',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./consulta.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/consulta/consulta.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./consulta.component.css */ "./src/app/pages/consulta/consulta.component.css")).default]
    })
], ConsultaComponent);



/***/ }),

/***/ "./src/app/pages/descuento/descuento.component.css":
/*!*********************************************************!*\
  !*** ./src/app/pages/descuento/descuento.component.css ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2Rlc2N1ZW50by9kZXNjdWVudG8uY29tcG9uZW50LmNzcyJ9 */");

/***/ }),

/***/ "./src/app/pages/descuento/descuento.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/descuento/descuento.component.ts ***!
  \********************************************************/
/*! exports provided: DescuentoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DescuentoComponent", function() { return DescuentoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_descuento_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/pages/descuento.service */ "./src/app/services/pages/descuento.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);




let DescuentoComponent = class DescuentoComponent {
    constructor(descuentoService) {
        this.descuentoService = descuentoService;
        this.objDescuento = {
            id: '',
            porcentaje: '',
            descripcion: ''
        };
        this.query = '';
    }
    ngOnInit() {
    }
    procesarDescuento(e, obj) {
        if (this.objDescuento.id === '') {
            this.nuevoDescuento(e, obj);
        }
        else {
            this.actualizarDescuento(e, obj);
        }
    }
    nuevoDescuento(e, obj) {
        console.log(obj);
        e.preventDefault();
        this.descuentoService.guardarDescuento(obj)
            .subscribe((response) => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Nuevo Descuento', response.message, 'success');
            document.getElementById("formDescuento").reset();
        });
    }
    actualizarDescuento(e, obj) {
        e.preventDefault();
        this.descuentoService.actualizarDescuento(obj)
            .subscribe((response) => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Editar Descuento', response.message, 'success');
            document.getElementById("formDescuento").reset();
        });
    }
    buscarDescuento(e, texto) {
        e.preventDefault();
        if (texto === '') {
            return;
        }
        else {
            this.descuentoService.buscarDescuento(texto)
                .subscribe((response) => {
                this.objDescuento.id = response.id;
                this.objDescuento.descripcion = response.descripcion;
                this.objDescuento.porcentaje = response.porcentaje;
            }, err => console.log(err));
        }
    }
};
DescuentoComponent.ctorParameters = () => [
    { type: _services_pages_descuento_service__WEBPACK_IMPORTED_MODULE_2__["DescuentoService"] }
];
DescuentoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-descuento',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./descuento.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/descuento/descuento.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./descuento.component.css */ "./src/app/pages/descuento/descuento.component.css")).default]
    })
], DescuentoComponent);



/***/ }),

/***/ "./src/app/pages/emisor/emisor.component.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/emisor/emisor.component.ts ***!
  \**************************************************/
/*! exports provided: EmisorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmisorComponent", function() { return EmisorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_emisor_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/pages/emisor.service */ "./src/app/services/pages/emisor.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);




let EmisorComponent = class EmisorComponent {
    constructor(emisorService) {
        this.emisorService = emisorService;
        this.query = '';
        this.objEmisor = {
            id: '',
            emisor_nombre: '',
            emisor_nombrecomercial: '',
            tipoIdentificacion: '',
            emisor_cedula: '',
            provincia: '',
            canton: '',
            distrito: '',
            barrio: '',
            otras_senas: '',
            tel_codigo_pais: '',
            num_telefono: '',
            fax_codigo_pais: '',
            fax_num_telefono: '',
            correo: '',
            casamatriz: '',
            puntoventa: '',
            codigo_servicio: '',
            tipo_codigo_servicio: '',
            codigo_actividad: '',
            client_id: '',
            API_TOKEN: '',
            API: '',
            numero_resolucion: '',
            fecha_resolucion: '',
            user_hacienda: '',
            password_hacienda: '',
            file_p12: '',
            contrasenaP12: ''
        };
        this.objDataActividad = {
            descripcion: '',
            nombre: '',
            codigo: '',
            cedula: ''
        };
        this.tipoIdentificacion = [];
        this.tipoServicio = [];
        this.listaProvincias = [];
        this.listaCantones = [];
        this.listaDistritos = [];
        this.listaBarrios = [];
        this.listaActividades = [];
        this.obtenerProvincias();
        this.tipoIdentificacion = emisorService.tipoIdentificacion();
        this.tipoServicio = emisorService.tipoServicio();
    }
    ngOnInit() {
    }
    buscarEmisor(e, texto) {
        e.preventDefault();
        if (texto === '') {
            return;
        }
        else {
            this.emisorService.buscarEmisor(texto)
                .subscribe((response) => {
                document.getElementById("formBuscarEmisor").reset();
                this.objEmisor.id = response.emisor[0].id;
                console.log(response.emisor);
                this.objEmisor.emisor_nombre = response.emisor[0].emisor_nombre;
                this.objEmisor.emisor_nombrecomercial = response.emisor[0].emisor_nombrecomercial;
                this.objEmisor.tipoIdentificacion = response.emisor[0].emisor_tipo_identificacion;
                this.objEmisor.emisor_cedula = response.emisor[0].cedula_emisor;
                this.objEmisor.provincia = response.emisor[0].provincia;
                this.objEmisor.canton = response.emisor[0].canton;
                this.objEmisor.distrito = response.emisor[0].distrito;
                this.objEmisor.barrio = response.emisor[0].codigo;
                this.objEmisor.otras_senas = response.emisor[0].emisor_otras_senas;
                this.objEmisor.tel_codigo_pais = response.emisor[0].emisor_telefono_codigopais;
                this.objEmisor.num_telefono = response.emisor[0].emisor_telefono_numtelefono;
                this.objEmisor.fax_codigo_pais = response.emisor[0].emisor_fax_codigopais;
                this.objEmisor.fax_num_telefono = response.emisor[0].emisor_fax_numtelefono;
                this.objEmisor.correo = response.emisor[0].emisor_correo;
                this.objEmisor.casamatriz = response.emisor[0].casaMatriz;
                this.objEmisor.puntoventa = response.emisor[0].puntoVenta;
                this.objEmisor.contrasenaP12 = response.emisor[0].pin_p12;
                this.objEmisor.user_hacienda = response.emisor[0].key_username_hacienda;
                this.objEmisor.password_hacienda = response.emisor[0].key_password_hacienda;
                this.objEmisor.codigo_actividad = response.emisor[0].codigo_actividad;
                this.objEmisor.codigo_servicio = response.emisor[0].tipo_codigo_servicio;
                this.objEmisor.API = response.emisor[0].API;
                this.objEmisor.API_TOKEN = response.emisor[0].TOKEN_API;
                this.objEmisor.client_id = response.emisor[0].Client_ID;
                this.objEmisor.numero_resolucion = response.emisor[0].numeroresolucion;
                this.objEmisor.fecha_resolucion = response.emisor[0].fecharesolucion;
                this.obtenerProvincias();
                this.obtenerCantones();
                this.obtenerDistritos(this.objEmisor.provincia.trim(), this.objEmisor.canton.trim());
                this.obtenerBarrios(this.objEmisor.provincia.trim(), this.objEmisor.canton.trim(), this.objEmisor.distrito.trim());
            }, err => {
                console.log(err);
                if (err.status === 404) {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Buscar Emisor', err.error.message, 'error');
                }
            });
        }
    }
    nuevoEmisor(e, obj) {
        // formatear informacion a formData para enviar el archivo p12 del emisor
        e.preventDefault();
        // <HTMLInputElement> ESTO CASTEA EL DATO DE ENTRADA COMO SI FUERA LEER UN CAMPO DE HTML EN 
        // JAVASCRIPT PURO
        const File = document.getElementById('file_p12'); // con esa linea voy a subir la
        if (File.value.length === 0) { // validar que algo se ha subido
            alert('No ha cargado ningun archivo');
            return;
        }
        else { // aqui entra al if de validar el tipo de archivo
            if (File.files[0].type === 'application/x-pkcs12') { // si el archivo es de tipo p12 pasa
                const formData = new FormData();
                let numero_emisor = '';
                if (obj.emisor_cedula.length === 9) {
                    numero_emisor = '000' + obj.emisor_cedula;
                }
                if (obj.emisor_cedula.length === 10) {
                    numero_emisor = '00' + obj.emisor_cedula;
                }
                if (obj.emisor_cedula.length === 11) {
                    numero_emisor = '0' + obj.emisor_cedula;
                }
                if (obj.emisor_cedula.length === 12) {
                    numero_emisor = obj.emisor_cedula;
                }
                formData.append('emisor_nombre', obj.emisor_nombre);
                formData.append('emisor_nombrecomercial', obj.emisor_nombrecomercial);
                formData.append('emisor_tipo_identificacion', obj.tipoIdentificacion);
                formData.append('cedula_emisor', obj.emisor_cedula);
                formData.append('numero_emisor', numero_emisor);
                formData.append('emisor_barrio', obj.barrio);
                formData.append('emisor_otras_senas', obj.otras_senas);
                formData.append('emisor_telefono_codigopais', obj.tel_codigo_pais);
                formData.append('emisor_telefono_numtelefono', obj.num_telefono);
                formData.append('emisor_fax_codigopais', obj.fax_codigo_pais);
                formData.append('emisor_fax_numtelefono', obj.fax_num_telefono);
                formData.append('emisor_correo', obj.correo);
                formData.append('file_p12', File.files[0]);
                formData.append('pin_p12', obj.contrasenaP12);
                formData.append('key_username_hacienda', obj.user_hacienda);
                formData.append('key_password_hacienda', obj.password_hacienda);
                formData.append('casaMatriz', obj.casamatriz);
                formData.append('puntoVenta', obj.puntoventa);
                formData.append('codigo_actividad', obj.codigo_actividad);
                formData.append('tipo_codigo_servicio', '01');
                formData.append('codigo_servicio', obj.codigo_servicio);
                formData.append('Client_ID', obj.client_id);
                formData.append('API', obj.API);
                formData.append('TOKEN_API', obj.API_TOKEN);
                formData.append('numeroresolucion', obj.numero_resolucion);
                formData.append('fecharesolucion', obj.fecha_resolucion);
                this.emisorService.guardarEmisor(formData)
                    .subscribe((response) => {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Nuevo Emisor', response.message, 'success');
                    document.getElementById("formEmisor").reset();
                });
            }
            else {
                console.log('Archivo no permitido');
                return;
            }
        }
    }
    procesarEmisor(e, obj) {
        if (this.objEmisor.id === '') {
            this.nuevoEmisor(e, obj);
        }
        else {
            this.actualizarEmisor(e, obj);
        }
    }
    obtenerActividades(e, query) {
        e.preventDefault();
        if (query === '') {
            return;
        }
        else {
            console.log(query);
            this.emisorService.obtenerCodigosActividad(query)
                .subscribe((response) => {
                this.objDataActividad.nombre = response.nombre;
                this.objDataActividad.codigo = response.actividades[0].codigo;
                this.objDataActividad.descripcion = response.actividades[0].descripcion;
            }, err => console.error(err));
        }
    }
    cargarActividad(codigo) {
        console.log(codigo);
        this.objEmisor.codigo_actividad = codigo;
        document.getElementById('formActividad').reset();
        $('#formBuscarActividad').modal('hide');
    }
    actualizarEmisor(e, obj) {
        e.preventDefault();
        const File = document.getElementById('file_p12');
        if (File.value.length > 0) {
            if (File.files[0].type !== 'application/x-pkcs12') {
                return alert("El tipo de archivo que intenta subir no está permitido");
            }
            else {
                const formData = new FormData();
                const selectTipoServicio = document.getElementById("codigo_servicio");
                const codigo = selectTipoServicio.options[selectTipoServicio.selectedIndex].text;
                const tipo = selectTipoServicio.options[selectTipoServicio.selectedIndex].value;
                const File = document.getElementById('file_p12');
                let numero_emisor = '';
                if (obj.emisor_cedula.length === 9) {
                    numero_emisor = '000' + obj.emisor_cedula;
                }
                if (obj.emisor_cedula.length === 10) {
                    numero_emisor = '00' + obj.emisor_cedula;
                }
                if (obj.emisor_cedula.length === 11) {
                    numero_emisor = '0' + obj.emisor_cedula;
                }
                if (obj.emisor_cedula.length === 12) {
                    numero_emisor = obj.emisor_cedula;
                }
                obj.numero_emisor = numero_emisor;
                //INFORMACION FORMATEADA
                obj.codigo_servicio = codigo;
                obj.tipo_codigo_servicio = tipo.split(": ")[1];
                formData.append("id", obj.id);
                formData.append('emisor_nombre', obj.emisor_nombre);
                formData.append('emisor_nombrecomercial', obj.emisor_nombrecomercial);
                formData.append('emisor_tipo_identificacion', obj.tipoIdentificacion);
                formData.append('cedula_emisor', obj.emisor_cedula);
                formData.append('numero_emisor', obj.numero_emisor);
                formData.append('emisor_barrio', obj.barrio);
                formData.append('emisor_otras_senas', obj.otras_senas);
                formData.append('emisor_telefono_codigopais', obj.tel_codigo_pais);
                formData.append('emisor_telefono_numtelefono', obj.num_telefono);
                formData.append('emisor_fax_codigopais', obj.fax_codigo_pais);
                formData.append('emisor_fax_numtelefono', obj.fax_num_telefono);
                formData.append('emisor_correo', obj.correo);
                formData.append('file_p12', File.files[0]);
                formData.append('pin_p12', obj.contrasenaP12);
                formData.append('key_username_hacienda', obj.user_hacienda);
                formData.append('key_password_hacienda', obj.password_hacienda);
                formData.append('casaMatriz', obj.casamatriz);
                formData.append('puntoVenta', obj.puntoventa);
                formData.append('codigo_actividad', obj.codigo_actividad);
                formData.append('tipo_codigo_servicio', obj.tipo_codigo_servicio);
                formData.append('codigo_servicio', obj.codigo_servicio);
                formData.append('Client_ID', obj.client_id);
                formData.append('API', obj.API);
                formData.append('TOKEN_API', obj.API_TOKEN);
                formData.append('numeroresolucion', obj.numero_resolucion);
                formData.append('fecharesolucion', obj.fecha_resolucion);
                this.emisorService.actualizarEmisor(formData)
                    .subscribe((response) => {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Editar Emisor', response.message, 'success');
                    document.getElementById("formEmisor").reset();
                }, err => {
                    console.log(err);
                    if (err.status == 500) {
                        sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Actualizar Emisor', 'No se pudo actualizar el emisor', 'error');
                        document.getElementById("formEmisor").reset();
                    }
                });
            }
        }
    }
    obtenerProvincias() {
        // tslint:disable-next-line: semicolon
        this.emisorService.obtenerProvincias()
            .subscribe((response) => {
            this.listaProvincias = response.provincias;
        });
    }
    obtenerCantones() {
        const idprovincia = this.objEmisor.provincia;
        this.emisorService.obtenerCantones(idprovincia.trim())
            .subscribe((response) => {
            this.listaCantones = response.cantones;
        });
    }
    obtenerDistritos(idprovincia, idcanton) {
        const obj = {
            idprovincia,
            idcanton
        };
        this.emisorService.obtenerDistritos(obj)
            .subscribe((response) => {
            this.listaDistritos = response.distritos;
        });
    }
    obtenerBarrios(idprovincia, idcanton, iddistrito) {
        const obj = {
            idprovincia: idprovincia.trim(),
            idcanton: idcanton.trim(),
            iddistrito: iddistrito.trim()
        };
        this.emisorService.obtenerBarrios(obj)
            .subscribe((response) => {
            this.listaBarrios = response.barrios;
        });
    }
};
EmisorComponent.ctorParameters = () => [
    { type: _services_pages_emisor_service__WEBPACK_IMPORTED_MODULE_2__["EmisorService"] }
];
EmisorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-emisor',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./emisor.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/emisor/emisor.component.html")).default
    })
], EmisorComponent);



/***/ }),

/***/ "./src/app/pages/factura/factura.component.css":
/*!*****************************************************!*\
  !*** ./src/app/pages/factura/factura.component.css ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ZhY3R1cmEvZmFjdHVyYS5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/pages/factura/factura.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/factura/factura.component.ts ***!
  \****************************************************/
/*! exports provided: FacturaComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacturaComponent", function() { return FacturaComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_factura_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/pages/factura.service */ "./src/app/services/pages/factura.service.ts");
/* harmony import */ var _services_pages_cliente_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/pages/cliente.service */ "./src/app/services/pages/cliente.service.ts");
/* harmony import */ var _services_pages_descuento_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../services/pages/descuento.service */ "./src/app/services/pages/descuento.service.ts");
/* harmony import */ var _services_pages_producto_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../services/pages/producto.service */ "./src/app/services/pages/producto.service.ts");






let FacturaComponent = class FacturaComponent {
    constructor(facturaService, clienteService, descuentoService, productoService) {
        this.facturaService = facturaService;
        this.clienteService = clienteService;
        this.descuentoService = descuentoService;
        this.productoService = productoService;
        this.fechaActual = '';
        this.objDataCliente = {
            nombre: '',
            cedula: '',
            query: '',
            id: '',
            correo: '',
            telefono: '',
            nombreComercial: ''
        };
        this.objFactura = {
            id: '',
            idcliente: '1',
            idemisor: '1',
            nombreCliente: '',
            condicion_venta: '',
            medio_pago: '',
            porcentaje_descuento_total: '',
            monto_descuento_total: '',
            subtotal: '',
            totalservgravados: '',
            totalservexentos: '',
            totalservexonerado: '',
            totalmercanciasgravadas: '',
            totalmercanciasexentas: '',
            totalmercanciaexonerada: '',
            totalgravado: '',
            totalexento: '',
            totalexonerado: '',
            totalventa: '',
            totaldescuentos: '',
            totalventaneta: '',
            totalimpuesto: '',
            totalcomprobante: '',
            codigomoneda: '',
            tipocambio: '',
            tipo_factura: '',
            ordenes: [],
            objOrdenes: {}
        };
        this.objCliente = {
            cliente_nombre: '',
            cliente_nombre_comercial: '',
            cliente_tipo_identificacion: '',
            cedula_cliente: '',
            numero_cliente: '',
            identificacion_extranjero: '',
            provincia: '',
            canton: '',
            distrito: '',
            cliente_barrio: '',
            otras_senas: '',
            otras_senas_extranjero: '',
            cliente_telefono_codigopais: '',
            cliente_telefono_numtelefono: '',
            cliente_fax_codigopais: '',
            cliente_fax_numtelefono: '',
            cliente_correo: '',
        };
        this.objBusquedaProducto = {
            id: '',
            descripcion: '',
            codigo: '',
            query: ''
        };
        this.lineaDetalle = {
            idfactura: '',
            idproducto: '',
            precio_linea: '',
            cantidad: '',
            descripcioDetalle: '',
            porcentajedescuento: '',
            montodescuento: '',
            naturalezadescuento: '',
            numerolineadetalle: '',
            subtotal: '',
            montototal: '',
            codigo: '',
            codigo_tarifa: '',
            codigo_servicio: '',
            tipo_servicio: '',
            tarifa: '',
            unidadMedida: '',
            unidadMedidaComercial: '',
            monto: '',
            baseimponible: '',
            impuesto: '',
            impuesto_neto: '',
            numerodocumento: '',
            montoitotallinea: '',
            MontoExoneracion: ''
        };
        this.objProducto = {
            id: '',
            descripcion: '',
            codigo_barra: '',
            precio_producto: '',
            precio_final: '',
            costo_unitario: '',
            unidad_medida: '',
            unidad_medida_comercial: '',
            tipo_servicio: '',
            codigo_servicio: '',
            tipo_impuesto: '',
            idcategoria: '',
            iddescuento: ''
        };
        this.tipoDocumento = [];
        this.condicionVenta = [];
        this.medioPago = [];
        this.listaMonedas = [];
        this.arrayDetalles = [];
        this.tipoIdentificacion = [];
        this.provincia = [];
        this.canton = [];
        this.distrito = [];
        this.barrio = [];
        this.descuentos = [];
        this.unidadesMedida = [];
        this.tipoImpuesto = [];
        this.listaServicios = [];
        this.listaCategorias = [];
        this.listaProductos = [];
        this.totalPagar = '0';
        this.totalImpuesto = '0';
        this.totalDescuento = '0';
        this.SubtotalComprobante = '0';
        this.porcentajeExoneracion = 0;
        this.obtenerTipoCambio();
        this.mostrarFechaHora();
        this.obtenerMonedas();
        this.obtenerDescuentos();
        this.obtenerUnidadesMedida();
        this.obtenerImpuesto();
        this.obtenerProvincias();
        this.obtenerCategorias();
        this.listarOrdenes();
        this.TipoDocumento();
        this.MedioPago();
        this.CondicionVenta();
        this.cargarDatosDefault();
        /* this.tipoDocumento = facturaService.tipoDocumento();
          this.medioPago = facturaService.medioPago();
          this.condicionVenta = facturaService.condicionVenta(); */
        this.tipoIdentificacion = clienteService.tipoIdentificacion();
    }
    ngOnInit() {
    }
    obtenerPrecioFinal(idPrecio, idSelect) {
        try {
            const selectImpuesto = document.getElementById(idSelect);
            const selectedValue = selectImpuesto.value;
            const idImpuesto = selectedValue.split(': ')[1];
            const precio = document.getElementById(idPrecio).value;
            if (typeof idImpuesto !== 'undefined' && idImpuesto != null && precio !== '') {
                let precioFinal = 0;
                let porcentajeAplicado = 0;
                let valorImpuesto = 0;
                for (const impuesto in this.tipoImpuesto) {
                    if (this.tipoImpuesto[impuesto].id == idImpuesto) {
                        if (this.tipoImpuesto[impuesto].porcentaje_impuesto < 10) {
                            porcentajeAplicado = parseFloat('0.0' + this.tipoImpuesto[impuesto].porcentaje_impuesto.toString());
                        }
                        else {
                            porcentajeAplicado = parseFloat('0.' + this.tipoImpuesto[impuesto].porcentaje_impuesto.toString());
                        }
                        valorImpuesto = parseFloat(precio) * porcentajeAplicado;
                        precioFinal = parseFloat(precio) + valorImpuesto;
                        const inputPrecioFinal = document.getElementById('precio_final');
                        inputPrecioFinal.value = String(precioFinal.toFixed(2));
                        this.objProducto.precio_final = inputPrecioFinal.value.toString();
                    }
                }
            }
            else {
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    obtenerCategorias() {
        this.productoService.obtenerCategorias()
            .subscribe((response) => {
            this.listaCategorias = response.categorias;
        }, err => console.log(err));
    }
    obtenerImpuesto() {
        this.productoService.obtenerImpuestos()
            .subscribe((response) => {
            this.tipoImpuesto = response.impuestos;
        }, err => console.error(err));
    }
    obtenerUnidadesMedida() {
        this.productoService.obtenerUnidadesMedida()
            .subscribe((response) => {
            this.unidadesMedida = response.unidades;
        }, err => console.log(err));
    }
    obtenerDescuentos() {
        this.descuentoService.obtenerDescuentos()
            .subscribe((response) => {
            this.descuentos = response.descuentos;
        }, err => console.error(err));
    }
    obtenerProvincias() {
        this.clienteService.obtenerProvincias()
            .subscribe((response) => {
            this.provincia = response.provincias;
        }, err => console.error(err));
    }
    obtenerCantones(idProvincia) {
        this.clienteService.obtenerCantones(idProvincia)
            .subscribe((response) => {
            this.canton = response.cantones;
        }, err => console.error(err));
    }
    obtenerDistritos(idcanton, idprovincia) {
        const obj = {
            idcanton,
            idprovincia
        };
        this.clienteService.obtenerDistritos(obj)
            .subscribe((response) => {
            this.distrito = response.distritos;
        }, err => console.error(err));
    }
    obtenerBarrios(idcanton, idprovincia, iddistrito) {
        const obj = {
            idcanton, idprovincia, iddistrito
        };
        this.clienteService.obtenerBarrios(obj)
            .subscribe((response) => {
            this.barrio = response.barrios;
        }, err => console.error(err));
    }
    buscarProducto(texto) {
        if (texto === '') {
            return;
        }
        else {
            const type = 'like';
            this.productoService.obtenerProducto(texto, type)
                .subscribe((response) => {
                console.log(response);
                this.listaProductos = response;
                console.log(this.listaProductos);
                this.lineaDetalle.idproducto = response[0].idproducto;
                // this.cargarDatosLinea();
            }, err => console.log(err));
        }
    }
    cargarDatosLinea() {
        try {
            const nombreProducto = document.getElementById('txt_nombreProducto').value;
            const campoCantidad = document.getElementById('cantidadLinea').value;
            const campoDescuento = document.getElementById('descuentoLinea').value;
            let cantidadTotal = 0;
            let descuentoTotal = 0;
            let impuestoNeto = 0;
            if (campoCantidad.length > 0) {
                cantidadTotal = Number(campoCantidad);
            }
            if (campoDescuento !== '') {
                for (const des in this.descuentos) {
                    if (campoDescuento == this.descuentos[des].descripcion) {
                        descuentoTotal = Number(this.descuentos[des].porcentaje);
                        this.lineaDetalle.naturalezadescuento = campoDescuento;
                        this.lineaDetalle.porcentajedescuento = this.descuentos[des].porcentaje;
                    }
                }
            }
            else {
                this.lineaDetalle.naturalezadescuento = '';
                this.lineaDetalle.porcentajedescuento = '0';
            }
            if (nombreProducto != '') {
                console.log("igual ", nombreProducto);
                // tslint:disable-next-line: max-line-length
                const montototal = parseFloat(this.listaProductos[0].precio_producto) * cantidadTotal;
                const descuentoAplicado = (descuentoTotal / 100) * Number(this.listaProductos[0].precio_producto);
                const subtotal = montototal - descuentoAplicado;
                let monto = 0;
                let baseImponible = 0;
                const impuestoTotal = subtotal * (parseFloat(this.listaProductos[0].porcentaje_impuesto) / 100);
                let totalLinea = subtotal + Number(impuestoTotal);
                // const totalLinea = subtotal - (descuentoAplicado) + Number(impuestoTotal);
                /*if (this.listaProductos[0].codigo_impuesto == '01' || this.listaProductos[0].codigo_impuesto == '07') {
                    if (this.listaProductos[0].codigo_impuesto == '07') {
                      baseImponible = this.listaProductos[0].precio_producto;
                      monto = baseImponible * Number(this.listaProductos[0].porcentaje_impuesto);
                    }
                } else {
                  monto = subtotal * Number(this.listaProductos[0].porcentaje_impuesto);
                }*/
                //baseImponible = this.listaProductos[0].precio_producto;
                monto = this.listaProductos[0].precio_producto * Number(this.listaProductos[0].porcentaje_impuesto);
                const impuestoExonerado = impuestoTotal * (this.porcentajeExoneracion) / 100;
                impuestoNeto = impuestoTotal - impuestoExonerado;
                const montoExonerado = impuestoTotal * this.porcentajeExoneracion / 100;
                this.lineaDetalle.idproducto = this.listaProductos[0].idproducto,
                    this.lineaDetalle.precio_linea = String(parseFloat(this.listaProductos[0].precio_producto).toFixed(2)),
                    this.lineaDetalle.cantidad = cantidadTotal.toString(),
                    this.lineaDetalle.descripcioDetalle = this.listaProductos[0].descripcion,
                    // this.lineaDetalle.porcentajedescuento = '0',
                    this.lineaDetalle.montodescuento = descuentoAplicado.toString(),
                    // this.lineaDetalle.naturalezadescuento = '',
                    this.lineaDetalle.numerolineadetalle = String(this.arrayDetalles.length + 1),
                    this.lineaDetalle.subtotal = subtotal.toString(),
                    this.lineaDetalle.montototal = montototal.toString(),
                    this.lineaDetalle.codigo = '01', // codigo del impuesto, siempre se envia el 01 o 07
                    this.lineaDetalle.codigo_tarifa = this.listaProductos[0].codigo_impuesto, // codigo de la tarifa para base imponible
                    this.lineaDetalle.tarifa = this.listaProductos[0].porcentaje_impuesto, // porcentaje aplicado para el impuesto
                    this.lineaDetalle.monto = impuestoTotal.toString(),
                    this.lineaDetalle.baseimponible = baseImponible.toString(), // baseImponible.toString(),
                    // tslint:disable-next-line: max-line-length
                    this.lineaDetalle.impuesto = impuestoTotal.toString(),
                    this.lineaDetalle.impuesto_neto = impuestoNeto.toString(),
                    this.lineaDetalle.numerodocumento = '0',
                    this.lineaDetalle.unidadMedida = this.listaProductos[0].unidad_medida;
                this.lineaDetalle.unidadMedidaComercial = this.listaProductos[0].unidad_medida_comercial;
                this.lineaDetalle.tipo_servicio = this.listaProductos[0].tipo_servicio;
                this.lineaDetalle.codigo_servicio = this.listaProductos[0].codigo_servicio;
                // tslint:disable-next-line: max-line-length
                if (this.porcentajeExoneracion > 0) {
                    this.lineaDetalle.montoitotallinea = totalLinea.toString();
                    this.lineaDetalle.MontoExoneracion = montoExonerado.toString();
                }
                else {
                    totalLinea = subtotal + Number(impuestoNeto);
                    this.lineaDetalle.montoitotallinea = totalLinea.toString();
                    this.lineaDetalle.MontoExoneracion = montoExonerado.toString();
                }
                // this.0Factura.ordenes.push(this.lineaDetalle);
                console.log('array detallles', this.arrayDetalles);
                console.log('Ordenes', this.objFactura.ordenes);
                this.cargarProducto();
                /*
                      localStorage.setItem('detalles', JSON.stringify(this.arrayDetalles));
                      localStorage.setItem('totalFactura', this.totalPagar);
                      localStorage.setItem('subtotalFactura', this.SubtotalComprobante);
                      localStorage.setItem('descuentosFactura', this.totalDescuento);
                      localStorage.setItem('impuestosFactura', this.totalImpuesto);
                      en los nodos de ordenes se envian dos parametros de codigo, numerolinea y luego codigo, luego dentro del nodo
                      //codigo comercial esta el tipo y codigo, tanto el codigo dentro del codigo comercial como el codigo
                      despues del numeroLinea son el codigo del producto, el codigo creado del producto.
                      */
                //
                //SE DEBE APLICAR LA EXONERACION POR CADA ORDEN DE LA FACTURA
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    obtenerTotalesFactura() {
        // VARIABLES PARA OBTENER LOS TOTALES DE FACTURA
        let porcentaje_descuento_total = ((parseFloat(this.totalDescuento) * 100) / parseFloat(this.totalPagar)).toFixed(2);
        let monto_descuento_total = parseFloat(this.totalDescuento);
        const subtotal = Number(this.SubtotalComprobante);
        let totalservgravados = 0;
        let totalservexentos = 0;
        let totalservexonerado = 0;
        let totalmercanciasgravadas = 0;
        let totalmercanciasexentas = 0;
        let totalmercanciaexonerada = 0;
        let totalgravado = 0;
        let totalexento = 0;
        let totalexonerado = 0;
        let totalventa = 0;
        const totaldescuentos = monto_descuento_total;
        let totalventaneta = 0;
        let totalimpuesto = 0;
        const totalOtrosCargos = 0;
        let totalcomprobante = 0;
        let montototal = 0;
        let impuestoLinea = 0;
        let valorImpuestoExonerado = 0;
        // tslint:disable-next-line: forin
        for (const linea in this.arrayDetalles) {
            console.log(this.arrayDetalles[linea]);
            montototal = parseFloat(this.arrayDetalles[linea].cantidad) * parseFloat(this.arrayDetalles[linea].precio_linea);
            console.log("% exonerado", this.porcentajeExoneracion);
            if (this.arrayDetalles[linea].codigo == '01' || this.arrayDetalles[linea].codigo == '07') {
                //Obtener el monto de impuesto exonerado
                //
                if (this.arrayDetalles[linea].codigo_tarifa == '01') { // productos exentos del IVA
                    if (this.arrayDetalles[linea].tipo_servicio == '01') {
                        // servicios
                        // tslint:disable-next-line: max-line-length
                        totalservexentos += montototal;
                        // tslint:disable-next-line: max-line-length
                    }
                    if (this.arrayDetalles[linea].tipo_servicio == '02') {
                        // mercancías
                        // tslint:disable-next-line: max-line-length
                        totalmercanciasexentas += montototal;
                        // tslint:disable-next-line: max-line-length
                    }
                    totalexento += montototal;
                    impuestoLinea = parseFloat(this.arrayDetalles[linea].impuesto);
                    totalimpuesto += impuestoLinea;
                }
                else {
                    // Aplica IVA
                    if (this.arrayDetalles[linea].tipo_servicio == '01') {
                        // servicios
                        valorImpuestoExonerado = (this.arrayDetalles[linea].impuesto * this.porcentajeExoneracion / 100);
                        console.log("servicio exonerado", valorImpuestoExonerado);
                        totalservexonerado += valorImpuestoExonerado;
                        totalexonerado += totalservexonerado;
                        totalservgravados += montototal;
                    }
                    if (this.arrayDetalles[linea].tipo_servicio == '02') {
                        // mercancías
                        valorImpuestoExonerado = (this.arrayDetalles[linea].impuesto * this.porcentajeExoneracion / 100);
                        console.log("mercancia exonerada", valorImpuestoExonerado);
                        totalmercanciaexonerada += valorImpuestoExonerado;
                        totalmercanciasgravadas += montototal;
                        totalexonerado += totalmercanciaexonerada;
                    }
                    impuestoLinea = parseFloat(this.arrayDetalles[linea].impuesto);
                    totalimpuesto += impuestoLinea;
                    totalgravado += montototal;
                }
            }
        }
        totalventa = totalgravado + totalexento + totalexonerado;
        totalventaneta = totalventa - totaldescuentos;
        totalcomprobante = totalventaneta + totalimpuesto + totalOtrosCargos;
        // CARGAR EL OBJETO PARA GUARDAR LA FACTURA
        this.objFactura.id = '',
            this.objFactura.idemisor = '1', // el 2 es el id del emisor en produccion
            this.objFactura.porcentaje_descuento_total = porcentaje_descuento_total,
            this.objFactura.monto_descuento_total = monto_descuento_total.toFixed(2),
            this.objFactura.subtotal = subtotal.toString(),
            this.objFactura.totalservgravados = totalservgravados.toString(),
            this.objFactura.totalservexentos = totalservexentos.toString(),
            this.objFactura.totalservexonerado = totalservexonerado.toString(),
            this.objFactura.totalmercanciasgravadas = totalmercanciasgravadas.toString(),
            this.objFactura.totalmercanciasexentas = totalmercanciasexentas.toString(),
            this.objFactura.totalmercanciaexonerada = totalmercanciaexonerada.toString(),
            this.objFactura.totalgravado = totalgravado.toString(),
            this.objFactura.totalexento = totalexento.toString(),
            this.objFactura.totalexonerado = totalexonerado.toString(),
            this.objFactura.totalventa = totalventa.toString(),
            this.objFactura.totaldescuentos = totaldescuentos.toString(),
            this.objFactura.totalventaneta = totalventaneta.toString(),
            this.objFactura.totalimpuesto = totalimpuesto.toFixed(2).toString(),
            this.objFactura.totalcomprobante = totalcomprobante.toFixed(2),
            this.objFactura.codigomoneda = 'CRC',
            this.objFactura.objOrdenes = this.generarJsonDetalles();
        this.objFactura.ordenes = this.arrayDetalles;
        const obj = {
            ordenes: this.objFactura.ordenes,
            factura: this.objFactura,
            objOrdenes: this.objFactura.objOrdenes
        };
        console.log(this.objFactura);
        console.log('detalles ', this.arrayDetalles);
        this.generarFactura(obj);
        this.limpiarLineaDetalle();
        this.limpiarTotalesFactura();
        this.quitarCliente();
        // localStorage.setItem('detalles','[]');
        localStorage.setItem('totalFactura', '0');
        localStorage.setItem('subtotalFactura', '0');
        localStorage.setItem('descuentosFactura', '0');
        localStorage.setItem('impuestosFactura', '0');
        this.arrayDetalles = [];
        localStorage.setItem('detalles', '[]');
        this.totalPagar = localStorage.getItem('totalFactura');
        this.totalImpuesto = localStorage.getItem('subtotalFactura');
        this.totalDescuento = localStorage.getItem('descuentosFactura');
        this.SubtotalComprobante = localStorage.getItem('impuestosFactura');
    }
    generarFactura(obj) {
        this.facturaService.nuevoComprobante(obj)
            .subscribe(response => {
            console.log(response);
        }, err => console.error(err));
    }
    quitarOrden(idorden) {
        let i = 0;
        let nuevoSubtotal = Number(localStorage.getItem('subtotalFactura'));
        let nuevoImpuesto = parseFloat(localStorage.getItem('impuestosFactura'));
        let nuevoTotal = parseFloat(localStorage.getItem('totalFactura'));
        let nuevoDescuento = parseFloat(localStorage.getItem('descuentosFactura'));
        // tslint:disable-next-line: forin
        for (const obj in this.arrayDetalles) {
            if (idorden == this.arrayDetalles[obj].numerolineadetalle) {
                nuevoSubtotal -= Number(this.arrayDetalles[obj].subtotal);
                this.SubtotalComprobante = nuevoSubtotal.toFixed(2);
                nuevoImpuesto -= parseFloat(this.arrayDetalles[obj].impuesto);
                this.totalImpuesto = nuevoImpuesto.toFixed(2);
                nuevoTotal -= parseFloat(this.arrayDetalles[obj].montoitotallinea);
                this.totalPagar = nuevoTotal.toFixed(2);
                nuevoDescuento -= parseFloat(this.arrayDetalles[obj].montodescuento);
                this.totalDescuento = nuevoDescuento.toFixed(2);
                this.arrayDetalles.splice(i, 1);
                this.objFactura.ordenes = this.arrayDetalles;
                localStorage.setItem('detalles', JSON.stringify(this.arrayDetalles));
                localStorage.setItem('totalFactura', this.totalPagar);
                localStorage.setItem('subtotalFactura', this.SubtotalComprobante);
                localStorage.setItem('descuentosFactura', this.totalDescuento);
                localStorage.setItem('impuestosFactura', this.totalImpuesto);
            }
            i += 1;
        } // sub   impue   desc    total
    } // 60370	1961.72	4861.82	57469.90
    limpiarLineaDetalle() {
        this.lineaDetalle.idproducto = '';
        this.lineaDetalle.precio_linea = '',
            this.lineaDetalle.cantidad = '',
            this.lineaDetalle.descripcioDetalle = '',
            this.lineaDetalle.porcentajedescuento = '',
            this.lineaDetalle.montodescuento = '',
            this.lineaDetalle.naturalezadescuento = '',
            this.lineaDetalle.numerolineadetalle = '',
            this.lineaDetalle.subtotal = '',
            this.lineaDetalle.montototal = '',
            this.lineaDetalle.codigo = '',
            this.lineaDetalle.codigo_tarifa = '',
            this.lineaDetalle.tarifa = '',
            this.lineaDetalle.monto = '',
            this.lineaDetalle.baseimponible = '',
            this.lineaDetalle.impuesto = '',
            this.lineaDetalle.impuesto_neto = '',
            this.lineaDetalle.numerodocumento = '',
            this.lineaDetalle.montoitotallinea = '';
    }
    limpiarTotalesFactura() {
        this.objFactura.id = '',
            this.objFactura.idcliente = '1',
            // this.objFactura.idemisor = '1',
            this.objFactura.nombreCliente = '',
            this.objFactura.condicion_venta = '01',
            this.objFactura.medio_pago = '01',
            this.objFactura.porcentaje_descuento_total = '',
            this.objFactura.monto_descuento_total = '',
            this.objFactura.subtotal = '',
            this.objFactura.totalservgravados = '',
            this.objFactura.totalservexentos = '',
            this.objFactura.totalservexonerado = '',
            this.objFactura.totalmercanciasgravadas = '',
            this.objFactura.totalmercanciasexentas = '',
            this.objFactura.totalmercanciaexonerada = '',
            this.objFactura.totalgravado = '',
            this.objFactura.totalexento = '',
            this.objFactura.totalexonerado = '',
            this.objFactura.totalventa = '',
            this.objFactura.totaldescuentos = '',
            this.objFactura.totalventaneta = '',
            this.objFactura.totalimpuesto = '',
            this.objFactura.totalcomprobante = '',
            this.objFactura.codigomoneda = '',
            // this.objFactura.tipocambio= '',
            this.objFactura.tipo_factura = '04',
            this.objFactura.ordenes = [],
            this.objFactura.objOrdenes = {};
    }
    generarJsonDetalles() {
        let listaDetalles = {};
        let descuento = 0;
        let montototal = 0;
        const subTotal = 0;
        const impuesto = {};
        const descuentoorden = 0;
        let montototallinea = 0;
        const object = {};
        let index = 0;
        let monto_impuesto = 0;
        let porcentaje = '';
        let decimal = '';
        let impuestoNeto = 0;
        const porcentajeExoneracionGlobal = 0;
        // tslint:disable-next-line: forin
        for (const i in this.arrayDetalles) {
            index = index + 1;
            montototal = Number(this.arrayDetalles[i].subtotal);
            descuento = Number(this.arrayDetalles[i].montodescuento);
            // subTotal = Number(this.arrayDetalles[i].total_orden);
            object[index] = {
                codigo: String(this.arrayDetalles[i].codigo_servicio),
                codigoComercial: { tipo: String(this.arrayDetalles[i].tipo_servicio), codigo: String(this.arrayDetalles[i].codigo_servicio) },
                cantidad: String(this.arrayDetalles[i].cantidad),
                unidadMedida: String(this.arrayDetalles[i].unidadMedida),
                detalle: String(this.arrayDetalles[i].descripcioDetalle),
                precioUnitario: String(this.arrayDetalles[i].precio_linea),
                montoTotal: String(montototal)
            };
            if (Number(this.arrayDetalles[i].montodescuento) > 0) {
                // tslint:disable-next-line: max-line-length
                object[index].descuento = [{ montoDescuento: String(this.arrayDetalles[i].montodescuento), naturalezaDescuento: String(this.arrayDetalles[i].naturalezadescuento) }];
            }
            object[index].subtotal = String(montototal);
            if (this.arrayDetalles[i].codigo == '07' || this.arrayDetalles[i].codigo == '01') {
                if (this.arrayDetalles[i].codigo_tarifa == '07') { // aplicar base imponible
                    object[index].baseImponible = String(this.arrayDetalles[i].precio_linea);
                }
                object[index].impuesto = {
                    1: {
                        codigo: String(this.arrayDetalles[i].codigo),
                        codigoTarifa: String(this.arrayDetalles[i].codigo_tarifa),
                        tarifa: String(this.arrayDetalles[i].tarifa),
                        monto: ''
                    }
                };
                if (Number(this.arrayDetalles[i].porcentaje_impuesto) > 9) {
                    decimal = parseFloat(this.arrayDetalles[i].porcentaje_impuesto).toFixed(0);
                    porcentaje = '0.' + String(decimal);
                    monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
                }
                else {
                    decimal = parseFloat(this.arrayDetalles[i].porcentaje_impuesto).toFixed(0);
                    porcentaje = '0.0' + String(decimal);
                    monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
                }
                object[index].impuesto[1].monto = String(monto_impuesto);
                montototallinea = (montototal + Number(object[index].impuesto[1].monto));
            }
            else {
                object[index].impuesto = {
                    1: {
                        codigoTarifa: String(this.arrayDetalles[i].codigo_tarifa),
                        tarifa: String(this.arrayDetalles[i].tarifa),
                        monto: ''
                    }
                };
                if (Number(this.arrayDetalles[i].porcentaje_impuesto) > 9) {
                    decimal = parseFloat(this.arrayDetalles[i].porcentaje_impuesto).toFixed(0);
                    porcentaje = '0.' + String(decimal);
                    monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
                }
                else {
                    decimal = parseFloat(this.arrayDetalles[i].porcentaje_impuesto).toFixed(0);
                    porcentaje = '0.0' + String(decimal);
                    monto_impuesto = Number((parseFloat(object[index].subtotal) * parseFloat(porcentaje)).toFixed(2));
                }
                object[index].impuesto[1].monto = String(monto_impuesto);
                montototallinea = (montototal + Number(object[index].impuesto[1].monto));
            }
            impuestoNeto = monto_impuesto - Number((monto_impuesto * porcentajeExoneracionGlobal).toFixed(2));
            object[index].impuestoNeto = String(impuestoNeto);
            /*-----------------------------------------------------------------------------*/
            object[index].montoTotalLinea = String(montototallinea);
            // Agrega el array en formato JSON
            listaDetalles = object;
        }
        return listaDetalles;
    }
    cargarProducto() {
        if (this.lineaDetalle.idproducto === '') {
            return;
        }
        else {
            // tslint:disable-next-line: one-variable-per-declaration
            let subtotal = 0, impuestos = 0, descuentos = 0, totalPagar = 0;
            const getDetalles = localStorage.getItem('detalles');
            console.log("Antes de Insertar ", getDetalles);
            let localStorageDetalles = [];
            localStorageDetalles = JSON.parse(getDetalles);
            console.log("despues de que se le pasan los datos del localStorage ", localStorageDetalles);
            localStorageDetalles.push(this.lineaDetalle);
            console.log("Desoues de insertar ", localStorageDetalles);
            localStorage.setItem('detalles', JSON.stringify(localStorageDetalles));
            this.arrayDetalles = localStorageDetalles;
            // OBTENER LOS TOTALES DEL COMPROBANTE
            // tslint:disable-next-line: forin
            for (const linea in this.arrayDetalles) {
                subtotal += Number(parseFloat(this.arrayDetalles[linea].subtotal).toFixed(2));
                totalPagar += Number(parseFloat(this.arrayDetalles[linea].montoitotallinea).toFixed(2));
                impuestos += Number(parseFloat(this.arrayDetalles[linea].impuesto).toFixed(2));
                descuentos += Number(parseFloat(this.arrayDetalles[linea].montodescuento).toFixed(2));
            }
            // this.limpiarLineaDetalle();
            localStorage.setItem('totalFactura', totalPagar.toString());
            localStorage.setItem('subtotalFactura', subtotal.toString());
            localStorage.setItem('descuentosFactura', descuentos.toString());
            localStorage.setItem('impuestosFactura', impuestos.toString());
            this.totalPagar = localStorage.getItem('totalFactura');
            this.totalImpuesto = localStorage.getItem('impuestosFactura');
            this.totalDescuento = localStorage.getItem('descuentosFactura');
            this.SubtotalComprobante = localStorage.getItem('subtotalFactura'); //
        }
    }
    listarOrdenes() {
        const getDetalles = localStorage.getItem('detalles');
        // tslint:disable-next-line: one-variable-per-declaration
        let subtotal = 0, impuestos = 0, descuentos = 0, totalPagar = 0;
        if (getDetalles !== '' && getDetalles != null && JSON.parse(getDetalles) != '[]') {
            // tslint:disable-next-line: one-variable-per-declaration
            this.arrayDetalles = JSON.parse(localStorage.getItem('detalles'));
            this.objFactura.ordenes = JSON.parse(localStorage.getItem('detalles'));
            // tslint:disable-next-line: forin
            for (const linea in this.arrayDetalles) {
                subtotal += parseFloat(this.arrayDetalles[linea].subtotal);
                totalPagar += parseFloat(this.arrayDetalles[linea].montoitotallinea);
                impuestos += parseFloat(this.arrayDetalles[linea].impuesto);
                descuentos += parseFloat(this.arrayDetalles[linea].montodescuento);
            }
            this.totalPagar = totalPagar.toFixed(2);
            this.totalImpuesto = impuestos.toFixed(2);
            this.totalDescuento = descuentos.toFixed(2);
            this.SubtotalComprobante = subtotal.toString();
        }
        else {
            localStorage.setItem('detalles', '[]');
        }
    }
    nuevoProducto(e, obj) {
        e.preventDefault();
        let tipoServicio = '';
        let codigo = '';
        if (this.productoService.UnidadesMedidaServicios().includes(obj.unidad_medida)) {
            codigo = 'Servicio';
            tipoServicio = '01';
        }
        else {
            codigo = 'Mercancía';
            tipoServicio = '02';
        }
        obj.tipo_servicio = tipoServicio;
        obj.codigo_servicio = codigo;
        obj.iddescuento = 1;
        this.productoService.nuevoProducto(obj)
            .subscribe(response => {
            this.buscarProducto(this.objProducto.descripcion);
            // this.listaProductos
            document.getElementById('txt_nombreProducto').value = this.objProducto.descripcion;
            $('#ModalNuevoProducto').modal('hide');
            // agregar el producto, agregar el idproducto a la linea y mostrar los totales
        }, err => console.log(err));
    }
    nuevoCliente(obj) {
        console.log(obj);
        this.clienteService.guardarCliente(obj)
            .subscribe((response) => {
            const { insertId } = response;
            this.objFactura.idcliente = insertId;
            this.objFactura.tipo_factura = '01';
            document.getElementById('nombreCliente').value = this.objCliente.cliente_nombre;
            document.getElementById('nombreComercialCliente').value = this.objCliente.cliente_nombre_comercial;
            document.getElementById('cedulaCliente').value = this.objCliente.cedula_cliente;
            document.getElementById('correoCliente').value = this.objCliente.cliente_correo;
            document.getElementById('telefonoCliente').value = this.objCliente.cliente_telefono_numtelefono;
            // (document.getElementById('formBuscarCliente') as HTMLFormElement).reset();
            //($('#ModalNuevoCliente') as any).modal('hide');
            $('#ModalNuevoCliente').modal('hide');
            // (document.getElementById('formNuevoCliente') as HTMLFormElement).reset();
            // $('#ModalNuevoCliente').hide();
            // this.cargarCliente(this.objCliente.cliente_nombre);
        }, err => console.log(err));
    }
    cargarCliente(obj) {
        document.getElementById('nombreCliente').value = obj.nombre;
        document.getElementById('nombreComercialCliente').value = obj.nombreComercial;
        document.getElementById('cedulaCliente').value = obj.cedula;
        document.getElementById('correoCliente').value = obj.correo;
        document.getElementById('telefonoCliente').value = obj.telefono;
        this.objFactura.idcliente = this.objDataCliente.id;
        this.objFactura.tipo_factura = '01';
        document.getElementById('formBuscarCliente').reset();
        $('#ModalBuscarCliente').modal('hide');
    }
    quitarCliente() {
        this.objFactura.idcliente = '1';
        this.objDataCliente.nombre = '';
        this.objDataCliente.cedula = '';
        this.objDataCliente.id = '';
        this.objDataCliente.nombreComercial = '';
        this.objDataCliente.correo = '';
        this.objDataCliente.telefono = '';
        this.objFactura.tipo_factura = '04';
        document.getElementById('nombreCliente').value = '';
        document.getElementById('nombreComercialCliente').value = '';
        document.getElementById('cedulaCliente').value = '';
        document.getElementById('correoCliente').value = '';
        document.getElementById('telefonoCliente').value = '';
    }
    buscarCliente(e, query) {
        e.preventDefault();
        if (query === '') {
            return;
        }
        else {
            this.clienteService.buscarCliente(query)
                .subscribe((response) => {
                this.objDataCliente.nombre = response.cliente[0].cliente_nombre;
                this.objDataCliente.cedula = response.cliente[0].cedula_cliente;
                this.objDataCliente.id = response.cliente[0].id;
                this.objDataCliente.nombreComercial = response.cliente[0].cliente_nombre_comercial;
                this.objDataCliente.correo = response.cliente[0].cliente_correo;
                this.objDataCliente.telefono = response.cliente[0].cliente_telefono_numtelefono;
                // tslint:disable-next-line: max-line-length
                this.porcentajeExoneracion = (response.cliente[0].porcentajeExoneracion == null) ? 0 : Number(response.cliente[0].porcentajeExoneracion);
            }, err => {
                console.log(err);
            });
        }
    }
    mostrarFechaHora() {
        this.fechaHora();
        setInterval(() => this.fechaHora(), 1000);
    }
    fechaHora() {
        const d = new Date();
        const mes = (Number(d.getMonth()) < 10) ? '0' + Number(d.getMonth() + 1).toString() : Number(d.getMonth() + 1).toString();
        const dia = d.getDate();
        const anio = d.getFullYear();
        const horas = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
        const minutos = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
        const segundos = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
        this.fechaActual = dia + '/' + mes + '/' + anio + ' ' + horas + ':' + minutos + ':' + segundos;
    }
    cargarDatosDefault() {
        this.objFactura.tipo_factura = '04';
        this.objFactura.condicion_venta = '01';
        this.objFactura.medio_pago = '01';
    }
    obtenerTipoCambio() {
        this.facturaService.obtenerTipoCambio()
            .subscribe((tipoCambio) => {
            const respuesta = tipoCambio.response;
            let xmlDoc;
            //let window: any;
            const parser = new DOMParser();
            //if (window.DOMParser) { // PARSEAR el xml para poder leerlo
            xmlDoc = parser.parseFromString(respuesta, 'text/html');
            //} 
            /*else {
              // EN EL CASO QUE SEA INTERNET EXPLORER
              xmlDoc = new ActiveXObject('Microsoft.XMLDOM');
              xmlDoc.async = false;
              xmlDoc.loadXML(respuesta);
            }*/
            const tipocambio = Number(xmlDoc.getElementsByTagName('NUM_VALOR')[0].innerHTML).toFixed(2);
            this.objFactura.tipocambio = tipocambio.toString();
        }, err => {
            this.objFactura.tipocambio = '1.00';
        });
    }
    obtenerMonedas() {
        this.facturaService.obtenerMonedas()
            .subscribe((monedas) => {
            this.listaMonedas = monedas.response;
        }, err => console.log(err));
    }
    TipoDocumento() {
        this.facturaService.tipoDocumento()
            .subscribe((response) => {
            this.tipoDocumento = response.tipoDocumento;
        }, err => console.error(err));
    }
    MedioPago() {
        this.facturaService.medioPago()
            .subscribe((response) => {
            this.medioPago = response.medioPago;
        }, err => console.error(err));
    }
    CondicionVenta() {
        this.facturaService.condicionVenta()
            .subscribe((response) => {
            this.condicionVenta = response.condicionVenta;
        }, err => console.error(err));
    }
};
FacturaComponent.ctorParameters = () => [
    { type: _services_pages_factura_service__WEBPACK_IMPORTED_MODULE_2__["FacturaService"] },
    { type: _services_pages_cliente_service__WEBPACK_IMPORTED_MODULE_3__["ClienteService"] },
    { type: _services_pages_descuento_service__WEBPACK_IMPORTED_MODULE_4__["DescuentoService"] },
    { type: _services_pages_producto_service__WEBPACK_IMPORTED_MODULE_5__["ProductoService"] }
];
FacturaComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-factura',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./factura.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/factura/factura.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./factura.component.css */ "./src/app/pages/factura/factura.component.css")).default]
    })
], FacturaComponent);



/***/ }),

/***/ "./src/app/pages/impuesto/impuesto.component.css":
/*!*******************************************************!*\
  !*** ./src/app/pages/impuesto/impuesto.component.css ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL2ltcHVlc3RvL2ltcHVlc3RvLmNvbXBvbmVudC5jc3MifQ== */");

/***/ }),

/***/ "./src/app/pages/impuesto/impuesto.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/impuesto/impuesto.component.ts ***!
  \******************************************************/
/*! exports provided: ImpuestoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImpuestoComponent", function() { return ImpuestoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_impuesto_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/pages/impuesto.service */ "./src/app/services/pages/impuesto.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);




let ImpuestoComponent = class ImpuestoComponent {
    constructor(impuestoService) {
        this.impuestoService = impuestoService;
        this.objImpuesto = {
            id: '',
            descripcion: '',
            porcentaje: '',
            codigo: ''
        };
        this.query = '';
    }
    ngOnInit() {
    }
    procesarImpuesto(e, obj) {
        if (this.objImpuesto.id === '') {
            this.nuevoImpuesto(e, obj);
        }
        else {
            this.actualizarImpuesto(e, obj);
        }
    }
    nuevoImpuesto(e, obj) {
        e.preventDefault();
        this.impuestoService.nuevoImpuesto(obj)
            .subscribe((response) => {
            console.log(response);
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Nuevo Impuesto', response.message, 'success');
            document.getElementById('formImpuesto').reset();
        }, err => {
            console.log(err);
        });
    }
    actualizarImpuesto(e, obj) {
        e.preventDefault();
        this.impuestoService.actualizarImpuesto(obj)
            .subscribe((response) => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Editar Impuesto', response.message, 'success');
            document.getElementById('formImpuesto').reset();
        }, err => console.log(err));
    }
    buscarImpuesto(e, texto) {
        e.preventDefault();
        if (texto === '') {
            return;
        }
        else {
            this.impuestoService.buscarImpuesto(texto)
                .subscribe((response) => {
                console.log((response));
                this.objImpuesto.id = response.id;
                this.objImpuesto.descripcion = response.descripcion;
                this.objImpuesto.codigo = response.codigo_impuesto;
                this.objImpuesto.porcentaje = response.porcentaje_impuesto;
                document.getElementById('formBuscarImpuesto').reset();
            }, err => console.log(err));
        }
    }
};
ImpuestoComponent.ctorParameters = () => [
    { type: _services_pages_impuesto_service__WEBPACK_IMPORTED_MODULE_2__["ImpuestoService"] }
];
ImpuestoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-impuesto',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./impuesto.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/impuesto/impuesto.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./impuesto.component.css */ "./src/app/pages/impuesto/impuesto.component.css")).default]
    })
], ImpuestoComponent);



/***/ }),

/***/ "./src/app/pages/pages.component.ts":
/*!******************************************!*\
  !*** ./src/app/pages/pages.component.ts ***!
  \******************************************/
/*! exports provided: PagesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesComponent", function() { return PagesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let PagesComponent = class PagesComponent {
    constructor() { }
    ngOnInit() {
    }
};
PagesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-pages',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./pages.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/pages.component.html")).default
    })
], PagesComponent);



/***/ }),

/***/ "./src/app/pages/pages.module.ts":
/*!***************************************!*\
  !*** ./src/app/pages/pages.module.ts ***!
  \***************************************/
/*! exports provided: tokenGetter, PagesModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenGetter", function() { return tokenGetter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagesModule", function() { return PagesModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _pages_routes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages.routes */ "./src/app/pages/pages.routes.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./pages.component */ "./src/app/pages/pages.component.ts");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/fesm2015/auth0-angular-jwt.js");







function tokenGetter() {
    return localStorage.getItem('token');
}
let PagesModule = class PagesModule {
};
PagesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
        declarations: [
            _pages_component__WEBPACK_IMPORTED_MODULE_5__["PagesComponent"]
        ],
        exports: [],
        imports: [
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_3__["SharedModule"],
            _pages_routes__WEBPACK_IMPORTED_MODULE_1__["RutasModule"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["CommonModule"],
            _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_6__["JwtModule"].forRoot({
                config: {
                    tokenGetter,
                    whitelistedDomains: [],
                    blacklistedRoutes: []
                }
            })
        ]
    })
], PagesModule);



/***/ }),

/***/ "./src/app/pages/pages.routes.ts":
/*!***************************************!*\
  !*** ./src/app/pages/pages.routes.ts ***!
  \***************************************/
/*! exports provided: RutasModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RutasModule", function() { return RutasModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _pages_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages.component */ "./src/app/pages/pages.component.ts");
/* harmony import */ var _producto_producto_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./producto/producto.component */ "./src/app/pages/producto/producto.component.ts");
/* harmony import */ var _factura_factura_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./factura/factura.component */ "./src/app/pages/factura/factura.component.ts");
/* harmony import */ var _emisor_emisor_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./emisor/emisor.component */ "./src/app/pages/emisor/emisor.component.ts");
/* harmony import */ var _descuento_descuento_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./descuento/descuento.component */ "./src/app/pages/descuento/descuento.component.ts");
/* harmony import */ var _categoria_categoria_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./categoria/categoria.component */ "./src/app/pages/categoria/categoria.component.ts");
/* harmony import */ var _impuesto_impuesto_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./impuesto/impuesto.component */ "./src/app/pages/impuesto/impuesto.component.ts");
/* harmony import */ var _cliente_cliente_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./cliente/cliente.component */ "./src/app/pages/cliente/cliente.component.ts");
/* harmony import */ var _reporte_reporte_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./reporte/reporte.component */ "./src/app/pages/reporte/reporte.component.ts");
/* harmony import */ var _consulta_consulta_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./consulta/consulta.component */ "./src/app/pages/consulta/consulta.component.ts");
/* harmony import */ var _usuario_usuario_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./usuario/usuario.component */ "./src/app/pages/usuario/usuario.component.ts");
/* harmony import */ var _services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../services/shared/guard/login.guard */ "./src/app/services/shared/guard/login.guard.ts");
















const pagesRoutes = [
    { path: '', component: _pages_component__WEBPACK_IMPORTED_MODULE_4__["PagesComponent"],
        children: [
            { path: 'producto', component: _producto_producto_component__WEBPACK_IMPORTED_MODULE_5__["ProductoComponent"], canActivate: [_services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__["LoginGuard"]] },
            { path: 'factura', component: _factura_factura_component__WEBPACK_IMPORTED_MODULE_6__["FacturaComponent"], canActivate: [_services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__["LoginGuard"]] },
            { path: 'Emisor', component: _emisor_emisor_component__WEBPACK_IMPORTED_MODULE_7__["EmisorComponent"], canActivate: [_services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__["LoginGuard"]] },
            { path: 'descuento', component: _descuento_descuento_component__WEBPACK_IMPORTED_MODULE_8__["DescuentoComponent"], canActivate: [_services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__["LoginGuard"]] },
            { path: 'categoria', component: _categoria_categoria_component__WEBPACK_IMPORTED_MODULE_9__["CategoriaComponent"], canActivate: [_services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__["LoginGuard"]] },
            { path: 'impuesto', component: _impuesto_impuesto_component__WEBPACK_IMPORTED_MODULE_10__["ImpuestoComponent"], canActivate: [_services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__["LoginGuard"]] },
            { path: 'cliente', component: _cliente_cliente_component__WEBPACK_IMPORTED_MODULE_11__["ClienteComponent"], canActivate: [_services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__["LoginGuard"]] },
            { path: 'consulta', component: _consulta_consulta_component__WEBPACK_IMPORTED_MODULE_13__["ConsultaComponent"], canActivate: [_services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__["LoginGuard"]] },
            { path: 'usuario', component: _usuario_usuario_component__WEBPACK_IMPORTED_MODULE_14__["UsuarioComponent"], canActivate: [_services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__["LoginGuard"]] },
            { path: 'reporte/comprobantes/:tipoFactura', component: _reporte_reporte_component__WEBPACK_IMPORTED_MODULE_12__["ReporteComponent"], canActivate: [_services_shared_guard_login_guard__WEBPACK_IMPORTED_MODULE_15__["LoginGuard"]] },
            { path: '', redirectTo: '/factura', pathMatch: 'full' },
        ] }
];
let RutasModule = class RutasModule {
};
RutasModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(pagesRoutes)
        ],
        declarations: [],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
    })
], RutasModule);



/***/ }),

/***/ "./src/app/pages/producto/producto.component.css":
/*!*******************************************************!*\
  !*** ./src/app/pages/producto/producto.component.css ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("#seccionExoneracion {\n    border-radius: 2px solid black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvcGFnZXMvcHJvZHVjdG8vcHJvZHVjdG8uY29tcG9uZW50LmNzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtJQUNJLDhCQUE4QjtBQUNsQyIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3Byb2R1Y3RvL3Byb2R1Y3RvLmNvbXBvbmVudC5jc3MiLCJzb3VyY2VzQ29udGVudCI6WyIjc2VjY2lvbkV4b25lcmFjaW9uIHtcbiAgICBib3JkZXItcmFkaXVzOiAycHggc29saWQgYmxhY2s7XG59Il19 */");

/***/ }),

/***/ "./src/app/pages/producto/producto.component.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/producto/producto.component.ts ***!
  \******************************************************/
/*! exports provided: ProductoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductoComponent", function() { return ProductoComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_producto_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/pages/producto.service */ "./src/app/services/pages/producto.service.ts");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_3__);




let ProductoComponent = class ProductoComponent {
    constructor(productoService) {
        this.productoService = productoService;
        this.objProducto = {
            id: '',
            descripcion: '',
            codigo_barra: '',
            precio_producto: '',
            precio_final: '',
            costo_unitario: '',
            unidad_medida: '',
            unidad_medida_comercial: '',
            tipo_servicio: '',
            codigo_servicio: '',
            tipo_impuesto: '',
            idcategoria: '',
        };
        this.query = '';
        this.listaCategorias = [];
        this.listaImpuestos = [];
        this.listaUnidadesMedida = [];
        this.obtenerImpuestos();
        this.obtenerUnidadesMedida();
        this.obtenerCategorias();
    }
    ngOnInit() {
    }
    obtenerPrecioFinal(idPrecio, idSelect) {
        try {
            const selectImpuesto = document.getElementById(idSelect);
            const selectedValue = selectImpuesto.value;
            const idImpuesto = selectedValue.split(': ')[1];
            const precio = document.getElementById(idPrecio).value;
            if (typeof idImpuesto !== 'undefined' && idImpuesto != null && precio !== '') {
                let precioFinal = 0;
                let porcentajeAplicado = 0;
                let valorImpuesto = 0;
                for (const impuesto in this.listaImpuestos) {
                    if (this.listaImpuestos[impuesto].id == idImpuesto) {
                        if (this.listaImpuestos[impuesto].porcentaje_impuesto < 10) {
                            porcentajeAplicado = parseFloat('0.0' + this.listaImpuestos[impuesto].porcentaje_impuesto.toString());
                        }
                        else {
                            porcentajeAplicado = parseFloat('0.' + this.listaImpuestos[impuesto].porcentaje_impuesto.toString());
                        }
                        valorImpuesto = parseFloat(precio) * porcentajeAplicado;
                        precioFinal = parseFloat(precio) + valorImpuesto;
                        const inputPrecioFinal = document.getElementById('precio_final');
                        inputPrecioFinal.value = String(precioFinal.toFixed(2));
                        this.objProducto.precio_final = inputPrecioFinal.value.toString();
                    }
                }
            }
            else {
                return;
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    buscarProducto(e, texto) {
        e.preventDefault();
        if (texto.length === 0) {
            return;
        }
        else {
            const type = 'equal';
            this.productoService.obtenerProducto(texto, type)
                .subscribe((response) => {
                console.log(response);
                document.getElementById('query').value = '';
                this.objProducto.id = response.idproducto;
                this.objProducto.descripcion = response.descripcion;
                this.objProducto.codigo_barra = response.codigobarra_producto;
                this.objProducto.precio_producto = response.precio_producto;
                this.objProducto.costo_unitario = response.costo_unitario;
                this.objProducto.unidad_medida_comercial = response.unidad_medida_comercial;
                this.objProducto.precio_final = response.precio_final;
                this.objProducto.idcategoria = response.idcategoria;
                this.objProducto.tipo_impuesto = response.tipo_impuesto;
                this.objProducto.unidad_medida = response.unidad_medida;
                this.obtenerImpuestos();
                this.obtenerUnidadesMedida();
                this.obtenerCategorias();
            }, err => {
                console.error(err);
                if (err.status) {
                    sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Buscar Producto', 'No hay resultados', 'error');
                }
            });
        }
    }
    procesarDatosProducto(e, obj) {
        if (this.objProducto.id === '') {
            this.nuevoProducto(e, obj);
        }
        else {
            this.actualizarProducto(e, obj);
        }
    }
    nuevoProducto(e, obj) {
        e.preventDefault();
        let tipoServicio = '';
        let codigo = '';
        if (this.productoService.UnidadesMedidaServicios().includes(obj.unidad_medida)) {
            codigo = 'Servicio';
            tipoServicio = '02';
        }
        else {
            codigo = 'Mercancía';
            tipoServicio = '01';
        }
        obj.tipo_servicio = tipoServicio;
        obj.codigo_servicio = codigo;
        this.productoService.nuevoProducto(obj)
            .subscribe((response) => {
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Nuevo Producto', response.message, 'success');
            document.getElementById('form_producto').reset();
        }, err => console.error(err));
    }
    actualizarProducto(e, obj) {
        e.preventDefault();
        console.log(obj);
        const nombre = document.getElementById('descripcion');
        const codigoBarra = document.getElementById('codigo_barra');
        const precio = document.getElementById('precio_producto');
        const costo = document.getElementById('costo_unitario');
        const unidad_medida_comercial = document.getElementById('unidad_medida_comercial');
        const precio_final = document.getElementById('precio_final');
        const selectUnidadMedida = document.getElementById('unidad_medida');
        const selectCategoria = document.getElementById('idcategoria');
        const selectImpuesto = document.getElementById('tipo_impuesto');
        let tipoServicio = '';
        let codigo = '';
        if (this.productoService.UnidadesMedidaServicios().includes(obj.unidad_medida)) {
            codigo = 'Servicio';
            tipoServicio = '01';
        }
        else {
            codigo = 'Mercancía';
            tipoServicio = '02';
        }
        for (let i in this.listaUnidadesMedida) {
            if (selectUnidadMedida.selectedIndex.toString() == i) {
                obj.unidad_medida = this.listaUnidadesMedida[i].simbolo;
            }
        }
        obj.descripcion = nombre.value;
        obj.codigo_barra = codigoBarra.value;
        obj.costo_unitario = costo.value;
        obj.precio_producto = precio.value;
        obj.unidad_medida_comercial = unidad_medida_comercial.value;
        //obj.unidad_medida = selectUnidadMedida.value;
        obj.tipo_servicio = tipoServicio;
        obj.codigo_servicio = codigo;
        obj.tipo_impuesto = selectImpuesto.value.split(': ')[1];
        obj.idcategoria = selectCategoria.value.split(': ')[1];
        obj.precio_final = precio_final.value;
        console.log(obj);
        this.productoService.actualizarProducto(obj)
            .subscribe((response) => {
            this.objProducto.id = '';
            sweetalert2__WEBPACK_IMPORTED_MODULE_3___default.a.fire('Actualizar Producto', response.message, 'success');
            document.getElementById('form_producto').reset();
        }, err => {
            document.getElementById('form_producto').reset();
        });
    }
    obtenerImpuestos() {
        this.productoService.obtenerImpuestos()
            .subscribe((response) => {
            console.log(response);
            this.listaImpuestos = response.impuestos;
        }, err => {
            console.log(err);
        });
    }
    obtenerCategorias() {
        this.productoService.obtenerCategorias()
            .subscribe((response) => {
            this.listaCategorias = response.categorias;
        }, err => console.log(err));
    }
    obtenerUnidadesMedida() {
        this.productoService.obtenerUnidadesMedida()
            .subscribe((response) => {
            this.listaUnidadesMedida = response.unidades;
        }, err => console.log(err));
    }
};
ProductoComponent.ctorParameters = () => [
    { type: _services_pages_producto_service__WEBPACK_IMPORTED_MODULE_2__["ProductoService"] }
];
ProductoComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-producto',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./producto.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/producto/producto.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./producto.component.css */ "./src/app/pages/producto/producto.component.css")).default]
    })
], ProductoComponent);



/***/ }),

/***/ "./src/app/pages/reporte/reporte.component.css":
/*!*****************************************************!*\
  !*** ./src/app/pages/reporte/reporte.component.css ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3JlcG9ydGUvcmVwb3J0ZS5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/pages/reporte/reporte.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/reporte/reporte.component.ts ***!
  \****************************************************/
/*! exports provided: ReporteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReporteComponent", function() { return ReporteComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _services_pages_reporte_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../services/pages/reporte.service */ "./src/app/services/pages/reporte.service.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");




let ReporteComponent = class ReporteComponent {
    constructor(rutaActiva, reporteService) {
        this.rutaActiva = rutaActiva;
        this.reporteService = reporteService;
        this.filtros = '';
        this.arrayComprobantes = [];
        this.cargarReporte();
    }
    ngOnInit() {
    }
    cargarReporte() {
        try {
            this.arrayComprobantes = this.reporteService.obtenerListadoComprobantes();
            console.log(this.arrayComprobantes);
            this.numeroComprobantes = this.arrayComprobantes.length;
            this.cargarMensajeFiltro();
        }
        catch (err) {
            console.error(err);
        }
    }
    cargarMensajeFiltro() {
        const objetoFiltros = JSON.parse(localStorage.getItem('filtros'));
        console.log(objetoFiltros);
        const { tipoFactura, fechaInicio, fechaFin, numeroInterno, claveNumerica, consecutivo, nombreCliente } = objetoFiltros;
        let descripcionDoc = '';
        switch (tipoFactura) {
            case '01':
                descripcionDoc = 'Factura Electrónica';
                break;
            case '04':
                descripcionDoc = 'Tiquete Electrónico';
                break;
            case '03':
                descripcionDoc = 'Nota Crédito';
                break;
        }
        if (typeof fechaInicio === 'undefined' && typeof fechaFin === 'undefined'
            && typeof numeroInterno === 'undefined' && typeof claveNumerica === 'undefined'
            && typeof consecutivo === 'undefined' && typeof nombreCliente === 'undefined') {
            this.filtros = 'Tipo de documento ' + descripcionDoc;
        }
        if (typeof fechaInicio !== 'undefined' && typeof numeroInterno === 'undefined' && typeof claveNumerica === 'undefined'
            && typeof consecutivo === 'undefined' && typeof nombreCliente === 'undefined') {
            this.filtros = 'Fecha entre ' + fechaInicio + ' y ' + fechaFin + ', ' + descripcionDoc;
        }
        /*if(typeof fechaInicio !== 'undefined' && (typeof numeroInterno !== 'undefined' || typeof claveNumerica !== 'undefined'
        || typeof consecutivo !== 'undefined' || typeof nombreCliente !== 'undefined')){
          this.filtros = 'Fecha entre ' + fechaInicio +' y ' + fechaFin +', '+descripcionDoc;
        }*/
    }
};
ReporteComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
    { type: _services_pages_reporte_service__WEBPACK_IMPORTED_MODULE_1__["ReporteService"] }
];
ReporteComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'app-reporte',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./reporte.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/reporte/reporte.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./reporte.component.css */ "./src/app/pages/reporte/reporte.component.css")).default]
    })
], ReporteComponent);



/***/ }),

/***/ "./src/app/pages/usuario/usuario.component.css":
/*!*****************************************************!*\
  !*** ./src/app/pages/usuario/usuario.component.css ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ("\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3BhZ2VzL3VzdWFyaW8vdXN1YXJpby5jb21wb25lbnQuY3NzIn0= */");

/***/ }),

/***/ "./src/app/pages/usuario/usuario.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/usuario/usuario.component.ts ***!
  \****************************************************/
/*! exports provided: UsuarioComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioComponent", function() { return UsuarioComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_usuario_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/pages/usuario.service */ "./src/app/services/pages/usuario.service.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! sweetalert2 */ "./node_modules/sweetalert2/dist/sweetalert2.all.js");
/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_4__);





let UsuarioComponent = class UsuarioComponent {
    constructor(usuarioService) {
        this.usuarioService = usuarioService;
        this.objUsuario = {
            usuario: '',
            idpermiso: '',
            contrasena: '',
            imagen: null
        };
        this.listaPermisos = [];
        this.idusuario = 0;
        this.obtenerPermisos();
    }
    ngOnInit() {
    }
    nuevoUsuario(e, obj) {
        e.preventDefault();
        const File = document.getElementById('imagen');
        if (File.value.length > 0) {
            const mimeType = File.files[0].type;
            obj.imagen = File.files[0];
            if (!(mimeType === 'image/jpeg' || mimeType === 'image/png')) {
                alert('El tipo de archivo que intenta subir no está permitido');
                obj.imagen = null;
                return;
            }
        }
        else {
            obj.imagen = null;
        }
        console.log(obj);
        const formData = new FormData();
        formData.append('idpermiso', obj.idpermiso);
        formData.append('usuario', obj.usuario);
        formData.append('contrasena', obj.contrasena);
        formData.append('imagen', obj.imagen);
        this.usuarioService.nuevoUsuario(formData)
            .subscribe((response) => {
            const { message } = response;
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire('Nuevo Usuario', message, 'success');
            document.getElementById('formUsuario').reset();
        }, err => {
            console.error(err);
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire('Nuevo Usuario', err.error.err, 'error');
        });
    }
    obtenerUsuario(e, texto) {
        e.preventDefault();
        console.log(texto);
        if (texto === '') {
            return;
        }
        else {
            this.usuarioService.obtenerUsuario(texto)
                .subscribe((response) => {
                const usuario = response.usuario[0];
                this.objUsuario.usuario = usuario.usuario;
                this.objUsuario.idpermiso = usuario.idpermiso;
                //this.objUsuario.imagen = usuario.imagen;
                this.idusuario = usuario.id;
                //console.log(usuario.imagen);
                let imagen = Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/' + usuario.imagen;
                this.objUsuario.imagen = imagen;
                const File = document.getElementById('img_usuario');
                File.src = imagen;
            }, err => console.error(err));
        }
    }
    procesarUsuario(e, obj) {
        if (this.idusuario === 0) {
            console.log('Insertar Usuario');
            this.nuevoUsuario(e, obj);
        }
        else {
            this.actualizarUsuario(e, obj);
        }
    }
    actualizarUsuario(e, obj) {
        e.preventDefault();
        let imagen;
        const File = document.getElementById('imagen');
        if (File.files.length > 0) {
            const mimeType = File.files[0].type;
            if (mimeType === 'image/jpeg' || mimeType === 'image/png') {
                imagen = File.files[0];
            }
            else {
                alert('El tipo de archivo que intenta subir no está permitido');
                return;
            }
        }
        else {
            imagen = null;
        }
        const objActualizarUsuario = {
            id: this.idusuario,
            usuario: this.objUsuario.usuario,
            idpermiso: this.objUsuario.idpermiso,
            imagen,
            contrasena: undefined
        };
        const contrasena = this.objUsuario.contrasena;
        if (typeof contrasena !== 'undefined' || contrasena != '') {
            objActualizarUsuario.contrasena = contrasena;
        }
        const formData = new FormData();
        formData.append('usuario', objActualizarUsuario.usuario);
        formData.append('id', objActualizarUsuario.id.toString());
        formData.append('contrasena', objActualizarUsuario.contrasena);
        formData.append('idpermiso', objActualizarUsuario.idpermiso.toString());
        formData.append('imagen', objActualizarUsuario.imagen);
        this.usuarioService.actualizarUsuario(formData)
            .subscribe((response) => {
            const { message } = response;
            sweetalert2__WEBPACK_IMPORTED_MODULE_4___default.a.fire('Usuario actualizado', message, 'success');
            document.getElementById('formUsuario').reset();
        }, err => console.error(err));
    }
    obtenerPermisos() {
        this.usuarioService.obtenerPermisos()
            .subscribe((response) => {
            // tslint:disable-next-line: forin
            this.listaPermisos = response.permisos;
        }, err => {
            console.log(err);
        });
    }
};
UsuarioComponent.ctorParameters = () => [
    { type: _services_pages_usuario_service__WEBPACK_IMPORTED_MODULE_2__["UsuarioService"] }
];
UsuarioComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-usuario',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./usuario.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/pages/usuario/usuario.component.html")).default,
        styles: [tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! ./usuario.component.css */ "./src/app/pages/usuario/usuario.component.css")).default]
    })
], UsuarioComponent);



/***/ }),

/***/ "./src/app/services/pages/categoria.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/pages/categoria.service.ts ***!
  \*****************************************************/
/*! exports provided: CategoriaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoriaService", function() { return CategoriaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var _usuario_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario.service */ "./src/app/services/pages/usuario.service.ts");





let CategoriaService = class CategoriaService {
    constructor(http, usuarioService) {
        this.http = http;
        this.usuarioService = usuarioService;
        this.token = this.usuarioService.obtenerToken();
    }
    guardarCategoria(categoria) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        return this.http.post(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/categoria', categoria, { headers });
    }
    actualizarCategoria(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        return this.http.put(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/categoria/' + obj.id, obj, { headers });
    }
    obtenerCategoria(query) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/categoria/' + query, { headers });
    }
};
CategoriaService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _usuario_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioService"] }
];
CategoriaService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], CategoriaService);



/***/ }),

/***/ "./src/app/services/pages/cliente.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/pages/cliente.service.ts ***!
  \***************************************************/
/*! exports provided: ClienteService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClienteService", function() { return ClienteService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var _usuario_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario.service */ "./src/app/services/pages/usuario.service.ts");





let ClienteService = class ClienteService {
    constructor(http, clienteService) {
        this.http = http;
        this.clienteService = clienteService;
        this.token = this.clienteService.obtenerToken();
    }
    obtenerProvincias() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/provincias', { headers });
    }
    obtenerCantones(idprovincia) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/cantones/' + idprovincia, { headers }); //
    }
    obtenerDistritos(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        const url = '/distritos/' + obj.idcanton.trim() + '&' + obj.idprovincia;
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + url, { headers });
    }
    obtenerBarrios(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        const { idcanton, idprovincia, iddistrito } = obj;
        const url = '/barrios/' + idcanton + '&' + idprovincia + '&' + iddistrito;
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + url, { headers });
    }
    guardarCliente(cliente) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        return this.http.post(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/cliente', cliente, { headers });
    }
    actualizarCliente(cliente) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        const { id } = cliente;
        return this.http.put(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/cliente/' + id, cliente, { headers });
    }
    buscarCliente(query) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/cliente/' + query, { headers });
    }
    tipoExoneracion() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/tipoDocumentoExoneracion', { headers });
    }
    tipoIdentificacion() {
        return [
            {
                codigo: '01',
                descripcion: 'Física'
            },
            {
                codigo: '02',
                descripcion: 'Jurídica'
            },
            {
                codigo: '03',
                descripcion: 'DIMEX'
            },
            {
                codigo: '04',
                descripcion: 'NITE'
            }
        ];
    }
};
ClienteService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _usuario_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioService"] }
];
ClienteService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ClienteService);



/***/ }),

/***/ "./src/app/services/pages/consulta.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/pages/consulta.service.ts ***!
  \****************************************************/
/*! exports provided: ConsultaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConsultaService", function() { return ConsultaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _usuario_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./usuario.service */ "./src/app/services/pages/usuario.service.ts");






let ConsultaService = class ConsultaService {
    constructor(http, router, usuarioService) {
        this.http = http;
        this.router = router;
        this.usuarioService = usuarioService;
        this.token = this.usuarioService.obtenerToken();
    }
    tipoDocumento() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/tipoDocumento', { headers });
    }
    condicionVenta() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/condicionVenta', { headers });
    }
    medioPago() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/medioPago', { headers });
    }
    buscarFacturas(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        return this.http.post(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/facturas/buscar/', obj, { headers });
    }
    reporteFactura(id) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/reportes/facturas/?idfactura=' + id, { headers });
    }
    descargarPDF(obj) {
        const url = Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo;
        const a = document.createElement('a');
        a.href = url;
        a.click();
        // return this.http.get(baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo);
    }
    enviarCorreo(obj) {
        /*const url = baseURL() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo;
        const a = document.createElement('a');
        a.href = url;
        a.click();
        a.remove();*/
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/reportes/factura/pdf/?id=' + obj.id + '&tipo=' + obj.tipo + '&listaCorreos=' + obj.listaCorreos);
    }
    reporteExcel(obj) {
        if (typeof obj === 'undefined' || obj == null) {
            alert('No hay datos para exportar');
            return;
        }
        else {
            // tslint:disable-next-line: one-variable-per-declaration
            let tipoFactura = '', condicionVenta = '', medioPago = '';
            const datos = obj.map(elemento => {
                switch (elemento.tipo_factura) {
                    case '01':
                        tipoFactura = 'Factura Electrónica';
                        break;
                    case '04':
                        tipoFactura = 'Tiquete Electrónico';
                        break;
                    case '03':
                        tipoFactura = 'Nota Crédito';
                        break;
                    default:
                        throw new Error('El valor para el tipo de factura no esta dentro de los parametros permitidos');
                }
                switch (elemento.medio_pago) {
                    case '01':
                        medioPago = 'Efectivo';
                        break;
                    case '02':
                        medioPago = 'Tarjeta';
                        break;
                    case '03':
                        medioPago = 'Cheque';
                        break;
                    case '04':
                        medioPago = 'Depósito bancario';
                        break;
                    case '05':
                        medioPago = 'Recaudado por terceros';
                        break;
                    case '99':
                        medioPago = 'Otros';
                        break;
                }
                switch (elemento.condicion_venta) {
                    case '01':
                        condicionVenta = 'Contado';
                        break;
                    case '02':
                        condicionVenta = 'Crédito';
                        break;
                }
                return {
                    Cliente: (typeof elemento.cliente_nombre === 'undefined') ? '' : elemento.cliente_nombre,
                    Clavenumerica: elemento.clavenumerica,
                    Consecutivo: elemento.consecutivo,
                    NumeroInterno: elemento.numero_interno,
                    TipoComprobante: tipoFactura,
                    Fecha: elemento.fecha_factura,
                    CondicionVenta: condicionVenta,
                    MedioPago: medioPago,
                    CodigoMoneda: elemento.codigomoneda,
                    TipoCambio: elemento.tipocambio,
                    PlazoCredito: elemento.plazo_credito,
                    PorcentajeDescuento: elemento.porcentaje_descuento_total,
                    MontoDescuento: elemento.monto_descuento_total,
                    Subtotal: elemento.subtotal,
                    ServiciosGravados: elemento.totalservgravados,
                    ServiciosExentos: elemento.totalservexentos,
                    ServiciosExonerados: elemento.totalservexonerado,
                    MercanciasGravadas: elemento.totalmercanciasgravadas,
                    MercanciasExentas: elemento.totalmercanciasexentas,
                    MercanciasExoneradas: elemento.totalmercanciaexonerada,
                    TotalGravado: elemento.totalgravado,
                    TotalExento: elemento.totalexento,
                    TotalExonerado: elemento.totalexonerado,
                    TotalVenta: elemento.totalventa,
                    TotalDescuentos: elemento.totaldescuentos,
                    TotalVentaNeta: elemento.totalventaneta,
                    TotalImpuestos: elemento.totalimpuesto,
                    TotalFactura: elemento.totalcomprobante,
                    TotalIVADevuelto: elemento.totalIVADevuelto,
                    TotalOtrosCargos: (elemento.TotalOtrosCargos == null) ? '0' : elemento.TotalOtrosCargos,
                    Estado: (elemento.status_factura == null) ? '' : elemento.status_factura
                };
            });
            const objetoExcel = this.objetoADatosExcel(datos);
            this.descargarExcel(objetoExcel);
        }
    }
    objetoADatosExcel(objeto) {
        const excelFilas = [];
        const cabeceras = Object.keys(objeto[0]);
        excelFilas.push(cabeceras.join(','));
        for (const fila of objeto) {
            const valor = cabeceras.map(cabecera => {
                const filaEscapada = fila[cabecera].replace(/"/g, '\\"');
                return `"${filaEscapada}"`;
            });
            excelFilas.push(valor);
        }
        return excelFilas.join('\n');
    }
    descargarExcel(objeto) {
        // obtener la fecha para agregarla al nombre del archivo a exportar
        // tslint:disable-next-line: one-variable-per-declaration
        let mesFecha, anioFecha, diaFecha;
        const fechaBusqueda = new Date();
        mesFecha = Number(fechaBusqueda.getMonth()) + 1;
        diaFecha = Number(fechaBusqueda.getDate()) + 1;
        anioFecha = fechaBusqueda.getFullYear();
        if (mesFecha < 10) {
            mesFecha = '0' + String(mesFecha);
        }
        if (diaFecha < 10) {
            diaFecha = '0' + String(diaFecha);
        }
        const fechaFinal = anioFecha + '_' + mesFecha + '_' + diaFecha;
        // CREAR EL OBJETO BINARIO PARA EXPORTAR EL EXCEL
        const datosExcel = new Blob([objeto], { type: 'text/csv' });
        const url = window.URL.createObjectURL(datosExcel);
        const a = document.createElement('a');
        a.setAttribute('hidden', '');
        a.setAttribute('href', url);
        a.setAttribute('download', 'listado de Comprobantes+' + fechaFinal + '.csv');
        document.body.appendChild(a);
        a.click(); // se descarga el archivo
        document.body.removeChild(a);
    }
    cargarVistaFacturas(obj) {
        // HAY QUE PASAR LOS TIPOS DE FILTROS, NUMERO DE RESULTADOS 
        if (obj.length === 0) {
            return;
        }
        else {
            /*
                this.router.navigate(['/reporte'], {queryParams: {
                  fecha1: '20-20-2020',
                  fecha2: '20-20-2020',
                  tipoFactura: '01'
                }});
            */
            const pestana = window.open('#/reporte/comprobantes/01', '_blank');
            pestana.focus();
        }
    }
    anularComprobante(id) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/notacredito-anular/ ' + id, { headers });
    }
};
ConsultaService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _usuario_service__WEBPACK_IMPORTED_MODULE_5__["UsuarioService"] }
];
ConsultaService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ConsultaService);



/***/ }),

/***/ "./src/app/services/pages/descuento.service.ts":
/*!*****************************************************!*\
  !*** ./src/app/services/pages/descuento.service.ts ***!
  \*****************************************************/
/*! exports provided: DescuentoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DescuentoService", function() { return DescuentoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var _usuario_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario.service */ "./src/app/services/pages/usuario.service.ts");





let DescuentoService = class DescuentoService {
    constructor(http, usuarioService) {
        this.http = http;
        this.usuarioService = usuarioService;
        this.token = this.usuarioService.obtenerToken();
    }
    guardarDescuento(descuento) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        return this.http.post(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/descuento', descuento, { headers });
    }
    buscarDescuento(query) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/descuento/' + query, { headers });
    }
    actualizarDescuento(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        return this.http.put(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/descuento/' + obj.id, obj, { headers });
    }
    obtenerDescuentos() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/descuentos', { headers });
    }
};
DescuentoService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _usuario_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioService"] }
];
DescuentoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], DescuentoService);



/***/ }),

/***/ "./src/app/services/pages/emisor.service.ts":
/*!**************************************************!*\
  !*** ./src/app/services/pages/emisor.service.ts ***!
  \**************************************************/
/*! exports provided: EmisorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EmisorService", function() { return EmisorService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var _usuario_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario.service */ "./src/app/services/pages/usuario.service.ts");





let EmisorService = class EmisorService {
    constructor(http, usuarioService) {
        this.http = http;
        this.usuarioService = usuarioService;
        this.token = this.usuarioService.obtenerToken();
    }
    obtenerProvincias() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/provincias', { headers });
    }
    obtenerCantones(idprovincia) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/cantones/' + idprovincia, { headers }); //
    }
    obtenerDistritos(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        const url = '/distritos/' + obj.idcanton.trim() + '&' + obj.idprovincia;
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + url, { headers });
    }
    obtenerBarrios(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        const { idcanton, idprovincia, iddistrito } = obj;
        const url = '/barrios/' + idcanton + '&' + idprovincia + '&' + iddistrito;
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + url, { headers });
    }
    guardarEmisor(emisor) {
        // const headers = new HttpHeaders().set('Content-type', 'application/json');
        // headers.set('Authorization', this.token);
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.post(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/emisor', emisor, { headers });
    }
    obtenerCodigosActividad(cedula) {
        const url = 'https://api.hacienda.go.cr/fe/ae?identificacion=' + cedula;
        return this.http.get(url);
    }
    buscarEmisor(query) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/emisor/' + query, { headers });
    }
    actualizarEmisor(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.put(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/emisor/' + obj.getAll('id'), obj, { headers });
    }
    tipoServicio() {
        return [
            {
                codigo: '01',
                tipo_codigo: 'Código del producto del vendedor'
            },
            {
                codigo: '02',
                tipo_codigo: 'Código del producto del comprador'
            },
            {
                codigo: '03',
                tipo_codigo: 'Código del producto asignado por la industria'
            },
            {
                codigo: '04',
                tipo_codigo: 'Código uso interno'
            },
            {
                codigo: '99',
                tipo_codigo: 'Otros'
            }
        ];
    }
    tipoIdentificacion() {
        return [
            {
                codigo: '01',
                descripcion: 'Física'
            },
            {
                codigo: '02',
                descripcion: 'Jurídica'
            },
            {
                codigo: '03',
                descripcion: 'DIMEX'
            },
            {
                codigo: '04',
                descripcion: 'NITE'
            }
        ];
    }
};
EmisorService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _usuario_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioService"] }
];
EmisorService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], EmisorService);



/***/ }),

/***/ "./src/app/services/pages/factura.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/pages/factura.service.ts ***!
  \***************************************************/
/*! exports provided: FacturaService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FacturaService", function() { return FacturaService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var _usuario_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario.service */ "./src/app/services/pages/usuario.service.ts");





let FacturaService = class FacturaService {
    constructor(http, usuarioService) {
        this.http = http;
        this.usuarioService = usuarioService;
        this.token = this.usuarioService.obtenerToken();
    }
    tipoDocumento() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/tipoDocumento', { headers });
    }
    condicionVenta() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/condicionVenta', { headers });
    }
    medioPago() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/medioPago', { headers });
    }
    obtenerTipoCambio() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/tipoCambio', { headers });
    }
    obtenerMonedas() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/monedas', { headers });
    }
    nuevoComprobante(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        return this.http.post(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/factura', obj, { headers });
    }
};
FacturaService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _usuario_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioService"] }
];
FacturaService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], FacturaService);



/***/ }),

/***/ "./src/app/services/pages/impuesto.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/pages/impuesto.service.ts ***!
  \****************************************************/
/*! exports provided: ImpuestoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ImpuestoService", function() { return ImpuestoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var _usuario_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario.service */ "./src/app/services/pages/usuario.service.ts");





let ImpuestoService = class ImpuestoService {
    constructor(http, usuarioService) {
        this.http = http;
        this.usuarioService = usuarioService;
        this.token = this.usuarioService.obtenerToken();
    }
    nuevoImpuesto(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        return this.http.post(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/tipoImpuesto', obj, { headers });
    }
    buscarImpuesto(query) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/tipoImpuesto/' + query, { headers });
    }
    actualizarImpuesto(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        return this.http.put(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/tipoImpuesto/' + obj.id, obj, { headers });
    }
};
ImpuestoService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _usuario_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioService"] }
];
ImpuestoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ImpuestoService);



/***/ }),

/***/ "./src/app/services/pages/login.service.ts":
/*!*************************************************!*\
  !*** ./src/app/services/pages/login.service.ts ***!
  \*************************************************/
/*! exports provided: LoginService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginService", function() { return LoginService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @auth0/angular-jwt */ "./node_modules/@auth0/angular-jwt/fesm2015/auth0-angular-jwt.js");







let LoginService = class LoginService {
    constructor(http, jwtHelper) {
        this.http = http;
        this.jwtHelper = jwtHelper;
    }
    autenticarUsuario(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Content-type', 'application/json');
        return this.http.post(Object(_config_config__WEBPACK_IMPORTED_MODULE_5__["baseURL"])() + '/login', obj, { headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((data) => {
            console.log(data);
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.permiso);
            localStorage.setItem('imagenUsuario', data.imagen);
            localStorage.setItem('usuario', data.usuario);
            this.role = localStorage.getItem('permiso');
            return data.message;
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])(err => Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(err)));
    }
    obtenerRole() {
        return this.role;
    }
    estaAutenticado() {
        const token = localStorage.getItem('token');
        return !this.jwtHelper.isTokenExpired(token);
    }
};
LoginService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _auth0_angular_jwt__WEBPACK_IMPORTED_MODULE_6__["JwtHelperService"] }
];
LoginService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], LoginService);



/***/ }),

/***/ "./src/app/services/pages/producto.service.ts":
/*!****************************************************!*\
  !*** ./src/app/services/pages/producto.service.ts ***!
  \****************************************************/
/*! exports provided: ProductoService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProductoService", function() { return ProductoService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var _usuario_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./usuario.service */ "./src/app/services/pages/usuario.service.ts");





let ProductoService = class ProductoService {
    constructor(http, usuarioService) {
        this.http = http;
        this.usuarioService = usuarioService;
        this.token = this.usuarioService.obtenerToken();
    }
    UnidadesMedidaServicios() {
        return ['Al', 'Alc', 'Cm', 'I', 'Os', 'Sp', 'Spe', 'St', 'd', 'h', 's'];
    }
    obtenerCategorias() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/categorias', { headers });
    }
    obtenerDescuentos() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/descuentos', { headers });
    }
    obtenerImpuestos() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/impuestos', { headers });
    }
    obtenerUnidadesMedida() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/unidades', { headers });
    }
    nuevoProducto(producto) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]({
            'Content-type': 'application/json',
            Authorization: 'bearer ' + this.token
        });
        return this.http.post(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/producto', producto, { headers });
    }
    actualizarProducto(obj) {
        const { id } = obj;
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.put(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/producto/' + id, obj, { headers });
    }
    obtenerProducto(query, type) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/producto/?query=' + query + '&type=' + type, { headers });
    }
};
ProductoService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] },
    { type: _usuario_service__WEBPACK_IMPORTED_MODULE_4__["UsuarioService"] }
];
ProductoService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ProductoService);



/***/ }),

/***/ "./src/app/services/pages/reporte.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/pages/reporte.service.ts ***!
  \***************************************************/
/*! exports provided: ReporteService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReporteService", function() { return ReporteService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let ReporteService = class ReporteService {
    constructor() { }
    obtenerListadoComprobantes() {
        const comprobantes = JSON.parse(localStorage.getItem('comprobantes'));
        let tipoFactura = '';
        let condicionVenta = '';
        let medioPago = '';
        console.log(comprobantes);
        const datos = comprobantes.map(elemento => {
            switch (elemento.tipo_factura) {
                case '01':
                    tipoFactura = 'Factura Electrónica';
                    break;
                case '04':
                    tipoFactura = 'Tiquete Electrónico';
                    break;
                case '03':
                    tipoFactura = 'Nota Crédito';
                    break;
                default:
                    throw new Error('El valor para el tipo de factura no esta dentro de los parametros permitidos');
            }
            switch (elemento.medio_pago) {
                case '01':
                    medioPago = 'Efectivo';
                    break;
                case '02':
                    medioPago = 'Tarjeta';
                    break;
                case '03':
                    medioPago = 'Cheque';
                    break;
                case '04':
                    medioPago = 'Depósito bancario';
                    break;
                case '05':
                    medioPago = 'Recaudado por terceros';
                    break;
                case '99':
                    medioPago = 'Otros';
                    break;
            }
            switch (elemento.condicion_venta) {
                case '01':
                    condicionVenta = 'Contado';
                    break;
                case '02':
                    condicionVenta = 'Crédito';
                    break;
            }
            return {
                Cliente: (typeof elemento.cliente_nombre === 'undefined') ? '' : elemento.cliente_nombre,
                NombreComercial: (typeof elemento.cliente_nombre_comercial !== 'undefined') ? elemento.cliente_nombre_comercial : '',
                CedulaCliente: elemento.cedula_cliente,
                Clavenumerica: elemento.clavenumerica,
                Consecutivo: elemento.consecutivo,
                NumeroInterno: elemento.numero_interno,
                TipoComprobante: tipoFactura,
                Fecha: elemento.fecha_factura,
                Hora: elemento.hora,
                CondicionVenta: condicionVenta,
                MedioPago: medioPago,
                CodigoMoneda: elemento.codigomoneda,
                TipoCambio: elemento.tipocambio,
                PlazoCredito: elemento.plazo_credito,
                PorcentajeDescuento: elemento.porcentaje_descuento_total,
                MontoDescuento: elemento.monto_descuento_total,
                Subtotal: elemento.subtotal,
                ServiciosGravados: elemento.totalservgravados,
                ServiciosExentos: elemento.totalservexentos,
                ServiciosExonerados: elemento.totalservexonerado,
                MercanciasGravadas: elemento.totalmercanciasgravadas,
                MercanciasExentas: elemento.totalmercanciasexentas,
                MercanciasExoneradas: elemento.totalmercanciaexonerada,
                TotalGravado: elemento.totalgravado,
                TotalExento: elemento.totalexento,
                TotalExonerado: elemento.totalexonerado,
                TotalVenta: elemento.totalventa,
                TotalDescuentos: elemento.totaldescuentos,
                TotalVentaNeta: elemento.totalventaneta,
                TotalImpuestos: elemento.totalimpuesto,
                TotalFactura: elemento.totalcomprobante,
                TotalIVADevuelto: elemento.totalIVADevuelto,
                TotalOtrosCargos: (elemento.TotalOtrosCargos == null) ? '0' : elemento.TotalOtrosCargos,
                Estado: (elemento.status_factura == null) ? '' : elemento.status_factura
            };
        });
        return datos;
    }
};
ReporteService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], ReporteService);



/***/ }),

/***/ "./src/app/services/pages/usuario.service.ts":
/*!***************************************************!*\
  !*** ./src/app/services/pages/usuario.service.ts ***!
  \***************************************************/
/*! exports provided: UsuarioService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UsuarioService", function() { return UsuarioService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _modelos_usuario_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../modelos/usuario.model */ "./src/app/modelos/usuario.model.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");







let UsuarioService = class UsuarioService {
    constructor(http) {
        this.http = http;
        this.token = this.obtenerToken();
    }
    nuevoUsuario(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.post(Object(_config_config__WEBPACK_IMPORTED_MODULE_6__["baseURL"])() + '/usuario', obj, { headers });
    }
    obtenerPermisos() {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_6__["baseURL"])() + '/permisos', { headers });
    }
    obtenerUsuario(usuario) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.get(Object(_config_config__WEBPACK_IMPORTED_MODULE_6__["baseURL"])() + '/usuario/' + usuario, { headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(data => new _modelos_usuario_model__WEBPACK_IMPORTED_MODULE_3__["Usuario"]().deserialize(data)), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(err => Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["throwError"])(err)));
    }
    actualizarUsuario(obj) {
        const headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpHeaders"]().set('Authorization', 'bearer ' + this.token);
        return this.http.put(Object(_config_config__WEBPACK_IMPORTED_MODULE_6__["baseURL"])() + '/usuario/' + obj.getAll('id'), obj, { headers });
    }
    obtenerToken() {
        return localStorage.getItem('token');
    }
};
UsuarioService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"] }
];
UsuarioService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], UsuarioService);



/***/ }),

/***/ "./src/app/services/shared/guard/login.guard.ts":
/*!******************************************************!*\
  !*** ./src/app/services/shared/guard/login.guard.ts ***!
  \******************************************************/
/*! exports provided: LoginGuard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginGuard", function() { return LoginGuard; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _pages_login_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pages/login.service */ "./src/app/services/pages/login.service.ts");




let LoginGuard = class LoginGuard {
    constructor(loginService, router) {
        this.loginService = loginService;
        this.router = router;
    }
    canActivate() {
        console.log(this.loginService.estaAutenticado());
        // tslint:disable-next-line: max-line-length
        if (!this.loginService.estaAutenticado()) {
            this.router.navigate(['/login']);
            return false;
        }
        return true;
    }
};
LoginGuard.ctorParameters = () => [
    { type: _pages_login_service__WEBPACK_IMPORTED_MODULE_3__["LoginService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] }
];
LoginGuard = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    })
], LoginGuard);



/***/ }),

/***/ "./src/app/shared/breadcrumbs/breadcrumbs.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/breadcrumbs/breadcrumbs.component.ts ***!
  \*************************************************************/
/*! exports provided: BreadcrumbsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BreadcrumbsComponent", function() { return BreadcrumbsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let BreadcrumbsComponent = class BreadcrumbsComponent {
    constructor() { }
    ngOnInit() {
    }
};
BreadcrumbsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-breadcrumbs',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./breadcrumbs.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/breadcrumbs/breadcrumbs.component.html")).default
    })
], BreadcrumbsComponent);



/***/ }),

/***/ "./src/app/shared/header/header.component.ts":
/*!***************************************************!*\
  !*** ./src/app/shared/header/header.component.ts ***!
  \***************************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _services_pages_login_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../services/pages/login.service */ "./src/app/services/pages/login.service.ts");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../config/config */ "./src/app/config/config.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");





let HeaderComponent = class HeaderComponent {
    constructor(loginService, router) {
        this.loginService = loginService;
        this.router = router;
        this.cargarCredencialesUsuario();
    }
    ngOnInit() {
    }
    cargarCredencialesUsuario() {
        setTimeout(() => {
            const imagen = localStorage.getItem('imagenUsuario');
            const usuario = localStorage.getItem('usuario');
            const src = Object(_config_config__WEBPACK_IMPORTED_MODULE_3__["baseURL"])() + '/' + imagen;
            console.log(src);
            const imgBox = document.getElementById('img_header_box');
            imgBox.src = src;
            const img = document.getElementById('img_header');
            img.src = src;
            const h4Usuario = document.getElementById('nombreUsuario');
            h4Usuario.innerHTML = usuario;
        }, 500);
    }
    cerrarSesion() {
        localStorage.setItem('token', '');
        localStorage.setItem('permiso', '');
        localStorage.setItem('imagenUsuario', '');
        localStorage.setItem('imagenUsuario', '');
        localStorage.setItem('usuario', '');
        this.router.navigate(['/login']);
    }
};
HeaderComponent.ctorParameters = () => [
    { type: _services_pages_login_service__WEBPACK_IMPORTED_MODULE_2__["LoginService"] },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] }
];
HeaderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-header',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./header.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/header/header.component.html")).default
    })
], HeaderComponent);



/***/ }),

/***/ "./src/app/shared/nopagefound/nopagefound.component.ts":
/*!*************************************************************!*\
  !*** ./src/app/shared/nopagefound/nopagefound.component.ts ***!
  \*************************************************************/
/*! exports provided: NopagefoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NopagefoundComponent", function() { return NopagefoundComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let NopagefoundComponent = class NopagefoundComponent {
    constructor() { }
    ngOnInit() {
    }
};
NopagefoundComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-nopagefound',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./nopagefound.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/nopagefound/nopagefound.component.html")).default
    })
], NopagefoundComponent);



/***/ }),

/***/ "./src/app/shared/shared.module.ts":
/*!*****************************************!*\
  !*** ./src/app/shared/shared.module.ts ***!
  \*****************************************/
/*! exports provided: SharedModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SharedModule", function() { return SharedModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _nopagefound_nopagefound_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nopagefound/nopagefound.component */ "./src/app/shared/nopagefound/nopagefound.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./header/header.component */ "./src/app/shared/header/header.component.ts");
/* harmony import */ var _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sidebar/sidebar.component */ "./src/app/shared/sidebar/sidebar.component.ts");
/* harmony import */ var _breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./breadcrumbs/breadcrumbs.component */ "./src/app/shared/breadcrumbs/breadcrumbs.component.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm2015/platform-browser.js");









let SharedModule = class SharedModule {
};
SharedModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_router__WEBPACK_IMPORTED_MODULE_7__["RouterModule"],
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_8__["BrowserModule"]
        ],
        declarations: [
            _nopagefound_nopagefound_component__WEBPACK_IMPORTED_MODULE_3__["NopagefoundComponent"],
            _header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"],
            _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__["SidebarComponent"],
            _breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_6__["BreadcrumbsComponent"],
            _nopagefound_nopagefound_component__WEBPACK_IMPORTED_MODULE_3__["NopagefoundComponent"]
        ],
        exports: [
            _nopagefound_nopagefound_component__WEBPACK_IMPORTED_MODULE_3__["NopagefoundComponent"],
            _header_header_component__WEBPACK_IMPORTED_MODULE_4__["HeaderComponent"],
            _sidebar_sidebar_component__WEBPACK_IMPORTED_MODULE_5__["SidebarComponent"],
            _breadcrumbs_breadcrumbs_component__WEBPACK_IMPORTED_MODULE_6__["BreadcrumbsComponent"],
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
        ]
    })
], SharedModule);



/***/ }),

/***/ "./src/app/shared/sidebar/sidebar.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/shared/sidebar/sidebar.component.ts ***!
  \*****************************************************/
/*! exports provided: SidebarComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SidebarComponent", function() { return SidebarComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let SidebarComponent = class SidebarComponent {
    constructor() { }
    ngOnInit() {
    }
    mostrar() {
        const permiso = localStorage.getItem('role');
        if (permiso.toString() === 'admin') {
            return true;
        }
        else {
            return false;
        }
    }
};
SidebarComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-sidebar',
        template: tslib__WEBPACK_IMPORTED_MODULE_0__["__importDefault"](__webpack_require__(/*! raw-loader!./sidebar.component.html */ "./node_modules/raw-loader/dist/cjs.js!./src/app/shared/sidebar/sidebar.component.html")).default
    })
], SidebarComponent);



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm2015/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");





if (_environments_environment__WEBPACK_IMPORTED_MODULE_4__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_2__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_3__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/nvm23/Escritorio/Brete/FrontendFa/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map