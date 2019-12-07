# Gabro Framework 1.0
## Jak spustit
po naklonování:
`npm i`
pro spuštění:
`npm start`
## Komponenty
### Navbar
```
<Navbar
    tittle="Firma skvělá"
    menu={[{ text: "Test", link: "/" }]}
    color="#ff12aa" 
    txtColor="black" 
    trans={false}/>
```
* *tittle* - titulek, automaticky odkazuje na landing page
* *menu* - pole objektů ve formátu {text:"text linku", link: "/odkazNaKotvu"}
* *color* - barva pozadí navbaru
* *txtColor* - barva odkazů
* *trans* - jestli bude navbar na landing page průhledný - bool
