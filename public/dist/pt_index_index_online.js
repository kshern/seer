I$(87, function (t, e, i, n, s, o, a, _, r) {
    r = e._$klass();
    var d = r._$extend(t._$$Abstract),
        l = i._$get("banner");
    if (l) {
        var c, h, u, f, p, g, $, m, v, y = l.parentNode,
            b = 0,
            x = 300,
            w = ({
                transitions: function (t) {
                    var e = ["transformProperty", "WebkitTransform", "MozTransform", "OTransform", "msTransform"];
                    for (var i in e) if (void 0 !== t.style[e[i]]) return !0;
                    return !1
                }(document.createElement("swipe"))
            }, 3e3),
            k = {}, I = {};
        d.__reset = function (t) {
            this.__super(t);
            this.options = t;
            v = this;
            this.__slideImgStateObj = {};
            if (this.__setup()) {
                l.addEventListener("touchstart", this.events, !1);
                l.addEventListener("webkitTransitionEnd", this.events, !1);
                l.addEventListener("msTransitionEnd", this.events, !1);
                l.addEventListener("oTransitionEnd", this.events, !1);
                l.addEventListener("otransitionend", this.events, !1);
                l.addEventListener("transitionend", this.events, !1);
                window.addEventListener("resize", this.events, !1);
                window.addEventListener("load", function () {
                    v.begin();
                    v.__loadImgByIndex(1)
                }, !1)
            }
        };
        d.__setup = function () {
            c = l.children;
            if (!c) return !1;
            f = void 0 !== f ? f : c.length - 1;
            p = void 0 !== p ? p : b + 1;
            g = void 0 !== g ? g : f - 1;
            h = new Array(c.length);
            u = y.getBoundingClientRect().width || y.offsetWidth;
            l.style.width = c.length * u + "px";
            for (var t = c.length; t--;) {
                var e = c[t];
                e.style.width = u + "px";
                e.setAttribute("data-index", t);
                e.style.left = t * -u + "px";
                if (t == f) this.move(t, -u, 0);
                else this.move(t, b === t ? 0 : u, 0);
                i._$addClassName(e, "is-active")
            }
            this.__loadImgByIndex(0);
            if (c.length <= 1) return !1;
            else return !0
        };
        d.begin = function () {
            $ = setTimeout(this.next._$bind(this), w)
        };
        d.stop = function () {
            w = 0;
            clearTimeout($)
        };
        d.prev = function () {
            if (b) this.slide(b - 1);
            else this.slide(c.length - 1)
        };
        d.next = function () {
            if (b < c.length - 1) this.slide(b + 1);
            else this.slide(0)
        };
        d.__loadImgByIndex = function (t) {
            var e = c.length;
            t = (t + e) % e;
            if (2 != this.__slideImgStateObj[t] && 1 != this.__slideImgStateObj[t]) {
                this.__slideImgStateObj[t] = 1;
                var n = c[t],
                    s = n.getElementsByTagName("img")[0],
                    o = i._$dataset(s, "src");
                if (o) a.srcset(s, {
                        src: o,
                        ratio: i._$dataset(s, "ratio")
                    }, function (e) {
                        window.LazyImageInst && window.LazyImageInst._$dispatchEvent("onappendcomplete", {
                            node: e
                        });
                        this.__slideImgStateObj[t] = 2
                    }._$bind(this))
            }
        };
        d.move = function (t, e, i) {
            this.translate(t, e, i);
            h[t] = e
        };
        d.slide = function (t, e) {
            if (b != t) {
                this.__loadImgByIndex(t);
                var i = (Math.abs(b - t) - 1, -1);
                this.move(b, u * i, e || x);
                this.move(t, 0, e || x);
                this.move(f, -u * i, 0);
                b = t;
                this.endFlag(!0);
                this.options.callback(b)
            }
        };
        d.translate = function (t, e, i) {
            var n = c[t],
                s = n && n.style;
            if (s) {
                s.webkitTransitionDuration = s.MozTransitionDuration = s.msTransitionDuration = s.OTransitionDuration =
                    s.transitionDuration = i + "ms";
                s.webkitTransform = "translate(" + e + "px,0)translateZ(0)";
                s.msTransform = s.MozTransform = s.OTransform = "translateX(" + e + "px)"
            }
        };
        d.events = {
            handleEvent: function (t) {
                switch (t.type) {
                case "touchstart":
                    this.start(t);
                    break;
                case "touchmove":
                    this.move(t);
                    break;
                case "touchend":
                    this.end(t);
                    break;
                case "webkitTransitionEnd":
                case "msTransitionEnd":
                case "oTransitionEnd":
                case "otransitionend":
                case "transitionend":
                    this.transitionEnd(t);
                    break;
                case "resize":
                    v.__setup()
                }
            },
            start: function (t) {
                var e = t.touches[0];
                k = {
                    x: e.pageX,
                    y: e.pageY,
                    time: +new Date
                };
                m = void 0;
                I = {};
                l.addEventListener("touchmove", this, !1);
                l.addEventListener("touchend", this, !1)
            },
            move: function (t) {
                if (!(t.touches.length > 1 || t.scale && 1 !== t.scale)) {
                    var e = t.touches[0];
                    I = {
                        x: e.pageX - k.x,
                        y: e.pageY - k.y
                    };
                    if ("undefined" == typeof m) m = !! (m || Math.abs(I.x) < Math.abs(I.y));
                    if (!m) {
                        t.preventDefault();
                        v.stop();
                        v.translate(f, I.x + h[f], 0);
                        v.translate(b, I.x + h[b], 0);
                        if (I.x > 0) v.translate(g, I.x + h[g], 0);
                        else v.translate(p, I.x + h[p], 0)
                    }
                }
            },
            end: function (t) {
                var e = +new Date - k.time,
                    i = Number(e) < 250 && Math.abs(I.x) > 20 || Math.abs(I.x) > u / 2,
                    n = I.x < 0;
                if (!m) if (i) {
                        if (n) {
                            v.move(f, u, 0);
                            v.move(b, -u, x);
                            v.move(p, 0, x);
                            b += 1;
                            b = b === c.length ? 0 : b;
                            v.endFlag(n)
                        } else {
                            v.move(f, 0, x);
                            v.move(b, u, x);
                            v.move(g, -u, 0);
                            b += -1;
                            b = b === -1 ? c.length - 1 : b;
                            v.endFlag(n)
                        }
                        v.options.callback(b)
                    } else {
                        v.move(f, -u, x);
                        v.move(b, 0, x);
                        v.move(p, u, x)
                    }
                w = 3e3;
                l.removeEventListener("touchmove", this.move, !1);
                l.removeEventListener("touchend", this.end, !1)
            },
            transitionEnd: function (t) {
                if (parseInt(t.target.getAttribute("data-index"), 10) == b) if (w) {
                        v.begin();
                        v.__loadImgByIndex(b + 1)
                    }
            }
        };
        d.endFlag = function (t) {
            if (t) {
                p++;
                p = p === c.length ? 0 : p;
                g++;
                g = g === c.length ? 0 : g;
                f++;
                f = f === c.length ? 0 : f
            } else {
                p--;
                p = p === -1 ? c.length - 1 : p;
                g--;
                g = g === -1 ? c.length - 1 : g;
                f--;
                f = f === -1 ? c.length - 1 : f
            }
        };
        d.__destroy = function () {
            this.__super()
        };
        return r
    }
}, 36, 31, 2, 5, 37, 3, 13, 12);
I$(97, function (t, e, i, n, s, o, a) {
    var _;
    n._$$Item = e._$klass();
    _ = n._$$Item._$extend(i._$$Abstract);
    _.__init = function () {
        this.__id = this.__genId();
        this.__super()
    };
    _.__reset = function (t) {
        this.__super(t);
        this.__index = t.index;
        this.__total = t.total;
        this.__range = t.range;
        this._$refresh(t.data)
    };
    _.__destroy = function () {
        this.__super();
        delete this.__data;
        delete this.__index;
        delete this.__total;
        delete this.__range
    };
    _.__doRefresh = o;
    _.__genId = function () {
        var t = +new Date;
        return function () {
            return "itm-" + ++t
        }
    }();
    _._$getId = function () {
        return this.__id
    };
    _._$getData = function () {
        return this.__data
    };
    _._$refresh = function (t) {
        this.__data = t || {};
        this.__doRefresh(this.__data)
    };
    if (!0) t.copy(t.P("nej.ui"), n);
    return n
}, 19, 31, 36);
I$(95, function (t, e, i, n, s, o, a) {
    var _;
    n._$$ListItem = e._$klass();
    _ = n._$$ListItem._$extend(i._$$Item);
    _.__reset = function (t) {
        this.__pkey = t.pkey || "id";
        this.__prefix = t.prefix || "";
        this.__super(t)
    };
    _.__onDelete = function (t) {
        this._$dispatchEvent("ondelete", {
            ext: t,
            id: this._$getId(),
            data: this._$getData(),
            body: this._$getBody()
        })
    };
    _.__onUpdate = function (t) {
        this._$dispatchEvent("onupdate", {
            ext: t,
            id: this._$getId(),
            data: this._$getData(),
            body: this._$getBody()
        })
    };
    _._$refresh = function (t) {
        this.__super(t);
        var e = this.__data[this.__pkey];
        this.__id = this.__prefix + e || this.__genId()
    };
    if (!0) t.copy(t.P("nej.ui"), n);
    return n
}, 19, 31, 97);
I$(100,
    ".#<uispace>{font-size:12px;line-height:160%;} .#<uispace> a{margin:0 2px;padding:2px 8px;color:#333;border:1px solid #aaa;text-decoration:none;} .#<uispace> .js-disabled{cursor:default;} .#<uispace> .js-selected{cursor:default;background-color:#bbb;}");
