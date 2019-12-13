# Gabro Framework 1.0
## Jak spustit
po naklonování:
`npm i`
pro spuštění:
`npm start`
## Komponenty
### Navbar
Navigační panel s odkazi na jednotlivé stránky

`import Navbar from './components/Navbar/Navbar';`

```
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

### Landing page
"Přístávací stránka" - první věc co se uživateli zobrazí

`import LandingPage from './components/LandingPage/LandingPage';`
```
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

### Section
Sekce zabírá 100% šířku a nějakou výšku, může obsahovat cokoliv. Například rubriky jako o nás, služby a podobně. Dále třeba ceník, kontaktní formulář. Sekce navíc styluje určité tagy jako nadpisy, text a podobně, viz níže. Některé komponenty musí být v sekci.

`import Section from './components/Section/Section';`
```
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
```
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
```
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

```
<SnackMes />

...

showMessage("Zpráva byla úspěšně odeslána, děkujeme!", "succes");
```
#### *showMessage(*string zprava*, *string typ*)*
* *zprava* - samotný text, co se má zobrazovat
* *typ* - může být "succes", "error", "normal"


