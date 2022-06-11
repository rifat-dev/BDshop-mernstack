
const UsersListCard = ({ user }) => {
    return (
        <div class="card text-center user-card ">
            <img src={user.avatar.url} alt="John" style={{ width: '100%' }} />
            <h2>{user.name}</h2>
            <p class="title"><span>{user.roal}</span></p>
            <p>{`User ID : ${user._id}`}</p>
            <p>{`Email : ${user.email}`}</p>
            <p>Join At - <span>
                {new Intl.DateTimeFormat('en-GB', {
                    month: 'long',
                    day: '2-digit',
                    year: 'numeric',
                }).format(new Date(user.createdAt))}
            </span></p>
            {user.roal !== 'admin' &&
                <p > <button>Delete User</button></p>
            }
        </div>
    );
}

export default UsersListCard;
