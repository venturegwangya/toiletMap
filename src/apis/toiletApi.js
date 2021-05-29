import { firebaseDB } from './common';

const toiletsRef = firebaseDB.collection('toilets');

export function fetchToilets(onFetchToilets) {
  toiletsRef
    .get()
    .then(snapshot => {
      onFetchToilets(snapshot.docs.map(doc => doc.data()));
    })
    .catch(error => {
      console.log('Error getting documents: ', error);
    });
  // 일단 데이터만 가져와본다.
}
