import {
  require_jquery
} from "./chunk-WCWRWR5H.js";
import "./chunk-ZS7NZCD4.js";

// node_modules/turn.js/index.js
var $ = require_jquery();
var has3d;
var hasRot;
var vendor = "";
var version = "4.1.0";
var PI = Math.PI;
var A90 = PI / 2;
var isTouch = "ontouchstart" in window;
var mouseEvents = isTouch ? {
  down: "touchstart",
  move: "touchmove",
  up: "touchend",
  over: "touchstart",
  out: "touchend"
} : {
  down: "mousedown",
  move: "mousemove",
  up: "mouseup",
  over: "mouseover",
  out: "mouseout"
};
var corners = {
  backward: ["bl", "tl"],
  forward: ["br", "tr"],
  all: ["tl", "bl", "tr", "br", "l", "r"]
};
var displays = ["single", "double"];
var directions = ["ltr", "rtl"];
var turnOptions = {
  // Enables hardware acceleration
  acceleration: true,
  // Display
  display: "double",
  // Duration of transition in milliseconds
  duration: 600,
  // First page
  page: 1,
  // Enables gradients
  gradients: true,
  // Corners used when turning the page
  turnCorners: "bl,br",
  // Events
  when: null
};
var flipOptions = {
  // Size of the active zone of each corner
  cornerSize: 100
};
var pagesInDOM = 6;
var turnMethods = {
  // Singleton constructor
  // $('#selector').turn([options]);
  init: function(options) {
    has3d = "WebKitCSSMatrix" in window || "MozPerspective" in document.body.style;
    hasRot = rotationAvailable();
    vendor = getPrefix();
    var i, that = this, pageNum = 0, data = this.data(), ch = this.children();
    options = $.extend({
      width: this.width(),
      height: this.height(),
      direction: this.attr("dir") || this.css("direction") || "ltr"
    }, turnOptions, options);
    data.opts = options;
    data.pageObjs = {};
    data.pages = {};
    data.pageWrap = {};
    data.pageZoom = {};
    data.pagePlace = {};
    data.pageMv = [];
    data.zoom = 1;
    data.totalPages = options.pages || 0;
    data.eventHandlers = {
      touchStart: $.proxy(turnMethods._touchStart, this),
      touchMove: $.proxy(turnMethods._touchMove, this),
      touchEnd: $.proxy(turnMethods._touchEnd, this),
      start: $.proxy(turnMethods._eventStart, this)
    };
    if (options.when) {
      for (i in options.when)
        if (has(i, options.when))
          this.bind(i, options.when[i]);
    }
    this.css({ position: "relative", width: options.width, height: options.height });
    this.turn("display", options.display);
    if (options.direction !== "")
      this.turn("direction", options.direction);
    if (has3d && !isTouch && options.acceleration)
      this.transform(translate(0, 0, true));
    for (i = 0; i < ch.length; i++) {
      if ($(ch[i]).attr("ignore") != "1") {
        this.turn("addPage", ch[i], ++pageNum);
      }
    }
    $(this).bind(mouseEvents.down, data.eventHandlers.touchStart).bind("end", turnMethods._eventEnd).bind("pressed", turnMethods._eventPressed).bind("released", turnMethods._eventReleased).bind("flip", turnMethods._flip);
    $(this).parent().bind("start", data.eventHandlers.start);
    $(document).bind(mouseEvents.move, data.eventHandlers.touchMove).bind(mouseEvents.up, data.eventHandlers.touchEnd);
    this.turn("page", options.page);
    data.done = true;
    return this;
  },
  // Adds a page from external data
  addPage: function(element, page) {
    var currentPage, className, incPages = false, data = this.data(), lastPage = data.totalPages + 1;
    if (data.destroying)
      return false;
    if (currentPage = /\bp([0-9]+)\b/.exec($(element).attr("class")))
      page = parseInt(currentPage[1], 10);
    if (page) {
      if (page == lastPage)
        incPages = true;
      else if (page > lastPage)
        throw turnError('Page "' + page + '" cannot be inserted');
    } else {
      page = lastPage;
      incPages = true;
    }
    if (page >= 1 && page <= lastPage) {
      if (data.display == "double")
        className = page % 2 ? " odd" : " even";
      else
        className = "";
      if (data.done)
        this.turn("stop");
      if (page in data.pageObjs)
        turnMethods._movePages.call(this, page, 1);
      if (incPages)
        data.totalPages = lastPage;
      data.pageObjs[page] = $(element).css({ "float": "left" }).addClass("page p" + page + className);
      if (!hasHardPage() && data.pageObjs[page].hasClass("hard")) {
        data.pageObjs[page].removeClass("hard");
      }
      turnMethods._addPage.call(this, page);
      turnMethods._removeFromDOM.call(this);
    }
    return this;
  },
  // Adds a page
  _addPage: function(page) {
    var data = this.data(), element = data.pageObjs[page];
    if (element)
      if (turnMethods._necessPage.call(this, page)) {
        if (!data.pageWrap[page]) {
          data.pageWrap[page] = $(
            "<div/>",
            {
              "class": "page-wrapper",
              page,
              css: {
                position: "absolute",
                overflow: "hidden"
              }
            }
          );
          this.append(data.pageWrap[page]);
          if (!data.pagePlace[page]) {
            data.pagePlace[page] = page;
            data.pageObjs[page].appendTo(data.pageWrap[page]);
          }
          var prop = turnMethods._pageSize.call(this, page, true);
          element.css({ width: prop.width, height: prop.height });
          data.pageWrap[page].css(prop);
        }
        if (data.pagePlace[page] == page) {
          turnMethods._makeFlip.call(this, page);
        }
      } else {
        data.pagePlace[page] = 0;
        if (data.pageObjs[page])
          data.pageObjs[page].remove();
      }
  },
  // Checks if a page is in memory
  hasPage: function(page) {
    return has(page, this.data().pageObjs);
  },
  // Centers the flipbook
  center: function(page) {
    var data = this.data(), size = $(this).turn("size"), left = 0;
    if (!data.noCenter) {
      if (data.display == "double") {
        var view = this.turn("view", page || data.tpage || data.page);
        if (data.direction == "ltr") {
          if (!view[0])
            left -= size.width / 4;
          else if (!view[1])
            left += size.width / 4;
        } else {
          if (!view[0])
            left += size.width / 4;
          else if (!view[1])
            left -= size.width / 4;
        }
      }
      $(this).css({ marginLeft: left });
    }
    return this;
  },
  // Destroys the flipbook
  destroy: function() {
    var page, flipbook = this, data = this.data(), events = [
      "end",
      "first",
      "flip",
      "last",
      "pressed",
      "released",
      "start",
      "turning",
      "turned",
      "zooming",
      "missing"
    ];
    if (trigger("destroying", this) == "prevented")
      return;
    data.destroying = true;
    $.each(events, function(index, eventName) {
      flipbook.unbind(eventName);
    });
    this.parent().unbind("start", data.eventHandlers.start);
    $(document).unbind(mouseEvents.move, data.eventHandlers.touchMove).unbind(mouseEvents.up, data.eventHandlers.touchEnd);
    while (data.totalPages !== 0) {
      this.turn("removePage", data.totalPages);
    }
    if (data.fparent)
      data.fparent.remove();
    if (data.shadow)
      data.shadow.remove();
    this.removeData();
    data = null;
    return this;
  },
  // Checks if this element is a flipbook
  is: function() {
    return typeof this.data().pages == "object";
  },
  // Sets and gets the zoom value
  zoom: function(newZoom) {
    var data = this.data();
    if (typeof newZoom == "number") {
      if (newZoom < 1e-3 || newZoom > 100)
        throw turnError(newZoom + " is not a value for zoom");
      if (trigger("zooming", this, [newZoom, data.zoom]) == "prevented")
        return this;
      var size = this.turn("size"), currentView = this.turn("view"), iz = 1 / data.zoom, newWidth = Math.round(size.width * iz * newZoom), newHeight = Math.round(size.height * iz * newZoom);
      data.zoom = newZoom;
      $(this).turn("stop").turn("size", newWidth, newHeight);
      if (data.opts.autoCenter)
        this.turn("center");
      turnMethods._updateShadow.call(this);
      for (var i = 0; i < currentView.length; i++) {
        if (currentView[i] && data.pageZoom[currentView[i]] != data.zoom) {
          this.trigger("zoomed", [
            currentView[i],
            currentView,
            data.pageZoom[currentView[i]],
            data.zoom
          ]);
          data.pageZoom[currentView[i]] = data.zoom;
        }
      }
      return this;
    } else
      return data.zoom;
  },
  // Gets the size of a page
  _pageSize: function(page, position) {
    var data = this.data(), prop = {};
    if (data.display == "single") {
      prop.width = this.width();
      prop.height = this.height();
      if (position) {
        prop.top = 0;
        prop.left = 0;
        prop.right = "auto";
      }
    } else {
      var pageWidth = this.width() / 2, pageHeight = this.height();
      if (data.pageObjs[page].hasClass("own-size")) {
        prop.width = data.pageObjs[page].width();
        prop.height = data.pageObjs[page].height();
      } else {
        prop.width = pageWidth;
        prop.height = pageHeight;
      }
      if (position) {
        var odd = page % 2;
        prop.top = (pageHeight - prop.height) / 2;
        if (data.direction == "ltr") {
          prop[odd ? "right" : "left"] = pageWidth - prop.width;
          prop[odd ? "left" : "right"] = "auto";
        } else {
          prop[odd ? "left" : "right"] = pageWidth - prop.width;
          prop[odd ? "right" : "left"] = "auto";
        }
      }
    }
    return prop;
  },
  // Prepares the flip effect for a page
  _makeFlip: function(page) {
    var data = this.data();
    if (!data.pages[page] && data.pagePlace[page] == page) {
      var single = data.display == "single", odd = page % 2;
      data.pages[page] = data.pageObjs[page].css(turnMethods._pageSize.call(this, page)).flip({
        page,
        next: odd || single ? page + 1 : page - 1,
        turn: this
      }).flip("disable", data.disabled);
      turnMethods._setPageLoc.call(this, page);
      data.pageZoom[page] = data.zoom;
    }
    return data.pages[page];
  },
  // Makes pages within a range
  _makeRange: function() {
    var page, range, data = this.data();
    if (data.totalPages < 1)
      return;
    range = this.turn("range");
    for (page = range[0]; page <= range[1]; page++)
      turnMethods._addPage.call(this, page);
  },
  // Returns a range of pages that should be in the DOM
  // Example:
  // - page in the current view, return true
  // * page is in the range, return true
  // Otherwise, return false
  //
  // 1 2-3 4-5 6-7 8-9 10-11 12-13
  //   **  **  --   **  **
  range: function(page) {
    var remainingPages, left, right, view, data = this.data();
    page = page || data.tpage || data.page || 1;
    view = turnMethods._view.call(this, page);
    if (page < 1 || page > data.totalPages)
      throw turnError('"' + page + '" is not a valid page');
    view[1] = view[1] || view[0];
    if (view[0] >= 1 && view[1] <= data.totalPages) {
      remainingPages = Math.floor((pagesInDOM - 2) / 2);
      if (data.totalPages - view[1] > view[0]) {
        left = Math.min(view[0] - 1, remainingPages);
        right = 2 * remainingPages - left;
      } else {
        right = Math.min(data.totalPages - view[1], remainingPages);
        left = 2 * remainingPages - right;
      }
    } else {
      left = pagesInDOM - 1;
      right = pagesInDOM - 1;
    }
    return [
      Math.max(1, view[0] - left),
      Math.min(data.totalPages, view[1] + right)
    ];
  },
  // Detects if a page is within the range of `pagesInDOM` from the current view
  _necessPage: function(page) {
    if (page === 0)
      return true;
    var range = this.turn("range");
    return this.data().pageObjs[page].hasClass("fixed") || page >= range[0] && page <= range[1];
  },
  // Releases memory by removing pages from the DOM
  _removeFromDOM: function() {
    var page, data = this.data();
    for (page in data.pageWrap)
      if (has(page, data.pageWrap) && !turnMethods._necessPage.call(this, page))
        turnMethods._removePageFromDOM.call(this, page);
  },
  // Removes a page from DOM and its internal references
  _removePageFromDOM: function(page) {
    var data = this.data();
    if (data.pages[page]) {
      var dd = data.pages[page].data();
      flipMethods._moveFoldingPage.call(data.pages[page], false);
      if (dd.f && dd.f.fwrapper)
        dd.f.fwrapper.remove();
      data.pages[page].removeData();
      data.pages[page].remove();
      delete data.pages[page];
    }
    if (data.pageObjs[page])
      data.pageObjs[page].remove();
    if (data.pageWrap[page]) {
      data.pageWrap[page].remove();
      delete data.pageWrap[page];
    }
    turnMethods._removeMv.call(this, page);
    delete data.pagePlace[page];
    delete data.pageZoom[page];
  },
  // Removes a page
  removePage: function(page) {
    var data = this.data();
    if (page == "*") {
      while (data.totalPages !== 0) {
        this.turn("removePage", data.totalPages);
      }
    } else {
      if (page < 1 || page > data.totalPages)
        throw turnError("The page " + page + " doesn't exist");
      if (data.pageObjs[page]) {
        this.turn("stop");
        turnMethods._removePageFromDOM.call(this, page);
        delete data.pageObjs[page];
      }
      turnMethods._movePages.call(this, page, -1);
      data.totalPages = data.totalPages - 1;
      if (data.page > data.totalPages) {
        data.page = null;
        turnMethods._fitPage.call(this, data.totalPages);
      } else {
        turnMethods._makeRange.call(this);
        this.turn("update");
      }
    }
    return this;
  },
  // Moves pages
  _movePages: function(from, change) {
    var page, that = this, data = this.data(), single = data.display == "single", move = function(page2) {
      var next = page2 + change, odd = next % 2, className = odd ? " odd " : " even ";
      if (data.pageObjs[page2])
        data.pageObjs[next] = data.pageObjs[page2].removeClass("p" + page2 + " odd even").addClass("p" + next + className);
      if (data.pagePlace[page2] && data.pageWrap[page2]) {
        data.pagePlace[next] = next;
        if (data.pageObjs[next].hasClass("fixed"))
          data.pageWrap[next] = data.pageWrap[page2].attr("page", next);
        else
          data.pageWrap[next] = data.pageWrap[page2].css(turnMethods._pageSize.call(that, next, true)).attr("page", next);
        if (data.pages[page2])
          data.pages[next] = data.pages[page2].flip("options", {
            page: next,
            next: single || odd ? next + 1 : next - 1
          });
        if (change) {
          delete data.pages[page2];
          delete data.pagePlace[page2];
          delete data.pageZoom[page2];
          delete data.pageObjs[page2];
          delete data.pageWrap[page2];
        }
      }
    };
    if (change > 0)
      for (page = data.totalPages; page >= from; page--)
        move(page);
    else
      for (page = from; page <= data.totalPages; page++)
        move(page);
  },
  // Sets or Gets the display mode
  display: function(display) {
    var data = this.data(), currentDisplay = data.display;
    if (display === void 0) {
      return currentDisplay;
    } else {
      if ($.inArray(display, displays) == -1)
        throw turnError('"' + display + '" is not a value for display');
      switch (display) {
        case "single":
          if (!data.pageObjs[0]) {
            this.turn("stop").css({ "overflow": "hidden" });
            data.pageObjs[0] = $(
              "<div />",
              { "class": "page p-temporal" }
            ).css({ width: this.width(), height: this.height() }).appendTo(this);
          }
          this.addClass("shadow");
          break;
        case "double":
          if (data.pageObjs[0]) {
            this.turn("stop").css({ "overflow": "" });
            data.pageObjs[0].remove();
            delete data.pageObjs[0];
          }
          this.removeClass("shadow");
          break;
      }
      data.display = display;
      if (currentDisplay) {
        var size = this.turn("size");
        turnMethods._movePages.call(this, 1, 0);
        this.turn("size", size.width, size.height).turn("update");
      }
      return this;
    }
  },
  // Gets and sets the direction of the flipbook
  direction: function(dir) {
    var data = this.data();
    if (dir === void 0) {
      return data.direction;
    } else {
      dir = dir.toLowerCase();
      if ($.inArray(dir, directions) == -1)
        throw turnError('"' + dir + '" is not a value for direction');
      if (dir == "rtl") {
        $(this).attr("dir", "ltr").css({ direction: "ltr" });
      }
      data.direction = dir;
      if (data.done)
        this.turn("size", $(this).width(), $(this).height());
      return this;
    }
  },
  // Detects animation
  animating: function() {
    return this.data().pageMv.length > 0;
  },
  // Gets the current activated corner
  corner: function() {
    var corner, page, data = this.data();
    for (page in data.pages) {
      if (has(page, data.pages)) {
        if (corner = data.pages[page].flip("corner")) {
          return corner;
        }
      }
    }
    return false;
  },
  // Gets the data stored in the flipbook
  data: function() {
    return this.data();
  },
  // Disables and enables the effect
  disable: function(disable) {
    var page, data = this.data(), view = this.turn("view");
    data.disabled = disable === void 0 || disable === true;
    for (page in data.pages) {
      if (has(page, data.pages))
        data.pages[page].flip(
          "disable",
          data.disabled ? true : $.inArray(parseInt(page, 10), view) == -1
        );
    }
    return this;
  },
  // Disables and enables the effect
  disabled: function(disable) {
    if (disable === void 0) {
      return this.data().disabled === true;
    } else {
      return this.turn("disable", disable);
    }
  },
  // Gets and sets the size
  size: function(width, height) {
    if (width === void 0 || height === void 0) {
      return { width: this.width(), height: this.height() };
    } else {
      this.turn("stop");
      var page, prop, data = this.data(), pageWidth = data.display == "double" ? width / 2 : width;
      this.css({ width, height });
      if (data.pageObjs[0])
        data.pageObjs[0].css({ width: pageWidth, height });
      for (page in data.pageWrap) {
        if (!has(page, data.pageWrap))
          continue;
        prop = turnMethods._pageSize.call(this, page, true);
        data.pageObjs[page].css({ width: prop.width, height: prop.height });
        data.pageWrap[page].css(prop);
        if (data.pages[page])
          data.pages[page].css({ width: prop.width, height: prop.height });
      }
      this.turn("resize");
      return this;
    }
  },
  // Resizes each page
  resize: function() {
    var page, data = this.data();
    if (data.pages[0]) {
      data.pageWrap[0].css({ left: -this.width() });
      data.pages[0].flip("resize", true);
    }
    for (page = 1; page <= data.totalPages; page++)
      if (data.pages[page])
        data.pages[page].flip("resize", true);
    turnMethods._updateShadow.call(this);
    if (data.opts.autoCenter)
      this.turn("center");
  },
  // Removes an animation from the cache
  _removeMv: function(page) {
    var i, data = this.data();
    for (i = 0; i < data.pageMv.length; i++)
      if (data.pageMv[i] == page) {
        data.pageMv.splice(i, 1);
        return true;
      }
    return false;
  },
  // Adds an animation to the cache
  _addMv: function(page) {
    var data = this.data();
    turnMethods._removeMv.call(this, page);
    data.pageMv.push(page);
  },
  // Gets indexes for a view
  _view: function(page) {
    var data = this.data();
    page = page || data.page;
    if (data.display == "double")
      return page % 2 ? [page - 1, page] : [page, page + 1];
    else
      return [page];
  },
  // Gets a view
  view: function(page) {
    var data = this.data(), view = turnMethods._view.call(this, page);
    if (data.display == "double")
      return [
        view[0] > 0 ? view[0] : 0,
        view[1] <= data.totalPages ? view[1] : 0
      ];
    else
      return [view[0] > 0 && view[0] <= data.totalPages ? view[0] : 0];
  },
  // Stops animations
  stop: function(ignore, animate) {
    if (this.turn("animating")) {
      var i, opts, page, data = this.data();
      if (data.tpage) {
        data.page = data.tpage;
        delete data["tpage"];
      }
      for (i = 0; i < data.pageMv.length; i++) {
        if (!data.pageMv[i] || data.pageMv[i] === ignore)
          continue;
        page = data.pages[data.pageMv[i]];
        opts = page.data().f.opts;
        page.flip("hideFoldedPage", animate);
        if (!animate)
          flipMethods._moveFoldingPage.call(page, false);
        if (opts.force) {
          opts.next = opts.page % 2 === 0 ? opts.page - 1 : opts.page + 1;
          delete opts["force"];
        }
      }
    }
    this.turn("update");
    return this;
  },
  // Gets and sets the number of pages
  pages: function(pages) {
    var data = this.data();
    if (pages) {
      if (pages < data.totalPages) {
        for (var page = data.totalPages; page > pages; page--)
          this.turn("removePage", page);
      }
      data.totalPages = pages;
      turnMethods._fitPage.call(this, data.page);
      return this;
    } else
      return data.totalPages;
  },
  // Checks missing pages
  _missing: function(page) {
    var data = this.data();
    if (data.totalPages < 1)
      return;
    var p, range = this.turn("range", page), missing = [];
    for (p = range[0]; p <= range[1]; p++) {
      if (!data.pageObjs[p])
        missing.push(p);
    }
    if (missing.length > 0)
      this.trigger("missing", [missing]);
  },
  // Sets a page without effect
  _fitPage: function(page) {
    var data = this.data(), newView = this.turn("view", page);
    turnMethods._missing.call(this, page);
    if (!data.pageObjs[page])
      return;
    data.page = page;
    this.turn("stop");
    for (var i = 0; i < newView.length; i++) {
      if (newView[i] && data.pageZoom[newView[i]] != data.zoom) {
        this.trigger("zoomed", [
          newView[i],
          newView,
          data.pageZoom[newView[i]],
          data.zoom
        ]);
        data.pageZoom[newView[i]] = data.zoom;
      }
    }
    turnMethods._removeFromDOM.call(this);
    turnMethods._makeRange.call(this);
    turnMethods._updateShadow.call(this);
    this.trigger("turned", [page, newView]);
    this.turn("update");
    if (data.opts.autoCenter)
      this.turn("center");
  },
  // Turns the page
  _turnPage: function(page) {
    var current, next, data = this.data(), place = data.pagePlace[page], view = this.turn("view"), newView = this.turn("view", page);
    if (data.page != page) {
      var currentPage = data.page;
      if (trigger("turning", this, [page, newView]) == "prevented") {
        if (currentPage == data.page && $.inArray(place, data.pageMv) != -1)
          data.pages[place].flip("hideFoldedPage", true);
        return;
      }
      if ($.inArray(1, newView) != -1)
        this.trigger("first");
      if ($.inArray(data.totalPages, newView) != -1)
        this.trigger("last");
    }
    if (data.display == "single") {
      current = view[0];
      next = newView[0];
    } else if (view[1] && page > view[1]) {
      current = view[1];
      next = newView[0];
    } else if (view[0] && page < view[0]) {
      current = view[0];
      next = newView[1];
    }
    var optsCorners = data.opts.turnCorners.split(","), flipData = data.pages[current].data().f, opts = flipData.opts, actualPoint = flipData.point;
    turnMethods._missing.call(this, page);
    if (!data.pageObjs[page])
      return;
    this.turn("stop");
    data.page = page;
    turnMethods._makeRange.call(this);
    data.tpage = next;
    if (opts.next != next) {
      opts.next = next;
      opts.force = true;
    }
    this.turn("update");
    flipData.point = actualPoint;
    if (flipData.effect == "hard")
      if (data.direction == "ltr")
        data.pages[current].flip(
          "turnPage",
          page > current ? "r" : "l"
        );
      else
        data.pages[current].flip(
          "turnPage",
          page > current ? "l" : "r"
        );
    else {
      if (data.direction == "ltr")
        data.pages[current].flip(
          "turnPage",
          optsCorners[page > current ? 1 : 0]
        );
      else
        data.pages[current].flip(
          "turnPage",
          optsCorners[page > current ? 0 : 1]
        );
    }
  },
  // Gets and sets a page
  page: function(page) {
    var data = this.data();
    if (page === void 0) {
      return data.page;
    } else {
      if (!data.disabled && !data.destroying) {
        page = parseInt(page, 10);
        if (page > 0 && page <= data.totalPages) {
          if (page != data.page) {
            if (!data.done || $.inArray(page, this.turn("view")) != -1)
              turnMethods._fitPage.call(this, page);
            else
              turnMethods._turnPage.call(this, page);
          }
          return this;
        } else {
          throw turnError("The page " + page + " does not exist");
        }
      }
    }
  },
  // Turns to the next view
  next: function() {
    return this.turn("page", Math.min(
      this.data().totalPages,
      turnMethods._view.call(this, this.data().page).pop() + 1
    ));
  },
  // Turns to the previous view
  previous: function() {
    return this.turn("page", Math.max(
      1,
      turnMethods._view.call(this, this.data().page).shift() - 1
    ));
  },
  // Shows a peeling corner
  peel: function(corner, animate) {
    var data = this.data(), view = this.turn("view");
    animate = animate === void 0 ? true : animate === true;
    if (corner === false) {
      this.turn("stop", null, animate);
    } else {
      if (data.display == "single") {
        data.pages[data.page].flip("peel", corner, animate);
      } else {
        var page;
        if (data.direction == "ltr") {
          page = corner.indexOf("l") != -1 ? view[0] : view[1];
        } else {
          page = corner.indexOf("l") != -1 ? view[1] : view[0];
        }
        if (data.pages[page])
          data.pages[page].flip("peel", corner, animate);
      }
    }
    return this;
  },
  // Adds a motion to the internal list
  // This event is called in context of flip
  _addMotionPage: function() {
    var opts = $(this).data().f.opts, turn = opts.turn, dd = turn.data();
    turnMethods._addMv.call(turn, opts.page);
  },
  // This event is called in context of flip
  _eventStart: function(e, opts, corner) {
    var data = opts.turn.data(), actualZoom = data.pageZoom[opts.page];
    if (e.isDefaultPrevented()) {
      turnMethods._updateShadow.call(opts.turn);
      return;
    }
    if (actualZoom && actualZoom != data.zoom) {
      opts.turn.trigger("zoomed", [
        opts.page,
        opts.turn.turn("view", opts.page),
        actualZoom,
        data.zoom
      ]);
      data.pageZoom[opts.page] = data.zoom;
    }
    if (data.display == "single" && corner) {
      if (corner.charAt(1) == "l" && data.direction == "ltr" || corner.charAt(1) == "r" && data.direction == "rtl") {
        opts.next = opts.next < opts.page ? opts.next : opts.page - 1;
        opts.force = true;
      } else {
        opts.next = opts.next > opts.page ? opts.next : opts.page + 1;
      }
    }
    turnMethods._addMotionPage.call(e.target);
    turnMethods._updateShadow.call(opts.turn);
  },
  // This event is called in context of flip
  _eventEnd: function(e, opts, turned) {
    var that = $(e.target), data = that.data().f, turn = opts.turn, dd = turn.data();
    if (turned) {
      var tpage = dd.tpage || dd.page;
      if (tpage == opts.next || tpage == opts.page) {
        delete dd.tpage;
        turnMethods._fitPage.call(turn, tpage || opts.next, true);
      }
    } else {
      turnMethods._removeMv.call(turn, opts.page);
      turnMethods._updateShadow.call(turn);
      turn.turn("update");
    }
  },
  // This event is called in context of flip
  _eventPressed: function(e) {
    var page, data = $(e.target).data().f, turn = data.opts.turn, turnData = turn.data(), pages = turnData.pages;
    turnData.mouseAction = true;
    turn.turn("update");
    return data.time = (/* @__PURE__ */ new Date()).getTime();
  },
  // This event is called in context of flip
  _eventReleased: function(e, point) {
    var outArea, page = $(e.target), data = page.data().f, turn = data.opts.turn, turnData = turn.data();
    if (turnData.display == "single") {
      outArea = point.corner == "br" || point.corner == "tr" ? point.x < page.width() / 2 : point.x > page.width() / 2;
    } else {
      outArea = point.x < 0 || point.x > page.width();
    }
    if ((/* @__PURE__ */ new Date()).getTime() - data.time < 200 || outArea) {
      e.preventDefault();
      turnMethods._turnPage.call(turn, data.opts.next);
    }
    turnData.mouseAction = false;
  },
  // This event is called in context of flip
  _flip: function(e) {
    e.stopPropagation();
    var opts = $(e.target).data().f.opts;
    opts.turn.trigger("turn", [opts.next]);
    if (opts.turn.data().opts.autoCenter) {
      opts.turn.turn("center", opts.next);
    }
  },
  //
  _touchStart: function() {
    var data = this.data();
    for (var page in data.pages) {
      if (has(page, data.pages) && flipMethods._eventStart.apply(data.pages[page], arguments) === false) {
        return false;
      }
    }
  },
  //
  _touchMove: function() {
    var data = this.data();
    for (var page in data.pages) {
      if (has(page, data.pages)) {
        flipMethods._eventMove.apply(data.pages[page], arguments);
      }
    }
  },
  //
  _touchEnd: function() {
    var data = this.data();
    for (var page in data.pages) {
      if (has(page, data.pages)) {
        flipMethods._eventEnd.apply(data.pages[page], arguments);
      }
    }
  },
  // Calculate the z-index value for pages during the animation
  calculateZ: function(mv) {
    var i, page, nextPage, placePage, dpage, that = this, data = this.data(), view = this.turn("view"), currentPage = view[0] || view[1], total = mv.length - 1, r = { pageZ: {}, partZ: {}, pageV: {} }, addView = function(page2) {
      var view2 = that.turn("view", page2);
      if (view2[0])
        r.pageV[view2[0]] = true;
      if (view2[1])
        r.pageV[view2[1]] = true;
    };
    for (i = 0; i <= total; i++) {
      page = mv[i];
      nextPage = data.pages[page].data().f.opts.next;
      placePage = data.pagePlace[page];
      addView(page);
      addView(nextPage);
      dpage = data.pagePlace[nextPage] == nextPage ? nextPage : page;
      r.pageZ[dpage] = data.totalPages - Math.abs(currentPage - dpage);
      r.partZ[placePage] = data.totalPages * 2 - total + i;
    }
    return r;
  },
  // Updates the z-index and display property of every page
  update: function() {
    var page, data = this.data();
    if (this.turn("animating") && data.pageMv[0] !== 0) {
      var p, apage, fixed, pos = this.turn("calculateZ", data.pageMv), corner = this.turn("corner"), actualView = this.turn("view"), newView = this.turn("view", data.tpage);
      for (page in data.pageWrap) {
        if (!has(page, data.pageWrap))
          continue;
        fixed = data.pageObjs[page].hasClass("fixed");
        data.pageWrap[page].css({
          display: pos.pageV[page] || fixed ? "" : "none",
          zIndex: (data.pageObjs[page].hasClass("hard") ? pos.partZ[page] : pos.pageZ[page]) || (fixed ? -1 : 0)
        });
        if (p = data.pages[page]) {
          p.flip("z", pos.partZ[page] || null);
          if (pos.pageV[page])
            p.flip("resize");
          if (data.tpage) {
            p.flip("hover", false).flip(
              "disable",
              $.inArray(parseInt(page, 10), data.pageMv) == -1 && page != newView[0] && page != newView[1]
            );
          } else {
            p.flip("hover", corner === false).flip("disable", page != actualView[0] && page != actualView[1]);
          }
        }
      }
    } else {
      for (page in data.pageWrap) {
        if (!has(page, data.pageWrap))
          continue;
        var pageLocation = turnMethods._setPageLoc.call(this, page);
        if (data.pages[page]) {
          data.pages[page].flip("disable", data.disabled || pageLocation != 1).flip("hover", true).flip("z", null);
        }
      }
    }
    return this;
  },
  // Updates the position and size of the flipbook's shadow
  _updateShadow: function() {
    var view, view2, shadow, data = this.data(), width = this.width(), height = this.height(), pageWidth = data.display == "single" ? width : width / 2;
    view = this.turn("view");
    if (!data.shadow) {
      data.shadow = $("<div />", {
        "class": "shadow",
        "css": divAtt(0, 0, 0).css
      }).appendTo(this);
    }
    for (var i = 0; i < data.pageMv.length; i++) {
      if (!view[0] || !view[1])
        break;
      view = this.turn("view", data.pages[data.pageMv[i]].data().f.opts.next);
      view2 = this.turn("view", data.pageMv[i]);
      view[0] = view[0] && view2[0];
      view[1] = view[1] && view2[1];
    }
    if (!view[0])
      shadow = data.direction == "ltr" ? 1 : 2;
    else if (!view[1])
      shadow = data.direction == "ltr" ? 2 : 1;
    else
      shadow = 3;
    switch (shadow) {
      case 1:
        data.shadow.css({
          width: pageWidth,
          height,
          top: 0,
          left: pageWidth
        });
        break;
      case 2:
        data.shadow.css({
          width: pageWidth,
          height,
          top: 0,
          left: 0
        });
        break;
      case 3:
        data.shadow.css({
          width,
          height,
          top: 0,
          left: 0
        });
        break;
    }
  },
  // Sets the z-index and display property of a page
  // It depends on the current view
  _setPageLoc: function(page) {
    var data = this.data(), view = this.turn("view"), loc = 0;
    if (page == view[0] || page == view[1])
      loc = 1;
    else if (data.display == "single" && page == view[0] + 1 || (data.display == "double" && page == view[0] - 2 || page == view[1] + 2))
      loc = 2;
    if (!this.turn("animating"))
      switch (loc) {
        case 1:
          data.pageWrap[page].css(
            {
              zIndex: data.totalPages,
              display: ""
            }
          );
          break;
        case 2:
          data.pageWrap[page].css(
            {
              zIndex: data.totalPages - 1,
              display: ""
            }
          );
          break;
        case 0:
          data.pageWrap[page].css(
            {
              zIndex: 0,
              display: data.pageObjs[page].hasClass("fixed") ? "" : "none"
            }
          );
          break;
      }
    return loc;
  },
  // Gets and sets the options
  options: function(options) {
    if (options === void 0) {
      return this.data().opts;
    } else {
      var data = this.data();
      $.extend(data.opts, options);
      if (options.pages)
        this.turn("pages", options.pages);
      if (options.page)
        this.turn("page", options.page);
      if (options.display)
        this.turn("display", options.display);
      if (options.direction)
        this.turn("direction", options.direction);
      if (options.width && options.height)
        this.turn("size", options.width, options.height);
      if (options.when) {
        for (var eventName in options.when)
          if (has(eventName, options.when)) {
            this.unbind(eventName).bind(eventName, options.when[eventName]);
          }
      }
      return this;
    }
  },
  // Gets the current version
  version: function() {
    return version;
  }
};
var flipMethods = {
  // Constructor
  init: function(opts) {
    this.data({ f: {
      disabled: false,
      hover: false,
      effect: this.hasClass("hard") ? "hard" : "sheet"
    } });
    this.flip("options", opts);
    flipMethods._addPageWrapper.call(this);
    return this;
  },
  setData: function(d) {
    var data = this.data();
    data.f = $.extend(data.f, d);
    return this;
  },
  options: function(opts) {
    var data = this.data().f;
    if (opts) {
      flipMethods.setData.call(
        this,
        { opts: $.extend({}, data.opts || flipOptions, opts) }
      );
      return this;
    } else
      return data.opts;
  },
  z: function(z) {
    var data = this.data().f;
    data.opts["z-index"] = z;
    if (data.fwrapper)
      data.fwrapper.css({
        zIndex: z || parseInt(data.parent.css("z-index"), 10) || 0
      });
    return this;
  },
  _cAllowed: function() {
    var data = this.data().f, page = data.opts.page, turnData = data.opts.turn.data(), odd = page % 2;
    if (data.effect == "hard") {
      return turnData.direction == "ltr" ? [odd ? "r" : "l"] : [odd ? "l" : "r"];
    } else {
      if (turnData.display == "single") {
        if (page == 1)
          return turnData.direction == "ltr" ? corners["forward"] : corners["backward"];
        else if (page == turnData.totalPages)
          return turnData.direction == "ltr" ? corners["backward"] : corners["forward"];
        else
          return corners["all"];
      } else {
        return turnData.direction == "ltr" ? corners[odd ? "forward" : "backward"] : corners[odd ? "backward" : "forward"];
      }
    }
  },
  _cornerActivated: function(p) {
    var data = this.data().f, width = this.width(), height = this.height(), point = { x: p.x, y: p.y, corner: "" }, csz = data.opts.cornerSize;
    if (point.x <= 0 || point.y <= 0 || point.x >= width || point.y >= height)
      return false;
    var allowedCorners = flipMethods._cAllowed.call(this);
    switch (data.effect) {
      case "hard":
        if (point.x > width - csz)
          point.corner = "r";
        else if (point.x < csz)
          point.corner = "l";
        else
          return false;
        break;
      case "sheet":
        if (point.y < csz)
          point.corner += "t";
        else if (point.y >= height - csz)
          point.corner += "b";
        else
          return false;
        if (point.x <= csz)
          point.corner += "l";
        else if (point.x >= width - csz)
          point.corner += "r";
        else
          return false;
        break;
    }
    return !point.corner || $.inArray(point.corner, allowedCorners) == -1 ? false : point;
  },
  _isIArea: function(e) {
    var pos = this.data().f.parent.offset();
    e = isTouch && e.originalEvent ? e.originalEvent.touches[0] : e;
    return flipMethods._cornerActivated.call(
      this,
      {
        x: e.pageX - pos.left,
        y: e.pageY - pos.top
      }
    );
  },
  _c: function(corner, opts) {
    opts = opts || 0;
    switch (corner) {
      case "tl":
        return point2D(opts, opts);
      case "tr":
        return point2D(this.width() - opts, opts);
      case "bl":
        return point2D(opts, this.height() - opts);
      case "br":
        return point2D(this.width() - opts, this.height() - opts);
      case "l":
        return point2D(opts, 0);
      case "r":
        return point2D(this.width() - opts, 0);
    }
  },
  _c2: function(corner) {
    switch (corner) {
      case "tl":
        return point2D(this.width() * 2, 0);
      case "tr":
        return point2D(-this.width(), 0);
      case "bl":
        return point2D(this.width() * 2, this.height());
      case "br":
        return point2D(-this.width(), this.height());
      case "l":
        return point2D(this.width() * 2, 0);
      case "r":
        return point2D(-this.width(), 0);
    }
  },
  _foldingPage: function() {
    var data = this.data().f;
    if (!data)
      return;
    var opts = data.opts;
    if (opts.turn) {
      data = opts.turn.data();
      if (data.display == "single")
        return opts.next > 1 || opts.page > 1 ? data.pageObjs[0] : null;
      else
        return data.pageObjs[opts.next];
    }
  },
  _backGradient: function() {
    var data = this.data().f, turnData = data.opts.turn.data(), gradient2 = turnData.opts.gradients && (turnData.display == "single" || data.opts.page != 2 && data.opts.page != turnData.totalPages - 1);
    if (gradient2 && !data.bshadow)
      data.bshadow = $("<div/>", divAtt(0, 0, 1)).css({ "position": "", width: this.width(), height: this.height() }).appendTo(data.parent);
    return gradient2;
  },
  type: function() {
    return this.data().f.effect;
  },
  resize: function(full) {
    var data = this.data().f, turnData = data.opts.turn.data(), width = this.width(), height = this.height();
    switch (data.effect) {
      case "hard":
        if (full) {
          data.wrapper.css({ width, height });
          data.fpage.css({ width, height });
          if (turnData.opts.gradients) {
            data.ashadow.css({ width, height });
            data.bshadow.css({ width, height });
          }
        }
        break;
      case "sheet":
        if (full) {
          var size = Math.round(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)));
          data.wrapper.css({ width: size, height: size });
          data.fwrapper.css({ width: size, height: size }).children(":first-child").css({ width, height });
          data.fpage.css({ width, height });
          if (turnData.opts.gradients)
            data.ashadow.css({ width, height });
          if (flipMethods._backGradient.call(this))
            data.bshadow.css({ width, height });
        }
        if (data.parent.is(":visible")) {
          var offset = findPos(data.parent[0]);
          data.fwrapper.css({
            top: offset.top,
            left: offset.left
          });
          offset = findPos(data.opts.turn[0]);
          data.fparent.css({ top: -offset.top, left: -offset.left });
        }
        this.flip("z", data.opts["z-index"]);
        break;
    }
  },
  // Prepares the page by adding a general wrapper and another objects
  _addPageWrapper: function() {
    var att, data = this.data().f, turnData = data.opts.turn.data(), parent = this.parent();
    data.parent = parent;
    if (!data.wrapper)
      switch (data.effect) {
        case "hard":
          var cssProperties = {};
          cssProperties[vendor + "transform-style"] = "preserve-3d";
          cssProperties[vendor + "backface-visibility"] = "hidden";
          data.wrapper = $("<div/>", divAtt(0, 0, 2)).css(cssProperties).appendTo(parent).prepend(this);
          data.fpage = $("<div/>", divAtt(0, 0, 1)).css(cssProperties).appendTo(parent);
          if (turnData.opts.gradients) {
            data.ashadow = $("<div/>", divAtt(0, 0, 0)).hide().appendTo(parent);
            data.bshadow = $("<div/>", divAtt(0, 0, 0));
          }
          break;
        case "sheet":
          var width = this.width(), height = this.height(), size = Math.round(Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)));
          data.fparent = data.opts.turn.data().fparent;
          if (!data.fparent) {
            var fparent = $("<div/>", { css: { "pointer-events": "none" } }).hide();
            fparent.data().flips = 0;
            fparent.css(divAtt(0, 0, "auto", "visible").css).appendTo(data.opts.turn);
            data.opts.turn.data().fparent = fparent;
            data.fparent = fparent;
          }
          this.css({ position: "absolute", top: 0, left: 0, bottom: "auto", right: "auto" });
          data.wrapper = $("<div/>", divAtt(0, 0, this.css("z-index"))).appendTo(parent).prepend(this);
          data.fwrapper = $("<div/>", divAtt(parent.offset().top, parent.offset().left)).hide().appendTo(data.fparent);
          data.fpage = $("<div/>", divAtt(0, 0, 0, "visible")).css({ cursor: "default" }).appendTo(data.fwrapper);
          if (turnData.opts.gradients)
            data.ashadow = $("<div/>", divAtt(0, 0, 1)).appendTo(data.fpage);
          flipMethods.setData.call(this, data);
          break;
      }
    flipMethods.resize.call(this, true);
  },
  // Takes a 2P point from the screen and applies the transformation
  _fold: function(point) {
    var data = this.data().f, turnData = data.opts.turn.data(), o = flipMethods._c.call(this, point.corner), width = this.width(), height = this.height();
    switch (data.effect) {
      case "hard":
        if (point.corner == "l")
          point.x = Math.min(Math.max(point.x, 0), width * 2);
        else
          point.x = Math.max(Math.min(point.x, width), -width);
        var leftPos, shadow, gradientX, fpageOrigin, parentOrigin, totalPages = turnData.totalPages, zIndex = data.opts["z-index"] || totalPages, parentCss = { "overflow": "visible" }, relX = o.x ? (o.x - point.x) / width : point.x / width, angle = relX * 90, half = angle < 90;
        switch (point.corner) {
          case "l":
            fpageOrigin = "0% 50%";
            parentOrigin = "100% 50%";
            if (half) {
              leftPos = 0;
              shadow = data.opts.next - 1 > 0;
              gradientX = 1;
            } else {
              leftPos = "100%";
              shadow = data.opts.page + 1 < totalPages;
              gradientX = 0;
            }
            break;
          case "r":
            fpageOrigin = "100% 50%";
            parentOrigin = "0% 50%";
            angle = -angle;
            width = -width;
            if (half) {
              leftPos = 0;
              shadow = data.opts.next + 1 < totalPages;
              gradientX = 0;
            } else {
              leftPos = "-100%";
              shadow = data.opts.page != 1;
              gradientX = 1;
            }
            break;
        }
        parentCss[vendor + "perspective-origin"] = parentOrigin;
        data.wrapper.transform("rotateY(" + angle + "deg)translate3d(0px, 0px, " + (this.attr("depth") || 0) + "px)", parentOrigin);
        data.fpage.transform("translateX(" + width + "px) rotateY(" + (180 + angle) + "deg)", fpageOrigin);
        data.parent.css(parentCss);
        if (half) {
          relX = -relX + 1;
          data.wrapper.css({ zIndex: zIndex + 1 });
          data.fpage.css({ zIndex });
        } else {
          relX = relX - 1;
          data.wrapper.css({ zIndex });
          data.fpage.css({ zIndex: zIndex + 1 });
        }
        if (turnData.opts.gradients) {
          if (shadow)
            data.ashadow.css({
              display: "",
              left: leftPos,
              backgroundColor: "rgba(0,0,0," + 0.5 * relX + ")"
            }).transform("rotateY(0deg)");
          else
            data.ashadow.hide();
          data.bshadow.css({ opacity: -relX + 1 });
          if (half) {
            if (data.bshadow.parent()[0] != data.wrapper[0]) {
              data.bshadow.appendTo(data.wrapper);
            }
          } else {
            if (data.bshadow.parent()[0] != data.fpage[0]) {
              data.bshadow.appendTo(data.fpage);
            }
          }
          gradient(
            data.bshadow,
            point2D(gradientX * 100, 0),
            point2D((-gradientX + 1) * 100, 0),
            [[0, "rgba(0,0,0,0.3)"], [1, "rgba(0,0,0,0)"]],
            2
          );
        }
        break;
      case "sheet":
        var that = this, a = 0, alpha = 0, beta, px, gradientEndPointA, gradientEndPointB, gradientStartVal, gradientSize, gradientOpacity, shadowVal, mv = point2D(0, 0), df = point2D(0, 0), tr = point2D(0, 0), folding = flipMethods._foldingPage.call(this), tan = Math.tan(alpha), ac = turnData.opts.acceleration, h = data.wrapper.height(), top = point.corner.substr(0, 1) == "t", left = point.corner.substr(1, 1) == "l", compute = function() {
          var rel = point2D(0, 0);
          var middle = point2D(0, 0);
          rel.x = o.x ? o.x - point.x : point.x;
          if (!hasRot) {
            rel.y = 0;
          } else {
            rel.y = o.y ? o.y - point.y : point.y;
          }
          middle.x = left ? width - rel.x / 2 : point.x + rel.x / 2;
          middle.y = rel.y / 2;
          var alpha2 = A90 - Math.atan2(rel.y, rel.x), gamma = alpha2 - Math.atan2(middle.y, middle.x), distance = Math.max(0, Math.sin(gamma) * Math.sqrt(Math.pow(middle.x, 2) + Math.pow(middle.y, 2)));
          a = deg(alpha2);
          tr = point2D(distance * Math.sin(alpha2), distance * Math.cos(alpha2));
          if (alpha2 > A90) {
            tr.x = tr.x + Math.abs(tr.y * rel.y / rel.x);
            tr.y = 0;
            if (Math.round(tr.x * Math.tan(PI - alpha2)) < height) {
              point.y = Math.sqrt(Math.pow(height, 2) + 2 * middle.x * rel.x);
              if (top)
                point.y = height - point.y;
              return compute();
            }
          }
          if (alpha2 > A90) {
            var beta2 = PI - alpha2, dd = h - height / Math.sin(beta2);
            mv = point2D(Math.round(dd * Math.cos(beta2)), Math.round(dd * Math.sin(beta2)));
            if (left)
              mv.x = -mv.x;
            if (top)
              mv.y = -mv.y;
          }
          px = Math.round(tr.y / Math.tan(alpha2) + tr.x);
          var side = width - px, sideX = side * Math.cos(alpha2 * 2), sideY = side * Math.sin(alpha2 * 2);
          df = point2D(
            Math.round(left ? side - sideX : px + sideX),
            Math.round(top ? sideY : height - sideY)
          );
          if (turnData.opts.gradients) {
            gradientSize = side * Math.sin(alpha2);
            var endingPoint = flipMethods._c2.call(that, point.corner), far = Math.sqrt(Math.pow(endingPoint.x - point.x, 2) + Math.pow(endingPoint.y - point.y, 2)) / width;
            shadowVal = Math.sin(A90 * (far > 1 ? 2 - far : far));
            gradientOpacity = Math.min(far, 1);
            gradientStartVal = gradientSize > 100 ? (gradientSize - 100) / gradientSize : 0;
            gradientEndPointA = point2D(
              gradientSize * Math.sin(alpha2) / width * 100,
              gradientSize * Math.cos(alpha2) / height * 100
            );
            if (flipMethods._backGradient.call(that)) {
              gradientEndPointB = point2D(
                gradientSize * 1.2 * Math.sin(alpha2) / width * 100,
                gradientSize * 1.2 * Math.cos(alpha2) / height * 100
              );
              if (!left)
                gradientEndPointB.x = 100 - gradientEndPointB.x;
              if (!top)
                gradientEndPointB.y = 100 - gradientEndPointB.y;
            }
          }
          tr.x = Math.round(tr.x);
          tr.y = Math.round(tr.y);
          return true;
        }, transform = function(tr2, c, x, a2) {
          var f = ["0", "auto"], mvW = (width - h) * x[0] / 100, mvH = (height - h) * x[1] / 100, cssA = { left: f[c[0]], top: f[c[1]], right: f[c[2]], bottom: f[c[3]] }, cssB = {}, aliasingFk = a2 != 90 && a2 != -90 ? left ? -1 : 1 : 0, origin = x[0] + "% " + x[1] + "%";
          that.css(cssA).transform(rotate(a2) + translate(tr2.x + aliasingFk, tr2.y, ac), origin);
          data.fpage.css(cssA).transform(
            rotate(a2) + translate(tr2.x + df.x - mv.x - width * x[0] / 100, tr2.y + df.y - mv.y - height * x[1] / 100, ac) + rotate((180 / a2 - 2) * a2),
            origin
          );
          data.wrapper.transform(translate(-tr2.x + mvW - aliasingFk, -tr2.y + mvH, ac) + rotate(-a2), origin);
          data.fwrapper.transform(translate(-tr2.x + mv.x + mvW, -tr2.y + mv.y + mvH, ac) + rotate(-a2), origin);
          if (turnData.opts.gradients) {
            if (x[0])
              gradientEndPointA.x = 100 - gradientEndPointA.x;
            if (x[1])
              gradientEndPointA.y = 100 - gradientEndPointA.y;
            cssB["box-shadow"] = "0 0 20px rgba(0,0,0," + 0.5 * shadowVal + ")";
            folding.css(cssB);
            gradient(
              data.ashadow,
              point2D(left ? 100 : 0, top ? 0 : 100),
              point2D(gradientEndPointA.x, gradientEndPointA.y),
              [
                [gradientStartVal, "rgba(0,0,0,0)"],
                [(1 - gradientStartVal) * 0.8 + gradientStartVal, "rgba(0,0,0," + 0.2 * gradientOpacity + ")"],
                [1, "rgba(255,255,255," + 0.2 * gradientOpacity + ")"]
              ],
              3,
              alpha
            );
            if (flipMethods._backGradient.call(that))
              gradient(
                data.bshadow,
                point2D(left ? 0 : 100, top ? 0 : 100),
                point2D(gradientEndPointB.x, gradientEndPointB.y),
                [
                  [0.6, "rgba(0,0,0,0)"],
                  [0.8, "rgba(0,0,0," + 0.3 * gradientOpacity + ")"],
                  [1, "rgba(0,0,0,0)"]
                ],
                3
              );
          }
        };
        switch (point.corner) {
          case "l":
            break;
          case "r":
            break;
          case "tl":
            point.x = Math.max(point.x, 1);
            compute();
            transform(tr, [1, 0, 0, 1], [100, 0], a);
            break;
          case "tr":
            point.x = Math.min(point.x, width - 1);
            compute();
            transform(point2D(-tr.x, tr.y), [0, 0, 0, 1], [0, 0], -a);
            break;
          case "bl":
            point.x = Math.max(point.x, 1);
            compute();
            transform(point2D(tr.x, -tr.y), [1, 1, 0, 0], [100, 100], -a);
            break;
          case "br":
            point.x = Math.min(point.x, width - 1);
            compute();
            transform(point2D(-tr.x, -tr.y), [0, 1, 1, 0], [0, 100], a);
            break;
        }
        break;
    }
    data.point = point;
  },
  _moveFoldingPage: function(move) {
    var data = this.data().f;
    if (!data)
      return;
    var turn = data.opts.turn, turnData = turn.data(), place = turnData.pagePlace;
    if (move) {
      var nextPage = data.opts.next;
      if (place[nextPage] != data.opts.page) {
        if (data.folding)
          flipMethods._moveFoldingPage.call(this, false);
        var folding = flipMethods._foldingPage.call(this);
        folding.appendTo(data.fpage);
        place[nextPage] = data.opts.page;
        data.folding = nextPage;
      }
      turn.turn("update");
    } else {
      if (data.folding) {
        if (turnData.pages[data.folding]) {
          var flipData = turnData.pages[data.folding].data().f;
          turnData.pageObjs[data.folding].appendTo(flipData.wrapper);
        } else if (turnData.pageWrap[data.folding]) {
          turnData.pageObjs[data.folding].appendTo(turnData.pageWrap[data.folding]);
        }
        if (data.folding in place) {
          place[data.folding] = data.folding;
        }
        delete data.folding;
      }
    }
  },
  _showFoldedPage: function(c, animate) {
    var folding = flipMethods._foldingPage.call(this), dd = this.data(), data = dd.f, visible = data.visible;
    if (folding) {
      if (!visible || !data.point || data.point.corner != c.corner) {
        var corner = data.status == "hover" || data.status == "peel" || data.opts.turn.data().mouseAction ? c.corner : null;
        visible = false;
        if (trigger("start", this, [data.opts, corner]) == "prevented")
          return false;
      }
      if (animate) {
        var that = this, point = data.point && data.point.corner == c.corner ? data.point : flipMethods._c.call(this, c.corner, 1);
        this.animatef({
          from: [point.x, point.y],
          to: [c.x, c.y],
          duration: 500,
          frame: function(v) {
            c.x = Math.round(v[0]);
            c.y = Math.round(v[1]);
            flipMethods._fold.call(that, c);
          }
        });
      } else {
        flipMethods._fold.call(this, c);
        if (dd.effect && !dd.effect.turning)
          this.animatef(false);
      }
      if (!visible) {
        switch (data.effect) {
          case "hard":
            data.visible = true;
            flipMethods._moveFoldingPage.call(this, true);
            data.fpage.show();
            if (data.opts.shadows)
              data.bshadow.show();
            break;
          case "sheet":
            data.visible = true;
            data.fparent.show().data().flips++;
            flipMethods._moveFoldingPage.call(this, true);
            data.fwrapper.show();
            if (data.bshadow)
              data.bshadow.show();
            break;
        }
      }
      return true;
    }
    return false;
  },
  hide: function() {
    var data = this.data().f, turnData = data.opts.turn.data(), folding = flipMethods._foldingPage.call(this);
    switch (data.effect) {
      case "hard":
        if (turnData.opts.gradients) {
          data.bshadowLoc = 0;
          data.bshadow.remove();
          data.ashadow.hide();
        }
        data.wrapper.transform("");
        data.fpage.hide();
        break;
      case "sheet":
        if (--data.fparent.data().flips === 0)
          data.fparent.hide();
        this.css({ left: 0, top: 0, right: "auto", bottom: "auto" }).transform("");
        data.wrapper.transform("");
        data.fwrapper.hide();
        if (data.bshadow)
          data.bshadow.hide();
        folding.transform("");
        break;
    }
    data.visible = false;
    return this;
  },
  hideFoldedPage: function(animate) {
    var data = this.data().f;
    if (!data.point)
      return;
    var that = this, p1 = data.point, hide = function() {
      data.point = null;
      data.status = "";
      that.flip("hide");
      that.trigger("end", [data.opts, false]);
    };
    if (animate) {
      var p4 = flipMethods._c.call(this, p1.corner), top = p1.corner.substr(0, 1) == "t", delta = top ? Math.min(0, p1.y - p4.y) / 2 : Math.max(0, p1.y - p4.y) / 2, p2 = point2D(p1.x, p1.y + delta), p3 = point2D(p4.x, p4.y - delta);
      this.animatef({
        from: 0,
        to: 1,
        frame: function(v) {
          var np = bezier(p1, p2, p3, p4, v);
          p1.x = np.x;
          p1.y = np.y;
          flipMethods._fold.call(that, p1);
        },
        complete: hide,
        duration: 800,
        hiding: true
      });
    } else {
      this.animatef(false);
      hide();
    }
  },
  turnPage: function(corner) {
    var that = this, data = this.data().f, turnData = data.opts.turn.data();
    corner = { corner: data.corner ? data.corner.corner : corner || flipMethods._cAllowed.call(this)[0] };
    var p1 = data.point || flipMethods._c.call(
      this,
      corner.corner,
      data.opts.turn ? turnData.opts.elevation : 0
    ), p4 = flipMethods._c2.call(this, corner.corner);
    this.trigger("flip").animatef({
      from: 0,
      to: 1,
      frame: function(v) {
        var np = bezier(p1, p1, p4, p4, v);
        corner.x = np.x;
        corner.y = np.y;
        flipMethods._showFoldedPage.call(that, corner);
      },
      complete: function() {
        that.trigger("end", [data.opts, true]);
      },
      duration: turnData.opts.duration,
      turning: true
    });
    data.corner = null;
  },
  moving: function() {
    return "effect" in this.data();
  },
  isTurning: function() {
    return this.flip("moving") && this.data().effect.turning;
  },
  corner: function() {
    return this.data().f.corner;
  },
  _eventStart: function(e) {
    var data = this.data().f, turn = data.opts.turn;
    if (!data.corner && !data.disabled && !this.flip("isTurning") && data.opts.page == turn.data().pagePlace[data.opts.page]) {
      data.corner = flipMethods._isIArea.call(this, e);
      if (data.corner && flipMethods._foldingPage.call(this)) {
        this.trigger("pressed", [data.point]);
        flipMethods._showFoldedPage.call(this, data.corner);
        return false;
      } else
        data.corner = null;
    }
  },
  _eventMove: function(e) {
    var data = this.data().f;
    if (!data.disabled) {
      e = isTouch ? e.originalEvent.touches : [e];
      if (data.corner) {
        var pos = data.parent.offset();
        data.corner.x = e[0].pageX - pos.left;
        data.corner.y = e[0].pageY - pos.top;
        flipMethods._showFoldedPage.call(this, data.corner);
      } else if (data.hover && !this.data().effect && this.is(":visible")) {
        var point = flipMethods._isIArea.call(this, e[0]);
        if (point) {
          if (data.effect == "sheet" && point.corner.length == 2 || data.effect == "hard") {
            data.status = "hover";
            var origin = flipMethods._c.call(this, point.corner, data.opts.cornerSize / 2);
            point.x = origin.x;
            point.y = origin.y;
            flipMethods._showFoldedPage.call(this, point, true);
          }
        } else {
          if (data.status == "hover") {
            data.status = "";
            flipMethods.hideFoldedPage.call(this, true);
          }
        }
      }
    }
  },
  _eventEnd: function() {
    var data = this.data().f, corner = data.corner;
    if (!data.disabled && corner) {
      if (trigger("released", this, [data.point || corner]) != "prevented") {
        flipMethods.hideFoldedPage.call(this, true);
      }
    }
    data.corner = null;
  },
  disable: function(disable) {
    flipMethods.setData.call(this, { "disabled": disable });
    return this;
  },
  hover: function(hover) {
    flipMethods.setData.call(this, { "hover": hover });
    return this;
  },
  peel: function(corner, animate) {
    var data = this.data().f;
    if (corner) {
      if ($.inArray(corner, corners.all) == -1)
        throw turnError("Corner " + corner + " is not permitted");
      if ($.inArray(corner, flipMethods._cAllowed.call(this)) != -1) {
        var point = flipMethods._c.call(this, corner, data.opts.cornerSize / 2);
        data.status = "peel";
        flipMethods._showFoldedPage.call(
          this,
          {
            corner,
            x: point.x,
            y: point.y
          },
          animate
        );
      }
    } else {
      data.status = "";
      flipMethods.hideFoldedPage.call(this, animate);
    }
    return this;
  }
};
function dec(that, methods, args) {
  if (!args[0] || typeof args[0] == "object")
    return methods.init.apply(that, args);
  else if (methods[args[0]])
    return methods[args[0]].apply(that, Array.prototype.slice.call(args, 1));
  else
    throw turnError(args[0] + " is not a method or property");
}
function divAtt(top, left, zIndex, overf) {
  return {
    "css": {
      position: "absolute",
      top,
      left,
      "overflow": overf || "hidden",
      zIndex: zIndex || "auto"
    }
  };
}
function bezier(p1, p2, p3, p4, t) {
  var a = 1 - t, b = a * a * a, c = t * t * t;
  return point2D(
    Math.round(b * p1.x + 3 * t * a * a * p2.x + 3 * t * t * a * p3.x + c * p4.x),
    Math.round(b * p1.y + 3 * t * a * a * p2.y + 3 * t * t * a * p3.y + c * p4.y)
  );
}
function deg(radians) {
  return radians / PI * 180;
}
function point2D(x, y) {
  return { x, y };
}
function rotationAvailable() {
  var parts;
  if (parts = /AppleWebkit\/([0-9\.]+)/i.exec(navigator.userAgent)) {
    var webkitVersion = parseFloat(parts[1]);
    return webkitVersion > 534.3;
  } else {
    return true;
  }
}
function translate(x, y, use3d) {
  return has3d && use3d ? " translate3d(" + x + "px," + y + "px, 0px) " : " translate(" + x + "px, " + y + "px) ";
}
function rotate(degrees) {
  return " rotate(" + degrees + "deg) ";
}
function has(property, object) {
  return Object.prototype.hasOwnProperty.call(object, property);
}
function getPrefix() {
  var vendorPrefixes = ["Moz", "Webkit", "Khtml", "O", "ms"], len = vendorPrefixes.length, vendor2 = "";
  while (len--)
    if (vendorPrefixes[len] + "Transform" in document.body.style)
      vendor2 = "-" + vendorPrefixes[len].toLowerCase() + "-";
  return vendor2;
}
function getTransitionEnd() {
  var t, el = document.createElement("fakeelement"), transitions = {
    "transition": "transitionend",
    "OTransition": "oTransitionEnd",
    "MSTransition": "transitionend",
    "MozTransition": "transitionend",
    "WebkitTransition": "webkitTransitionEnd"
  };
  for (t in transitions) {
    if (el.style[t] !== void 0) {
      return transitions[t];
    }
  }
}
function gradient(obj, p0, p1, colors, numColors) {
  var j, cols = [];
  if (vendor == "-webkit-") {
    for (j = 0; j < numColors; j++)
      cols.push("color-stop(" + colors[j][0] + ", " + colors[j][1] + ")");
    obj.css({ "background-image": "-webkit-gradient(linear, " + p0.x + "% " + p0.y + "%," + p1.x + "% " + p1.y + "%, " + cols.join(",") + " )" });
  } else {
    p0 = { x: p0.x / 100 * obj.width(), y: p0.y / 100 * obj.height() };
    p1 = { x: p1.x / 100 * obj.width(), y: p1.y / 100 * obj.height() };
    var dx = p1.x - p0.x, dy = p1.y - p0.y, angle = Math.atan2(dy, dx), angle2 = angle - Math.PI / 2, diagonal = Math.abs(obj.width() * Math.sin(angle2)) + Math.abs(obj.height() * Math.cos(angle2)), gradientDiagonal = Math.sqrt(dy * dy + dx * dx), corner = point2D(p1.x < p0.x ? obj.width() : 0, p1.y < p0.y ? obj.height() : 0), slope = Math.tan(angle), inverse = -1 / slope, x = (inverse * corner.x - corner.y - slope * p0.x + p0.y) / (inverse - slope), c = { x, y: inverse * x - inverse * corner.x + corner.y }, segA = Math.sqrt(Math.pow(c.x - p0.x, 2) + Math.pow(c.y - p0.y, 2));
    for (j = 0; j < numColors; j++)
      cols.push(" " + colors[j][1] + " " + (segA + gradientDiagonal * colors[j][0]) * 100 / diagonal + "%");
    obj.css({ "background-image": vendor + "linear-gradient(" + -angle + "rad," + cols.join(",") + ")" });
  }
}
function trigger(eventName, context, args) {
  var event = $.Event(eventName);
  context.trigger(event, args);
  if (event.isDefaultPrevented())
    return "prevented";
  else if (event.isPropagationStopped())
    return "stopped";
  else
    return "";
}
function turnError(message) {
  function TurnJsError(message2) {
    this.name = "TurnJsError";
    this.message = message2;
  }
  TurnJsError.prototype = new Error();
  TurnJsError.prototype.constructor = TurnJsError;
  return new TurnJsError(message);
}
function findPos(obj) {
  var offset = { top: 0, left: 0 };
  do {
    offset.left += obj.offsetLeft;
    offset.top += obj.offsetTop;
  } while (obj = obj.offsetParent);
  return offset;
}
function hasHardPage() {
  return navigator.userAgent.indexOf("MSIE 9.0") == -1;
}
window.requestAnim = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    window.setTimeout(callback, 1e3 / 60);
  };
}();
$.extend($.fn, {
  flip: function() {
    return dec($(this[0]), flipMethods, arguments);
  },
  turn: function() {
    return dec($(this[0]), turnMethods, arguments);
  },
  transform: function(transform, origin) {
    var properties = {};
    if (origin)
      properties[vendor + "transform-origin"] = origin;
    properties[vendor + "transform"] = transform;
    return this.css(properties);
  },
  animatef: function(point) {
    var data = this.data();
    if (data.effect)
      data.effect.stop();
    if (point) {
      if (!point.to.length)
        point.to = [point.to];
      if (!point.from.length)
        point.from = [point.from];
      var diff = [], len = point.to.length, animating = true, that = this, time = (/* @__PURE__ */ new Date()).getTime(), frame = function() {
        if (!data.effect || !animating)
          return;
        var v = [], timeDiff = Math.min(point.duration, (/* @__PURE__ */ new Date()).getTime() - time);
        for (var i2 = 0; i2 < len; i2++)
          v.push(data.effect.easing(1, timeDiff, point.from[i2], diff[i2], point.duration));
        point.frame(len == 1 ? v[0] : v);
        if (timeDiff == point.duration) {
          delete data["effect"];
          that.data(data);
          if (point.complete)
            point.complete();
        } else {
          window.requestAnim(frame);
        }
      };
      for (var i = 0; i < len; i++)
        diff.push(point.to[i] - point.from[i]);
      data.effect = $.extend({
        stop: function() {
          animating = false;
        },
        easing: function(x, t, b, c, data2) {
          return c * Math.sqrt(1 - (t = t / data2 - 1) * t) + b;
        }
      }, point);
      this.data(data);
      frame();
    } else {
      delete data["effect"];
    }
  }
});
$.isTouch = isTouch;
$.mouseEvents = mouseEvents;
$.cssPrefix = getPrefix;
$.cssTransitionEnd = getTransitionEnd;
$.findPos = findPos;
//# sourceMappingURL=turn__js.js.map
