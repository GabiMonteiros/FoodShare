import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";

// import ToDoList from "./todo";
// import Weather from "./weather";
export default function Profile(props) {
    return (
        <div className="profile">
            <ProfilePic
                toggleUploader={props.toggleUploader}
                profile_pic={props.profile_pic}
            />
            <div className="bio-cropper">
                <h3>
                    {props.first} {props.last}
                </h3>

                <p>

                    {props.adress}, {props.active}
                </p>
                <BioEditor setBio={props.setBio} bio={props.bio} />
            </div>
        </div>
    );
}