I$(98, function (t, e, i, n, s, o, a, _, r, d, l) {
    var c;
    _._$$AbstractPager = e._$klass();
    c = _._$$AbstractPager._$extend(s._$$Abstract);
    c.__reset = function (t) {
        this.__bopt = n._$merge({}, t);
        this.__popt = n._$merge({}, t);
        delete this.__bopt.onchange;
        this.__popt.onchange = this.__onChange._$bind(this);
        this.__super(t);
        this.__doResetNumber(t)
    };
    c.__destroy = function () {
        if (this.__page) {
            this.__page._$recycle();
            delete this.__page
        }
        this.__super();
        delete this.__bopt;
        delete this.__popt;
        this._$unbind();
        this.__body.innerHTML = " "
    };
    c.__initXGui = function () {
        var t = i._$pushCSSText(a);
        return function () {
            this.__seed_css = t
        }
    }();
    c.__doResetNumber = function (t) {
        var e = t.label || r;
        if (!t.noprv) {
            this.__popt.pbtn = i._$create("a", "zbtn zprv", this.__body);
            this.__popt.pbtn.innerHTML = e.prev || "涓婁竴椤�"
        }
        for (var n = [], s = 1, o = t.number; s <= o; s++) n.push(i._$create("a", "zpgi zpg" + s, this.__body));
        this.__popt.list = n;
        if (!t.nonxt) {
            this.__popt.nbtn = i._$create("a", "zbtn znxt", this.__body);
            this.__popt.nbtn.innerHTML = e.next || "涓嬩竴椤�"
        }
    };
    c.__onChange = function (t) {
        if (!this.__flag) {
            var e = t.index,
                i = t.total;
            this.__flag = !0;
            this._$updatePage(e, i);
            n._$forEach(this.__binders, function (t) {
                t._$updatePage(e, i)
            });
            this.__flag = !1;
            this._$dispatchEvent("onchange", t)
        }
    };
    c._$bind = function (t) {
        t = i._$get(t);
        if (t) {
            var e = n._$merge({}, this.__bopt);
            e.parent = t;
            e.index = this._$getIndex();
            e.total = this._$getTotal();
            var s = this.constructor._$allocate(e);
            s._$setEvent("onchange", this.__popt.onchange);
            if (!this.__binders) this.__binders = [];
            this.__binders.push(s)
        }
    };
    c._$unbind = function () {
        var t = function (t, e, i) {
            t._$recycle();
            i.splice(e, 1)
        };
        return function () {
            n._$reverseEach(this.__binders, t)
        }
    }();
    c._$setIndex = function (t) {
        if (this.__page) this.__page._$setIndex(t)
    };
    c._$getIndex = function () {
        if (!this.__page) return 1;
        else return this.__page._$getIndex()
    };
    c._$getTotal = function () {
        if (!this.__page) return 1;
        else return this.__page._$getTotal()
    };
    c._$updatePage = function (t, e) {
        if (this.__page) this.__page._$updatePage(t, e)
    };
    c._$updateTotal = function (t) {
        if (this.__page) this.__page._$updateTotal(t)
    };
    if (!0) t.copy(t.P("nej.ui"), _);
    return _
}, 19, 31, 2, 3, 36, 40, 100);
I$(101, function (t, e, i, n, s, o, a, _, r, d) {
    var l;
    a._$$PageAbstract = e._$klass();
    l = a._$$PageAbstract._$extend(o._$$EventTarget);
    l.__reset = function (t) {
        this.__super(t);
        this.__pbtn = t.pbtn;
        this.__nbtn = t.nbtn;
        this.__sbtn = t.sbtn;
        this.__ebtn = t.ebtn;
        this.__name = t.event || "click";
        this.__parented = !! t.parented;
        this.__selected = t.selected || "js-selected";
        this.__disabled = t.disabled || "js-disabled";
        this.__doPageListCheck(t.list);
        this.__limit = t.limit || 1 / 0;
        this._$updatePage(t.index || 1, t.total || 1)
    };
    l.__destroy = function () {
        this.__super();
        delete this.__list;
        delete this.__name;
        delete this.__pbtn;
        delete this.__nbtn;
        delete this.__sbtn;
        delete this.__ebtn;
        delete this.__last;
        delete this.__total;
        delete this.__index;
        delete this.__extdata;
        delete this.__selected;
        delete this.__disabled
    };
    l.__getSelectNode = function (t) {
        return !this.__parented ? t : t.parentNode
    };
    l.__doPageListCheck = function () {
        var t = function (t) {
            this.__list.push(t);
            this.__doInitDomEvent([[t, this.__name, this.__onClick._$bind2(this, 0)]])
        };
        return function (e) {
            this.__list = [];
            this.__doInitDomEvent([[this.__pbtn, "click", this.__onClick._$bind2(this, -1)], [this.__nbtn, "click",
                        this.__onClick._$bind2(this, 1)], [this.__sbtn, "click", this.__onClick._$bind2(this, -2)], [
                        this.__ebtn, "click", this.__onClick._$bind2(this, 2)]]);
            i._$forEach(e, t, this)
        }
    }();
    l.__doSetNodeIndex = function (t, e) {
        var i = this.__getSelectNode(t);
        if (null == e) {
            t.innerText = "";
            n._$setStyle(t, "display", "none");
            n._$delClassName(i, this.__selected)
        } else {
            t.innerText = e;
            n._$setStyle(t, "display", "");
            e == this.__index ? n._$addClassName(i, this.__selected) : n._$delClassName(i, this.__selected)
        }
    };
    l.__doSyncBtnState = function () {
        if (this.__index <= 1) {
            n._$addClassName(this.__pbtn, this.__disabled);
            n._$addClassName(this.__sbtn, this.__disabled)
        } else {
            n._$delClassName(this.__pbtn, this.__disabled);
            n._$delClassName(this.__sbtn, this.__disabled)
        } if (this.__index >= this.__total) {
            n._$addClassName(this.__nbtn, this.__disabled);
            n._$addClassName(this.__ebtn, this.__disabled)
        } else {
            n._$delClassName(this.__nbtn, this.__disabled);
            n._$delClassName(this.__ebtn, this.__disabled)
        }
    };
    l.__doRefreshPage = r;
    l.__doChangeIndex = function () {
        this.__doRefreshPage();
        this.__doSyncBtnState();
        this._$dispatchEvent("onchange", {
            last: this.__last,
            total: this.__total,
            index: this.__index,
            ext: this.__extdata
        })
    };
    l.__doSaveIndex = function (t) {
        t = parseInt(t);
        if (isNaN(t) || null == this.__total) return !1;
        t = Math.max(1, Math.min(t, this.__total));
        this.__last = this.__index;
        this.__index = t;
        return !0
    };
    l.__doSaveTotal = function (t) {
        t = parseInt(t);
        if (isNaN(t) || t < 1) return !1;
        this.__total = Math.min(t, this.__limit);
        return !0
    };
    l.__onClick = function (t, e) {
        s._$stopDefault(t);
        var i = s._$getElement(t),
            o = n._$hasClassName(this.__getSelectNode(i), this.__selected),
            a = n._$hasClassName(i, this.__disabled);
        if (i && !o && !a) {
            var _ = i.innerText;
            switch (e) {
            case 1:
            case -1:
                _ = this.__index + e;
                break;
            case 2:
                _ = this.__total;
                break;
            case -2:
                _ = 1
            }
            this._$setIndex(_)
        }
    };
    l._$getIndex = function () {
        return this.__index
    };
    l._$setIndex = function (t) {
        var e = this.__index;
        this.__doSaveIndex(t);
        if (e != this.__index) this.__doChangeIndex()
    };
    l._$getTotal = function () {
        return this.__total
    };
    l._$setTotal = function (t) {
        if (this.__doSaveTotal(t) && null != this.__index) {
            this.__index = 1;
            this.__doChangeIndex()
        }
    };
    l._$updateTotal = function (t) {
        if (this.__doSaveTotal(t)) {
            this.__doRefreshPage();
            this.__doSyncBtnState()
        }
    };
    l._$updatePage = function (t, e) {
        if (this.__doSaveTotal(e) && this.__doSaveIndex(t)) this.__doChangeIndex()
    };
    if (!0) t.P("nej.ut")._$$AbstractPage = a._$$PageAbstract;
    return a
}, 19, 31, 3, 2, 5, 32);
I$(99, function (t, e, i, n, s, o, a, _, r) {
    var d;
    o._$$PageFragment = e._$klass();
    d = o._$$PageFragment._$extend(s._$$PageAbstract);
    d.__init = function () {
        this.__ndot = [];
        this.__super()
    };
    d.__destroy = function () {
        this.__super();
        this.__doRecycleDotNode()
    };
    d.__doRecycleDotNode = function () {
        var t = function (t, e, n) {
            i._$remove(t);
            n.splice(e, 1)
        };
        return function () {
            n._$reverseEach(this.__ndot, t)
        }
    }();
    d.__doRefreshPage = function () {
        this.__extdata = {
            last: !1,
            first: !1,
            list: this.__list
        };
        this.__doRecycleDotNode();
        this.__doSetNodeIndex(this.__list[0], 1);
        var t = 1,
            e = this.__list.length;
        if (!(this.__total < e)) {
            if (this.__index > 1) {
                var n = Math.floor((e - 2) / 2),
                    s = this.__total - e + 2,
                    o = Math.max(2, this.__index - n);
                if (this.__total >= e) o = Math.min(o, s);
                if (o > 2) {
                    var a = i._$create("span", "zdot");
                    this.__ndot.push(a);
                    a.innerText = "...";
                    this.__list[0].insertAdjacentElement("afterEnd", a);
                    this.__extdata.first = !0
                }
                for (var _;; t++) {
                    _ = o + t - 1;
                    if (_ > this.__index) break;
                    this.__doSetNodeIndex(this.__list[t], _)
                }
            }
            if (this.__index < this.__total) {
                for (var _, o = this.__index + 1, r = 0, d = e - 2;; r++, t++) {
                    _ = o + r;
                    if (t > d || _ > this.__total) break;
                    this.__doSetNodeIndex(this.__list[t], _)
                }
                if (_ < this.__total) {
                    var a = i._$create("span", "zdot");
                    this.__ndot.push(a);
                    a.innerText = "...";
                    this.__list[t].insertAdjacentElement("beforeBegin", a);
                    this.__extdata.last = !0
                }
                if (_ <= this.__total) this.__doSetNodeIndex(this.__list[t++], this.__total)
            }
            for (; t < e; t++) this.__doSetNodeIndex(this.__list[t])
        } else for (var l; t < e; t++) {
                l = t + 1;
                this.__doSetNodeIndex(this.__list[t], l > this.__total ? null : l)
        }
    };
    if (!0) t.P("nej.ut")._$$Page = o._$$PageFragment;
    return o
}, 19, 31, 2, 3, 101);
I$(96, function (t, e, i, n, s, o, a, _, r) {
    var d;
    o._$$Pager = e._$klass();
    d = o._$$Pager._$extend(n._$$AbstractPager);
    d.__reset = function (t) {
        t.number = parseInt(t.number) || 9;
        this.__super(t);
        this.__page = s._$$PageFragment._$allocate(this.__popt)
    };
    d.__onChange = function (t) {
        if (this.__bopt.noend) {
            var e = t.ext || a,
                n = e.list || r;
            if (e.last) i._$setStyle(n[n.length - 1], "display", "none")
        }
        this.__super(t)
    };
    if (!0) t.copy(t.P("nej.ui"), o);
    return o
}, 19, 31, 2, 98, 99);
I$(94, function (t, e, i, n, s, o, a, _, r, d, l, c, h, u, f) {
    var p;
    c._$$ListModule = e._$klass();
    p = c._$$ListModule._$extend(_._$$EventTarget);
    p.__reset = function (t) {
        this.__ropt = {};
        this.__super(t);
        this.__lbox = s._$get(t.parent);
        this.__iopt = {
            parent: this.__lbox
        };
        this.__limit = parseInt(t.limit) || 10;
        this.__first = parseInt(t.first) || this.__limit;
        this.__doResetTemplate(t.item);
        this.__doResetCache(t.cache || h);
        this.__doResetPager(t.pager || h);
        this._$refresh()
    };
    p.__destroy = function () {
        this._$dispatchEvent("onbeforerecycle");
        this.__doClearListBox();
        this.__super();
        if (this.__ropt.clear) this.__cache._$clearListInCache(this.__ropt.key);
        this.__cache._$recycle();
        if (this.__pager) {
            this.__pager._$recycle();
            delete this.__pager
        }
        delete this.__pkls;
        delete this.__popt;
        delete this.__pulling;
        delete this.__cache;
        delete this.__lbox;
        delete this.__ikls;
        delete this.__iopt;
        delete this.__iext;
        delete this.__ropt
    };
    p.__getItemBodyId = function (t) {
        return this.__getItemId(t) + r._$seed()
    };
    p.__getItemId = function (t) {
        var e = (this.__iopt || h).prefix || "";
        return e + t
    };
    p.__getPageInfo = function (t, e, i, n) {
        var s = {
            index: 1,
            total: 1
        };
        if (e >= t) s.index = Math.floor((e - t) / i) + 2;
        if (n > t) s.total = Math.ceil((n - t) / i) + 1;
        return s
    };
    p.__doResetJSTTemplate = function (t) {
        delete this.__ikls;
        this.__ikey = t;
        this.__doInitDomEvent([[this.__lbox, "click", this.__onCheckAction._$bind(this)]])
    };
    p.__doResetTemplate = function (t) {
        if (!i._$isString(t)) {
            i._$merge(this.__iopt, t);
            this.__iext = i._$merge({}, t, function (t) {
                return !i._$isFunction(t)
            });
            var e = this.__iopt.klass;
            delete this.__iopt.klass;
            if (!i._$isString(e)) {
                delete this.__ikey;
                this.__ikls = e;
                this.__iopt.ondelete = this._$dispatchEvent._$bind(this, "ondelete");
                this.__iopt.onupdate = this._$dispatchEvent._$bind(this, "onupdate")
            } else this.__doResetJSTTemplate(e)
        } else this.__doResetJSTTemplate(t)
    };
    p.__doResetCache = function (t) {
        var e = t.klass,
            n = i._$merge({}, t);
        this.__ropt.key = n.lkey;
        this.__ropt.ext = n.ext;
        this.__ropt.data = n.data || {};
        this.__ropt.clear = !! n.clear;
        this.__iopt.pkey = n.key || "id";
        n.onerror = this._$dispatchEvent._$bind(this, "onerror");
        n.onlistload = this.__cbListLoad._$bind(this);
        n.onpullrefresh = this.__cbPullRefresh._$bind(this);
        if (e && "onlistchange" in e) this.__doInitDomEvent([[e, "listchange", this.__cbListChange._$bind(this)]]);
        else {
            n.onitemadd = this.__cbItemAdd._$bind(this);
            n.onitemdelete = this.__cbItemDelete._$bind(this);
            n.onitemupdate = this.__cbItemUpdate._$bind(this)
        }
        this.__cache = (e || l._$$CacheList)._$allocate(n);
        if (null != t.total) this.__cache._$setTotal(this.__ropt.key, t.total);
        if (t.list) this.__cache._$setListInCache(this.__ropt.key, t.list)
    };
    p.__doResetPager = function (t) {
        this.__pkls = t.klass || a._$$Pager;
        this.__popt = i._$merge({}, t);
        if (i._$isArray(t.parent)) {
            this.__popt.parent = t.parent[0];
            this.__pbid = t.parent.slice(1);
            if (!this.__pbid || !this.__pbid.length) delete this.__pbid
        }
        delete this.__popt.klass
    };
    p.__doClearListBox = function () {
        var t = /^(?:table|tr|tbody|ul|ol|select)$/i;
        return function () {
            this._$dispatchEvent("onbeforelistclear", {
                parent: this.__lbox
            });
            if (this.__items && this.__items.length > 0) {
                this.__items = this.__ikls._$recycle(this.__items);
                delete this.__items
            }
            if (t.test(this.__lbox.tagName)) s._$clearChildren(this.__lbox);
            else this.__lbox.innerHTML = ""
        }
    }();
    p.__doSwitchPagerShow = function (t) {
        if (!this.__popt.fixed) {
            s._$setStyle(this.__popt.parent, "display", t);
            i._$forEach(this.__pbid, function (e) {
                s._$setStyle(e, "display", t)
            }, this)
        }
    };
    p.__doRefreshByPager = function () {
        var t = this.__popt.index || 1;
        delete this.__popt.index;
        if (this.__pager) t = this.__pager._$getIndex();
        this.__doChangePage({
            last: t,
            index: t
        })
    };
    p.__doChangePage = function (t) {
        this._$dispatchEvent("onpagechange", t)
    };
    p.__doChangeOffset = function (t) {
        this.__ropt.offset = t;
        this.__doLoadList()
    };
    p.__doGenRequestOpt = function (t) {
        return t
    };
    p.__doLoadList = function () {
        this.__doBeforeListLoad();
        var t = this.__ropt.data;
        t.offset = this.__ropt.offset;
        var e = 0 == t.offset;
        t.total = e;
        this.__ropt.limit = e ? this.__first : this.__limit;
        t.limit = this.__ropt.limit;
        this.__cache._$getList(this.__doGenRequestOpt(i._$merge({}, this.__ropt)))
    };
    p.__cbListLoad = function (t) {
        if (t.key == this.__ropt.key && t.offset == this.__ropt.offset) {
            this.__doBeforeListShow();
            var e = this.__cache._$getListInCache(t.key);
            if (!e || !e.length) {
                if (!this._$cache()._$isLoaded(t.key)) this._$dispatchEvent("onlistloaderror", {
                        parent: this.__lbox
                    });
                else this.__doShowEmpty();
                return !0
            }
            var i = t.limit,
                n = t.offset;
            if (!this.__cache._$isFragmentFilled(t.key, n, i)) {
                this._$dispatchEvent("onlistloaderror", {
                    parent: this.__lbox
                });
                return !0
            }
            if (!this.__doBeforeListRender(e, n, i)) {
                this._$dispatchEvent("onbeforelistrender", {
                    list: e,
                    limit: i,
                    offset: n,
                    parent: this.__lbox,
                    total: this.__cache._$getTotal(t.key)
                });
                if (this.__ikey) {
                    this.__iopt.xlist = e;
                    this.__iopt.beg = n;
                    this.__iopt.end = Math.min(e.length, n + i) - 1;
                    this.__iopt.act = "list";
                    var s = r._$get(this.__ikey, this.__iopt, this.__iext);
                    this.__doShowListByJST(s)
                } else {
                    this.__iopt.limit = i;
                    this.__iopt.offset = n;
                    var o = d._$getItemTemplate(e, this.__ikls, this.__iopt);
                    this.__doShowListByItem(o)
                }
                this._$dispatchEvent("onafterlistrender", {
                    list: e,
                    limit: i,
                    offset: n,
                    parent: this.__lbox,
                    total: this.__cache._$getTotal(t.key)
                })
            }
        }
    };
    p.__cbPullRefresh = function (t) {
        if (this.__pulling) {
            delete this.__pulling;
            this.__doBeforeListShow("onafterpullrefresh");
            this._$refresh()
        }
    };
    p.__doSyncPager = function (t, e) {
        if (this.__pager) {
            if ((this.__popt || h).limit > 0) e = Math.min(e, this.__popt.limit);
            var n = this.__pager._$getIndex(),
                s = this.__pager._$getTotal();
            if (n > e || e != s) {
                this.__pager._$recycle();
                delete this.__pager;
                this.__doChangePage({
                    last: n,
                    index: Math.min(t, e)
                });
                return !0
            }
        } else {
            this.__popt.index = t;
            this.__popt.total = e;
            this.__pager = this.__pkls._$allocate(this.__popt);
            this.__pager._$setEvent("onchange", this.__doChangePage._$bind(this));
            i._$forEach(this.__pbid, function (t) {
                this.__pager._$bind(t)
            }, this)
        }
    };
    p.__doFormatData = function () {
        var t = +new Date;
        return function (e) {
            var i = e[this.__iopt.pkey];
            if (!i) {
                e["dirty-data"] = !0;
                e[this.__iopt.pkey] = "dirty-" + t++
            }
            return e
        }
    }();
    p.__doSplitDirty = function (t) {
        var e = t[this.__iopt.pkey];
        if (t["dirty-data"]) {
            delete t["dirty-data"];
            delete t[this.__iopt.pkey]
        }
        return e
    };
    p.__doInsertOneItem = function () {
        var t = function (t, e) {
            this.__lbox.insertAdjacentElement(t, e)
        };
        return function (e, i) {
            var n = [i];
            if (this.__ikey) {
                this.__iopt.xlist = n;
                this.__iopt.beg = 0;
                this.__iopt.end = 0;
                this.__iopt.act = "add";
                this.__doShowListByJST(r._$get(this.__ikey, this.__iopt, this.__iext), e)
            } else {
                this.__iopt.limit = 1;
                this.__iopt.offset = 0;
                this.__iopt.parent = t._$bind(this, e);
                var s = d._$getItemTemplate(n, this.__ikls, this.__iopt);
                this.__iopt.parent = this.__lbox;
                this.__doShowListByItem(s)
            }
        }
    }();
    p.__doBeforeListLoad = u;
    p.__doBeforeListShow = function (t) {
        var e = {
            parent: this.__lbox
        };
        this._$dispatchEvent(t || "onafterlistload", e);
        if (!e.stopped) s._$removeByEC(this.__ntip)
    };
    p.__doBeforeListRender = u;
    p.__doRenderMessage = function (t, e) {
        if (i._$isString(t)) {
            if (!this.__ntip) this.__ntip = s._$create("div");
            this.__ntip.innerHTML = t
        } else this.__ntip = t;
        this.__lbox.insertAdjacentElement(e || "beforeEnd", this.__ntip);
    };
    p.__doShowMessage = function (t, e, i) {
        var n = {
            parent: this.__lbox
        };
        if (t) this._$dispatchEvent(t, n);
        if (!n.stopped) this.__doRenderMessage(n.value || e, i)
    };
    p.__doShowEmpty = u;
    p.__doShowListByJST = u;
    p.__doShowListByItem = u;
    p.__onCheckAction = function () {
        var t = /^(?:delete|update)$/;
        return function (e) {
            var i = n._$getElement(e, "d:action");
            if (i) {
                var o = s._$dataset(i, "action");
                if (t.test(o)) {
                    var a = s._$dataset(i, "id");
                    if (a) {
                        var _ = this.__cache._$getItemInCache(a);
                        if (_) {
                            n._$stop(e);
                            this._$dispatchEvent("on" + o, {
                                data: _,
                                id: _[this.__iopt.pkey],
                                body: s._$get(this.__getItemBodyId(a))
                            })
                        }
                    }
                }
            }
        }
    }();
    p.__cbItemAdd = u;
    p.__doDeleteItem = function (t) {
        var e = t.data || {}, i = {
                data: e,
                key: this.__ropt.key,
                id: e[this.__iopt.pkey]
            };
        this._$dispatchEvent("onbeforedelete", i);
        this.__cache._$deleteItem(i)
    };
    p.__cbItemDelete = u;
    p.__doUpdateItem = function (t) {
        var e = t.data || {}, i = {
                data: e,
                key: this.__ropt.key
            };
        this._$dispatchEvent("onbeforeupdate", i);
        this.__cache._$updateItem(i)
    };
    p.__cbItemUpdate = function (t) {
        this.__doCheckResult(t, "onafterupdate");
        if (!t.stopped) {
            var e = t.data[this.__iopt.pkey];
            if (this.__items) {
                var n = d._$getItemById(this.__getItemId(e));
                if (n) n._$refresh(t.data)
            } else {
                var o = this._$getItemBody(e);
                if (!o) return;
                var a = this.__cache._$getListInCache(t.key),
                    _ = i._$indexOf(a, t.data);
                if (_ < 0) return;
                this.__iopt.xlist = a;
                this.__iopt.beg = _;
                this.__iopt.end = _;
                this.__iopt.act = "update";
                var l = r._$get(this.__ikey, this.__iopt, this.__iext);
                o.insertAdjacentHTML("afterEnd", l);
                s._$remove(o)
            }
            this._$dispatchEvent("onafterupdaterender", {
                data: t.data,
                parent: this.__lbox
            })
        }
    };
    p.__doCheckResult = function (t, e) {
        var i = t.data;
        if (!i || null == i[this.__iopt.pkey]) {
            this._$dispatchEvent("onerror", t);
            t.stopped = !0
        }
        if (!t.stopped) this._$dispatchEvent(e, t)
    };
    p.__cbAppendList = u;
    p.__cbUnshiftList = u;
    p.__cbListChange = function (t) {
        if (t.key == this.__ropt.key) switch (t.action) {
            case "add":
                this.__cbItemAdd(t);
                break;
            case "delete":
                this.__cbItemDelete(t);
                break;
            case "update":
                this.__cbItemUpdate(t);
                break;
            case "refresh":
                this._$refresh();
                break;
            case "unshift":
                this.__cbUnshiftList(t.offset, t.limit);
                break;
            case "append":
                this.__cbAppendList(t.offset, t.limit)
        }
    };
    p._$update = function (t) {
        this.__doUpdateItem({
            data: t
        })
    };
    p._$delete = function (t) {
        this.__doDeleteItem({
            data: t
        })
    };
    p._$add = function (t) {
        this.__cache._$addItem({
            data: t,
            key: this.__ropt.key
        })
    };
    p._$cache = function () {
        return this.__cache
    };
    p._$unshift = function (t) {
        this.__doInsertOneItem("afterBegin", this.__doFormatData(t));
        return this.__doSplitDirty(t)
    };
    p._$append = function (t) {
        this.__doInsertOneItem("beforeEnd", this.__doFormatData(t));
        return this.__doSplitDirty(t)
    };
    p._$refresh = function () {
        this.__doClearListBox();
        this.__doRefreshByPager()
    };
    p._$refreshWithClear = function () {
        this.__cache._$clearListInCache(this.__ropt.key);
        this._$refresh()
    };
    p._$pullRefresh = function () {
        if (!this.__pulling) {
            this.__pulling = !0;
            this.__doShowMessage("onbeforepullrefresh", "鍒楄〃鍒锋柊涓�...", "afterBegin");
            this.__cache._$pullRefresh({
                key: this.__ropt.key,
                data: this.__ropt.data
            })
        }
    };
    p._$getTotal = function () {
        return this.__cache._$getTotal(this.__ropt.key)
    };
    p._$getPager = function () {
        return this.__pager
    };
    p._$items = function () {
        return this.__items
    };
    p._$getItemBody = function (t) {
        if (this.__ikey) return s._$get(this.__getItemBodyId(t));
        else {
            var e = d._$getItemById(this.__getItemId(t));
            if (e) return e._$getBody()
        }
    };
    p._$isLoaded = function () {
        return this.__cache._$isLoaded(this.__ropt.key)
    };
    p._$showMessage = function (t) {
        this.__doClearListBox();
        this.__doShowMessage(null, t)
    };
    if (!0) t.copy(t.P("nej.ut"), c);
    return c
}, 19, 31, 3, 5, 2, 95, 96, 32, 40, 37, 80);
I$(93, function (t, e, i, n, s, o, a, _, r, d, l) {
    var c;
    _._$$ListModuleWF = e._$klass();
    c = _._$$ListModuleWF._$extend(a._$$ListModule);
    c.__reset = function (t) {
        this.__doResetMoreBtn(t.more);
        this.__sbody = n._$get(t.sbody);
        this.__doInitDomEvent([[this.__sbody, "scroll", this.__onCheckScroll._$bind(this)]]);
        var e = t.delta;
        if (null == e) e = 30;
        this.__delta = Math.max(0, e);
        var i = parseInt(t.count) || 0;
        this.__count = Math.max(0, i);
        var s = parseInt(t.number) || 0;
        if (s > 1 && s <= i) this.__number = s;
        this.__super(t)
    };
    c.__destroy = function () {
        this.__super();
        delete this.__nmore;
        delete this.__sbody;
        delete this.__endskr;
        delete this.__nexting
    };
    c.__getPageInfo = function (t, e) {
        var i = this.__first + (this.__count - 1) * this.__limit,
            n = this.__count * this.__limit;
        return this.__super(i, t, n, e)
    };
    c.__doResetMoreBtn = function (t) {
        this.__nmore = n._$get(t);
        this.__doInitDomEvent([[this.__nmore, "click", this._$next._$bind(this)]])
    };
    c.__doCheckScroll = function (t) {
        if (!this.__endskr && t && this.__lbox.clientHeight) {
            if (!t.scrollHeight) t = n._$getPageBox();
            var e = n._$offset(this.__lbox, this.__sbody),
                i = e.y + this.__lbox.offsetHeight - t.scrollTop - t.clientHeight,
                s = t.scrollHeight <= t.clientHeight;
            if (i <= this.__delta || s && !this.__endskr) window.setTimeout(this._$next._$bind(this), 0)
        }
    };
    c.__onCheckScroll = function (t) {
        if (!this.__endskr) {
            var e = i._$getElement(t);
            if (!e) e = n._$getPageBox();
            this.__doCheckScroll(e)
        }
    };
    c.__doChangePage = function (t) {
        this.__super(t);
        if (!t.stopped) {
            this.__doClearListBox();
            var e = 0;
            if (t.index > 1) e = this.__first + ((t.index - 1) * this.__count - 1) * this.__limit;
            this.__offset = e;
            this._$next()
        }
    };
    c.__doGenRequestOpt = function (t) {
        if (this.__number) {
            var e = t.offset > 0 ? this.__limit : this.__first,
                i = e + this.__limit * (this.__number - 1);
            this.__offset = t.offset + i;
            t.data.limit = i;
            t.limit = i;
            delete this.__number
        }
        return t
    };
    c.__cbListLoad = function (t) {
        delete this.__nexting;
        if (!this.__super(t)) this._$resize()
    };
    c.__cbListChange = function (t) {
        if (t.key == this.__ropt.key) {
            switch (t.action) {
            case "refresh":
            case "append":
                delete this.__nexting
            }
            this.__super(t)
        }
    };
    c.__doBeforeListLoad = function () {
        this.__doShowMessage("onbeforelistload", "鍒楄〃鍔犺浇涓�...");
        n._$setStyle(this.__nmore, "display", "none")
    };
    c.__doBeforeListRender = function (t, e, i) {
        var s = t.length,
            o = t.loaded ? e + i >= s : e + i > s;
        this.__offset = Math.min(this.__offset, s);
        n._$setStyle(this.__nmore, "display", o ? "none" : "");
        if (o) this.__endskr = !0;
        if (this.__count > 0) {
            var a = this.__getPageInfo(e, t.length);
            if (this.__doSyncPager(a.index, a.total)) return !0;
            var _ = this.__first - this.__limit,
                r = this.__count * this.__limit;
            this.__endskr = (e + i - _) % r == 0 || o;
            n._$setStyle(this.__nmore, "display", this.__endskr ? "none" : "");
            this.__doSwitchPagerShow(this.__endskr && a.total > 1 ? "" : "none")
        }
    };
    c.__doShowEmpty = function () {
        this.__offset = 0;
        this.__endskr = !0;
        this.__doShowMessage("onemptylist", "娌℃湁鍒楄〃鏁版嵁锛�")
    };
    c.__doShowListByJST = function (t, e) {
        this.__lbox.insertAdjacentHTML(e || "beforeEnd", t)
    };
    c.__doShowListByItem = function (t) {
        this.__items = this.__items || [];
        if (s._$isArray(t)) l.push.apply(this.__items, t);
        else this.__items.push(t)
    };
    c.__cbItemAdd = function (t) {
        n._$removeByEC(this.__ntip);
        this.__doCheckResult(t, "onafteradd");
        var e = t.flag;
        if (!t.stopped && e) if (!(this.__count > 0)) {
                this.__offset += 1;
                e == -1 ? this._$unshift(t.data) : this._$append(t.data)
            } else this.__doRefreshByPager()
    };
    c.__cbItemDelete = function (t) {
        this.__doCheckResult(t, "onafterdelete");
        if (!t.stopped) if (!(this.__count > 0)) {
                var e = t.data[this.__iopt.pkey];
                if (this.__items) {
                    var i = o._$getItemById(this.__getItemId(e)),
                        a = s._$indexOf(this.__items, i);
                    if (a >= 0) {
                        this.__items.splice(a, 1);
                        this.__offset -= 1
                    }
                    if (i) i._$recycle()
                } else {
                    var _ = this._$getItemBody(e);
                    if (_) this.__offset -= 1;
                    n._$remove(_)
                } if (this.__offset <= 0) this._$next()
            } else this.__doRefreshByPager()
    };
    c.__cbAppendList = function (t, e) {
        if (t == this.__offset) if (this._$isLoaded()) {
                this.__endskr = !1;
                this._$resize()
            }
    };
    c.__cbUnshiftList = function (t, e) {
        if (0 == t) for (var i = this.__cache._$getListInCache(this.__ropt.key), n = e - 1; n >= 0; n--) this._$unshift(
                    i[n])
    };
    c._$resize = function () {
        var t = this.__sbody;
        if (t && !this.__endskr) this.__doCheckScroll(this.__sbody)
    };
    c._$refresh = function () {
        delete this.__endskr;
        this.__super()
    };
    c._$next = function () {
        if (!this.__nexting) {
            this.__nexting = !0;
            var t = this.__offset;
            this.__offset += 0 == t ? this.__first : this.__limit;
            this.__doChangeOffset(t)
        }
    };
    if (!0) t.copy(t.P("nej.ut"), _);
    return _
}, 19, 31, 5, 2, 3, 37, 94);
I$(89, function (t, e, i, n) {
    n._$$ListModuleWF = t._$klass();
    var s = n._$$ListModuleWF._$extend(e._$$ListModuleWF);
    s.__reset = function (t) {
        this.__super(t);
        if (i._$IS.android && /ucbrowser/i.test(navigator.userAgent)) this.__delta += 40
    }
}, 31, 93, 6);
I$(143,
    ' <div class="content">     <div class="plain-text">鍐呭瓨涓嶅鐢紵鎶婃垜閽夊埌妗岄潰鍏嶄笅杞斤紒</div>     <div class="">鎴�<i class="icon sprite-browser-${icon}"></i>娣诲姞鍒颁富灞忓箷</div>     <div class="close-2 js-flag close-button">×鍏抽棴</div>     <div class="icon arrow-icon sprite-browser-${arrow}"></div> </div>');
