import BioEditor from "./bioEditor";
import ProfilePic from "./profilepic";

//  TUDO Q APARECE NO PERFIL
export default function Profile(props) {
    return (
        <div className="profile">
            <ProfilePic
                toggleUploader={props.toggleUploader}
                profile_pic={props.profile_pic}
            />
            <div className="bio-cropper">
                <h1>
                    {props.first} {props.last}
                </h1>

                <p>
                    <b>
                        {props.adress}, {props.active}
                    </b>
                </p>
                <br></br>
                <BioEditor setBio={props.setBio}  bio={props.bio} />
                
            </div>
        </div>
    );
}
