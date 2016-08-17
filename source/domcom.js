/*

DomCom framework, 2016,
Oleksii Shnyra, UABRO

*/
(function(){
'use strict';
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
      if(this.length){
        this.map(function(v){
          if (v.parentNode) {
              v.parentNode.removeChild(v);
          }
        })
      }else{
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
      }
    };
}
Element.prototype.css = function(obj) {
  var prop;
  if(typeof obj == 'string'){
    return this.style[obj];
  }
  for (var i in obj) {
    prop=obj[i];
    if(typeof prop!='string')prop+='px';
    this.style[i]=prop;
  }
  return this;
};
Element.prototype.resize = document.resize = function(obj) {
  var prop;
  console.log('ok');
};
Element.prototype.attr = function (a){
  if(typeof a=='string'){
    return this.getAttribute(a);
  }else{
    for(var b in a){
      this.setAttribute(b,a[b]);
    }
    return true;
  }
}
Element.prototype.show = function (v){
  if(!arguments.length)v='block';
  this.style.display = v;
}
Element.prototype.hide = function (){
  this.style.display = 'none';
}
Element.prototype.height = function (){
  return this.offsetHeight;
}
Element.prototype.width = function (){
  return this.offsetWidth;
}
Element.prototype.html = function (v){
  if(v){this.innerHTML=v;}else{
    return this.innerHTML;
  }
}
Element.prototype.val = function (v){
  if(v){this.value=v;}else{
    return this.value;
  }
}
Element.prototype.crec = function (){
  return this.getBoundingClientRect();
}

// actual initialization of DC

