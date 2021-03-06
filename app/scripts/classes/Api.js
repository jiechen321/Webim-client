'use strict';


/**
 * Api
 * Cette classe gère l'intéraction avec le serveur Bim. Elle implémente les routes de l'api REST définie dans le cadre du projet :
 *
 * ouvrir https://www.getpostman.com/collections/3e70b7087b15671ece26 avec POSTMAN pour tester l'api.
 *
 * @param Config : un objet contenant la configuration. Par défaut, utiliser scripts/Config.js
 * @returns {{}}
 * @constructor
 */
var Api = function(Config){
	var self = {};

    /**
     * L'en-tête de l'url de toutes les requêtes à destination du serveur Bim
     * @type {string}
     */
	var URL = Config.server().host+':'+Config.server().port+Config.apiPath;

	/*
	Méthodes génériques à réutiliser dans les fonctions personnalisées
	------------------------------------------------------------------------
	*/

  $.ajaxSetup({
    headers: { 'apikey': Config.api().apikey }
  });

    /**
     * Récupère des données du serveur
     * @param url
     * @param parameters
     * @param success : Fonction callback en cas de succès
     * @param failure : Fonction callback en cas d'échec
     * @param final : Fonction callback peu importe le résultat
     */
	var get = function (url, parameters, success, failure, final) {
		var jqxhr = $.ajax({
        method:'GET',
        url:URL+url,
        data:parameters
		  })
			.done(success)
			.fail(failure)
			.always(final);
	};

    /**
     * Envoie des données sur le serveur
     * @param url
     * @param parameters
     * @param success : Fonction callback en cas de succès
     * @param failure : Fonction callback en cas d'échec
     * @param final : Fonction callback peu importe le résultat
     */
	var post = function (url, parameters, success, failure, final) {
		var jqxhr = $.ajax({method:'POST',url:URL+url,data:parameters,async:true})
			.done(success)
			.fail(failure)
			.always(final);
	};

    /**
     * Initialise une fonction. Peut-etre utilisé comme alternative pour remplacer une fonction callback
     * Ex :
     * var maFonction = callbackFunction || initFunction
     * Si callbackFunction n'est pas définie, initFunction sera utilisée.
     *
     *
     * @param func
     * @returns {Function}
     */
	var initFunction = function (func) {
		return function(){};
	};

	/*
	Méthodes correspondant aux routes de l'api : à définir au fur et à mesure
	------------------------------------------------------------------------
	*/

	/*------------------------------------------------------------------------
		Collection ifc/
	/------------------------------------------------------------------------*/

	self.ifc = (function () {
		var ifc = {};
		var baseurl = '/ifc/';

        /**
         * Charge un fichier ifc
         * @param filename : le fichier à charger
         * @param success
         * @param failure
         * @param final
         */
		ifc.load = function (filename, success, failure, final) {
			get(baseurl+filename,{},success || initFunction, failure || initFunction, final || initFunction);
		};

        /**
         * Charge les parties obj et mtl d'un fichier ifc
         * @param filename
         * @param success
         * @param failure
         * @param final
         */
		ifc.parts = function (filename, success, failure, final) {
			var localbaseurl = baseurl+'parts/';

			get(localbaseurl+filename,{},success || initFunction, failure || initFunction, final || initFunction);
		};

        /**
         * Charge la partie mtl d'un fichier ifc
         * @param filename
         * @param success
         * @param failure
         * @param final
         */
		ifc.mtl = function (filename, success, failure, final) {
			var localbaseurl = baseurl+'mtl/';

			get(localbaseurl+filename,{},success || initFunction, failure || initFunction, final || initFunction);
		};

        /**
         * Charge la partie obj d'un fichier ifc
         * @param filename
         * @param success
         * @param failure
         * @param final
         */
		ifc.obj = function (filename, success, failure, final) {
			var localbaseurl = baseurl+'obj/';

			get(localbaseurl+filename,{},success || initFunction, failure || initFunction, final || initFunction);
		};

		return ifc;
	})();

	/*------------------------------------------------------------------------
		Collection mtl/
	/------------------------------------------------------------------------*/

	self.mtl = (function () {
		var mtl = {};

		// TODO
        // Définir les routes et les implémenter

		return mtl;
	})();

	/*------------------------------------------------------------------------
		Collection obj/
	/------------------------------------------------------------------------*/

	self.obj = (function () {
		var obj = {};

        // TODO
        // Définir les routes et les implémenter


        return obj;
	})();

	return self;
};