I$(137, function (t, e, i, n, s, o, a, _, r, d) {
    var l = i._$add(_);
    r._$$Module = t._$klass();
    d = r._$$Module._$extend(s._$$Abstract);
    d.__initXGui = function () {
        var t = e._$addNodeTemplate('<div class="addToDesktop"></div>');
        this.__seed_html = t
    };
    d.__reset = function (t) {
        var e = this._$detect() || "";
        if ("qq" == e || "uc" == e) e = "third";
        t.clazz = "addToDesktop--" + ("third" == e ? "safari" : e);
        this.__super(t);
        var n = "chrome" == e ? "settings-2" : "settings";
        if ("safari" == e) n = "share";
        this.__body.innerHTML = i._$get(l, {
            arrow: "chrome" == e ? "arrow-2" : "arrow-down",
            icon: n
        });
        this.__doInitDomEvent([[o._$getByClassName(this.__body, "js-flag")[0], "click", this._$hide._$bind(this)]])
    };
    d._$detect = function () {
        var t = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
        if (t) return "safari";
        if (!a._$IS.android) return "";
        var e = !! window.chrome;
        if (e) return "chrome";
        if (/mqqbrowser/i.test(navigator.userAgent) && !n.isWeixin()) return "qq";
        if (/ucbrowser/i.test(navigator.userAgent)) return "uc";
        else return ""
    }
}, 31, 37, 40, 12, 36, 2, 6, 143);
I$(138,
    '{list beg..end as y} {var recommendComics = xlist[y]} {list recommendComics as recommendComic}     {if recommendComics.length == 1}         <a data-log="home,recommend_book_click,${recommendComic.bookId}" href="/reader/${recommendComic.bookId}" data-id="${recommendComic.bookId}" class="comic-item row-item recommends-item recommends-item--block">             <div class="cover">                 <div class="img-placeholder js-lazyLoad" data-src="${recommendComic.targetCover|default:\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXy8vJkA4prAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==\'}" data-ratio="0.42857142857142855" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXy8vJkA4prAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==" style="padding-top:${0.42857142857142855*100}%;height:0"></div>             </div>             <div class="title f-toe">${recommendComic.title|escape}</div>             <div class="recommends-item--footer">                 <div class="text f-toe">{if recommendComic.targetBrief !== undefined}${recommendComic.targetBrief|escape}{else}${recommendComic.brief|escape}{/if}</div>                 <div class="actions">                     <span class="action-item">                         <i class="sprite-app-fire icon"></i>${customFormatNumber(recommendComic.clickCount)}</span><span class="action-item">                         <i class="sprite-app-comment icon"></i>${customFormatNumber(recommendComic.commentCount)}                     </span>                 </div>             </div>             {if recommendComic.category}<div class="badge-1"><div class="plain-text" style="background-color:${recommendComic.categoryColor}">${recommendComic.category}</div><div class="corner" style="background-color:${recommendComic.categoryColor}"></div></div>{/if}         </a>     {else}         <a data-log="home,recommend_book_click,${recommendComic.bookId}" href="/reader/${recommendComic.bookId}" data-id="${recommendComic.bookId}" class="comic-item row-item recommends-item" style="padding-{if recommendComic_index == 0}right{else}left{/if}:5px;">             <div class="cover">                 <div class="img-placeholder js-lazyLoad" data-src="${recommendComic.targetCover|default:\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXy8vJkA4prAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==\'}" data-ratio="0.5645645645645646" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEXy8vJkA4prAAAACklEQVQI12NgAAAAAgAB4iG8MwAAAABJRU5ErkJggg==" style="padding-top:${0.5625*100}%;height:0"></div>             </div>             <div class="title f-toe">${recommendComic.title|escape}</div>             <div class="meta-item f-toe">{if recommendComic.targetBrief !== undefined}${recommendComic.targetBrief|escape}{else}${recommendComic.brief|escape}{/if}</div>             {if recommendComic.category}<div class="badge-1" {if recommendComic_index == 1}style="left:5px;"{/if}>                 <div class="plain-text" style="background-color:${recommendComic.categoryColor}">${recommendComic.category}</div>                 <div class="corner" style="background-color:${recommendComic.categoryColor}"></div>                 </div>             {/if}         </a>     {/if} {/list} {/list} ');
