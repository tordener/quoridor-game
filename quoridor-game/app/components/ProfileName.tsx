interface ProfileNameProps {
    username: string;
    createdAt: string | Date;
}

export default function ProfileName({username, createdAt} : ProfileNameProps){
    const formattedDate = new Date(createdAt).toLocaleDateString();
    return (
        <>
        <div className="flex flex-row mx-auto text-center w-[200px] relative -top-4">
                <div className="w-40 text-left  mx-auto text-center">
                    <span className="text-cyan-300 text-[50px] text-center mx-auto material-symbols-outlined relative top-5" style={{fontSize: "100px" }}>account_circle</span>
                </div>
                <div className="w-40 relative top-4">
                    <p className="text-left text-white text-2xl font-bold relative top-4">{username}</p>
                    <p className="text-left text-white text-lg font-bold relative top-1"><strong><small>Member since</small></strong> <span className="text-cyan-300 relative -top-3 text-sm">{formattedDate}</span></p>
                </div>
        </div>


        </>
    );
}