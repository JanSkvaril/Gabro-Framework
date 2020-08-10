# Gabro Framework 2.1
## Jak spustit
Stačí dvakrát kliknout na **run.bat**

## Jak s frameworkem pracovat
Vše se odehrává v souboru **App.jsx**. Pokaždé když uložíte změny, tak se stránka aktualizuje.
## Základní tagy html
* V html se vždy počítá jen jedna mezera, další se předělají na jednu
* Enter nic nedělá, pokud chcete odřádkovat použíjte odstavec
### Odstavec
`<p> Obsah odstavce </p>`
### Nadpis
* `<h1> Nadpis první úrovně </h1>`
* `<h2> Nadpis druhé úrovně </h2>`
* `<h3> Nadpis třetí úrovně </h3>`
* adtd..
### Formátování textu
* `<b> Tučný text </b>`
* `<i> Kurzíva </i>`



## Atributy
### Barva obecně
Barva se zapisuje dvěma způsoby, první je RGBa, druhý je HEX. Doporučuji použít [picker](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool) a ideálně použávat odzkoušené barvy [odsud](https://material.io/resources/color/#!/?view.left=0&view.right=0)
#### RGBa
`rgba(200,200,200,0.25)`

takže například:

`color="rgba(200,200,200,0.25)"`

Jednotlivé hodnoty:
1. Red 0 - 255
2. Green 0 - 255
3. Blue 0 - 255
4. Alpha/průhlednost  0 - 1
#### HEX
`#ff00ff`

V 16tkové soustavě. Například:

`color="#ff00ff"`
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

Dále je ještě možné přidat pomocí + na obrázek barva nebo gredient - musí být částečně průhledné aby byl obrázek vidět!! Obrazky by se měli dávat do složky **imgs**.
`bg={GetImage(require("./imgs/img2.jpg")) + " rgba(200,200,100,0.5) "}`
#### bgFilter
Slouží na aplikování "filtrů" na pozadí, nejčastější použití je na rozmazání pozadí:

`backdrop-filter: blur(10px)`

* Aby toto fungovalo, bg komponenty musí být částečně nebo uplně průhledné! 
* Hodnota 10px symbolizuje míru rozmazání - čím větší, tím větší rozmazání

## Komponenty
### Navbar
Navigační panel s odkazi na jednotlivé stránky

```jsx
<Navbar
    title="Firma skvělá"
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
* *title* - titulek, automaticky odkazuje na landing page
* *menu* - pole objektů ve formátu {text:"text linku", link: "#odkazNaKotvu"}
* *color* - barva pozadí navbaru
* *txtColor* - barva textu
* *trans* - když user scrollne uplně nahoru na stránce, tak navbar bude průhledný
* *bgFilter* - "backdrop-filter", například blur(5px)
* *version* - hodnoty: "v1" nebo "v2". Defaultní je v1. Přepíná verze navbaru

### Landing page
"Přístávací stránka" - první věc co se uživateli zobrazí.

```jsx
<LandingPage
    shadow
    link="#about_us" 
    bg="linear-gradient(#5918b6, #7b1fa2)"
    version="v1"
    color="red"
    orientation="right"
    img={ require('./path/to/img.png') }> // nezapomenout na >

    // Zde bude veškerý kontent jako text a tlačítka.
    <h1>Hlavní nadpis</h1>
    <h2>Podnadpis</h2>
    <p>Nějakej hezkej text.</p>
</ LandingPage>
```
> Je doporučené mít alespoň nadpis, podnadpis nebo nějaký jiný text. Je také možné sem vkládat např. tlačítka.

* `shadow` - je-li uveden, celá landing page bude vrhat stín na objekty pod ní (např. na další sekci).
* `link` - odkaz (kotva) kam má šipka dolů sjet.
  * Není-li `link` uveden, šipečka ve spodní části se ani nezobrazí. 
  * **Ikonka s linkem může na některých verzích landing page nebo rozlišeních zmizet!**
* `bg` - barva pozadí, gradient, obrázek atd.
* `color` - barva veškerého textu na landing page.
  * Chcete-li změnit barvu pouze nadpisu a zbytek nechat jinou barvou, můžete využít *in-line* styly:
    ```jsx
    <LandingPage
        color="black"
        ... >

        <h1 style={{ color: "red" }}>Hlavní nadpis</h1>
        <h2>Podnadpis</h2>
        <p>Nějakej hezkej text.</p>
    </ LandingPage>
    ``` 
    Pouze `h1` bude červený, zbytek černý.
    > Podobným postupem můžete nastavit i další vlastnosti textu, například velikost fontu, font, apd.

* `bgSize` - css styl `background-size`, default: `cover`.
* `textShadow` - přidá stín na nadpis (`h1`) a podnadpis (`h2`) pro lepší čitelnost.
* `version` - verze landing page. Přehled verzí [najdete zde](gabro_example).
* `orientation` - udává, na které straně bude text (na protější straně bude tedy obrázek či prázdné místo).
  * Hodnoty: `left` (text je vlevo), `right` (text je vpravo). 
  > Pokud verze landing page podporuje pouze zarovnání na střed či má specifické rozvrhnutí elementů, může být tato hodnota ignorována.
* `img` - obrázek, obvykle zobrazen vedle textu (např. u v2).
  > Pokud verze nepodporuje obrázek, argument bude ignorován.
* `orientationMobile` - udává, zda-li text bude nad obrázkem nebo pod obrázkem.
  * Hodnoty: `top` (text je nad obrázkem), `bot` (text je pod obrázkem). 
  * Samozřejmě platí pouze ve verzích kde je použit obrázek via `img` (výše).
* `iconColor` - barva ikonky ve spodní části landing page (scroll-down button s linkem).
* `blockColor` - barva blocku (například u v3).
* `blockOrientation` - orientace blocku (širší částí nahoře nebo dole).
  * Hodnoty: `top` (širší část nahoře), `bot` (širší část je dole). 
* `txtShadow` - nastavení, zda-li text bude mít stín nebo ne.
    ```jsx
    <LandingPage
        color="black"
        shadow // stačí pouze takto zmínit
        ... >

        <h1>Hlavní nadpis</h1>
        <h2>Podnadpis</h2>
        <p>Nějakej hezkej text.</p>
    </ LandingPage>
    ``` 
* `blockShape` - jak má block vypadat.
  * Hodnoty: `square` - čtvercový, `crossed` - lichoběžník

### Section
Sekce zabírá 100% šířku a nějakou výšku, může obsahovat cokoliv. Například rubriky jako o nás, služby a podobně. Dále třeba ceník, kontaktní formulář. Sekce navíc styluje určité tagy jako nadpisy, text a podobně, viz níže. Některé komponenty musí být v sekci.

```jsx
<Section 
    bg="linear-gradient(#5918b6, #7b1fa2)"
    shadow
    styled
    color="white">

    <Full>
        <h2>O nás</h2>
        <h3>Aneb něco</h3>
        <p>Nějaký text.</p>
    <Full>

</Section>
```
* *bg* - barva pozadí, gradient, obrázek atd
* *color* - barva textu
* *shadow* - má mít stín
* *backgroundSize* - css styl background-size, default: cover
* *line* - barva čáry v pravo od textu, nezobrazí se pokud nebude zadána
* *bgFilter* - "backdrop-filter", například blur(5px), apod.
* *paddingBot* - v px, kolik pixelů se má odsazovat odspodu
* *paddingTop* - v px, kolik pexelů se má odsazovat zvrchu
* *headline_align* - hodnoty "left" nebo "right", zarovná nadpisy na danou stranu, když nezadáno tak na prostředek
#### Half / Full / Row
Uvnitř **Section** vždy musí být buď **half**, **full** nebo **Row**. Na poloviny je normálně možné dávat další styly. 

Přepůlí sekci
```jsx
<Section>
    <Half>
        <p>Nějaký text.</p>
    </Half>
    <Half>
        <p>Nějaký text.</p>
    </Half>
</Section>
```

100% šířka 
```jsx
<Section>
    <Full>
        <p>Nějaký text.</p>
    </Full>
</Section>
```
 
Dává obsah do řady vedle sebe, ideální na karty
```jsx
<Section>
    <Row>
        <Card></Card>
        <Card></Card>
        <Card></Card>
    </Row>
</Section>
```

Na **všechny** lze použít následující atributy
* *bg* - pozadí, může být i obrázek, který se bude automaticky centrovat
* *color* - barva textu

Na **Half** lze ještě použít
* *line* - barva čáry v pravo od textu, nezobrazí se pokud nebude zadána
* *bgFilter* - "backdrop-filter", například blur(5px), apod.
#### Tagy speciálně stylované v Section
* `<table> <tr> <td>`
* `<h2> <h3>`
* `<p>`


### SnackMessages
Zobrazí zprávu v nějakém rohu. Zpráva může být succes, error, nebo jenom obyčejná zpráva.

```jsx
//komponenta, která někde musí být
<SnackMessages onRef={ref => (this.showMessage = ref)} />

...
//volání funkce - zobrazení zprávy
this.showMessage("Obě pole musí být vyplněny", "error");
```
#### *showMessage(*string zprava*, *string typ*)*
* *zprava* - samotný text, co se má zobrazovat
* *typ* - může být "succes", "error", "normal"

### ContactForm (beta)
Kontaktní formulář. Vyžaduje soubor send-mail.php v rootové složce finálního webu. V souboru se nastaví mail na který to má chodit, zak zhruba zpráva vypadá apod.

Měl by být v **Section**, importuje si SnackMessages. Není ještě úplně hotový, text fields se špatně upravuje barva, časem se bude mění, zatím používat bílé, nebo světlé pozadí

```jsx
<ContactForm shadow bg="white" color="black">
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
    shadow
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

### ImageSection (beta)
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


