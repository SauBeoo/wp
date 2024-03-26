/* Bootstrap 4.5.3 */
!function(t, e) {
    "object" == typeof exports && "undefined" != typeof module ? e(exports, require("jquery"), require("popper.js")) : "function" == typeof define && define.amd ? define(["exports", "jquery", "popper.js"], e) : e((t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = {}, t.jQuery, t.Popper)
}(this, (function(t, e, n) {
        "use strict";
        function i(t) {
            return t && "object" == typeof t && "default"in t ? t : {
                default: t
            }
        }
        var o = i(e)
            , a = i(n);
        function s(t, e) {
            for (var n = 0; n < e.length; n++) {
                var i = e[n];
                i.enumerable = i.enumerable || !1,
                    i.configurable = !0,
                "value"in i && (i.writable = !0),
                    Object.defineProperty(t, i.key, i)
            }
        }
        function l(t, e, n) {
            return e && s(t.prototype, e),
            n && s(t, n),
                t
        }
        function r() {
            return (r = Object.assign || function(t) {
                    for (var e = 1; e < arguments.length; e++) {
                        var n = arguments[e];
                        for (var i in n)
                            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i])
                    }
                    return t
                }
            ).apply(this, arguments)
        }
        function u(t) {
            var e = this
                , n = !1;
            return o.default(this).one(d.TRANSITION_END, (function() {
                    n = !0
                }
            )),
                setTimeout((function() {
                        n || d.triggerTransitionEnd(e)
                    }
                ), t),
                this
        }
        var d = {
            TRANSITION_END: "bsTransitionEnd",
            getUID: function(t) {
                do {
                    t += ~~(1e6 * Math.random())
                } while (document.getElementById(t));
                return t
            },
            getSelectorFromElement: function(t) {
                var e = t.getAttribute("data-target");
                if (!e || "#" === e) {
                    var n = t.getAttribute("href");
                    e = n && "#" !== n ? n.trim() : ""
                }
                try {
                    return document.querySelector(e) ? e : null
                } catch (t) {
                    return null
                }
            },
            getTransitionDurationFromElement: function(t) {
                if (!t)
                    return 0;
                var e = o.default(t).css("transition-duration")
                    , n = o.default(t).css("transition-delay")
                    , i = parseFloat(e)
                    , a = parseFloat(n);
                return i || a ? (e = e.split(",")[0],
                    n = n.split(",")[0],
                1e3 * (parseFloat(e) + parseFloat(n))) : 0
            },
            reflow: function(t) {
                return t.offsetHeight
            },
            triggerTransitionEnd: function(t) {
                o.default(t).trigger("transitionend")
            },
            supportsTransitionEnd: function() {
                return Boolean("transitionend")
            },
            isElement: function(t) {
                return (t[0] || t).nodeType
            },
            typeCheckConfig: function(t, e, n) {
                for (var i in n)
                    if (Object.prototype.hasOwnProperty.call(n, i)) {
                        var o = n[i]
                            , a = e[i]
                            , s = a && d.isElement(a) ? "element" : null === (l = a) || "undefined" == typeof l ? "" + l : {}.toString.call(l).match(/\s([a-z]+)/i)[1].toLowerCase();
                        if (!new RegExp(o).test(s))
                            throw new Error(t.toUpperCase() + ': Option "' + i + '" provided type "' + s + '" but expected type "' + o + '".')
                    }
                var l
            },
            findShadowRoot: function(t) {
                if (!document.documentElement.attachShadow)
                    return null;
                if ("function" == typeof t.getRootNode) {
                    var e = t.getRootNode();
                    return e instanceof ShadowRoot ? e : null
                }
                return t instanceof ShadowRoot ? t : t.parentNode ? d.findShadowRoot(t.parentNode) : null
            },
            jQueryDetection: function() {
                if ("undefined" == typeof o.default)
                    throw new TypeError("Bootstrap's JavaScript requires jQuery. jQuery must be included before Bootstrap's JavaScript.");
                var t = o.default.fn.jquery.split(" ")[0].split(".");
                if (t[0] < 2 && t[1] < 9 || 1 === t[0] && 9 === t[1] && t[2] < 1 || t[0] >= 4)
                    throw new Error("Bootstrap's JavaScript requires at least jQuery v1.9.1 but less than v4.0.0")
            }
        };
        d.jQueryDetection(),
            o.default.fn.emulateTransitionEnd = u,
            o.default.event.special[d.TRANSITION_END] = {
                bindType: "transitionend",
                delegateType: "transitionend",
                handle: function(t) {
                    if (o.default(t.target).is(this))
                        return t.handleObj.handler.apply(this, arguments)
                }
            };
        var f = "alert"
            , c = o.default.fn[f]
            , h = function() {
            function t(t) {
                this._element = t
            }
            var e = t.prototype;
            return e.close = function(t) {
                var e = this._element;
                t && (e = this._getRootElement(t)),
                this._triggerCloseEvent(e).isDefaultPrevented() || this._removeElement(e)
            }
                ,
                e.dispose = function() {
                    o.default.removeData(this._element, "bs.alert"),
                        this._element = null
                }
                ,
                e._getRootElement = function(t) {
                    var e = d.getSelectorFromElement(t)
                        , n = !1;
                    return e && (n = document.querySelector(e)),
                    n || (n = o.default(t).closest(".alert")[0]),
                        n
                }
                ,
                e._triggerCloseEvent = function(t) {
                    var e = o.default.Event("close.bs.alert");
                    return o.default(t).trigger(e),
                        e
                }
                ,
                e._removeElement = function(t) {
                    var e = this;
                    if (o.default(t).removeClass("show"),
                        o.default(t).hasClass("fade")) {
                        var n = d.getTransitionDurationFromElement(t);
                        o.default(t).one(d.TRANSITION_END, (function(n) {
                                return e._destroyElement(t, n)
                            }
                        )).emulateTransitionEnd(n)
                    } else
                        this._destroyElement(t)
                }
                ,
                e._destroyElement = function(t) {
                    o.default(t).detach().trigger("closed.bs.alert").remove()
                }
                ,
                t._jQueryInterface = function(e) {
                    return this.each((function() {
                            var n = o.default(this)
                                , i = n.data("bs.alert");
                            i || (i = new t(this),
                                n.data("bs.alert", i)),
                            "close" === e && i[e](this)
                        }
                    ))
                }
                ,
                t._handleDismiss = function(t) {
                    return function(e) {
                        e && e.preventDefault(),
                            t.close(this)
                    }
                }
                ,
                l(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }]),
                t
        }();
        o.default(document).on("click.bs.alert.data-api", '[data-dismiss="alert"]', h._handleDismiss(new h)),
            o.default.fn[f] = h._jQueryInterface,
            o.default.fn[f].Constructor = h,
            o.default.fn[f].noConflict = function() {
                return o.default.fn[f] = c,
                    h._jQueryInterface
            }
        ;
        var g = o.default.fn.button
            , m = function() {
            function t(t) {
                this._element = t,
                    this.shouldAvoidTriggerChange = !1
            }
            var e = t.prototype;
            return e.toggle = function() {
                var t = !0
                    , e = !0
                    , n = o.default(this._element).closest('[data-toggle="buttons"]')[0];
                if (n) {
                    var i = this._element.querySelector('input:not([type="hidden"])');
                    if (i) {
                        if ("radio" === i.type)
                            if (i.checked && this._element.classList.contains("active"))
                                t = !1;
                            else {
                                var a = n.querySelector(".active");
                                a && o.default(a).removeClass("active")
                            }
                        t && ("checkbox" !== i.type && "radio" !== i.type || (i.checked = !this._element.classList.contains("active")),
                        this.shouldAvoidTriggerChange || o.default(i).trigger("change")),
                            i.focus(),
                            e = !1
                    }
                }
                this._element.hasAttribute("disabled") || this._element.classList.contains("disabled") || (e && this._element.setAttribute("aria-pressed", !this._element.classList.contains("active")),
                t && o.default(this._element).toggleClass("active"))
            }
                ,
                e.dispose = function() {
                    o.default.removeData(this._element, "bs.button"),
                        this._element = null
                }
                ,
                t._jQueryInterface = function(e, n) {
                    return this.each((function() {
                            var i = o.default(this)
                                , a = i.data("bs.button");
                            a || (a = new t(this),
                                i.data("bs.button", a)),
                                a.shouldAvoidTriggerChange = n,
                            "toggle" === e && a[e]()
                        }
                    ))
                }
                ,
                l(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }]),
                t
        }();
        o.default(document).on("click.bs.button.data-api", '[data-toggle^="button"]', (function(t) {
                var e = t.target
                    , n = e;
                if (o.default(e).hasClass("btn") || (e = o.default(e).closest(".btn")[0]),
                !e || e.hasAttribute("disabled") || e.classList.contains("disabled"))
                    t.preventDefault();
                else {
                    var i = e.querySelector('input:not([type="hidden"])');
                    if (i && (i.hasAttribute("disabled") || i.classList.contains("disabled")))
                        return void t.preventDefault();
                    "INPUT" !== n.tagName && "LABEL" === e.tagName || m._jQueryInterface.call(o.default(e), "toggle", "INPUT" === n.tagName)
                }
            }
        )).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', (function(t) {
                var e = o.default(t.target).closest(".btn")[0];
                o.default(e).toggleClass("focus", /^focus(in)?$/.test(t.type))
            }
        )),
            o.default(window).on("load.bs.button.data-api", (function() {
                    for (var t = [].slice.call(document.querySelectorAll('[data-toggle="buttons"] .btn')), e = 0, n = t.length; e < n; e++) {
                        var i = t[e]
                            , o = i.querySelector('input:not([type="hidden"])');
                        o.checked || o.hasAttribute("checked") ? i.classList.add("active") : i.classList.remove("active")
                    }
                    for (var a = 0, s = (t = [].slice.call(document.querySelectorAll('[data-toggle="button"]'))).length; a < s; a++) {
                        var l = t[a];
                        "true" === l.getAttribute("aria-pressed") ? l.classList.add("active") : l.classList.remove("active")
                    }
                }
            )),
            o.default.fn.button = m._jQueryInterface,
            o.default.fn.button.Constructor = m,
            o.default.fn.button.noConflict = function() {
                return o.default.fn.button = g,
                    m._jQueryInterface
            }
        ;
        var p = "carousel"
            , _ = ".bs.carousel"
            , v = o.default.fn[p]
            , b = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0
        }
            , y = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean"
        }
            , E = {
            TOUCH: "touch",
            PEN: "pen"
        }
            , w = function() {
            function t(t, e) {
                this._items = null,
                    this._interval = null,
                    this._activeElement = null,
                    this._isPaused = !1,
                    this._isSliding = !1,
                    this.touchTimeout = null,
                    this.touchStartX = 0,
                    this.touchDeltaX = 0,
                    this._config = this._getConfig(e),
                    this._element = t,
                    this._indicatorsElement = this._element.querySelector(".carousel-indicators"),
                    this._touchSupported = "ontouchstart"in document.documentElement || navigator.maxTouchPoints > 0,
                    this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent),
                    this._addEventListeners()
            }
            var e = t.prototype;
            return e.next = function() {
                this._isSliding || this._slide("next")
            }
                ,
                e.nextWhenVisible = function() {
                    var t = o.default(this._element);
                    !document.hidden && t.is(":visible") && "hidden" !== t.css("visibility") && this.next()
                }
                ,
                e.prev = function() {
                    this._isSliding || this._slide("prev")
                }
                ,
                e.pause = function(t) {
                    t || (this._isPaused = !0),
                    this._element.querySelector(".carousel-item-next, .carousel-item-prev") && (d.triggerTransitionEnd(this._element),
                        this.cycle(!0)),
                        clearInterval(this._interval),
                        this._interval = null
                }
                ,
                e.cycle = function(t) {
                    t || (this._isPaused = !1),
                    this._interval && (clearInterval(this._interval),
                        this._interval = null),
                    this._config.interval && !this._isPaused && (this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval))
                }
                ,
                e.to = function(t) {
                    var e = this;
                    this._activeElement = this._element.querySelector(".active.carousel-item");
                    var n = this._getItemIndex(this._activeElement);
                    if (!(t > this._items.length - 1 || t < 0))
                        if (this._isSliding)
                            o.default(this._element).one("slid.bs.carousel", (function() {
                                    return e.to(t)
                                }
                            ));
                        else {
                            if (n === t)
                                return this.pause(),
                                    void this.cycle();
                            var i = t > n ? "next" : "prev";
                            this._slide(i, this._items[t])
                        }
                }
                ,
                e.dispose = function() {
                    o.default(this._element).off(_),
                        o.default.removeData(this._element, "bs.carousel"),
                        this._items = null,
                        this._config = null,
                        this._element = null,
                        this._interval = null,
                        this._isPaused = null,
                        this._isSliding = null,
                        this._activeElement = null,
                        this._indicatorsElement = null
                }
                ,
                e._getConfig = function(t) {
                    return t = r({}, b, t),
                        d.typeCheckConfig(p, t, y),
                        t
                }
                ,
                e._handleSwipe = function() {
                    var t = Math.abs(this.touchDeltaX);
                    if (!(t <= 40)) {
                        var e = t / this.touchDeltaX;
                        this.touchDeltaX = 0,
                        e > 0 && this.prev(),
                        e < 0 && this.next()
                    }
                }
                ,
                e._addEventListeners = function() {
                    var t = this;
                    this._config.keyboard && o.default(this._element).on("keydown.bs.carousel", (function(e) {
                            return t._keydown(e)
                        }
                    )),
                    "hover" === this._config.pause && o.default(this._element).on("mouseenter.bs.carousel", (function(e) {
                            return t.pause(e)
                        }
                    )).on("mouseleave.bs.carousel", (function(e) {
                            return t.cycle(e)
                        }
                    )),
                    this._config.touch && this._addTouchEventListeners()
                }
                ,
                e._addTouchEventListeners = function() {
                    var t = this;
                    if (this._touchSupported) {
                        var e = function(e) {
                            t._pointerEvent && E[e.originalEvent.pointerType.toUpperCase()] ? t.touchStartX = e.originalEvent.clientX : t._pointerEvent || (t.touchStartX = e.originalEvent.touches[0].clientX)
                        }
                            , n = function(e) {
                            t._pointerEvent && E[e.originalEvent.pointerType.toUpperCase()] && (t.touchDeltaX = e.originalEvent.clientX - t.touchStartX),
                                t._handleSwipe(),
                            "hover" === t._config.pause && (t.pause(),
                            t.touchTimeout && clearTimeout(t.touchTimeout),
                                t.touchTimeout = setTimeout((function(e) {
                                        return t.cycle(e)
                                    }
                                ), 500 + t._config.interval))
                        };
                        o.default(this._element.querySelectorAll(".carousel-item img")).on("dragstart.bs.carousel", (function(t) {
                                return t.preventDefault()
                            }
                        )),
                            this._pointerEvent ? (o.default(this._element).on("pointerdown.bs.carousel", (function(t) {
                                    return e(t)
                                }
                            )),
                                o.default(this._element).on("pointerup.bs.carousel", (function(t) {
                                        return n(t)
                                    }
                                )),
                                this._element.classList.add("pointer-event")) : (o.default(this._element).on("touchstart.bs.carousel", (function(t) {
                                    return e(t)
                                }
                            )),
                                o.default(this._element).on("touchmove.bs.carousel", (function(e) {
                                        return function(e) {
                                            e.originalEvent.touches && e.originalEvent.touches.length > 1 ? t.touchDeltaX = 0 : t.touchDeltaX = e.originalEvent.touches[0].clientX - t.touchStartX
                                        }(e)
                                    }
                                )),
                                o.default(this._element).on("touchend.bs.carousel", (function(t) {
                                        return n(t)
                                    }
                                )))
                    }
                }
                ,
                e._keydown = function(t) {
                    if (!/input|textarea/i.test(t.target.tagName))
                        switch (t.which) {
                            case 37:
                                t.preventDefault(),
                                    this.prev();
                                break;
                            case 39:
                                t.preventDefault(),
                                    this.next()
                        }
                }
                ,
                e._getItemIndex = function(t) {
                    return this._items = t && t.parentNode ? [].slice.call(t.parentNode.querySelectorAll(".carousel-item")) : [],
                        this._items.indexOf(t)
                }
                ,
                e._getItemByDirection = function(t, e) {
                    var n = "next" === t
                        , i = "prev" === t
                        , o = this._getItemIndex(e)
                        , a = this._items.length - 1;
                    if ((i && 0 === o || n && o === a) && !this._config.wrap)
                        return e;
                    var s = (o + ("prev" === t ? -1 : 1)) % this._items.length;
                    return -1 === s ? this._items[this._items.length - 1] : this._items[s]
                }
                ,
                e._triggerSlideEvent = function(t, e) {
                    var n = this._getItemIndex(t)
                        , i = this._getItemIndex(this._element.querySelector(".active.carousel-item"))
                        , a = o.default.Event("slide.bs.carousel", {
                        relatedTarget: t,
                        direction: e,
                        from: i,
                        to: n
                    });
                    return o.default(this._element).trigger(a),
                        a
                }
                ,
                e._setActiveIndicatorElement = function(t) {
                    if (this._indicatorsElement) {
                        var e = [].slice.call(this._indicatorsElement.querySelectorAll(".active"));
                        o.default(e).removeClass("active");
                        var n = this._indicatorsElement.children[this._getItemIndex(t)];
                        n && o.default(n).addClass("active")
                    }
                }
                ,
                e._slide = function(t, e) {
                    var n, i, a, s = this, l = this._element.querySelector(".active.carousel-item"), r = this._getItemIndex(l), u = e || l && this._getItemByDirection(t, l), f = this._getItemIndex(u), c = Boolean(this._interval);
                    if ("next" === t ? (n = "carousel-item-left",
                        i = "carousel-item-next",
                        a = "left") : (n = "carousel-item-right",
                        i = "carousel-item-prev",
                        a = "right"),
                    u && o.default(u).hasClass("active"))
                        this._isSliding = !1;
                    else if (!this._triggerSlideEvent(u, a).isDefaultPrevented() && l && u) {
                        this._isSliding = !0,
                        c && this.pause(),
                            this._setActiveIndicatorElement(u);
                        var h = o.default.Event("slid.bs.carousel", {
                            relatedTarget: u,
                            direction: a,
                            from: r,
                            to: f
                        });
                        if (o.default(this._element).hasClass("slide")) {
                            o.default(u).addClass(i),
                                d.reflow(u),
                                o.default(l).addClass(n),
                                o.default(u).addClass(n);
                            var g = parseInt(u.getAttribute("data-interval"), 10);
                            g ? (this._config.defaultInterval = this._config.defaultInterval || this._config.interval,
                                this._config.interval = g) : this._config.interval = this._config.defaultInterval || this._config.interval;
                            var m = d.getTransitionDurationFromElement(l);
                            o.default(l).one(d.TRANSITION_END, (function() {
                                    o.default(u).removeClass(n + " " + i).addClass("active"),
                                        o.default(l).removeClass("active " + i + " " + n),
                                        s._isSliding = !1,
                                        setTimeout((function() {
                                                return o.default(s._element).trigger(h)
                                            }
                                        ), 0)
                                }
                            )).emulateTransitionEnd(m)
                        } else
                            o.default(l).removeClass("active"),
                                o.default(u).addClass("active"),
                                this._isSliding = !1,
                                o.default(this._element).trigger(h);
                        c && this.cycle()
                    }
                }
                ,
                t._jQueryInterface = function(e) {
                    return this.each((function() {
                            var n = o.default(this).data("bs.carousel")
                                , i = r({}, b, o.default(this).data());
                            "object" == typeof e && (i = r({}, i, e));
                            var a = "string" == typeof e ? e : i.slide;
                            if (n || (n = new t(this,i),
                                o.default(this).data("bs.carousel", n)),
                            "number" == typeof e)
                                n.to(e);
                            else if ("string" == typeof a) {
                                if ("undefined" == typeof n[a])
                                    throw new TypeError('No method named "' + a + '"');
                                n[a]()
                            } else
                                i.interval && i.ride && (n.pause(),
                                    n.cycle())
                        }
                    ))
                }
                ,
                t._dataApiClickHandler = function(e) {
                    var n = d.getSelectorFromElement(this);
                    if (n) {
                        var i = o.default(n)[0];
                        if (i && o.default(i).hasClass("carousel")) {
                            var a = r({}, o.default(i).data(), o.default(this).data())
                                , s = this.getAttribute("data-slide-to");
                            s && (a.interval = !1),
                                t._jQueryInterface.call(o.default(i), a),
                            s && o.default(i).data("bs.carousel").to(s),
                                e.preventDefault()
                        }
                    }
                }
                ,
                l(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return b
                    }
                }]),
                t
        }();
        o.default(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", w._dataApiClickHandler),
            o.default(window).on("load.bs.carousel.data-api", (function() {
                    for (var t = [].slice.call(document.querySelectorAll('[data-ride="carousel"]')), e = 0, n = t.length; e < n; e++) {
                        var i = o.default(t[e]);
                        w._jQueryInterface.call(i, i.data())
                    }
                }
            )),
            o.default.fn[p] = w._jQueryInterface,
            o.default.fn[p].Constructor = w,
            o.default.fn[p].noConflict = function() {
                return o.default.fn[p] = v,
                    w._jQueryInterface
            }
        ;
        var T = "collapse"
            , C = o.default.fn[T]
            , S = {
            toggle: !0,
            parent: ""
        }
            , N = {
            toggle: "boolean",
            parent: "(string|element)"
        }
            , D = function() {
            function t(t, e) {
                this._isTransitioning = !1,
                    this._element = t,
                    this._config = this._getConfig(e),
                    this._triggerArray = [].slice.call(document.querySelectorAll('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'));
                for (var n = [].slice.call(document.querySelectorAll('[data-toggle="collapse"]')), i = 0, o = n.length; i < o; i++) {
                    var a = n[i]
                        , s = d.getSelectorFromElement(a)
                        , l = [].slice.call(document.querySelectorAll(s)).filter((function(e) {
                            return e === t
                        }
                    ));
                    null !== s && l.length > 0 && (this._selector = s,
                        this._triggerArray.push(a))
                }
                this._parent = this._config.parent ? this._getParent() : null,
                this._config.parent || this._addAriaAndCollapsedClass(this._element, this._triggerArray),
                this._config.toggle && this.toggle()
            }
            var e = t.prototype;
            return e.toggle = function() {
                o.default(this._element).hasClass("show") ? this.hide() : this.show()
            }
                ,
                e.show = function() {
                    var e, n, i = this;
                    if (!this._isTransitioning && !o.default(this._element).hasClass("show") && (this._parent && 0 === (e = [].slice.call(this._parent.querySelectorAll(".show, .collapsing")).filter((function(t) {
                            return "string" == typeof i._config.parent ? t.getAttribute("data-parent") === i._config.parent : t.classList.contains("collapse")
                        }
                    ))).length && (e = null),
                        !(e && (n = o.default(e).not(this._selector).data("bs.collapse")) && n._isTransitioning))) {
                        var a = o.default.Event("show.bs.collapse");
                        if (o.default(this._element).trigger(a),
                            !a.isDefaultPrevented()) {
                            e && (t._jQueryInterface.call(o.default(e).not(this._selector), "hide"),
                            n || o.default(e).data("bs.collapse", null));
                            var s = this._getDimension();
                            o.default(this._element).removeClass("collapse").addClass("collapsing"),
                                this._element.style[s] = 0,
                            this._triggerArray.length && o.default(this._triggerArray).removeClass("collapsed").attr("aria-expanded", !0),
                                this.setTransitioning(!0);
                            var l = "scroll" + (s[0].toUpperCase() + s.slice(1))
                                , r = d.getTransitionDurationFromElement(this._element);
                            o.default(this._element).one(d.TRANSITION_END, (function() {
                                    o.default(i._element).removeClass("collapsing").addClass("collapse show"),
                                        i._element.style[s] = "",
                                        i.setTransitioning(!1),
                                        o.default(i._element).trigger("shown.bs.collapse")
                                }
                            )).emulateTransitionEnd(r),
                                this._element.style[s] = this._element[l] + "px"
                        }
                    }
                }
                ,
                e.hide = function() {
                    var t = this;
                    if (!this._isTransitioning && o.default(this._element).hasClass("show")) {
                        var e = o.default.Event("hide.bs.collapse");
                        if (o.default(this._element).trigger(e),
                            !e.isDefaultPrevented()) {
                            var n = this._getDimension();
                            this._element.style[n] = this._element.getBoundingClientRect()[n] + "px",
                                d.reflow(this._element),
                                o.default(this._element).addClass("collapsing").removeClass("collapse show");
                            var i = this._triggerArray.length;
                            if (i > 0)
                                for (var a = 0; a < i; a++) {
                                    var s = this._triggerArray[a]
                                        , l = d.getSelectorFromElement(s);
                                    if (null !== l)
                                        o.default([].slice.call(document.querySelectorAll(l))).hasClass("show") || o.default(s).addClass("collapsed").attr("aria-expanded", !1)
                                }
                            this.setTransitioning(!0);
                            this._element.style[n] = "";
                            var r = d.getTransitionDurationFromElement(this._element);
                            o.default(this._element).one(d.TRANSITION_END, (function() {
                                    t.setTransitioning(!1),
                                        o.default(t._element).removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")
                                }
                            )).emulateTransitionEnd(r)
                        }
                    }
                }
                ,
                e.setTransitioning = function(t) {
                    this._isTransitioning = t
                }
                ,
                e.dispose = function() {
                    o.default.removeData(this._element, "bs.collapse"),
                        this._config = null,
                        this._parent = null,
                        this._element = null,
                        this._triggerArray = null,
                        this._isTransitioning = null
                }
                ,
                e._getConfig = function(t) {
                    return (t = r({}, S, t)).toggle = Boolean(t.toggle),
                        d.typeCheckConfig(T, t, N),
                        t
                }
                ,
                e._getDimension = function() {
                    return o.default(this._element).hasClass("width") ? "width" : "height"
                }
                ,
                e._getParent = function() {
                    var e, n = this;
                    d.isElement(this._config.parent) ? (e = this._config.parent,
                    "undefined" != typeof this._config.parent.jquery && (e = this._config.parent[0])) : e = document.querySelector(this._config.parent);
                    var i = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]'
                        , a = [].slice.call(e.querySelectorAll(i));
                    return o.default(a).each((function(e, i) {
                            n._addAriaAndCollapsedClass(t._getTargetFromElement(i), [i])
                        }
                    )),
                        e
                }
                ,
                e._addAriaAndCollapsedClass = function(t, e) {
                    var n = o.default(t).hasClass("show");
                    e.length && o.default(e).toggleClass("collapsed", !n).attr("aria-expanded", n)
                }
                ,
                t._getTargetFromElement = function(t) {
                    var e = d.getSelectorFromElement(t);
                    return e ? document.querySelector(e) : null
                }
                ,
                t._jQueryInterface = function(e) {
                    return this.each((function() {
                            var n = o.default(this)
                                , i = n.data("bs.collapse")
                                , a = r({}, S, n.data(), "object" == typeof e && e ? e : {});
                            if (!i && a.toggle && "string" == typeof e && /show|hide/.test(e) && (a.toggle = !1),
                            i || (i = new t(this,a),
                                n.data("bs.collapse", i)),
                            "string" == typeof e) {
                                if ("undefined" == typeof i[e])
                                    throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        }
                    ))
                }
                ,
                l(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return S
                    }
                }]),
                t
        }();
        o.default(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', (function(t) {
                "A" === t.currentTarget.tagName && t.preventDefault();
                var e = o.default(this)
                    , n = d.getSelectorFromElement(this)
                    , i = [].slice.call(document.querySelectorAll(n));
                o.default(i).each((function() {
                        var t = o.default(this)
                            , n = t.data("bs.collapse") ? "toggle" : e.data();
                        D._jQueryInterface.call(t, n)
                    }
                ))
            }
        )),
            o.default.fn[T] = D._jQueryInterface,
            o.default.fn[T].Constructor = D,
            o.default.fn[T].noConflict = function() {
                return o.default.fn[T] = C,
                    D._jQueryInterface
            }
        ;
        var k = "dropdown"
            , A = o.default.fn[k]
            , I = new RegExp("38|40|27")
            , j = {
            offset: 0,
            flip: !0,
            boundary: "scrollParent",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null
        }
            , O = {
            offset: "(number|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element)",
            display: "string",
            popperConfig: "(null|object)"
        }
            , x = function() {
            function t(t, e) {
                this._element = t,
                    this._popper = null,
                    this._config = this._getConfig(e),
                    this._menu = this._getMenuElement(),
                    this._inNavbar = this._detectNavbar(),
                    this._addEventListeners()
            }
            var e = t.prototype;
            return e.toggle = function() {
                if (!this._element.disabled && !o.default(this._element).hasClass("disabled")) {
                    var e = o.default(this._menu).hasClass("show");
                    t._clearMenus(),
                    e || this.show(!0)
                }
            }
                ,
                e.show = function(e) {
                    if (void 0 === e && (e = !1),
                        !(this._element.disabled || o.default(this._element).hasClass("disabled") || o.default(this._menu).hasClass("show"))) {
                        var n = {
                            relatedTarget: this._element
                        }
                            , i = o.default.Event("show.bs.dropdown", n)
                            , s = t._getParentFromElement(this._element);
                        if (o.default(s).trigger(i),
                            !i.isDefaultPrevented()) {
                            if (!this._inNavbar && e) {
                                if ("undefined" == typeof a.default)
                                    throw new TypeError("Bootstrap's dropdowns require Popper.js (https://popper.js.org/)");
                                var l = this._element;
                                "parent" === this._config.reference ? l = s : d.isElement(this._config.reference) && (l = this._config.reference,
                                "undefined" != typeof this._config.reference.jquery && (l = this._config.reference[0])),
                                "scrollParent" !== this._config.boundary && o.default(s).addClass("position-static"),
                                    this._popper = new a.default(l,this._menu,this._getPopperConfig())
                            }
                            "ontouchstart"in document.documentElement && 0 === o.default(s).closest(".navbar-nav").length && o.default(document.body).children().on("mouseover", null, o.default.noop),
                                this._element.focus(),
                                this._element.setAttribute("aria-expanded", !0),
                                o.default(this._menu).toggleClass("show"),
                                o.default(s).toggleClass("show").trigger(o.default.Event("shown.bs.dropdown", n))
                        }
                    }
                }
                ,
                e.hide = function() {
                    if (!this._element.disabled && !o.default(this._element).hasClass("disabled") && o.default(this._menu).hasClass("show")) {
                        var e = {
                            relatedTarget: this._element
                        }
                            , n = o.default.Event("hide.bs.dropdown", e)
                            , i = t._getParentFromElement(this._element);
                        o.default(i).trigger(n),
                        n.isDefaultPrevented() || (this._popper && this._popper.destroy(),
                            o.default(this._menu).toggleClass("show"),
                            o.default(i).toggleClass("show").trigger(o.default.Event("hidden.bs.dropdown", e)))
                    }
                }
                ,
                e.dispose = function() {
                    o.default.removeData(this._element, "bs.dropdown"),
                        o.default(this._element).off(".bs.dropdown"),
                        this._element = null,
                        this._menu = null,
                    null !== this._popper && (this._popper.destroy(),
                        this._popper = null)
                }
                ,
                e.update = function() {
                    this._inNavbar = this._detectNavbar(),
                    null !== this._popper && this._popper.scheduleUpdate()
                }
                ,
                e._addEventListeners = function() {
                    var t = this;
                    o.default(this._element).on("click.bs.dropdown", (function(e) {
                            e.preventDefault(),
                                e.stopPropagation(),
                                t.toggle()
                        }
                    ))
                }
                ,
                e._getConfig = function(t) {
                    return t = r({}, this.constructor.Default, o.default(this._element).data(), t),
                        d.typeCheckConfig(k, t, this.constructor.DefaultType),
                        t
                }
                ,
                e._getMenuElement = function() {
                    if (!this._menu) {
                        var e = t._getParentFromElement(this._element);
                        e && (this._menu = e.querySelector(".dropdown-menu"))
                    }
                    return this._menu
                }
                ,
                e._getPlacement = function() {
                    var t = o.default(this._element.parentNode)
                        , e = "bottom-start";
                    return t.hasClass("dropup") ? e = o.default(this._menu).hasClass("dropdown-menu-right") ? "top-end" : "top-start" : t.hasClass("dropright") ? e = "right-start" : t.hasClass("dropleft") ? e = "left-start" : o.default(this._menu).hasClass("dropdown-menu-right") && (e = "bottom-end"),
                        e
                }
                ,
                e._detectNavbar = function() {
                    return o.default(this._element).closest(".navbar").length > 0
                }
                ,
                e._getOffset = function() {
                    var t = this
                        , e = {};
                    return "function" == typeof this._config.offset ? e.fn = function(e) {
                            return e.offsets = r({}, e.offsets, t._config.offset(e.offsets, t._element) || {}),
                                e
                        }
                        : e.offset = this._config.offset,
                        e
                }
                ,
                e._getPopperConfig = function() {
                    var t = {
                        placement: this._getPlacement(),
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {
                                enabled: this._config.flip
                            },
                            preventOverflow: {
                                boundariesElement: this._config.boundary
                            }
                        }
                    };
                    return "static" === this._config.display && (t.modifiers.applyStyle = {
                        enabled: !1
                    }),
                        r({}, t, this._config.popperConfig)
                }
                ,
                t._jQueryInterface = function(e) {
                    return this.each((function() {
                            var n = o.default(this).data("bs.dropdown");
                            if (n || (n = new t(this,"object" == typeof e ? e : null),
                                o.default(this).data("bs.dropdown", n)),
                            "string" == typeof e) {
                                if ("undefined" == typeof n[e])
                                    throw new TypeError('No method named "' + e + '"');
                                n[e]()
                            }
                        }
                    ))
                }
                ,
                t._clearMenus = function(e) {
                    if (!e || 3 !== e.which && ("keyup" !== e.type || 9 === e.which))
                        for (var n = [].slice.call(document.querySelectorAll('[data-toggle="dropdown"]')), i = 0, a = n.length; i < a; i++) {
                            var s = t._getParentFromElement(n[i])
                                , l = o.default(n[i]).data("bs.dropdown")
                                , r = {
                                relatedTarget: n[i]
                            };
                            if (e && "click" === e.type && (r.clickEvent = e),
                                l) {
                                var u = l._menu;
                                if (o.default(s).hasClass("show") && !(e && ("click" === e.type && /input|textarea/i.test(e.target.tagName) || "keyup" === e.type && 9 === e.which) && o.default.contains(s, e.target))) {
                                    var d = o.default.Event("hide.bs.dropdown", r);
                                    o.default(s).trigger(d),
                                    d.isDefaultPrevented() || ("ontouchstart"in document.documentElement && o.default(document.body).children().off("mouseover", null, o.default.noop),
                                        n[i].setAttribute("aria-expanded", "false"),
                                    l._popper && l._popper.destroy(),
                                        o.default(u).removeClass("show"),
                                        o.default(s).removeClass("show").trigger(o.default.Event("hidden.bs.dropdown", r)))
                                }
                            }
                        }
                }
                ,
                t._getParentFromElement = function(t) {
                    var e, n = d.getSelectorFromElement(t);
                    return n && (e = document.querySelector(n)),
                    e || t.parentNode
                }
                ,
                t._dataApiKeydownHandler = function(e) {
                    if (!(/input|textarea/i.test(e.target.tagName) ? 32 === e.which || 27 !== e.which && (40 !== e.which && 38 !== e.which || o.default(e.target).closest(".dropdown-menu").length) : !I.test(e.which)) && !this.disabled && !o.default(this).hasClass("disabled")) {
                        var n = t._getParentFromElement(this)
                            , i = o.default(n).hasClass("show");
                        if (i || 27 !== e.which) {
                            if (e.preventDefault(),
                                e.stopPropagation(),
                            !i || 27 === e.which || 32 === e.which)
                                return 27 === e.which && o.default(n.querySelector('[data-toggle="dropdown"]')).trigger("focus"),
                                    void o.default(this).trigger("click");
                            var a = [].slice.call(n.querySelectorAll(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)")).filter((function(t) {
                                    return o.default(t).is(":visible")
                                }
                            ));
                            if (0 !== a.length) {
                                var s = a.indexOf(e.target);
                                38 === e.which && s > 0 && s--,
                                40 === e.which && s < a.length - 1 && s++,
                                s < 0 && (s = 0),
                                    a[s].focus()
                            }
                        }
                    }
                }
                ,
                l(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return j
                    }
                }, {
                    key: "DefaultType",
                    get: function() {
                        return O
                    }
                }]),
                t
        }();
        o.default(document).on("keydown.bs.dropdown.data-api", '[data-toggle="dropdown"]', x._dataApiKeydownHandler).on("keydown.bs.dropdown.data-api", ".dropdown-menu", x._dataApiKeydownHandler).on("click.bs.dropdown.data-api keyup.bs.dropdown.data-api", x._clearMenus).on("click.bs.dropdown.data-api", '[data-toggle="dropdown"]', (function(t) {
                t.preventDefault(),
                    t.stopPropagation(),
                    x._jQueryInterface.call(o.default(this), "toggle")
            }
        )).on("click.bs.dropdown.data-api", ".dropdown form", (function(t) {
                t.stopPropagation()
            }
        )),
            o.default.fn[k] = x._jQueryInterface,
            o.default.fn[k].Constructor = x,
            o.default.fn[k].noConflict = function() {
                return o.default.fn[k] = A,
                    x._jQueryInterface
            }
        ;
        var P = o.default.fn.modal
            , R = {
            backdrop: !0,
            keyboard: !0,
            focus: !0,
            show: !0
        }
            , L = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
            show: "boolean"
        }
            , q = function() {
            function t(t, e) {
                this._config = this._getConfig(e),
                    this._element = t,
                    this._dialog = t.querySelector(".modal-dialog"),
                    this._backdrop = null,
                    this._isShown = !1,
                    this._isBodyOverflowing = !1,
                    this._ignoreBackdropClick = !1,
                    this._isTransitioning = !1,
                    this._scrollbarWidth = 0
            }
            var e = t.prototype;
            return e.toggle = function(t) {
                return this._isShown ? this.hide() : this.show(t)
            }
                ,
                e.show = function(t) {
                    var e = this;
                    if (!this._isShown && !this._isTransitioning) {
                        o.default(this._element).hasClass("fade") && (this._isTransitioning = !0);
                        var n = o.default.Event("show.bs.modal", {
                            relatedTarget: t
                        });
                        o.default(this._element).trigger(n),
                        this._isShown || n.isDefaultPrevented() || (this._isShown = !0,
                            this._checkScrollbar(),
                            this._setScrollbar(),
                            this._adjustDialog(),
                            this._setEscapeEvent(),
                            this._setResizeEvent(),
                            o.default(this._element).on("click.dismiss.bs.modal", '[data-dismiss="modal"]', (function(t) {
                                    return e.hide(t)
                                }
                            )),
                            o.default(this._dialog).on("mousedown.dismiss.bs.modal", (function() {
                                    o.default(e._element).one("mouseup.dismiss.bs.modal", (function(t) {
                                            o.default(t.target).is(e._element) && (e._ignoreBackdropClick = !0)
                                        }
                                    ))
                                }
                            )),
                            this._showBackdrop((function() {
                                    return e._showElement(t)
                                }
                            )))
                    }
                }
                ,
                e.hide = function(t) {
                    var e = this;
                    if (t && t.preventDefault(),
                    this._isShown && !this._isTransitioning) {
                        var n = o.default.Event("hide.bs.modal");
                        if (o.default(this._element).trigger(n),
                        this._isShown && !n.isDefaultPrevented()) {
                            this._isShown = !1;
                            var i = o.default(this._element).hasClass("fade");
                            if (i && (this._isTransitioning = !0),
                                this._setEscapeEvent(),
                                this._setResizeEvent(),
                                o.default(document).off("focusin.bs.modal"),
                                o.default(this._element).removeClass("show"),
                                o.default(this._element).off("click.dismiss.bs.modal"),
                                o.default(this._dialog).off("mousedown.dismiss.bs.modal"),
                                i) {
                                var a = d.getTransitionDurationFromElement(this._element);
                                o.default(this._element).one(d.TRANSITION_END, (function(t) {
                                        return e._hideModal(t)
                                    }
                                )).emulateTransitionEnd(a)
                            } else
                                this._hideModal()
                        }
                    }
                }
                ,
                e.dispose = function() {
                    [window, this._element, this._dialog].forEach((function(t) {
                            return o.default(t).off(".bs.modal")
                        }
                    )),
                        o.default(document).off("focusin.bs.modal"),
                        o.default.removeData(this._element, "bs.modal"),
                        this._config = null,
                        this._element = null,
                        this._dialog = null,
                        this._backdrop = null,
                        this._isShown = null,
                        this._isBodyOverflowing = null,
                        this._ignoreBackdropClick = null,
                        this._isTransitioning = null,
                        this._scrollbarWidth = null
                }
                ,
                e.handleUpdate = function() {
                    this._adjustDialog()
                }
                ,
                e._getConfig = function(t) {
                    return t = r({}, R, t),
                        d.typeCheckConfig("modal", t, L),
                        t
                }
                ,
                e._triggerBackdropTransition = function() {
                    var t = this;
                    if ("static" === this._config.backdrop) {
                        var e = o.default.Event("hidePrevented.bs.modal");
                        if (o.default(this._element).trigger(e),
                            e.isDefaultPrevented())
                            return;
                        var n = this._element.scrollHeight > document.documentElement.clientHeight;
                        n || (this._element.style.overflowY = "hidden"),
                            this._element.classList.add("modal-static");
                        var i = d.getTransitionDurationFromElement(this._dialog);
                        o.default(this._element).off(d.TRANSITION_END),
                            o.default(this._element).one(d.TRANSITION_END, (function() {
                                    t._element.classList.remove("modal-static"),
                                    n || o.default(t._element).one(d.TRANSITION_END, (function() {
                                            t._element.style.overflowY = ""
                                        }
                                    )).emulateTransitionEnd(t._element, i)
                                }
                            )).emulateTransitionEnd(i),
                            this._element.focus()
                    } else
                        this.hide()
                }
                ,
                e._showElement = function(t) {
                    var e = this
                        , n = o.default(this._element).hasClass("fade")
                        , i = this._dialog ? this._dialog.querySelector(".modal-body") : null;
                    this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE || document.body.appendChild(this._element),
                        this._element.style.display = "block",
                        this._element.removeAttribute("aria-hidden"),
                        this._element.setAttribute("aria-modal", !0),
                        this._element.setAttribute("role", "dialog"),
                        o.default(this._dialog).hasClass("modal-dialog-scrollable") && i ? i.scrollTop = 0 : this._element.scrollTop = 0,
                    n && d.reflow(this._element),
                        o.default(this._element).addClass("show"),
                    this._config.focus && this._enforceFocus();
                    var a = o.default.Event("shown.bs.modal", {
                        relatedTarget: t
                    })
                        , s = function() {
                        e._config.focus && e._element.focus(),
                            e._isTransitioning = !1,
                            o.default(e._element).trigger(a)
                    };
                    if (n) {
                        var l = d.getTransitionDurationFromElement(this._dialog);
                        o.default(this._dialog).one(d.TRANSITION_END, s).emulateTransitionEnd(l)
                    } else
                        s()
                }
                ,
                e._enforceFocus = function() {
                    var t = this;
                    o.default(document).off("focusin.bs.modal").on("focusin.bs.modal", (function(e) {
                            document !== e.target && t._element !== e.target && 0 === o.default(t._element).has(e.target).length && t._element.focus()
                        }
                    ))
                }
                ,
                e._setEscapeEvent = function() {
                    var t = this;
                    this._isShown ? o.default(this._element).on("keydown.dismiss.bs.modal", (function(e) {
                            t._config.keyboard && 27 === e.which ? (e.preventDefault(),
                                t.hide()) : t._config.keyboard || 27 !== e.which || t._triggerBackdropTransition()
                        }
                    )) : this._isShown || o.default(this._element).off("keydown.dismiss.bs.modal")
                }
                ,
                e._setResizeEvent = function() {
                    var t = this;
                    this._isShown ? o.default(window).on("resize.bs.modal", (function(e) {
                            return t.handleUpdate(e)
                        }
                    )) : o.default(window).off("resize.bs.modal")
                }
                ,
                e._hideModal = function() {
                    var t = this;
                    this._element.style.display = "none",
                        this._element.setAttribute("aria-hidden", !0),
                        this._element.removeAttribute("aria-modal"),
                        this._element.removeAttribute("role"),
                        this._isTransitioning = !1,
                        this._showBackdrop((function() {
                                o.default(document.body).removeClass("modal-open"),
                                    t._resetAdjustments(),
                                    t._resetScrollbar(),
                                    o.default(t._element).trigger("hidden.bs.modal")
                            }
                        ))
                }
                ,
                e._removeBackdrop = function() {
                    this._backdrop && (o.default(this._backdrop).remove(),
                        this._backdrop = null)
                }
                ,
                e._showBackdrop = function(t) {
                    var e = this
                        , n = o.default(this._element).hasClass("fade") ? "fade" : "";
                    if (this._isShown && this._config.backdrop) {
                        if (this._backdrop = document.createElement("div"),
                            this._backdrop.className = "modal-backdrop",
                        n && this._backdrop.classList.add(n),
                            o.default(this._backdrop).appendTo(document.body),
                            o.default(this._element).on("click.dismiss.bs.modal", (function(t) {
                                    e._ignoreBackdropClick ? e._ignoreBackdropClick = !1 : t.target === t.currentTarget && e._triggerBackdropTransition()
                                }
                            )),
                        n && d.reflow(this._backdrop),
                            o.default(this._backdrop).addClass("show"),
                            !t)
                            return;
                        if (!n)
                            return void t();
                        var i = d.getTransitionDurationFromElement(this._backdrop);
                        o.default(this._backdrop).one(d.TRANSITION_END, t).emulateTransitionEnd(i)
                    } else if (!this._isShown && this._backdrop) {
                        o.default(this._backdrop).removeClass("show");
                        var a = function() {
                            e._removeBackdrop(),
                            t && t()
                        };
                        if (o.default(this._element).hasClass("fade")) {
                            var s = d.getTransitionDurationFromElement(this._backdrop);
                            o.default(this._backdrop).one(d.TRANSITION_END, a).emulateTransitionEnd(s)
                        } else
                            a()
                    } else
                        t && t()
                }
                ,
                e._adjustDialog = function() {
                    var t = this._element.scrollHeight > document.documentElement.clientHeight;
                    !this._isBodyOverflowing && t && (this._element.style.paddingLeft = this._scrollbarWidth + "px"),
                    this._isBodyOverflowing && !t && (this._element.style.paddingRight = this._scrollbarWidth + "px")
                }
                ,
                e._resetAdjustments = function() {
                    this._element.style.paddingLeft = "",
                        this._element.style.paddingRight = ""
                }
                ,
                e._checkScrollbar = function() {
                    var t = document.body.getBoundingClientRect();
                    this._isBodyOverflowing = Math.round(t.left + t.right) < window.innerWidth,
                        this._scrollbarWidth = this._getScrollbarWidth()
                }
                ,
                e._setScrollbar = function() {
                    var t = this;
                    if (this._isBodyOverflowing) {
                        var e = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"))
                            , n = [].slice.call(document.querySelectorAll(".sticky-top"));
                        o.default(e).each((function(e, n) {
                                var i = n.style.paddingRight
                                    , a = o.default(n).css("padding-right");
                                o.default(n).data("padding-right", i).css("padding-right", parseFloat(a) + t._scrollbarWidth + "px")
                            }
                        )),
                            o.default(n).each((function(e, n) {
                                    var i = n.style.marginRight
                                        , a = o.default(n).css("margin-right");
                                    o.default(n).data("margin-right", i).css("margin-right", parseFloat(a) - t._scrollbarWidth + "px")
                                }
                            ));
                        var i = document.body.style.paddingRight
                            , a = o.default(document.body).css("padding-right");
                        o.default(document.body).data("padding-right", i).css("padding-right", parseFloat(a) + this._scrollbarWidth + "px")
                    }
                    o.default(document.body).addClass("modal-open")
                }
                ,
                e._resetScrollbar = function() {
                    var t = [].slice.call(document.querySelectorAll(".fixed-top, .fixed-bottom, .is-fixed, .sticky-top"));
                    o.default(t).each((function(t, e) {
                            var n = o.default(e).data("padding-right");
                            o.default(e).removeData("padding-right"),
                                e.style.paddingRight = n || ""
                        }
                    ));
                    var e = [].slice.call(document.querySelectorAll(".sticky-top"));
                    o.default(e).each((function(t, e) {
                            var n = o.default(e).data("margin-right");
                            "undefined" != typeof n && o.default(e).css("margin-right", n).removeData("margin-right")
                        }
                    ));
                    var n = o.default(document.body).data("padding-right");
                    o.default(document.body).removeData("padding-right"),
                        document.body.style.paddingRight = n || ""
                }
                ,
                e._getScrollbarWidth = function() {
                    var t = document.createElement("div");
                    t.className = "modal-scrollbar-measure",
                        document.body.appendChild(t);
                    var e = t.getBoundingClientRect().width - t.clientWidth;
                    return document.body.removeChild(t),
                        e
                }
                ,
                t._jQueryInterface = function(e, n) {
                    return this.each((function() {
                            var i = o.default(this).data("bs.modal")
                                , a = r({}, R, o.default(this).data(), "object" == typeof e && e ? e : {});
                            if (i || (i = new t(this,a),
                                o.default(this).data("bs.modal", i)),
                            "string" == typeof e) {
                                if ("undefined" == typeof i[e])
                                    throw new TypeError('No method named "' + e + '"');
                                i[e](n)
                            } else
                                a.show && i.show(n)
                        }
                    ))
                }
                ,
                l(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return R
                    }
                }]),
                t
        }();
        o.default(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', (function(t) {
                var e, n = this, i = d.getSelectorFromElement(this);
                i && (e = document.querySelector(i));
                var a = o.default(e).data("bs.modal") ? "toggle" : r({}, o.default(e).data(), o.default(this).data());
                "A" !== this.tagName && "AREA" !== this.tagName || t.preventDefault();
                var s = o.default(e).one("show.bs.modal", (function(t) {
                        t.isDefaultPrevented() || s.one("hidden.bs.modal", (function() {
                                o.default(n).is(":visible") && n.focus()
                            }
                        ))
                    }
                ));
                q._jQueryInterface.call(o.default(e), a, this)
            }
        )),
            o.default.fn.modal = q._jQueryInterface,
            o.default.fn.modal.Constructor = q,
            o.default.fn.modal.noConflict = function() {
                return o.default.fn.modal = P,
                    q._jQueryInterface
            }
        ;
        var F = ["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]
            , Q = {
            "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
            a: ["target", "href", "title", "rel"],
            area: [],
            b: [],
            br: [],
            col: [],
            code: [],
            div: [],
            em: [],
            hr: [],
            h1: [],
            h2: [],
            h3: [],
            h4: [],
            h5: [],
            h6: [],
            i: [],
            img: ["src", "srcset", "alt", "title", "width", "height"],
            li: [],
            ol: [],
            p: [],
            pre: [],
            s: [],
            small: [],
            span: [],
            sub: [],
            sup: [],
            strong: [],
            u: [],
            ul: []
        }
            , B = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi
            , H = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
        function U(t, e, n) {
            if (0 === t.length)
                return t;
            if (n && "function" == typeof n)
                return n(t);
            for (var i = (new window.DOMParser).parseFromString(t, "text/html"), o = Object.keys(e), a = [].slice.call(i.body.querySelectorAll("*")), s = function(t, n) {
                var i = a[t]
                    , s = i.nodeName.toLowerCase();
                if (-1 === o.indexOf(i.nodeName.toLowerCase()))
                    return i.parentNode.removeChild(i),
                        "continue";
                var l = [].slice.call(i.attributes)
                    , r = [].concat(e["*"] || [], e[s] || []);
                l.forEach((function(t) {
                        (function(t, e) {
                                var n = t.nodeName.toLowerCase();
                                if (-1 !== e.indexOf(n))
                                    return -1 === F.indexOf(n) || Boolean(t.nodeValue.match(B) || t.nodeValue.match(H));
                                for (var i = e.filter((function(t) {
                                        return t instanceof RegExp
                                    }
                                )), o = 0, a = i.length; o < a; o++)
                                    if (n.match(i[o]))
                                        return !0;
                                return !1
                            }
                        )(t, r) || i.removeAttribute(t.nodeName)
                    }
                ))
            }, l = 0, r = a.length; l < r; l++)
                s(l);
            return i.body.innerHTML
        }
        var M = "tooltip"
            , W = o.default.fn[M]
            , V = new RegExp("(^|\\s)bs-tooltip\\S+","g")
            , z = ["sanitize", "whiteList", "sanitizeFn"]
            , K = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(number|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacement: "(string|array)",
            boundary: "(string|element)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            whiteList: "object",
            popperConfig: "(null|object)"
        }
            , X = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: "right",
            BOTTOM: "bottom",
            LEFT: "left"
        }
            , Y = {
            animation: !0,
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: 0,
            container: !1,
            fallbackPlacement: "flip",
            boundary: "scrollParent",
            sanitize: !0,
            sanitizeFn: null,
            whiteList: Q,
            popperConfig: null
        }
            , $ = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip"
        }
            , J = function() {
            function t(t, e) {
                if ("undefined" == typeof a.default)
                    throw new TypeError("Bootstrap's tooltips require Popper.js (https://popper.js.org/)");
                this._isEnabled = !0,
                    this._timeout = 0,
                    this._hoverState = "",
                    this._activeTrigger = {},
                    this._popper = null,
                    this.element = t,
                    this.config = this._getConfig(e),
                    this.tip = null,
                    this._setListeners()
            }
            var e = t.prototype;
            return e.enable = function() {
                this._isEnabled = !0
            }
                ,
                e.disable = function() {
                    this._isEnabled = !1
                }
                ,
                e.toggleEnabled = function() {
                    this._isEnabled = !this._isEnabled
                }
                ,
                e.toggle = function(t) {
                    if (this._isEnabled)
                        if (t) {
                            var e = this.constructor.DATA_KEY
                                , n = o.default(t.currentTarget).data(e);
                            n || (n = new this.constructor(t.currentTarget,this._getDelegateConfig()),
                                o.default(t.currentTarget).data(e, n)),
                                n._activeTrigger.click = !n._activeTrigger.click,
                                n._isWithActiveTrigger() ? n._enter(null, n) : n._leave(null, n)
                        } else {
                            if (o.default(this.getTipElement()).hasClass("show"))
                                return void this._leave(null, this);
                            this._enter(null, this)
                        }
                }
                ,
                e.dispose = function() {
                    clearTimeout(this._timeout),
                        o.default.removeData(this.element, this.constructor.DATA_KEY),
                        o.default(this.element).off(this.constructor.EVENT_KEY),
                        o.default(this.element).closest(".modal").off("hide.bs.modal", this._hideModalHandler),
                    this.tip && o.default(this.tip).remove(),
                        this._isEnabled = null,
                        this._timeout = null,
                        this._hoverState = null,
                        this._activeTrigger = null,
                    this._popper && this._popper.destroy(),
                        this._popper = null,
                        this.element = null,
                        this.config = null,
                        this.tip = null
                }
                ,
                e.show = function() {
                    var t = this;
                    if ("none" === o.default(this.element).css("display"))
                        throw new Error("Please use show on visible elements");
                    var e = o.default.Event(this.constructor.Event.SHOW);
                    if (this.isWithContent() && this._isEnabled) {
                        o.default(this.element).trigger(e);
                        var n = d.findShadowRoot(this.element)
                            , i = o.default.contains(null !== n ? n : this.element.ownerDocument.documentElement, this.element);
                        if (e.isDefaultPrevented() || !i)
                            return;
                        var s = this.getTipElement()
                            , l = d.getUID(this.constructor.NAME);
                        s.setAttribute("id", l),
                            this.element.setAttribute("aria-describedby", l),
                            this.setContent(),
                        this.config.animation && o.default(s).addClass("fade");
                        var r = "function" == typeof this.config.placement ? this.config.placement.call(this, s, this.element) : this.config.placement
                            , u = this._getAttachment(r);
                        this.addAttachmentClass(u);
                        var f = this._getContainer();
                        o.default(s).data(this.constructor.DATA_KEY, this),
                        o.default.contains(this.element.ownerDocument.documentElement, this.tip) || o.default(s).appendTo(f),
                            o.default(this.element).trigger(this.constructor.Event.INSERTED),
                            this._popper = new a.default(this.element,s,this._getPopperConfig(u)),
                            o.default(s).addClass("show"),
                        "ontouchstart"in document.documentElement && o.default(document.body).children().on("mouseover", null, o.default.noop);
                        var c = function() {
                            t.config.animation && t._fixTransition();
                            var e = t._hoverState;
                            t._hoverState = null,
                                o.default(t.element).trigger(t.constructor.Event.SHOWN),
                            "out" === e && t._leave(null, t)
                        };
                        if (o.default(this.tip).hasClass("fade")) {
                            var h = d.getTransitionDurationFromElement(this.tip);
                            o.default(this.tip).one(d.TRANSITION_END, c).emulateTransitionEnd(h)
                        } else
                            c()
                    }
                }
                ,
                e.hide = function(t) {
                    var e = this
                        , n = this.getTipElement()
                        , i = o.default.Event(this.constructor.Event.HIDE)
                        , a = function() {
                        "show" !== e._hoverState && n.parentNode && n.parentNode.removeChild(n),
                            e._cleanTipClass(),
                            e.element.removeAttribute("aria-describedby"),
                            o.default(e.element).trigger(e.constructor.Event.HIDDEN),
                        null !== e._popper && e._popper.destroy(),
                        t && t()
                    };
                    if (o.default(this.element).trigger(i),
                        !i.isDefaultPrevented()) {
                        if (o.default(n).removeClass("show"),
                        "ontouchstart"in document.documentElement && o.default(document.body).children().off("mouseover", null, o.default.noop),
                            this._activeTrigger.click = !1,
                            this._activeTrigger.focus = !1,
                            this._activeTrigger.hover = !1,
                            o.default(this.tip).hasClass("fade")) {
                            var s = d.getTransitionDurationFromElement(n);
                            o.default(n).one(d.TRANSITION_END, a).emulateTransitionEnd(s)
                        } else
                            a();
                        this._hoverState = ""
                    }
                }
                ,
                e.update = function() {
                    null !== this._popper && this._popper.scheduleUpdate()
                }
                ,
                e.isWithContent = function() {
                    return Boolean(this.getTitle())
                }
                ,
                e.addAttachmentClass = function(t) {
                    o.default(this.getTipElement()).addClass("bs-tooltip-" + t)
                }
                ,
                e.getTipElement = function() {
                    return this.tip = this.tip || o.default(this.config.template)[0],
                        this.tip
                }
                ,
                e.setContent = function() {
                    var t = this.getTipElement();
                    this.setElementContent(o.default(t.querySelectorAll(".tooltip-inner")), this.getTitle()),
                        o.default(t).removeClass("fade show")
                }
                ,
                e.setElementContent = function(t, e) {
                    "object" != typeof e || !e.nodeType && !e.jquery ? this.config.html ? (this.config.sanitize && (e = U(e, this.config.whiteList, this.config.sanitizeFn)),
                        t.html(e)) : t.text(e) : this.config.html ? o.default(e).parent().is(t) || t.empty().append(e) : t.text(o.default(e).text())
                }
                ,
                e.getTitle = function() {
                    var t = this.element.getAttribute("data-original-title");
                    return t || (t = "function" == typeof this.config.title ? this.config.title.call(this.element) : this.config.title),
                        t
                }
                ,
                e._getPopperConfig = function(t) {
                    var e = this;
                    return r({}, {
                        placement: t,
                        modifiers: {
                            offset: this._getOffset(),
                            flip: {
                                behavior: this.config.fallbackPlacement
                            },
                            arrow: {
                                element: ".arrow"
                            },
                            preventOverflow: {
                                boundariesElement: this.config.boundary
                            }
                        },
                        onCreate: function(t) {
                            t.originalPlacement !== t.placement && e._handlePopperPlacementChange(t)
                        },
                        onUpdate: function(t) {
                            return e._handlePopperPlacementChange(t)
                        }
                    }, this.config.popperConfig)
                }
                ,
                e._getOffset = function() {
                    var t = this
                        , e = {};
                    return "function" == typeof this.config.offset ? e.fn = function(e) {
                            return e.offsets = r({}, e.offsets, t.config.offset(e.offsets, t.element) || {}),
                                e
                        }
                        : e.offset = this.config.offset,
                        e
                }
                ,
                e._getContainer = function() {
                    return !1 === this.config.container ? document.body : d.isElement(this.config.container) ? o.default(this.config.container) : o.default(document).find(this.config.container)
                }
                ,
                e._getAttachment = function(t) {
                    return X[t.toUpperCase()]
                }
                ,
                e._setListeners = function() {
                    var t = this;
                    this.config.trigger.split(" ").forEach((function(e) {
                            if ("click" === e)
                                o.default(t.element).on(t.constructor.Event.CLICK, t.config.selector, (function(e) {
                                        return t.toggle(e)
                                    }
                                ));
                            else if ("manual" !== e) {
                                var n = "hover" === e ? t.constructor.Event.MOUSEENTER : t.constructor.Event.FOCUSIN
                                    , i = "hover" === e ? t.constructor.Event.MOUSELEAVE : t.constructor.Event.FOCUSOUT;
                                o.default(t.element).on(n, t.config.selector, (function(e) {
                                        return t._enter(e)
                                    }
                                )).on(i, t.config.selector, (function(e) {
                                        return t._leave(e)
                                    }
                                ))
                            }
                        }
                    )),
                        this._hideModalHandler = function() {
                            t.element && t.hide()
                        }
                        ,
                        o.default(this.element).closest(".modal").on("hide.bs.modal", this._hideModalHandler),
                        this.config.selector ? this.config = r({}, this.config, {
                            trigger: "manual",
                            selector: ""
                        }) : this._fixTitle()
                }
                ,
                e._fixTitle = function() {
                    var t = typeof this.element.getAttribute("data-original-title");
                    (this.element.getAttribute("title") || "string" !== t) && (this.element.setAttribute("data-original-title", this.element.getAttribute("title") || ""),
                        this.element.setAttribute("title", ""))
                }
                ,
                e._enter = function(t, e) {
                    var n = this.constructor.DATA_KEY;
                    (e = e || o.default(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget,this._getDelegateConfig()),
                        o.default(t.currentTarget).data(n, e)),
                    t && (e._activeTrigger["focusin" === t.type ? "focus" : "hover"] = !0),
                        o.default(e.getTipElement()).hasClass("show") || "show" === e._hoverState ? e._hoverState = "show" : (clearTimeout(e._timeout),
                            e._hoverState = "show",
                            e.config.delay && e.config.delay.show ? e._timeout = setTimeout((function() {
                                    "show" === e._hoverState && e.show()
                                }
                            ), e.config.delay.show) : e.show())
                }
                ,
                e._leave = function(t, e) {
                    var n = this.constructor.DATA_KEY;
                    (e = e || o.default(t.currentTarget).data(n)) || (e = new this.constructor(t.currentTarget,this._getDelegateConfig()),
                        o.default(t.currentTarget).data(n, e)),
                    t && (e._activeTrigger["focusout" === t.type ? "focus" : "hover"] = !1),
                    e._isWithActiveTrigger() || (clearTimeout(e._timeout),
                        e._hoverState = "out",
                        e.config.delay && e.config.delay.hide ? e._timeout = setTimeout((function() {
                                "out" === e._hoverState && e.hide()
                            }
                        ), e.config.delay.hide) : e.hide())
                }
                ,
                e._isWithActiveTrigger = function() {
                    for (var t in this._activeTrigger)
                        if (this._activeTrigger[t])
                            return !0;
                    return !1
                }
                ,
                e._getConfig = function(t) {
                    var e = o.default(this.element).data();
                    return Object.keys(e).forEach((function(t) {
                            -1 !== z.indexOf(t) && delete e[t]
                        }
                    )),
                    "number" == typeof (t = r({}, this.constructor.Default, e, "object" == typeof t && t ? t : {})).delay && (t.delay = {
                        show: t.delay,
                        hide: t.delay
                    }),
                    "number" == typeof t.title && (t.title = t.title.toString()),
                    "number" == typeof t.content && (t.content = t.content.toString()),
                        d.typeCheckConfig(M, t, this.constructor.DefaultType),
                    t.sanitize && (t.template = U(t.template, t.whiteList, t.sanitizeFn)),
                        t
                }
                ,
                e._getDelegateConfig = function() {
                    var t = {};
                    if (this.config)
                        for (var e in this.config)
                            this.constructor.Default[e] !== this.config[e] && (t[e] = this.config[e]);
                    return t
                }
                ,
                e._cleanTipClass = function() {
                    var t = o.default(this.getTipElement())
                        , e = t.attr("class").match(V);
                    null !== e && e.length && t.removeClass(e.join(""))
                }
                ,
                e._handlePopperPlacementChange = function(t) {
                    this.tip = t.instance.popper,
                        this._cleanTipClass(),
                        this.addAttachmentClass(this._getAttachment(t.placement))
                }
                ,
                e._fixTransition = function() {
                    var t = this.getTipElement()
                        , e = this.config.animation;
                    null === t.getAttribute("x-placement") && (o.default(t).removeClass("fade"),
                        this.config.animation = !1,
                        this.hide(),
                        this.show(),
                        this.config.animation = e)
                }
                ,
                t._jQueryInterface = function(e) {
                    return this.each((function() {
                            var n = o.default(this)
                                , i = n.data("bs.tooltip")
                                , a = "object" == typeof e && e;
                            if ((i || !/dispose|hide/.test(e)) && (i || (i = new t(this,a),
                                n.data("bs.tooltip", i)),
                            "string" == typeof e)) {
                                if ("undefined" == typeof i[e])
                                    throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        }
                    ))
                }
                ,
                l(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return Y
                    }
                }, {
                    key: "NAME",
                    get: function() {
                        return M
                    }
                }, {
                    key: "DATA_KEY",
                    get: function() {
                        return "bs.tooltip"
                    }
                }, {
                    key: "Event",
                    get: function() {
                        return $
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function() {
                        return ".bs.tooltip"
                    }
                }, {
                    key: "DefaultType",
                    get: function() {
                        return K
                    }
                }]),
                t
        }();
        o.default.fn[M] = J._jQueryInterface,
            o.default.fn[M].Constructor = J,
            o.default.fn[M].noConflict = function() {
                return o.default.fn[M] = W,
                    J._jQueryInterface
            }
        ;
        var G = "popover"
            , Z = o.default.fn[G]
            , tt = new RegExp("(^|\\s)bs-popover\\S+","g")
            , et = r({}, J.Default, {
            placement: "right",
            trigger: "click",
            content: "",
            template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>'
        })
            , nt = r({}, J.DefaultType, {
            content: "(string|element|function)"
        })
            , it = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover"
        }
            , ot = function(t) {
            var e, n;
            function i() {
                return t.apply(this, arguments) || this
            }
            n = t,
                (e = i).prototype = Object.create(n.prototype),
                e.prototype.constructor = e,
                e.__proto__ = n;
            var a = i.prototype;
            return a.isWithContent = function() {
                return this.getTitle() || this._getContent()
            }
                ,
                a.addAttachmentClass = function(t) {
                    o.default(this.getTipElement()).addClass("bs-popover-" + t)
                }
                ,
                a.getTipElement = function() {
                    return this.tip = this.tip || o.default(this.config.template)[0],
                        this.tip
                }
                ,
                a.setContent = function() {
                    var t = o.default(this.getTipElement());
                    this.setElementContent(t.find(".popover-header"), this.getTitle());
                    var e = this._getContent();
                    "function" == typeof e && (e = e.call(this.element)),
                        this.setElementContent(t.find(".popover-body"), e),
                        t.removeClass("fade show")
                }
                ,
                a._getContent = function() {
                    return this.element.getAttribute("data-content") || this.config.content
                }
                ,
                a._cleanTipClass = function() {
                    var t = o.default(this.getTipElement())
                        , e = t.attr("class").match(tt);
                    null !== e && e.length > 0 && t.removeClass(e.join(""))
                }
                ,
                i._jQueryInterface = function(t) {
                    return this.each((function() {
                            var e = o.default(this).data("bs.popover")
                                , n = "object" == typeof t ? t : null;
                            if ((e || !/dispose|hide/.test(t)) && (e || (e = new i(this,n),
                                o.default(this).data("bs.popover", e)),
                            "string" == typeof t)) {
                                if ("undefined" == typeof e[t])
                                    throw new TypeError('No method named "' + t + '"');
                                e[t]()
                            }
                        }
                    ))
                }
                ,
                l(i, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return et
                    }
                }, {
                    key: "NAME",
                    get: function() {
                        return G
                    }
                }, {
                    key: "DATA_KEY",
                    get: function() {
                        return "bs.popover"
                    }
                }, {
                    key: "Event",
                    get: function() {
                        return it
                    }
                }, {
                    key: "EVENT_KEY",
                    get: function() {
                        return ".bs.popover"
                    }
                }, {
                    key: "DefaultType",
                    get: function() {
                        return nt
                    }
                }]),
                i
        }(J);
        o.default.fn[G] = ot._jQueryInterface,
            o.default.fn[G].Constructor = ot,
            o.default.fn[G].noConflict = function() {
                return o.default.fn[G] = Z,
                    ot._jQueryInterface
            }
        ;
        var at = "scrollspy"
            , st = o.default.fn[at]
            , lt = {
            offset: 10,
            method: "auto",
            target: ""
        }
            , rt = {
            offset: "number",
            method: "string",
            target: "(string|element)"
        }
            , ut = function() {
            function t(t, e) {
                var n = this;
                this._element = t,
                    this._scrollElement = "BODY" === t.tagName ? window : t,
                    this._config = this._getConfig(e),
                    this._selector = this._config.target + " .nav-link," + this._config.target + " .list-group-item," + this._config.target + " .dropdown-item",
                    this._offsets = [],
                    this._targets = [],
                    this._activeTarget = null,
                    this._scrollHeight = 0,
                    o.default(this._scrollElement).on("scroll.bs.scrollspy", (function(t) {
                            return n._process(t)
                        }
                    )),
                    this.refresh(),
                    this._process()
            }
            var e = t.prototype;
            return e.refresh = function() {
                var t = this
                    , e = this._scrollElement === this._scrollElement.window ? "offset" : "position"
                    , n = "auto" === this._config.method ? e : this._config.method
                    , i = "position" === n ? this._getScrollTop() : 0;
                this._offsets = [],
                    this._targets = [],
                    this._scrollHeight = this._getScrollHeight(),
                    [].slice.call(document.querySelectorAll(this._selector)).map((function(t) {
                            var e, a = d.getSelectorFromElement(t);
                            if (a && (e = document.querySelector(a)),
                                e) {
                                var s = e.getBoundingClientRect();
                                if (s.width || s.height)
                                    return [o.default(e)[n]().top + i, a]
                            }
                            return null
                        }
                    )).filter((function(t) {
                            return t
                        }
                    )).sort((function(t, e) {
                            return t[0] - e[0]
                        }
                    )).forEach((function(e) {
                            t._offsets.push(e[0]),
                                t._targets.push(e[1])
                        }
                    ))
            }
                ,
                e.dispose = function() {
                    o.default.removeData(this._element, "bs.scrollspy"),
                        o.default(this._scrollElement).off(".bs.scrollspy"),
                        this._element = null,
                        this._scrollElement = null,
                        this._config = null,
                        this._selector = null,
                        this._offsets = null,
                        this._targets = null,
                        this._activeTarget = null,
                        this._scrollHeight = null
                }
                ,
                e._getConfig = function(t) {
                    if ("string" != typeof (t = r({}, lt, "object" == typeof t && t ? t : {})).target && d.isElement(t.target)) {
                        var e = o.default(t.target).attr("id");
                        e || (e = d.getUID(at),
                            o.default(t.target).attr("id", e)),
                            t.target = "#" + e
                    }
                    return d.typeCheckConfig(at, t, rt),
                        t
                }
                ,
                e._getScrollTop = function() {
                    return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop
                }
                ,
                e._getScrollHeight = function() {
                    return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight)
                }
                ,
                e._getOffsetHeight = function() {
                    return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height
                }
                ,
                e._process = function() {
                    var t = this._getScrollTop() + this._config.offset
                        , e = this._getScrollHeight()
                        , n = this._config.offset + e - this._getOffsetHeight();
                    if (this._scrollHeight !== e && this.refresh(),
                    t >= n) {
                        var i = this._targets[this._targets.length - 1];
                        this._activeTarget !== i && this._activate(i)
                    } else {
                        if (this._activeTarget && t < this._offsets[0] && this._offsets[0] > 0)
                            return this._activeTarget = null,
                                void this._clear();
                        for (var o = this._offsets.length; o--; ) {
                            this._activeTarget !== this._targets[o] && t >= this._offsets[o] && ("undefined" == typeof this._offsets[o + 1] || t < this._offsets[o + 1]) && this._activate(this._targets[o])
                        }
                    }
                }
                ,
                e._activate = function(t) {
                    this._activeTarget = t,
                        this._clear();
                    var e = this._selector.split(",").map((function(e) {
                            return e + '[data-target="' + t + '"],' + e + '[href="' + t + '"]'
                        }
                    ))
                        , n = o.default([].slice.call(document.querySelectorAll(e.join(","))));
                    n.hasClass("dropdown-item") ? (n.closest(".dropdown").find(".dropdown-toggle").addClass("active"),
                        n.addClass("active")) : (n.addClass("active"),
                        n.parents(".nav, .list-group").prev(".nav-link, .list-group-item").addClass("active"),
                        n.parents(".nav, .list-group").prev(".nav-item").children(".nav-link").addClass("active")),
                        o.default(this._scrollElement).trigger("activate.bs.scrollspy", {
                            relatedTarget: t
                        })
                }
                ,
                e._clear = function() {
                    [].slice.call(document.querySelectorAll(this._selector)).filter((function(t) {
                            return t.classList.contains("active")
                        }
                    )).forEach((function(t) {
                            return t.classList.remove("active")
                        }
                    ))
                }
                ,
                t._jQueryInterface = function(e) {
                    return this.each((function() {
                            var n = o.default(this).data("bs.scrollspy");
                            if (n || (n = new t(this,"object" == typeof e && e),
                                o.default(this).data("bs.scrollspy", n)),
                            "string" == typeof e) {
                                if ("undefined" == typeof n[e])
                                    throw new TypeError('No method named "' + e + '"');
                                n[e]()
                            }
                        }
                    ))
                }
                ,
                l(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return lt
                    }
                }]),
                t
        }();
        o.default(window).on("load.bs.scrollspy.data-api", (function() {
                for (var t = [].slice.call(document.querySelectorAll('[data-spy="scroll"]')), e = t.length; e--; ) {
                    var n = o.default(t[e]);
                    ut._jQueryInterface.call(n, n.data())
                }
            }
        )),
            o.default.fn[at] = ut._jQueryInterface,
            o.default.fn[at].Constructor = ut,
            o.default.fn[at].noConflict = function() {
                return o.default.fn[at] = st,
                    ut._jQueryInterface
            }
        ;
        var dt = o.default.fn.tab
            , ft = function() {
            function t(t) {
                this._element = t
            }
            var e = t.prototype;
            return e.show = function() {
                var t = this;
                if (!(this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && o.default(this._element).hasClass("active") || o.default(this._element).hasClass("disabled"))) {
                    var e, n, i = o.default(this._element).closest(".nav, .list-group")[0], a = d.getSelectorFromElement(this._element);
                    if (i) {
                        var s = "UL" === i.nodeName || "OL" === i.nodeName ? "> li > .active" : ".active";
                        n = (n = o.default.makeArray(o.default(i).find(s)))[n.length - 1]
                    }
                    var l = o.default.Event("hide.bs.tab", {
                        relatedTarget: this._element
                    })
                        , r = o.default.Event("show.bs.tab", {
                        relatedTarget: n
                    });
                    if (n && o.default(n).trigger(l),
                        o.default(this._element).trigger(r),
                    !r.isDefaultPrevented() && !l.isDefaultPrevented()) {
                        a && (e = document.querySelector(a)),
                            this._activate(this._element, i);
                        var u = function() {
                            var e = o.default.Event("hidden.bs.tab", {
                                relatedTarget: t._element
                            })
                                , i = o.default.Event("shown.bs.tab", {
                                relatedTarget: n
                            });
                            o.default(n).trigger(e),
                                o.default(t._element).trigger(i)
                        };
                        e ? this._activate(e, e.parentNode, u) : u()
                    }
                }
            }
                ,
                e.dispose = function() {
                    o.default.removeData(this._element, "bs.tab"),
                        this._element = null
                }
                ,
                e._activate = function(t, e, n) {
                    var i = this
                        , a = (!e || "UL" !== e.nodeName && "OL" !== e.nodeName ? o.default(e).children(".active") : o.default(e).find("> li > .active"))[0]
                        , s = n && a && o.default(a).hasClass("fade")
                        , l = function() {
                        return i._transitionComplete(t, a, n)
                    };
                    if (a && s) {
                        var r = d.getTransitionDurationFromElement(a);
                        o.default(a).removeClass("show").one(d.TRANSITION_END, l).emulateTransitionEnd(r)
                    } else
                        l()
                }
                ,
                e._transitionComplete = function(t, e, n) {
                    if (e) {
                        o.default(e).removeClass("active");
                        var i = o.default(e.parentNode).find("> .dropdown-menu .active")[0];
                        i && o.default(i).removeClass("active"),
                        "tab" === e.getAttribute("role") && e.setAttribute("aria-selected", !1)
                    }
                    if (o.default(t).addClass("active"),
                    "tab" === t.getAttribute("role") && t.setAttribute("aria-selected", !0),
                        d.reflow(t),
                    t.classList.contains("fade") && t.classList.add("show"),
                    t.parentNode && o.default(t.parentNode).hasClass("dropdown-menu")) {
                        var a = o.default(t).closest(".dropdown")[0];
                        if (a) {
                            var s = [].slice.call(a.querySelectorAll(".dropdown-toggle"));
                            o.default(s).addClass("active")
                        }
                        t.setAttribute("aria-expanded", !0)
                    }
                    n && n()
                }
                ,
                t._jQueryInterface = function(e) {
                    return this.each((function() {
                            var n = o.default(this)
                                , i = n.data("bs.tab");
                            if (i || (i = new t(this),
                                n.data("bs.tab", i)),
                            "string" == typeof e) {
                                if ("undefined" == typeof i[e])
                                    throw new TypeError('No method named "' + e + '"');
                                i[e]()
                            }
                        }
                    ))
                }
                ,
                l(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }]),
                t
        }();
        o.default(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]', (function(t) {
                t.preventDefault(),
                    ft._jQueryInterface.call(o.default(this), "show")
            }
        )),
            o.default.fn.tab = ft._jQueryInterface,
            o.default.fn.tab.Constructor = ft,
            o.default.fn.tab.noConflict = function() {
                return o.default.fn.tab = dt,
                    ft._jQueryInterface
            }
        ;
        var ct = o.default.fn.toast
            , ht = {
            animation: "boolean",
            autohide: "boolean",
            delay: "number"
        }
            , gt = {
            animation: !0,
            autohide: !0,
            delay: 500
        }
            , mt = function() {
            function t(t, e) {
                this._element = t,
                    this._config = this._getConfig(e),
                    this._timeout = null,
                    this._setListeners()
            }
            var e = t.prototype;
            return e.show = function() {
                var t = this
                    , e = o.default.Event("show.bs.toast");
                if (o.default(this._element).trigger(e),
                    !e.isDefaultPrevented()) {
                    this._clearTimeout(),
                    this._config.animation && this._element.classList.add("fade");
                    var n = function() {
                        t._element.classList.remove("showing"),
                            t._element.classList.add("show"),
                            o.default(t._element).trigger("shown.bs.toast"),
                        t._config.autohide && (t._timeout = setTimeout((function() {
                                t.hide()
                            }
                        ), t._config.delay))
                    };
                    if (this._element.classList.remove("hide"),
                        d.reflow(this._element),
                        this._element.classList.add("showing"),
                        this._config.animation) {
                        var i = d.getTransitionDurationFromElement(this._element);
                        o.default(this._element).one(d.TRANSITION_END, n).emulateTransitionEnd(i)
                    } else
                        n()
                }
            }
                ,
                e.hide = function() {
                    if (this._element.classList.contains("show")) {
                        var t = o.default.Event("hide.bs.toast");
                        o.default(this._element).trigger(t),
                        t.isDefaultPrevented() || this._close()
                    }
                }
                ,
                e.dispose = function() {
                    this._clearTimeout(),
                    this._element.classList.contains("show") && this._element.classList.remove("show"),
                        o.default(this._element).off("click.dismiss.bs.toast"),
                        o.default.removeData(this._element, "bs.toast"),
                        this._element = null,
                        this._config = null
                }
                ,
                e._getConfig = function(t) {
                    return t = r({}, gt, o.default(this._element).data(), "object" == typeof t && t ? t : {}),
                        d.typeCheckConfig("toast", t, this.constructor.DefaultType),
                        t
                }
                ,
                e._setListeners = function() {
                    var t = this;
                    o.default(this._element).on("click.dismiss.bs.toast", '[data-dismiss="toast"]', (function() {
                            return t.hide()
                        }
                    ))
                }
                ,
                e._close = function() {
                    var t = this
                        , e = function() {
                        t._element.classList.add("hide"),
                            o.default(t._element).trigger("hidden.bs.toast")
                    };
                    if (this._element.classList.remove("show"),
                        this._config.animation) {
                        var n = d.getTransitionDurationFromElement(this._element);
                        o.default(this._element).one(d.TRANSITION_END, e).emulateTransitionEnd(n)
                    } else
                        e()
                }
                ,
                e._clearTimeout = function() {
                    clearTimeout(this._timeout),
                        this._timeout = null
                }
                ,
                t._jQueryInterface = function(e) {
                    return this.each((function() {
                            var n = o.default(this)
                                , i = n.data("bs.toast");
                            if (i || (i = new t(this,"object" == typeof e && e),
                                n.data("bs.toast", i)),
                            "string" == typeof e) {
                                if ("undefined" == typeof i[e])
                                    throw new TypeError('No method named "' + e + '"');
                                i[e](this)
                            }
                        }
                    ))
                }
                ,
                l(t, null, [{
                    key: "VERSION",
                    get: function() {
                        return "4.5.3"
                    }
                }, {
                    key: "DefaultType",
                    get: function() {
                        return ht
                    }
                }, {
                    key: "Default",
                    get: function() {
                        return gt
                    }
                }]),
                t
        }();
        o.default.fn.toast = mt._jQueryInterface,
            o.default.fn.toast.Constructor = mt,
            o.default.fn.toast.noConflict = function() {
                return o.default.fn.toast = ct,
                    mt._jQueryInterface
            }
            ,
            t.Alert = h,
            t.Button = m,
            t.Carousel = w,
            t.Collapse = D,
            t.Dropdown = x,
            t.Modal = q,
            t.Popover = ot,
            t.Scrollspy = ut,
            t.Tab = ft,
            t.Toast = mt,
            t.Tooltip = J,
            t.Util = d,
            Object.defineProperty(t, "__esModule", {
                value: !0
            })
    }
));
/* Swipper Slider 6.3.5 */
!function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Swiper = t()
}(this, function() {
    "use strict";
    function e(e, t) {
        for (var i = 0; i < t.length; i++) {
            var s = t[i];
            s.enumerable = s.enumerable || !1,
                s.configurable = !0,
            "value"in s && (s.writable = !0),
                Object.defineProperty(e, s.key, s)
        }
    }
    function t() {
        return (t = Object.assign || function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var i = arguments[t];
                    for (var s in i)
                        Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s])
                }
                return e
            }
        ).apply(this, arguments)
    }
    function i(e) {
        return null !== e && "object" == typeof e && "constructor"in e && e.constructor === Object
    }
    function s(e, t) {
        void 0 === e && (e = {}),
        void 0 === t && (t = {}),
            Object.keys(t).forEach(function(a) {
                void 0 === e[a] ? e[a] = t[a] : i(t[a]) && i(e[a]) && Object.keys(t[a]).length > 0 && s(e[a], t[a])
            })
    }
    var a = {
        body: {},
        addEventListener: function() {},
        removeEventListener: function() {},
        activeElement: {
            blur: function() {},
            nodeName: ""
        },
        querySelector: function() {
            return null
        },
        querySelectorAll: function() {
            return []
        },
        getElementById: function() {
            return null
        },
        createEvent: function() {
            return {
                initEvent: function() {}
            }
        },
        createElement: function() {
            return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                    return []
                }
            }
        },
        createElementNS: function() {
            return {}
        },
        importNode: function() {
            return null
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        }
    };
    function r() {
        var e = "undefined" != typeof document ? document : {};
        return s(e, a),
            e
    }
    var n = {
        document: a,
        navigator: {
            userAgent: ""
        },
        location: {
            hash: "",
            host: "",
            hostname: "",
            href: "",
            origin: "",
            pathname: "",
            protocol: "",
            search: ""
        },
        history: {
            replaceState: function() {},
            pushState: function() {},
            go: function() {},
            back: function() {}
        },
        CustomEvent: function() {
            return this
        },
        addEventListener: function() {},
        removeEventListener: function() {},
        getComputedStyle: function() {
            return {
                getPropertyValue: function() {
                    return ""
                }
            }
        },
        Image: function() {},
        Date: function() {},
        screen: {},
        setTimeout: function() {},
        clearTimeout: function() {},
        matchMedia: function() {
            return {}
        },
        requestAnimationFrame: function(e) {
            return "undefined" == typeof setTimeout ? (e(),
                null) : setTimeout(e, 0)
        },
        cancelAnimationFrame: function(e) {
            "undefined" != typeof setTimeout && clearTimeout(e)
        }
    };
    function l() {
        var e = "undefined" != typeof window ? window : {};
        return s(e, n),
            e
    }
    function o(e) {
        return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
                return e.__proto__ || Object.getPrototypeOf(e)
            }
        )(e)
    }
    function d(e, t) {
        return (d = Object.setPrototypeOf || function(e, t) {
                return e.__proto__ = t,
                    e
            }
        )(e, t)
    }
    function h(e, t, i) {
        return (h = function() {
                if ("undefined" == typeof Reflect || !Reflect.construct)
                    return !1;
                if (Reflect.construct.sham)
                    return !1;
                if ("function" == typeof Proxy)
                    return !0;
                try {
                    return Date.prototype.toString.call(Reflect.construct(Date, [], function() {})),
                        !0
                } catch (e) {
                    return !1
                }
            }() ? Reflect.construct : function(e, t, i) {
                var s = [null];
                s.push.apply(s, t);
                var a = new (Function.bind.apply(e, s));
                return i && d(a, i.prototype),
                    a
            }
        ).apply(null, arguments)
    }
    function p(e) {
        var t = "function" == typeof Map ? new Map : void 0;
        return (p = function(e) {
                if (null === e || (i = e,
                -1 === Function.toString.call(i).indexOf("[native code]")))
                    return e;
                var i;
                if ("function" != typeof e)
                    throw new TypeError("Super expression must either be null or a function");
                if (void 0 !== t) {
                    if (t.has(e))
                        return t.get(e);
                    t.set(e, s)
                }
                function s() {
                    return h(e, arguments, o(this).constructor)
                }
                return s.prototype = Object.create(e.prototype, {
                    constructor: {
                        value: s,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                    d(s, e)
            }
        )(e)
    }
    var u = function(e) {
        var t, i;
        function s(t) {
            var i, s, a;
            return s = function(e) {
                if (void 0 === e)
                    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return e
            }(i = e.call.apply(e, [this].concat(t)) || this),
                a = s.__proto__,
                Object.defineProperty(s, "__proto__", {
                    get: function() {
                        return a
                    },
                    set: function(e) {
                        a.__proto__ = e
                    }
                }),
                i
        }
        return i = e,
            (t = s).prototype = Object.create(i.prototype),
            t.prototype.constructor = t,
            t.__proto__ = i,
            s
    }(p(Array));
    function c(e) {
        void 0 === e && (e = []);
        var t = [];
        return e.forEach(function(e) {
            Array.isArray(e) ? t.push.apply(t, c(e)) : t.push(e)
        }),
            t
    }
    function v(e, t) {
        return Array.prototype.filter.call(e, t)
    }
    function f(e, t) {
        var i = l()
            , s = r()
            , a = [];
        if (!t && e instanceof u)
            return e;
        if (!e)
            return new u(a);
        if ("string" == typeof e) {
            var n = e.trim();
            if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
                var o = "div";
                0 === n.indexOf("<li") && (o = "ul"),
                0 === n.indexOf("<tr") && (o = "tbody"),
                0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"),
                0 === n.indexOf("<tbody") && (o = "table"),
                0 === n.indexOf("<option") && (o = "select");
                var d = s.createElement(o);
                d.innerHTML = n;
                for (var h = 0; h < d.childNodes.length; h += 1)
                    a.push(d.childNodes[h])
            } else
                a = function(e, t) {
                    if ("string" != typeof e)
                        return [e];
                    for (var i = [], s = t.querySelectorAll(e), a = 0; a < s.length; a += 1)
                        i.push(s[a]);
                    return i
                }(e.trim(), t || s)
        } else if (e.nodeType || e === i || e === s)
            a.push(e);
        else if (Array.isArray(e)) {
            if (e instanceof u)
                return e;
            a = e
        }
        return new u(function(e) {
            for (var t = [], i = 0; i < e.length; i += 1)
                -1 === t.indexOf(e[i]) && t.push(e[i]);
            return t
        }(a))
    }
    f.fn = u.prototype;
    var m, g, w, y = {
        addClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
                t[i] = arguments[i];
            var s = c(t.map(function(e) {
                return e.split(" ")
            }));
            return this.forEach(function(e) {
                var t;
                (t = e.classList).add.apply(t, s)
            }),
                this
        },
        removeClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
                t[i] = arguments[i];
            var s = c(t.map(function(e) {
                return e.split(" ")
            }));
            return this.forEach(function(e) {
                var t;
                (t = e.classList).remove.apply(t, s)
            }),
                this
        },
        hasClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
                t[i] = arguments[i];
            var s = c(t.map(function(e) {
                return e.split(" ")
            }));
            return v(this, function(e) {
                return s.filter(function(t) {
                    return e.classList.contains(t)
                }).length > 0
            }).length > 0
        },
        toggleClass: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
                t[i] = arguments[i];
            var s = c(t.map(function(e) {
                return e.split(" ")
            }));
            this.forEach(function(e) {
                s.forEach(function(t) {
                    e.classList.toggle(t)
                })
            })
        },
        attr: function(e, t) {
            if (1 === arguments.length && "string" == typeof e)
                return this[0] ? this[0].getAttribute(e) : void 0;
            for (var i = 0; i < this.length; i += 1)
                if (2 === arguments.length)
                    this[i].setAttribute(e, t);
                else
                    for (var s in e)
                        this[i][s] = e[s],
                            this[i].setAttribute(s, e[s]);
            return this
        },
        removeAttr: function(e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].removeAttribute(e);
            return this
        },
        transform: function(e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].style.transform = e;
            return this
        },
        transition: function(e) {
            for (var t = 0; t < this.length; t += 1)
                this[t].style.transition = "string" != typeof e ? e + "ms" : e;
            return this
        },
        on: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
                t[i] = arguments[i];
            var s = t[0]
                , a = t[1]
                , r = t[2]
                , n = t[3];
            function l(e) {
                var t = e.target;
                if (t) {
                    var i = e.target.dom7EventData || [];
                    if (i.indexOf(e) < 0 && i.unshift(e),
                        f(t).is(a))
                        r.apply(t, i);
                    else
                        for (var s = f(t).parents(), n = 0; n < s.length; n += 1)
                            f(s[n]).is(a) && r.apply(s[n], i)
                }
            }
            function o(e) {
                var t = e && e.target && e.target.dom7EventData || [];
                t.indexOf(e) < 0 && t.unshift(e),
                    r.apply(this, t)
            }
            "function" == typeof t[1] && (s = t[0],
                r = t[1],
                n = t[2],
                a = void 0),
            n || (n = !1);
            for (var d, h = s.split(" "), p = 0; p < this.length; p += 1) {
                var u = this[p];
                if (a)
                    for (d = 0; d < h.length; d += 1) {
                        var c = h[d];
                        u.dom7LiveListeners || (u.dom7LiveListeners = {}),
                        u.dom7LiveListeners[c] || (u.dom7LiveListeners[c] = []),
                            u.dom7LiveListeners[c].push({
                                listener: r,
                                proxyListener: l
                            }),
                            u.addEventListener(c, l, n)
                    }
                else
                    for (d = 0; d < h.length; d += 1) {
                        var v = h[d];
                        u.dom7Listeners || (u.dom7Listeners = {}),
                        u.dom7Listeners[v] || (u.dom7Listeners[v] = []),
                            u.dom7Listeners[v].push({
                                listener: r,
                                proxyListener: o
                            }),
                            u.addEventListener(v, o, n)
                    }
            }
            return this
        },
        off: function() {
            for (var e = arguments.length, t = new Array(e), i = 0; i < e; i++)
                t[i] = arguments[i];
            var s = t[0]
                , a = t[1]
                , r = t[2]
                , n = t[3];
            "function" == typeof t[1] && (s = t[0],
                r = t[1],
                n = t[2],
                a = void 0),
            n || (n = !1);
            for (var l = s.split(" "), o = 0; o < l.length; o += 1)
                for (var d = l[o], h = 0; h < this.length; h += 1) {
                    var p = this[h]
                        , u = void 0;
                    if (!a && p.dom7Listeners ? u = p.dom7Listeners[d] : a && p.dom7LiveListeners && (u = p.dom7LiveListeners[d]),
                    u && u.length)
                        for (var c = u.length - 1; c >= 0; c -= 1) {
                            var v = u[c];
                            r && v.listener === r || r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (p.removeEventListener(d, v.proxyListener, n),
                                u.splice(c, 1)) : r || (p.removeEventListener(d, v.proxyListener, n),
                                u.splice(c, 1))
                        }
                }
            return this
        },
        trigger: function() {
            for (var e = l(), t = arguments.length, i = new Array(t), s = 0; s < t; s++)
                i[s] = arguments[s];
            for (var a = i[0].split(" "), r = i[1], n = 0; n < a.length; n += 1)
                for (var o = a[n], d = 0; d < this.length; d += 1) {
                    var h = this[d];
                    if (e.CustomEvent) {
                        var p = new e.CustomEvent(o,{
                            detail: r,
                            bubbles: !0,
                            cancelable: !0
                        });
                        h.dom7EventData = i.filter(function(e, t) {
                            return t > 0
                        }),
                            h.dispatchEvent(p),
                            h.dom7EventData = [],
                            delete h.dom7EventData
                    }
                }
            return this
        },
        transitionEnd: function(e) {
            var t = this;
            return e && t.on("transitionend", function i(s) {
                s.target === this && (e.call(this, s),
                    t.off("transitionend", i))
            }),
                this
        },
        outerWidth: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
                }
                return this[0].offsetWidth
            }
            return null
        },
        outerHeight: function(e) {
            if (this.length > 0) {
                if (e) {
                    var t = this.styles();
                    return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
                }
                return this[0].offsetHeight
            }
            return null
        },
        styles: function() {
            var e = l();
            return this[0] ? e.getComputedStyle(this[0], null) : {}
        },
        offset: function() {
            if (this.length > 0) {
                var e = l()
                    , t = r()
                    , i = this[0]
                    , s = i.getBoundingClientRect()
                    , a = t.body
                    , n = i.clientTop || a.clientTop || 0
                    , o = i.clientLeft || a.clientLeft || 0
                    , d = i === e ? e.scrollY : i.scrollTop
                    , h = i === e ? e.scrollX : i.scrollLeft;
                return {
                    top: s.top + d - n,
                    left: s.left + h - o
                }
            }
            return null
        },
        css: function(e, t) {
            var i, s = l();
            if (1 === arguments.length) {
                if ("string" != typeof e) {
                    for (i = 0; i < this.length; i += 1)
                        for (var a in e)
                            this[i].style[a] = e[a];
                    return this
                }
                if (this[0])
                    return s.getComputedStyle(this[0], null).getPropertyValue(e)
            }
            if (2 === arguments.length && "string" == typeof e) {
                for (i = 0; i < this.length; i += 1)
                    this[i].style[e] = t;
                return this
            }
            return this
        },
        each: function(e) {
            return e ? (this.forEach(function(t, i) {
                e.apply(t, [t, i])
            }),
                this) : this
        },
        html: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].innerHTML : null;
            for (var t = 0; t < this.length; t += 1)
                this[t].innerHTML = e;
            return this
        },
        text: function(e) {
            if (void 0 === e)
                return this[0] ? this[0].textContent.trim() : null;
            for (var t = 0; t < this.length; t += 1)
                this[t].textContent = e;
            return this
        },
        is: function(e) {
            var t, i, s = l(), a = r(), n = this[0];
            if (!n || void 0 === e)
                return !1;
            if ("string" == typeof e) {
                if (n.matches)
                    return n.matches(e);
                if (n.webkitMatchesSelector)
                    return n.webkitMatchesSelector(e);
                if (n.msMatchesSelector)
                    return n.msMatchesSelector(e);
                for (t = f(e),
                         i = 0; i < t.length; i += 1)
                    if (t[i] === n)
                        return !0;
                return !1
            }
            if (e === a)
                return n === a;
            if (e === s)
                return n === s;
            if (e.nodeType || e instanceof u) {
                for (t = e.nodeType ? [e] : e,
                         i = 0; i < t.length; i += 1)
                    if (t[i] === n)
                        return !0;
                return !1
            }
            return !1
        },
        index: function() {
            var e, t = this[0];
            if (t) {
                for (e = 0; null !== (t = t.previousSibling); )
                    1 === t.nodeType && (e += 1);
                return e
            }
        },
        eq: function(e) {
            if (void 0 === e)
                return this;
            var t = this.length;
            if (e > t - 1)
                return f([]);
            if (e < 0) {
                var i = t + e;
                return f(i < 0 ? [] : [this[i]])
            }
            return f([this[e]])
        },
        append: function() {
            for (var e, t = r(), i = 0; i < arguments.length; i += 1) {
                e = i < 0 || arguments.length <= i ? void 0 : arguments[i];
                for (var s = 0; s < this.length; s += 1)
                    if ("string" == typeof e) {
                        var a = t.createElement("div");
                        for (a.innerHTML = e; a.firstChild; )
                            this[s].appendChild(a.firstChild)
                    } else if (e instanceof u)
                        for (var n = 0; n < e.length; n += 1)
                            this[s].appendChild(e[n]);
                    else
                        this[s].appendChild(e)
            }
            return this
        },
        prepend: function(e) {
            var t, i, s = r();
            for (t = 0; t < this.length; t += 1)
                if ("string" == typeof e) {
                    var a = s.createElement("div");
                    for (a.innerHTML = e,
                             i = a.childNodes.length - 1; i >= 0; i -= 1)
                        this[t].insertBefore(a.childNodes[i], this[t].childNodes[0])
                } else if (e instanceof u)
                    for (i = 0; i < e.length; i += 1)
                        this[t].insertBefore(e[i], this[t].childNodes[0]);
                else
                    this[t].insertBefore(e, this[t].childNodes[0]);
            return this
        },
        next: function(e) {
            return this.length > 0 ? e ? this[0].nextElementSibling && f(this[0].nextElementSibling).is(e) ? f([this[0].nextElementSibling]) : f([]) : this[0].nextElementSibling ? f([this[0].nextElementSibling]) : f([]) : f([])
        },
        nextAll: function(e) {
            var t = []
                , i = this[0];
            if (!i)
                return f([]);
            for (; i.nextElementSibling; ) {
                var s = i.nextElementSibling;
                e ? f(s).is(e) && t.push(s) : t.push(s),
                    i = s
            }
            return f(t)
        },
        prev: function(e) {
            if (this.length > 0) {
                var t = this[0];
                return e ? t.previousElementSibling && f(t.previousElementSibling).is(e) ? f([t.previousElementSibling]) : f([]) : t.previousElementSibling ? f([t.previousElementSibling]) : f([])
            }
            return f([])
        },
        prevAll: function(e) {
            var t = []
                , i = this[0];
            if (!i)
                return f([]);
            for (; i.previousElementSibling; ) {
                var s = i.previousElementSibling;
                e ? f(s).is(e) && t.push(s) : t.push(s),
                    i = s
            }
            return f(t)
        },
        parent: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                null !== this[i].parentNode && (e ? f(this[i].parentNode).is(e) && t.push(this[i].parentNode) : t.push(this[i].parentNode));
            return f(t)
        },
        parents: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].parentNode; s; )
                    e ? f(s).is(e) && t.push(s) : t.push(s),
                        s = s.parentNode;
            return f(t)
        },
        closest: function(e) {
            var t = this;
            return void 0 === e ? f([]) : (t.is(e) || (t = t.parents(e).eq(0)),
                t)
        },
        find: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].querySelectorAll(e), a = 0; a < s.length; a += 1)
                    t.push(s[a]);
            return f(t)
        },
        children: function(e) {
            for (var t = [], i = 0; i < this.length; i += 1)
                for (var s = this[i].children, a = 0; a < s.length; a += 1)
                    e && !f(s[a]).is(e) || t.push(s[a]);
            return f(t)
        },
        filter: function(e) {
            return f(v(this, e))
        },
        remove: function() {
            for (var e = 0; e < this.length; e += 1)
                this[e].parentNode && this[e].parentNode.removeChild(this[e]);
            return this
        }
    };
    function b(e, t) {
        return void 0 === t && (t = 0),
            setTimeout(e, t)
    }
    function E() {
        return Date.now()
    }
    function x(e, t) {
        void 0 === t && (t = "x");
        var i, s, a, r = l(), n = r.getComputedStyle(e, null);
        return r.WebKitCSSMatrix ? ((s = n.transform || n.webkitTransform).split(",").length > 6 && (s = s.split(", ").map(function(e) {
            return e.replace(",", ".")
        }).join(", ")),
            a = new r.WebKitCSSMatrix("none" === s ? "" : s)) : i = (a = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","),
        "x" === t && (s = r.WebKitCSSMatrix ? a.m41 : 16 === i.length ? parseFloat(i[12]) : parseFloat(i[4])),
        "y" === t && (s = r.WebKitCSSMatrix ? a.m42 : 16 === i.length ? parseFloat(i[13]) : parseFloat(i[5])),
        s || 0
    }
    function T(e) {
        return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
    }
    function C() {
        for (var e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = 1; t < arguments.length; t += 1) {
            var i = t < 0 || arguments.length <= t ? void 0 : arguments[t];
            if (null != i)
                for (var s = Object.keys(Object(i)), a = 0, r = s.length; a < r; a += 1) {
                    var n = s[a]
                        , l = Object.getOwnPropertyDescriptor(i, n);
                    void 0 !== l && l.enumerable && (T(e[n]) && T(i[n]) ? C(e[n], i[n]) : !T(e[n]) && T(i[n]) ? (e[n] = {},
                        C(e[n], i[n])) : e[n] = i[n])
                }
        }
        return e
    }
    function S(e, t) {
        Object.keys(t).forEach(function(i) {
            T(t[i]) && Object.keys(t[i]).forEach(function(s) {
                "function" == typeof t[i][s] && (t[i][s] = t[i][s].bind(e))
            }),
                e[i] = t[i]
        })
    }
    function M() {
        return m || (e = l(),
            t = r(),
            m = {
                touch: !!("ontouchstart"in e || e.DocumentTouch && t instanceof e.DocumentTouch),
                pointerEvents: !!e.PointerEvent && "maxTouchPoints"in e.navigator && e.navigator.maxTouchPoints >= 0,
                observer: "MutationObserver"in e || "WebkitMutationObserver"in e,
                passiveListener: function() {
                    var t = !1;
                    try {
                        var i = Object.defineProperty({}, "passive", {
                            get: function() {
                                t = !0
                            }
                        });
                        e.addEventListener("testPassiveListener", null, i)
                    } catch (e) {}
                    return t
                }(),
                gestures: "ongesturestart"in e
            }),
            m;
        var e, t
    }
    function z(e) {
        return void 0 === e && (e = {}),
        g || (g = function(e) {
            var t = (void 0 === e ? {} : e).userAgent
                , i = M()
                , s = l()
                , a = s.navigator.platform
                , r = t || s.navigator.userAgent
                , n = {
                ios: !1,
                android: !1
            }
                , o = s.screen.width
                , d = s.screen.height
                , h = r.match(/(Android);?[\s\/]+([\d.]+)?/)
                , p = r.match(/(iPad).*OS\s([\d_]+)/)
                , u = r.match(/(iPod)(.*OS\s([\d_]+))?/)
                , c = !p && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/)
                , v = "Win32" === a
                , f = "MacIntel" === a;
            return !p && f && i.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(o + "x" + d) >= 0 && ((p = r.match(/(Version)\/([\d.]+)/)) || (p = [0, 1, "13_0_0"]),
                f = !1),
            h && !v && (n.os = "android",
                n.android = !0),
            (p || c || u) && (n.os = "ios",
                n.ios = !0),
                n
        }(e)),
            g
    }
    function P() {
        return w || (t = l(),
            w = {
                isEdge: !!t.navigator.userAgent.match(/Edge/g),
                isSafari: (e = t.navigator.userAgent.toLowerCase(),
                e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
            }),
            w;
        var e, t
    }
    Object.keys(y).forEach(function(e) {
        f.fn[e] = y[e]
    });
    var k = {
        name: "resize",
        create: function() {
            var e = this;
            C(e, {
                resize: {
                    resizeHandler: function() {
                        e && !e.destroyed && e.initialized && (e.emit("beforeResize"),
                            e.emit("resize"))
                    },
                    orientationChangeHandler: function() {
                        e && !e.destroyed && e.initialized && e.emit("orientationchange")
                    }
                }
            })
        },
        on: {
            init: function(e) {
                var t = l();
                t.addEventListener("resize", e.resize.resizeHandler),
                    t.addEventListener("orientationchange", e.resize.orientationChangeHandler)
            },
            destroy: function(e) {
                var t = l();
                t.removeEventListener("resize", e.resize.resizeHandler),
                    t.removeEventListener("orientationchange", e.resize.orientationChangeHandler)
            }
        }
    }
        , $ = {
        attach: function(e, t) {
            void 0 === t && (t = {});
            var i = l()
                , s = this
                , a = new (i.MutationObserver || i.WebkitMutationObserver)(function(e) {
                    if (1 !== e.length) {
                        var t = function() {
                            s.emit("observerUpdate", e[0])
                        };
                        i.requestAnimationFrame ? i.requestAnimationFrame(t) : i.setTimeout(t, 0)
                    } else
                        s.emit("observerUpdate", e[0])
                }
            );
            a.observe(e, {
                attributes: void 0 === t.attributes || t.attributes,
                childList: void 0 === t.childList || t.childList,
                characterData: void 0 === t.characterData || t.characterData
            }),
                s.observer.observers.push(a)
        },
        init: function() {
            if (this.support.observer && this.params.observer) {
                if (this.params.observeParents)
                    for (var e = this.$el.parents(), t = 0; t < e.length; t += 1)
                        this.observer.attach(e[t]);
                this.observer.attach(this.$el[0], {
                    childList: this.params.observeSlideChildren
                }),
                    this.observer.attach(this.$wrapperEl[0], {
                        attributes: !1
                    })
            }
        },
        destroy: function() {
            this.observer.observers.forEach(function(e) {
                e.disconnect()
            }),
                this.observer.observers = []
        }
    }
        , L = {
        name: "observer",
        params: {
            observer: !1,
            observeParents: !1,
            observeSlideChildren: !1
        },
        create: function() {
            S(this, {
                observer: t(t({}, $), {}, {
                    observers: []
                })
            })
        },
        on: {
            init: function(e) {
                e.observer.init()
            },
            destroy: function(e) {
                e.observer.destroy()
            }
        }
    };
    function I(e) {
        var t = r()
            , i = l()
            , s = this.touchEventsData
            , a = this.params
            , n = this.touches;
        if (!this.animating || !a.preventInteractionOnTransition) {
            var o = e;
            o.originalEvent && (o = o.originalEvent);
            var d = f(o.target);
            if (("wrapper" !== a.touchEventsTarget || d.closest(this.wrapperEl).length) && (s.isTouchEvent = "touchstart" === o.type,
            (s.isTouchEvent || !("which"in o) || 3 !== o.which) && !(!s.isTouchEvent && "button"in o && o.button > 0 || s.isTouched && s.isMoved)))
                if (!!a.noSwipingClass && "" !== a.noSwipingClass && o.target && o.target.shadowRoot && e.path && e.path[0] && (d = f(e.path[0])),
                a.noSwiping && d.closest(a.noSwipingSelector ? a.noSwipingSelector : "." + a.noSwipingClass)[0])
                    this.allowClick = !0;
                else if (!a.swipeHandler || d.closest(a.swipeHandler)[0]) {
                    n.currentX = "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX,
                        n.currentY = "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY;
                    var h = n.currentX
                        , p = n.currentY
                        , u = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection
                        , c = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
                    if (!u || !(h <= c || h >= i.screen.width - c)) {
                        if (C(s, {
                            isTouched: !0,
                            isMoved: !1,
                            allowTouchCallbacks: !0,
                            isScrolling: void 0,
                            startMoving: void 0
                        }),
                            n.startX = h,
                            n.startY = p,
                            s.touchStartTime = E(),
                            this.allowClick = !0,
                            this.updateSize(),
                            this.swipeDirection = void 0,
                        a.threshold > 0 && (s.allowThresholdMove = !1),
                        "touchstart" !== o.type) {
                            var v = !0;
                            d.is(s.formElements) && (v = !1),
                            t.activeElement && f(t.activeElement).is(s.formElements) && t.activeElement !== d[0] && t.activeElement.blur();
                            var m = v && this.allowTouchMove && a.touchStartPreventDefault;
                            (a.touchStartForcePreventDefault || m) && o.preventDefault()
                        }
                        this.emit("touchStart", o)
                    }
                }
        }
    }
    function O() {
        var e = this.params
            , t = this.el;
        if (!t || 0 !== t.offsetWidth) {
            e.breakpoints && this.setBreakpoint();
            var i = this.allowSlideNext
                , s = this.allowSlidePrev
                , a = this.snapGrid;
            this.allowSlideNext = !0,
                this.allowSlidePrev = !0,
                this.updateSize(),
                this.updateSlides(),
                this.updateSlidesClasses(),
                ("auto" === e.slidesPerView || e.slidesPerView > 1) && this.isEnd && !this.isBeginning && !this.params.centeredSlides ? this.slideTo(this.slides.length - 1, 0, !1, !0) : this.slideTo(this.activeIndex, 0, !1, !0),
            this.autoplay && this.autoplay.running && this.autoplay.paused && this.autoplay.run(),
                this.allowSlidePrev = s,
                this.allowSlideNext = i,
            this.params.watchOverflow && a !== this.snapGrid && this.checkOverflow()
        }
    }
    var A = !1;
    function D() {}
    var G = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "container",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        nested: !1,
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: .02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: "column",
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !1,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: .5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: .85,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        containerModifierClass: "swiper-container-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1
    }
        , N = {
        modular: {
            useParams: function(e) {
                var t = this;
                t.modules && Object.keys(t.modules).forEach(function(i) {
                    var s = t.modules[i];
                    s.params && C(e, s.params)
                })
            },
            useModules: function(e) {
                void 0 === e && (e = {});
                var t = this;
                t.modules && Object.keys(t.modules).forEach(function(i) {
                    var s = t.modules[i]
                        , a = e[i] || {};
                    s.on && t.on && Object.keys(s.on).forEach(function(e) {
                        t.on(e, s.on[e])
                    }),
                    s.create && s.create.bind(t)(a)
                })
            }
        },
        eventsEmitter: {
            on: function(e, t, i) {
                var s = this;
                if ("function" != typeof t)
                    return s;
                var a = i ? "unshift" : "push";
                return e.split(" ").forEach(function(e) {
                    s.eventsListeners[e] || (s.eventsListeners[e] = []),
                        s.eventsListeners[e][a](t)
                }),
                    s
            },
            once: function(e, t, i) {
                var s = this;
                if ("function" != typeof t)
                    return s;
                function a() {
                    s.off(e, a),
                    a.__emitterProxy && delete a.__emitterProxy;
                    for (var i = arguments.length, r = new Array(i), n = 0; n < i; n++)
                        r[n] = arguments[n];
                    t.apply(s, r)
                }
                return a.__emitterProxy = t,
                    s.on(e, a, i)
            },
            onAny: function(e, t) {
                if ("function" != typeof e)
                    return this;
                var i = t ? "unshift" : "push";
                return this.eventsAnyListeners.indexOf(e) < 0 && this.eventsAnyListeners[i](e),
                    this
            },
            offAny: function(e) {
                if (!this.eventsAnyListeners)
                    return this;
                var t = this.eventsAnyListeners.indexOf(e);
                return t >= 0 && this.eventsAnyListeners.splice(t, 1),
                    this
            },
            off: function(e, t) {
                var i = this;
                return i.eventsListeners ? (e.split(" ").forEach(function(e) {
                    void 0 === t ? i.eventsListeners[e] = [] : i.eventsListeners[e] && i.eventsListeners[e].forEach(function(s, a) {
                        (s === t || s.__emitterProxy && s.__emitterProxy === t) && i.eventsListeners[e].splice(a, 1)
                    })
                }),
                    i) : i
            },
            emit: function() {
                var e, t, i, s = this;
                if (!s.eventsListeners)
                    return s;
                for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++)
                    r[n] = arguments[n];
                return "string" == typeof r[0] || Array.isArray(r[0]) ? (e = r[0],
                    t = r.slice(1, r.length),
                    i = s) : (e = r[0].events,
                    t = r[0].data,
                    i = r[0].context || s),
                    t.unshift(i),
                    (Array.isArray(e) ? e : e.split(" ")).forEach(function(e) {
                        if (s.eventsAnyListeners && s.eventsAnyListeners.length && s.eventsAnyListeners.forEach(function(s) {
                            s.apply(i, [e].concat(t))
                        }),
                        s.eventsListeners && s.eventsListeners[e]) {
                            var a = [];
                            s.eventsListeners[e].forEach(function(e) {
                                a.push(e)
                            }),
                                a.forEach(function(e) {
                                    e.apply(i, t)
                                })
                        }
                    }),
                    s
            }
        },
        update: {
            updateSize: function() {
                var e, t, i = this.$el;
                e = void 0 !== this.params.width && null !== this.params.width ? this.params.width : i[0].clientWidth,
                    t = void 0 !== this.params.height && null !== this.params.width ? this.params.height : i[0].clientHeight,
                0 === e && this.isHorizontal() || 0 === t && this.isVertical() || (e = e - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10),
                    t = t - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10),
                Number.isNaN(e) && (e = 0),
                Number.isNaN(t) && (t = 0),
                    C(this, {
                        width: e,
                        height: t,
                        size: this.isHorizontal() ? e : t
                    }))
            },
            updateSlides: function() {
                var e = l()
                    , t = this.params
                    , i = this.$wrapperEl
                    , s = this.size
                    , a = this.rtlTranslate
                    , r = this.wrongRTL
                    , n = this.virtual && t.virtual.enabled
                    , o = n ? this.virtual.slides.length : this.slides.length
                    , d = i.children("." + this.params.slideClass)
                    , h = n ? this.virtual.slides.length : d.length
                    , p = []
                    , u = []
                    , c = [];
                function v(e, i) {
                    return !t.cssMode || i !== d.length - 1
                }
                var f = t.slidesOffsetBefore;
                "function" == typeof f && (f = t.slidesOffsetBefore.call(this));
                var m = t.slidesOffsetAfter;
                "function" == typeof m && (m = t.slidesOffsetAfter.call(this));
                var g = this.snapGrid.length
                    , w = this.snapGrid.length
                    , y = t.spaceBetween
                    , b = -f
                    , E = 0
                    , x = 0;
                if (void 0 !== s) {
                    var T, S;
                    "string" == typeof y && y.indexOf("%") >= 0 && (y = parseFloat(y.replace("%", "")) / 100 * s),
                        this.virtualSize = -y,
                        a ? d.css({
                            marginLeft: "",
                            marginTop: ""
                        }) : d.css({
                            marginRight: "",
                            marginBottom: ""
                        }),
                    t.slidesPerColumn > 1 && (T = Math.floor(h / t.slidesPerColumn) === h / this.params.slidesPerColumn ? h : Math.ceil(h / t.slidesPerColumn) * t.slidesPerColumn,
                    "auto" !== t.slidesPerView && "row" === t.slidesPerColumnFill && (T = Math.max(T, t.slidesPerView * t.slidesPerColumn)));
                    for (var M, z = t.slidesPerColumn, P = T / z, k = Math.floor(h / t.slidesPerColumn), $ = 0; $ < h; $ += 1) {
                        S = 0;
                        var L = d.eq($);
                        if (t.slidesPerColumn > 1) {
                            var I = void 0
                                , O = void 0
                                , A = void 0;
                            if ("row" === t.slidesPerColumnFill && t.slidesPerGroup > 1) {
                                var D = Math.floor($ / (t.slidesPerGroup * t.slidesPerColumn))
                                    , G = $ - t.slidesPerColumn * t.slidesPerGroup * D
                                    , N = 0 === D ? t.slidesPerGroup : Math.min(Math.ceil((h - D * z * t.slidesPerGroup) / z), t.slidesPerGroup);
                                I = (O = G - (A = Math.floor(G / N)) * N + D * t.slidesPerGroup) + A * T / z,
                                    L.css({
                                        "-webkit-box-ordinal-group": I,
                                        "-moz-box-ordinal-group": I,
                                        "-ms-flex-order": I,
                                        "-webkit-order": I,
                                        order: I
                                    })
                            } else
                                "column" === t.slidesPerColumnFill ? (A = $ - (O = Math.floor($ / z)) * z,
                                (O > k || O === k && A === z - 1) && (A += 1) >= z && (A = 0,
                                    O += 1)) : O = $ - (A = Math.floor($ / P)) * P;
                            L.css("margin-" + (this.isHorizontal() ? "top" : "left"), 0 !== A && t.spaceBetween && t.spaceBetween + "px")
                        }
                        if ("none" !== L.css("display")) {
                            if ("auto" === t.slidesPerView) {
                                var B = e.getComputedStyle(L[0], null)
                                    , H = L[0].style.transform
                                    , X = L[0].style.webkitTransform;
                                if (H && (L[0].style.transform = "none"),
                                X && (L[0].style.webkitTransform = "none"),
                                    t.roundLengths)
                                    S = this.isHorizontal() ? L.outerWidth(!0) : L.outerHeight(!0);
                                else if (this.isHorizontal()) {
                                    var Y = parseFloat(B.getPropertyValue("width") || 0)
                                        , V = parseFloat(B.getPropertyValue("padding-left") || 0)
                                        , F = parseFloat(B.getPropertyValue("padding-right") || 0)
                                        , R = parseFloat(B.getPropertyValue("margin-left") || 0)
                                        , W = parseFloat(B.getPropertyValue("margin-right") || 0)
                                        , q = B.getPropertyValue("box-sizing");
                                    if (q && "border-box" === q)
                                        S = Y + R + W;
                                    else {
                                        var j = L[0]
                                            , _ = j.clientWidth;
                                        S = Y + V + F + R + W + (j.offsetWidth - _)
                                    }
                                } else {
                                    var U = parseFloat(B.getPropertyValue("height") || 0)
                                        , K = parseFloat(B.getPropertyValue("padding-top") || 0)
                                        , Z = parseFloat(B.getPropertyValue("padding-bottom") || 0)
                                        , J = parseFloat(B.getPropertyValue("margin-top") || 0)
                                        , Q = parseFloat(B.getPropertyValue("margin-bottom") || 0)
                                        , ee = B.getPropertyValue("box-sizing");
                                    if (ee && "border-box" === ee)
                                        S = U + J + Q;
                                    else {
                                        var te = L[0]
                                            , ie = te.clientHeight;
                                        S = U + K + Z + J + Q + (te.offsetHeight - ie)
                                    }
                                }
                                H && (L[0].style.transform = H),
                                X && (L[0].style.webkitTransform = X),
                                t.roundLengths && (S = Math.floor(S))
                            } else
                                S = (s - (t.slidesPerView - 1) * y) / t.slidesPerView,
                                t.roundLengths && (S = Math.floor(S)),
                                d[$] && (this.isHorizontal() ? d[$].style.width = S + "px" : d[$].style.height = S + "px");
                            d[$] && (d[$].swiperSlideSize = S),
                                c.push(S),
                                t.centeredSlides ? (b = b + S / 2 + E / 2 + y,
                                0 === E && 0 !== $ && (b = b - s / 2 - y),
                                0 === $ && (b = b - s / 2 - y),
                                Math.abs(b) < .001 && (b = 0),
                                t.roundLengths && (b = Math.floor(b)),
                                x % t.slidesPerGroup == 0 && p.push(b),
                                    u.push(b)) : (t.roundLengths && (b = Math.floor(b)),
                                (x - Math.min(this.params.slidesPerGroupSkip, x)) % this.params.slidesPerGroup == 0 && p.push(b),
                                    u.push(b),
                                    b = b + S + y),
                                this.virtualSize += S + y,
                                E = S,
                                x += 1
                        }
                    }
                    if (this.virtualSize = Math.max(this.virtualSize, s) + m,
                    a && r && ("slide" === t.effect || "coverflow" === t.effect) && i.css({
                        width: this.virtualSize + t.spaceBetween + "px"
                    }),
                    t.setWrapperSize && (this.isHorizontal() ? i.css({
                        width: this.virtualSize + t.spaceBetween + "px"
                    }) : i.css({
                        height: this.virtualSize + t.spaceBetween + "px"
                    })),
                    t.slidesPerColumn > 1 && (this.virtualSize = (S + t.spaceBetween) * T,
                        this.virtualSize = Math.ceil(this.virtualSize / t.slidesPerColumn) - t.spaceBetween,
                        this.isHorizontal() ? i.css({
                            width: this.virtualSize + t.spaceBetween + "px"
                        }) : i.css({
                            height: this.virtualSize + t.spaceBetween + "px"
                        }),
                        t.centeredSlides)) {
                        M = [];
                        for (var se = 0; se < p.length; se += 1) {
                            var ae = p[se];
                            t.roundLengths && (ae = Math.floor(ae)),
                            p[se] < this.virtualSize + p[0] && M.push(ae)
                        }
                        p = M
                    }
                    if (!t.centeredSlides) {
                        M = [];
                        for (var re = 0; re < p.length; re += 1) {
                            var ne = p[re];
                            t.roundLengths && (ne = Math.floor(ne)),
                            p[re] <= this.virtualSize - s && M.push(ne)
                        }
                        p = M,
                        Math.floor(this.virtualSize - s) - Math.floor(p[p.length - 1]) > 1 && p.push(this.virtualSize - s)
                    }
                    if (0 === p.length && (p = [0]),
                    0 !== t.spaceBetween && (this.isHorizontal() ? a ? d.filter(v).css({
                        marginLeft: y + "px"
                    }) : d.filter(v).css({
                        marginRight: y + "px"
                    }) : d.filter(v).css({
                        marginBottom: y + "px"
                    })),
                    t.centeredSlides && t.centeredSlidesBounds) {
                        var le = 0;
                        c.forEach(function(e) {
                            le += e + (t.spaceBetween ? t.spaceBetween : 0)
                        });
                        var oe = (le -= t.spaceBetween) - s;
                        p = p.map(function(e) {
                            return e < 0 ? -f : e > oe ? oe + m : e
                        })
                    }
                    if (t.centerInsufficientSlides) {
                        var de = 0;
                        if (c.forEach(function(e) {
                            de += e + (t.spaceBetween ? t.spaceBetween : 0)
                        }),
                        (de -= t.spaceBetween) < s) {
                            var he = (s - de) / 2;
                            p.forEach(function(e, t) {
                                p[t] = e - he
                            }),
                                u.forEach(function(e, t) {
                                    u[t] = e + he
                                })
                        }
                    }
                    C(this, {
                        slides: d,
                        snapGrid: p,
                        slidesGrid: u,
                        slidesSizesGrid: c
                    }),
                    h !== o && this.emit("slidesLengthChange"),
                    p.length !== g && (this.params.watchOverflow && this.checkOverflow(),
                        this.emit("snapGridLengthChange")),
                    u.length !== w && this.emit("slidesGridLengthChange"),
                    (t.watchSlidesProgress || t.watchSlidesVisibility) && this.updateSlidesOffset()
                }
            },
            updateAutoHeight: function(e) {
                var t, i = [], s = 0;
                if ("number" == typeof e ? this.setTransition(e) : !0 === e && this.setTransition(this.params.speed),
                "auto" !== this.params.slidesPerView && this.params.slidesPerView > 1)
                    if (this.params.centeredSlides)
                        this.visibleSlides.each(function(e) {
                            i.push(e)
                        });
                    else
                        for (t = 0; t < Math.ceil(this.params.slidesPerView); t += 1) {
                            var a = this.activeIndex + t;
                            if (a > this.slides.length)
                                break;
                            i.push(this.slides.eq(a)[0])
                        }
                else
                    i.push(this.slides.eq(this.activeIndex)[0]);
                for (t = 0; t < i.length; t += 1)
                    if (void 0 !== i[t]) {
                        var r = i[t].offsetHeight;
                        s = r > s ? r : s
                    }
                s && this.$wrapperEl.css("height", s + "px")
            },
            updateSlidesOffset: function() {
                for (var e = this.slides, t = 0; t < e.length; t += 1)
                    e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
            },
            updateSlidesProgress: function(e) {
                void 0 === e && (e = this && this.translate || 0);
                var t = this.params
                    , i = this.slides
                    , s = this.rtlTranslate;
                if (0 !== i.length) {
                    void 0 === i[0].swiperSlideOffset && this.updateSlidesOffset();
                    var a = -e;
                    s && (a = e),
                        i.removeClass(t.slideVisibleClass),
                        this.visibleSlidesIndexes = [],
                        this.visibleSlides = [];
                    for (var r = 0; r < i.length; r += 1) {
                        var n = i[r]
                            , l = (a + (t.centeredSlides ? this.minTranslate() : 0) - n.swiperSlideOffset) / (n.swiperSlideSize + t.spaceBetween);
                        if (t.watchSlidesVisibility || t.centeredSlides && t.autoHeight) {
                            var o = -(a - n.swiperSlideOffset)
                                , d = o + this.slidesSizesGrid[r];
                            (o >= 0 && o < this.size - 1 || d > 1 && d <= this.size || o <= 0 && d >= this.size) && (this.visibleSlides.push(n),
                                this.visibleSlidesIndexes.push(r),
                                i.eq(r).addClass(t.slideVisibleClass))
                        }
                        n.progress = s ? -l : l
                    }
                    this.visibleSlides = f(this.visibleSlides)
                }
            },
            updateProgress: function(e) {
                if (void 0 === e) {
                    var t = this.rtlTranslate ? -1 : 1;
                    e = this && this.translate && this.translate * t || 0
                }
                var i = this.params
                    , s = this.maxTranslate() - this.minTranslate()
                    , a = this.progress
                    , r = this.isBeginning
                    , n = this.isEnd
                    , l = r
                    , o = n;
                0 === s ? (a = 0,
                    r = !0,
                    n = !0) : (r = (a = (e - this.minTranslate()) / s) <= 0,
                    n = a >= 1),
                    C(this, {
                        progress: a,
                        isBeginning: r,
                        isEnd: n
                    }),
                (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && this.updateSlidesProgress(e),
                r && !l && this.emit("reachBeginning toEdge"),
                n && !o && this.emit("reachEnd toEdge"),
                (l && !r || o && !n) && this.emit("fromEdge"),
                    this.emit("progress", a)
            },
            updateSlidesClasses: function() {
                var e, t = this.slides, i = this.params, s = this.$wrapperEl, a = this.activeIndex, r = this.realIndex, n = this.virtual && i.virtual.enabled;
                t.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass),
                    (e = n ? this.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + a + '"]') : t.eq(a)).addClass(i.slideActiveClass),
                i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + r + '"]').addClass(i.slideDuplicateActiveClass));
                var l = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
                i.loop && 0 === l.length && (l = t.eq(0)).addClass(i.slideNextClass);
                var o = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
                i.loop && 0 === o.length && (o = t.eq(-1)).addClass(i.slidePrevClass),
                i.loop && (l.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + l.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass),
                    o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass)),
                    this.emitSlidesClasses()
            },
            updateActiveIndex: function(e) {
                var t, i = this.rtlTranslate ? this.translate : -this.translate, s = this.slidesGrid, a = this.snapGrid, r = this.params, n = this.activeIndex, l = this.realIndex, o = this.snapIndex, d = e;
                if (void 0 === d) {
                    for (var h = 0; h < s.length; h += 1)
                        void 0 !== s[h + 1] ? i >= s[h] && i < s[h + 1] - (s[h + 1] - s[h]) / 2 ? d = h : i >= s[h] && i < s[h + 1] && (d = h + 1) : i >= s[h] && (d = h);
                    r.normalizeSlideIndex && (d < 0 || void 0 === d) && (d = 0)
                }
                if (a.indexOf(i) >= 0)
                    t = a.indexOf(i);
                else {
                    var p = Math.min(r.slidesPerGroupSkip, d);
                    t = p + Math.floor((d - p) / r.slidesPerGroup)
                }
                if (t >= a.length && (t = a.length - 1),
                d !== n) {
                    var u = parseInt(this.slides.eq(d).attr("data-swiper-slide-index") || d, 10);
                    C(this, {
                        snapIndex: t,
                        realIndex: u,
                        previousIndex: n,
                        activeIndex: d
                    }),
                        this.emit("activeIndexChange"),
                        this.emit("snapIndexChange"),
                    l !== u && this.emit("realIndexChange"),
                    (this.initialized || this.params.runCallbacksOnInit) && this.emit("slideChange")
                } else
                    t !== o && (this.snapIndex = t,
                        this.emit("snapIndexChange"))
            },
            updateClickedSlide: function(e) {
                var t = this.params
                    , i = f(e.target).closest("." + t.slideClass)[0]
                    , s = !1;
                if (i)
                    for (var a = 0; a < this.slides.length; a += 1)
                        this.slides[a] === i && (s = !0);
                if (!i || !s)
                    return this.clickedSlide = void 0,
                        void (this.clickedIndex = void 0);
                this.clickedSlide = i,
                    this.virtual && this.params.virtual.enabled ? this.clickedIndex = parseInt(f(i).attr("data-swiper-slide-index"), 10) : this.clickedIndex = f(i).index(),
                t.slideToClickedSlide && void 0 !== this.clickedIndex && this.clickedIndex !== this.activeIndex && this.slideToClickedSlide()
            }
        },
        translate: {
            getTranslate: function(e) {
                void 0 === e && (e = this.isHorizontal() ? "x" : "y");
                var t = this.params
                    , i = this.rtlTranslate
                    , s = this.translate
                    , a = this.$wrapperEl;
                if (t.virtualTranslate)
                    return i ? -s : s;
                if (t.cssMode)
                    return s;
                var r = x(a[0], e);
                return i && (r = -r),
                r || 0
            },
            setTranslate: function(e, t) {
                var i = this.rtlTranslate
                    , s = this.params
                    , a = this.$wrapperEl
                    , r = this.wrapperEl
                    , n = this.progress
                    , l = 0
                    , o = 0;
                this.isHorizontal() ? l = i ? -e : e : o = e,
                s.roundLengths && (l = Math.floor(l),
                    o = Math.floor(o)),
                    s.cssMode ? r[this.isHorizontal() ? "scrollLeft" : "scrollTop"] = this.isHorizontal() ? -l : -o : s.virtualTranslate || a.transform("translate3d(" + l + "px, " + o + "px, 0px)"),
                    this.previousTranslate = this.translate,
                    this.translate = this.isHorizontal() ? l : o;
                var d = this.maxTranslate() - this.minTranslate();
                (0 === d ? 0 : (e - this.minTranslate()) / d) !== n && this.updateProgress(e),
                    this.emit("setTranslate", this.translate, t)
            },
            minTranslate: function() {
                return -this.snapGrid[0]
            },
            maxTranslate: function() {
                return -this.snapGrid[this.snapGrid.length - 1]
            },
            translateTo: function(e, t, i, s, a) {
                void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === i && (i = !0),
                void 0 === s && (s = !0);
                var r = this
                    , n = r.params
                    , l = r.wrapperEl;
                if (r.animating && n.preventInteractionOnTransition)
                    return !1;
                var o, d = r.minTranslate(), h = r.maxTranslate();
                if (o = s && e > d ? d : s && e < h ? h : e,
                    r.updateProgress(o),
                    n.cssMode) {
                    var p, u = r.isHorizontal();
                    return 0 === t ? l[u ? "scrollLeft" : "scrollTop"] = -o : l.scrollTo ? l.scrollTo(((p = {})[u ? "left" : "top"] = -o,
                        p.behavior = "smooth",
                        p)) : l[u ? "scrollLeft" : "scrollTop"] = -o,
                        !0
                }
                return 0 === t ? (r.setTransition(0),
                    r.setTranslate(o),
                i && (r.emit("beforeTransitionStart", t, a),
                    r.emit("transitionEnd"))) : (r.setTransition(t),
                    r.setTranslate(o),
                i && (r.emit("beforeTransitionStart", t, a),
                    r.emit("transitionStart")),
                r.animating || (r.animating = !0,
                r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
                            r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd),
                            r.onTranslateToWrapperTransitionEnd = null,
                            delete r.onTranslateToWrapperTransitionEnd,
                        i && r.emit("transitionEnd"))
                    }
                ),
                    r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd),
                    r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))),
                    !0
            }
        },
        transition: {
            setTransition: function(e, t) {
                this.params.cssMode || this.$wrapperEl.transition(e),
                    this.emit("setTransition", e, t)
            },
            transitionStart: function(e, t) {
                void 0 === e && (e = !0);
                var i = this.activeIndex
                    , s = this.params
                    , a = this.previousIndex;
                if (!s.cssMode) {
                    s.autoHeight && this.updateAutoHeight();
                    var r = t;
                    if (r || (r = i > a ? "next" : i < a ? "prev" : "reset"),
                        this.emit("transitionStart"),
                    e && i !== a) {
                        if ("reset" === r)
                            return void this.emit("slideResetTransitionStart");
                        this.emit("slideChangeTransitionStart"),
                            "next" === r ? this.emit("slideNextTransitionStart") : this.emit("slidePrevTransitionStart")
                    }
                }
            },
            transitionEnd: function(e, t) {
                void 0 === e && (e = !0);
                var i = this.activeIndex
                    , s = this.previousIndex
                    , a = this.params;
                if (this.animating = !1,
                    !a.cssMode) {
                    this.setTransition(0);
                    var r = t;
                    if (r || (r = i > s ? "next" : i < s ? "prev" : "reset"),
                        this.emit("transitionEnd"),
                    e && i !== s) {
                        if ("reset" === r)
                            return void this.emit("slideResetTransitionEnd");
                        this.emit("slideChangeTransitionEnd"),
                            "next" === r ? this.emit("slideNextTransitionEnd") : this.emit("slidePrevTransitionEnd")
                    }
                }
            }
        },
        slide: {
            slideTo: function(e, t, i, s) {
                if (void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === i && (i = !0),
                "number" != typeof e && "string" != typeof e)
                    throw new Error("The 'index' argument cannot have type other than 'number' or 'string'. [" + typeof e + "] given.");
                if ("string" == typeof e) {
                    var a = parseInt(e, 10);
                    if (!isFinite(a))
                        throw new Error("The passed-in 'index' (string) couldn't be converted to 'number'. [" + e + "] given.");
                    e = a
                }
                var r = this
                    , n = e;
                n < 0 && (n = 0);
                var l = r.params
                    , o = r.snapGrid
                    , d = r.slidesGrid
                    , h = r.previousIndex
                    , p = r.activeIndex
                    , u = r.rtlTranslate
                    , c = r.wrapperEl;
                if (r.animating && l.preventInteractionOnTransition)
                    return !1;
                var v = Math.min(r.params.slidesPerGroupSkip, n)
                    , f = v + Math.floor((n - v) / r.params.slidesPerGroup);
                f >= o.length && (f = o.length - 1),
                (p || l.initialSlide || 0) === (h || 0) && i && r.emit("beforeSlideChangeStart");
                var m, g = -o[f];
                if (r.updateProgress(g),
                    l.normalizeSlideIndex)
                    for (var w = 0; w < d.length; w += 1)
                        -Math.floor(100 * g) >= Math.floor(100 * d[w]) && (n = w);
                if (r.initialized && n !== p) {
                    if (!r.allowSlideNext && g < r.translate && g < r.minTranslate())
                        return !1;
                    if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (p || 0) !== n)
                        return !1
                }
                if (m = n > p ? "next" : n < p ? "prev" : "reset",
                u && -g === r.translate || !u && g === r.translate)
                    return r.updateActiveIndex(n),
                    l.autoHeight && r.updateAutoHeight(),
                        r.updateSlidesClasses(),
                    "slide" !== l.effect && r.setTranslate(g),
                    "reset" !== m && (r.transitionStart(i, m),
                        r.transitionEnd(i, m)),
                        !1;
                if (l.cssMode) {
                    var y, b = r.isHorizontal(), E = -g;
                    return u && (E = c.scrollWidth - c.offsetWidth - E),
                        0 === t ? c[b ? "scrollLeft" : "scrollTop"] = E : c.scrollTo ? c.scrollTo(((y = {})[b ? "left" : "top"] = E,
                            y.behavior = "smooth",
                            y)) : c[b ? "scrollLeft" : "scrollTop"] = E,
                        !0
                }
                return 0 === t ? (r.setTransition(0),
                    r.setTranslate(g),
                    r.updateActiveIndex(n),
                    r.updateSlidesClasses(),
                    r.emit("beforeTransitionStart", t, s),
                    r.transitionStart(i, m),
                    r.transitionEnd(i, m)) : (r.setTransition(t),
                    r.setTranslate(g),
                    r.updateActiveIndex(n),
                    r.updateSlidesClasses(),
                    r.emit("beforeTransitionStart", t, s),
                    r.transitionStart(i, m),
                r.animating || (r.animating = !0,
                r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
                        r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                            r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd),
                            r.onSlideToWrapperTransitionEnd = null,
                            delete r.onSlideToWrapperTransitionEnd,
                            r.transitionEnd(i, m))
                    }
                ),
                    r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd),
                    r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))),
                    !0
            },
            slideToLoop: function(e, t, i, s) {
                void 0 === e && (e = 0),
                void 0 === t && (t = this.params.speed),
                void 0 === i && (i = !0);
                var a = e;
                return this.params.loop && (a += this.loopedSlides),
                    this.slideTo(a, t, i, s)
            },
            slideNext: function(e, t, i) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
                var s = this.params
                    , a = this.animating
                    , r = this.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
                if (s.loop) {
                    if (a && s.loopPreventsSlide)
                        return !1;
                    this.loopFix(),
                        this._clientLeft = this.$wrapperEl[0].clientLeft
                }
                return this.slideTo(this.activeIndex + r, e, t, i)
            },
            slidePrev: function(e, t, i) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0);
                var s = this.params
                    , a = this.animating
                    , r = this.snapGrid
                    , n = this.slidesGrid
                    , l = this.rtlTranslate;
                if (s.loop) {
                    if (a && s.loopPreventsSlide)
                        return !1;
                    this.loopFix(),
                        this._clientLeft = this.$wrapperEl[0].clientLeft
                }
                function o(e) {
                    return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
                }
                var d, h = o(l ? this.translate : -this.translate), p = r.map(function(e) {
                    return o(e)
                }), u = (r[p.indexOf(h)],
                    r[p.indexOf(h) - 1]);
                return void 0 === u && s.cssMode && r.forEach(function(e) {
                    !u && h >= e && (u = e)
                }),
                void 0 !== u && (d = n.indexOf(u)) < 0 && (d = this.activeIndex - 1),
                    this.slideTo(d, e, t, i)
            },
            slideReset: function(e, t, i) {
                return void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                    this.slideTo(this.activeIndex, e, t, i)
            },
            slideToClosest: function(e, t, i, s) {
                void 0 === e && (e = this.params.speed),
                void 0 === t && (t = !0),
                void 0 === s && (s = .5);
                var a = this.activeIndex
                    , r = Math.min(this.params.slidesPerGroupSkip, a)
                    , n = r + Math.floor((a - r) / this.params.slidesPerGroup)
                    , l = this.rtlTranslate ? this.translate : -this.translate;
                if (l >= this.snapGrid[n]) {
                    var o = this.snapGrid[n];
                    l - o > (this.snapGrid[n + 1] - o) * s && (a += this.params.slidesPerGroup)
                } else {
                    var d = this.snapGrid[n - 1];
                    l - d <= (this.snapGrid[n] - d) * s && (a -= this.params.slidesPerGroup)
                }
                return a = Math.max(a, 0),
                    a = Math.min(a, this.slidesGrid.length - 1),
                    this.slideTo(a, e, t, i)
            },
            slideToClickedSlide: function() {
                var e, t = this, i = t.params, s = t.$wrapperEl, a = "auto" === i.slidesPerView ? t.slidesPerViewDynamic() : i.slidesPerView, r = t.clickedIndex;
                if (i.loop) {
                    if (t.animating)
                        return;
                    e = parseInt(f(t.clickedSlide).attr("data-swiper-slide-index"), 10),
                        i.centeredSlides ? r < t.loopedSlides - a / 2 || r > t.slides.length - t.loopedSlides + a / 2 ? (t.loopFix(),
                            r = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(),
                            b(function() {
                                t.slideTo(r)
                            })) : t.slideTo(r) : r > t.slides.length - a ? (t.loopFix(),
                            r = s.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + i.slideDuplicateClass + ")").eq(0).index(),
                            b(function() {
                                t.slideTo(r)
                            })) : t.slideTo(r)
                } else
                    t.slideTo(r)
            }
        },
        loop: {
            loopCreate: function() {
                var e = this
                    , t = r()
                    , i = e.params
                    , s = e.$wrapperEl;
                s.children("." + i.slideClass + "." + i.slideDuplicateClass).remove();
                var a = s.children("." + i.slideClass);
                if (i.loopFillGroupWithBlank) {
                    var n = i.slidesPerGroup - a.length % i.slidesPerGroup;
                    if (n !== i.slidesPerGroup) {
                        for (var l = 0; l < n; l += 1) {
                            var o = f(t.createElement("div")).addClass(i.slideClass + " " + i.slideBlankClass);
                            s.append(o)
                        }
                        a = s.children("." + i.slideClass)
                    }
                }
                "auto" !== i.slidesPerView || i.loopedSlides || (i.loopedSlides = a.length),
                    e.loopedSlides = Math.ceil(parseFloat(i.loopedSlides || i.slidesPerView, 10)),
                    e.loopedSlides += i.loopAdditionalSlides,
                e.loopedSlides > a.length && (e.loopedSlides = a.length);
                var d = []
                    , h = [];
                a.each(function(t, i) {
                    var s = f(t);
                    i < e.loopedSlides && h.push(t),
                    i < a.length && i >= a.length - e.loopedSlides && d.push(t),
                        s.attr("data-swiper-slide-index", i)
                });
                for (var p = 0; p < h.length; p += 1)
                    s.append(f(h[p].cloneNode(!0)).addClass(i.slideDuplicateClass));
                for (var u = d.length - 1; u >= 0; u -= 1)
                    s.prepend(f(d[u].cloneNode(!0)).addClass(i.slideDuplicateClass))
            },
            loopFix: function() {
                this.emit("beforeLoopFix");
                var e, t = this.activeIndex, i = this.slides, s = this.loopedSlides, a = this.allowSlidePrev, r = this.allowSlideNext, n = this.snapGrid, l = this.rtlTranslate;
                this.allowSlidePrev = !0,
                    this.allowSlideNext = !0;
                var o = -n[t] - this.getTranslate();
                t < s ? (e = i.length - 3 * s + t,
                    e += s,
                this.slideTo(e, 0, !1, !0) && 0 !== o && this.setTranslate((l ? -this.translate : this.translate) - o)) : t >= i.length - s && (e = -i.length + t + s,
                    e += s,
                this.slideTo(e, 0, !1, !0) && 0 !== o && this.setTranslate((l ? -this.translate : this.translate) - o)),
                    this.allowSlidePrev = a,
                    this.allowSlideNext = r,
                    this.emit("loopFix")
            },
            loopDestroy: function() {
                var e = this.$wrapperEl
                    , t = this.params
                    , i = this.slides;
                e.children("." + t.slideClass + "." + t.slideDuplicateClass + ",." + t.slideClass + "." + t.slideBlankClass).remove(),
                    i.removeAttr("data-swiper-slide-index")
            }
        },
        grabCursor: {
            setGrabCursor: function(e) {
                if (!(this.support.touch || !this.params.simulateTouch || this.params.watchOverflow && this.isLocked || this.params.cssMode)) {
                    var t = this.el;
                    t.style.cursor = "move",
                        t.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab",
                        t.style.cursor = e ? "-moz-grabbin" : "-moz-grab",
                        t.style.cursor = e ? "grabbing" : "grab"
                }
            },
            unsetGrabCursor: function() {
                this.support.touch || this.params.watchOverflow && this.isLocked || this.params.cssMode || (this.el.style.cursor = "")
            }
        },
        manipulation: {
            appendSlide: function(e) {
                var t = this.$wrapperEl
                    , i = this.params;
                if (i.loop && this.loopDestroy(),
                "object" == typeof e && "length"in e)
                    for (var s = 0; s < e.length; s += 1)
                        e[s] && t.append(e[s]);
                else
                    t.append(e);
                i.loop && this.loopCreate(),
                i.observer && this.support.observer || this.update()
            },
            prependSlide: function(e) {
                var t = this.params
                    , i = this.$wrapperEl
                    , s = this.activeIndex;
                t.loop && this.loopDestroy();
                var a = s + 1;
                if ("object" == typeof e && "length"in e) {
                    for (var r = 0; r < e.length; r += 1)
                        e[r] && i.prepend(e[r]);
                    a = s + e.length
                } else
                    i.prepend(e);
                t.loop && this.loopCreate(),
                t.observer && this.support.observer || this.update(),
                    this.slideTo(a, 0, !1)
            },
            addSlide: function(e, t) {
                var i = this.$wrapperEl
                    , s = this.params
                    , a = this.activeIndex;
                s.loop && (a -= this.loopedSlides,
                    this.loopDestroy(),
                    this.slides = i.children("." + s.slideClass));
                var r = this.slides.length;
                if (e <= 0)
                    this.prependSlide(t);
                else if (e >= r)
                    this.appendSlide(t);
                else {
                    for (var n = a > e ? a + 1 : a, l = [], o = r - 1; o >= e; o -= 1) {
                        var d = this.slides.eq(o);
                        d.remove(),
                            l.unshift(d)
                    }
                    if ("object" == typeof t && "length"in t) {
                        for (var h = 0; h < t.length; h += 1)
                            t[h] && i.append(t[h]);
                        n = a > e ? a + t.length : a
                    } else
                        i.append(t);
                    for (var p = 0; p < l.length; p += 1)
                        i.append(l[p]);
                    s.loop && this.loopCreate(),
                    s.observer && this.support.observer || this.update(),
                        s.loop ? this.slideTo(n + this.loopedSlides, 0, !1) : this.slideTo(n, 0, !1)
                }
            },
            removeSlide: function(e) {
                var t = this.params
                    , i = this.$wrapperEl
                    , s = this.activeIndex;
                t.loop && (s -= this.loopedSlides,
                    this.loopDestroy(),
                    this.slides = i.children("." + t.slideClass));
                var a, r = s;
                if ("object" == typeof e && "length"in e) {
                    for (var n = 0; n < e.length; n += 1)
                        a = e[n],
                        this.slides[a] && this.slides.eq(a).remove(),
                        a < r && (r -= 1);
                    r = Math.max(r, 0)
                } else
                    a = e,
                    this.slides[a] && this.slides.eq(a).remove(),
                    a < r && (r -= 1),
                        r = Math.max(r, 0);
                t.loop && this.loopCreate(),
                t.observer && this.support.observer || this.update(),
                    t.loop ? this.slideTo(r + this.loopedSlides, 0, !1) : this.slideTo(r, 0, !1)
            },
            removeAllSlides: function() {
                for (var e = [], t = 0; t < this.slides.length; t += 1)
                    e.push(t);
                this.removeSlide(e)
            }
        },
        events: {
            attachEvents: function() {
                var e = r()
                    , t = this.params
                    , i = this.touchEvents
                    , s = this.el
                    , a = this.wrapperEl
                    , n = this.device
                    , l = this.support;
                this.onTouchStart = I.bind(this),
                    this.onTouchMove = function(e) {
                        var t = r()
                            , i = this.touchEventsData
                            , s = this.params
                            , a = this.touches
                            , n = this.rtlTranslate
                            , l = e;
                        if (l.originalEvent && (l = l.originalEvent),
                            i.isTouched) {
                            if (!i.isTouchEvent || "touchmove" === l.type) {
                                var o = "touchmove" === l.type && l.targetTouches && (l.targetTouches[0] || l.changedTouches[0])
                                    , d = "touchmove" === l.type ? o.pageX : l.pageX
                                    , h = "touchmove" === l.type ? o.pageY : l.pageY;
                                if (l.preventedByNestedSwiper)
                                    return a.startX = d,
                                        void (a.startY = h);
                                if (!this.allowTouchMove)
                                    return this.allowClick = !1,
                                        void (i.isTouched && (C(a, {
                                            startX: d,
                                            startY: h,
                                            currentX: d,
                                            currentY: h
                                        }),
                                            i.touchStartTime = E()));
                                if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
                                    if (this.isVertical()) {
                                        if (h < a.startY && this.translate <= this.maxTranslate() || h > a.startY && this.translate >= this.minTranslate())
                                            return i.isTouched = !1,
                                                void (i.isMoved = !1)
                                    } else if (d < a.startX && this.translate <= this.maxTranslate() || d > a.startX && this.translate >= this.minTranslate())
                                        return;
                                if (i.isTouchEvent && t.activeElement && l.target === t.activeElement && f(l.target).is(i.formElements))
                                    return i.isMoved = !0,
                                        void (this.allowClick = !1);
                                if (i.allowTouchCallbacks && this.emit("touchMove", l),
                                    !(l.targetTouches && l.targetTouches.length > 1)) {
                                    a.currentX = d,
                                        a.currentY = h;
                                    var p, u = a.currentX - a.startX, c = a.currentY - a.startY;
                                    if (!(this.params.threshold && Math.sqrt(Math.pow(u, 2) + Math.pow(c, 2)) < this.params.threshold))
                                        if (void 0 === i.isScrolling && (this.isHorizontal() && a.currentY === a.startY || this.isVertical() && a.currentX === a.startX ? i.isScrolling = !1 : u * u + c * c >= 25 && (p = 180 * Math.atan2(Math.abs(c), Math.abs(u)) / Math.PI,
                                            i.isScrolling = this.isHorizontal() ? p > s.touchAngle : 90 - p > s.touchAngle)),
                                        i.isScrolling && this.emit("touchMoveOpposite", l),
                                        void 0 === i.startMoving && (a.currentX === a.startX && a.currentY === a.startY || (i.startMoving = !0)),
                                            i.isScrolling)
                                            i.isTouched = !1;
                                        else if (i.startMoving) {
                                            this.allowClick = !1,
                                            !s.cssMode && l.cancelable && l.preventDefault(),
                                            s.touchMoveStopPropagation && !s.nested && l.stopPropagation(),
                                            i.isMoved || (s.loop && this.loopFix(),
                                                i.startTranslate = this.getTranslate(),
                                                this.setTransition(0),
                                            this.animating && this.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
                                                i.allowMomentumBounce = !1,
                                            !s.grabCursor || !0 !== this.allowSlideNext && !0 !== this.allowSlidePrev || this.setGrabCursor(!0),
                                                this.emit("sliderFirstMove", l)),
                                                this.emit("sliderMove", l),
                                                i.isMoved = !0;
                                            var v = this.isHorizontal() ? u : c;
                                            a.diff = v,
                                                v *= s.touchRatio,
                                            n && (v = -v),
                                                this.swipeDirection = v > 0 ? "prev" : "next",
                                                i.currentTranslate = v + i.startTranslate;
                                            var m = !0
                                                , g = s.resistanceRatio;
                                            if (s.touchReleaseOnEdges && (g = 0),
                                                v > 0 && i.currentTranslate > this.minTranslate() ? (m = !1,
                                                s.resistance && (i.currentTranslate = this.minTranslate() - 1 + Math.pow(-this.minTranslate() + i.startTranslate + v, g))) : v < 0 && i.currentTranslate < this.maxTranslate() && (m = !1,
                                                s.resistance && (i.currentTranslate = this.maxTranslate() + 1 - Math.pow(this.maxTranslate() - i.startTranslate - v, g))),
                                            m && (l.preventedByNestedSwiper = !0),
                                            !this.allowSlideNext && "next" === this.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate),
                                            !this.allowSlidePrev && "prev" === this.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate),
                                            s.threshold > 0) {
                                                if (!(Math.abs(v) > s.threshold || i.allowThresholdMove))
                                                    return void (i.currentTranslate = i.startTranslate);
                                                if (!i.allowThresholdMove)
                                                    return i.allowThresholdMove = !0,
                                                        a.startX = a.currentX,
                                                        a.startY = a.currentY,
                                                        i.currentTranslate = i.startTranslate,
                                                        void (a.diff = this.isHorizontal() ? a.currentX - a.startX : a.currentY - a.startY)
                                            }
                                            s.followFinger && !s.cssMode && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (this.updateActiveIndex(),
                                                this.updateSlidesClasses()),
                                            s.freeMode && (0 === i.velocities.length && i.velocities.push({
                                                position: a[this.isHorizontal() ? "startX" : "startY"],
                                                time: i.touchStartTime
                                            }),
                                                i.velocities.push({
                                                    position: a[this.isHorizontal() ? "currentX" : "currentY"],
                                                    time: E()
                                                })),
                                                this.updateProgress(i.currentTranslate),
                                                this.setTranslate(i.currentTranslate))
                                        }
                                }
                            }
                        } else
                            i.startMoving && i.isScrolling && this.emit("touchMoveOpposite", l)
                    }
                        .bind(this),
                    this.onTouchEnd = function(e) {
                        var t = this
                            , i = t.touchEventsData
                            , s = t.params
                            , a = t.touches
                            , r = t.rtlTranslate
                            , n = t.$wrapperEl
                            , l = t.slidesGrid
                            , o = t.snapGrid
                            , d = e;
                        if (d.originalEvent && (d = d.originalEvent),
                        i.allowTouchCallbacks && t.emit("touchEnd", d),
                            i.allowTouchCallbacks = !1,
                            !i.isTouched)
                            return i.isMoved && s.grabCursor && t.setGrabCursor(!1),
                                i.isMoved = !1,
                                void (i.startMoving = !1);
                        s.grabCursor && i.isMoved && i.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
                        var h, p = E(), u = p - i.touchStartTime;
                        if (t.allowClick && (t.updateClickedSlide(d),
                            t.emit("tap click", d),
                        u < 300 && p - i.lastClickTime < 300 && t.emit("doubleTap doubleClick", d)),
                            i.lastClickTime = E(),
                            b(function() {
                                t.destroyed || (t.allowClick = !0)
                            }),
                        !i.isTouched || !i.isMoved || !t.swipeDirection || 0 === a.diff || i.currentTranslate === i.startTranslate)
                            return i.isTouched = !1,
                                i.isMoved = !1,
                                void (i.startMoving = !1);
                        if (i.isTouched = !1,
                            i.isMoved = !1,
                            i.startMoving = !1,
                            h = s.followFinger ? r ? t.translate : -t.translate : -i.currentTranslate,
                            !s.cssMode)
                            if (s.freeMode) {
                                if (h < -t.minTranslate())
                                    return void t.slideTo(t.activeIndex);
                                if (h > -t.maxTranslate())
                                    return void (t.slides.length < o.length ? t.slideTo(o.length - 1) : t.slideTo(t.slides.length - 1));
                                if (s.freeModeMomentum) {
                                    if (i.velocities.length > 1) {
                                        var c = i.velocities.pop()
                                            , v = i.velocities.pop()
                                            , f = c.position - v.position
                                            , m = c.time - v.time;
                                        t.velocity = f / m,
                                            t.velocity /= 2,
                                        Math.abs(t.velocity) < s.freeModeMinimumVelocity && (t.velocity = 0),
                                        (m > 150 || E() - c.time > 300) && (t.velocity = 0)
                                    } else
                                        t.velocity = 0;
                                    t.velocity *= s.freeModeMomentumVelocityRatio,
                                        i.velocities.length = 0;
                                    var g = 1e3 * s.freeModeMomentumRatio
                                        , w = t.velocity * g
                                        , y = t.translate + w;
                                    r && (y = -y);
                                    var x, T, C = !1, S = 20 * Math.abs(t.velocity) * s.freeModeMomentumBounceRatio;
                                    if (y < t.maxTranslate())
                                        s.freeModeMomentumBounce ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S),
                                            x = t.maxTranslate(),
                                            C = !0,
                                            i.allowMomentumBounce = !0) : y = t.maxTranslate(),
                                        s.loop && s.centeredSlides && (T = !0);
                                    else if (y > t.minTranslate())
                                        s.freeModeMomentumBounce ? (y - t.minTranslate() > S && (y = t.minTranslate() + S),
                                            x = t.minTranslate(),
                                            C = !0,
                                            i.allowMomentumBounce = !0) : y = t.minTranslate(),
                                        s.loop && s.centeredSlides && (T = !0);
                                    else if (s.freeModeSticky) {
                                        for (var M, z = 0; z < o.length; z += 1)
                                            if (o[z] > -y) {
                                                M = z;
                                                break
                                            }
                                        y = -(y = Math.abs(o[M] - y) < Math.abs(o[M - 1] - y) || "next" === t.swipeDirection ? o[M] : o[M - 1])
                                    }
                                    if (T && t.once("transitionEnd", function() {
                                        t.loopFix()
                                    }),
                                    0 !== t.velocity) {
                                        if (g = r ? Math.abs((-y - t.translate) / t.velocity) : Math.abs((y - t.translate) / t.velocity),
                                            s.freeModeSticky) {
                                            var P = Math.abs((r ? -y : y) - t.translate)
                                                , k = t.slidesSizesGrid[t.activeIndex];
                                            g = P < k ? s.speed : P < 2 * k ? 1.5 * s.speed : 2.5 * s.speed
                                        }
                                    } else if (s.freeModeSticky)
                                        return void t.slideToClosest();
                                    s.freeModeMomentumBounce && C ? (t.updateProgress(x),
                                        t.setTransition(g),
                                        t.setTranslate(y),
                                        t.transitionStart(!0, t.swipeDirection),
                                        t.animating = !0,
                                        n.transitionEnd(function() {
                                            t && !t.destroyed && i.allowMomentumBounce && (t.emit("momentumBounce"),
                                                t.setTransition(s.speed),
                                                setTimeout(function() {
                                                    t.setTranslate(x),
                                                        n.transitionEnd(function() {
                                                            t && !t.destroyed && t.transitionEnd()
                                                        })
                                                }, 0))
                                        })) : t.velocity ? (t.updateProgress(y),
                                        t.setTransition(g),
                                        t.setTranslate(y),
                                        t.transitionStart(!0, t.swipeDirection),
                                    t.animating || (t.animating = !0,
                                        n.transitionEnd(function() {
                                            t && !t.destroyed && t.transitionEnd()
                                        }))) : t.updateProgress(y),
                                        t.updateActiveIndex(),
                                        t.updateSlidesClasses()
                                } else if (s.freeModeSticky)
                                    return void t.slideToClosest();
                                (!s.freeModeMomentum || u >= s.longSwipesMs) && (t.updateProgress(),
                                    t.updateActiveIndex(),
                                    t.updateSlidesClasses())
                            } else {
                                for (var $ = 0, L = t.slidesSizesGrid[0], I = 0; I < l.length; I += I < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup) {
                                    var O = I < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                                    void 0 !== l[I + O] ? h >= l[I] && h < l[I + O] && ($ = I,
                                        L = l[I + O] - l[I]) : h >= l[I] && ($ = I,
                                        L = l[l.length - 1] - l[l.length - 2])
                                }
                                var A = (h - l[$]) / L
                                    , D = $ < s.slidesPerGroupSkip - 1 ? 1 : s.slidesPerGroup;
                                if (u > s.longSwipesMs) {
                                    if (!s.longSwipes)
                                        return void t.slideTo(t.activeIndex);
                                    "next" === t.swipeDirection && (A >= s.longSwipesRatio ? t.slideTo($ + D) : t.slideTo($)),
                                    "prev" === t.swipeDirection && (A > 1 - s.longSwipesRatio ? t.slideTo($ + D) : t.slideTo($))
                                } else {
                                    if (!s.shortSwipes)
                                        return void t.slideTo(t.activeIndex);
                                    !t.navigation || d.target !== t.navigation.nextEl && d.target !== t.navigation.prevEl ? ("next" === t.swipeDirection && t.slideTo($ + D),
                                    "prev" === t.swipeDirection && t.slideTo($)) : d.target === t.navigation.nextEl ? t.slideTo($ + D) : t.slideTo($)
                                }
                            }
                    }
                        .bind(this),
                t.cssMode && (this.onScroll = function() {
                    var e = this.wrapperEl
                        , t = this.rtlTranslate;
                    this.previousTranslate = this.translate,
                        this.isHorizontal() ? this.translate = t ? e.scrollWidth - e.offsetWidth - e.scrollLeft : -e.scrollLeft : this.translate = -e.scrollTop,
                    -0 === this.translate && (this.translate = 0),
                        this.updateActiveIndex(),
                        this.updateSlidesClasses();
                    var i = this.maxTranslate() - this.minTranslate();
                    (0 === i ? 0 : (this.translate - this.minTranslate()) / i) !== this.progress && this.updateProgress(t ? -this.translate : this.translate),
                        this.emit("setTranslate", this.translate, !1)
                }
                    .bind(this)),
                    this.onClick = function(e) {
                        this.allowClick || (this.params.preventClicks && e.preventDefault(),
                        this.params.preventClicksPropagation && this.animating && (e.stopPropagation(),
                            e.stopImmediatePropagation()))
                    }
                        .bind(this);
                var o = !!t.nested;
                if (!l.touch && l.pointerEvents)
                    s.addEventListener(i.start, this.onTouchStart, !1),
                        e.addEventListener(i.move, this.onTouchMove, o),
                        e.addEventListener(i.end, this.onTouchEnd, !1);
                else {
                    if (l.touch) {
                        var d = !("touchstart" !== i.start || !l.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.addEventListener(i.start, this.onTouchStart, d),
                            s.addEventListener(i.move, this.onTouchMove, l.passiveListener ? {
                                passive: !1,
                                capture: o
                            } : o),
                            s.addEventListener(i.end, this.onTouchEnd, d),
                        i.cancel && s.addEventListener(i.cancel, this.onTouchEnd, d),
                        A || (e.addEventListener("touchstart", D),
                            A = !0)
                    }
                    (t.simulateTouch && !n.ios && !n.android || t.simulateTouch && !l.touch && n.ios) && (s.addEventListener("mousedown", this.onTouchStart, !1),
                        e.addEventListener("mousemove", this.onTouchMove, o),
                        e.addEventListener("mouseup", this.onTouchEnd, !1))
                }
                (t.preventClicks || t.preventClicksPropagation) && s.addEventListener("click", this.onClick, !0),
                t.cssMode && a.addEventListener("scroll", this.onScroll),
                    t.updateOnWindowResize ? this.on(n.ios || n.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", O, !0) : this.on("observerUpdate", O, !0)
            },
            detachEvents: function() {
                var e = r()
                    , t = this.params
                    , i = this.touchEvents
                    , s = this.el
                    , a = this.wrapperEl
                    , n = this.device
                    , l = this.support
                    , o = !!t.nested;
                if (!l.touch && l.pointerEvents)
                    s.removeEventListener(i.start, this.onTouchStart, !1),
                        e.removeEventListener(i.move, this.onTouchMove, o),
                        e.removeEventListener(i.end, this.onTouchEnd, !1);
                else {
                    if (l.touch) {
                        var d = !("onTouchStart" !== i.start || !l.passiveListener || !t.passiveListeners) && {
                            passive: !0,
                            capture: !1
                        };
                        s.removeEventListener(i.start, this.onTouchStart, d),
                            s.removeEventListener(i.move, this.onTouchMove, o),
                            s.removeEventListener(i.end, this.onTouchEnd, d),
                        i.cancel && s.removeEventListener(i.cancel, this.onTouchEnd, d)
                    }
                    (t.simulateTouch && !n.ios && !n.android || t.simulateTouch && !l.touch && n.ios) && (s.removeEventListener("mousedown", this.onTouchStart, !1),
                        e.removeEventListener("mousemove", this.onTouchMove, o),
                        e.removeEventListener("mouseup", this.onTouchEnd, !1))
                }
                (t.preventClicks || t.preventClicksPropagation) && s.removeEventListener("click", this.onClick, !0),
                t.cssMode && a.removeEventListener("scroll", this.onScroll),
                    this.off(n.ios || n.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", O)
            }
        },
        breakpoints: {
            setBreakpoint: function() {
                var e = this.activeIndex
                    , t = this.initialized
                    , i = this.loopedSlides
                    , s = void 0 === i ? 0 : i
                    , a = this.params
                    , r = this.$el
                    , n = a.breakpoints;
                if (n && (!n || 0 !== Object.keys(n).length)) {
                    var l = this.getBreakpoint(n);
                    if (l && this.currentBreakpoint !== l) {
                        var o = l in n ? n[l] : void 0;
                        o && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach(function(e) {
                            var t = o[e];
                            void 0 !== t && (o[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
                        });
                        var d = o || this.originalParams
                            , h = a.slidesPerColumn > 1
                            , p = d.slidesPerColumn > 1;
                        h && !p ? (r.removeClass(a.containerModifierClass + "multirow " + a.containerModifierClass + "multirow-column"),
                            this.emitContainerClasses()) : !h && p && (r.addClass(a.containerModifierClass + "multirow"),
                        "column" === d.slidesPerColumnFill && r.addClass(a.containerModifierClass + "multirow-column"),
                            this.emitContainerClasses());
                        var u = d.direction && d.direction !== a.direction
                            , c = a.loop && (d.slidesPerView !== a.slidesPerView || u);
                        u && t && this.changeDirection(),
                            C(this.params, d),
                            C(this, {
                                allowTouchMove: this.params.allowTouchMove,
                                allowSlideNext: this.params.allowSlideNext,
                                allowSlidePrev: this.params.allowSlidePrev
                            }),
                            this.currentBreakpoint = l,
                            this.emit("_beforeBreakpoint", d),
                        c && t && (this.loopDestroy(),
                            this.loopCreate(),
                            this.updateSlides(),
                            this.slideTo(e - s + this.loopedSlides, 0, !1)),
                            this.emit("breakpoint", d)
                    }
                }
            },
            getBreakpoint: function(e) {
                var t = l();
                if (e) {
                    var i = !1
                        , s = Object.keys(e).map(function(e) {
                        if ("string" == typeof e && 0 === e.indexOf("@")) {
                            var i = parseFloat(e.substr(1));
                            return {
                                value: t.innerHeight * i,
                                point: e
                            }
                        }
                        return {
                            value: e,
                            point: e
                        }
                    });
                    s.sort(function(e, t) {
                        return parseInt(e.value, 10) - parseInt(t.value, 10)
                    });
                    for (var a = 0; a < s.length; a += 1) {
                        var r = s[a]
                            , n = r.point;
                        r.value <= t.innerWidth && (i = n)
                    }
                    return i || "max"
                }
            }
        },
        checkOverflow: {
            checkOverflow: function() {
                var e = this.params
                    , t = this.isLocked
                    , i = this.slides.length > 0 && e.slidesOffsetBefore + e.spaceBetween * (this.slides.length - 1) + this.slides[0].offsetWidth * this.slides.length;
                e.slidesOffsetBefore && e.slidesOffsetAfter && i ? this.isLocked = i <= this.size : this.isLocked = 1 === this.snapGrid.length,
                    this.allowSlideNext = !this.isLocked,
                    this.allowSlidePrev = !this.isLocked,
                t !== this.isLocked && this.emit(this.isLocked ? "lock" : "unlock"),
                t && t !== this.isLocked && (this.isEnd = !1,
                this.navigation && this.navigation.update())
            }
        },
        classes: {
            addClasses: function() {
                var e = this.classNames
                    , t = this.params
                    , i = this.rtl
                    , s = this.$el
                    , a = this.device
                    , r = [];
                r.push("initialized"),
                    r.push(t.direction),
                t.freeMode && r.push("free-mode"),
                t.autoHeight && r.push("autoheight"),
                i && r.push("rtl"),
                t.slidesPerColumn > 1 && (r.push("multirow"),
                "column" === t.slidesPerColumnFill && r.push("multirow-column")),
                a.android && r.push("android"),
                a.ios && r.push("ios"),
                t.cssMode && r.push("css-mode"),
                    r.forEach(function(i) {
                        e.push(t.containerModifierClass + i)
                    }),
                    s.addClass(e.join(" ")),
                    this.emitContainerClasses()
            },
            removeClasses: function() {
                var e = this.$el
                    , t = this.classNames;
                e.removeClass(t.join(" ")),
                    this.emitContainerClasses()
            }
        },
        images: {
            loadImage: function(e, t, i, s, a, r) {
                var n, o = l();
                function d() {
                    r && r()
                }
                f(e).parent("picture")[0] || e.complete && a ? d() : t ? ((n = new o.Image).onload = d,
                    n.onerror = d,
                s && (n.sizes = s),
                i && (n.srcset = i),
                t && (n.src = t)) : d()
            },
            preloadImages: function() {
                var e = this;
                function t() {
                    null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
                    e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(),
                        e.emit("imagesReady")))
                }
                e.imagesToLoad = e.$el.find("img");
                for (var i = 0; i < e.imagesToLoad.length; i += 1) {
                    var s = e.imagesToLoad[i];
                    e.loadImage(s, s.currentSrc || s.getAttribute("src"), s.srcset || s.getAttribute("srcset"), s.sizes || s.getAttribute("sizes"), !0, t)
                }
            }
        }
    }
        , B = {}
        , H = function() {
        function t() {
            for (var e, i, s = arguments.length, a = new Array(s), r = 0; r < s; r++)
                a[r] = arguments[r];
            1 === a.length && a[0].constructor && a[0].constructor === Object ? i = a[0] : (e = a[0],
                i = a[1]),
            i || (i = {}),
                i = C({}, i),
            e && !i.el && (i.el = e);
            var n = this;
            n.support = M(),
                n.device = z({
                    userAgent: i.userAgent
                }),
                n.browser = P(),
                n.eventsListeners = {},
                n.eventsAnyListeners = [],
            void 0 === n.modules && (n.modules = {}),
                Object.keys(n.modules).forEach(function(e) {
                    var t = n.modules[e];
                    if (t.params) {
                        var s = Object.keys(t.params)[0]
                            , a = t.params[s];
                        if ("object" != typeof a || null === a)
                            return;
                        if (!(s in i && "enabled"in a))
                            return;
                        !0 === i[s] && (i[s] = {
                            enabled: !0
                        }),
                        "object" != typeof i[s] || "enabled"in i[s] || (i[s].enabled = !0),
                        i[s] || (i[s] = {
                            enabled: !1
                        })
                    }
                });
            var l = C({}, G);
            n.useParams(l),
                n.params = C({}, l, B, i),
                n.originalParams = C({}, n.params),
                n.passedParams = C({}, i),
            n.params && n.params.on && Object.keys(n.params.on).forEach(function(e) {
                n.on(e, n.params.on[e])
            }),
            n.params && n.params.onAny && n.onAny(n.params.onAny),
                n.$ = f;
            var o = f(n.params.el);
            if (e = o[0]) {
                if (o.length > 1) {
                    var d = [];
                    return o.each(function(e) {
                        var s = C({}, i, {
                            el: e
                        });
                        d.push(new t(s))
                    }),
                        d
                }
                var h, p, u;
                return e.swiper = n,
                    e && e.shadowRoot && e.shadowRoot.querySelector ? (h = f(e.shadowRoot.querySelector("." + n.params.wrapperClass))).children = function(e) {
                            return o.children(e)
                        }
                        : h = o.children("." + n.params.wrapperClass),
                    C(n, {
                        $el: o,
                        el: e,
                        $wrapperEl: h,
                        wrapperEl: h[0],
                        classNames: [],
                        slides: f(),
                        slidesGrid: [],
                        snapGrid: [],
                        slidesSizesGrid: [],
                        isHorizontal: function() {
                            return "horizontal" === n.params.direction
                        },
                        isVertical: function() {
                            return "vertical" === n.params.direction
                        },
                        rtl: "rtl" === e.dir.toLowerCase() || "rtl" === o.css("direction"),
                        rtlTranslate: "horizontal" === n.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === o.css("direction")),
                        wrongRTL: "-webkit-box" === h.css("display"),
                        activeIndex: 0,
                        realIndex: 0,
                        isBeginning: !0,
                        isEnd: !1,
                        translate: 0,
                        previousTranslate: 0,
                        progress: 0,
                        velocity: 0,
                        animating: !1,
                        allowSlideNext: n.params.allowSlideNext,
                        allowSlidePrev: n.params.allowSlidePrev,
                        touchEvents: (p = ["touchstart", "touchmove", "touchend", "touchcancel"],
                            u = ["mousedown", "mousemove", "mouseup"],
                        n.support.pointerEvents && (u = ["pointerdown", "pointermove", "pointerup"]),
                            n.touchEventsTouch = {
                                start: p[0],
                                move: p[1],
                                end: p[2],
                                cancel: p[3]
                            },
                            n.touchEventsDesktop = {
                                start: u[0],
                                move: u[1],
                                end: u[2]
                            },
                            n.support.touch || !n.params.simulateTouch ? n.touchEventsTouch : n.touchEventsDesktop),
                        touchEventsData: {
                            isTouched: void 0,
                            isMoved: void 0,
                            allowTouchCallbacks: void 0,
                            touchStartTime: void 0,
                            isScrolling: void 0,
                            currentTranslate: void 0,
                            startTranslate: void 0,
                            allowThresholdMove: void 0,
                            formElements: "input, select, option, textarea, button, video, label",
                            lastClickTime: E(),
                            clickTimeout: void 0,
                            velocities: [],
                            allowMomentumBounce: void 0,
                            isTouchEvent: void 0,
                            startMoving: void 0
                        },
                        allowClick: !0,
                        allowTouchMove: n.params.allowTouchMove,
                        touches: {
                            startX: 0,
                            startY: 0,
                            currentX: 0,
                            currentY: 0,
                            diff: 0
                        },
                        imagesToLoad: [],
                        imagesLoaded: 0
                    }),
                    n.useModules(),
                    n.emit("_swiper"),
                n.params.init && n.init(),
                    n
            }
        }
        var i, s, a = t.prototype;
        return a.emitContainerClasses = function() {
            var e = this;
            if (e.params._emitClasses && e.el) {
                var t = e.el.className.split(" ").filter(function(t) {
                    return 0 === t.indexOf("swiper-container") || 0 === t.indexOf(e.params.containerModifierClass)
                });
                e.emit("_containerClasses", t.join(" "))
            }
        }
            ,
            a.getSlideClasses = function(e) {
                var t = this;
                return e.className.split(" ").filter(function(e) {
                    return 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)
                }).join(" ")
            }
            ,
            a.emitSlidesClasses = function() {
                var e = this;
                e.params._emitClasses && e.el && e.slides.each(function(t) {
                    var i = e.getSlideClasses(t);
                    e.emit("_slideClass", t, i)
                })
            }
            ,
            a.slidesPerViewDynamic = function() {
                var e = this.params
                    , t = this.slides
                    , i = this.slidesGrid
                    , s = this.size
                    , a = this.activeIndex
                    , r = 1;
                if (e.centeredSlides) {
                    for (var n, l = t[a].swiperSlideSize, o = a + 1; o < t.length; o += 1)
                        t[o] && !n && (r += 1,
                        (l += t[o].swiperSlideSize) > s && (n = !0));
                    for (var d = a - 1; d >= 0; d -= 1)
                        t[d] && !n && (r += 1,
                        (l += t[d].swiperSlideSize) > s && (n = !0))
                } else
                    for (var h = a + 1; h < t.length; h += 1)
                        i[h] - i[a] < s && (r += 1);
                return r
            }
            ,
            a.update = function() {
                var e = this;
                if (e && !e.destroyed) {
                    var t = e.snapGrid
                        , i = e.params;
                    i.breakpoints && e.setBreakpoint(),
                        e.updateSize(),
                        e.updateSlides(),
                        e.updateProgress(),
                        e.updateSlidesClasses(),
                        e.params.freeMode ? (s(),
                        e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || s(),
                    i.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
                        e.emit("update")
                }
                function s() {
                    var t = e.rtlTranslate ? -1 * e.translate : e.translate
                        , i = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
                    e.setTranslate(i),
                        e.updateActiveIndex(),
                        e.updateSlidesClasses()
                }
            }
            ,
            a.changeDirection = function(e, t) {
                void 0 === t && (t = !0);
                var i = this.params.direction;
                return e || (e = "horizontal" === i ? "vertical" : "horizontal"),
                e === i || "horizontal" !== e && "vertical" !== e || (this.$el.removeClass("" + this.params.containerModifierClass + i).addClass("" + this.params.containerModifierClass + e),
                    this.emitContainerClasses(),
                    this.params.direction = e,
                    this.slides.each(function(t) {
                        "vertical" === e ? t.style.width = "" : t.style.height = ""
                    }),
                    this.emit("changeDirection"),
                t && this.update()),
                    this
            }
            ,
            a.init = function() {
                this.initialized || (this.emit("beforeInit"),
                this.params.breakpoints && this.setBreakpoint(),
                    this.addClasses(),
                this.params.loop && this.loopCreate(),
                    this.updateSize(),
                    this.updateSlides(),
                this.params.watchOverflow && this.checkOverflow(),
                this.params.grabCursor && this.setGrabCursor(),
                this.params.preloadImages && this.preloadImages(),
                    this.params.loop ? this.slideTo(this.params.initialSlide + this.loopedSlides, 0, this.params.runCallbacksOnInit) : this.slideTo(this.params.initialSlide, 0, this.params.runCallbacksOnInit),
                    this.attachEvents(),
                    this.initialized = !0,
                    this.emit("init"),
                    this.emit("afterInit"))
            }
            ,
            a.destroy = function(e, t) {
                void 0 === e && (e = !0),
                void 0 === t && (t = !0);
                var i, s = this, a = s.params, r = s.$el, n = s.$wrapperEl, l = s.slides;
                return void 0 === s.params || s.destroyed || (s.emit("beforeDestroy"),
                    s.initialized = !1,
                    s.detachEvents(),
                a.loop && s.loopDestroy(),
                t && (s.removeClasses(),
                    r.removeAttr("style"),
                    n.removeAttr("style"),
                l && l.length && l.removeClass([a.slideVisibleClass, a.slideActiveClass, a.slideNextClass, a.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")),
                    s.emit("destroy"),
                    Object.keys(s.eventsListeners).forEach(function(e) {
                        s.off(e)
                    }),
                !1 !== e && (s.$el[0].swiper = null,
                    i = s,
                    Object.keys(i).forEach(function(e) {
                        try {
                            i[e] = null
                        } catch (e) {}
                        try {
                            delete i[e]
                        } catch (e) {}
                    })),
                    s.destroyed = !0),
                    null
            }
            ,
            t.extendDefaults = function(e) {
                C(B, e)
            }
            ,
            t.installModule = function(e) {
                t.prototype.modules || (t.prototype.modules = {});
                var i = e.name || Object.keys(t.prototype.modules).length + "_" + E();
                t.prototype.modules[i] = e
            }
            ,
            t.use = function(e) {
                return Array.isArray(e) ? (e.forEach(function(e) {
                    return t.installModule(e)
                }),
                    t) : (t.installModule(e),
                    t)
            }
            ,
            i = t,
            s = [{
                key: "extendedDefaults",
                get: function() {
                    return B
                }
            }, {
                key: "defaults",
                get: function() {
                    return G
                }
            }],
        null && e(i.prototype, null),
        s && e(i, s),
            t
    }();
    Object.keys(N).forEach(function(e) {
        Object.keys(N[e]).forEach(function(t) {
            H.prototype[t] = N[e][t]
        })
    }),
        H.use([k, L]);
    var X = {
        update: function(e) {
            var t = this
                , i = t.params
                , s = i.slidesPerView
                , a = i.slidesPerGroup
                , r = i.centeredSlides
                , n = t.params.virtual
                , l = n.addSlidesBefore
                , o = n.addSlidesAfter
                , d = t.virtual
                , h = d.from
                , p = d.to
                , u = d.slides
                , c = d.slidesGrid
                , v = d.renderSlide
                , f = d.offset;
            t.updateActiveIndex();
            var m, g, w, y = t.activeIndex || 0;
            m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top",
                r ? (g = Math.floor(s / 2) + a + o,
                    w = Math.floor(s / 2) + a + l) : (g = s + (a - 1) + o,
                    w = a + l);
            var b = Math.max((y || 0) - w, 0)
                , E = Math.min((y || 0) + g, u.length - 1)
                , x = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);
            function T() {
                t.updateSlides(),
                    t.updateProgress(),
                    t.updateSlidesClasses(),
                t.lazy && t.params.lazy.enabled && t.lazy.load()
            }
            if (C(t.virtual, {
                from: b,
                to: E,
                offset: x,
                slidesGrid: t.slidesGrid
            }),
            h === b && p === E && !e)
                return t.slidesGrid !== c && x !== f && t.slides.css(m, x + "px"),
                    void t.updateProgress();
            if (t.params.virtual.renderExternal)
                return t.params.virtual.renderExternal.call(t, {
                    offset: x,
                    from: b,
                    to: E,
                    slides: function() {
                        for (var e = [], t = b; t <= E; t += 1)
                            e.push(u[t]);
                        return e
                    }()
                }),
                    void (t.params.virtual.renderExternalUpdate && T());
            var S = []
                , M = [];
            if (e)
                t.$wrapperEl.find("." + t.params.slideClass).remove();
            else
                for (var z = h; z <= p; z += 1)
                    (z < b || z > E) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + z + '"]').remove();
            for (var P = 0; P < u.length; P += 1)
                P >= b && P <= E && (void 0 === p || e ? M.push(P) : (P > p && M.push(P),
                P < h && S.push(P)));
            M.forEach(function(e) {
                t.$wrapperEl.append(v(u[e], e))
            }),
                S.sort(function(e, t) {
                    return t - e
                }).forEach(function(e) {
                    t.$wrapperEl.prepend(v(u[e], e))
                }),
                t.$wrapperEl.children(".swiper-slide").css(m, x + "px"),
                T()
        },
        renderSlide: function(e, t) {
            var i = this.params.virtual;
            if (i.cache && this.virtual.cache[t])
                return this.virtual.cache[t];
            var s = i.renderSlide ? f(i.renderSlide.call(this, e, t)) : f('<div class="' + this.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
            return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t),
            i.cache && (this.virtual.cache[t] = s),
                s
        },
        appendSlide: function(e) {
            if ("object" == typeof e && "length"in e)
                for (var t = 0; t < e.length; t += 1)
                    e[t] && this.virtual.slides.push(e[t]);
            else
                this.virtual.slides.push(e);
            this.virtual.update(!0)
        },
        prependSlide: function(e) {
            var t = this.activeIndex
                , i = t + 1
                , s = 1;
            if (Array.isArray(e)) {
                for (var a = 0; a < e.length; a += 1)
                    e[a] && this.virtual.slides.unshift(e[a]);
                i = t + e.length,
                    s = e.length
            } else
                this.virtual.slides.unshift(e);
            if (this.params.virtual.cache) {
                var r = this.virtual.cache
                    , n = {};
                Object.keys(r).forEach(function(e) {
                    var t = r[e]
                        , i = t.attr("data-swiper-slide-index");
                    i && t.attr("data-swiper-slide-index", parseInt(i, 10) + 1),
                        n[parseInt(e, 10) + s] = t
                }),
                    this.virtual.cache = n
            }
            this.virtual.update(!0),
                this.slideTo(i, 0)
        },
        removeSlide: function(e) {
            if (null != e) {
                var t = this.activeIndex;
                if (Array.isArray(e))
                    for (var i = e.length - 1; i >= 0; i -= 1)
                        this.virtual.slides.splice(e[i], 1),
                        this.params.virtual.cache && delete this.virtual.cache[e[i]],
                        e[i] < t && (t -= 1),
                            t = Math.max(t, 0);
                else
                    this.virtual.slides.splice(e, 1),
                    this.params.virtual.cache && delete this.virtual.cache[e],
                    e < t && (t -= 1),
                        t = Math.max(t, 0);
                this.virtual.update(!0),
                    this.slideTo(t, 0)
            }
        },
        removeAllSlides: function() {
            this.virtual.slides = [],
            this.params.virtual.cache && (this.virtual.cache = {}),
                this.virtual.update(!0),
                this.slideTo(0, 0)
        }
    }
        , Y = {
        name: "virtual",
        params: {
            virtual: {
                enabled: !1,
                slides: [],
                cache: !0,
                renderSlide: null,
                renderExternal: null,
                renderExternalUpdate: !0,
                addSlidesBefore: 0,
                addSlidesAfter: 0
            }
        },
        create: function() {
            S(this, {
                virtual: t(t({}, X), {}, {
                    slides: this.params.virtual.slides,
                    cache: {}
                })
            })
        },
        on: {
            beforeInit: function(e) {
                if (e.params.virtual.enabled) {
                    e.classNames.push(e.params.containerModifierClass + "virtual");
                    var t = {
                        watchSlidesProgress: !0
                    };
                    C(e.params, t),
                        C(e.originalParams, t),
                    e.params.initialSlide || e.virtual.update()
                }
            },
            setTranslate: function(e) {
                e.params.virtual.enabled && e.virtual.update()
            }
        }
    }
        , V = {
        handle: function(e) {
            var t = l()
                , i = r()
                , s = this.rtlTranslate
                , a = e;
            a.originalEvent && (a = a.originalEvent);
            var n = a.keyCode || a.charCode
                , o = this.params.keyboard.pageUpDown
                , d = o && 33 === n
                , h = o && 34 === n
                , p = 37 === n
                , u = 39 === n
                , c = 38 === n
                , v = 40 === n;
            if (!this.allowSlideNext && (this.isHorizontal() && u || this.isVertical() && v || h))
                return !1;
            if (!this.allowSlidePrev && (this.isHorizontal() && p || this.isVertical() && c || d))
                return !1;
            if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || i.activeElement && i.activeElement.nodeName && ("input" === i.activeElement.nodeName.toLowerCase() || "textarea" === i.activeElement.nodeName.toLowerCase()))) {
                if (this.params.keyboard.onlyInViewport && (d || h || p || u || c || v)) {
                    var f = !1;
                    if (this.$el.parents("." + this.params.slideClass).length > 0 && 0 === this.$el.parents("." + this.params.slideActiveClass).length)
                        return;
                    var m = t.innerWidth
                        , g = t.innerHeight
                        , w = this.$el.offset();
                    s && (w.left -= this.$el[0].scrollLeft);
                    for (var y = [[w.left, w.top], [w.left + this.width, w.top], [w.left, w.top + this.height], [w.left + this.width, w.top + this.height]], b = 0; b < y.length; b += 1) {
                        var E = y[b];
                        E[0] >= 0 && E[0] <= m && E[1] >= 0 && E[1] <= g && (f = !0)
                    }
                    if (!f)
                        return
                }
                this.isHorizontal() ? ((d || h || p || u) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1),
                ((h || u) && !s || (d || p) && s) && this.slideNext(),
                ((d || p) && !s || (h || u) && s) && this.slidePrev()) : ((d || h || c || v) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1),
                (h || v) && this.slideNext(),
                (d || c) && this.slidePrev()),
                    this.emit("keyPress", n)
            }
        },
        enable: function() {
            var e = r();
            this.keyboard.enabled || (f(e).on("keydown", this.keyboard.handle),
                this.keyboard.enabled = !0)
        },
        disable: function() {
            var e = r();
            this.keyboard.enabled && (f(e).off("keydown", this.keyboard.handle),
                this.keyboard.enabled = !1)
        }
    }
        , F = {
        name: "keyboard",
        params: {
            keyboard: {
                enabled: !1,
                onlyInViewport: !0,
                pageUpDown: !0
            }
        },
        create: function() {
            S(this, {
                keyboard: t({
                    enabled: !1
                }, V)
            })
        },
        on: {
            init: function(e) {
                e.params.keyboard.enabled && e.keyboard.enable()
            },
            destroy: function(e) {
                e.keyboard.enabled && e.keyboard.disable()
            }
        }
    }
        , R = {
        lastScrollTime: E(),
        lastEventBeforeSnap: void 0,
        recentWheelEvents: [],
        event: function() {
            return l().navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
                var e = r()
                    , t = "onwheel"in e;
                if (!t) {
                    var i = e.createElement("div");
                    i.setAttribute("onwheel", "return;"),
                        t = "function" == typeof i.onwheel
                }
                return !t && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (t = e.implementation.hasFeature("Events.wheel", "3.0")),
                    t
            }() ? "wheel" : "mousewheel"
        },
        normalize: function(e) {
            var t = 0
                , i = 0
                , s = 0
                , a = 0;
            return "detail"in e && (i = e.detail),
            "wheelDelta"in e && (i = -e.wheelDelta / 120),
            "wheelDeltaY"in e && (i = -e.wheelDeltaY / 120),
            "wheelDeltaX"in e && (t = -e.wheelDeltaX / 120),
            "axis"in e && e.axis === e.HORIZONTAL_AXIS && (t = i,
                i = 0),
                s = 10 * t,
                a = 10 * i,
            "deltaY"in e && (a = e.deltaY),
            "deltaX"in e && (s = e.deltaX),
            e.shiftKey && !s && (s = a,
                a = 0),
            (s || a) && e.deltaMode && (1 === e.deltaMode ? (s *= 40,
                a *= 40) : (s *= 800,
                a *= 800)),
            s && !t && (t = s < 1 ? -1 : 1),
            a && !i && (i = a < 1 ? -1 : 1),
                {
                    spinX: t,
                    spinY: i,
                    pixelX: s,
                    pixelY: a
                }
        },
        handleMouseEnter: function() {
            this.mouseEntered = !0
        },
        handleMouseLeave: function() {
            this.mouseEntered = !1
        },
        handle: function(e) {
            var t = e
                , i = this
                , s = i.params.mousewheel;
            i.params.cssMode && t.preventDefault();
            var a = i.$el;
            if ("container" !== i.params.mousewheel.eventsTarget && (a = f(i.params.mousewheel.eventsTarget)),
            !i.mouseEntered && !a[0].contains(t.target) && !s.releaseOnEdges)
                return !0;
            t.originalEvent && (t = t.originalEvent);
            var r = 0
                , n = i.rtlTranslate ? -1 : 1
                , l = R.normalize(t);
            if (s.forceToAxis)
                if (i.isHorizontal()) {
                    if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY)))
                        return !0;
                    r = -l.pixelX * n
                } else {
                    if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX)))
                        return !0;
                    r = -l.pixelY
                }
            else
                r = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * n : -l.pixelY;
            if (0 === r)
                return !0;
            if (s.invert && (r = -r),
                i.params.freeMode) {
                var o = {
                    time: E(),
                    delta: Math.abs(r),
                    direction: Math.sign(r)
                }
                    , d = i.mousewheel.lastEventBeforeSnap
                    , h = d && o.time < d.time + 500 && o.delta <= d.delta && o.direction === d.direction;
                if (!h) {
                    i.mousewheel.lastEventBeforeSnap = void 0,
                    i.params.loop && i.loopFix();
                    var p = i.getTranslate() + r * s.sensitivity
                        , u = i.isBeginning
                        , c = i.isEnd;
                    if (p >= i.minTranslate() && (p = i.minTranslate()),
                    p <= i.maxTranslate() && (p = i.maxTranslate()),
                        i.setTransition(0),
                        i.setTranslate(p),
                        i.updateProgress(),
                        i.updateActiveIndex(),
                        i.updateSlidesClasses(),
                    (!u && i.isBeginning || !c && i.isEnd) && i.updateSlidesClasses(),
                        i.params.freeModeSticky) {
                        clearTimeout(i.mousewheel.timeout),
                            i.mousewheel.timeout = void 0;
                        var v = i.mousewheel.recentWheelEvents;
                        v.length >= 15 && v.shift();
                        var m = v.length ? v[v.length - 1] : void 0
                            , g = v[0];
                        if (v.push(o),
                        m && (o.delta > m.delta || o.direction !== m.direction))
                            v.splice(0);
                        else if (v.length >= 15 && o.time - g.time < 500 && g.delta - o.delta >= 1 && o.delta <= 6) {
                            var w = r > 0 ? .8 : .2;
                            i.mousewheel.lastEventBeforeSnap = o,
                                v.splice(0),
                                i.mousewheel.timeout = b(function() {
                                    i.slideToClosest(i.params.speed, !0, void 0, w)
                                }, 0)
                        }
                        i.mousewheel.timeout || (i.mousewheel.timeout = b(function() {
                            i.mousewheel.lastEventBeforeSnap = o,
                                v.splice(0),
                                i.slideToClosest(i.params.speed, !0, void 0, .5)
                        }, 500))
                    }
                    if (h || i.emit("scroll", t),
                    i.params.autoplay && i.params.autoplayDisableOnInteraction && i.autoplay.stop(),
                    p === i.minTranslate() || p === i.maxTranslate())
                        return !0
                }
            } else {
                var y = {
                    time: E(),
                    delta: Math.abs(r),
                    direction: Math.sign(r),
                    raw: e
                }
                    , x = i.mousewheel.recentWheelEvents;
                x.length >= 2 && x.shift();
                var T = x.length ? x[x.length - 1] : void 0;
                if (x.push(y),
                    T ? (y.direction !== T.direction || y.delta > T.delta || y.time > T.time + 150) && i.mousewheel.animateSlider(y) : i.mousewheel.animateSlider(y),
                    i.mousewheel.releaseScroll(y))
                    return !0
            }
            return t.preventDefault ? t.preventDefault() : t.returnValue = !1,
                !1
        },
        animateSlider: function(e) {
            var t = l();
            return !(this.params.mousewheel.thresholdDelta && e.delta < this.params.mousewheel.thresholdDelta || this.params.mousewheel.thresholdTime && E() - this.mousewheel.lastScrollTime < this.params.mousewheel.thresholdTime || !(e.delta >= 6 && E() - this.mousewheel.lastScrollTime < 60) && (e.direction < 0 ? this.isEnd && !this.params.loop || this.animating || (this.slideNext(),
                this.emit("scroll", e.raw)) : this.isBeginning && !this.params.loop || this.animating || (this.slidePrev(),
                this.emit("scroll", e.raw)),
                this.mousewheel.lastScrollTime = (new t.Date).getTime(),
                1))
        },
        releaseScroll: function(e) {
            var t = this.params.mousewheel;
            if (e.direction < 0) {
                if (this.isEnd && !this.params.loop && t.releaseOnEdges)
                    return !0
            } else if (this.isBeginning && !this.params.loop && t.releaseOnEdges)
                return !0;
            return !1
        },
        enable: function() {
            var e = R.event();
            if (this.params.cssMode)
                return this.wrapperEl.removeEventListener(e, this.mousewheel.handle),
                    !0;
            if (!e)
                return !1;
            if (this.mousewheel.enabled)
                return !1;
            var t = this.$el;
            return "container" !== this.params.mousewheel.eventsTarget && (t = f(this.params.mousewheel.eventsTarget)),
                t.on("mouseenter", this.mousewheel.handleMouseEnter),
                t.on("mouseleave", this.mousewheel.handleMouseLeave),
                t.on(e, this.mousewheel.handle),
                this.mousewheel.enabled = !0,
                !0
        },
        disable: function() {
            var e = R.event();
            if (this.params.cssMode)
                return this.wrapperEl.addEventListener(e, this.mousewheel.handle),
                    !0;
            if (!e)
                return !1;
            if (!this.mousewheel.enabled)
                return !1;
            var t = this.$el;
            return "container" !== this.params.mousewheel.eventsTarget && (t = f(this.params.mousewheel.eventsTarget)),
                t.off(e, this.mousewheel.handle),
                this.mousewheel.enabled = !1,
                !0
        }
    }
        , W = {
        update: function() {
            var e = this.params.navigation;
            if (!this.params.loop) {
                var t = this.navigation
                    , i = t.$nextEl
                    , s = t.$prevEl;
                s && s.length > 0 && (this.isBeginning ? s.addClass(e.disabledClass) : s.removeClass(e.disabledClass),
                    s[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass)),
                i && i.length > 0 && (this.isEnd ? i.addClass(e.disabledClass) : i.removeClass(e.disabledClass),
                    i[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](e.lockClass))
            }
        },
        onPrevClick: function(e) {
            e.preventDefault(),
            this.isBeginning && !this.params.loop || this.slidePrev()
        },
        onNextClick: function(e) {
            e.preventDefault(),
            this.isEnd && !this.params.loop || this.slideNext()
        },
        init: function() {
            var e, t, i = this.params.navigation;
            (i.nextEl || i.prevEl) && (i.nextEl && (e = f(i.nextEl),
            this.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === this.$el.find(i.nextEl).length && (e = this.$el.find(i.nextEl))),
            i.prevEl && (t = f(i.prevEl),
            this.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === this.$el.find(i.prevEl).length && (t = this.$el.find(i.prevEl))),
            e && e.length > 0 && e.on("click", this.navigation.onNextClick),
            t && t.length > 0 && t.on("click", this.navigation.onPrevClick),
                C(this.navigation, {
                    $nextEl: e,
                    nextEl: e && e[0],
                    $prevEl: t,
                    prevEl: t && t[0]
                }))
        },
        destroy: function() {
            var e = this.navigation
                , t = e.$nextEl
                , i = e.$prevEl;
            t && t.length && (t.off("click", this.navigation.onNextClick),
                t.removeClass(this.params.navigation.disabledClass)),
            i && i.length && (i.off("click", this.navigation.onPrevClick),
                i.removeClass(this.params.navigation.disabledClass))
        }
    }
        , q = {
        update: function() {
            var e = this.rtl
                , t = this.params.pagination;
            if (t.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var i, s = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length, a = this.pagination.$el, r = this.params.loop ? Math.ceil((s - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length;
                if (this.params.loop ? ((i = Math.ceil((this.activeIndex - this.loopedSlides) / this.params.slidesPerGroup)) > s - 1 - 2 * this.loopedSlides && (i -= s - 2 * this.loopedSlides),
                i > r - 1 && (i -= r),
                i < 0 && "bullets" !== this.params.paginationType && (i = r + i)) : i = void 0 !== this.snapIndex ? this.snapIndex : this.activeIndex || 0,
                "bullets" === t.type && this.pagination.bullets && this.pagination.bullets.length > 0) {
                    var n, l, o, d = this.pagination.bullets;
                    if (t.dynamicBullets && (this.pagination.bulletSize = d.eq(0)[this.isHorizontal() ? "outerWidth" : "outerHeight"](!0),
                        a.css(this.isHorizontal() ? "width" : "height", this.pagination.bulletSize * (t.dynamicMainBullets + 4) + "px"),
                    t.dynamicMainBullets > 1 && void 0 !== this.previousIndex && (this.pagination.dynamicBulletIndex += i - this.previousIndex,
                        this.pagination.dynamicBulletIndex > t.dynamicMainBullets - 1 ? this.pagination.dynamicBulletIndex = t.dynamicMainBullets - 1 : this.pagination.dynamicBulletIndex < 0 && (this.pagination.dynamicBulletIndex = 0)),
                        n = i - this.pagination.dynamicBulletIndex,
                        o = ((l = n + (Math.min(d.length, t.dynamicMainBullets) - 1)) + n) / 2),
                        d.removeClass(t.bulletActiveClass + " " + t.bulletActiveClass + "-next " + t.bulletActiveClass + "-next-next " + t.bulletActiveClass + "-prev " + t.bulletActiveClass + "-prev-prev " + t.bulletActiveClass + "-main"),
                    a.length > 1)
                        d.each(function(e) {
                            var s = f(e)
                                , a = s.index();
                            a === i && s.addClass(t.bulletActiveClass),
                            t.dynamicBullets && (a >= n && a <= l && s.addClass(t.bulletActiveClass + "-main"),
                            a === n && s.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"),
                            a === l && s.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next"))
                        });
                    else {
                        var h = d.eq(i)
                            , p = h.index();
                        if (h.addClass(t.bulletActiveClass),
                            t.dynamicBullets) {
                            for (var u = d.eq(n), c = d.eq(l), v = n; v <= l; v += 1)
                                d.eq(v).addClass(t.bulletActiveClass + "-main");
                            if (this.params.loop)
                                if (p >= d.length - t.dynamicMainBullets) {
                                    for (var m = t.dynamicMainBullets; m >= 0; m -= 1)
                                        d.eq(d.length - m).addClass(t.bulletActiveClass + "-main");
                                    d.eq(d.length - t.dynamicMainBullets - 1).addClass(t.bulletActiveClass + "-prev")
                                } else
                                    u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"),
                                        c.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next");
                            else
                                u.prev().addClass(t.bulletActiveClass + "-prev").prev().addClass(t.bulletActiveClass + "-prev-prev"),
                                    c.next().addClass(t.bulletActiveClass + "-next").next().addClass(t.bulletActiveClass + "-next-next")
                        }
                    }
                    if (t.dynamicBullets) {
                        var g = Math.min(d.length, t.dynamicMainBullets + 4)
                            , w = (this.pagination.bulletSize * g - this.pagination.bulletSize) / 2 - o * this.pagination.bulletSize
                            , y = e ? "right" : "left";
                        d.css(this.isHorizontal() ? y : "top", w + "px")
                    }
                }
                if ("fraction" === t.type && (a.find("." + t.currentClass).text(t.formatFractionCurrent(i + 1)),
                    a.find("." + t.totalClass).text(t.formatFractionTotal(r))),
                "progressbar" === t.type) {
                    var b;
                    b = t.progressbarOpposite ? this.isHorizontal() ? "vertical" : "horizontal" : this.isHorizontal() ? "horizontal" : "vertical";
                    var E = (i + 1) / r
                        , x = 1
                        , T = 1;
                    "horizontal" === b ? x = E : T = E,
                        a.find("." + t.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + x + ") scaleY(" + T + ")").transition(this.params.speed)
                }
                "custom" === t.type && t.renderCustom ? (a.html(t.renderCustom(this, i + 1, r)),
                    this.emit("paginationRender", a[0])) : this.emit("paginationUpdate", a[0]),
                    a[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](t.lockClass)
            }
        },
        render: function() {
            var e = this.params.pagination;
            if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var t = this.virtual && this.params.virtual.enabled ? this.virtual.slides.length : this.slides.length
                    , i = this.pagination.$el
                    , s = "";
                if ("bullets" === e.type) {
                    for (var a = this.params.loop ? Math.ceil((t - 2 * this.loopedSlides) / this.params.slidesPerGroup) : this.snapGrid.length, r = 0; r < a; r += 1)
                        e.renderBullet ? s += e.renderBullet.call(this, r, e.bulletClass) : s += "<" + e.bulletElement + ' class="' + e.bulletClass + '"></' + e.bulletElement + ">";
                    i.html(s),
                        this.pagination.bullets = i.find("." + e.bulletClass)
                }
                "fraction" === e.type && (s = e.renderFraction ? e.renderFraction.call(this, e.currentClass, e.totalClass) : '<span class="' + e.currentClass + '"></span> / <span class="' + e.totalClass + '"></span>',
                    i.html(s)),
                "progressbar" === e.type && (s = e.renderProgressbar ? e.renderProgressbar.call(this, e.progressbarFillClass) : '<span class="' + e.progressbarFillClass + '"></span>',
                    i.html(s)),
                "custom" !== e.type && this.emit("paginationRender", this.pagination.$el[0])
            }
        },
        init: function() {
            var e = this
                , t = e.params.pagination;
            if (t.el) {
                var i = f(t.el);
                0 !== i.length && (e.params.uniqueNavElements && "string" == typeof t.el && i.length > 1 && (i = e.$el.find(t.el)),
                "bullets" === t.type && t.clickable && i.addClass(t.clickableClass),
                    i.addClass(t.modifierClass + t.type),
                "bullets" === t.type && t.dynamicBullets && (i.addClass("" + t.modifierClass + t.type + "-dynamic"),
                    e.pagination.dynamicBulletIndex = 0,
                t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
                "progressbar" === t.type && t.progressbarOpposite && i.addClass(t.progressbarOppositeClass),
                t.clickable && i.on("click", "." + t.bulletClass, function(t) {
                    t.preventDefault();
                    var i = f(this).index() * e.params.slidesPerGroup;
                    e.params.loop && (i += e.loopedSlides),
                        e.slideTo(i)
                }),
                    C(e.pagination, {
                        $el: i,
                        el: i[0]
                    }))
            }
        },
        destroy: function() {
            var e = this.params.pagination;
            if (e.el && this.pagination.el && this.pagination.$el && 0 !== this.pagination.$el.length) {
                var t = this.pagination.$el;
                t.removeClass(e.hiddenClass),
                    t.removeClass(e.modifierClass + e.type),
                this.pagination.bullets && this.pagination.bullets.removeClass(e.bulletActiveClass),
                e.clickable && t.off("click", "." + e.bulletClass)
            }
        }
    }
        , j = {
        setTranslate: function() {
            if (this.params.scrollbar.el && this.scrollbar.el) {
                var e = this.scrollbar
                    , t = this.rtlTranslate
                    , i = this.progress
                    , s = e.dragSize
                    , a = e.trackSize
                    , r = e.$dragEl
                    , n = e.$el
                    , l = this.params.scrollbar
                    , o = s
                    , d = (a - s) * i;
                t ? (d = -d) > 0 ? (o = s - d,
                    d = 0) : -d + s > a && (o = a + d) : d < 0 ? (o = s + d,
                    d = 0) : d + s > a && (o = a - d),
                    this.isHorizontal() ? (r.transform("translate3d(" + d + "px, 0, 0)"),
                        r[0].style.width = o + "px") : (r.transform("translate3d(0px, " + d + "px, 0)"),
                        r[0].style.height = o + "px"),
                l.hide && (clearTimeout(this.scrollbar.timeout),
                    n[0].style.opacity = 1,
                    this.scrollbar.timeout = setTimeout(function() {
                        n[0].style.opacity = 0,
                            n.transition(400)
                    }, 1e3))
            }
        },
        setTransition: function(e) {
            this.params.scrollbar.el && this.scrollbar.el && this.scrollbar.$dragEl.transition(e)
        },
        updateSize: function() {
            if (this.params.scrollbar.el && this.scrollbar.el) {
                var e = this.scrollbar
                    , t = e.$dragEl
                    , i = e.$el;
                t[0].style.width = "",
                    t[0].style.height = "";
                var s, a = this.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight, r = this.size / this.virtualSize, n = r * (a / this.size);
                s = "auto" === this.params.scrollbar.dragSize ? a * r : parseInt(this.params.scrollbar.dragSize, 10),
                    this.isHorizontal() ? t[0].style.width = s + "px" : t[0].style.height = s + "px",
                    i[0].style.display = r >= 1 ? "none" : "",
                this.params.scrollbar.hide && (i[0].style.opacity = 0),
                    C(e, {
                        trackSize: a,
                        divider: r,
                        moveDivider: n,
                        dragSize: s
                    }),
                    e.$el[this.params.watchOverflow && this.isLocked ? "addClass" : "removeClass"](this.params.scrollbar.lockClass)
            }
        },
        getPointerPosition: function(e) {
            return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
        },
        setDragPosition: function(e) {
            var t, i = this.scrollbar, s = this.rtlTranslate, a = i.$el, r = i.dragSize, n = i.trackSize, l = i.dragStartPos;
            t = (i.getPointerPosition(e) - a.offset()[this.isHorizontal() ? "left" : "top"] - (null !== l ? l : r / 2)) / (n - r),
                t = Math.max(Math.min(t, 1), 0),
            s && (t = 1 - t);
            var o = this.minTranslate() + (this.maxTranslate() - this.minTranslate()) * t;
            this.updateProgress(o),
                this.setTranslate(o),
                this.updateActiveIndex(),
                this.updateSlidesClasses()
        },
        onDragStart: function(e) {
            var t = this.params.scrollbar
                , i = this.scrollbar
                , s = this.$wrapperEl
                , a = i.$el
                , r = i.$dragEl;
            this.scrollbar.isTouched = !0,
                this.scrollbar.dragStartPos = e.target === r[0] || e.target === r ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[this.isHorizontal() ? "left" : "top"] : null,
                e.preventDefault(),
                e.stopPropagation(),
                s.transition(100),
                r.transition(100),
                i.setDragPosition(e),
                clearTimeout(this.scrollbar.dragTimeout),
                a.transition(0),
            t.hide && a.css("opacity", 1),
            this.params.cssMode && this.$wrapperEl.css("scroll-snap-type", "none"),
                this.emit("scrollbarDragStart", e)
        },
        onDragMove: function(e) {
            var t = this.scrollbar
                , i = this.$wrapperEl
                , s = t.$el
                , a = t.$dragEl;
            this.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1,
                t.setDragPosition(e),
                i.transition(0),
                s.transition(0),
                a.transition(0),
                this.emit("scrollbarDragMove", e))
        },
        onDragEnd: function(e) {
            var t = this.params.scrollbar
                , i = this.scrollbar
                , s = this.$wrapperEl
                , a = i.$el;
            this.scrollbar.isTouched && (this.scrollbar.isTouched = !1,
            this.params.cssMode && (this.$wrapperEl.css("scroll-snap-type", ""),
                s.transition("")),
            t.hide && (clearTimeout(this.scrollbar.dragTimeout),
                this.scrollbar.dragTimeout = b(function() {
                    a.css("opacity", 0),
                        a.transition(400)
                }, 1e3)),
                this.emit("scrollbarDragEnd", e),
            t.snapOnRelease && this.slideToClosest())
        },
        enableDraggable: function() {
            if (this.params.scrollbar.el) {
                var e = r()
                    , t = this.scrollbar
                    , i = this.touchEventsTouch
                    , s = this.touchEventsDesktop
                    , a = this.params
                    , n = this.support
                    , l = t.$el[0]
                    , o = !(!n.passiveListener || !a.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                    , d = !(!n.passiveListener || !a.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                n.touch ? (l.addEventListener(i.start, this.scrollbar.onDragStart, o),
                    l.addEventListener(i.move, this.scrollbar.onDragMove, o),
                    l.addEventListener(i.end, this.scrollbar.onDragEnd, d)) : (l.addEventListener(s.start, this.scrollbar.onDragStart, o),
                    e.addEventListener(s.move, this.scrollbar.onDragMove, o),
                    e.addEventListener(s.end, this.scrollbar.onDragEnd, d))
            }
        },
        disableDraggable: function() {
            if (this.params.scrollbar.el) {
                var e = r()
                    , t = this.scrollbar
                    , i = this.touchEventsTouch
                    , s = this.touchEventsDesktop
                    , a = this.params
                    , n = this.support
                    , l = t.$el[0]
                    , o = !(!n.passiveListener || !a.passiveListeners) && {
                    passive: !1,
                    capture: !1
                }
                    , d = !(!n.passiveListener || !a.passiveListeners) && {
                    passive: !0,
                    capture: !1
                };
                n.touch ? (l.removeEventListener(i.start, this.scrollbar.onDragStart, o),
                    l.removeEventListener(i.move, this.scrollbar.onDragMove, o),
                    l.removeEventListener(i.end, this.scrollbar.onDragEnd, d)) : (l.removeEventListener(s.start, this.scrollbar.onDragStart, o),
                    e.removeEventListener(s.move, this.scrollbar.onDragMove, o),
                    e.removeEventListener(s.end, this.scrollbar.onDragEnd, d))
            }
        },
        init: function() {
            if (this.params.scrollbar.el) {
                var e = this.scrollbar
                    , t = this.$el
                    , i = this.params.scrollbar
                    , s = f(i.el);
                this.params.uniqueNavElements && "string" == typeof i.el && s.length > 1 && 1 === t.find(i.el).length && (s = t.find(i.el));
                var a = s.find("." + this.params.scrollbar.dragClass);
                0 === a.length && (a = f('<div class="' + this.params.scrollbar.dragClass + '"></div>'),
                    s.append(a)),
                    C(e, {
                        $el: s,
                        el: s[0],
                        $dragEl: a,
                        dragEl: a[0]
                    }),
                i.draggable && e.enableDraggable()
            }
        },
        destroy: function() {
            this.scrollbar.disableDraggable()
        }
    }
        , _ = {
        setTransform: function(e, t) {
            var i = this.rtl
                , s = f(e)
                , a = i ? -1 : 1
                , r = s.attr("data-swiper-parallax") || "0"
                , n = s.attr("data-swiper-parallax-x")
                , l = s.attr("data-swiper-parallax-y")
                , o = s.attr("data-swiper-parallax-scale")
                , d = s.attr("data-swiper-parallax-opacity");
            if (n || l ? (n = n || "0",
                l = l || "0") : this.isHorizontal() ? (n = r,
                l = "0") : (l = r,
                n = "0"),
                n = n.indexOf("%") >= 0 ? parseInt(n, 10) * t * a + "%" : n * t * a + "px",
                l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px",
            null != d) {
                var h = d - (d - 1) * (1 - Math.abs(t));
                s[0].style.opacity = h
            }
            if (null == o)
                s.transform("translate3d(" + n + ", " + l + ", 0px)");
            else {
                var p = o - (o - 1) * (1 - Math.abs(t));
                s.transform("translate3d(" + n + ", " + l + ", 0px) scale(" + p + ")")
            }
        },
        setTranslate: function() {
            var e = this
                , t = e.$el
                , i = e.slides
                , s = e.progress
                , a = e.snapGrid;
            t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(t) {
                e.parallax.setTransform(t, s)
            }),
                i.each(function(t, i) {
                    var r = t.progress;
                    e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (r += Math.ceil(i / 2) - s * (a.length - 1)),
                        r = Math.min(Math.max(r, -1), 1),
                        f(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(t) {
                            e.parallax.setTransform(t, r)
                        })
                })
        },
        setTransition: function(e) {
            void 0 === e && (e = this.params.speed),
                this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each(function(t) {
                    var i = f(t)
                        , s = parseInt(i.attr("data-swiper-parallax-duration"), 10) || e;
                    0 === e && (s = 0),
                        i.transition(s)
                })
        }
    }
        , U = {
        getDistanceBetweenTouches: function(e) {
            if (e.targetTouches.length < 2)
                return 1;
            var t = e.targetTouches[0].pageX
                , i = e.targetTouches[0].pageY
                , s = e.targetTouches[1].pageX
                , a = e.targetTouches[1].pageY;
            return Math.sqrt(Math.pow(s - t, 2) + Math.pow(a - i, 2))
        },
        onGestureStart: function(e) {
            var t = this.support
                , i = this.params.zoom
                , s = this.zoom
                , a = s.gesture;
            if (s.fakeGestureTouched = !1,
                s.fakeGestureMoved = !1,
                !t.gestures) {
                if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2)
                    return;
                s.fakeGestureTouched = !0,
                    a.scaleStart = U.getDistanceBetweenTouches(e)
            }
            a.$slideEl && a.$slideEl.length || (a.$slideEl = f(e.target).closest("." + this.params.slideClass),
            0 === a.$slideEl.length && (a.$slideEl = this.slides.eq(this.activeIndex)),
                a.$imageEl = a.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),
                a.$imageWrapEl = a.$imageEl.parent("." + i.containerClass),
                a.maxRatio = a.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio,
            0 !== a.$imageWrapEl.length) ? (a.$imageEl && a.$imageEl.transition(0),
                this.zoom.isScaling = !0) : a.$imageEl = void 0
        },
        onGestureChange: function(e) {
            var t = this.support
                , i = this.params.zoom
                , s = this.zoom
                , a = s.gesture;
            if (!t.gestures) {
                if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2)
                    return;
                s.fakeGestureMoved = !0,
                    a.scaleMove = U.getDistanceBetweenTouches(e)
            }
            a.$imageEl && 0 !== a.$imageEl.length ? (t.gestures ? s.scale = e.scale * s.currentScale : s.scale = a.scaleMove / a.scaleStart * s.currentScale,
            s.scale > a.maxRatio && (s.scale = a.maxRatio - 1 + Math.pow(s.scale - a.maxRatio + 1, .5)),
            s.scale < i.minRatio && (s.scale = i.minRatio + 1 - Math.pow(i.minRatio - s.scale + 1, .5)),
                a.$imageEl.transform("translate3d(0,0,0) scale(" + s.scale + ")")) : "gesturechange" === e.type && s.onGestureStart(e)
        },
        onGestureEnd: function(e) {
            var t = this.device
                , i = this.support
                , s = this.params.zoom
                , a = this.zoom
                , r = a.gesture;
            if (!i.gestures) {
                if (!a.fakeGestureTouched || !a.fakeGestureMoved)
                    return;
                if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !t.android)
                    return;
                a.fakeGestureTouched = !1,
                    a.fakeGestureMoved = !1
            }
            r.$imageEl && 0 !== r.$imageEl.length && (a.scale = Math.max(Math.min(a.scale, r.maxRatio), s.minRatio),
                r.$imageEl.transition(this.params.speed).transform("translate3d(0,0,0) scale(" + a.scale + ")"),
                a.currentScale = a.scale,
                a.isScaling = !1,
            1 === a.scale && (r.$slideEl = void 0))
        },
        onTouchStart: function(e) {
            var t = this.device
                , i = this.zoom
                , s = i.gesture
                , a = i.image;
            s.$imageEl && 0 !== s.$imageEl.length && (a.isTouched || (t.android && e.cancelable && e.preventDefault(),
                a.isTouched = !0,
                a.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX,
                a.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
        },
        onTouchMove: function(e) {
            var t = this.zoom
                , i = t.gesture
                , s = t.image
                , a = t.velocity;
            if (i.$imageEl && 0 !== i.$imageEl.length && (this.allowClick = !1,
            s.isTouched && i.$slideEl)) {
                s.isMoved || (s.width = i.$imageEl[0].offsetWidth,
                    s.height = i.$imageEl[0].offsetHeight,
                    s.startX = x(i.$imageWrapEl[0], "x") || 0,
                    s.startY = x(i.$imageWrapEl[0], "y") || 0,
                    i.slideWidth = i.$slideEl[0].offsetWidth,
                    i.slideHeight = i.$slideEl[0].offsetHeight,
                    i.$imageWrapEl.transition(0),
                this.rtl && (s.startX = -s.startX,
                    s.startY = -s.startY));
                var r = s.width * t.scale
                    , n = s.height * t.scale;
                if (!(r < i.slideWidth && n < i.slideHeight)) {
                    if (s.minX = Math.min(i.slideWidth / 2 - r / 2, 0),
                        s.maxX = -s.minX,
                        s.minY = Math.min(i.slideHeight / 2 - n / 2, 0),
                        s.maxY = -s.minY,
                        s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX,
                        s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY,
                    !s.isMoved && !t.isScaling) {
                        if (this.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x))
                            return void (s.isTouched = !1);
                        if (!this.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y))
                            return void (s.isTouched = !1)
                    }
                    e.cancelable && e.preventDefault(),
                        e.stopPropagation(),
                        s.isMoved = !0,
                        s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX,
                        s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY,
                    s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)),
                    s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)),
                    s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)),
                    s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)),
                    a.prevPositionX || (a.prevPositionX = s.touchesCurrent.x),
                    a.prevPositionY || (a.prevPositionY = s.touchesCurrent.y),
                    a.prevTime || (a.prevTime = Date.now()),
                        a.x = (s.touchesCurrent.x - a.prevPositionX) / (Date.now() - a.prevTime) / 2,
                        a.y = (s.touchesCurrent.y - a.prevPositionY) / (Date.now() - a.prevTime) / 2,
                    Math.abs(s.touchesCurrent.x - a.prevPositionX) < 2 && (a.x = 0),
                    Math.abs(s.touchesCurrent.y - a.prevPositionY) < 2 && (a.y = 0),
                        a.prevPositionX = s.touchesCurrent.x,
                        a.prevPositionY = s.touchesCurrent.y,
                        a.prevTime = Date.now(),
                        i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
                }
            }
        },
        onTouchEnd: function() {
            var e = this.zoom
                , t = e.gesture
                , i = e.image
                , s = e.velocity;
            if (t.$imageEl && 0 !== t.$imageEl.length) {
                if (!i.isTouched || !i.isMoved)
                    return i.isTouched = !1,
                        void (i.isMoved = !1);
                i.isTouched = !1,
                    i.isMoved = !1;
                var a = 300
                    , r = 300
                    , n = s.x * a
                    , l = i.currentX + n
                    , o = s.y * r
                    , d = i.currentY + o;
                0 !== s.x && (a = Math.abs((l - i.currentX) / s.x)),
                0 !== s.y && (r = Math.abs((d - i.currentY) / s.y));
                var h = Math.max(a, r);
                i.currentX = l,
                    i.currentY = d;
                var p = i.width * e.scale
                    , u = i.height * e.scale;
                i.minX = Math.min(t.slideWidth / 2 - p / 2, 0),
                    i.maxX = -i.minX,
                    i.minY = Math.min(t.slideHeight / 2 - u / 2, 0),
                    i.maxY = -i.minY,
                    i.currentX = Math.max(Math.min(i.currentX, i.maxX), i.minX),
                    i.currentY = Math.max(Math.min(i.currentY, i.maxY), i.minY),
                    t.$imageWrapEl.transition(h).transform("translate3d(" + i.currentX + "px, " + i.currentY + "px,0)")
            }
        },
        onTransitionEnd: function() {
            var e = this.zoom
                , t = e.gesture;
            t.$slideEl && this.previousIndex !== this.activeIndex && (t.$imageEl && t.$imageEl.transform("translate3d(0,0,0) scale(1)"),
            t.$imageWrapEl && t.$imageWrapEl.transform("translate3d(0,0,0)"),
                e.scale = 1,
                e.currentScale = 1,
                t.$slideEl = void 0,
                t.$imageEl = void 0,
                t.$imageWrapEl = void 0)
        },
        toggle: function(e) {
            var t = this.zoom;
            t.scale && 1 !== t.scale ? t.out() : t.in(e)
        },
        in: function(e) {
            var t, i, s, a, r, n, l, o, d, h, p, u, c, v, f, m, g = this.zoom, w = this.params.zoom, y = g.gesture, b = g.image;
            y.$slideEl || (this.params.virtual && this.params.virtual.enabled && this.virtual ? y.$slideEl = this.$wrapperEl.children("." + this.params.slideActiveClass) : y.$slideEl = this.slides.eq(this.activeIndex),
                y.$imageEl = y.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),
                y.$imageWrapEl = y.$imageEl.parent("." + w.containerClass)),
            y.$imageEl && 0 !== y.$imageEl.length && (y.$slideEl.addClass("" + w.zoomedSlideClass),
                void 0 === b.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX,
                    i = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = b.touchesStart.x,
                    i = b.touchesStart.y),
                g.scale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio,
                g.currentScale = y.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio,
                e ? (f = y.$slideEl[0].offsetWidth,
                    m = y.$slideEl[0].offsetHeight,
                    s = y.$slideEl.offset().left + f / 2 - t,
                    a = y.$slideEl.offset().top + m / 2 - i,
                    l = y.$imageEl[0].offsetWidth,
                    o = y.$imageEl[0].offsetHeight,
                    d = l * g.scale,
                    h = o * g.scale,
                    c = -(p = Math.min(f / 2 - d / 2, 0)),
                    v = -(u = Math.min(m / 2 - h / 2, 0)),
                (r = s * g.scale) < p && (r = p),
                r > c && (r = c),
                (n = a * g.scale) < u && (n = u),
                n > v && (n = v)) : (r = 0,
                    n = 0),
                y.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"),
                y.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + g.scale + ")"))
        },
        out: function() {
            var e = this.zoom
                , t = this.params.zoom
                , i = e.gesture;
            i.$slideEl || (this.params.virtual && this.params.virtual.enabled && this.virtual ? i.$slideEl = this.$wrapperEl.children("." + this.params.slideActiveClass) : i.$slideEl = this.slides.eq(this.activeIndex),
                i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"),
                i.$imageWrapEl = i.$imageEl.parent("." + t.containerClass)),
            i.$imageEl && 0 !== i.$imageEl.length && (e.scale = 1,
                e.currentScale = 1,
                i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"),
                i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"),
                i.$slideEl.removeClass("" + t.zoomedSlideClass),
                i.$slideEl = void 0)
        },
        toggleGestures: function(e) {
            var t = this.zoom
                , i = t.slideSelector
                , s = t.passiveListener;
            this.$wrapperEl[e]("gesturestart", i, t.onGestureStart, s),
                this.$wrapperEl[e]("gesturechange", i, t.onGestureChange, s),
                this.$wrapperEl[e]("gestureend", i, t.onGestureEnd, s)
        },
        enableGestures: function() {
            this.zoom.gesturesEnabled || (this.zoom.gesturesEnabled = !0,
                this.zoom.toggleGestures("on"))
        },
        disableGestures: function() {
            this.zoom.gesturesEnabled && (this.zoom.gesturesEnabled = !1,
                this.zoom.toggleGestures("off"))
        },
        enable: function() {
            var e = this.support
                , t = this.zoom;
            if (!t.enabled) {
                t.enabled = !0;
                var i = !("touchstart" !== this.touchEvents.start || !e.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }
                    , s = !e.passiveListener || {
                    passive: !1,
                    capture: !0
                }
                    , a = "." + this.params.slideClass;
                this.zoom.passiveListener = i,
                    this.zoom.slideSelector = a,
                    e.gestures ? (this.$wrapperEl.on(this.touchEvents.start, this.zoom.enableGestures, i),
                        this.$wrapperEl.on(this.touchEvents.end, this.zoom.disableGestures, i)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.on(this.touchEvents.start, a, t.onGestureStart, i),
                        this.$wrapperEl.on(this.touchEvents.move, a, t.onGestureChange, s),
                        this.$wrapperEl.on(this.touchEvents.end, a, t.onGestureEnd, i),
                    this.touchEvents.cancel && this.$wrapperEl.on(this.touchEvents.cancel, a, t.onGestureEnd, i)),
                    this.$wrapperEl.on(this.touchEvents.move, "." + this.params.zoom.containerClass, t.onTouchMove, s)
            }
        },
        disable: function() {
            var e = this.zoom;
            if (e.enabled) {
                var t = this.support;
                this.zoom.enabled = !1;
                var i = !("touchstart" !== this.touchEvents.start || !t.passiveListener || !this.params.passiveListeners) && {
                    passive: !0,
                    capture: !1
                }
                    , s = !t.passiveListener || {
                    passive: !1,
                    capture: !0
                }
                    , a = "." + this.params.slideClass;
                t.gestures ? (this.$wrapperEl.off(this.touchEvents.start, this.zoom.enableGestures, i),
                    this.$wrapperEl.off(this.touchEvents.end, this.zoom.disableGestures, i)) : "touchstart" === this.touchEvents.start && (this.$wrapperEl.off(this.touchEvents.start, a, e.onGestureStart, i),
                    this.$wrapperEl.off(this.touchEvents.move, a, e.onGestureChange, s),
                    this.$wrapperEl.off(this.touchEvents.end, a, e.onGestureEnd, i),
                this.touchEvents.cancel && this.$wrapperEl.off(this.touchEvents.cancel, a, e.onGestureEnd, i)),
                    this.$wrapperEl.off(this.touchEvents.move, "." + this.params.zoom.containerClass, e.onTouchMove, s)
            }
        }
    }
        , K = {
        loadInSlide: function(e, t) {
            void 0 === t && (t = !0);
            var i = this
                , s = i.params.lazy;
            if (void 0 !== e && 0 !== i.slides.length) {
                var a = i.virtual && i.params.virtual.enabled ? i.$wrapperEl.children("." + i.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : i.slides.eq(e)
                    , r = a.find("." + s.elementClass + ":not(." + s.loadedClass + "):not(." + s.loadingClass + ")");
                !a.hasClass(s.elementClass) || a.hasClass(s.loadedClass) || a.hasClass(s.loadingClass) || r.push(a[0]),
                0 !== r.length && r.each(function(e) {
                    var r = f(e);
                    r.addClass(s.loadingClass);
                    var n = r.attr("data-background")
                        , l = r.attr("data-src")
                        , o = r.attr("data-srcset")
                        , d = r.attr("data-sizes")
                        , h = r.parent("picture");
                    i.loadImage(r[0], l || n, o, d, !1, function() {
                        if (null != i && i && (!i || i.params) && !i.destroyed) {
                            if (n ? (r.css("background-image", 'url("' + n + '")'),
                                r.removeAttr("data-background")) : (o && (r.attr("srcset", o),
                                r.removeAttr("data-srcset")),
                            d && (r.attr("sizes", d),
                                r.removeAttr("data-sizes")),
                            h.length && h.children("source").each(function(e) {
                                var t = f(e);
                                t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")),
                                    t.removeAttr("data-srcset"))
                            }),
                            l && (r.attr("src", l),
                                r.removeAttr("data-src"))),
                                r.addClass(s.loadedClass).removeClass(s.loadingClass),
                                a.find("." + s.preloaderClass).remove(),
                            i.params.loop && t) {
                                var e = a.attr("data-swiper-slide-index");
                                if (a.hasClass(i.params.slideDuplicateClass)) {
                                    var p = i.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + i.params.slideDuplicateClass + ")");
                                    i.lazy.loadInSlide(p.index(), !1)
                                } else {
                                    var u = i.$wrapperEl.children("." + i.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
                                    i.lazy.loadInSlide(u.index(), !1)
                                }
                            }
                            i.emit("lazyImageReady", a[0], r[0]),
                            i.params.autoHeight && i.updateAutoHeight()
                        }
                    }),
                        i.emit("lazyImageLoad", a[0], r[0])
                })
            }
        },
        load: function() {
            var e = this
                , t = e.$wrapperEl
                , i = e.params
                , s = e.slides
                , a = e.activeIndex
                , r = e.virtual && i.virtual.enabled
                , n = i.lazy
                , l = i.slidesPerView;
            function o(e) {
                if (r) {
                    if (t.children("." + i.slideClass + '[data-swiper-slide-index="' + e + '"]').length)
                        return !0
                } else if (s[e])
                    return !0;
                return !1
            }
            function d(e) {
                return r ? f(e).attr("data-swiper-slide-index") : f(e).index()
            }
            if ("auto" === l && (l = 0),
            e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
                e.params.watchSlidesVisibility)
                t.children("." + i.slideVisibleClass).each(function(t) {
                    var i = r ? f(t).attr("data-swiper-slide-index") : f(t).index();
                    e.lazy.loadInSlide(i)
                });
            else if (l > 1)
                for (var h = a; h < a + l; h += 1)
                    o(h) && e.lazy.loadInSlide(h);
            else
                e.lazy.loadInSlide(a);
            if (n.loadPrevNext)
                if (l > 1 || n.loadPrevNextAmount && n.loadPrevNextAmount > 1) {
                    for (var p = n.loadPrevNextAmount, u = l, c = Math.min(a + u + Math.max(p, u), s.length), v = Math.max(a - Math.max(u, p), 0), m = a + l; m < c; m += 1)
                        o(m) && e.lazy.loadInSlide(m);
                    for (var g = v; g < a; g += 1)
                        o(g) && e.lazy.loadInSlide(g)
                } else {
                    var w = t.children("." + i.slideNextClass);
                    w.length > 0 && e.lazy.loadInSlide(d(w));
                    var y = t.children("." + i.slidePrevClass);
                    y.length > 0 && e.lazy.loadInSlide(d(y))
                }
        }
    }
        , Z = {
        LinearSpline: function(e, t) {
            var i, s, a, r, n;
            return this.x = e,
                this.y = t,
                this.lastIndex = e.length - 1,
                this.interpolate = function(e) {
                    return e ? (n = function(e, t) {
                        for (s = -1,
                                 i = e.length; i - s > 1; )
                            e[a = i + s >> 1] <= t ? s = a : i = a;
                        return i
                    }(this.x, e),
                        r = n - 1,
                    (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
                }
                ,
                this
        },
        getInterpolateFunction: function(e) {
            this.controller.spline || (this.controller.spline = this.params.loop ? new Z.LinearSpline(this.slidesGrid,e.slidesGrid) : new Z.LinearSpline(this.snapGrid,e.snapGrid))
        },
        setTranslate: function(e, t) {
            var i, s, a = this, r = a.controller.control, n = a.constructor;
            function l(e) {
                var t = a.rtlTranslate ? -a.translate : a.translate;
                "slide" === a.params.controller.by && (a.controller.getInterpolateFunction(e),
                    s = -a.controller.spline.interpolate(-t)),
                s && "container" !== a.params.controller.by || (i = (e.maxTranslate() - e.minTranslate()) / (a.maxTranslate() - a.minTranslate()),
                    s = (t - a.minTranslate()) * i + e.minTranslate()),
                a.params.controller.inverse && (s = e.maxTranslate() - s),
                    e.updateProgress(s),
                    e.setTranslate(s, a),
                    e.updateActiveIndex(),
                    e.updateSlidesClasses()
            }
            if (Array.isArray(r))
                for (var o = 0; o < r.length; o += 1)
                    r[o] !== t && r[o]instanceof n && l(r[o]);
            else
                r instanceof n && t !== r && l(r)
        },
        setTransition: function(e, t) {
            var i, s = this, a = s.constructor, r = s.controller.control;
            function n(t) {
                t.setTransition(e, s),
                0 !== e && (t.transitionStart(),
                t.params.autoHeight && b(function() {
                    t.updateAutoHeight()
                }),
                    t.$wrapperEl.transitionEnd(function() {
                        r && (t.params.loop && "slide" === s.params.controller.by && t.loopFix(),
                            t.transitionEnd())
                    }))
            }
            if (Array.isArray(r))
                for (i = 0; i < r.length; i += 1)
                    r[i] !== t && r[i]instanceof a && n(r[i]);
            else
                r instanceof a && t !== r && n(r)
        }
    }
        , J = {
        getRandomNumber: function(e) {
            return void 0 === e && (e = 16),
                "x".repeat(e).replace(/x/g, function() {
                    return Math.round(16 * Math.random()).toString(16)
                })
        },
        makeElFocusable: function(e) {
            return e.attr("tabIndex", "0"),
                e
        },
        makeElNotFocusable: function(e) {
            return e.attr("tabIndex", "-1"),
                e
        },
        addElRole: function(e, t) {
            return e.attr("role", t),
                e
        },
        addElRoleDescription: function(e, t) {
            return e.attr("aria-role-description", t),
                e
        },
        addElControls: function(e, t) {
            return e.attr("aria-controls", t),
                e
        },
        addElLabel: function(e, t) {
            return e.attr("aria-label", t),
                e
        },
        addElId: function(e, t) {
            return e.attr("id", t),
                e
        },
        addElLive: function(e, t) {
            return e.attr("aria-live", t),
                e
        },
        disableEl: function(e) {
            return e.attr("aria-disabled", !0),
                e
        },
        enableEl: function(e) {
            return e.attr("aria-disabled", !1),
                e
        },
        onEnterKey: function(e) {
            var t = this.params.a11y;
            if (13 === e.keyCode) {
                var i = f(e.target);
                this.navigation && this.navigation.$nextEl && i.is(this.navigation.$nextEl) && (this.isEnd && !this.params.loop || this.slideNext(),
                    this.isEnd ? this.a11y.notify(t.lastSlideMessage) : this.a11y.notify(t.nextSlideMessage)),
                this.navigation && this.navigation.$prevEl && i.is(this.navigation.$prevEl) && (this.isBeginning && !this.params.loop || this.slidePrev(),
                    this.isBeginning ? this.a11y.notify(t.firstSlideMessage) : this.a11y.notify(t.prevSlideMessage)),
                this.pagination && i.is("." + this.params.pagination.bulletClass) && i[0].click()
            }
        },
        notify: function(e) {
            var t = this.a11y.liveRegion;
            0 !== t.length && (t.html(""),
                t.html(e))
        },
        updateNavigation: function() {
            if (!this.params.loop && this.navigation) {
                var e = this.navigation
                    , t = e.$nextEl
                    , i = e.$prevEl;
                i && i.length > 0 && (this.isBeginning ? (this.a11y.disableEl(i),
                    this.a11y.makeElNotFocusable(i)) : (this.a11y.enableEl(i),
                    this.a11y.makeElFocusable(i))),
                t && t.length > 0 && (this.isEnd ? (this.a11y.disableEl(t),
                    this.a11y.makeElNotFocusable(t)) : (this.a11y.enableEl(t),
                    this.a11y.makeElFocusable(t)))
            }
        },
        updatePagination: function() {
            var e = this
                , t = e.params.a11y;
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each(function(i) {
                var s = f(i);
                e.a11y.makeElFocusable(s),
                e.params.pagination.renderBullet || (e.a11y.addElRole(s, "button"),
                    e.a11y.addElLabel(s, t.paginationBulletMessage.replace(/\{\{index\}\}/, s.index() + 1)))
            })
        },
        init: function() {
            var e = this
                , t = e.params.a11y;
            e.$el.append(e.a11y.liveRegion);
            var i = e.$el;
            t.containerRoleDescriptionMessage && e.a11y.addElRoleDescription(i, t.containerRoleDescriptionMessage),
            t.containerMessage && e.a11y.addElLabel(i, t.containerMessage);
            var s, a, r, n = e.$wrapperEl, l = n.attr("id") || "swiper-wrapper-" + e.a11y.getRandomNumber(16);
            e.a11y.addElId(n, l),
                s = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite",
                e.a11y.addElLive(n, s),
            t.itemRoleDescriptionMessage && e.a11y.addElRoleDescription(f(e.slides), t.itemRoleDescriptionMessage),
                e.a11y.addElRole(f(e.slides), "group"),
                e.slides.each(function(t) {
                    var i = f(t);
                    e.a11y.addElLabel(i, i.index() + 1 + " / " + e.slides.length)
                }),
            e.navigation && e.navigation.$nextEl && (a = e.navigation.$nextEl),
            e.navigation && e.navigation.$prevEl && (r = e.navigation.$prevEl),
            a && a.length && (e.a11y.makeElFocusable(a),
            "BUTTON" !== a[0].tagName && (e.a11y.addElRole(a, "button"),
                a.on("keydown", e.a11y.onEnterKey)),
                e.a11y.addElLabel(a, t.nextSlideMessage),
                e.a11y.addElControls(a, l)),
            r && r.length && (e.a11y.makeElFocusable(r),
            "BUTTON" !== r[0].tagName && (e.a11y.addElRole(r, "button"),
                r.on("keydown", e.a11y.onEnterKey)),
                e.a11y.addElLabel(r, t.prevSlideMessage),
                e.a11y.addElControls(r, l)),
            e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass, e.a11y.onEnterKey)
        },
        destroy: function() {
            var e, t;
            this.a11y.liveRegion && this.a11y.liveRegion.length > 0 && this.a11y.liveRegion.remove(),
            this.navigation && this.navigation.$nextEl && (e = this.navigation.$nextEl),
            this.navigation && this.navigation.$prevEl && (t = this.navigation.$prevEl),
            e && e.off("keydown", this.a11y.onEnterKey),
            t && t.off("keydown", this.a11y.onEnterKey),
            this.pagination && this.params.pagination.clickable && this.pagination.bullets && this.pagination.bullets.length && this.pagination.$el.off("keydown", "." + this.params.pagination.bulletClass, this.a11y.onEnterKey)
        }
    }
        , Q = {
        init: function() {
            var e = l();
            if (this.params.history) {
                if (!e.history || !e.history.pushState)
                    return this.params.history.enabled = !1,
                        void (this.params.hashNavigation.enabled = !0);
                var t = this.history;
                t.initialized = !0,
                    t.paths = Q.getPathValues(this.params.url),
                (t.paths.key || t.paths.value) && (t.scrollToSlide(0, t.paths.value, this.params.runCallbacksOnInit),
                this.params.history.replaceState || e.addEventListener("popstate", this.history.setHistoryPopState))
            }
        },
        destroy: function() {
            var e = l();
            this.params.history.replaceState || e.removeEventListener("popstate", this.history.setHistoryPopState)
        },
        setHistoryPopState: function() {
            this.history.paths = Q.getPathValues(this.params.url),
                this.history.scrollToSlide(this.params.speed, this.history.paths.value, !1)
        },
        getPathValues: function(e) {
            var t = l()
                , i = (e ? new URL(e) : t.location).pathname.slice(1).split("/").filter(function(e) {
                return "" !== e
            })
                , s = i.length;
            return {
                key: i[s - 2],
                value: i[s - 1]
            }
        },
        setHistory: function(e, t) {
            var i = l();
            if (this.history.initialized && this.params.history.enabled) {
                var s;
                s = this.params.url ? new URL(this.params.url) : i.location;
                var a = this.slides.eq(t)
                    , r = Q.slugify(a.attr("data-history"));
                s.pathname.includes(e) || (r = e + "/" + r);
                var n = i.history.state;
                n && n.value === r || (this.params.history.replaceState ? i.history.replaceState({
                    value: r
                }, null, r) : i.history.pushState({
                    value: r
                }, null, r))
            }
        },
        slugify: function(e) {
            return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
        },
        scrollToSlide: function(e, t, i) {
            if (t)
                for (var s = 0, a = this.slides.length; s < a; s += 1) {
                    var r = this.slides.eq(s);
                    if (Q.slugify(r.attr("data-history")) === t && !r.hasClass(this.params.slideDuplicateClass)) {
                        var n = r.index();
                        this.slideTo(n, e, i)
                    }
                }
            else
                this.slideTo(0, e, i)
        }
    }
        , ee = {
        onHashCange: function() {
            var e = r();
            this.emit("hashChange");
            var t = e.location.hash.replace("#", "");
            if (t !== this.slides.eq(this.activeIndex).attr("data-hash")) {
                var i = this.$wrapperEl.children("." + this.params.slideClass + '[data-hash="' + t + '"]').index();
                if (void 0 === i)
                    return;
                this.slideTo(i)
            }
        },
        setHash: function() {
            var e = l()
                , t = r();
            if (this.hashNavigation.initialized && this.params.hashNavigation.enabled)
                if (this.params.hashNavigation.replaceState && e.history && e.history.replaceState)
                    e.history.replaceState(null, null, "#" + this.slides.eq(this.activeIndex).attr("data-hash") || ""),
                        this.emit("hashSet");
                else {
                    var i = this.slides.eq(this.activeIndex)
                        , s = i.attr("data-hash") || i.attr("data-history");
                    t.location.hash = s || "",
                        this.emit("hashSet")
                }
        },
        init: function() {
            var e = r()
                , t = l();
            if (!(!this.params.hashNavigation.enabled || this.params.history && this.params.history.enabled)) {
                this.hashNavigation.initialized = !0;
                var i = e.location.hash.replace("#", "");
                if (i)
                    for (var s = 0, a = this.slides.length; s < a; s += 1) {
                        var n = this.slides.eq(s);
                        if ((n.attr("data-hash") || n.attr("data-history")) === i && !n.hasClass(this.params.slideDuplicateClass)) {
                            var o = n.index();
                            this.slideTo(o, 0, this.params.runCallbacksOnInit, !0)
                        }
                    }
                this.params.hashNavigation.watchState && f(t).on("hashchange", this.hashNavigation.onHashCange)
            }
        },
        destroy: function() {
            var e = l();
            this.params.hashNavigation.watchState && f(e).off("hashchange", this.hashNavigation.onHashCange)
        }
    }
        , te = {
        run: function() {
            var e = this
                , t = e.slides.eq(e.activeIndex)
                , i = e.params.autoplay.delay;
            t.attr("data-swiper-autoplay") && (i = t.attr("data-swiper-autoplay") || e.params.autoplay.delay),
                clearTimeout(e.autoplay.timeout),
                e.autoplay.timeout = b(function() {
                    var t;
                    e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(),
                        t = e.slidePrev(e.params.speed, !0, !0),
                        e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                        e.emit("autoplay")) : (t = e.slidePrev(e.params.speed, !0, !0),
                        e.emit("autoplay")) : e.params.loop ? (e.loopFix(),
                        t = e.slideNext(e.params.speed, !0, !0),
                        e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(0, e.params.speed, !0, !0),
                        e.emit("autoplay")) : (t = e.slideNext(e.params.speed, !0, !0),
                        e.emit("autoplay")),
                    (e.params.cssMode && e.autoplay.running || !1 === t) && e.autoplay.run()
                }, i)
        },
        start: function() {
            return void 0 === this.autoplay.timeout && !this.autoplay.running && (this.autoplay.running = !0,
                this.emit("autoplayStart"),
                this.autoplay.run(),
                !0)
        },
        stop: function() {
            return !!this.autoplay.running && void 0 !== this.autoplay.timeout && (this.autoplay.timeout && (clearTimeout(this.autoplay.timeout),
                this.autoplay.timeout = void 0),
                this.autoplay.running = !1,
                this.emit("autoplayStop"),
                !0)
        },
        pause: function(e) {
            this.autoplay.running && (this.autoplay.paused || (this.autoplay.timeout && clearTimeout(this.autoplay.timeout),
                this.autoplay.paused = !0,
                0 !== e && this.params.autoplay.waitForTransition ? (this.$wrapperEl[0].addEventListener("transitionend", this.autoplay.onTransitionEnd),
                    this.$wrapperEl[0].addEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd)) : (this.autoplay.paused = !1,
                    this.autoplay.run())))
        },
        onVisibilityChange: function() {
            var e = r();
            "hidden" === e.visibilityState && this.autoplay.running && this.autoplay.pause(),
            "visible" === e.visibilityState && this.autoplay.paused && (this.autoplay.run(),
                this.autoplay.paused = !1)
        },
        onTransitionEnd: function(e) {
            this && !this.destroyed && this.$wrapperEl && e.target === this.$wrapperEl[0] && (this.$wrapperEl[0].removeEventListener("transitionend", this.autoplay.onTransitionEnd),
                this.$wrapperEl[0].removeEventListener("webkitTransitionEnd", this.autoplay.onTransitionEnd),
                this.autoplay.paused = !1,
                this.autoplay.running ? this.autoplay.run() : this.autoplay.stop())
        }
    }
        , ie = {
        setTranslate: function() {
            for (var e = this.slides, t = 0; t < e.length; t += 1) {
                var i = this.slides.eq(t)
                    , s = -i[0].swiperSlideOffset;
                this.params.virtualTranslate || (s -= this.translate);
                var a = 0;
                this.isHorizontal() || (a = s,
                    s = 0);
                var r = this.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
                i.css({
                    opacity: r
                }).transform("translate3d(" + s + "px, " + a + "px, 0px)")
            }
        },
        setTransition: function(e) {
            var t = this
                , i = t.slides
                , s = t.$wrapperEl;
            if (i.transition(e),
            t.params.virtualTranslate && 0 !== e) {
                var a = !1;
                i.transitionEnd(function() {
                    if (!a && t && !t.destroyed) {
                        a = !0,
                            t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1)
                            s.trigger(e[i])
                    }
                })
            }
        }
    }
        , se = {
        setTranslate: function() {
            var e, t = this.$el, i = this.$wrapperEl, s = this.slides, a = this.width, r = this.height, n = this.rtlTranslate, l = this.size, o = this.browser, d = this.params.cubeEffect, h = this.isHorizontal(), p = this.virtual && this.params.virtual.enabled, u = 0;
            d.shadow && (h ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = f('<div class="swiper-cube-shadow"></div>'),
                i.append(e)),
                e.css({
                    height: a + "px"
                })) : 0 === (e = t.find(".swiper-cube-shadow")).length && (e = f('<div class="swiper-cube-shadow"></div>'),
                t.append(e)));
            for (var c = 0; c < s.length; c += 1) {
                var v = s.eq(c)
                    , m = c;
                p && (m = parseInt(v.attr("data-swiper-slide-index"), 10));
                var g = 90 * m
                    , w = Math.floor(g / 360);
                n && (g = -g,
                    w = Math.floor(-g / 360));
                var y = Math.max(Math.min(v[0].progress, 1), -1)
                    , b = 0
                    , E = 0
                    , x = 0;
                m % 4 == 0 ? (b = 4 * -w * l,
                    x = 0) : (m - 1) % 4 == 0 ? (b = 0,
                    x = 4 * -w * l) : (m - 2) % 4 == 0 ? (b = l + 4 * w * l,
                    x = l) : (m - 3) % 4 == 0 && (b = -l,
                    x = 3 * l + 4 * l * w),
                n && (b = -b),
                h || (E = b,
                    b = 0);
                var T = "rotateX(" + (h ? 0 : -g) + "deg) rotateY(" + (h ? g : 0) + "deg) translate3d(" + b + "px, " + E + "px, " + x + "px)";
                if (y <= 1 && y > -1 && (u = 90 * m + 90 * y,
                n && (u = 90 * -m - 90 * y)),
                    v.transform(T),
                    d.slideShadows) {
                    var C = h ? v.find(".swiper-slide-shadow-left") : v.find(".swiper-slide-shadow-top")
                        , S = h ? v.find(".swiper-slide-shadow-right") : v.find(".swiper-slide-shadow-bottom");
                    0 === C.length && (C = f('<div class="swiper-slide-shadow-' + (h ? "left" : "top") + '"></div>'),
                        v.append(C)),
                    0 === S.length && (S = f('<div class="swiper-slide-shadow-' + (h ? "right" : "bottom") + '"></div>'),
                        v.append(S)),
                    C.length && (C[0].style.opacity = Math.max(-y, 0)),
                    S.length && (S[0].style.opacity = Math.max(y, 0))
                }
            }
            if (i.css({
                "-webkit-transform-origin": "50% 50% -" + l / 2 + "px",
                "-moz-transform-origin": "50% 50% -" + l / 2 + "px",
                "-ms-transform-origin": "50% 50% -" + l / 2 + "px",
                "transform-origin": "50% 50% -" + l / 2 + "px"
            }),
                d.shadow)
                if (h)
                    e.transform("translate3d(0px, " + (a / 2 + d.shadowOffset) + "px, " + -a / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + d.shadowScale + ")");
                else {
                    var M = Math.abs(u) - 90 * Math.floor(Math.abs(u) / 90)
                        , z = 1.5 - (Math.sin(2 * M * Math.PI / 360) / 2 + Math.cos(2 * M * Math.PI / 360) / 2)
                        , P = d.shadowScale
                        , k = d.shadowScale / z
                        , $ = d.shadowOffset;
                    e.transform("scale3d(" + P + ", 1, " + k + ") translate3d(0px, " + (r / 2 + $) + "px, " + -r / 2 / k + "px) rotateX(-90deg)")
                }
            var L = o.isSafari || o.isWebView ? -l / 2 : 0;
            i.transform("translate3d(0px,0," + L + "px) rotateX(" + (this.isHorizontal() ? 0 : u) + "deg) rotateY(" + (this.isHorizontal() ? -u : 0) + "deg)")
        },
        setTransition: function(e) {
            var t = this.$el;
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            this.params.cubeEffect.shadow && !this.isHorizontal() && t.find(".swiper-cube-shadow").transition(e)
        }
    }
        , ae = {
        setTranslate: function() {
            for (var e = this.slides, t = this.rtlTranslate, i = 0; i < e.length; i += 1) {
                var s = e.eq(i)
                    , a = s[0].progress;
                this.params.flipEffect.limitRotation && (a = Math.max(Math.min(s[0].progress, 1), -1));
                var r = -180 * a
                    , n = 0
                    , l = -s[0].swiperSlideOffset
                    , o = 0;
                if (this.isHorizontal() ? t && (r = -r) : (o = l,
                    l = 0,
                    n = -r,
                    r = 0),
                    s[0].style.zIndex = -Math.abs(Math.round(a)) + e.length,
                    this.params.flipEffect.slideShadows) {
                    var d = this.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top")
                        , h = this.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
                    0 === d.length && (d = f('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "left" : "top") + '"></div>'),
                        s.append(d)),
                    0 === h.length && (h = f('<div class="swiper-slide-shadow-' + (this.isHorizontal() ? "right" : "bottom") + '"></div>'),
                        s.append(h)),
                    d.length && (d[0].style.opacity = Math.max(-a, 0)),
                    h.length && (h[0].style.opacity = Math.max(a, 0))
                }
                s.transform("translate3d(" + l + "px, " + o + "px, 0px) rotateX(" + n + "deg) rotateY(" + r + "deg)")
            }
        },
        setTransition: function(e) {
            var t = this
                , i = t.slides
                , s = t.activeIndex
                , a = t.$wrapperEl;
            if (i.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),
            t.params.virtualTranslate && 0 !== e) {
                var r = !1;
                i.eq(s).transitionEnd(function() {
                    if (!r && t && !t.destroyed) {
                        r = !0,
                            t.animating = !1;
                        for (var e = ["webkitTransitionEnd", "transitionend"], i = 0; i < e.length; i += 1)
                            a.trigger(e[i])
                    }
                })
            }
        }
    }
        , re = {
        setTranslate: function() {
            for (var e = this.width, t = this.height, i = this.slides, s = this.slidesSizesGrid, a = this.params.coverflowEffect, r = this.isHorizontal(), n = this.translate, l = r ? e / 2 - n : t / 2 - n, o = r ? a.rotate : -a.rotate, d = a.depth, h = 0, p = i.length; h < p; h += 1) {
                var u = i.eq(h)
                    , c = s[h]
                    , v = (l - u[0].swiperSlideOffset - c / 2) / c * a.modifier
                    , m = r ? o * v : 0
                    , g = r ? 0 : o * v
                    , w = -d * Math.abs(v)
                    , y = a.stretch;
                "string" == typeof y && -1 !== y.indexOf("%") && (y = parseFloat(a.stretch) / 100 * c);
                var b = r ? 0 : y * v
                    , E = r ? y * v : 0
                    , x = 1 - (1 - a.scale) * Math.abs(v);
                Math.abs(E) < .001 && (E = 0),
                Math.abs(b) < .001 && (b = 0),
                Math.abs(w) < .001 && (w = 0),
                Math.abs(m) < .001 && (m = 0),
                Math.abs(g) < .001 && (g = 0),
                Math.abs(x) < .001 && (x = 0);
                var T = "translate3d(" + E + "px," + b + "px," + w + "px)  rotateX(" + g + "deg) rotateY(" + m + "deg) scale(" + x + ")";
                if (u.transform(T),
                    u[0].style.zIndex = 1 - Math.abs(Math.round(v)),
                    a.slideShadows) {
                    var C = r ? u.find(".swiper-slide-shadow-left") : u.find(".swiper-slide-shadow-top")
                        , S = r ? u.find(".swiper-slide-shadow-right") : u.find(".swiper-slide-shadow-bottom");
                    0 === C.length && (C = f('<div class="swiper-slide-shadow-' + (r ? "left" : "top") + '"></div>'),
                        u.append(C)),
                    0 === S.length && (S = f('<div class="swiper-slide-shadow-' + (r ? "right" : "bottom") + '"></div>'),
                        u.append(S)),
                    C.length && (C[0].style.opacity = v > 0 ? v : 0),
                    S.length && (S[0].style.opacity = -v > 0 ? -v : 0)
                }
            }
        },
        setTransition: function(e) {
            this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
        }
    }
        , ne = {
        init: function() {
            var e = this.params.thumbs;
            if (this.thumbs.initialized)
                return !1;
            this.thumbs.initialized = !0;
            var t = this.constructor;
            return e.swiper instanceof t ? (this.thumbs.swiper = e.swiper,
                C(this.thumbs.swiper.originalParams, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                }),
                C(this.thumbs.swiper.params, {
                    watchSlidesProgress: !0,
                    slideToClickedSlide: !1
                })) : T(e.swiper) && (this.thumbs.swiper = new t(C({}, e.swiper, {
                watchSlidesVisibility: !0,
                watchSlidesProgress: !0,
                slideToClickedSlide: !1
            })),
                this.thumbs.swiperCreated = !0),
                this.thumbs.swiper.$el.addClass(this.params.thumbs.thumbsContainerClass),
                this.thumbs.swiper.on("tap", this.thumbs.onThumbClick),
                !0
        },
        onThumbClick: function() {
            var e = this.thumbs.swiper;
            if (e) {
                var t = e.clickedIndex
                    , i = e.clickedSlide;
                if (!(i && f(i).hasClass(this.params.thumbs.slideThumbActiveClass) || null == t)) {
                    var s;
                    if (s = e.params.loop ? parseInt(f(e.clickedSlide).attr("data-swiper-slide-index"), 10) : t,
                        this.params.loop) {
                        var a = this.activeIndex;
                        this.slides.eq(a).hasClass(this.params.slideDuplicateClass) && (this.loopFix(),
                            this._clientLeft = this.$wrapperEl[0].clientLeft,
                            a = this.activeIndex);
                        var r = this.slides.eq(a).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index()
                            , n = this.slides.eq(a).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
                        s = void 0 === r ? n : void 0 === n ? r : n - a < a - r ? n : r
                    }
                    this.slideTo(s)
                }
            }
        },
        update: function(e) {
            var t = this.thumbs.swiper;
            if (t) {
                var i = "auto" === t.params.slidesPerView ? t.slidesPerViewDynamic() : t.params.slidesPerView
                    , s = this.params.thumbs.autoScrollOffset
                    , a = s && !t.params.loop;
                if (this.realIndex !== t.realIndex || a) {
                    var r, n, l = t.activeIndex;
                    if (t.params.loop) {
                        t.slides.eq(l).hasClass(t.params.slideDuplicateClass) && (t.loopFix(),
                            t._clientLeft = t.$wrapperEl[0].clientLeft,
                            l = t.activeIndex);
                        var o = t.slides.eq(l).prevAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index()
                            , d = t.slides.eq(l).nextAll('[data-swiper-slide-index="' + this.realIndex + '"]').eq(0).index();
                        r = void 0 === o ? d : void 0 === d ? o : d - l == l - o ? l : d - l < l - o ? d : o,
                            n = this.activeIndex > this.previousIndex ? "next" : "prev"
                    } else
                        n = (r = this.realIndex) > this.previousIndex ? "next" : "prev";
                    a && (r += "next" === n ? s : -1 * s),
                    t.visibleSlidesIndexes && t.visibleSlidesIndexes.indexOf(r) < 0 && (t.params.centeredSlides ? r = r > l ? r - Math.floor(i / 2) + 1 : r + Math.floor(i / 2) - 1 : r > l && (r = r - i + 1),
                        t.slideTo(r, e ? 0 : void 0))
                }
                var h = 1
                    , p = this.params.thumbs.slideThumbActiveClass;
                if (this.params.slidesPerView > 1 && !this.params.centeredSlides && (h = this.params.slidesPerView),
                this.params.thumbs.multipleActiveThumbs || (h = 1),
                    h = Math.floor(h),
                    t.slides.removeClass(p),
                t.params.loop || t.params.virtual && t.params.virtual.enabled)
                    for (var u = 0; u < h; u += 1)
                        t.$wrapperEl.children('[data-swiper-slide-index="' + (this.realIndex + u) + '"]').addClass(p);
                else
                    for (var c = 0; c < h; c += 1)
                        t.slides.eq(this.realIndex + c).addClass(p)
            }
        }
    }
        , le = [Y, F, {
        name: "mousewheel",
        params: {
            mousewheel: {
                enabled: !1,
                releaseOnEdges: !1,
                invert: !1,
                forceToAxis: !1,
                sensitivity: 1,
                eventsTarget: "container",
                thresholdDelta: null,
                thresholdTime: null
            }
        },
        create: function() {
            S(this, {
                mousewheel: {
                    enabled: !1,
                    lastScrollTime: E(),
                    lastEventBeforeSnap: void 0,
                    recentWheelEvents: [],
                    enable: R.enable,
                    disable: R.disable,
                    handle: R.handle,
                    handleMouseEnter: R.handleMouseEnter,
                    handleMouseLeave: R.handleMouseLeave,
                    animateSlider: R.animateSlider,
                    releaseScroll: R.releaseScroll
                }
            })
        },
        on: {
            init: function(e) {
                !e.params.mousewheel.enabled && e.params.cssMode && e.mousewheel.disable(),
                e.params.mousewheel.enabled && e.mousewheel.enable()
            },
            destroy: function(e) {
                e.params.cssMode && e.mousewheel.enable(),
                e.mousewheel.enabled && e.mousewheel.disable()
            }
        }
    }, {
        name: "navigation",
        params: {
            navigation: {
                nextEl: null,
                prevEl: null,
                hideOnClick: !1,
                disabledClass: "swiper-button-disabled",
                hiddenClass: "swiper-button-hidden",
                lockClass: "swiper-button-lock"
            }
        },
        create: function() {
            S(this, {
                navigation: t({}, W)
            })
        },
        on: {
            init: function(e) {
                e.navigation.init(),
                    e.navigation.update()
            },
            toEdge: function(e) {
                e.navigation.update()
            },
            fromEdge: function(e) {
                e.navigation.update()
            },
            destroy: function(e) {
                e.navigation.destroy()
            },
            click: function(e, t) {
                var i, s = e.navigation, a = s.$nextEl, r = s.$prevEl;
                !e.params.navigation.hideOnClick || f(t.target).is(r) || f(t.target).is(a) || (a ? i = a.hasClass(e.params.navigation.hiddenClass) : r && (i = r.hasClass(e.params.navigation.hiddenClass)),
                    !0 === i ? e.emit("navigationShow") : e.emit("navigationHide"),
                a && a.toggleClass(e.params.navigation.hiddenClass),
                r && r.toggleClass(e.params.navigation.hiddenClass))
            }
        }
    }, {
        name: "pagination",
        params: {
            pagination: {
                el: null,
                bulletElement: "span",
                clickable: !1,
                hideOnClick: !1,
                renderBullet: null,
                renderProgressbar: null,
                renderFraction: null,
                renderCustom: null,
                progressbarOpposite: !1,
                type: "bullets",
                dynamicBullets: !1,
                dynamicMainBullets: 1,
                formatFractionCurrent: function(e) {
                    return e
                },
                formatFractionTotal: function(e) {
                    return e
                },
                bulletClass: "swiper-pagination-bullet",
                bulletActiveClass: "swiper-pagination-bullet-active",
                modifierClass: "swiper-pagination-",
                currentClass: "swiper-pagination-current",
                totalClass: "swiper-pagination-total",
                hiddenClass: "swiper-pagination-hidden",
                progressbarFillClass: "swiper-pagination-progressbar-fill",
                progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
                clickableClass: "swiper-pagination-clickable",
                lockClass: "swiper-pagination-lock"
            }
        },
        create: function() {
            S(this, {
                pagination: t({
                    dynamicBulletIndex: 0
                }, q)
            })
        },
        on: {
            init: function(e) {
                e.pagination.init(),
                    e.pagination.render(),
                    e.pagination.update()
            },
            activeIndexChange: function(e) {
                (e.params.loop || void 0 === e.snapIndex) && e.pagination.update()
            },
            snapIndexChange: function(e) {
                e.params.loop || e.pagination.update()
            },
            slidesLengthChange: function(e) {
                e.params.loop && (e.pagination.render(),
                    e.pagination.update())
            },
            snapGridLengthChange: function(e) {
                e.params.loop || (e.pagination.render(),
                    e.pagination.update())
            },
            destroy: function(e) {
                e.pagination.destroy()
            },
            click: function(e, t) {
                e.params.pagination.el && e.params.pagination.hideOnClick && e.pagination.$el.length > 0 && !f(t.target).hasClass(e.params.pagination.bulletClass) && (!0 === e.pagination.$el.hasClass(e.params.pagination.hiddenClass) ? e.emit("paginationShow") : e.emit("paginationHide"),
                    e.pagination.$el.toggleClass(e.params.pagination.hiddenClass))
            }
        }
    }, {
        name: "scrollbar",
        params: {
            scrollbar: {
                el: null,
                dragSize: "auto",
                hide: !1,
                draggable: !1,
                snapOnRelease: !0,
                lockClass: "swiper-scrollbar-lock",
                dragClass: "swiper-scrollbar-drag"
            }
        },
        create: function() {
            S(this, {
                scrollbar: t({
                    isTouched: !1,
                    timeout: null,
                    dragTimeout: null
                }, j)
            })
        },
        on: {
            init: function(e) {
                e.scrollbar.init(),
                    e.scrollbar.updateSize(),
                    e.scrollbar.setTranslate()
            },
            update: function(e) {
                e.scrollbar.updateSize()
            },
            resize: function(e) {
                e.scrollbar.updateSize()
            },
            observerUpdate: function(e) {
                e.scrollbar.updateSize()
            },
            setTranslate: function(e) {
                e.scrollbar.setTranslate()
            },
            setTransition: function(e, t) {
                e.scrollbar.setTransition(t)
            },
            destroy: function(e) {
                e.scrollbar.destroy()
            }
        }
    }, {
        name: "parallax",
        params: {
            parallax: {
                enabled: !1
            }
        },
        create: function() {
            S(this, {
                parallax: t({}, _)
            })
        },
        on: {
            beforeInit: function(e) {
                e.params.parallax.enabled && (e.params.watchSlidesProgress = !0,
                    e.originalParams.watchSlidesProgress = !0)
            },
            init: function(e) {
                e.params.parallax.enabled && e.parallax.setTranslate()
            },
            setTranslate: function(e) {
                e.params.parallax.enabled && e.parallax.setTranslate()
            },
            setTransition: function(e, t) {
                e.params.parallax.enabled && e.parallax.setTransition(t)
            }
        }
    }, {
        name: "zoom",
        params: {
            zoom: {
                enabled: !1,
                maxRatio: 3,
                minRatio: 1,
                toggle: !0,
                containerClass: "swiper-zoom-container",
                zoomedSlideClass: "swiper-slide-zoomed"
            }
        },
        create: function() {
            var e = this;
            S(e, {
                zoom: t({
                    enabled: !1,
                    scale: 1,
                    currentScale: 1,
                    isScaling: !1,
                    gesture: {
                        $slideEl: void 0,
                        slideWidth: void 0,
                        slideHeight: void 0,
                        $imageEl: void 0,
                        $imageWrapEl: void 0,
                        maxRatio: 3
                    },
                    image: {
                        isTouched: void 0,
                        isMoved: void 0,
                        currentX: void 0,
                        currentY: void 0,
                        minX: void 0,
                        minY: void 0,
                        maxX: void 0,
                        maxY: void 0,
                        width: void 0,
                        height: void 0,
                        startX: void 0,
                        startY: void 0,
                        touchesStart: {},
                        touchesCurrent: {}
                    },
                    velocity: {
                        x: void 0,
                        y: void 0,
                        prevPositionX: void 0,
                        prevPositionY: void 0,
                        prevTime: void 0
                    }
                }, U)
            });
            var i = 1;
            Object.defineProperty(e.zoom, "scale", {
                get: function() {
                    return i
                },
                set: function(t) {
                    if (i !== t) {
                        var s = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0
                            , a = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
                        e.emit("zoomChange", t, s, a)
                    }
                    i = t
                }
            })
        },
        on: {
            init: function(e) {
                e.params.zoom.enabled && e.zoom.enable()
            },
            destroy: function(e) {
                e.zoom.disable()
            },
            touchStart: function(e, t) {
                e.zoom.enabled && e.zoom.onTouchStart(t)
            },
            touchEnd: function(e, t) {
                e.zoom.enabled && e.zoom.onTouchEnd(t)
            },
            doubleTap: function(e, t) {
                e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && e.zoom.toggle(t)
            },
            transitionEnd: function(e) {
                e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd()
            },
            slideChange: function(e) {
                e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && e.zoom.onTransitionEnd()
            }
        }
    }, {
        name: "lazy",
        params: {
            lazy: {
                enabled: !1,
                loadPrevNext: !1,
                loadPrevNextAmount: 1,
                loadOnTransitionStart: !1,
                elementClass: "swiper-lazy",
                loadingClass: "swiper-lazy-loading",
                loadedClass: "swiper-lazy-loaded",
                preloaderClass: "swiper-lazy-preloader"
            }
        },
        create: function() {
            S(this, {
                lazy: t({
                    initialImageLoaded: !1
                }, K)
            })
        },
        on: {
            beforeInit: function(e) {
                e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
            },
            init: function(e) {
                e.params.lazy.enabled && !e.params.loop && 0 === e.params.initialSlide && e.lazy.load()
            },
            scroll: function(e) {
                e.params.freeMode && !e.params.freeModeSticky && e.lazy.load()
            },
            resize: function(e) {
                e.params.lazy.enabled && e.lazy.load()
            },
            scrollbarDragMove: function(e) {
                e.params.lazy.enabled && e.lazy.load()
            },
            transitionStart: function(e) {
                e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
            },
            transitionEnd: function(e) {
                e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && e.lazy.load()
            },
            slideChange: function(e) {
                e.params.lazy.enabled && e.params.cssMode && e.lazy.load()
            }
        }
    }, {
        name: "controller",
        params: {
            controller: {
                control: void 0,
                inverse: !1,
                by: "slide"
            }
        },
        create: function() {
            S(this, {
                controller: t({
                    control: this.params.controller.control
                }, Z)
            })
        },
        on: {
            update: function(e) {
                e.controller.control && e.controller.spline && (e.controller.spline = void 0,
                    delete e.controller.spline)
            },
            resize: function(e) {
                e.controller.control && e.controller.spline && (e.controller.spline = void 0,
                    delete e.controller.spline)
            },
            observerUpdate: function(e) {
                e.controller.control && e.controller.spline && (e.controller.spline = void 0,
                    delete e.controller.spline)
            },
            setTranslate: function(e, t, i) {
                e.controller.control && e.controller.setTranslate(t, i)
            },
            setTransition: function(e, t, i) {
                e.controller.control && e.controller.setTransition(t, i)
            }
        }
    }, {
        name: "a11y",
        params: {
            a11y: {
                enabled: !0,
                notificationClass: "swiper-notification",
                prevSlideMessage: "Previous slide",
                nextSlideMessage: "Next slide",
                firstSlideMessage: "This is the first slide",
                lastSlideMessage: "This is the last slide",
                paginationBulletMessage: "Go to slide ",
                containerMessage: null,
                containerRoleDescriptionMessage: null,
                itemRoleDescriptionMessage: null
            }
        },
        create: function() {
            S(this, {
                a11y: t(t({}, J), {}, {
                    liveRegion: f('<span class="' + this.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
                })
            })
        },
        on: {
            afterInit: function(e) {
                e.params.a11y.enabled && (e.a11y.init(),
                    e.a11y.updateNavigation())
            },
            toEdge: function(e) {
                e.params.a11y.enabled && e.a11y.updateNavigation()
            },
            fromEdge: function(e) {
                e.params.a11y.enabled && e.a11y.updateNavigation()
            },
            paginationUpdate: function(e) {
                e.params.a11y.enabled && e.a11y.updatePagination()
            },
            destroy: function(e) {
                e.params.a11y.enabled && e.a11y.destroy()
            }
        }
    }, {
        name: "history",
        params: {
            history: {
                enabled: !1,
                replaceState: !1,
                key: "slides"
            }
        },
        create: function() {
            S(this, {
                history: t({}, Q)
            })
        },
        on: {
            init: function(e) {
                e.params.history.enabled && e.history.init()
            },
            destroy: function(e) {
                e.params.history.enabled && e.history.destroy()
            },
            transitionEnd: function(e) {
                e.history.initialized && e.history.setHistory(e.params.history.key, e.activeIndex)
            },
            slideChange: function(e) {
                e.history.initialized && e.params.cssMode && e.history.setHistory(e.params.history.key, e.activeIndex)
            }
        }
    }, {
        name: "hash-navigation",
        params: {
            hashNavigation: {
                enabled: !1,
                replaceState: !1,
                watchState: !1
            }
        },
        create: function() {
            S(this, {
                hashNavigation: t({
                    initialized: !1
                }, ee)
            })
        },
        on: {
            init: function(e) {
                e.params.hashNavigation.enabled && e.hashNavigation.init()
            },
            destroy: function(e) {
                e.params.hashNavigation.enabled && e.hashNavigation.destroy()
            },
            transitionEnd: function(e) {
                e.hashNavigation.initialized && e.hashNavigation.setHash()
            },
            slideChange: function(e) {
                e.hashNavigation.initialized && e.params.cssMode && e.hashNavigation.setHash()
            }
        }
    }, {
        name: "autoplay",
        params: {
            autoplay: {
                enabled: !1,
                delay: 3e3,
                waitForTransition: !0,
                disableOnInteraction: !0,
                stopOnLastSlide: !1,
                reverseDirection: !1
            }
        },
        create: function() {
            S(this, {
                autoplay: t(t({}, te), {}, {
                    running: !1,
                    paused: !1
                })
            })
        },
        on: {
            init: function(e) {
                e.params.autoplay.enabled && (e.autoplay.start(),
                    r().addEventListener("visibilitychange", e.autoplay.onVisibilityChange))
            },
            beforeTransitionStart: function(e, t, i) {
                e.autoplay.running && (i || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(t) : e.autoplay.stop())
            },
            sliderFirstMove: function(e) {
                e.autoplay.running && (e.params.autoplay.disableOnInteraction ? e.autoplay.stop() : e.autoplay.pause())
            },
            touchEnd: function(e) {
                e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && e.autoplay.run()
            },
            destroy: function(e) {
                e.autoplay.running && e.autoplay.stop(),
                    r().removeEventListener("visibilitychange", e.autoplay.onVisibilityChange)
            }
        }
    }, {
        name: "effect-fade",
        params: {
            fadeEffect: {
                crossFade: !1
            }
        },
        create: function() {
            S(this, {
                fadeEffect: t({}, ie)
            })
        },
        on: {
            beforeInit: function(e) {
                if ("fade" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "fade");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    C(e.params, t),
                        C(e.originalParams, t)
                }
            },
            setTranslate: function(e) {
                "fade" === e.params.effect && e.fadeEffect.setTranslate()
            },
            setTransition: function(e, t) {
                "fade" === e.params.effect && e.fadeEffect.setTransition(t)
            }
        }
    }, {
        name: "effect-cube",
        params: {
            cubeEffect: {
                slideShadows: !0,
                shadow: !0,
                shadowOffset: 20,
                shadowScale: .94
            }
        },
        create: function() {
            S(this, {
                cubeEffect: t({}, se)
            })
        },
        on: {
            beforeInit: function(e) {
                if ("cube" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "cube"),
                        e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        resistanceRatio: 0,
                        spaceBetween: 0,
                        centeredSlides: !1,
                        virtualTranslate: !0
                    };
                    C(e.params, t),
                        C(e.originalParams, t)
                }
            },
            setTranslate: function(e) {
                "cube" === e.params.effect && e.cubeEffect.setTranslate()
            },
            setTransition: function(e, t) {
                "cube" === e.params.effect && e.cubeEffect.setTransition(t)
            }
        }
    }, {
        name: "effect-flip",
        params: {
            flipEffect: {
                slideShadows: !0,
                limitRotation: !0
            }
        },
        create: function() {
            S(this, {
                flipEffect: t({}, ae)
            })
        },
        on: {
            beforeInit: function(e) {
                if ("flip" === e.params.effect) {
                    e.classNames.push(e.params.containerModifierClass + "flip"),
                        e.classNames.push(e.params.containerModifierClass + "3d");
                    var t = {
                        slidesPerView: 1,
                        slidesPerColumn: 1,
                        slidesPerGroup: 1,
                        watchSlidesProgress: !0,
                        spaceBetween: 0,
                        virtualTranslate: !0
                    };
                    C(e.params, t),
                        C(e.originalParams, t)
                }
            },
            setTranslate: function(e) {
                "flip" === e.params.effect && e.flipEffect.setTranslate()
            },
            setTransition: function(e, t) {
                "flip" === e.params.effect && e.flipEffect.setTransition(t)
            }
        }
    }, {
        name: "effect-coverflow",
        params: {
            coverflowEffect: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                scale: 1,
                modifier: 1,
                slideShadows: !0
            }
        },
        create: function() {
            S(this, {
                coverflowEffect: t({}, re)
            })
        },
        on: {
            beforeInit: function(e) {
                "coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"),
                    e.classNames.push(e.params.containerModifierClass + "3d"),
                    e.params.watchSlidesProgress = !0,
                    e.originalParams.watchSlidesProgress = !0)
            },
            setTranslate: function(e) {
                "coverflow" === e.params.effect && e.coverflowEffect.setTranslate()
            },
            setTransition: function(e, t) {
                "coverflow" === e.params.effect && e.coverflowEffect.setTransition(t)
            }
        }
    }, {
        name: "thumbs",
        params: {
            thumbs: {
                swiper: null,
                multipleActiveThumbs: !0,
                autoScrollOffset: 0,
                slideThumbActiveClass: "swiper-slide-thumb-active",
                thumbsContainerClass: "swiper-container-thumbs"
            }
        },
        create: function() {
            S(this, {
                thumbs: t({
                    swiper: null,
                    initialized: !1
                }, ne)
            })
        },
        on: {
            beforeInit: function(e) {
                var t = e.params.thumbs;
                t && t.swiper && (e.thumbs.init(),
                    e.thumbs.update(!0))
            },
            slideChange: function(e) {
                e.thumbs.swiper && e.thumbs.update()
            },
            update: function(e) {
                e.thumbs.swiper && e.thumbs.update()
            },
            resize: function(e) {
                e.thumbs.swiper && e.thumbs.update()
            },
            observerUpdate: function(e) {
                e.thumbs.swiper && e.thumbs.update()
            },
            setTransition: function(e, t) {
                var i = e.thumbs.swiper;
                i && i.setTransition(t)
            },
            beforeDestroy: function(e) {
                var t = e.thumbs.swiper;
                t && e.thumbs.swiperCreated && t && t.destroy()
            }
        }
    }];
    return H.use(le),
        H
});
/* Magnific Popup - 1.1.0 */
!function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : a("object" == typeof exports ? require("jquery") : window.jQuery || window.Zepto)
}(function(a) {
    var b, c, d, e, f, g, h = "Close", i = "BeforeClose", j = "AfterClose", k = "BeforeAppend", l = "MarkupParse", m = "Open", n = "Change", o = "mfp", p = "." + o, q = "mfp-ready", r = "mfp-removing", s = "mfp-prevent-close", t = function() {}, u = !!window.jQuery, v = a(window), w = function(a, c) {
        b.ev.on(o + a + p, c)
    }, x = function(b, c, d, e) {
        var f = document.createElement("div");
        return f.className = "mfp-" + b,
        d && (f.innerHTML = d),
            e ? c && c.appendChild(f) : (f = a(f),
            c && f.appendTo(c)),
            f
    }, y = function(c, d) {
        b.ev.triggerHandler(o + c, d),
        b.st.callbacks && (c = c.charAt(0).toLowerCase() + c.slice(1),
        b.st.callbacks[c] && b.st.callbacks[c].apply(b, a.isArray(d) ? d : [d]))
    }, z = function(c) {
        return c === g && b.currTemplate.closeBtn || (b.currTemplate.closeBtn = a(b.st.closeMarkup.replace("%title%", b.st.tClose)),
            g = c),
            b.currTemplate.closeBtn
    }, A = function() {
        a.magnificPopup.instance || (b = new t,
            b.init(),
            a.magnificPopup.instance = b)
    }, B = function() {
        var a = document.createElement("p").style
            , b = ["ms", "O", "Moz", "Webkit"];
        if (void 0 !== a.transition)
            return !0;
        for (; b.length; )
            if (b.pop() + "Transition"in a)
                return !0;
        return !1
    };
    t.prototype = {
        constructor: t,
        init: function() {
            var c = navigator.appVersion;
            b.isLowIE = b.isIE8 = document.all && !document.addEventListener,
                b.isAndroid = /android/gi.test(c),
                b.isIOS = /iphone|ipad|ipod/gi.test(c),
                b.supportsTransition = B(),
                b.probablyMobile = b.isAndroid || b.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent),
                d = a(document),
                b.popupsCache = {}
        },
        open: function(c) {
            var e;
            if (c.isObj === !1) {
                b.items = c.items.toArray(),
                    b.index = 0;
                var g, h = c.items;
                for (e = 0; e < h.length; e++)
                    if (g = h[e],
                    g.parsed && (g = g.el[0]),
                    g === c.el[0]) {
                        b.index = e;
                        break
                    }
            } else
                b.items = a.isArray(c.items) ? c.items : [c.items],
                    b.index = c.index || 0;
            if (b.isOpen)
                return void b.updateItemHTML();
            b.types = [],
                f = "",
                c.mainEl && c.mainEl.length ? b.ev = c.mainEl.eq(0) : b.ev = d,
                c.key ? (b.popupsCache[c.key] || (b.popupsCache[c.key] = {}),
                    b.currTemplate = b.popupsCache[c.key]) : b.currTemplate = {},
                b.st = a.extend(!0, {}, a.magnificPopup.defaults, c),
                b.fixedContentPos = "auto" === b.st.fixedContentPos ? !b.probablyMobile : b.st.fixedContentPos,
            b.st.modal && (b.st.closeOnContentClick = !1,
                b.st.closeOnBgClick = !1,
                b.st.showCloseBtn = !1,
                b.st.enableEscapeKey = !1),
            b.bgOverlay || (b.bgOverlay = x("bg").on("click" + p, function() {
                b.close()
            }),
                b.wrap = x("wrap").attr("tabindex", -1).on("click" + p, function(a) {
                    b._checkIfClose(a.target) && b.close()
                }),
                b.container = x("container", b.wrap)),
                b.contentContainer = x("content"),
            b.st.preloader && (b.preloader = x("preloader", b.container, b.st.tLoading));
            var i = a.magnificPopup.modules;
            for (e = 0; e < i.length; e++) {
                var j = i[e];
                j = j.charAt(0).toUpperCase() + j.slice(1),
                    b["init" + j].call(b)
            }
            y("BeforeOpen"),
            b.st.showCloseBtn && (b.st.closeBtnInside ? (w(l, function(a, b, c, d) {
                c.close_replaceWith = z(d.type)
            }),
                f += " mfp-close-btn-in") : b.wrap.append(z())),
            b.st.alignTop && (f += " mfp-align-top"),
                b.fixedContentPos ? b.wrap.css({
                    overflow: b.st.overflowY,
                    overflowX: "hidden",
                    overflowY: b.st.overflowY
                }) : b.wrap.css({
                    top: v.scrollTop(),
                    position: "absolute"
                }),
            (b.st.fixedBgPos === !1 || "auto" === b.st.fixedBgPos && !b.fixedContentPos) && b.bgOverlay.css({
                height: d.height(),
                position: "absolute"
            }),
            b.st.enableEscapeKey && d.on("keyup" + p, function(a) {
                27 === a.keyCode && b.close()
            }),
                v.on("resize" + p, function() {
                    b.updateSize()
                }),
            b.st.closeOnContentClick || (f += " mfp-auto-cursor"),
            f && b.wrap.addClass(f);
            var k = b.wH = v.height()
                , n = {};
            if (b.fixedContentPos && b._hasScrollBar(k)) {
                var o = b._getScrollbarSize();
                o && (n.marginRight = o)
            }
            b.fixedContentPos && (b.isIE7 ? a("body, html").css("overflow", "hidden") : n.overflow = "hidden");
            var r = b.st.mainClass;
            return b.isIE7 && (r += " mfp-ie7"),
            r && b._addClassToMFP(r),
                b.updateItemHTML(),
                y("BuildControls"),
                a("html").css(n),
                b.bgOverlay.add(b.wrap).prependTo(b.st.prependTo || a(document.body)),
                b._lastFocusedEl = document.activeElement,
                setTimeout(function() {
                    b.content ? (b._addClassToMFP(q),
                        b._setFocus()) : b.bgOverlay.addClass(q),
                        d.on("focusin" + p, b._onFocusIn)
                }, 16),
                b.isOpen = !0,
                b.updateSize(k),
                y(m),
                c
        },
        close: function() {
            b.isOpen && (y(i),
                b.isOpen = !1,
                b.st.removalDelay && !b.isLowIE && b.supportsTransition ? (b._addClassToMFP(r),
                    setTimeout(function() {
                        b._close()
                    }, b.st.removalDelay)) : b._close())
        },
        _close: function() {
            y(h);
            var c = r + " " + q + " ";
            if (b.bgOverlay.detach(),
                b.wrap.detach(),
                b.container.empty(),
            b.st.mainClass && (c += b.st.mainClass + " "),
                b._removeClassFromMFP(c),
                b.fixedContentPos) {
                var e = {
                    marginRight: ""
                };
                b.isIE7 ? a("body, html").css("overflow", "") : e.overflow = "",
                    a("html").css(e)
            }
            d.off("keyup" + p + " focusin" + p),
                b.ev.off(p),
                b.wrap.attr("class", "mfp-wrap").removeAttr("style"),
                b.bgOverlay.attr("class", "mfp-bg"),
                b.container.attr("class", "mfp-container"),
            !b.st.showCloseBtn || b.st.closeBtnInside && b.currTemplate[b.currItem.type] !== !0 || b.currTemplate.closeBtn && b.currTemplate.closeBtn.detach(),
            b.st.autoFocusLast && b._lastFocusedEl && a(b._lastFocusedEl).focus(),
                b.currItem = null,
                b.content = null,
                b.currTemplate = null,
                b.prevHeight = 0,
                y(j)
        },
        updateSize: function(a) {
            if (b.isIOS) {
                var c = document.documentElement.clientWidth / window.innerWidth
                    , d = window.innerHeight * c;
                b.wrap.css("height", d),
                    b.wH = d
            } else
                b.wH = a || v.height();
            b.fixedContentPos || b.wrap.css("height", b.wH),
                y("Resize")
        },
        updateItemHTML: function() {
            var c = b.items[b.index];
            b.contentContainer.detach(),
            b.content && b.content.detach(),
            c.parsed || (c = b.parseEl(b.index));
            var d = c.type;
            if (y("BeforeChange", [b.currItem ? b.currItem.type : "", d]),
                b.currItem = c,
                !b.currTemplate[d]) {
                var f = b.st[d] ? b.st[d].markup : !1;
                y("FirstMarkupParse", f),
                    f ? b.currTemplate[d] = a(f) : b.currTemplate[d] = !0
            }
            e && e !== c.type && b.container.removeClass("mfp-" + e + "-holder");
            var g = b["get" + d.charAt(0).toUpperCase() + d.slice(1)](c, b.currTemplate[d]);
            b.appendContent(g, d),
                c.preloaded = !0,
                y(n, c),
                e = c.type,
                b.container.prepend(b.contentContainer),
                y("AfterChange")
        },
        appendContent: function(a, c) {
            b.content = a,
                a ? b.st.showCloseBtn && b.st.closeBtnInside && b.currTemplate[c] === !0 ? b.content.find(".mfp-close").length || b.content.append(z()) : b.content = a : b.content = "",
                y(k),
                b.container.addClass("mfp-" + c + "-holder"),
                b.contentContainer.append(b.content)
        },
        parseEl: function(c) {
            var d, e = b.items[c];
            if (e.tagName ? e = {
                el: a(e)
            } : (d = e.type,
                e = {
                    data: e,
                    src: e.src
                }),
                e.el) {
                for (var f = b.types, g = 0; g < f.length; g++)
                    if (e.el.hasClass("mfp-" + f[g])) {
                        d = f[g];
                        break
                    }
                e.src = e.el.attr("data-mfp-src"),
                e.src || (e.src = e.el.attr("href"))
            }
            return e.type = d || b.st.type || "inline",
                e.index = c,
                e.parsed = !0,
                b.items[c] = e,
                y("ElementParse", e),
                b.items[c]
        },
        addGroup: function(a, c) {
            var d = function(d) {
                d.mfpEl = this,
                    b._openClick(d, a, c)
            };
            c || (c = {});
            var e = "click.magnificPopup";
            c.mainEl = a,
                c.items ? (c.isObj = !0,
                    a.off(e).on(e, d)) : (c.isObj = !1,
                    c.delegate ? a.off(e).on(e, c.delegate, d) : (c.items = a,
                        a.off(e).on(e, d)))
        },
        _openClick: function(c, d, e) {
            var f = void 0 !== e.midClick ? e.midClick : a.magnificPopup.defaults.midClick;
            if (f || !(2 === c.which || c.ctrlKey || c.metaKey || c.altKey || c.shiftKey)) {
                var g = void 0 !== e.disableOn ? e.disableOn : a.magnificPopup.defaults.disableOn;
                if (g)
                    if (a.isFunction(g)) {
                        if (!g.call(b))
                            return !0
                    } else if (v.width() < g)
                        return !0;
                c.type && (c.preventDefault(),
                b.isOpen && c.stopPropagation()),
                    e.el = a(c.mfpEl),
                e.delegate && (e.items = d.find(e.delegate)),
                    b.open(e)
            }
        },
        updateStatus: function(a, d) {
            if (b.preloader) {
                c !== a && b.container.removeClass("mfp-s-" + c),
                d || "loading" !== a || (d = b.st.tLoading);
                var e = {
                    status: a,
                    text: d
                };
                y("UpdateStatus", e),
                    a = e.status,
                    d = e.text,
                    b.preloader.html(d),
                    b.preloader.find("a").on("click", function(a) {
                        a.stopImmediatePropagation()
                    }),
                    b.container.addClass("mfp-s-" + a),
                    c = a
            }
        },
        _checkIfClose: function(c) {
            if (!a(c).hasClass(s)) {
                var d = b.st.closeOnContentClick
                    , e = b.st.closeOnBgClick;
                if (d && e)
                    return !0;
                if (!b.content || a(c).hasClass("mfp-close") || b.preloader && c === b.preloader[0])
                    return !0;
                if (c === b.content[0] || a.contains(b.content[0], c)) {
                    if (d)
                        return !0
                } else if (e && a.contains(document, c))
                    return !0;
                return !1
            }
        },
        _addClassToMFP: function(a) {
            b.bgOverlay.addClass(a),
                b.wrap.addClass(a)
        },
        _removeClassFromMFP: function(a) {
            this.bgOverlay.removeClass(a),
                b.wrap.removeClass(a)
        },
        _hasScrollBar: function(a) {
            return (b.isIE7 ? d.height() : document.body.scrollHeight) > (a || v.height())
        },
        _setFocus: function() {
            (b.st.focus ? b.content.find(b.st.focus).eq(0) : b.wrap).focus()
        },
        _onFocusIn: function(c) {
            return c.target === b.wrap[0] || a.contains(b.wrap[0], c.target) ? void 0 : (b._setFocus(),
                !1)
        },
        _parseMarkup: function(b, c, d) {
            var e;
            d.data && (c = a.extend(d.data, c)),
                y(l, [b, c, d]),
                a.each(c, function(c, d) {
                    if (void 0 === d || d === !1)
                        return !0;
                    if (e = c.split("_"),
                    e.length > 1) {
                        var f = b.find(p + "-" + e[0]);
                        if (f.length > 0) {
                            var g = e[1];
                            "replaceWith" === g ? f[0] !== d[0] && f.replaceWith(d) : "img" === g ? f.is("img") ? f.attr("src", d) : f.replaceWith(a("<img>").attr("src", d).attr("class", f.attr("class"))) : f.attr(e[1], d)
                        }
                    } else
                        b.find(p + "-" + c).html(d)
                })
        },
        _getScrollbarSize: function() {
            if (void 0 === b.scrollbarSize) {
                var a = document.createElement("div");
                a.style.cssText = "width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;",
                    document.body.appendChild(a),
                    b.scrollbarSize = a.offsetWidth - a.clientWidth,
                    document.body.removeChild(a)
            }
            return b.scrollbarSize
        }
    },
        a.magnificPopup = {
            instance: null,
            proto: t.prototype,
            modules: [],
            open: function(b, c) {
                return A(),
                    b = b ? a.extend(!0, {}, b) : {},
                    b.isObj = !0,
                    b.index = c || 0,
                    this.instance.open(b)
            },
            close: function() {
                return a.magnificPopup.instance && a.magnificPopup.instance.close()
            },
            registerModule: function(b, c) {
                c.options && (a.magnificPopup.defaults[b] = c.options),
                    a.extend(this.proto, c.proto),
                    this.modules.push(b)
            },
            defaults: {
                disableOn: 0,
                key: null,
                midClick: !1,
                mainClass: "",
                preloader: !0,
                focus: "",
                closeOnContentClick: !1,
                closeOnBgClick: !0,
                closeBtnInside: !0,
                showCloseBtn: !0,
                enableEscapeKey: !0,
                modal: !1,
                alignTop: !1,
                removalDelay: 0,
                prependTo: null,
                fixedContentPos: "auto",
                fixedBgPos: "auto",
                overflowY: "auto",
                closeMarkup: '<button title="%title%" type="button" class="mfp-close">&#215;</button>',
                tClose: "Close (Esc)",
                tLoading: "Loading...",
                autoFocusLast: !0
            }
        },
        a.fn.magnificPopup = function(c) {
            A();
            var d = a(this);
            if ("string" == typeof c)
                if ("open" === c) {
                    var e, f = u ? d.data("magnificPopup") : d[0].magnificPopup, g = parseInt(arguments[1], 10) || 0;
                    f.items ? e = f.items[g] : (e = d,
                    f.delegate && (e = e.find(f.delegate)),
                        e = e.eq(g)),
                        b._openClick({
                            mfpEl: e
                        }, d, f)
                } else
                    b.isOpen && b[c].apply(b, Array.prototype.slice.call(arguments, 1));
            else
                c = a.extend(!0, {}, c),
                    u ? d.data("magnificPopup", c) : d[0].magnificPopup = c,
                    b.addGroup(d, c);
            return d
        }
    ;
    var C, D, E, F = "inline", G = function() {
        E && (D.after(E.addClass(C)).detach(),
            E = null)
    };
    a.magnificPopup.registerModule(F, {
        options: {
            hiddenClass: "hide",
            markup: "",
            tNotFound: "Content not found"
        },
        proto: {
            initInline: function() {
                b.types.push(F),
                    w(h + "." + F, function() {
                        G()
                    })
            },
            getInline: function(c, d) {
                if (G(),
                    c.src) {
                    var e = b.st.inline
                        , f = a(c.src);
                    if (f.length) {
                        var g = f[0].parentNode;
                        g && g.tagName && (D || (C = e.hiddenClass,
                            D = x(C),
                            C = "mfp-" + C),
                            E = f.after(D).detach().removeClass(C)),
                            b.updateStatus("ready")
                    } else
                        b.updateStatus("error", e.tNotFound),
                            f = a("<div>");
                    return c.inlineElement = f,
                        f
                }
                return b.updateStatus("ready"),
                    b._parseMarkup(d, {}, c),
                    d
            }
        }
    });
    var H, I = "ajax", J = function() {
        H && a(document.body).removeClass(H)
    }, K = function() {
        J(),
        b.req && b.req.abort()
    };
    a.magnificPopup.registerModule(I, {
        options: {
            settings: null,
            cursor: "mfp-ajax-cur",
            tError: '<a href="%url%">The content</a> could not be loaded.'
        },
        proto: {
            initAjax: function() {
                b.types.push(I),
                    H = b.st.ajax.cursor,
                    w(h + "." + I, K),
                    w("BeforeChange." + I, K)
            },
            getAjax: function(c) {
                H && a(document.body).addClass(H),
                    b.updateStatus("loading");
                var d = a.extend({
                    url: c.src,
                    success: function(d, e, f) {
                        var g = {
                            data: d,
                            xhr: f
                        };
                        y("ParseAjax", g),
                            b.appendContent(a(g.data), I),
                            c.finished = !0,
                            J(),
                            b._setFocus(),
                            setTimeout(function() {
                                b.wrap.addClass(q)
                            }, 16),
                            b.updateStatus("ready"),
                            y("AjaxContentAdded")
                    },
                    error: function() {
                        J(),
                            c.finished = c.loadError = !0,
                            b.updateStatus("error", b.st.ajax.tError.replace("%url%", c.src))
                    }
                }, b.st.ajax.settings);
                return b.req = a.ajax(d),
                    ""
            }
        }
    });
    var L, M = function(c) {
        if (c.data && void 0 !== c.data.title)
            return c.data.title;
        var d = b.st.image.titleSrc;
        if (d) {
            if (a.isFunction(d))
                return d.call(b, c);
            if (c.el)
                return c.el.attr(d) || ""
        }
        return ""
    };
    a.magnificPopup.registerModule("image", {
        options: {
            markup: '<div class="mfp-figure"><div class="mfp-close"></div><figure><div class="mfp-img"></div><figcaption><div class="mfp-bottom-bar"><div class="mfp-title"></div><div class="mfp-counter"></div></div></figcaption></figure></div>',
            cursor: "mfp-zoom-out-cur",
            titleSrc: "title",
            verticalFit: !0,
            tError: '<a href="%url%">The image</a> could not be loaded.'
        },
        proto: {
            initImage: function() {
                var c = b.st.image
                    , d = ".image";
                b.types.push("image"),
                    w(m + d, function() {
                        "image" === b.currItem.type && c.cursor && a(document.body).addClass(c.cursor)
                    }),
                    w(h + d, function() {
                        c.cursor && a(document.body).removeClass(c.cursor),
                            v.off("resize" + p)
                    }),
                    w("Resize" + d, b.resizeImage),
                b.isLowIE && w("AfterChange", b.resizeImage)
            },
            resizeImage: function() {
                var a = b.currItem;
                if (a && a.img && b.st.image.verticalFit) {
                    var c = 0;
                    b.isLowIE && (c = parseInt(a.img.css("padding-top"), 10) + parseInt(a.img.css("padding-bottom"), 10)),
                        a.img.css("max-height", b.wH - c)
                }
            },
            _onImageHasSize: function(a) {
                a.img && (a.hasSize = !0,
                L && clearInterval(L),
                    a.isCheckingImgSize = !1,
                    y("ImageHasSize", a),
                a.imgHidden && (b.content && b.content.removeClass("mfp-loading"),
                    a.imgHidden = !1))
            },
            findImageSize: function(a) {
                var c = 0
                    , d = a.img[0]
                    , e = function(f) {
                    L && clearInterval(L),
                        L = setInterval(function() {
                            return d.naturalWidth > 0 ? void b._onImageHasSize(a) : (c > 200 && clearInterval(L),
                                c++,
                                void (3 === c ? e(10) : 40 === c ? e(50) : 100 === c && e(500)))
                        }, f)
                };
                e(1)
            },
            getImage: function(c, d) {
                var e = 0
                    , f = function() {
                    c && (c.img[0].complete ? (c.img.off(".mfploader"),
                    c === b.currItem && (b._onImageHasSize(c),
                        b.updateStatus("ready")),
                        c.hasSize = !0,
                        c.loaded = !0,
                        y("ImageLoadComplete")) : (e++,
                        200 > e ? setTimeout(f, 100) : g()))
                }
                    , g = function() {
                    c && (c.img.off(".mfploader"),
                    c === b.currItem && (b._onImageHasSize(c),
                        b.updateStatus("error", h.tError.replace("%url%", c.src))),
                        c.hasSize = !0,
                        c.loaded = !0,
                        c.loadError = !0)
                }
                    , h = b.st.image
                    , i = d.find(".mfp-img");
                if (i.length) {
                    var j = document.createElement("img");
                    j.className = "mfp-img",
                    c.el && c.el.find("img").length && (j.alt = c.el.find("img").attr("alt")),
                        c.img = a(j).on("load.mfploader", f).on("error.mfploader", g),
                        j.src = c.src,
                    i.is("img") && (c.img = c.img.clone()),
                        j = c.img[0],
                        j.naturalWidth > 0 ? c.hasSize = !0 : j.width || (c.hasSize = !1)
                }
                return b._parseMarkup(d, {
                    title: M(c),
                    img_replaceWith: c.img
                }, c),
                    b.resizeImage(),
                    c.hasSize ? (L && clearInterval(L),
                        c.loadError ? (d.addClass("mfp-loading"),
                            b.updateStatus("error", h.tError.replace("%url%", c.src))) : (d.removeClass("mfp-loading"),
                            b.updateStatus("ready")),
                        d) : (b.updateStatus("loading"),
                        c.loading = !0,
                    c.hasSize || (c.imgHidden = !0,
                        d.addClass("mfp-loading"),
                        b.findImageSize(c)),
                        d)
            }
        }
    });
    var N, O = function() {
        return void 0 === N && (N = void 0 !== document.createElement("p").style.MozTransform),
            N
    };
    a.magnificPopup.registerModule("zoom", {
        options: {
            enabled: !1,
            easing: "ease-in-out",
            duration: 300,
            opener: function(a) {
                return a.is("img") ? a : a.find("img")
            }
        },
        proto: {
            initZoom: function() {
                var a, c = b.st.zoom, d = ".zoom";
                if (c.enabled && b.supportsTransition) {
                    var e, f, g = c.duration, j = function(a) {
                        var b = a.clone().removeAttr("style").removeAttr("class").addClass("mfp-animated-image")
                            , d = "all " + c.duration / 1e3 + "s " + c.easing
                            , e = {
                            position: "fixed",
                            zIndex: 9999,
                            left: 0,
                            top: 0,
                            "-webkit-backface-visibility": "hidden"
                        }
                            , f = "transition";
                        return e["-webkit-" + f] = e["-moz-" + f] = e["-o-" + f] = e[f] = d,
                            b.css(e),
                            b
                    }, k = function() {
                        b.content.css("visibility", "visible")
                    };
                    w("BuildControls" + d, function() {
                        if (b._allowZoom()) {
                            if (clearTimeout(e),
                                b.content.css("visibility", "hidden"),
                                a = b._getItemToZoom(),
                                !a)
                                return void k();
                            f = j(a),
                                f.css(b._getOffset()),
                                b.wrap.append(f),
                                e = setTimeout(function() {
                                    f.css(b._getOffset(!0)),
                                        e = setTimeout(function() {
                                            k(),
                                                setTimeout(function() {
                                                    f.remove(),
                                                        a = f = null,
                                                        y("ZoomAnimationEnded")
                                                }, 16)
                                        }, g)
                                }, 16)
                        }
                    }),
                        w(i + d, function() {
                            if (b._allowZoom()) {
                                if (clearTimeout(e),
                                    b.st.removalDelay = g,
                                    !a) {
                                    if (a = b._getItemToZoom(),
                                        !a)
                                        return;
                                    f = j(a)
                                }
                                f.css(b._getOffset(!0)),
                                    b.wrap.append(f),
                                    b.content.css("visibility", "hidden"),
                                    setTimeout(function() {
                                        f.css(b._getOffset())
                                    }, 16)
                            }
                        }),
                        w(h + d, function() {
                            b._allowZoom() && (k(),
                            f && f.remove(),
                                a = null)
                        })
                }
            },
            _allowZoom: function() {
                return "image" === b.currItem.type
            },
            _getItemToZoom: function() {
                return b.currItem.hasSize ? b.currItem.img : !1
            },
            _getOffset: function(c) {
                var d;
                d = c ? b.currItem.img : b.st.zoom.opener(b.currItem.el || b.currItem);
                var e = d.offset()
                    , f = parseInt(d.css("padding-top"), 10)
                    , g = parseInt(d.css("padding-bottom"), 10);
                e.top -= a(window).scrollTop() - f;
                var h = {
                    width: d.width(),
                    height: (u ? d.innerHeight() : d[0].offsetHeight) - g - f
                };
                return O() ? h["-moz-transform"] = h.transform = "translate(" + e.left + "px," + e.top + "px)" : (h.left = e.left,
                    h.top = e.top),
                    h
            }
        }
    });
    var P = "iframe"
        , Q = "//about:blank"
        , R = function(a) {
        if (b.currTemplate[P]) {
            var c = b.currTemplate[P].find("iframe");
            c.length && (a || (c[0].src = Q),
            b.isIE8 && c.css("display", a ? "block" : "none"))
        }
    };
    a.magnificPopup.registerModule(P, {
        options: {
            markup: '<div class="mfp-iframe-scaler"><div class="mfp-close"></div><iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe></div>',
            srcAction: "iframe_src",
            patterns: {
                youtube: {
                    index: "youtube.com",
                    id: "v=",
                    src: "//www.youtube.com/embed/%id%?autoplay=1"
                },
                vimeo: {
                    index: "vimeo.com/",
                    id: "/",
                    src: "//player.vimeo.com/video/%id%?autoplay=1"
                },
                gmaps: {
                    index: "//maps.google.",
                    src: "%id%&output=embed"
                }
            }
        },
        proto: {
            initIframe: function() {
                b.types.push(P),
                    w("BeforeChange", function(a, b, c) {
                        b !== c && (b === P ? R() : c === P && R(!0))
                    }),
                    w(h + "." + P, function() {
                        R()
                    })
            },
            getIframe: function(c, d) {
                var e = c.src
                    , f = b.st.iframe;
                a.each(f.patterns, function() {
                    return e.indexOf(this.index) > -1 ? (this.id && (e = "string" == typeof this.id ? e.substr(e.lastIndexOf(this.id) + this.id.length, e.length) : this.id.call(this, e)),
                        e = this.src.replace("%id%", e),
                        !1) : void 0
                });
                var g = {};
                return f.srcAction && (g[f.srcAction] = e),
                    b._parseMarkup(d, g, c),
                    b.updateStatus("ready"),
                    d
            }
        }
    });
    var S = function(a) {
        var c = b.items.length;
        return a > c - 1 ? a - c : 0 > a ? c + a : a
    }
        , T = function(a, b, c) {
        return a.replace(/%curr%/gi, b + 1).replace(/%total%/gi, c)
    };
    a.magnificPopup.registerModule("gallery", {
        options: {
            enabled: !1,
            arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
            preload: [0, 2],
            navigateByImgClick: !0,
            arrows: !0,
            tPrev: "Previous (Left arrow key)",
            tNext: "Next (Right arrow key)",
            tCounter: "%curr% of %total%"
        },
        proto: {
            initGallery: function() {
                var c = b.st.gallery
                    , e = ".mfp-gallery";
                return b.direction = !0,
                    c && c.enabled ? (f += " mfp-gallery",
                        w(m + e, function() {
                            c.navigateByImgClick && b.wrap.on("click" + e, ".mfp-img", function() {
                                return b.items.length > 1 ? (b.next(),
                                    !1) : void 0
                            }),
                                d.on("keydown" + e, function(a) {
                                    37 === a.keyCode ? b.prev() : 39 === a.keyCode && b.next()
                                })
                        }),
                        w("UpdateStatus" + e, function(a, c) {
                            c.text && (c.text = T(c.text, b.currItem.index, b.items.length))
                        }),
                        w(l + e, function(a, d, e, f) {
                            var g = b.items.length;
                            e.counter = g > 1 ? T(c.tCounter, f.index, g) : ""
                        }),
                        w("BuildControls" + e, function() {
                            if (b.items.length > 1 && c.arrows && !b.arrowLeft) {
                                var d = c.arrowMarkup
                                    , e = b.arrowLeft = a(d.replace(/%title%/gi, c.tPrev).replace(/%dir%/gi, "left")).addClass(s)
                                    , f = b.arrowRight = a(d.replace(/%title%/gi, c.tNext).replace(/%dir%/gi, "right")).addClass(s);
                                e.click(function() {
                                    b.prev()
                                }),
                                    f.click(function() {
                                        b.next()
                                    }),
                                    b.container.append(e.add(f))
                            }
                        }),
                        w(n + e, function() {
                            b._preloadTimeout && clearTimeout(b._preloadTimeout),
                                b._preloadTimeout = setTimeout(function() {
                                    b.preloadNearbyImages(),
                                        b._preloadTimeout = null
                                }, 16)
                        }),
                        void w(h + e, function() {
                            d.off(e),
                                b.wrap.off("click" + e),
                                b.arrowRight = b.arrowLeft = null
                        })) : !1
            },
            next: function() {
                b.direction = !0,
                    b.index = S(b.index + 1),
                    b.updateItemHTML()
            },
            prev: function() {
                b.direction = !1,
                    b.index = S(b.index - 1),
                    b.updateItemHTML()
            },
            goTo: function(a) {
                b.direction = a >= b.index,
                    b.index = a,
                    b.updateItemHTML()
            },
            preloadNearbyImages: function() {
                var a, c = b.st.gallery.preload, d = Math.min(c[0], b.items.length), e = Math.min(c[1], b.items.length);
                for (a = 1; a <= (b.direction ? e : d); a++)
                    b._preloadItem(b.index + a);
                for (a = 1; a <= (b.direction ? d : e); a++)
                    b._preloadItem(b.index - a)
            },
            _preloadItem: function(c) {
                if (c = S(c),
                    !b.items[c].preloaded) {
                    var d = b.items[c];
                    d.parsed || (d = b.parseEl(c)),
                        y("LazyLoad", d),
                    "image" === d.type && (d.img = a('<img class="mfp-img" />').on("load.mfploader", function() {
                        d.hasSize = !0
                    }).on("error.mfploader", function() {
                        d.hasSize = !0,
                            d.loadError = !0,
                            y("LazyLoadError", d)
                    }).attr("src", d.src)),
                        d.preloaded = !0
                }
            }
        }
    });
    var U = "retina";
    a.magnificPopup.registerModule(U, {
        options: {
            replaceSrc: function(a) {
                return a.src.replace(/\.\w+$/, function(a) {
                    return "@2x" + a
                })
            },
            ratio: 1
        },
        proto: {
            initRetina: function() {
                if (window.devicePixelRatio > 1) {
                    var a = b.st.retina
                        , c = a.ratio;
                    c = isNaN(c) ? c() : c,
                    c > 1 && (w("ImageHasSize." + U, function(a, b) {
                        b.img.css({
                            "max-width": b.img[0].naturalWidth / c,
                            width: "100%"
                        })
                    }),
                        w("ElementParse." + U, function(b, d) {
                            d.src = a.replaceSrc(d, c)
                        }))
                }
            }
        }
    }),
        A()
});
/* noUISlider 14.6.2 */
!function(t) {
    "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? module.exports = t() : window.noUiSlider = t()
}(function() {
    "use strict";
    var lt = "14.6.2";
    function ut(t) {
        t.parentElement.removeChild(t)
    }
    function a(t) {
        return null != t
    }
    function ct(t) {
        t.preventDefault()
    }
    function o(t) {
        return "number" == typeof t && !isNaN(t) && isFinite(t)
    }
    function pt(t, e, r) {
        0 < r && (ht(t, e),
            setTimeout(function() {
                mt(t, e)
            }, r))
    }
    function ft(t) {
        return Math.max(Math.min(t, 100), 0)
    }
    function dt(t) {
        return Array.isArray(t) ? t : [t]
    }
    function e(t) {
        var e = (t = String(t)).split(".");
        return 1 < e.length ? e[1].length : 0
    }
    function ht(t, e) {
        t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e
    }
    function mt(t, e) {
        t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)","gi"), " ")
    }
    function gt(t) {
        var e = void 0 !== window.pageXOffset
            , r = "CSS1Compat" === (t.compatMode || "");
        return {
            x: e ? window.pageXOffset : r ? t.documentElement.scrollLeft : t.body.scrollLeft,
            y: e ? window.pageYOffset : r ? t.documentElement.scrollTop : t.body.scrollTop
        }
    }
    function c(t, e) {
        return 100 / (e - t)
    }
    function p(t, e, r) {
        return 100 * e / (t[r + 1] - t[r])
    }
    function f(t, e) {
        for (var r = 1; t >= e[r]; )
            r += 1;
        return r
    }
    function r(t, e, r) {
        if (r >= t.slice(-1)[0])
            return 100;
        var n, i, o = f(r, t), s = t[o - 1], a = t[o], l = e[o - 1], u = e[o];
        return l + (i = r,
        p(n = [s, a], n[0] < 0 ? i + Math.abs(n[0]) : i - n[0], 0) / c(l, u))
    }
    function n(t, e, r, n) {
        if (100 === n)
            return n;
        var i, o, s = f(n, t), a = t[s - 1], l = t[s];
        return r ? (l - a) / 2 < n - a ? l : a : e[s - 1] ? t[s - 1] + (i = n - t[s - 1],
            o = e[s - 1],
        Math.round(i / o) * o) : n
    }
    function s(t, e, r) {
        var n;
        if ("number" == typeof e && (e = [e]),
            !Array.isArray(e))
            throw new Error("noUiSlider (" + lt + "): 'range' contains invalid value.");
        if (!o(n = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !o(e[0]))
            throw new Error("noUiSlider (" + lt + "): 'range' value isn't numeric.");
        r.xPct.push(n),
            r.xVal.push(e[0]),
            n ? r.xSteps.push(!isNaN(e[1]) && e[1]) : isNaN(e[1]) || (r.xSteps[0] = e[1]),
            r.xHighestCompleteStep.push(0)
    }
    function l(t, e, r) {
        if (e)
            if (r.xVal[t] !== r.xVal[t + 1]) {
                r.xSteps[t] = p([r.xVal[t], r.xVal[t + 1]], e, 0) / c(r.xPct[t], r.xPct[t + 1]);
                var n = (r.xVal[t + 1] - r.xVal[t]) / r.xNumSteps[t]
                    , i = Math.ceil(Number(n.toFixed(3)) - 1)
                    , o = r.xVal[t] + r.xNumSteps[t] * i;
                r.xHighestCompleteStep[t] = o
            } else
                r.xSteps[t] = r.xHighestCompleteStep[t] = r.xVal[t]
    }
    function i(t, e, r) {
        var n;
        this.xPct = [],
            this.xVal = [],
            this.xSteps = [r || !1],
            this.xNumSteps = [!1],
            this.xHighestCompleteStep = [],
            this.snap = e;
        var i = [];
        for (n in t)
            t.hasOwnProperty(n) && i.push([t[n], n]);
        for (i.length && "object" == typeof i[0][0] ? i.sort(function(t, e) {
            return t[0][0] - e[0][0]
        }) : i.sort(function(t, e) {
            return t[0] - e[0]
        }),
                 n = 0; n < i.length; n++)
            s(i[n][1], i[n][0], this);
        for (this.xNumSteps = this.xSteps.slice(0),
                 n = 0; n < this.xNumSteps.length; n++)
            l(n, this.xNumSteps[n], this)
    }
    i.prototype.getDistance = function(t) {
        var e, r = [];
        for (e = 0; e < this.xNumSteps.length - 1; e++) {
            var n = this.xNumSteps[e];
            if (n && t / n % 1 != 0)
                throw new Error("noUiSlider (" + lt + "): 'limit', 'margin' and 'padding' of " + this.xPct[e] + "% range must be divisible by step.");
            r[e] = p(this.xVal, t, e)
        }
        return r
    }
        ,
        i.prototype.getAbsoluteDistance = function(t, e, r) {
            var n, i = 0;
            if (t < this.xPct[this.xPct.length - 1])
                for (; t > this.xPct[i + 1]; )
                    i++;
            else
                t === this.xPct[this.xPct.length - 1] && (i = this.xPct.length - 2);
            r || t !== this.xPct[i + 1] || i++;
            var o = 1
                , s = e[i]
                , a = 0
                , l = 0
                , u = 0
                , c = 0;
            for (n = r ? (t - this.xPct[i]) / (this.xPct[i + 1] - this.xPct[i]) : (this.xPct[i + 1] - t) / (this.xPct[i + 1] - this.xPct[i]); 0 < s; )
                a = this.xPct[i + 1 + c] - this.xPct[i + c],
                    100 < e[i + c] * o + 100 - 100 * n ? (l = a * n,
                        o = (s - 100 * n) / e[i + c],
                        n = 1) : (l = e[i + c] * a / 100 * o,
                        o = 0),
                    r ? (u -= l,
                    1 <= this.xPct.length + c && c--) : (u += l,
                    1 <= this.xPct.length - c && c++),
                    s = e[i + c] * o;
            return t + u
        }
        ,
        i.prototype.toStepping = function(t) {
            return t = r(this.xVal, this.xPct, t)
        }
        ,
        i.prototype.fromStepping = function(t) {
            return function(t, e, r) {
                if (100 <= r)
                    return t.slice(-1)[0];
                var n, i = f(r, e), o = t[i - 1], s = t[i], a = e[i - 1], l = e[i];
                return n = [o, s],
                (r - a) * c(a, l) * (n[1] - n[0]) / 100 + n[0]
            }(this.xVal, this.xPct, t)
        }
        ,
        i.prototype.getStep = function(t) {
            return t = n(this.xPct, this.xSteps, this.snap, t)
        }
        ,
        i.prototype.getDefaultStep = function(t, e, r) {
            var n = f(t, this.xPct);
            return (100 === t || e && t === this.xPct[n - 1]) && (n = Math.max(n - 1, 1)),
            (this.xVal[n] - this.xVal[n - 1]) / r
        }
        ,
        i.prototype.getNearbySteps = function(t) {
            var e = f(t, this.xPct);
            return {
                stepBefore: {
                    startValue: this.xVal[e - 2],
                    step: this.xNumSteps[e - 2],
                    highestStep: this.xHighestCompleteStep[e - 2]
                },
                thisStep: {
                    startValue: this.xVal[e - 1],
                    step: this.xNumSteps[e - 1],
                    highestStep: this.xHighestCompleteStep[e - 1]
                },
                stepAfter: {
                    startValue: this.xVal[e],
                    step: this.xNumSteps[e],
                    highestStep: this.xHighestCompleteStep[e]
                }
            }
        }
        ,
        i.prototype.countStepDecimals = function() {
            var t = this.xNumSteps.map(e);
            return Math.max.apply(null, t)
        }
        ,
        i.prototype.convert = function(t) {
            return this.getStep(this.toStepping(t))
        }
    ;
    var u = {
        to: function(t) {
            return void 0 !== t && t.toFixed(2)
        },
        from: Number
    }
        , d = {
        target: "target",
        base: "base",
        origin: "origin",
        handle: "handle",
        handleLower: "handle-lower",
        handleUpper: "handle-upper",
        touchArea: "touch-area",
        horizontal: "horizontal",
        vertical: "vertical",
        background: "background",
        connect: "connect",
        connects: "connects",
        ltr: "ltr",
        rtl: "rtl",
        textDirectionLtr: "txt-dir-ltr",
        textDirectionRtl: "txt-dir-rtl",
        draggable: "draggable",
        drag: "state-drag",
        tap: "state-tap",
        active: "active",
        tooltip: "tooltip",
        pips: "pips",
        pipsHorizontal: "pips-horizontal",
        pipsVertical: "pips-vertical",
        marker: "marker",
        markerHorizontal: "marker-horizontal",
        markerVertical: "marker-vertical",
        markerNormal: "marker-normal",
        markerLarge: "marker-large",
        markerSub: "marker-sub",
        value: "value",
        valueHorizontal: "value-horizontal",
        valueVertical: "value-vertical",
        valueNormal: "value-normal",
        valueLarge: "value-large",
        valueSub: "value-sub"
    };
    function h(t) {
        if ("object" == typeof (e = t) && "function" == typeof e.to && "function" == typeof e.from)
            return !0;
        var e;
        throw new Error("noUiSlider (" + lt + "): 'format' requires 'to' and 'from' methods.")
    }
    function m(t, e) {
        if (!o(e))
            throw new Error("noUiSlider (" + lt + "): 'step' is not numeric.");
        t.singleStep = e
    }
    function g(t, e) {
        if (!o(e))
            throw new Error("noUiSlider (" + lt + "): 'keyboardPageMultiplier' is not numeric.");
        t.keyboardPageMultiplier = e
    }
    function v(t, e) {
        if (!o(e))
            throw new Error("noUiSlider (" + lt + "): 'keyboardDefaultStep' is not numeric.");
        t.keyboardDefaultStep = e
    }
    function b(t, e) {
        if ("object" != typeof e || Array.isArray(e))
            throw new Error("noUiSlider (" + lt + "): 'range' is not an object.");
        if (void 0 === e.min || void 0 === e.max)
            throw new Error("noUiSlider (" + lt + "): Missing 'min' or 'max' in 'range'.");
        if (e.min === e.max)
            throw new Error("noUiSlider (" + lt + "): 'range' 'min' and 'max' cannot be equal.");
        t.spectrum = new i(e,t.snap,t.singleStep)
    }
    function x(t, e) {
        if (e = dt(e),
        !Array.isArray(e) || !e.length)
            throw new Error("noUiSlider (" + lt + "): 'start' option is incorrect.");
        t.handles = e.length,
            t.start = e
    }
    function S(t, e) {
        if ("boolean" != typeof (t.snap = e))
            throw new Error("noUiSlider (" + lt + "): 'snap' option must be a boolean.")
    }
    function w(t, e) {
        if ("boolean" != typeof (t.animate = e))
            throw new Error("noUiSlider (" + lt + "): 'animate' option must be a boolean.")
    }
    function y(t, e) {
        if ("number" != typeof (t.animationDuration = e))
            throw new Error("noUiSlider (" + lt + "): 'animationDuration' option must be a number.")
    }
    function E(t, e) {
        var r, n = [!1];
        if ("lower" === e ? e = [!0, !1] : "upper" === e && (e = [!1, !0]),
        !0 === e || !1 === e) {
            for (r = 1; r < t.handles; r++)
                n.push(e);
            n.push(!1)
        } else {
            if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1)
                throw new Error("noUiSlider (" + lt + "): 'connect' option doesn't match handle count.");
            n = e
        }
        t.connect = n
    }
    function C(t, e) {
        switch (e) {
            case "horizontal":
                t.ort = 0;
                break;
            case "vertical":
                t.ort = 1;
                break;
            default:
                throw new Error("noUiSlider (" + lt + "): 'orientation' option is invalid.")
        }
    }
    function P(t, e) {
        if (!o(e))
            throw new Error("noUiSlider (" + lt + "): 'margin' option must be numeric.");
        0 !== e && (t.margin = t.spectrum.getDistance(e))
    }
    function N(t, e) {
        if (!o(e))
            throw new Error("noUiSlider (" + lt + "): 'limit' option must be numeric.");
        if (t.limit = t.spectrum.getDistance(e),
        !t.limit || t.handles < 2)
            throw new Error("noUiSlider (" + lt + "): 'limit' option is only supported on linear sliders with 2 or more handles.")
    }
    function k(t, e) {
        var r;
        if (!o(e) && !Array.isArray(e))
            throw new Error("noUiSlider (" + lt + "): 'padding' option must be numeric or array of exactly 2 numbers.");
        if (Array.isArray(e) && 2 !== e.length && !o(e[0]) && !o(e[1]))
            throw new Error("noUiSlider (" + lt + "): 'padding' option must be numeric or array of exactly 2 numbers.");
        if (0 !== e) {
            for (Array.isArray(e) || (e = [e, e]),
                     t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])],
                     r = 0; r < t.spectrum.xNumSteps.length - 1; r++)
                if (t.padding[0][r] < 0 || t.padding[1][r] < 0)
                    throw new Error("noUiSlider (" + lt + "): 'padding' option must be a positive number(s).");
            var n = e[0] + e[1]
                , i = t.spectrum.xVal[0];
            if (1 < n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - i))
                throw new Error("noUiSlider (" + lt + "): 'padding' option must not exceed 100% of the range.")
        }
    }
    function U(t, e) {
        switch (e) {
            case "ltr":
                t.dir = 0;
                break;
            case "rtl":
                t.dir = 1;
                break;
            default:
                throw new Error("noUiSlider (" + lt + "): 'direction' option was not recognized.")
        }
    }
    function A(t, e) {
        if ("string" != typeof e)
            throw new Error("noUiSlider (" + lt + "): 'behaviour' must be a string containing options.");
        var r = 0 <= e.indexOf("tap")
            , n = 0 <= e.indexOf("drag")
            , i = 0 <= e.indexOf("fixed")
            , o = 0 <= e.indexOf("snap")
            , s = 0 <= e.indexOf("hover")
            , a = 0 <= e.indexOf("unconstrained");
        if (i) {
            if (2 !== t.handles)
                throw new Error("noUiSlider (" + lt + "): 'fixed' behaviour must be used with 2 handles");
            P(t, t.start[1] - t.start[0])
        }
        if (a && (t.margin || t.limit))
            throw new Error("noUiSlider (" + lt + "): 'unconstrained' behaviour cannot be used with margin or limit");
        t.events = {
            tap: r || o,
            drag: n,
            fixed: i,
            snap: o,
            hover: s,
            unconstrained: a
        }
    }
    function V(t, e) {
        if (!1 !== e)
            if (!0 === e) {
                t.tooltips = [];
                for (var r = 0; r < t.handles; r++)
                    t.tooltips.push(!0)
            } else {
                if (t.tooltips = dt(e),
                t.tooltips.length !== t.handles)
                    throw new Error("noUiSlider (" + lt + "): must pass a formatter for all handles.");
                t.tooltips.forEach(function(t) {
                    if ("boolean" != typeof t && ("object" != typeof t || "function" != typeof t.to))
                        throw new Error("noUiSlider (" + lt + "): 'tooltips' must be passed a formatter or 'false'.")
                })
            }
    }
    function D(t, e) {
        h(t.ariaFormat = e)
    }
    function M(t, e) {
        h(t.format = e)
    }
    function O(t, e) {
        if ("boolean" != typeof (t.keyboardSupport = e))
            throw new Error("noUiSlider (" + lt + "): 'keyboardSupport' option must be a boolean.")
    }
    function L(t, e) {
        t.documentElement = e
    }
    function z(t, e) {
        if ("string" != typeof e && !1 !== e)
            throw new Error("noUiSlider (" + lt + "): 'cssPrefix' must be a string or `false`.");
        t.cssPrefix = e
    }
    function H(t, e) {
        if ("object" != typeof e)
            throw new Error("noUiSlider (" + lt + "): 'cssClasses' must be an object.");
        if ("string" == typeof t.cssPrefix)
            for (var r in t.cssClasses = {},
                e)
                e.hasOwnProperty(r) && (t.cssClasses[r] = t.cssPrefix + e[r]);
        else
            t.cssClasses = e
    }
    function vt(e) {
        var r = {
            margin: 0,
            limit: 0,
            padding: 0,
            animate: !0,
            animationDuration: 300,
            ariaFormat: u,
            format: u
        }
            , n = {
            step: {
                r: !1,
                t: m
            },
            keyboardPageMultiplier: {
                r: !1,
                t: g
            },
            keyboardDefaultStep: {
                r: !1,
                t: v
            },
            start: {
                r: !0,
                t: x
            },
            connect: {
                r: !0,
                t: E
            },
            direction: {
                r: !0,
                t: U
            },
            snap: {
                r: !1,
                t: S
            },
            animate: {
                r: !1,
                t: w
            },
            animationDuration: {
                r: !1,
                t: y
            },
            range: {
                r: !0,
                t: b
            },
            orientation: {
                r: !1,
                t: C
            },
            margin: {
                r: !1,
                t: P
            },
            limit: {
                r: !1,
                t: N
            },
            padding: {
                r: !1,
                t: k
            },
            behaviour: {
                r: !0,
                t: A
            },
            ariaFormat: {
                r: !1,
                t: D
            },
            format: {
                r: !1,
                t: M
            },
            tooltips: {
                r: !1,
                t: V
            },
            keyboardSupport: {
                r: !0,
                t: O
            },
            documentElement: {
                r: !1,
                t: L
            },
            cssPrefix: {
                r: !0,
                t: z
            },
            cssClasses: {
                r: !0,
                t: H
            }
        }
            , i = {
            connect: !1,
            direction: "ltr",
            behaviour: "tap",
            orientation: "horizontal",
            keyboardSupport: !0,
            cssPrefix: "noUi-",
            cssClasses: d,
            keyboardPageMultiplier: 5,
            keyboardDefaultStep: 10
        };
        e.format && !e.ariaFormat && (e.ariaFormat = e.format),
            Object.keys(n).forEach(function(t) {
                if (!a(e[t]) && void 0 === i[t]) {
                    if (n[t].r)
                        throw new Error("noUiSlider (" + lt + "): '" + t + "' is required.");
                    return !0
                }
                n[t].t(r, a(e[t]) ? e[t] : i[t])
            }),
            r.pips = e.pips;
        var t = document.createElement("div")
            , o = void 0 !== t.style.msTransform
            , s = void 0 !== t.style.transform;
        r.transformRule = s ? "transform" : o ? "msTransform" : "webkitTransform";
        return r.style = [["left", "top"], ["right", "bottom"]][r.dir][r.ort],
            r
    }
    function j(t, b, o) {
        var l, u, s, c, i, a, e, p, f = window.navigator.pointerEnabled ? {
            start: "pointerdown",
            move: "pointermove",
            end: "pointerup"
        } : window.navigator.msPointerEnabled ? {
            start: "MSPointerDown",
            move: "MSPointerMove",
            end: "MSPointerUp"
        } : {
            start: "mousedown touchstart",
            move: "mousemove touchmove",
            end: "mouseup touchend"
        }, d = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function() {
            var t = !1;
            try {
                var e = Object.defineProperty({}, "passive", {
                    get: function() {
                        t = !0
                    }
                });
                window.addEventListener("test", null, e)
            } catch (t) {}
            return t
        }(), h = t, y = b.spectrum, x = [], S = [], m = [], g = 0, v = {}, w = t.ownerDocument, E = b.documentElement || w.documentElement, C = w.body, P = -1, N = 0, k = 1, U = 2, A = "rtl" === w.dir || 1 === b.ort ? 0 : 100;
        function V(t, e) {
            var r = w.createElement("div");
            return e && ht(r, e),
                t.appendChild(r),
                r
        }
        function D(t, e) {
            var r = V(t, b.cssClasses.origin)
                , n = V(r, b.cssClasses.handle);
            return V(n, b.cssClasses.touchArea),
                n.setAttribute("data-handle", e),
            b.keyboardSupport && (n.setAttribute("tabindex", "0"),
                n.addEventListener("keydown", function(t) {
                    return function(t, e) {
                        if (O() || L(e))
                            return !1;
                        var r = ["Left", "Right"]
                            , n = ["Down", "Up"]
                            , i = ["PageDown", "PageUp"]
                            , o = ["Home", "End"];
                        b.dir && !b.ort ? r.reverse() : b.ort && !b.dir && (n.reverse(),
                            i.reverse());
                        var s, a = t.key.replace("Arrow", ""), l = a === i[0], u = a === i[1], c = a === n[0] || a === r[0] || l, p = a === n[1] || a === r[1] || u, f = a === o[0], d = a === o[1];
                        if (!(c || p || f || d))
                            return !0;
                        if (t.preventDefault(),
                        p || c) {
                            var h = b.keyboardPageMultiplier
                                , m = c ? 0 : 1
                                , g = at(e)
                                , v = g[m];
                            if (null === v)
                                return !1;
                            !1 === v && (v = y.getDefaultStep(S[e], c, b.keyboardDefaultStep)),
                            (u || l) && (v *= h),
                                v = Math.max(v, 1e-7),
                                v *= c ? -1 : 1,
                                s = x[e] + v
                        } else
                            s = d ? b.spectrum.xVal[b.spectrum.xVal.length - 1] : b.spectrum.xVal[0];
                        return rt(e, y.toStepping(s), !0, !0),
                            J("slide", e),
                            J("update", e),
                            J("change", e),
                            J("set", e),
                            !1
                    }(t, e)
                })),
                n.setAttribute("role", "slider"),
                n.setAttribute("aria-orientation", b.ort ? "vertical" : "horizontal"),
                0 === e ? ht(n, b.cssClasses.handleLower) : e === b.handles - 1 && ht(n, b.cssClasses.handleUpper),
                r
        }
        function M(t, e) {
            return !!e && V(t, b.cssClasses.connect)
        }
        function r(t, e) {
            return !!b.tooltips[e] && V(t.firstChild, b.cssClasses.tooltip)
        }
        function O() {
            return h.hasAttribute("disabled")
        }
        function L(t) {
            return u[t].hasAttribute("disabled")
        }
        function z() {
            i && (G("update.tooltips"),
                i.forEach(function(t) {
                    t && ut(t)
                }),
                i = null)
        }
        function H() {
            z(),
                i = u.map(r),
                $("update.tooltips", function(t, e, r) {
                    if (i[e]) {
                        var n = t[e];
                        !0 !== b.tooltips[e] && (n = b.tooltips[e].to(r[e])),
                            i[e].innerHTML = n
                    }
                })
        }
        function j(e, i, o) {
            var s = w.createElement("div")
                , a = [];
            a[N] = b.cssClasses.valueNormal,
                a[k] = b.cssClasses.valueLarge,
                a[U] = b.cssClasses.valueSub;
            var l = [];
            l[N] = b.cssClasses.markerNormal,
                l[k] = b.cssClasses.markerLarge,
                l[U] = b.cssClasses.markerSub;
            var u = [b.cssClasses.valueHorizontal, b.cssClasses.valueVertical]
                , c = [b.cssClasses.markerHorizontal, b.cssClasses.markerVertical];
            function p(t, e) {
                var r = e === b.cssClasses.value
                    , n = r ? a : l;
                return e + " " + (r ? u : c)[b.ort] + " " + n[t]
            }
            return ht(s, b.cssClasses.pips),
                ht(s, 0 === b.ort ? b.cssClasses.pipsHorizontal : b.cssClasses.pipsVertical),
                Object.keys(e).forEach(function(t) {
                    !function(t, e, r) {
                        if ((r = i ? i(e, r) : r) !== P) {
                            var n = V(s, !1);
                            n.className = p(r, b.cssClasses.marker),
                                n.style[b.style] = t + "%",
                            N < r && ((n = V(s, !1)).className = p(r, b.cssClasses.value),
                                n.setAttribute("data-value", e),
                                n.style[b.style] = t + "%",
                                n.innerHTML = o.to(e))
                        }
                    }(t, e[t][0], e[t][1])
                }),
                s
        }
        function F() {
            c && (ut(c),
                c = null)
        }
        function R(t) {
            F();
            var m, g, v, b, e, r, x, S, w, n = t.mode, i = t.density || 1, o = t.filter || !1, s = function(t, e, r) {
                if ("range" === t || "steps" === t)
                    return y.xVal;
                if ("count" === t) {
                    if (e < 2)
                        throw new Error("noUiSlider (" + lt + "): 'values' (>= 2) required for mode 'count'.");
                    var n = e - 1
                        , i = 100 / n;
                    for (e = []; n--; )
                        e[n] = n * i;
                    e.push(100),
                        t = "positions"
                }
                return "positions" === t ? e.map(function(t) {
                    return y.fromStepping(r ? y.getStep(t) : t)
                }) : "values" === t ? r ? e.map(function(t) {
                    return y.fromStepping(y.getStep(y.toStepping(t)))
                }) : e : void 0
            }(n, t.values || !1, t.stepped || !1), a = (m = i,
                g = n,
                v = s,
                b = {},
                e = y.xVal[0],
                r = y.xVal[y.xVal.length - 1],
                S = x = !1,
                w = 0,
            (v = v.slice().sort(function(t, e) {
                return t - e
            }).filter(function(t) {
                return !this[t] && (this[t] = !0)
            }, {}))[0] !== e && (v.unshift(e),
                x = !0),
            v[v.length - 1] !== r && (v.push(r),
                S = !0),
                v.forEach(function(t, e) {
                    var r, n, i, o, s, a, l, u, c, p, f = t, d = v[e + 1], h = "steps" === g;
                    if (h && (r = y.xNumSteps[e]),
                    r || (r = d - f),
                    !1 !== f)
                        for (void 0 === d && (d = f),
                                 r = Math.max(r, 1e-7),
                                 n = f; n <= d; n = (n + r).toFixed(7) / 1) {
                            for (u = (s = (o = y.toStepping(n)) - w) / m,
                                     p = s / (c = Math.round(u)),
                                     i = 1; i <= c; i += 1)
                                b[(a = w + i * p).toFixed(5)] = [y.fromStepping(a), 0];
                            l = -1 < v.indexOf(n) ? k : h ? U : N,
                            !e && x && n !== d && (l = 0),
                            n === d && S || (b[o.toFixed(5)] = [n, l]),
                                w = o
                        }
                }),
                b), l = t.format || {
                to: Math.round
            };
            return c = h.appendChild(j(a, o, l))
        }
        function T() {
            var t = l.getBoundingClientRect()
                , e = "offset" + ["Width", "Height"][b.ort];
            return 0 === b.ort ? t.width || l[e] : t.height || l[e]
        }
        function B(n, i, o, s) {
            var e = function(t) {
                return !!(t = function(t, e, r) {
                    var n, i, o = 0 === t.type.indexOf("touch"), s = 0 === t.type.indexOf("mouse"), a = 0 === t.type.indexOf("pointer");
                    0 === t.type.indexOf("MSPointer") && (a = !0);
                    if ("mousedown" === t.type && !t.buttons && !t.touches)
                        return !1;
                    if (o) {
                        var l = function(t) {
                            return t.target === r || r.contains(t.target) || t.target.shadowRoot && t.target.shadowRoot.contains(r)
                        };
                        if ("touchstart" === t.type) {
                            var u = Array.prototype.filter.call(t.touches, l);
                            if (1 < u.length)
                                return !1;
                            n = u[0].pageX,
                                i = u[0].pageY
                        } else {
                            var c = Array.prototype.find.call(t.changedTouches, l);
                            if (!c)
                                return !1;
                            n = c.pageX,
                                i = c.pageY
                        }
                    }
                    e = e || gt(w),
                    (s || a) && (n = t.clientX + e.x,
                        i = t.clientY + e.y);
                    return t.pageOffset = e,
                        t.points = [n, i],
                        t.cursor = s || a,
                        t
                }(t, s.pageOffset, s.target || i)) && (!(O() && !s.doNotReject) && (e = h,
                    r = b.cssClasses.tap,
                !((e.classList ? e.classList.contains(r) : new RegExp("\\b" + r + "\\b").test(e.className)) && !s.doNotReject) && (!(n === f.start && void 0 !== t.buttons && 1 < t.buttons) && ((!s.hover || !t.buttons) && (d || t.preventDefault(),
                    t.calcPoint = t.points[b.ort],
                    void o(t, s))))));
                var e, r
            }
                , r = [];
            return n.split(" ").forEach(function(t) {
                i.addEventListener(t, e, !!d && {
                    passive: !0
                }),
                    r.push([t, e])
            }),
                r
        }
        function q(t) {
            var e, r, n, i, o, s, a = 100 * (t - (e = l,
                r = b.ort,
                n = e.getBoundingClientRect(),
                i = e.ownerDocument,
                o = i.documentElement,
                s = gt(i),
            /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (s.x = 0),
                r ? n.top + s.y - o.clientTop : n.left + s.x - o.clientLeft)) / T();
            return a = ft(a),
                b.dir ? 100 - a : a
        }
        function X(t, e) {
            "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && _(t, e)
        }
        function Y(t, e) {
            if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty)
                return _(t, e);
            var r = (b.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint);
            Z(0 < r, 100 * r / e.baseSize, e.locations, e.handleNumbers)
        }
        function _(t, e) {
            e.handle && (mt(e.handle, b.cssClasses.active),
                g -= 1),
                e.listeners.forEach(function(t) {
                    E.removeEventListener(t[0], t[1])
                }),
            0 === g && (mt(h, b.cssClasses.drag),
                et(),
            t.cursor && (C.style.cursor = "",
                C.removeEventListener("selectstart", ct))),
                e.handleNumbers.forEach(function(t) {
                    J("change", t),
                        J("set", t),
                        J("end", t)
                })
        }
        function I(t, e) {
            if (e.handleNumbers.some(L))
                return !1;
            var r;
            1 === e.handleNumbers.length && (r = u[e.handleNumbers[0]].children[0],
                g += 1,
                ht(r, b.cssClasses.active));
            t.stopPropagation();
            var n = []
                , i = B(f.move, E, Y, {
                target: t.target,
                handle: r,
                listeners: n,
                startCalcPoint: t.calcPoint,
                baseSize: T(),
                pageOffset: t.pageOffset,
                handleNumbers: e.handleNumbers,
                buttonsProperty: t.buttons,
                locations: S.slice()
            })
                , o = B(f.end, E, _, {
                target: t.target,
                handle: r,
                listeners: n,
                doNotReject: !0,
                handleNumbers: e.handleNumbers
            })
                , s = B("mouseout", E, X, {
                target: t.target,
                handle: r,
                listeners: n,
                doNotReject: !0,
                handleNumbers: e.handleNumbers
            });
            n.push.apply(n, i.concat(o, s)),
            t.cursor && (C.style.cursor = getComputedStyle(t.target).cursor,
            1 < u.length && ht(h, b.cssClasses.drag),
                C.addEventListener("selectstart", ct, !1)),
                e.handleNumbers.forEach(function(t) {
                    J("start", t)
                })
        }
        function n(t) {
            t.stopPropagation();
            var i, o, s, e = q(t.calcPoint), r = (i = e,
                s = !(o = 100),
                u.forEach(function(t, e) {
                    if (!L(e)) {
                        var r = S[e]
                            , n = Math.abs(r - i);
                        (n < o || n <= o && r < i || 100 === n && 100 === o) && (s = e,
                            o = n)
                    }
                }),
                s);
            if (!1 === r)
                return !1;
            b.events.snap || pt(h, b.cssClasses.tap, b.animationDuration),
                rt(r, e, !0, !0),
                et(),
                J("slide", r, !0),
                J("update", r, !0),
                J("change", r, !0),
                J("set", r, !0),
            b.events.snap && I(t, {
                handleNumbers: [r]
            })
        }
        function W(t) {
            var e = q(t.calcPoint)
                , r = y.getStep(e)
                , n = y.fromStepping(r);
            Object.keys(v).forEach(function(t) {
                "hover" === t.split(".")[0] && v[t].forEach(function(t) {
                    t.call(a, n)
                })
            })
        }
        function $(t, e) {
            v[t] = v[t] || [],
                v[t].push(e),
            "update" === t.split(".")[0] && u.forEach(function(t, e) {
                J("update", e)
            })
        }
        function G(t) {
            var n = t && t.split(".")[0]
                , i = n && t.substring(n.length);
            Object.keys(v).forEach(function(t) {
                var e = t.split(".")[0]
                    , r = t.substring(e.length);
                n && n !== e || i && i !== r || delete v[t]
            })
        }
        function J(r, n, i) {
            Object.keys(v).forEach(function(t) {
                var e = t.split(".")[0];
                r === e && v[t].forEach(function(t) {
                    t.call(a, x.map(b.format.to), n, x.slice(), i || !1, S.slice(), a)
                })
            })
        }
        function K(t, e, r, n, i, o) {
            var s;
            return 1 < u.length && !b.events.unconstrained && (n && 0 < e && (s = y.getAbsoluteDistance(t[e - 1], b.margin, 0),
                r = Math.max(r, s)),
            i && e < u.length - 1 && (s = y.getAbsoluteDistance(t[e + 1], b.margin, 1),
                r = Math.min(r, s))),
            1 < u.length && b.limit && (n && 0 < e && (s = y.getAbsoluteDistance(t[e - 1], b.limit, 0),
                r = Math.min(r, s)),
            i && e < u.length - 1 && (s = y.getAbsoluteDistance(t[e + 1], b.limit, 1),
                r = Math.max(r, s))),
            b.padding && (0 === e && (s = y.getAbsoluteDistance(0, b.padding[0], 0),
                r = Math.max(r, s)),
            e === u.length - 1 && (s = y.getAbsoluteDistance(100, b.padding[1], 1),
                r = Math.min(r, s))),
            !((r = ft(r = y.getStep(r))) === t[e] && !o) && r
        }
        function Q(t, e) {
            var r = b.ort;
            return (r ? e : t) + ", " + (r ? t : e)
        }
        function Z(t, n, r, e) {
            var i = r.slice()
                , o = [!t, t]
                , s = [t, !t];
            e = e.slice(),
            t && e.reverse(),
                1 < e.length ? e.forEach(function(t, e) {
                    var r = K(i, t, i[t] + n, o[e], s[e], !1);
                    !1 === r ? n = 0 : (n = r - i[t],
                        i[t] = r)
                }) : o = s = [!0];
            var a = !1;
            e.forEach(function(t, e) {
                a = rt(t, r[t] + n, o[e], s[e]) || a
            }),
            a && e.forEach(function(t) {
                J("update", t),
                    J("slide", t)
            })
        }
        function tt(t, e) {
            return b.dir ? 100 - t - e : t
        }
        function et() {
            m.forEach(function(t) {
                var e = 50 < S[t] ? -1 : 1
                    , r = 3 + (u.length + e * t);
                u[t].style.zIndex = r
            })
        }
        function rt(t, e, r, n, i) {
            return i || (e = K(S, t, e, r, n, !1)),
            !1 !== e && (function(t, e) {
                S[t] = e,
                    x[t] = y.fromStepping(e);
                var r = "translate(" + Q(10 * (tt(e, 0) - A) + "%", "0") + ")";
                u[t].style[b.transformRule] = r,
                    nt(t),
                    nt(t + 1)
            }(t, e),
                !0)
        }
        function nt(t) {
            if (s[t]) {
                var e = 0
                    , r = 100;
                0 !== t && (e = S[t - 1]),
                t !== s.length - 1 && (r = S[t]);
                var n = r - e
                    , i = "translate(" + Q(tt(e, n) + "%", "0") + ")"
                    , o = "scale(" + Q(n / 100, "1") + ")";
                s[t].style[b.transformRule] = i + " " + o
            }
        }
        function it(t, e) {
            return null === t || !1 === t || void 0 === t ? S[e] : ("number" == typeof t && (t = String(t)),
                t = b.format.from(t),
                !1 === (t = y.toStepping(t)) || isNaN(t) ? S[e] : t)
        }
        function ot(t, e, r) {
            var n = dt(t)
                , i = void 0 === S[0];
            e = void 0 === e || !!e,
            b.animate && !i && pt(h, b.cssClasses.tap, b.animationDuration),
                m.forEach(function(t) {
                    rt(t, it(n[t], t), !0, !1, r)
                });
            for (var o = 1 === m.length ? 0 : 1; o < m.length; ++o)
                m.forEach(function(t) {
                    rt(t, S[t], !0, !0, r)
                });
            et(),
                m.forEach(function(t) {
                    J("update", t),
                    null !== n[t] && e && J("set", t)
                })
        }
        function st() {
            var t = x.map(b.format.to);
            return 1 === t.length ? t[0] : t
        }
        function at(t) {
            var e = S[t]
                , r = y.getNearbySteps(e)
                , n = x[t]
                , i = r.thisStep.step
                , o = null;
            if (b.snap)
                return [n - r.stepBefore.startValue || null, r.stepAfter.startValue - n || null];
            !1 !== i && n + i > r.stepAfter.startValue && (i = r.stepAfter.startValue - n),
                o = n > r.thisStep.startValue ? r.thisStep.step : !1 !== r.stepBefore.step && n - r.stepBefore.highestStep,
                100 === e ? i = null : 0 === e && (o = null);
            var s = y.countStepDecimals();
            return null !== i && !1 !== i && (i = Number(i.toFixed(s))),
            null !== o && !1 !== o && (o = Number(o.toFixed(s))),
                [o, i]
        }
        return ht(e = h, b.cssClasses.target),
            0 === b.dir ? ht(e, b.cssClasses.ltr) : ht(e, b.cssClasses.rtl),
            0 === b.ort ? ht(e, b.cssClasses.horizontal) : ht(e, b.cssClasses.vertical),
            ht(e, "rtl" === getComputedStyle(e).direction ? b.cssClasses.textDirectionRtl : b.cssClasses.textDirectionLtr),
            l = V(e, b.cssClasses.base),
            function(t, e) {
                var r = V(e, b.cssClasses.connects);
                u = [],
                    (s = []).push(M(r, t[0]));
                for (var n = 0; n < b.handles; n++)
                    u.push(D(e, n)),
                        m[n] = n,
                        s.push(M(r, t[n + 1]))
            }(b.connect, l),
        (p = b.events).fixed || u.forEach(function(t, e) {
            B(f.start, t.children[0], I, {
                handleNumbers: [e]
            })
        }),
        p.tap && B(f.start, l, n, {}),
        p.hover && B(f.move, l, W, {
            hover: !0
        }),
        p.drag && s.forEach(function(t, e) {
            if (!1 !== t && 0 !== e && e !== s.length - 1) {
                var r = u[e - 1]
                    , n = u[e]
                    , i = [t];
                ht(t, b.cssClasses.draggable),
                p.fixed && (i.push(r.children[0]),
                    i.push(n.children[0])),
                    i.forEach(function(t) {
                        B(f.start, t, I, {
                            handles: [r, n],
                            handleNumbers: [e - 1, e]
                        })
                    })
            }
        }),
            ot(b.start),
        b.pips && R(b.pips),
        b.tooltips && H(),
            $("update", function(t, e, s, r, a) {
                m.forEach(function(t) {
                    var e = u[t]
                        , r = K(S, t, 0, !0, !0, !0)
                        , n = K(S, t, 100, !0, !0, !0)
                        , i = a[t]
                        , o = b.ariaFormat.to(s[t]);
                    r = y.fromStepping(r).toFixed(1),
                        n = y.fromStepping(n).toFixed(1),
                        i = y.fromStepping(i).toFixed(1),
                        e.children[0].setAttribute("aria-valuemin", r),
                        e.children[0].setAttribute("aria-valuemax", n),
                        e.children[0].setAttribute("aria-valuenow", i),
                        e.children[0].setAttribute("aria-valuetext", o)
                })
            }),
            a = {
                destroy: function() {
                    for (var t in b.cssClasses)
                        b.cssClasses.hasOwnProperty(t) && mt(h, b.cssClasses[t]);
                    for (; h.firstChild; )
                        h.removeChild(h.firstChild);
                    delete h.noUiSlider
                },
                steps: function() {
                    return m.map(at)
                },
                on: $,
                off: G,
                get: st,
                set: ot,
                setHandle: function(t, e, r, n) {
                    if (!(0 <= (t = Number(t)) && t < m.length))
                        throw new Error("noUiSlider (" + lt + "): invalid handle number, got: " + t);
                    rt(t, it(e, t), !0, !0, n),
                        J("update", t),
                    r && J("set", t)
                },
                reset: function(t) {
                    ot(b.start, t)
                },
                __moveHandles: function(t, e, r) {
                    Z(t, e, S, r)
                },
                options: o,
                updateOptions: function(e, t) {
                    var r = st()
                        , n = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"];
                    n.forEach(function(t) {
                        void 0 !== e[t] && (o[t] = e[t])
                    });
                    var i = vt(o);
                    n.forEach(function(t) {
                        void 0 !== e[t] && (b[t] = i[t])
                    }),
                        y = i.spectrum,
                        b.margin = i.margin,
                        b.limit = i.limit,
                        b.padding = i.padding,
                        b.pips ? R(b.pips) : F(),
                        b.tooltips ? H() : z(),
                        S = [],
                        ot(e.start || r, t)
                },
                target: h,
                removePips: F,
                removeTooltips: z,
                getTooltips: function() {
                    return i
                },
                getOrigins: function() {
                    return u
                },
                pips: R
            }
    }
    return {
        __spectrum: i,
        version: lt,
        cssClasses: d,
        create: function(t, e) {
            if (!t || !t.nodeName)
                throw new Error("noUiSlider (" + lt + "): create requires a single element, got: " + t);
            if (t.noUiSlider)
                throw new Error("noUiSlider (" + lt + "): Slider was already initialized.");
            var r = j(t, vt(e), e);
            return t.noUiSlider = r
        }
    }
});
/* JS Cookies v3.14.1. */
!function(e) {
    var n;
    if ("function" == typeof define && define.amd && (define(e),
        n = !0),
    "object" == typeof exports && (module.exports = e(),
        n = !0),
        !n) {
        var t = window.Cookies
            , o = window.Cookies = e();
        o.noConflict = function() {
            return window.Cookies = t,
                o
        }
    }
}(function() {
    function e() {
        for (var e = 0, n = {}; e < arguments.length; e++) {
            var t = arguments[e];
            for (var o in t)
                n[o] = t[o]
        }
        return n
    }
    function n(e) {
        return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent)
    }
    return function t(o) {
        function r() {}
        function i(n, t, i) {
            if ("undefined" != typeof document) {
                "number" == typeof (i = e({
                    path: "/"
                }, r.defaults, i)).expires && (i.expires = new Date(1 * new Date + 864e5 * i.expires)),
                    i.expires = i.expires ? i.expires.toUTCString() : "";
                try {
                    var c = JSON.stringify(t);
                    /^[\{\[]/.test(c) && (t = c)
                } catch (e) {}
                t = o.write ? o.write(t, n) : encodeURIComponent(String(t)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    n = encodeURIComponent(String(n)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
                var f = "";
                for (var u in i)
                    i[u] && (f += "; " + u,
                    !0 !== i[u] && (f += "=" + i[u].split(";")[0]));
                return document.cookie = n + "=" + t + f
            }
        }
        function c(e, t) {
            if ("undefined" != typeof document) {
                for (var r = {}, i = document.cookie ? document.cookie.split("; ") : [], c = 0; c < i.length; c++) {
                    var f = i[c].split("=")
                        , u = f.slice(1).join("=");
                    t || '"' !== u.charAt(0) || (u = u.slice(1, -1));
                    try {
                        var a = n(f[0]);
                        if (u = (o.read || o)(u, a) || n(u),
                            t)
                            try {
                                u = JSON.parse(u)
                            } catch (e) {}
                        if (r[a] = u,
                        e === a)
                            break
                    } catch (e) {}
                }
                return e ? r[e] : r
            }
        }
        return r.set = i,
            r.get = function(e) {
                return c(e, !1)
            }
            ,
            r.getJSON = function(e) {
                return c(e, !0)
            }
            ,
            r.remove = function(n, t) {
                i(n, "", e(t, {
                    expires: -1
                }))
            }
            ,
            r.defaults = {},
            r.withConverter = t,
            r
    }(function() {})
});
/*! lazysizes - v5.2.0 */
!function(a, b) {
    var c = b(a, a.document, Date);
    a.lazySizes = c,
    "object" == typeof module && module.exports && (module.exports = c)
}("undefined" != typeof window ? window : {}, function(a, b, c) {
    "use strict";
    var d, e;
    if (function() {
        var b, c = {
            lazyClass: "lazyload",
            loadedClass: "lazyloaded",
            loadingClass: "lazyloading",
            preloadClass: "lazypreload",
            errorClass: "lazyerror",
            autosizesClass: "lazyautosizes",
            srcAttr: "data-src",
            srcsetAttr: "data-srcset",
            sizesAttr: "data-sizes",
            minSize: 40,
            customMedia: {},
            init: !0,
            expFactor: 1.5,
            hFac: .8,
            loadMode: 2,
            loadHidden: !0,
            ricTimeout: 0,
            throttleDelay: 125
        };
        e = a.lazySizesConfig || a.lazysizesConfig || {};
        for (b in c)
            b in e || (e[b] = c[b])
    }(),
    !b || !b.getElementsByClassName)
        return {
            init: function() {},
            cfg: e,
            noSupport: !0
        };
    var f = b.documentElement
        , g = a.HTMLPictureElement
        , h = "addEventListener"
        , i = "getAttribute"
        , j = a[h].bind(a)
        , k = a.setTimeout
        , l = a.requestAnimationFrame || k
        , m = a.requestIdleCallback
        , n = /^picture$/i
        , o = ["load", "error", "lazyincluded", "_lazyloaded"]
        , p = {}
        , q = Array.prototype.forEach
        , r = function(a, b) {
        return p[b] || (p[b] = new RegExp("(\\s|^)" + b + "(\\s|$)")),
        p[b].test(a[i]("class") || "") && p[b]
    }
        , s = function(a, b) {
        r(a, b) || a.setAttribute("class", (a[i]("class") || "").trim() + " " + b)
    }
        , t = function(a, b) {
        var c;
        (c = r(a, b)) && a.setAttribute("class", (a[i]("class") || "").replace(c, " "))
    }
        , u = function(a, b, c) {
        var d = c ? h : "removeEventListener";
        c && u(a, b),
            o.forEach(function(c) {
                a[d](c, b)
            })
    }
        , v = function(a, c, e, f, g) {
        var h = b.createEvent("Event");
        return e || (e = {}),
            e.instance = d,
            h.initEvent(c, !f, !g),
            h.detail = e,
            a.dispatchEvent(h),
            h
    }
        , w = function(b, c) {
        var d;
        !g && (d = a.picturefill || e.pf) ? (c && c.src && !b[i]("srcset") && b.setAttribute("srcset", c.src),
            d({
                reevaluate: !0,
                elements: [b]
            })) : c && c.src && (b.src = c.src)
    }
        , x = function(a, b) {
        return (getComputedStyle(a, null) || {})[b]
    }
        , y = function(a, b, c) {
        for (c = c || a.offsetWidth; c < e.minSize && b && !a._lazysizesWidth; )
            c = b.offsetWidth,
                b = b.parentNode;
        return c
    }
        , z = function() {
        var a, c, d = [], e = [], f = d, g = function() {
            var b = f;
            for (f = d.length ? e : d,
                     a = !0,
                     c = !1; b.length; )
                b.shift()();
            a = !1
        }, h = function(d, e) {
            a && !e ? d.apply(this, arguments) : (f.push(d),
            c || (c = !0,
                (b.hidden ? k : l)(g)))
        };
        return h._lsFlush = g,
            h
    }()
        , A = function(a, b) {
        return b ? function() {
                z(a)
            }
            : function() {
                var b = this
                    , c = arguments;
                z(function() {
                    a.apply(b, c)
                })
            }
    }
        , B = function(a) {
        var b, d = 0, f = e.throttleDelay, g = e.ricTimeout, h = function() {
            b = !1,
                d = c.now(),
                a()
        }, i = m && g > 49 ? function() {
                m(h, {
                    timeout: g
                }),
                g !== e.ricTimeout && (g = e.ricTimeout)
            }
            : A(function() {
                k(h)
            }, !0);
        return function(a) {
            var e;
            (a = !0 === a) && (g = 33),
            b || (b = !0,
                e = f - (c.now() - d),
            e < 0 && (e = 0),
                a || e < 9 ? i() : k(i, e))
        }
    }
        , C = function(a) {
        var b, d, e = 99, f = function() {
            b = null,
                a()
        }, g = function() {
            var a = c.now() - d;
            a < e ? k(g, e - a) : (m || f)(f)
        };
        return function() {
            d = c.now(),
            b || (b = k(g, e))
        }
    }
        , D = function() {
        var g, m, o, p, y, D, F, G, H, I, J, K, L = /^img$/i, M = /^iframe$/i, N = "onscroll"in a && !/(gle|ing)bot/.test(navigator.userAgent), O = 0, P = 0, Q = 0, R = -1, S = function(a) {
            Q--,
            (!a || Q < 0 || !a.target) && (Q = 0)
        }, T = function(a) {
            return null == K && (K = "hidden" == x(b.body, "visibility")),
            K || !("hidden" == x(a.parentNode, "visibility") && "hidden" == x(a, "visibility"))
        }, U = function(a, c) {
            var d, e = a, g = T(a);
            for (G -= c,
                     J += c,
                     H -= c,
                     I += c; g && (e = e.offsetParent) && e != b.body && e != f; )
                (g = (x(e, "opacity") || 1) > 0) && "visible" != x(e, "overflow") && (d = e.getBoundingClientRect(),
                    g = I > d.left && H < d.right && J > d.top - 1 && G < d.bottom + 1);
            return g
        }, V = function() {
            var a, c, h, j, k, l, n, o, q, r, s, t, u = d.elements;
            if ((p = e.loadMode) && Q < 8 && (a = u.length)) {
                for (c = 0,
                         R++; c < a; c++)
                    if (u[c] && !u[c]._lazyRace)
                        if (!N || d.prematureUnveil && d.prematureUnveil(u[c]))
                            ba(u[c]);
                        else if ((o = u[c][i]("data-expand")) && (l = 1 * o) || (l = P),
                        r || (r = !e.expand || e.expand < 1 ? f.clientHeight > 500 && f.clientWidth > 500 ? 500 : 370 : e.expand,
                            d._defEx = r,
                            s = r * e.expFactor,
                            t = e.hFac,
                            K = null,
                            P < s && Q < 1 && R > 2 && p > 2 && !b.hidden ? (P = s,
                                R = 0) : P = p > 1 && R > 1 && Q < 6 ? r : O),
                        q !== l && (D = innerWidth + l * t,
                            F = innerHeight + l,
                            n = -1 * l,
                            q = l),
                            h = u[c].getBoundingClientRect(),
                        (J = h.bottom) >= n && (G = h.top) <= F && (I = h.right) >= n * t && (H = h.left) <= D && (J || I || H || G) && (e.loadHidden || T(u[c])) && (m && Q < 3 && !o && (p < 3 || R < 4) || U(u[c], l))) {
                            if (ba(u[c]),
                                k = !0,
                            Q > 9)
                                break
                        } else
                            !k && m && !j && Q < 4 && R < 4 && p > 2 && (g[0] || e.preloadAfterLoad) && (g[0] || !o && (J || I || H || G || "auto" != u[c][i](e.sizesAttr))) && (j = g[0] || u[c]);
                j && !k && ba(j)
            }
        }, W = B(V), X = function(a) {
            var b = a.target;
            if (b._lazyCache)
                return void delete b._lazyCache;
            S(a),
                s(b, e.loadedClass),
                t(b, e.loadingClass),
                u(b, Z),
                v(b, "lazyloaded")
        }, Y = A(X), Z = function(a) {
            Y({
                target: a.target
            })
        }, $ = function(a, b) {
            try {
                a.contentWindow.location.replace(b)
            } catch (c) {
                a.src = b
            }
        }, _ = function(a) {
            var b, c = a[i](e.srcsetAttr);
            (b = e.customMedia[a[i]("data-media") || a[i]("media")]) && a.setAttribute("media", b),
            c && a.setAttribute("srcset", c)
        }, aa = A(function(a, b, c, d, f) {
            var g, h, j, l, m, p;
            (m = v(a, "lazybeforeunveil", b)).defaultPrevented || (d && (c ? s(a, e.autosizesClass) : a.setAttribute("sizes", d)),
                h = a[i](e.srcsetAttr),
                g = a[i](e.srcAttr),
            f && (j = a.parentNode,
                l = j && n.test(j.nodeName || "")),
                p = b.firesLoad || "src"in a && (h || g || l),
                m = {
                    target: a
                },
                s(a, e.loadingClass),
            p && (clearTimeout(o),
                o = k(S, 2500),
                u(a, Z, !0)),
            l && q.call(j.getElementsByTagName("source"), _),
                h ? a.setAttribute("srcset", h) : g && !l && (M.test(a.nodeName) ? $(a, g) : a.src = g),
            f && (h || l) && w(a, {
                src: g
            })),
            a._lazyRace && delete a._lazyRace,
                t(a, e.lazyClass),
                z(function() {
                    var b = a.complete && a.naturalWidth > 1;
                    p && !b || (b && s(a, "ls-is-cached"),
                        X(m),
                        a._lazyCache = !0,
                        k(function() {
                            "_lazyCache"in a && delete a._lazyCache
                        }, 9)),
                    "lazy" == a.loading && Q--
                }, !0)
        }), ba = function(a) {
            if (!a._lazyRace) {
                var b, c = L.test(a.nodeName), d = c && (a[i](e.sizesAttr) || a[i]("sizes")), f = "auto" == d;
                (!f && m || !c || !a[i]("src") && !a.srcset || a.complete || r(a, e.errorClass) || !r(a, e.lazyClass)) && (b = v(a, "lazyunveilread").detail,
                f && E.updateElem(a, !0, a.offsetWidth),
                    a._lazyRace = !0,
                    Q++,
                    aa(a, b, f, d, c))
            }
        }, ca = C(function() {
            e.loadMode = 3,
                W()
        }), da = function() {
            3 == e.loadMode && (e.loadMode = 2),
                ca()
        }, ea = function() {
            if (!m) {
                if (c.now() - y < 999)
                    return void k(ea, 999);
                m = !0,
                    e.loadMode = 3,
                    W(),
                    j("scroll", da, !0)
            }
        };
        return {
            _: function() {
                y = c.now(),
                    d.elements = b.getElementsByClassName(e.lazyClass),
                    g = b.getElementsByClassName(e.lazyClass + " " + e.preloadClass),
                    j("scroll", W, !0),
                    j("resize", W, !0),
                    j("pageshow", function(a) {
                        if (a.persisted) {
                            var c = b.querySelectorAll("." + e.loadingClass);
                            c.length && c.forEach && l(function() {
                                c.forEach(function(a) {
                                    a.complete && ba(a)
                                })
                            })
                        }
                    }),
                    a.MutationObserver ? new MutationObserver(W).observe(f, {
                        childList: !0,
                        subtree: !0,
                        attributes: !0
                    }) : (f[h]("DOMNodeInserted", W, !0),
                        f[h]("DOMAttrModified", W, !0),
                        setInterval(W, 999)),
                    j("hashchange", W, !0),
                    ["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(a) {
                        b[h](a, W, !0)
                    }),
                    /d$|^c/.test(b.readyState) ? ea() : (j("load", ea),
                        b[h]("DOMContentLoaded", W),
                        k(ea, 2e4)),
                    d.elements.length ? (V(),
                        z._lsFlush()) : W()
            },
            checkElems: W,
            unveil: ba,
            _aLSL: da
        }
    }()
        , E = function() {
        var a, c = A(function(a, b, c, d) {
            var e, f, g;
            if (a._lazysizesWidth = d,
                d += "px",
                a.setAttribute("sizes", d),
                n.test(b.nodeName || ""))
                for (e = b.getElementsByTagName("source"),
                         f = 0,
                         g = e.length; f < g; f++)
                    e[f].setAttribute("sizes", d);
            c.detail.dataAttr || w(a, c.detail)
        }), d = function(a, b, d) {
            var e, f = a.parentNode;
            f && (d = y(a, f, d),
                e = v(a, "lazybeforesizes", {
                    width: d,
                    dataAttr: !!b
                }),
            e.defaultPrevented || (d = e.detail.width) && d !== a._lazysizesWidth && c(a, f, e, d))
        }, f = function() {
            var b, c = a.length;
            if (c)
                for (b = 0; b < c; b++)
                    d(a[b])
        }, g = C(f);
        return {
            _: function() {
                a = b.getElementsByClassName(e.autosizesClass),
                    j("resize", g)
            },
            checkElems: g,
            updateElem: d
        }
    }()
        , F = function() {
        !F.i && b.getElementsByClassName && (F.i = !0,
            E._(),
            D._())
    };
    return k(function() {
        e.init && F()
    }),
        d = {
            cfg: e,
            autoSizer: E,
            loader: D,
            init: F,
            uP: w,
            aC: s,
            rC: t,
            hC: r,
            fire: v,
            gW: y,
            rAF: z
        }
});
!function(a, b) {
    var c = function() {
        b(a.lazySizes),
            a.removeEventListener("lazyunveilread", c, !0)
    };
    b = b.bind(null, a, a.document),
        "object" == typeof module && module.exports ? b(require("lazysizes")) : a.lazySizes ? c() : a.addEventListener("lazyunveilread", c, !0)
}(window, function(a, b, c) {
    "use strict";
    function d(a, c) {
        if (!g[a]) {
            var d = b.createElement(c ? "link" : "script")
                , e = b.getElementsByTagName("script")[0];
            c ? (d.rel = "stylesheet",
                d.href = a) : d.src = a,
                g[a] = !0,
                g[d.src || d.href] = !0,
                e.parentNode.insertBefore(d, e)
        }
    }
    var e, f, g = {};
    b.addEventListener && (f = /\(|\)|\s|'/,
        e = function(a, c) {
            var d = b.createElement("img");
            d.onload = function() {
                d.onload = null,
                    d.onerror = null,
                    d = null,
                    c()
            }
                ,
                d.onerror = d.onload,
                d.src = a,
            d && d.complete && d.onload && d.onload()
        }
        ,
        addEventListener("lazybeforeunveil", function(a) {
            if (a.detail.instance == c) {
                var b, g, h, i;
                if (!a.defaultPrevented) {
                    var j = a.target;
                    if ("none" == j.preload && (j.preload = j.getAttribute("data-preload") || "auto"),
                    null != j.getAttribute("data-autoplay"))
                        if (j.getAttribute("data-expand") && !j.autoplay)
                            try {
                                j.play()
                            } catch (a) {}
                        else
                            requestAnimationFrame(function() {
                                j.setAttribute("data-expand", "-10"),
                                    c.aC(j, c.cfg.lazyClass)
                            });
                    b = j.getAttribute("data-link"),
                    b && d(b, !0),
                        b = j.getAttribute("data-script"),
                    b && d(b),
                        b = j.getAttribute("data-require"),
                    b && (c.cfg.requireJs ? c.cfg.requireJs([b]) : d(b)),
                        h = j.getAttribute("data-bg"),
                    h && (a.detail.firesLoad = !0,
                        g = function() {
                            j.style.backgroundImage = "url(" + (f.test(h) ? JSON.stringify(h) : h) + ")",
                                a.detail.firesLoad = !1,
                                c.fire(j, "_lazyloaded", {}, !0, !0)
                        }
                        ,
                        e(h, g)),
                        i = j.getAttribute("data-poster"),
                    i && (a.detail.firesLoad = !0,
                        g = function() {
                            j.poster = i,
                                a.detail.firesLoad = !1,
                                c.fire(j, "_lazyloaded", {}, !0, !0)
                        }
                        ,
                        e(i, g))
                }
            }
        }, !1))
});
