DC.module('player',function(mctx){
if(mctx.foo){
	console.log("Hi, I'm loaded module. And I know that foo is",mctx.foo);
}

var info = DC.temp({
	state: {
		text: 'Content from loaded module component'
	}
});
var dc_module = DC.temp(function(){
//////
var text = DC.temp();
var button = DC.temp({
	eltype: 'button',
	state: {
		text: 'play'
	},
	events: {
		click(){
			text.change({text: "I'm playing a video. Just imagine it. " + Date.now()});
		}
	}
});
return {
	state: {
		class: 'module module-player'
	},
	init(){
		this.DClist([info,text,button]);
	}
}
//////
});

var interval = setInterval(function(){
	info.change({text:"I'm still running. timestamp is " + Date.now()});
},20);

return {
//////
dc: dc_module,
// provide API methods
api: {
	stop(){
		if(interval){
			console.log("interval in module was cleared by API");
			clearInterval(interval);
		}
	},
	play(){
		if(interval)clearInterval(interval);
		interval = setInterval(function(){
			info.change({text:"I'm running again. timestamp is " + Date.now()});
		},20);
	}
}
//////
}
});