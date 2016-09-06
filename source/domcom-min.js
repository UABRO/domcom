/*

DomCom framework, 2016,
Oleksii Shnyra, UABRO

*/
(function(){"remove"in Element.prototype||(Element.prototype.remove=function(){this.length?this.map(function(d){d.parentNode&&d.parentNode.removeChild(d)}):this.parentNode&&this.parentNode.removeChild(this)});Element.prototype.css=function(d){var f;if("string"==typeof d)return this.style[d];for(var p in d)f=d[p],"string"!=typeof f&&(f+="px"),this.style[p]=f;return this};Element.prototype.resize=document.resize=function(d){console.log("ok")};Element.prototype.attr=function(d){if("string"==typeof d)return this.getAttribute(d);
for(var f in d)this.setAttribute(f,d[f]);return!0};Element.prototype.show=function(d){arguments.length||(d="block");this.style.display=d};Element.prototype.hide=function(){this.style.display="none"};Element.prototype.height=function(){return this.offsetHeight};Element.prototype.width=function(){return this.offsetWidth};Element.prototype.text=function(d){if(d)this.textContent=d;else return this.textContent};Element.prototype.html=function(d){if(d)this.innerHTML=d;else return this.innerHTML};Element.prototype.val=
function(d){if("undefined"!=typeof d)this.value=d;else return this.value};Element.prototype.crec=function(){return this.getBoundingClientRect()};var h;h=new function(){var d=this;this.version="1.8.6";if(!window.Worker)return d.ready=function(){document.addEventListener("DOMContentLoaded",function(){document.body.innerHTML="<h1><b style='color:#000;padding:10px;'>You are using bad browser! What's wrong with you, man!???</b></h1>"})},!1;var f=function(a,b){for(var c,g,d,e,f=-1,k,h,m,v,u,p,n,q,r="",
w="",l="",t=0;t<a.length;t++)c=a[t],n?u?'"'==c?(h=!h,!h&&v.length&&(c={},c[v]=w,v="",g.attr(c)),w=""):h?w+=c:e||">"==c?">"==c&&(n=0,e?(g&&g.parentNode&&(g=g.parentNode),k?d.parentNode&&(d=d.parentNode):k=1,f=0):g&&/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(g.tagName)&&(g=g.parentNode),e=0):"/"==c?e=1:/[^a-z0-9_]/i.test(c)||(v+=c):p?/[ >]/.test(c)?(p=0,u=1,v="",g=document.createElement(l),m&&d?d.appendChild(g):d=m=g,">"==c&&(n=0),l=""):l+=c:/[a-z0-9_]/i.test(c)&&(p=1,l=c):q?u?(l+=
a[t-1],b[l].insertIn(g),q=0):"}"==a[t+1]?u=1:l+=c:"<"==c?(n=1,l="",r.length&&g&&(g.appendChild(document.createTextNode(r)),r=""),/[a-z0-9_]/i.test(a[t+1])?(u=0,f?d=g:f++,k=0):"/"==a[t+1]&&(e=1)):"{"==c?(q=1,u=0,l="",r.length&&g&&(g.appendChild(document.createTextNode(r)),r="")):r+=c;return m};d.ready=function(a){document.addEventListener("DOMContentLoaded",a)};var p=[],k={},m={};(function(){var a={lang:1};d.setPseudo=function(b){"string"==typeof b&&(b=[b]);b.forEach(function(b){a[b]||(a[b]=[])})};
d.newPseudo=function(b,c){a[b]&&a[b].push(c)};d.isPseudo=function(b){return a[b]?!0:!1};d.emit=function(b){a[b]&&a[b].forEach(function(a){a["on"+b]()})}})();d.lang=function(){var a,b={},c=function(c){return a?b[a][c]:(console.log("Error. Language was not set"),"undefined")};c.set=function(a){for(var d in a)b[d]=a[d];return c};c.get=function(b){return a};c.ready=function(a){return b[a]?!0:!1};c.turn=function(b){if(b!=a){a=b;for(var c in m)b=m[c],b.f?b.f():b.html?b.dc.change({html:d.lang(b.dc.state.ihtml)}):
b.dc.change({text:d.lang(b.dc.state.itext)})}};return c}();var h=0,n,q;d.sel=function(a,b){var c;if("object"==typeof a)return a===document?document:a instanceof Element?a:a.el;c="#"==a[0]?document.getElementById(a.substr(1)):document.querySelectorAll(a);b&&c.length&&(c=c[0]);return c.length||c instanceof Element?c:!1};d.onwindow=function(a,b){window.addEventListener(a,b)};d.forg=function(a,b){if(b)k[a]&&k[a].forEach(function(a){b(a)});else return k[a]};var e=function(a){a?a.temp||p.push(this):a={};
a.getSelf&&a.getSelf(this);var b=++h;this.id=b;this.state={};this.data={};this.eltype=a.eltype?a.eltype:"div";this.el=document.createElement(this.eltype);a.extend&&this.extend(a.extend);if(a.state)for(var c in a.state)if("class"==c)this.state["class"]=a.state[c];else{if("itext"==c||"ihtml"==c)m[b]={dc:this},"ihtml"==c?(m[b].html=1,this.state.html=d.lang(a.state.ihtml)):this.state.text=d.lang(a.state.itext);this.state[c]=a.state[c]}if(a.attrs)for(c in a.attrs)n={},n[c]=a.attrs[c],"value"==c?this.state.val=
a.attrs[c]:this.state[c]=a.attrs[c],this.el.attr(n);a.groups&&(this.groups=q=a.groups,(n=k[q])?k[q].push(this):k[q]=[this]);"function"==typeof a.chapi&&(this.chapi=a.chapi);a.init?(this.init=a.init,this.init()):a.initLater&&(this.init=a.initLater);a.data&&(this.data=a.data);a.events&&this.addEvents(a.events)};e.prototype.parentEl=!1;e.prototype.insertIn=function(a){a=d.sel(a,1);a.appendChild(this.el);this.parentEl=a;return this.render()};e.prototype.insertAs=function(a){this.el=d.sel(a,1);return this.render({})};
e.prototype.change=function(a,b){var c={},d=0;if(b&&this.chapi&&a)this.chapi(a);else{for(var e in a)this.state[e]=a[e],c[e]=!0,["html","text","val","class"].indexOf(e)+1&&d++;if(d)this.render(c);else return this}};e.prototype.hasClass=function(a){var b=this.state["class"];if(b&&b.length)a=b?b.indexOf(a)+1:!1;else return!1;return a?a:!1};e.prototype.addClass=function(a){if(this.hasClass(a))return!1;var b=this.state["class"];"string"==typeof b&&b.length&&(b=b.split(" "));b?b.push(a):b=[a];this.change({"class":b});
return!0};e.prototype.removeClass=function(a){if(a=this.hasClass(a)){var b=this.state["class"];b&&(b.splice(a-1),this.change({"class":b}));return!0}return!1};e.prototype.eventsArr=[];e.prototype.intervalArr=[];e.prototype.interval=function(a,b){this.intervalArr.push(setInterval(a,b))};e.prototype.clearIntervals=function(){this.intervalArr.forEach(function(a){clearInterval(a)})};e.prototype.timeoutArr=[];e.prototype.timeout=function(a,b){this.timeoutArr.push(setTimeout(a,b))};e.prototype.clearTimeouts=
function(){this.timeoutArr.forEach(function(a){clearTimeout(a)})};e.prototype.remove=function(){this.el.remove();this.removed=!0;this.clearIntervals();return!0};e.prototype.replaceWith=function(a,b){"string"==typeof a?a=b?f(a):document.createTextNode(a):"el"in a&&(a=a.el);this.el.parentNode.replaceChild(a,this.el)};e.prototype.parse=function(a,b){var c=f(a,b);this.el=c;c.attr("class")&&(this.state["class"]=c.attr("class"));return this};e.prototype.extend=function(a){for(var b in a)"events"==b?this.addEvents(a[b]):
this[b]=a[b]};e.prototype.addEvents=function(a){for(var b in a)d.isPseudo(b)?("lang"==b?m[this.id]={dc:this,f:a[b].bind(this)}:d.newPseudo(b,this),this["on"+b]=a[b].bind(this)):(this.eventsArr.push(b),this["on"+b]=a[b].bind(this.el),this.el.addEventListener(b,this["on"+b]))};e.prototype.DClist=function(a){var b=this;b.change({html:""});a.map(function(a){a.insertIn(b)});return b};e.prototype.render=function(a){var b=this.state;a?("html"in a&&(this.el.innerHTML=b.html),"text"in a&&(this.el.textContent=
b.text),"val"in a&&(this.el.value=b.val),"class"in a&&(a=b["class"],a="string"==typeof a?a:a.join(" "),this.el.attr({"class":a}))):(b.html&&b.html!=this.el.innerHTML&&(this.el.innerHTML=b.html),b.text&&b.text!=this.el.textContent&&(this.el.textContent=b.text),b.val&&b.val!=this.el.value&&(this.el.value=b.val),b["class"]&&(a=b["class"],a="string"==typeof a?a:a.join(" "),this.el.attr({"class":a})));return this};d.make=function(a){"function"==typeof a&&(a=a());return new e(a)};d.temp=function(a){"function"==
typeof a&&(a=a());"undefined"==typeof a&&(a={});a.temp=1;return new e(a)};d.module=function(){var a=function(b,c){if(b){if(!c)return a.loaded[b];a.loaded[b]=c}else console.log("loaded module have wrong structure")};a.loaded={};a.run=function(b,c){var d=c.data,e=c.ready;a.loaded[b]?(d||(d={}),d=a.loaded[b](d),a.loaded[b]=d,e&&e(d.dc,d.api)):c.err&&c.err('module "'+b+'" not loaded')};return a}();d.load=function(){var a=d.module.loaded,b,c=function(c){function e(){c.raw?(c.rawcss&&d.temp({eltype:"style",
state:{text:c.rawcss}}).insertIn(document.head),d.temp({eltype:"script",state:{text:c.raw}}).insertIn(document.head),d.module.run(f,c)):d.temp({eltype:"script",attrs:{src:b+f+".js"},events:{load:function(){d.module.run(f,c);this.remove()},error:function(){c.err&&c.err('module "'+f+"\" can't be loaded")}}}).insertIn(document.head)}var f=c.name;if(a[f]&&!c.force)if(c.exist){var h=a[f];"function"==typeof c.exist&&c.exist(h.dc,h.api)}else c.err&&c.err('module "'+f+'" already loaded. Use `force` to load it again');
else c.start&&c.start(),c.css?d.temp({eltype:"link",attrs:{rel:"stylesheet",href:b+"css/"+f+".css"},events:{load:function(){e()},error:function(a){c.err&&c.err('css for module "'+f+"\" can't be loaded")}}}).insertIn(document.head):e()};c.config=function(a){a.src&&(b=a.src)};return c}()};window.DC=h;window.$=h.sel})();