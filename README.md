# 대똥여지도 💩

![Poop Status](https://img.shields.io/badge/%F0%9F%92%A9-urgent-red)

## 개요

- 공공데이터를 활용하여 공중 화장실의 위치를 보여준다.
- 신규 화장실 등록, 리뷰기능으로 공개 화장실의 위치, 상태를 서로 공유할 수 있다.

## 참여

- [v0.5 마일스톤 할일](https://github.com/venturegwangya/toiletMap/projects/1)
- firebase 로컬 에뮬레이터 개발환경 설정 (한번만 하면됨)
  - [자바 1.8 이상](https://www.java.com/ko/download/) 설치
  - `firebase init emulators`
    - existing project를 선택하고
    - Auth와 firestore 설치한다. 포트값은 기본값 그대로 사용. (추후 더 상세히 업데이트)
- firebase 로컬 에뮬레이터 실행 `yarn local-server`

## 기술 참고자료

- ReactJS
  - [파일 구조 참조1](https://codesandbox.io/s/rz8bg?file=/src/core/sagas/lyricsSaga.ts)
  - [Redux sagas with ducks](https://github.com/BlueAccords/redux-sagas-with-ducks/tree/master/state)
  - [Bulletproof-react](https://github.com/alan2207/bulletproof-react)
- TypeScript
  - [Saga Typing 문제](https://github.com/redux-saga/redux-saga/issues/1883)
- EmotionJS
- TailwindCSS
  - [examples of tailwind-css as css-in-js](https://dev.to/angelmtztrc/react-app-with-tailwind-css-emotion-twin-macro-3dpe)
- Redux, Redux-saga
  - [Redux saga vs async await](https://thecodebarbarian.com/redux-saga-vs-async-await.html)
  - [Why do we need middleware for async flow in redux](https://stackoverflow.com/questions/34570758/why-do-we-need-middleware-for-async-flow-in-redux/34599594#34599594)
  - [Redux tutorials: async logic](https://redux.js.org/tutorials/essentials/part-5-async-logic)
- Firebase
  - [subscription 처리](https://stackoverflow.com/questions/50668964/what-is-the-proper-way-of-connecting-firebase-with-redux-sagas)
- Leaflet
  - [지도 줌 컨트롤 위치 변경](https://egghead.io/lessons/react-change-the-react-leaflet-map-zoomcontrol-location-and-icons)
