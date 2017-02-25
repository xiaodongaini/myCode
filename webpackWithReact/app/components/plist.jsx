import React from 'react';
import get from '../utils/ajax';

export default class Plist extends React.Component{
	constructor(props){
		super(props);
		this.state = {"loading":false,"list":[]};
	}
	//初次渲染完毕之后 设置该组件的属性firstView为true
	componentDidMount(){
		this.setState({"firstView":true});
	}
	//当传入的props有变化，就是时候发起请求，更新列表的内容了
	componentWillReceiveProps(nextProps){
		let keyword = nextProps.keyword;
		this.setState({"loading":true,"firstView":false});
		let url = `https://api.github.com/search/users?q=${keyword}`;
		get(url).then((data)=>{
			this.setState({
				"loading":false,
				"list":data.items
			});
		}).catch((error)=>{
			console.error(error);
		});
	}

	render(){
		const imgStyle = {
			width: '50px'
		}
		if(this.state.firstView){
			return (
				<h2>Enter name to search</h2>
			)
		}
		if(this.state.loading){
			return (
				<h2>Loding result...</h2>
			)
		}else{
			if(this.state.list.length===0){
				return(
					<h2>No result</h2>
				)
			}else{
				return (
					<div className="row">
						{this.state.list.map((people,index)=>{
							return (
								<div className="card" key={index}>
									<img src={people.avatar_url} style={imgStyle} />
									<p className="card-text">
										{people.login}
									</p>
								</div>
							)
						})}
					</div>
				);
			}
		}
	}
}	
