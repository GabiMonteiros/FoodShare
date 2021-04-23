import { Component } from "react";
import axios from "./axios";
import Uploader from "./uploader";
// import Profile from "./profile";
import Logo from "./logo";
// import OtherProfile from "./other-profile";
//import CollaborativeNetwork from "./collaborativenetwork"; //findpeople
// import FindDonors from "./finddonors";
// import FindDistributor from "./finddistributor";
// import Connections from "./connections"; //friends
// import Chat from "./hooks/chat";
// import Account from "./account"; //deleteaccount
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfilePic from "./profilepic";

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            first: "",
            last: "",
            full_name: "",
            bio: "",
            uploaderIsVisible: false,
            menuIsVisible: false,
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
        //online for test purposes
        if (!this.state.id) {
            return null;
        }

        return (
            <BrowserRouter>
                <>
                    {/* <Route path="/finddonors/" component={FindDonors} /> */}
                    {/* <Route path="/findfinddistributor/"component={FindDistributor}/> */}
                    {/* <Route path="/connections/" component={connections} />*/}
                    {/*<Route path="/collaborativenetwork/"component={CollaborativeNetwork}/>*/}
                    {/*<Route path="/chat" component={Chat} /> */}
                    <Navigation />
                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Profile
                                id={this.state.id}
                                full_name={this.state.full_name}
                                first={this.state.first}
                                last={this.state.last}
                                profile_pic={this.state.profile_pic}
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
                </>
            </BrowserRouter>
        );
    }
  
}    