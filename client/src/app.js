import { Component } from "react";
import axios from "./axios.js";
import Uploader from "./uploader.js";
import Profile from "./profile.js";
import ProfilePic from "./profilepic"; 
import Logo from "./logo";
import OtherProfile from "./otherporfile.js";
import FindPeople from "./findPeople";
import Friends from "./friends";
import Onlineusers from "./onlineUsers";
import Chat from "./chat";
//import CollaborativeNetwork from "./collaborativenetwork"; //findpeople
// import FindDonors from "./finddonors";
// import FindDistributor from "./finddistributor";
// import Connections from "./connections"; //friends
// import Chat from "./hooks/chat";
// import Account from "./account"; //deleteaccount
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
// import Navigation from "./navagation.js";


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            email: "",
            bio: "",
            uploaderIsVisible: false,
        };
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        axios
            .get("/profile.json")
            .then(({ data }) => {
                this.setState({ ...data });
            })
            .catch((error) => {
                console.log("error", error);
            });
    }
    //listen o scroll para iluminar o underline header
    handleScroll() {
        if (window.scrollY > 20) {
            document.querySelector("header").className = "scroll";
        } else {
            document.querySelector("header").className = "";
        }
    }

    toggleUploader() {
        this.setState({
            uploaderIsVisible: !this.state.uploaderIsVisible,
        });
    }

    setImage(newProfilePic) {
        this.setState({
            profile_pic: newProfilePic,
        });
    }

    setBio(newBio) {
        this.setState({
            bio: newBio,
        });
    }

    render() {
        return (
            <div id="app">
                <BrowserRouter>
                    <>
                        <header>
                            <Link to="/">
                                <Logo />
                            </Link>
                            <Link to="/">
                                <h1 className="nav">Food Share</h1>
                            </Link>
                            <nav>
                                <ul>
                                    <li>
                                        <Link to="/users">New Parthers</Link>
                                    </li>
                                    <li>
                                        <Link to="/connections">
                                            Connections
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/chat">Chat</Link>
                                    </li>
                                    <li>
                                        <ProfilePic
                                            id={this.state.id}
                                            first={this.state.first}
                                            last={this.state.last}
                                            image={this.state.image}
                                            toggleUploader={() =>
                                                this.toggleUploader()
                                            }
                                        />
                                    </li>
                                </ul>
                            </nav>
                        </header>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                // tem q colocar tudo q quer q acapreça na bio
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    profile_pic={this.state.profile_pic}
                                    adress={this.state.adress}
                                    active={this.state.active}
                                    bio={this.state.bio}
                                    toggleUploader={() => this.toggleUploader()}
                                    setBio={(e) => this.setBio(e)}
                                />
                            )}
                        />

                        {this.state.uploaderIsVisible && (
                            <Uploader
                                profile_pic={this.state.profile_pic}
                                setImage={(e) => this.setImage(e)}
                                toggleUploader={() => this.toggleUploader()}
                            />
                        )}
                        {/* essa é a route q aparece para o user, tem q ser
                        diferente do que ta em server ou em component */}
                        <Route path="/user/:id" component={OtherProfile} />
                        <Route path="/users" component={FindPeople} />
                        <Route path="/connections" component={Friends} />
                        <Route path="/chat" component={Chat} />
                        <Route path="/onlineusers" component={Onlineusers} />
                        {/* <Route path="/finddonors/" component={FindDonors} /> */}
                        {/* <Route path="/findfinddistributor/"component={FindDistributor}/> */}
                        {/* <Route path="/connections/" component={connections} />*/}
                        {/*<Route path="/collaborativenetwork/"component={CollaborativeNetwork}/>*/}
                        {/*<Route path="/chat" component={Chat} /> */}
                    </>
                </BrowserRouter>
            </div>
        );
    }
}    