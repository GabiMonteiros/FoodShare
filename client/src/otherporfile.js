import { Component } from "react";
import axios from "./axios";
import FriendButton from "./friendButton";
import PrivateChat from "./privatechat";

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
        console.log("otherprofile: ", this.props.match.params.id);
        axios
            .get("/api/user/" + this.props.match.params.id)//essa route tem q ser igual ao do server, mas nao pode ser igual ao app
            .then(({ data }) => {
                console.log("log id: ", data);
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
                    <h3>
                        {this.state.first} {this.state.last}
                        <br></br>
                    </h3>
                    <h4>
                        <b>
                            {this.state.adress}, {this.state.active}
                        </b>
                    </h4>

                    <p>{this.state.bio}</p>
                </div>
                <FriendButton
                    otherUserId={this.state.otherUserId}
                    userId={this.state.userId}
                />
           
            
                <PrivateChat
                    otherUserId={this.state.id}
                    userId={this.props.userId}
                />
            </div>

        );
    }
}
