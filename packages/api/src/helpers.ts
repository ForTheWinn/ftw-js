import { sc, u, wallet } from "@cityofzion/neon-js";

// @ts-ignore
export const deserializeValue = (str: string): sc.StackItemValue => {
  const deserializeValue = sc.StackItem.deserialize(str);
  return deserializeValue.value;
};

export function convertString(value: string) {
  return value ? u.hexstring2str(value) : "";
}

export function convertNumber(value: string): number {
  return value ? parseInt(u.isHex(value) ? u.reverseHex(value) : value, 16) : 0;
}

export function convertAddress(value: string) {
  return value ? wallet.getAddressFromScriptHash(u.reverseHex(value)) : "";
}

export const convertIntToHexstring = (num: number): string => {
  let size = 8;
  if (num < 2147483648) {
    size = 4;
  }
  if (num < 32768) {
    size = 2;
  }
  if (num < 128) {
    size = 1;
  }
  return u.reverseHex(u.num2hexstring(num, size));
};
