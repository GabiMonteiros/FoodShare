import { Component } from "react";
import axios from "./axios";
// import FriendButton from "./friendButton";

export default class OtherProfile extends Component {
    constructor() {
        super();
        this.state = {
            otherUserId: "",
            first: "",
            last: "",
            email: "",
            adress: "",
            active: "",
            bio: "",
            image: "",
            userId: "",
        };
    }

    componentDidMount() {
        axios
            .get("/user/" + this.props.match.params.id)
            .then(({ data }) => {
                if (this.props.match.params.id == data.loggedId) {
                    this.props.history.push("/");
                } else {
                    this.setState({
                        otherUserId: data.id,
                        first: data.first,
                        last: data.last,
                        email: data.email,
                        adress: data.adress,
                        active: data.active,
                        bio: data.bio,
                        image: data.profile_pic,
                        userId: data.loggedId,
                    });
                }
            })
            .catch((error) => {
                console.log("error", error);
                //redirecionar para pagina de error customizada
                this.props.history.push("/");
            });
    }

    render() {
        return (
            <div className="other profile">
                <div className="img-wrapper">
                    <img
                        className="profile-img-other"
                        src={this.state.image || "../default-img-svg.png"}
                        alt={`${this.state.first} ${this.state.last}`}
                    />
                </div>
                <div className="bio-cropper">
                    <h5>
                        {this.state.first} {this.state.last}
                    </h5>
                    <p>{this.state.bio}</p>
                </div>
                {/* <FriendButton
                    otherUserId={this.state.otherUserId}
                    userId={this.state.userId}
                /> */}
            </div>
        );
    }
}
