import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToilet } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';

export function UserProfileInfoView({
  user,
  logOut,
}: {
  user: firebase.User;
  logOut: () => void;
}): React.ReactElement {
  return (
    <div className="flex flex-1 flex-col w-full items-center justify-center">
      <div className="bg-gray-400 p-3 w-20 h-20 rounded-full flex items-center align-middle">
        <FontAwesomeIcon icon={faToilet} size="3x" color="white" />
      </div>
      <div>{user.displayName}</div>
      <div onClick={logOut}>나가지마!</div>
    </div>
  );
}
