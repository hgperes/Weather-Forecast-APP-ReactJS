import {useState} from 'react';
import { date } from 'yup';

function Search(props) {

    const [cidade, setCidade] = useState('');

    function searchInput(e) {
        e.preventDefault();
        setCidade("");
        let currentValue = document.querySelector('input[name=searchInput]').value;
        

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric&lang=pt`;
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const {main, name, sys, weather} = data;
                if (sys != undefined){
                if (weather != undefined){

                const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
                    weather[0]["icon"]}.svg`;
                    setCidade(`
                        <div class="containerCidade">
                           <p>Temperatura C: ${main.temp}º</p>
                            <p>Pressão: ${main.pressure} atm</p>
                            <p>Humidade do ar: ${main.humidity}%</p>
                            <p>Temperatura Mínima: ${main.temp_min}º</p>
                            <p>Temperatura Máxima: ${main.temp_max}º</p>
                            <p>País: ${sys.country}</p>
                            <p>Cidade: ${name}</p>
                            <p>${weather[0]['description']}</p>
                            <img src="${icon}" />
                        </div>
                        `);
            }
                }else{
                    setCidade("");
                
                }
            })
    }

  return(
    <div className='searchWrapper'>
    <div className="search">
        <h2>Digite a cidade e saiba a previsão climática em tempo real</h2>
        <form onSubmit={(e)=>searchInput(e)}>
        <input placeholder={props.placeholder} type='text' name='searchInput' />
        <input className='botao' type='submit' value='Pesquisar' />

        </form>

    </div>

    {
        (cidade !== '') ?
        <div dangerouslySetInnerHTML={{__html: cidade}} />:
        <div></div>
    }

    </div>
  )
}

export default Search;