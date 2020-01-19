# Gabro Framework 1.0
## Jak spustit
V počítači je nutno mít nainstalováno Node.js!!!!

po naklonování:
`npm i`
pro spuštění:
`npm start`

Hlavní frameworky: material-ui, React.js
## Theming
U většiny komponent jde nastavit pozadí, barva apod. avšak u komponentů, které používají material-ui (tlačítka, inputy,...) se barva nastavuje v soubory **index.jsx** následovně:
```jsx
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#ff00ff",
            contrastText: "#ffffff"
        },
        secondary: {
            main: "#FFBC42",
            contrastText: "#000000"
        }
    },
});
```
## Constanty
#### SASS
Minimální rozlišení
```
$break-medium: 800px;
$break-large: 1300px;
```
## Jak s frameworkem pracovat
Vše se odehrává v souboru **App.jsx**, ten v základu vypadá nějak takto:
```jsx
import React, { Component } from 'react';

//zde se importují komponenty
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';

import './App.scss'

class App extends Component {
  render() {
    return (
      <div>
        //zde se jednotlivé komponenty vkládají
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
      </div>
    );
  }
}

export default App;
```
Pro dodatečné stylování slouží **App.scss**, ale smyslem frameworku je co nejméně používat vlastní styli.
## Komponenty
### Navbar
Navigační panel s odkazi na jednotlivé stránky

`import Navbar from './components/Navbar/Navbar';`

```jsx
<Navbar
    tittle="Firma skvělá"
    menu={
            [{ text: "Test1", link: "/" },
            { text: "Test2", link: "/" }]
        }
    color="#ff12aa" 
    txtColor="black" 
    trans={false}/>
```
* *tittle* - titulek, automaticky odkazuje na landing page
* *menu* - pole objektů ve formátu {text:"text linku", link: "/odkazNaKotvu"}
* *color* - barva pozadí navbaru
* *txtColor* - barva odkazů
* *trans* - jestli bude navbar na landing page průhledný - bool
* *bgFilter* - "backdrop-filter", například blur(5px), apod.

### Landing page
"Přístávací stránka" - první věc co se uživateli zobrazí

`import LandingPage from './components/LandingPage/LandingPage';`
```jsx
<LandingPage
    mainTittle="Firma skvělá"
    secondaryTittle="Co je fakt super..."
    shadow={true}
    bg="linear-gradient(#5918b6, #7b1fa2)" />
```
* *mainTittle* - hlavní titulek
* *secondaryTittle* - podtitulek (nemusí být)
* *shadow* - má mít boxshadow - bool
* *bg* - co by bylo normálně psáno do css vlastnosti background
* *color* - barva textu
* *bgSize* - css styl background-size, default: cover

### Section
Sekce zabírá 100% šířku a nějakou výšku, může obsahovat cokoliv. Například rubriky jako o nás, služby a podobně. Dále třeba ceník, kontaktní formulář. Sekce navíc styluje určité tagy jako nadpisy, text a podobně, viz níže. Některé komponenty musí být v sekci.

`import Section from './components/Section/Section';`
```jsx
<Section 
    bg="linear-gradient(#5918b6, #7b1fa2)"
    shadow={true}
    color="white">

    <div className="full">
        <h2>O nás</h2>
        <h3>Aneb něco</h3>
        <p>Nějaký text.</p>
    </div>

</Section>
```
* *bg* - co by bylo normálně psáno do css vlastnosti background
* *color* - barva textu
* *shadow* - má mít boxshadow - bool

#### half / full
Uvnitř **Section** vždy musí být buď **half** nebo **full**. Na poloviny je normálně možné dávat další styly. 

Přepůlí sekci
```jsx
<Section>
    <div className="half">
        <p>Nějaký text.</p>
    </div>
    <div className="half">
        <p>Nějaký text.</p>
    </div>
</Section>
```

100% šířka 
```jsx
<Section>
    <div className="full">
        <p>Nějaký text.</p>
    </div>
</Section>
```

#### Tagy speciálně stylované v Section
* `<table> <tr> <td>`
* `<h2> <h3>`
* `<p>`

### SnackMessages
Zobrazí zprávu v nějakém rohu. Zpráva může být succes, error, nebo jenom obyčejná zpráva.

`import SnackMessages, { showMessage } from './SnackMessages/SnackMessages';`

```jsx
<SnackMes />

...

showMessage("Zpráva byla úspěšně odeslána, děkujeme!", "succes");
```
#### *showMessage(*string zprava*, *string typ*)*
* *zprava* - samotný text, co se má zobrazovat
* *typ* - může být "succes", "error", "normal"

### ContactForm (beta)
Kontaktní formulář. Vyžaduje soubor send-mail.php v rootové složce finálního webu. V souboru se nastaví mail na který to má chodit, zak zhruba zpráva vypadá apod.

Měl by být v **Section**, importuje si SnackMessages. Není ještě úplně hotový, text fields se špatně upravuje barva, časem se bude mění, zatím používat bílé, nebo světlé pozadí

`import ContactForm from './components/ContactForm/ContactForm';`
```jsx
<ContactForm shadow={true} bg="white" color="black">
    <h2>Kontaktní formulář</h2>
    <p>A možná vám odepíšem ;)</p>
</ContactForm>
```
* *bg* - co by bylo normálně psáno do css vlastnosti background
* *color* - barva textu
* *shadow* - má mít boxshadow - bool
#### Podporované tagy 
* `<h2>` - měl by být pouze jeden kvůli responzivitě, zarovnán na prostředek
* `<p>` - zarovnán do prava
