//定义售楼处
var salesOffices = {};
//缓存列表，存放订阅者的回调函数
salesOffices.clientList = [];
//增加订阅者
salesOffices.listen = function(key,fn){
	//如果还没有订阅过此类消息，
	//给该类消息创建一个缓存列表
	if(!this.clientList[key]){
		this.clientList[key] = [];
	}
	//订阅的消息添加进缓存列表
	this.clientList[key].push(fn);
};
//发布消息
salesOffices.trigger = function(){
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
}
//下面是简单的测试
salesOffices.listen('squareMeter88',function(price){
	console.log('价格='+price);
})

salesOffices.listen('squareMeter110',function(price){
	console.log('价格='+price);
})

salesOffices.trigger('squareMeter88',2000000);
salesOffices.trigger('squareMeter110',3000000);

