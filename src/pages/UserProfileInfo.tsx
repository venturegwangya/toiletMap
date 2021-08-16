import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faToilet } from '@fortawesome/free-solid-svg-icons';
import firebase from 'firebase';
import { Button } from '@components/common/button';
import tw from 'twin.macro';

const UserInfoText = tw.div`
text-sm
font-bold
`;

// TODO: 이준희 => 추후에 기능 강화하면 더 건든다.
export function UserProfileInfoView({
  user,
  logOut,
}: {
  user: firebase.User;
  logOut: () => void;
}): React.ReactElement {
  return (
    <div className="flex flex-1 flex-col w-full items-center justify-center p-5">
      <div className="bg-gray-400 p-3 w-20 h-20 rounded-full flex items-center justify-center mb-3">
        <FontAwesomeIcon icon={faToilet} size="3x" color="white" />
      </div>
      <div className="justify-start">
        <UserInfoText>똥싸개 : {user.displayName}</UserInfoText>
        <UserInfoText className="mb-3">이메일 : {user.email}</UserInfoText>
      </div>
      <Button onClick={logOut}>로그아웃</Button>
    </div>
  );
}
