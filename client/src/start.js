import ReactDOM from "react-dom";
import Welcome from "./welcome";
import Logo from "./logo";

let elem;

if (location.pathname === "/home") { //aqui tem q ser == /home
    elem = <Welcome />;
} else {
    elem = <Logo />;
}

ReactDOM.render(elem, document.querySelector("main"));

