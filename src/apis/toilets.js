import { firebaseDB } from './common';

const TOILET_COLLECTION_NAME = 'toilets';
export const toiletsRef = firebaseDB.collection(TOILET_COLLECTION_NAME);

export function fetchToilets(onFetchToilets) {
  toiletsRef
    .get()
    .then(snapshot => {
      // data에 id를 붙여서
      onFetchToilets(snapshot.docs.map(doc => Object.assign(doc.data(), { id: doc.id })));
    })
    .catch(error => {
      console.log('Error getting documents: ', error);
    });
  // 일단 데이터만 가져와본다.
}
