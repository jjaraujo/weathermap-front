import React, { Component } from 'react';
import $ from 'jquery';

export class FindCity extends Component{
	constructor(){
	    super();
    console.log("Construtor do city");
	    this.state = {isShowTable : false, text:'',
	    	forecast:{}
			}; 
	    this.setText = this.setText.bind(this);
	    this.findCity = this.findCity.bind(this);
   		this.sendCity = this.sendCity.bind(this);
    }

    findCity(event){ 
      	event.preventDefault();  
    	$.ajax({
        url:"http://localhost:8080/city/findCity",
        dataType: 'json',
        method:'get',
        data: ({text:this.state.text}),
        success:function(response){    
          if(response.city == null){   
          alert(response.message);
          this.setState({isShowTable:false});
        } else{
          this.setState({isShowTable:true,forecast:response});
        }
        }.bind(this),
        
        error: function(response){
        console.log("erro");
        }
    } 
    ).fail(function(jqXHR, textStatus, msg){
        console.log("Errroooooo");
     });        
  	}

   sendCity(event){
    event.preventDefault();    
    console.log(this.state.forecast);
    $.ajax({
      url:'http://localhost:8080/city/save',
      contentType:'application/json',
      dataType:'json',
      type:'post',
      data: JSON.stringify({city:this.state.forecast.city}),
      success: function(response){  
        alert("Cidade salva com sucesso");   
        this.setState({isShowTable:false,forecast:[],text:''}); 
      }.bind(this),
      error: function(response){
        console.log("erro");
      }      
    });
  }

  setText(event){
    this.setState({text:event.target.value});
  }

    render(){
	const TableCity = () => (
      <div>            
        <table className="pure-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>País</th>
              <th>População</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {
                <tr key={this.state.forecast.city.id}>
                  <td>{this.state.forecast.city.id}</td>
                  <td>{this.state.forecast.city.name}</td>
                  <td>{this.state.forecast.city.country}</td>
                  <td>{this.state.forecast.city.population}</td>
                  <td><button type="submit" className="pure-button pure-button-primary"  onClick={this.sendCity}>Salvar</button></td>
                </tr> 
            }
          </tbody>
        </table> 
      </div>           
    )

    	return(
          <div id="main">
              <div className="header">
                <h1>Cadastrar cidades</h1>
              </div>
              <div className="content" id="content">
                <div className="pure-form pure-form-aligned" >
                  <form className="pure-form pure-form-aligned" onSubmit={this.findCity} method='post'>
                    <div className="pure-control-group">
                      <input id="text" type="text" name="text" label="Ex: Washington, US ou -19.88, 84.66 ou 12345" onChange={this.setText} /> 
                      <button type="submit" className="pure-button pure-button-primary">Procurar</button>                 
                    </div> 
                  </form>  
                </div>  
                <div>
                 {this.state.isShowTable && <TableCity/>}
                </div>
              </div>
          </div>
          );
    }
}

export default FindCity;