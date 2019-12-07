# Gabro Framework 1.0
## Jak spustit
po naklonování:
`npm i`
pro spuštění:
`npm start`
## Komponenty
### Navbar
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

