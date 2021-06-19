export const PUBLIC_TOILET = '공중화장실' as const;
export const USER_REGISTERED = '유저등록화장실' as const;

const toiletRegisterType = [PUBLIC_TOILET, USER_REGISTERED] as const;
export type ToiletRegisterType = typeof toiletRegisterType[number];

export function isToiletRegisterType(
  unknownTypeString: string,
): unknownTypeString is ToiletRegisterType {
  return unknownTypeString in toiletRegisterType;
}
