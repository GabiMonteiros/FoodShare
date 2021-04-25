import { Component } from "react";
import axios from "./axios";
import Uploader from "./uploader";
import Profile from "./profile";
//import Logo from "./logo";
// import OtherProfile from "./other-profile";
//import CollaborativeNetwork from "./collaborativenetwork"; //findpeople
// import FindDonors from "./finddonors";
// import FindDistributor from "./finddistributor";
// import Connections from "./connections"; //friends
// import Chat from "./hooks/chat";
// import Account from "./account"; //deleteaccount
import { BrowserRouter, Route } from "react-router-dom";
// import { Link } from "react-router-dom";
import Navigation from "./navagation";


export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
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
                        <Navigation />
                        <Route
                            exact
                            path="/"
                            render={() => (
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