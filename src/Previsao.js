import React, { Component } from 'react';
import $ from 'jquery';
import Modal from 'react-awesome-modal'; 

export class Previsao extends Component{
  constructor(){
      super();
      this.state = {isShowTable : false, isShowModal : false,
        listCities:[], forecast : {}
      }; 
      this.openModal = this.openModal.bind(this);
    }

    componentDidMount(){   
      $.ajax({
        url:"http://localhost:8080/city/listAll",
        dataType: 'json',
        method:'get',
        success:function(response){    
          if(response == null){  
          this.setState({isShowTable:false});
        } else{
          console.log(response);
          this.setState({isShowTable:true,listCities:response});
          console.log(this.state.listCities);
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

    
    findWeather(idCity) {
      console.log(this.state.idCityClicked);
        $.ajax({
        url:"http://localhost:8080/city/findWeatherByIdCity",
        dataType: 'json',
        method:'get',
        data: ({id:idCity}),
        success:function(response){    
          if(response == null){  
            this.setState({isShowTable:false});
            alert("Houve um erro, tente novamente!")
          } else{
            console.log(response);
            this.setState({forecast:response});
            this.openModal();
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


      deleteCity(idCity) {
      console.log(this.state.idCityClicked);
        $.ajax({
        url:"http://localhost:8080/city/delete",
        dataType: 'json',
        contentType:'application/json',
        method:'post',
        data: JSON.stringify({id:idCity}),
        success:function(response){    
          if(!response){  
            alert("Houve um erro, tente novamente!")
          } else{
            alert("Cidade excluída com sucesso!");
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
    openModal(){
      this.setState({isShowModal : true });
    }

    closeModal() {
      this.setState({
          visible : false
      });
    }

    render(){

      const TableWeather = () =>(
        <div>
          <div>
            <h2>{this.state.forecast.id}, {this.state.forecast.country}</h2>
          </div>
          <div style={{overflowY:'scroll',width:'800px', height:'600px'}}>
              <table className="pure-table" >

                    <thead>
                     <tr> 
                        <th>Dia</th>
                        <th>Hora</th>
                        <th>Mínima</th>
                        <th>Máxima</th>
                        <th>Previsão do Clima</th>
                        <th>Umidade</th>
                      </tr>                          
                    </thead>
                    <tbody>    
                    {
                        this.state.forecast.listWeatherDay.map(function(weather){
                            return(                   
                                <tr key={this.state.forecast.id}>
                                  <td>{weather.date}</td>
                                  <td>{weather.hour}</td>
                                  <td>{weather.min}°</td>
                                  <td>{weather.max}°</td>
                                  <td>{weather.description}</td>
                                  <td>{weather.humidity}%</td>
                                </tr>
                            )
                        },this)
                      }           
                    </tbody>
                  </table>
              </div>  
          </div>
      )

      const TableCities = () => (

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
                  this.state.listCities.map(function(city){
                    return(
                        <tr key={city.id}>
                          <td>{city.id}</td>
                          <td>{city.name}</td>
                          <td>{city.country}</td>
                          <td>{city.population}</td>
                          <td><button type="submit" className="pure-button pure-button-primary" onClick={() => this.findWeather(city.id)}>Visualizar</button>
                          <button type="submit" className="pure-button pure-button-primary" onClick={() => this.deleteCity(city.id)}>Excluir</button></td>
                        </tr> 
                    )
                  }, this)
                }
              </tbody>
            </table>
            <div> 
                <Modal visible={this.state.isShowModal} width="800" height="600" effect="fadeInUp" onClickAway={() => this.setState({isShowModal:false})}>
                    <div>
                       {this.state.isShowModal && <TableWeather/>}
                    </div>
                </Modal>
              </div> 
          </div>           
        )

      return(
          <div id="main">
              <div className="header">
                <h1>Lista de cidades cadastradas</h1>
              </div>
              <div>
               {this.state.isShowTable && <TableCities/>}
              </div>
          </div>
          );
    }
}

export default Previsao;