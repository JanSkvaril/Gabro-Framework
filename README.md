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

### Atributy
#### Barva obecně
Barva se zapisuje dvěma způsoby, první je RGBa, druhý je HEX. Doporučuji použít [picker](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool) a ideálně použávat odzkoušené barvy [odsud](https://material.io/resources/color/#!/?view.left=0&view.right=0)
##### RGBa
`rgba(200,200,200,0.25)`

Jednotlivé hodnoty:
1. Red 0 - 255
2. Green 0 - 255
3. Blue 0 - 255
4. Alpha/průhlednost  0 - 1
##### HEX
`#ff00ff`

V 16tkové soustavě 
#### bg
U hodně komponent se oběvuje atribut bg. Do toho lze dát barvu, gradient a nebo obrázek
##### Barva
`bg="#ff00ff"`
##### Gradient
Je přechod z jedné barvy do druhé

`bg="linear-gradient(#5918b6, #7b1fa2)"`
##### Image
Používá se tak, že místo "nějaká barva" se napíše toto: 

`bg={GetImage(require("./imgs/img2.jpg"))}`

Je možné i měnit pozici obrázku pomocí +:

`bg={GetImage(require("./imgs/img2.jpg")) + " center "}`

Víc o různých pozicích [zde](https://www.w3schools.com/cssref/pr_background-position.asp)

Dále je ještě možné přidat pomocí + na obrázek barva nebo gredient - musí být částečně průhledné aby byl obrázek vidět!!
`bg={GetImage(require("./imgs/img2.jpg")) + " rgba(200,200,100,0.5) "}`
#### bgFilter
Slouží na aplikování "filtrů" na pozadí, nejčastější použití je na rozmazání pozadí:

`backdrop-filter: blur(10px)`

* Aby toto fungovalo, bg komponenty musí být částečně nebo uplně průhledné! 
* Hodnota 10px symbolizuje míru rozmazání - čím větší, tím větší rozmazání

## Komponenty
### Navbar
Navigační panel s odkazi na jednotlivé stránky

`import Navbar from './components/Navbar/Navbar';`

```jsx
<Navbar
    tittle="Firma skvělá"
    menu={
            [
                { text: "O nás", link: "#about_us" },
                { text: "Služby", link: "#services" },
                { text: "Ceník", link: "#cenik" },
                { text: "Kontakt", link: "#contact" }
            ]
        }
    color="#ff12aa" 
    txtColor="black" 
    trans={true}
    bgFilter="blur(5px)"/>
```
* *tittle* - titulek, automaticky odkazuje na landing page
* *menu* - pole objektů ve formátu {text:"text linku", link: "#odkazNaKotvu"}
* *color* - barva pozadí navbaru
* *txtColor* - barva textu
* *trans* - když user scrollne uplně nahoru na stránce, tak navbar bude průhledný
* *bgFilter* - "backdrop-filter", například blur(5px)

### Landing page
"Přístávací stránka" - první věc co se uživateli zobrazí

`import LandingPage from './components/LandingPage/LandingPage';`
```jsx
<LandingPage
    mainTittle="Firma skvělá"
    secondaryTittle="Co je fakt super..."
    shadow={true}
    link="#about_us" 
    bg="linear-gradient(#5918b6, #7b1fa2)" />
```
* *mainTittle* - hlavní titulek
* *secondaryTittle* - podtitulek (nemusí být)
* *shadow* - má mít stín
* *bg* - barva pozadí, gradient, obrázek atd.
* *color* - barva textu
* *bgSize* - css styl background-size, default: cover
* *link* - odkaz (kotva) kam má šipka dolů sjet
* *textShadow* - přidá text shadow na nadpis a podnadpis pro lepší čitelnost

### Section
Sekce zabírá 100% šířku a nějakou výšku, může obsahovat cokoliv. Například rubriky jako o nás, služby a podobně. Dále třeba ceník, kontaktní formulář. Sekce navíc styluje určité tagy jako nadpisy, text a podobně, viz níže. Některé komponenty musí být v sekci.

`import Section from './components/Section/Section';`
```jsx
<Section 
    bg="linear-gradient(#5918b6, #7b1fa2)"
    shadow={true}
    styled
    color="white">

    <div className="full">
        <h2>O nás</h2>
        <h3>Aneb něco</h3>
        <p>Nějaký text.</p>
    </div>

</Section>
```
* *bg* - barva pozadí, gradient, obrázek atd
* *color* - barva textu
* *shadow* - má mít stín
* *backgroundSize* - css styl background-size, default: cover

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
<SnackMessages onRef={ref => (this.showMessage = ref)} />

...

this.showMessage("Obě pole musí být vyplněny", "error");
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
* *formColor* - barva formulářovích políček (email, zpráva)
* *buttonColor* - barva tlačítka odeslat
#### Podporované tagy 
* `<h2>` - měl by být pouze jeden kvůli responzivitě, zarovnán na prostředek
* `<p>` - zarovnán do prava

### Card
Karty, ideální pro služby a podobně. Do prostoru icon jde dát buď ikonku, nebo bacground-image

```jsx
 <Card
    shadow={true}
    iconBg="rgb(255, 18, 170)"
    iconColor="white"
    conBg="white"
    conColor="black"
    headline="služby"
    height="310px"
    icon={<AndroidIcon />}>
        Kontent
</Card>
```
* *shadow* - má mít stín
* *iconBg* - background styly prostoru pro icon
* *iconColor* - barva nadpisu a ikonky v prostoru icon
* *conBg* - background styly prostoru pro dolní část
* *conColor* - barva textu pro dolní část
* *headline* - nadpis pod icon
* *icon* - svg které bude vloženo jako icon
* *bgFilter* - "backdrop-filter", například blur(5px), apod.
* *height* - výška celé karty v pixelech, pokud není uvedeno tak bude 310px

### ImageSection
Obsahuje na polovině orbázek a na polovině text

```jsx
    <ImageSection
        title="A i vaříme!"
        img={require("./imgs/img1.jpg")}
        line_color="#ff00ff"
        img_position="to_edge"
        img_align="left"
        txt_color="purple"
        >
            <p>Text</p>
    </ImageSection>
```
* *title* - hlavní titulek
* *sub_title* - podtitulek
* *title_color* - barva titulku
* *sub_title_color* - barva podtitulku
* *txt_color* - barva textu
* *img* - pomocí samotného require
* *alt* - alt k img
* *line_color* - barva čáry u textu, pokud nebude uvedena, čára se nezobrazí
* *img_align* - "left" nebo "right", jestli má být obrázek vpravo nebo vlevo
* *img_align_mobile* - "top" nebo "bot", kde má být obrázek na mobilních rozlišeních
* *img_position* - "to_edge", obrázek bude až po okraj obrazovky
* *img_full_width_mobile* - {true} nebo {false}, jestli má být po okraj obrazovky na mobilech

### ContactInfo
Pro kontaktní informace
```jsx
    <ContactInfo
        email={[
            {name:"Kontaktní email:",email:"nejaky@email.cz"},
            {name:"Kontaktní email:",email:"nejaky@email.cz"}
        ]}
        phone={[
            {name:"Telefon:",number:"777555777"},
            {name:"Telefon 2:",number:"777555777"}
        ]}
        place="Adresa 123"
        facebook="https://www.facebook.com/NejakyFb"
    />
```
* *phone* - telefon, pole objektů {name:"string",number:"string"}, nepsát mezery mezi čísla!
* *mobile* - mobil, pole objektů {name:"string",number:"string"}, nepsát mezery mezi čísla!
* *email* - email, pole objektů {name:"string",email:"string"}
* *place* - adresa, "string"
* *facebook* - url na facebook
* *other* ostatní (bez ikonky), pole objektů {name:"string",text:"string"}


