import { LocalStorageClientAdapter } from "@/infra/cache";
import { mockData } from "./local-storage-client.mock";

const makeSut = (): LocalStorageClientAdapter => {
  return new LocalStorageClientAdapter();
};

const MAIN_KEY = "DATA";

describe("LocalStorage Client Adapter", () => {
  const sut = makeSut();

  it("should retrieve an item from storage correctly", () => {
    const expectedData = mockData().one;

    sut.setItem(MAIN_KEY, JSON.stringify(expectedData));

    const getData = JSON.parse(sut.getItem(MAIN_KEY));

    expect(getData).toEqual(expectedData);
  });

  it("should remove an item from storage correctly", () => {
    const expectedData = mockData().one;

    sut.setItem(MAIN_KEY, JSON.stringify(expectedData));

    sut.removeItem(MAIN_KEY);

    const removedData = sut.getItem(MAIN_KEY);

    expect(removedData).toBeNull();
  });

  it("should store an item correctly in storage", () => {
    const expectedData = mockData().one;

    sut.setItem(MAIN_KEY, JSON.stringify(expectedData));

    const storedData = sut.getItem(MAIN_KEY);

    expect(storedData).toBeTruthy();
    expect(JSON.parse(storedData as any)).toEqual(expectedData);
  });

  it("should return correct length of stored items", () => {
    const expectedData = mockData().array;

    sut.setItem(MAIN_KEY, JSON.stringify(expectedData));

    const totalLength = sut.length;

    expect(totalLength).toBe(1);
  });

  it("should retrieve the correct key of the item in storage", () => {
    const expectedData = mockData();

    sut.setItem(MAIN_KEY, JSON.stringify(expectedData));

    const getKey = sut.key(0);

    expect(getKey).toEqual(MAIN_KEY);
  });

  it("should clear all items from storage", () => {
    const data1 = JSON.stringify(mockData().one);
    const data2 = JSON.stringify(mockData().one);
    const data3 = JSON.stringify(mockData().one);

    sut.setItem(`${MAIN_KEY}-1`, data1);
    sut.setItem(`${MAIN_KEY}-2`, data2);
    sut.setItem(`${MAIN_KEY}-3`, data3);

    sut.clear();

    const totalLength = sut.length;
    expect(totalLength).toBe(0);
  });
});
