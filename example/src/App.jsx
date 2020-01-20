
import React, { Component } from 'react';

import { Navbar, LandingPage, Section, Gallery, Card } from 'gabro_framework'; //imports framework
import './App.scss'; //custom css
import AndroidIcon from '@material-ui/icons/Android';
console.log(Navbar)
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
            <Card
              shadow={true}
              iconBg="rgb(255, 18, 170)"
              iconColor="white"
              conBg="white"
              conColor="black"
              headline="služby"
              icon={<AndroidIcon />}>
              Kontent
            </Card>
          </div>
        </Section>

        <Section>
          <div className="full">
            <Gallery imgs={(() => {
              let a = []
              for (; a.length < 4;) {

                a.push(require("./imgs/" + (a.length + 1) + "_img.jpg"));
                console.log(a);
              }
              return a;
            }
            )()} />
          </div>
        </Section>


      </div>
    );
  }
}

export default App;