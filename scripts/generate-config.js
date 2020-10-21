const fs = require('fs');


function ParseComponent(path, props_name, name) {
    let output = fs.readFileSync(path).toString();
    output = output.split(props_name)[1];

    let can_be_in = output.split("**Can be in:**")[1].split("\n")[0];
    can_be_in = can_be_in.replace("\r", "").replace(" ", "");
    can_be_in = can_be_in.split(", ");

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
components.push(ParseComponent('./src/ContactInfo/ContactInfo.tsx', "interface Props {", "ContactInfo"));
components.push(ParseComponent('./src/ContactInfo/ContactInfo.tsx', "interface PhoneProps {", "ContactPhone"));
components.push(ParseComponent('./src/ContactInfo/ContactInfo.tsx', "interface SocialProps {", "ContactSocial"));
components.push(ParseComponent('./src/ContactInfo/ContactInfo.tsx', "interface EmailProps {", "ContactEmail"));
components.push(ParseComponent('./src/ContactInfo/ContactInfo.tsx', "interface PlaceProps {", "ContactPlace"));
components.push(ParseComponent('./src/ImageSection/ImageSection.tsx', "interface Props {", "ImageSection"));
components.push(ParseComponent('./src/Section/Section.tsx', "interface PartProps {", "Row"));
components.push(ParseComponent('./src/Section/Section.tsx', "interface PartProps {", "Full"));
components.push(ParseComponent('./src/Section/Section.tsx', "interface PartProps {", "Half"));
components.push(ParseComponent('./src/Section/Section.tsx', "interface Props {", "Section"));
components.push(ParseComponent('./src/Navbar/Navbar.tsx', "interface Props {", "Navbar"));
components.push(ParseComponent('./src/Navbar/Navbar.tsx', "interface NavbarTabProps {", "NavbarTab"));
components.push(ParseComponent('./src/Footer/Footer.tsx', "interface Props {", "Footer"));
components.push(ParseComponent('./src/Card/Card.tsx', "interface Props {", "Card"));
components.push(ParseComponent('./src/ContactForm/ContactForm.tsx', "interface Props {", "ContactForm"));
components.push(ParseComponent('./src/LandingPage/LandingPage.tsx', "interface Props {", "LandingPage"));
components.push(ParseComponent('./src/IconList/IconList.tsx', "interface Props {", "IconList"));
components.push(ParseComponent('./src/IconList/IconList.tsx', "interface IconListItemProps {", "IconListItem"));

let result = {
    components: {}
}
for (let component of components) {
    result.components[component.name] = {
        props: component.props,
        can_be_in: component.can_be_in
    }
}
let can_be_in_text = ["Full", "Half", "Footer", "LandingPage", "Card", "ContactForm", "IconListItem"];
let text_can_be_in = [...can_be_in_text];


text_can_be_in.push("h1");
result.components["h1"] = {
    props: [{
        "name": "children?",
        "type": "string"
    }],
    can_be_in: ["LandingPage"]
}
text_can_be_in.push("h2");
result.components["h2"] = {
    props: [{
        "name": "children?",
        "type": "string"
    }],
    can_be_in: ["Full", "Half", "LandingPage", "Card", "ContactForm"]
}
text_can_be_in.push("h3");
result.components["h3"] = {
    props: [{
        "name": "children?",
        "type": "string"
    }],
    can_be_in: ["Full", "Half"]
}
text_can_be_in.push("h4");
result.components["h4"] = {
    props: [{
        "name": "children?",
        "type": "string"
    }],
    can_be_in: ["Full", "Half", ]
}


text_can_be_in.push("p");
result.components["p"] = {
    props: [{
        "name": "children?",
        "type": "string"
    }],
    can_be_in: can_be_in_text
}

text_can_be_in.push("a");
result.components["a"] = {
    props: [{
            "name": "href",
            "type": "string"
        },
        {
            "name": "children?",
            "type": "string"
        }
    ],
    can_be_in: [...text_can_be_in]
}
text_can_be_in.push("NavbarTab");
result.components["Text"] = {
    props: [{
        "name": "children?",
        "type": "ritch"
    }],
    can_be_in: [...text_can_be_in]
}

fs.writeFile("./GabroConfig.json", JSON.stringify(result), (e) => {
    console.log(e);
});