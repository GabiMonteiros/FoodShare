export default function ProfilePic({first,last,profile_pic,toggleUploader,}) {
    return (
        <>
            <img
                onClick={() => toggleUploader()}
                className="profile-img"
                src={profile_pic || "../default-img-svg.png"}
                alt={`${first} ${last}`}
            />
        </>
    );
}


