import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import firebase from 'firebase';
import { toiletModels } from '@modules/toilet';
import { processRawToiletData } from '../../util/parseToiletData';
import ToiletInfoCard from './ToiletInfoCard';
import tw from 'twin.macro';

// TODO: divide 부분 리뷰 리스트에도 있으므로 공통으로 추출하고 함수형으로 Composition하기
const ToiletListContainer = tw.ul`divide-y divide-gray-300 p-8 bg-white overflow-y-scroll`;

interface ToiletListProps {
  toilets: toiletModels.Toilet[];
}

function ToiletList({ toilets }: ToiletListProps): EmotionJSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    const file = e.target.files[0];
    const fileread = new FileReader();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileread.onload = function (e: any) {
      const content = e.target.result as string;
      // console.log(content);
      const data = JSON.parse(content); // Array of Objects.
      processRawToiletData(data.records.slice(0, 5));
    };
    fileread.readAsText(file);
  };

  return (
    <ToiletListContainer>
      {toilets.map((toilet: toiletModels.Toilet) => (
        <ToiletInfoCard key={toilet.id} toilet={toilet} />
      ))}
      <label>JSON파일 Firebase에 업로드</label>
      <input type="file" id="get_the_file" onChange={handleChange}></input>
    </ToiletListContainer>
  );
}

export default ToiletList;
