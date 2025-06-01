interface ProfileNameProps {
    username: string;
    createdAt: string | Date;
}

export default function ProfileName({username, createdAt} : ProfileNameProps){
    const formattedDate = new Date(createdAt).toLocaleDateString();
    return (
        <>

                <div className="w-40 text-left ml-10">
                    <span className="text-cyan-300 text-[50px] text-center mx-auto material-symbols-outlined relative top-5" style={{fontSize: "50px" }}>account_circle</span>
                </div>
                <div className="w-full">
                    <p className="text-left text-white text-2xl font-bold ml-5 relative top-3">{username}</p>
                    <p className="text-left text-white text-sm font-bold ml-5 relative top-1">Member since {formattedDate}</p>
                </div>

        </>
    );
}