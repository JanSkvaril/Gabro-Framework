# Gabro Framework
## ⬇️ Please read this ⬇️
Please keep in mind that, this project is in early development.
## Introduction
This is Gabro Framework. Simple tool for fast web development. It provides same useful components that you can use separately on your project, or you can build your website using only our copmponents. 

The framework is very user friendly and don´t require much professional skills. It is also a simpler and cheaper option, than other websites we create. 
### About us
[Gabros services](https://www.gabros.cz/) is a starting project created to offer professional care of company image.

We are providing a wide scale of services, such as web programming, copywriting, management of social media sites or innovative graphic designing and many others.

### Development
Framework is built using React.js and Typescript. For buttons, inputs and icons we use [Material.ui](https://material-ui.com/). [Documentation](https://janskvaril.github.io/Gabro-Framework/) is generated by typedocs.

### Demo
How can website built with Gabro Framework look? Visit our [demo website](https://demo.gabros.cz/) and take a look. 

### Licence
MIT

## Gabro-Builder
We also develop a simple app for creating websites using this framework: [Gabro-Builder](https://github.com/JanSkvaril/Gabro-Builder). 

## installation
`npm i gabro-framework`

### Basic usage
Import any components you want to use:
```jsx
import {
  //Here write components you want to use
  //e.g. Section, LandingPage, Full, Half
} from 'gabro-framework'
```
And use them :)
```jsx

<Section styled={true} color="rgba(0,0,0,0.8)">
    <Half>
        <h2>Hello from Gabro-Framework!</h2>
        <p>And enjoy using it ❤️</p>
    </Half>
    <Half>  
        <h2>Need help?</h2>
        <p>Reading documentation may help 😊</p>
    </Half>
</Section>

```

## Documentation
Docs are generated by typedoc. You can find them [here](https://janskvaril.github.io/Gabro-Framework/) or you can clone this repozitory and generate them yourself by running:

    npm run docs

Documentation will then be in **docs/** directory

