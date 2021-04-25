import ReactDOM from "react-dom";
import Welcome from "./welcome";
//import Logo from "./logo";
import App from "./app";

let elem;

if (location.pathname === "/home") { //aqui tem q ser == /home
    elem = <Welcome />;
} else {
    
    elem = <App />;
}

ReactDOM.render(elem, document.querySelector("main"));

