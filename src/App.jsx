
import React, { Component } from 'react';

import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import Section from './components/Section/Section';
import './App.scss'

class App extends Component {



  render() {
    return (
      <div>
        <Navbar
          tittle="Firma skvělá"
          menu={[{ text: "Test", link: "/" }]}
          color="#ff12aa" txtColor="black" />
        <LandingPage
          mainTittle="Firma skvělá"
          secondaryTittle="Co je fakt super..."
          shadow={true}
          bg="linear-gradient(#5918b6, #7b1fa2)"
          color="white" />
        <Section

        >
          <div className="full">
            <h2>O nás</h2>
            <h3>Aneb něco</h3>
            <p>Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text (např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně atd.</p>
          </div>

        </Section>
        <Section
          bg="linear-gradient(#5918b6, #7b1fa2)"
          shadow={true}
          color="white"
        >
          <div className="half">
            <h2>Ceník:</h2>
            <table>
              <tr>
                <td>Služba</td>
                <td>Čas</td>
                <td>Cena</td>
              </tr>
              <tr>
                <td>Uklízení</td>
                <td>10:50</td>
                <td>10 000,-</td>
              </tr>
              <tr>
                <td>Něco jinýho</td>
                <td>10:00</td>
                <td>15 500,-</td>
              </tr>
            </table>
          </div>
          <div className="half">
            <p>Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se pozorovatel nechal svést ke čtení obsahu. </p>
          </div>
        </Section>
      </div>
    );
  }
}

export default App;