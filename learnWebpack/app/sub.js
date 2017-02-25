//CommonJS风格的代码
// function generateText(){
// 	var element = document.createElement('h2');
// 	element.innerHTML = 'Hello h3 world';
// 	return element;
// }

// module.exports = generateText;

//ES2015 风格的代码
export default function(){
	var element = document.createElement('h2');
	element.innerHTML = 'Hello h1 world';
	return element;
}