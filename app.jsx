

/* La app principal */
class App extends React.Component {
	constructor(props){
		super(props);
		this.onDeleteItem = this.onDeleteItem.bind(this);
		this.onAddItem = this.onAddItem.bind(this);

		this.state = {laLista: []};
	}

	onDeleteItem(item){
		this.setState(prevState =>{
			console.log('App: Borrando item ' + item.toString());
			prevState.laLista.splice(item,1);
			return {laLista: prevState.laLista}
		})
	}
	onAddItem(item){
		this.setState(prevState => {
			prevState.laLista.push(item);
			console.log('App: Insertando item: ' + item);
			return {laLista: prevState.laLista}
		});
	}

	render(){
		return (
			<React.Fragment>
				<Formulario onAddItem={this.onAddItem}/>		
				<div className="panel panel-default">
					<div className="panel-heading">
						<h3 className="panel-title">Lista de tareas</h3>
					</div>
					<ul className="list-group">
						<ListaTareas onDeleteItem={this.onDeleteItem} lista={this.state.laLista}/>
					</ul>
				</div>
			</React.Fragment>
		);
	}
}
class Formulario extends React.Component{
	constructor(props){
		super(props);
		this.state = {value:''};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.input = React.createRef();
	}

	handleSubmit(event){
		event.preventDefault();
		console.log('Formulario: Damos al submit');
		if (this.props.onAddItem){
			this.props.onAddItem(this.state.value);
		}else{
			console.warn('Formulario: No se hace nada añadiendo');
		}
		this.setState({value:''});
		this.input.current.focus();

	}

	handleChange(event){
		this.setState({value: event.target.value});
	}

	render(){
	return(
			<form className="form-inline" onSubmit={this.handleSubmit}>
				<div className="form-group">
					<input className="form-control" name="elemento" type="text" 
						value={this.state.value} onChange={this.handleChange} ref={this.input} />
				</div>
				<input type="submit" className="btn btn-primary" value="Nueva"/>
			</form>
		);
	}
}

/* Funcion que pinta la lista */
function ListaTareas(props){

	const onClick = (elemento)=>{
		if (props.onDeleteItem){
			props.onDeleteItem(elemento);
		}else{
			console.warn('No se hace na en borrar');
		}

	}
	const lista = props.lista.map((item,index)=>
			<li className="list-group-item" onClick={ (item)=>{item.preventDefault();onClick(index)} } key={index.toString()}>{item}</li>
	);
	return lista;
}


ReactDOM.render(
	<App/>,
	document.getElementById("root")
);