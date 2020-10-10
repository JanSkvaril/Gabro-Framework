const fs = require('fs');


function ParseComponent(path, props_name, name) {
    let output = fs.readFileSync(path).toString();
    output = output.split(props_name)[1];

    let can_be_in = output.split("**Can be in:**")[1].split("\n")[0];
    can_be_in = can_be_in.replace("\r", "").replace(" ", "");
    can_be_in = can_be_in.split(", ");
    console.log(can_be_in);

    output = output.split("\n");



    let component = {
        name: name,
        props: [],
        can_be_in: can_be_in,
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
        props: component.props,
        can_be_in: component.can_be_in
    }
}
result.components["Text"] = {
    props: [{
        "name": "children?",
        "type": "ritch"
    }],
    can_be_in: ["Full", "Half", "Footer", "LandingPage", "Card", "ContactForm"]
}

fs.writeFile("./GabroConfig.json", JSON.stringify(result), (e) => {
    console.log(e);
});