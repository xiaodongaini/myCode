var event = {
	//缓存列表，存放订阅者的回调函数
	clientList: [],
	listen: function(key,fn){
		//如果还没有订阅过此类消息，
		//给该类消息创建一个缓存列表
		if(!this.clientList[key]){
			this.clientList[key] = [];
		}
		//订阅的消息添加进缓存列表
		this.clientList[key].push(fn);
	},
	trigger: function(){
		//取出消息类型和该消息类型对应的回调函数集合
		var key = Array.prototype.shift.call(arguments),
			fns = this.clientList[key];
		//如果没有订阅该消息，则返回
		if(!fns||fns.length===0){
			return false;
		}
		for(var i = 0,fn; fn = fns[i++];){
			//arguments是发布消息时带上的参数
			fn.apply(this,arguments);
		}
	},
	remove: function(key,fn){
		var fns = this.clientList[key];
		//如果key对应的消息没有别人订阅，则直接返回
		if(!fns){
			return false;
		}
		if(!fn){
			fns && (fns.length = 0);
		}else{
			for(var l=fns.length-1;l>=0;l--){
				var _fn = fns[l];
				if(_fn === fn){
					fns.splice(l,1);
				}
			}
		}
	}
};
//这个函数可以给所有的对象都动态安装发布-订阅功能
var installEvent = function(obj){
	for(var i in event){
		obj[i] = event[i];
	}
};

var salesOffices = {};
installEvent(salesOffices);

salesOffices.listen('squareMeter88',fn1=function(price){
	console.log('价格1='+price);
})

salesOffices.listen('squareMeter88',fn2=function(price){
	console.log('价格2='+price);
})

salesOffices.remove('squareMeter88',fn1);
salesOffices.trigger('squareMeter88',6000000);