I$(139, function (t, e, i, n) {
    n._$$CacheListRecommendComics = t._$klass();
    var s = n._$$CacheListRecommendComics._$extend(i._$$CacheListAbstract);
    s.__reset = function (t) {
        this.__super(t);
        this.__page = 1
    };
    s.__doLoadList = function (t) {
        var i = t.key,
            n = t.data,
            s = (t.offset, t.limit, t.rkey, t.onload);
        e._$request("/author/book/" + n.userId + ".json", {
            type: "json",
            method: "GET",
            data: {
                pageSize: n.limit,
                page: this.__page
            },
            onload: function (t) {
                if ("" === t.next) this._$setLoaded(i);
                else this.__page = t.page + 1;
                s(t.books || [])
            }._$bind(this),
            onerror: function (t) {}
        })
    }
}, 31, 43, 79);
I$(140, function (t, e, i, n, s, o) {
    o._$$CacheListBookProgress = t._$klass();
    var a = o._$$CacheListBookProgress._$extend(n._$$CacheAbstract);
    a.__reset = function (t) {
        this.__super(t)
    };
    a._$getData = function (t) {
        var i = t.lid,
            n = this.__getDataInCache(i);
        if (!n) {
            var o = i + "_getData",
                a = this._$dispatchEvent._$bind(this, "ondataload", {
                    type: "getData",
                    key: i
                });
            if (!this.__doQueueRequest(o, a)) e._$request("/bookProgress/getList.json", {
                    type: "json",
                    method: "POST",
                    data: {
                        bookIds: s.stringify(t.bookIds)
                    },
                    onload: function (t) {
                        this.__setDataInCache(i, t.bookProgressMap);
                        this.__doCallbackRequest(o)
                    }._$bind(this),
                    onerror: function (t) {
                        this.__doClearReqQueue(o)
                    }._$bind(this)
                })
        } else this._$dispatchEvent("ondataload", {
                key: i,
                type: "getData"
            })
    }
}, 31, 14, 3, 81, 55);
I$(146, function (t, e, i, n, s, o, a, _) {
    var r;
    s._$$Animation = e._$klass();
    r = s._$$Animation._$extend(i._$$EventTarget);
    r.__reset = function (t) {
        this.__super(t);
        this.__end = t.to || o;
        this.__begin = t.from || {};
        this.__delay = Math.max(0, parseInt(t.delay) || 0)
    };
    r.__destroy = function () {
        this.__super();
        this._$stop();
        if (this.__dtime) {
            window.clearTimeout(this.__dtime);
            delete this.__dtime
        }
        delete this.__end;
        delete this.__begin
    };
    r.__onAnimationFrame = function (t) {
        if (this.__begin) {
            if (("" + t).indexOf(".") >= 0) t = +new Date;
            if (!this.__doAnimationFrame(t)) this.__timer = n.requestAnimationFrame(this.__onAnimationFrame._$bind(this));
            else this._$stop()
        }
    };
    r.__doAnimationFrame = a;
    r._$play = function () {
        var t = function () {
            this.__dtime = window.clearTimeout(this.__dtime);
            this.__begin.time = +new Date;
            this.__timer = n.requestAnimationFrame(this.__onAnimationFrame._$bind(this))
        };
        return function () {
            this.__dtime = window.setTimeout(t._$bind(this), this.__delay)
        }
    }();
    r._$stop = function () {
        this.__timer = n.cancelAnimationFrame(this.__timer);
        this._$dispatchEvent("onstop")
    };
    if (!0) t.copy(t.P("nej.ut"), s);
    return s
}, 19, 31, 32, 64);
I$(145, function (t, e, i, n, s, o, a, _) {
    var r;
    s._$$AnimBezier = e._$klass();
    r = s._$$AnimBezier._$extend(n._$$Animation);
    r.__reset = function (t) {
        this.__super(t);
        this.__duration = t.duration || 200;
        this.__epsilon = 1 / (200 * this.__duration);
        this.__doParseTiming(t.timing);
        this.__doCalPolynomialCoefficients()
    };
    r.__destroy = function () {
        this.__super();
        delete this.__pointer;
        delete this.__coefficient
    };
    r.__doParseTiming = function () {
        var t = /^cubic\-bezier\((.*?)\)$/i,
            e = /\s*,\s*/i,
            n = {
                linear: [0, 0, 1, 1],
                ease: [.25, .1, .25, 1],
                easein: [.42, 0, 1, 1],
                easeout: [0, 0, .58, 1],
                easeinout: [0, 0, .58, 1]
            }, s = function (t, e, i) {
                i[e] = parseFloat(t)
            };
        return function (o) {
            o = (o || "").toLowerCase();
            this.__pointer = n[o];
            if (t.test(o)) {
                this.__pointer = RegExp.$1.split(e);
                i._$forEach(this.__pointer, s)
            }
            if (!this.__pointer) this.__pointer = n.ease
        }
    }();
    r.__doCalPolynomialCoefficients = function () {
        var t = this.__pointer,
            e = 3 * t[0],
            i = 3 * (t[2] - t[0]) - e,
            n = 1 - e - i,
            s = 3 * t[1],
            o = 3 * (t[3] - t[1]) - s,
            a = 1 - s - o;
        this.__coefficient = {
            ax: n,
            ay: a,
            bx: i,
            by: o,
            cx: e,
            cy: s
        }
    };
    r.__doCalCubicBezierAtTime = function () {
        var t = function (t, e) {
            return ((e.ax * t + e.bx) * t + e.cx) * t
        }, e = function (t, e) {
                return ((e.ay * t + e.by) * t + e.cy) * t
            }, i = function (t, e) {
                return (3 * e.ax * t + 2 * e.bx) * t + e.cx
            }, n = function (e, n, s) {
                var o, a, _, r, d, l;
                for (_ = e, l = 0; l < 8; l++) {
                    r = t(_, s) - e;
                    if (Math.abs(r) < n) return _;
                    d = i(_, s);
                    if (Math.abs(d) < 1e-6) break;
                    _ -= r / d
                }
                o = 0;
                a = 1;
                _ = e;
                if (_ < o) return o;
                if (_ > a) return a;
                for (; o < a;) {
                    r = t(_, s);
                    if (Math.abs(r - e) < n) return _;
                    if (e > r) o = _;
                    else a = _;
                    _ = .5 * (a - o) + o
                }
                return _
            };
        return function (t) {
            return e(n(t / this.__duration, this.__epsilon, this.__coefficient), this.__coefficient)
        }
    }();
    r.__doAnimationFrame = function (t) {
        var e = t - this.__begin.time,
            n = this.__doCalCubicBezierAtTime(e),
            s = i._$fixed(this.__begin.offset * (1 - n) + this.__end.offset * n, 2),
            o = !1;
        if (e >= this.__duration) {
            s = this.__end.offset;
            o = !0
        }
        this._$dispatchEvent("onupdate", {
            offset: 1 * s
        });
        return o
    };
    r._$stop = function () {
        this._$dispatchEvent("onupdate", {
            offset: this.__end.offset
        });
        this.__super()
    };
    if (!0) t.copy(t.P("nej.ut"), s);
    return s
}, 19, 31, 3, 146);
I$(144, function (t, e, i, n, s, o, a, _) {
    var r;
    s._$$AnimEaseOut = e._$klass();
    r = s._$$AnimEaseOut._$extend(n._$$AnimBezier);
    r.__reset = function (t) {
        t = i._$merge({}, t);
        t.timing = "easeout";
        this.__super(t)
    };
    if (!0) t.copy(t.P("nej.ut"), s);
    return s
}, 19, 31, 3, 145);
I$(141, function (t, e, i, n, s, o) {
    s._$$Module = t._$klass();
    o = s._$$Module._$extend(e._$$EventTarget);
    o.__reset = function (t) {
        this.__super(t)
    };
    o._$play = function () {
        var t = i._$getPageBox(),
            e = n._$$AnimEaseOut._$allocate({
                from: {
                    offset: t.scrollTop
                },
                to: {
                    offset: 0
                },
                duration: 1e3,
                onupdate: function (t) {
                    document.body.scrollTop = t.offset
                },
                onstop: function () {
                    this._$recycle()
                }
            });
        e._$play()
    }
}, 31, 32, 2, 144);
I$(142, function (t, e, i, n, s, o, a, _, r, d, l, c, h, u, f, p, g, $, m) {
    function v() {
      
    }
    function y() {
        for (var e, i, n = document.getElementById("recommends"), s = t._$getChildren(n), o = 0;;) {
            e = s[o];
            i = $.getOffsetOfParent(e, document, "offsetTop");
            if (b.scrollTop + b.clientHeight > i) {
                x[t._$dataset(e, "id")] = 1;
                w++;
                o++
            } else break
        }
    }! function () {
        var t = navigator.userAgent.match(/(sogousearch|baidubrowser|baiduboxapp|newsapp)/i);
        if (!t && !r.isComicApp()) if (sessionStorage) {
                if (!sessionStorage.getItem("interlayer")) {
                    sessionStorage.setItem("interlayer", "1");
                    setTimeout(function () {}, 1e3)
                }
            } else setTimeout(function () {
                    location.href = "/interlayer"
                }, 1e3)
    }();
    v();
    var b = t._$getPageBox(),
        x = {}, w = 1;
    if (b.scrollTop < 100 && window.LazyImageInst) {
        y();
        window.LazyImageInst._$setEvent("onappendcomplete", function (e) {
            if (0 !== w) {
                var i = e.node;
                if (i.parentNode && t._$dataset(i.parentNode, "log") && 0 === t._$dataset(i.parentNode, "log").indexOf(
                    "home,banner_1")) w--;
                else if (i.parentNode && i.parentNode.parentNode && t._$hasClassName(i.parentNode.parentNode,
                    "recommends-item")) if (x[t._$dataset(i.parentNode.parentNode, "id")]) w--;
                if (0 === w && "function" == typeof NRUM.measure) NRUM.measure("on_first_screen_paint")
            }
        })
    }
    var k = c._$$Module._$getInstance({}),
        I = k._$detect();
    if ("" !== I) {
        t._$delClassName(document.getElementById("addToDesktopTip"), "is-invisible");
        document.getElementById("addToDesktopTip").onclick = function (t) {
            t.preventDefault();
            if ("BUTTON" !== t.target.tagName && "I" !== t.target.tagName) {
                p._$capture("home,pin," + I);
                k._$appendTo(document.body)
            }
        }
    }

    var C = {};
    if ("undefined" != typeof window.USER) {
        var E = [];
        s._$forEach(window.PG_CONFIG.recommendComicsList, function (t) {
            s._$forEach(t, function (t) {
                E.push(t.bookId)
            })
        });
        var S = f._$$CacheListBookProgress._$allocate({
            ondataload: function (t) {
                C = this.__getDataInCache(t.key) || {}
            }
        });
        S._$getData({
            lid: "indexBookProgress",
            bookIds: E
        })
    }
    p._$filter(function (e, i, s) {
        if (0 === i.indexOf("home,recommend_book_click")) {
            var o = t._$dataset(e, "id");
            if (n._$getElement(s, "c:cover")) {
                if ("undefined" == typeof C[o]) return;
                var a = C[o],
                    _ = e.href;
                return _ + "/" + a.sectionId + "?page=" + a.page
            } else return "/source/" + o
        }
    });
    var T = d._$add(h),
        L = e._$klass(),
        N = L._$extend(l._$$ListModuleWF);
    N._$refresh = function () {
        this.__offset = this.__limit
    };
    this.__list = L._$allocate({
        limit: window.PG_CONFIG.perRecommendItemCount,
        parent: "recommends",
        item: {
            klass: T,
            customFormatNumber: $.customFormatNumber
        },
        sbody: document,
        cache: {
            lkey: "list-CacheListRecommendComics",
            key: "bookId",
            data: {},
            klass: u._$$CacheListRecommendComics,
            list: window.PG_CONFIG.recommendComicsList
        },
        onafterdelete: function (t) {}._$bind(this),
        onbeforelistload: function (t) {
            var e = "loading";
            if (this.__ropt.offset > 0) e += " loading--mini";
            t.value = '<div class="' + e + '"><img src="/images/reader/loading.gif"></div>'
        },
        onafterlistrender: function (t) {
            if (this.__endskr) this.__doRenderMessage(
                    '<div class="recommends-row--bottom"><div class="icon sprite-face-er"></div><span class="plain-text">鑹剧帥锝炵珶鐒惰浣犲埛鍏夊厜浜�>.<</span></div>')
        },
        onemptylist: function (t) {
            t.value = '<div class="nodata"><img width="264" src="/images/application/favorite-nodata@2x.png"/></div>'
        }._$bind(this)
    });
    m._$$PageIndex = e._$klass();
    var N = m._$$PageIndex._$extend(i._$$EventTarget);
    N.__reset = function (t) {
        this.__super(t);
        this.__cachedTop = 0;
        this.__cachedBottom = 0;
        if ("complete" === document.readyState) this.__DOMContentLoaded();
        else this.__doInitDomEvent([[window, "load", this.__DOMContentLoaded._$bind(this)]])
    };
    N.__DOMContentLoaded = function () {
        this.__doInitDomEvent([[document, "scroll", this.__scroll._$bind(this)], [document, "touchstart", this.__touchStart
                    ._$bind(this)]]);
        this.__topbarHeight = 51;
    };
    N.__scroll = function () {
        clearTimeout(this.__timer);
        this.__timer = setTimeout(function () {
            this.__touchEnd()
        }._$bind(this), 200);
        this.__touchMove(document.body.scrollTop)
    };
    N.__touchStart = function (t) {
        this.__currentY = document.body.scrollTop;
        this.__primaryY = document.body.scrollTop
    };
    N.__touchMove = function (e) {
        if (!(e < 0 || "undefined" == typeof this.__currentY)) {
            var i = t._$getPageBox();
            if (!(e > i.scrollHeight - i.clientHeight)) {
                var n = this.__currentY - e;
                this.__currentY = e;
                var s = this.__cachedBottom,
                    o = Math.max(Math.min(s + n, 0), -62);
                this.__cachedBottom = o;
                var a = n > 0 ? "bottom" : "top";
                this.__direction = a
            }
        }
    };
    N.__touchEnd = function (t) {
        if (null != this.__direction) if ("top" == this.__direction) {
                this.__cachedTop = -this.__topbarHeight;
                this.__cachedBottom = -62
            } else {
                this.__cachedTop = 0;
                this.__cachedBottom = 0;
                var e = document.body.scrollTop,
                    i = .56 * document.body.clientWidth;
                if (this.__primaryY >= i && e < i) _gaq.push(["_trackEvent", "exposure", "home", "banner"])
            }
    };
    m._$$PageIndex._$allocate()
}, 2, 31, 32, 5, 3, 37, 87, 114, 12, 40, 89, 137, 138, 139, 140, 1, 141, 13);