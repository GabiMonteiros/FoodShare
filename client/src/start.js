import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;

if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = <p>Logo</p>;
}

ReactDOM.render(elem, document.querySelector("main"));

