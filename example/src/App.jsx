
import React, { Component } from 'react';

import { Navbar, LandingPage, Section, Gallery, Card, ContactInfo, ContactForm } from 'gabro_framework'; //imports framework
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
        <Section styled

        >
          <div className="full">
            <h2>O nás</h2>
            <h3>Aneb něco</h3>
            <h4>Malej uplně</h4>
            <p>Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text (např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně atd.</p>
          </div>

        </Section>
        <Section
          bg="linear-gradient(#5918b6, #7b1fa2)"
          shadow={true}
          color="white"
        >
          <div className="half">
            <ContactInfo
              phone={[
                { name: "Honza Nějaký", number: "776555222" },
                { name: "Honza Jiný", number: "752252358" }]}
              place="Někde super"
              email={[{ name: "Franta Zahradník", email: "franta@zahr.cz" }]}
              facebook="https://www.google.com/" />

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
              Možnost stravování formou snídaní, polopenzí i plnou penzí. Připravíme pro Vás svatbu, rodinnou oslavu, firemní večírek, rauty a jiné.
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
        <Section styled>
          <div className="full">
            <h2>Nadpis</h2>
          </div>
          <div className="half">
            <p>Pokud by se pro stejný účel použil smysluplný text, bylo by těžké hodnotit pouze vzhled, aniž by se pozorovatel nechal svést ke čtení obsahu. Pokud by byl naopak použit nesmyslný, ale pravidelný text (např. opakování „asdf asdf asdf…“), oko by při posuzování vzhledu bylo vyrušováno pravidelnou strukturou textu, která se od běžného textu liší. Text lorem ipsum na první pohled připomíná běžný text, slova jsou různě dlouhá, frekvence písmen je podobná běžné řeči, interpunkce vypadá přirozeně atd.</p>

          </div>
          <div className="half">
            <h3 id="info">Otevírací doba:</h3>
            <table>
              <tbody>
                <tr>
                  <td>pondělí</td>
                  <td colSpan="2">zavřeno</td>
                </tr>
                <tr>
                  <td>úterý</td>
                  <td>10:30</td>
                  <td>23:00</td>
                </tr>
                <tr>
                  <td>středa</td>
                  <td>10:30</td>

                  <td>23:00</td>
                </tr>
                <tr>
                  <td>čtvrtek</td>
                  <td>10:30</td>
                  <td>23:00</td>
                </tr>
                <tr>
                  <td>pátek</td>
                  <td>10:30</td>
                  <td>23:00</td>
                </tr>
                <tr>
                  <td>sobota</td>
                  <td>10:30</td>
                  <td>23:00</td>
                </tr>
                <tr>
                  <td>neděle</td>
                  <td>10:30</td>
                  <td>23:00</td>
                </tr>

              </tbody>
            </table>
          </div>
        </Section>


      </div>
    );
  }
}

export default App;