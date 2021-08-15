import firebase from 'firebase';

export function UserProfileInfoView({
  user,
  logOut,
}: {
  user: firebase.User;
  logOut: () => void;
}): React.ReactElement {
  return (
    <div className="flex flex-1 flex-col w-full items-center">
      <div>{user.displayName}</div>
      <div onClick={logOut}>나가지마!</div>
    </div>
  );
}
