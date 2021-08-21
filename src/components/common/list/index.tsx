import tw from 'twin.macro';

export const DividedList = tw.ul`divide-y divide-gray-300`;
export const RoundDividedList = tw(
  DividedList,
)`w-full p-8 overflow-y-scroll bg-white rounded-xl shadow-default md:(margin-top[1em] margin-bottom[1em])`;
