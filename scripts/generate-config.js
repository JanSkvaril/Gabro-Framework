const fs = require('fs');


function ParseComponent(path, props_name, name) {
    let output = fs.readFileSync(path).toString();
    output = output.split(props_name)[1];
    output = output.split("\n");
    let component = {
        name: name,
        props: [],
        syntax: syntax
    }
    for (let line of output) {
        line = line.trim();
        if (line.length == 0) continue;
        if (line[0] == "}") break;
        if (line[0] != "/" && line[0] != "*") {
            let splited = line.split(":");
            let name = splited[0].trim();
            let type = splited[1].trim().replace(",", "");
            component.props.push({
                name: name,
                type: type,
            })
        }

    }
    return component;
}
let components = [];
//components.push(ParseComponent('./src/ContactInfo/ContactInfo.tsx', "interface Props {", "ContactInfo"));
components.push(ParseComponent('./src/Section/Section.tsx', "interface PartProps {", "Full"));
components.push(ParseComponent('./src/Section/Section.tsx', "interface PartProps {", "Half"));
components.push(ParseComponent('./src/Section/Section.tsx', "interface Props {", "Section"));
components.push(ParseComponent('./src/Navbar/Navbar.tsx', "interface Props {", "Navbar"));
components.push(ParseComponent('./src/Footer/Footer.tsx', "interface Props {", "Footer"));
components.push(ParseComponent('./src/Card/Card.tsx', "interface Props {", "Card"));
components.push(ParseComponent('./src/ContactForm/ContactForm.tsx', "interface Props {", "ContactForm"));
components.push(ParseComponent('./src/LandingPage/LandingPage.tsx', "interface Props {", "LandingPage"));

let result = {
    components: {}
}
for (let component of components) {
    result.components[component.name] = {
        props: component.props
    }
}

fs.writeFile("./GabroConfig.json", JSON.stringify(result), (e) => {
    console.log(e);
});