var DC = function(){
  var selfDC=this;
  this.version='1.8.2';
  if(!window.Worker){// support only IE10+
    selfDC.ready = function(){
      document.addEventListener("DOMContentLoaded",function(){
        document.body.innerHTML="<h1><b style='color:#000;padding:10px;'>You are using bad browser! What's wrong with you, man!???</b></h1>";
      });
    }
    return false;
  }
  var parseHTML = function(html,ctx){
    var a,el,ctxel,char,parent,closingtag,godown=-1,goup,
      quoted,dom,attris,tagready,tagstarted,intag,inspectag,
      text='',
      quote='',
      buf='';
    for(var i=0;i<html.length;i++){
      char=html[i];
      if(intag){// for operations between "<" && ">"
        if(tagready){
          if(char=='"'){
            quoted=!quoted;
            if(!quoted&&attris.length){
              a={};
              a[attris]=quote;
              attris='';
              el.attr(a);
            }
            quote='';
          }else
          if(quoted){
            quote+=char;
          }else{
            if(closingtag||char=='>'){
              if(char=='>'){
                intag=0;
                if(closingtag){
                  if(el&&el.parentNode)el=el.parentNode;
                  if(goup){
                    if(parent.parentNode)parent=parent.parentNode;
                    godown=0;
                  }else{
                    goup=1;
                    godown=0;
                  }
                }else
                if(el&&/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(el.tagName))el=el.parentNode;
                closingtag=0;
              }
            }else{
              if(char=='/'){
                closingtag=1;
              }else{
                if(/[^a-z0-9_]/i.test(char)){
                }else{attris+=char;}
              }
            }
          }
        }else{
          if(tagstarted){
            if(/[ >]/.test(char)){
              tagstarted=0;
              tagready=1;
              attris='';
              el=document.createElement(buf);
              if(dom&&parent){
                parent.appendChild(el);
              }else{
                parent=dom=el;
              }
              if(char=='>')intag=0;
              buf='';
            }else{
              buf+=char;
            }
          }else if(/[a-z0-9_]/i.test(char)){tagstarted=1;buf=char;}
        }
      }else
      if(inspectag){// for operations between "{" && "}"
        if(tagready){
          buf+=html[i-1];
          ctx[buf].insertIn(el);
          inspectag=0;
        }else{
          if(html[i+1]=='}'){
            tagready=1;
          }else{
            buf+=char;
          }
        }
      }else
      {
        if(char=='<'){
          intag=1;
          buf='';
          if(text.length&&el){el.appendChild(document.createTextNode(text));text='';}
          if(/[a-z0-9_]/i.test(html[i+1])){
            tagready=0;
            if(godown){
              parent=el;
              goup=0;
            }else{
              godown++;
              goup=0;
            }
          }else
          if(html[i+1]=='/'){
            closingtag=1;
          }
        }else
        if(char=='{'){
          inspectag=1;
          tagready=0;
          buf='';
          if(text.length&&el){el.appendChild(document.createTextNode(text));text='';}
        }else
        {
          text+=char;
        }
      }
    }
    return dom;
  }
  selfDC.ready = function(a){
    document.addEventListener("DOMContentLoaded",a);
  }
  var DCglo=[];
  var Groups={};// consist of arrays of reference to dcs
  var DCid = 0;
  var a,b,c;// temp reference
  // DC.all not recommed to be used in production mode
  // selfDC.all = function(){
  //   return DCglo;
  // }
  selfDC.sel = function (v,one){
    var el;
    if(typeof v=='object'){
      if(v===document){
        return document;
      }else{
        return v instanceof Element?v:v.el;
      }
    }else if(v[0]=='#'){
      el=document.getElementById(v.substr(1));
    }else{
      el=document.querySelectorAll(v);
    }
    if(one&&el.length)el=el[0];
    if(!el.length&&!(el instanceof Element))return false;
    return el;
  }
  selfDC.onwindow = function (e,f){
    window.addEventListener(e,f);
  }
  selfDC.forg = function(a,f){
    if(f){
      if(Groups[a])Groups[a].forEach(function(dc){
        f(dc);
      });
    }else{
      return Groups[a];
    }
  }
  var DomCom = function (obj){
    if(!obj){obj={};}else if(!obj.temp){
      DCglo.push(this);
    }
    if(obj.getSelf){
      obj.getSelf(this);
    }
    var self=this;
    this.id = ++DCid;
    this.state={};
    this.data={};
    this.eltype=obj.eltype?obj.eltype:'div';
    this.el=document.createElement(this.eltype);
    if(obj.extend){
      self.extend(obj.extend);
    }
    if(obj.state){
      for(var prop in obj.state){
        if(prop=='class'){
          self.state.class=obj.state[prop];
        }else{
          self.state[prop]=obj.state[prop];
        }
      }
    }
    if(obj.attrs){
      for(var prop in obj.attrs){
        a={};
        a[prop]=obj.attrs[prop];
        if(prop=='value'){self.state.val=obj.attrs[prop];}else{self.state[prop]=obj.attrs[prop];}
        self.el.attr(a);
      }
    }
    if(obj.groups){
      b=obj.groups;
      self.groups = b;
      a=Groups[b];
      if(a){
        Groups[b].push(self);
      }else{
        Groups[b]=[self];
      }
    }
    if(typeof obj.chapi=='function'){
      self.chapi=obj.chapi;
    }
    if(obj.init){
      self.init=obj.init;
      self.init();
    }else if(obj.initLater){
      self.init=obj.initLater;
    }
    if(obj.events){// should be last obj method
      self.addEvents(obj.events);
    }
  }
  // use prototype for performance reasons
  DomCom.prototype.parentEl=false;
  DomCom.prototype.insertIn = function (target){
    var el=selfDC.sel(target,1);
    el.appendChild(this.el);
    this.parentEl=el;
    return this.render();
  }
  DomCom.prototype.insertAs = function (target){
    var el=selfDC.sel(target,1);
    this.el=el;
    return this.render({});
  }
  DomCom.prototype.change = function (state,api){
    var only={},i=0;
    if(api){
      if(this.chapi&&state){// onChange API
        this.chapi(state);
        return;
      }
    }
    for(var b in state){
      this.state[b]=state[b],only[b]=true;
      if(['html','text','val','class'].indexOf(b)+1)i++;
    }
    if(i){this.render(only);}else{return this;}
  }
  DomCom.prototype.hasClass = function (v){
    var cl=this.state.class;
    if(cl&&cl.length){
      var i=cl?cl.indexOf(v)+1:false;
    }else{return false;}
    return i?i:false;
  }
  DomCom.prototype.addClass = function (v){
    var i=this.hasClass(v);
    if(!i){
      var cl=this.state.class;
      if(typeof cl=='string'&&cl.length)cl=cl.split(' ');
      cl?cl.push(v):cl=[v];
      this.change({class:cl});
      return true;
    }else{
      return false;
    }
  }
  DomCom.prototype.removeClass = function (v){
    var i=this.hasClass(v);
    if(i){
      var cl=this.state.class;
      if(cl){
        cl.splice(i-1);
        this.change({class:cl});
      }
      return true;
    }else{
      return false;
    }
  }
  DomCom.prototype.eventsArr = [];
  DomCom.prototype.intervalArr = [];
  DomCom.prototype.interval = function(f,t){
    this.intervalArr.push(setInterval(f,t));
  }
  DomCom.prototype.clearIntervals = function(){
    this.intervalArr.forEach(function(v){
      clearInterval(v);
    });
  }
  DomCom.prototype.timeoutArr = [];
  DomCom.prototype.timeout = function(f,t){
    this.timeoutArr.push(setTimeout(f,t));
  }
  DomCom.prototype.clearTimeouts = function(){
    this.timeoutArr.forEach(function(v){
      clearTimeout(v);
    });
  }
  DomCom.prototype.remove = function (){
    this.el.remove();
    this.removed=true;
    this.clearIntervals();
    return true;
  }
  DomCom.prototype.replaceWith = function(dc,ishtml){
    if(typeof dc=='string'){
      if(ishtml){
        dc=parseHTML(dc);
      }else{
        dc=document.createTextNode(dc);
      }
    }else
    if('el' in dc)dc=dc.el;
    this.el.parentNode.replaceChild(dc,this.el);
  }
  DomCom.prototype.parse = function(html,ctx){// parse string as html and insert accordingly contextual elements as dcs
    var dom=parseHTML(html,ctx);
    this.el=dom;
    if(dom.attr('class'))this.state.class=dom.attr('class');
    return this;
  }
  DomCom.prototype.extend = function(obj){// set or rewrite methods and properties of dc
    var self = this;
    for(var prop in obj){
      if(prop=='events'){
        self.addEvents(obj[prop]);
      }else{
        self[prop]=obj[prop];
      }
    }
  }
  DomCom.prototype.addEvents = function(obj){
    var self = this;
    for(var prop in obj){
      self.eventsArr.push(prop);
      self['on'+prop]=obj[prop];
      self.el.addEventListener(prop,self['on'+prop]);
    }
  }
  DomCom.prototype.DClist = function (v){
    var self = this;
    self.change({html:''});
    v.map(function(a){
      a.insertIn(self);
    });
    return self;
  }
  DomCom.prototype.render = function (only){
    var state=this.state,cs;
    if(only){
      if('html' in only)this.el.innerHTML=state.html;
      if('text' in only)this.el.textContent=state.text;
      if('val' in only)this.el.value=state.val;
      if('class' in only){
        cs=state.class;
        cs=typeof cs=='string'?cs:cs.join(' ');
        this.el.attr({class:cs});
      }
    }else{
      if(state.html&&state.html!=this.el.innerHTML)this.el.innerHTML=state.html;
      if(state.text&&state.text!=this.el.textContent)this.el.textContent=state.text;
      if(state.val&&state.val!=this.el.value)this.el.value=state.val;
      if(state.class){
        cs=state.class;
        cs=typeof cs=='string'?cs:cs.join(' ');
        this.el.attr({class:cs});
      }
    }
    return this;
  }
  selfDC.make = function(obj){
    if(typeof obj=='function')obj=obj();
    return new DomCom(obj);
  }
  selfDC.temp = function(obj){
    if(typeof obj=='function')obj=obj();
    if(typeof obj=='undefined')obj={};
    obj.temp=1;
    return new DomCom(obj);
  }
}
DC = new DC;

window.DC = DC;
window.$=DC.sel;

}());
