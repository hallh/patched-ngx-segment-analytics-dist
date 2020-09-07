import { Inject, Injectable, InjectionToken, NgModule, Optional, PLATFORM_ID, SkipSelf } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';

/**
 * \@dynamic
 */
var SegmentService = /** @class */ (function () {
    /**
     * @param {?} w Browser window
     * @param {?} doc Browser DOM
     * @param {?} config Segment configuration
     */
    function SegmentService(w, doc, config) {
        var _this = this;
        this.w = w;
        this.doc = doc;
        this.config = config;
        if (typeof this.w.analytics === 'undefined'
            || typeof this.w.analytics.initialize === 'undefined'
            || this.w.analytics.initialize === false) {
            if (this.config.debug) {
                console.log('Segment initialization ...');
            }
            this.w.analytics = [];
            this.w.analytics.methods = [
                'trackSubmit',
                'trackClick',
                'trackLink',
                'trackForm',
                'pageview',
                'identify',
                'reset',
                'group',
                'track',
                'ready',
                'alias',
                'debug',
                'page',
                'once',
                'off',
                'on',
                'addSourceMiddleware',
            ];
            this.w.analytics.factory = function (method) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    args.unshift(method);
                    _this.w.analytics.push(args);
                    return _this.w.analytics;
                };
            };
            this.w.analytics.methods.forEach(function (method) {
                _this.w.analytics[method] = _this.w.analytics.factory(method);
            });
            this.w.analytics.load = function (key) {
                var script = _this.doc.createElement('script');
                script.type = 'text/javascript';
                script.async = true;
                script.src = ('https:' === _this.doc.location.protocol
                    ? 'https://' : 'http://')
                    + 'cdn.segment.com/analytics.js/v1/'
                    + key + '/analytics.min.js';
                var first = _this.doc.getElementsByTagName('script')[0];
                first.parentNode.insertBefore(script, first);
            };
            this.w.analytics.SNIPPET_VERSION = '4.0.0';
            this.w.analytics.load(this.config.apiKey);
            if (this.config.debug) {
                console.log('Segment initialized');
            }
            this.debug(this.config.debug);
        }
    }
    /**
     * The identify method is how you associate your users and their actions to a recognizable userId and traits.
     *
     * @param {?=} userId The database ID for the user.
     * @param {?=} traits A dictionary of traits you know about the user, like their email or name
     * @param {?=} options A dictionary of options.
     *
     * @return {?}
     */
    SegmentService.prototype.identify = function (userId, traits, options) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.w.analytics.identify(userId, traits, options, resolve(_this));
        });
    };
    /**
     * The track method lets you record any actions your users perform.
     *
     * @param {?} event The name of the event you’re tracking.
     * @param {?=} properties A dictionary of properties for the event.
     * @param {?=} options A dictionary of options.
     *
     * @return {?}
     */
    SegmentService.prototype.track = function (event, properties, options) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.w.analytics.track(event, properties, options, resolve(_this));
        });
    };
    /**
     * The page method lets you record page views on your website, along with optional extra information about the page being viewed.
     *
     * @param {?=} category The category of the page.
     * @param {?=} name The name of the page.
     * @param {?=} properties A dictionary of properties of the page.
     * @param {?=} options A dictionary of options.
     *
     * @return {?}
     */
    SegmentService.prototype.page = function (category, name, properties, options) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.w.analytics.page(category, name, properties, options, resolve(_this));
        });
    };
    /**
     * The group method associates an identified user with a company, organization, project, workspace, team, tribe, platoon,
     * assemblage, cluster, troop, gang, party, society or any other name you came up with for the same concept.
     *
     * @param {?} groupId The Group ID to associate with the current user.
     * @param {?=} traits A dictionary of traits for the group.
     *
     * @return {?}
     */
    SegmentService.prototype.group = function (groupId, traits) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.w.analytics.group(groupId, traits, resolve(_this));
        });
    };
    /**
     * The alias method combines two previously unassociated user identities.
     *
     * @param {?} userId The new user ID you want to associate with the user.
     * @param {?=} previousId The previous ID that the user was recognized by. This defaults to the currently identified user’s ID.
     * @param {?=} options A dictionary of options.
     *
     * @return {?}
     */
    SegmentService.prototype.alias = function (userId, previousId, options) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.w.analytics.alias(userId, previousId, options, resolve(_this));
        });
    };
    /**
     * The ready method allows you execute a promise that will be called as soon as all of your enabled destinations have loaded
     * and analytics.js has completed initialization.
     *
     * @return {?}
     */
    SegmentService.prototype.ready = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.w.analytics.ready(resolve(_this));
        });
    };
    /**
     * Return informations about the currently identified user
     *
     * @return {?} Informations about the currently identified user
     */
    SegmentService.prototype.user = function () {
        return this.w.analytics.user();
    };
    /**
     * Return identifier about the currently identified user
     *
     * @return {?} Identifier about the currently identified user
     */
    SegmentService.prototype.id = function () {
        return this.w.analytics.id();
    };
    /**
     * Return traits about the currently identified user
     *
     * @return {?} Traits about the currently identified user
     */
    SegmentService.prototype.traits = function () {
        return this.w.analytics.traits();
    };
    /**
     * Reset the id, including anonymousId, and clear traits for the currently identified user and group.
     * @return {?}
     */
    SegmentService.prototype.reset = function () {
        this.w.analytics.reset();
    };
    /**
     * Turn on/off debug mode, logging helpful messages to the console.
     *
     * @param {?=} enabled Enable or not the debug mode
     * @return {?}
     */
    SegmentService.prototype.debug = function (enabled) {
        this.w.analytics.debug(enabled);
    };
    /**
     * Set listeners for these events and run your own custom code.
     *
     * @param {?} method Name of the method to listen for
     * @param {?} callback A function to execute after each the emitted method
     * @return {?}
     */
    SegmentService.prototype.on = function (method, callback) {
        this.w.analytics.on(method, callback);
    };
    /**
     * Attaches the `track` call as a handler to a link
     *
     * @param {?} elements DOM element or an array of DOM elements to be bound with track method.
     * @param {?} event The name of the event, passed to the `track` method or a function that returns a string to be used
     *              as the name of the track event.
     * @param {?=} properties A dictionary of properties to pass with the `track` method.
     * @return {?}
     */
    SegmentService.prototype.trackLink = function (elements, event, properties) {
        this.w.analytics.trackLink(elements, event, properties);
    };
    /**
     * Binds a `track` call to a form submission.
     *
     * @param {?} forms The form element to track or an array of form
     * @param {?} event The name of the event, passed to the `track` method.
     * @param {?=} properties A dictionary of properties to pass with the `track` method.
     * @return {?}
     */
    SegmentService.prototype.trackForm = function (forms, event, properties) {
        this.w.analytics.trackForm(forms, event, properties);
    };
    /**
     * Set the length (in milliseconds) of the callbacks and helper functions
     *
     * @param {?} timeout Number of milliseconds
     * @return {?}
     */
    SegmentService.prototype.timeout = function (timeout) {
        this.w.analytics.timeout(timeout);
    };
    /**
     * Add a source middleware called on events
     *
     * @param {?} middleware Custom function
     * @return {?}
     */
    SegmentService.prototype.addSourceMiddleware = function (middleware) {
        this.w.analytics.addSourceMiddleware(middleware);
    };
    SegmentService.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    SegmentService.ctorParameters = function () { return [
        { type: WindowWrapper, decorators: [{ type: Inject, args: [WindowWrapper,] },] },
        { type: Document, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: undefined, decorators: [{ type: Inject, args: [SEGMENT_CONFIG,] },] },
    ]; };
    return SegmentService;
}());

