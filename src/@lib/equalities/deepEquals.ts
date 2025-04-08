// shallowEquals를 그대로 가져온 뒤, 이퀄 부분만 변경할 것

const isObject = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === "object";
};

export function deepEquals<T>(objA: T, objB: T): boolean {
  if (objA === objB) {
    return true;
  }
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) {
      return false;
    }
    return objA.every((value, key) => objB[key] === value); // 배열에 대한 얕은 비교
  }
  if (isObject(objA) && isObject(objB)) {
    const entriesA = Object.entries(objA);
    const entriesB = Object.entries(objB);

    return (
      entriesA.length === entriesB.length &&
      entriesA.every(([key, value]) => {
        return objB[key] === value;
      })
    );
  }
  return false;
}
