import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem;

if (location.pathname === "/welcome") {
    elem = <Registration />;
} else {
    elem = <p>your logo component should go here</p>;
}

ReactDOM.render(elem, document.querySelector("main"));