/**
 * Segment Configuration Injection Token
 */
var SEGMENT_CONFIG = new InjectionToken('ngx-segment-analytics.config');
/**
 * Window Wrapper for Angular AOT
 */
var WindowWrapper = /** @class */ (function () {
    function WindowWrapper() {
    }
    WindowWrapper.decorators = [
        { type: Injectable },
    ];
    /**
     * @nocollapse
     */
    WindowWrapper.ctorParameters = function () { return []; };
    return WindowWrapper;
}());
/**
 * Window Provider for Angular AOT
 * @param {?} platformId
 * @return {?} Browser Window instance
 */
function getWindow(platformId) {
    return isPlatformBrowser(platformId) ? window : {};
}
/**
 * Segment Module
 */
var SegmentModule = /** @class */ (function () {
    /**
     * Segment Module Constructor
     *
     * @param {?} parentModule Must be null
     */
    function SegmentModule(parentModule) {
        if (parentModule) {
            throw new Error('SegmentModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * Segment Module Initialisation
     *
     * @param {?=} config Segment Configuration
     * @return {?} Segment Module
     */
    SegmentModule.forRoot = function (config) {
        return {
            ngModule: SegmentModule,
            providers: [
                { provide: SEGMENT_CONFIG, useValue: config },
                SegmentService,
            ],
        };
    };
    SegmentModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    providers: [
                        { provide: WindowWrapper, useFactory: getWindow, deps: [PLATFORM_ID] }
                    ]
                },] },
    ];
    /**
     * @nocollapse
     */
    SegmentModule.ctorParameters = function () { return [
        { type: SegmentModule, decorators: [{ type: Optional }, { type: SkipSelf },] },
    ]; };
    return SegmentModule;
}());

export { SEGMENT_CONFIG, WindowWrapper, getWindow, SegmentModule, SegmentService };
