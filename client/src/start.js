import ReactDOM from "react-dom";
import Welcome from "./welcome";
import App from "./app";
import { init } from "./socket";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./reducer";
let elem;


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);


if (location.pathname === "/home") { //aqui tem q ser == /home
    elem = <Welcome />;
} else {
    init(store);
    elem = (
        <Provider store={store}>
            <App />
        </Provider>
    );
}
ReactDOM.render(elem, document.querySelector("main"));

