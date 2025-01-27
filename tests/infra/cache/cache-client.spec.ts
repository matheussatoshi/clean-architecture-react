import { LocalStorageClientAdapter } from "@/infra/cache/adapter";
import { CacheClientPort } from "@/infra/cache/ports";
import { faker } from "@faker-js/faker";
import { mockStorageData } from "./cache-client.mock";

export const makeSut = (): CacheClientPort => {
  const storageService = new LocalStorageClientAdapter();
  return storageService;
};

describe("LocalStorageClient", () => {
  it("Should store a value using setItem", () => {
    const storageClient = makeSut();
    const [key, data] = mockStorageData();
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    storageClient.setItem(key, data);

    expect(setItemSpy).toHaveBeenCalledWith(key, data);

    setItemSpy.mockRestore();
  });

  it("Should store a value using getItem", () => {
    const storageClient = makeSut();
    const [key, data] = mockStorageData();
    const getItemSpy = jest.spyOn(Storage.prototype, "getItem");

    jest.spyOn(localStorage, "getItem").mockReturnValue(data);

    storageClient.getItem(key);

    expect(getItemSpy).toHaveBeenCalledWith(key);
    expect(storageClient.getItem(key)).toBe(data);

    getItemSpy.mockRestore();
  });

  it("Should remove a value using removeItem", () => {
    const storageClient = makeSut();
    const [key, data] = mockStorageData();
    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    const removeItemSpy = jest.spyOn(Storage.prototype, "removeItem");

    storageClient.setItem(key, data);

    storageClient.removeItem(key);

    expect(removeItemSpy).toHaveBeenCalledWith(key);

    setItemSpy.mockRestore();
    removeItemSpy.mockRestore();
  });

  it("Should clear all items using clear", () => {
    const storageClient = makeSut();
    const [key1, data1] = mockStorageData();
    const key2 = "SESSION_ID";
    const data2 = JSON.stringify({ sessionId: faker.string.uuid() });

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");
    const clearSpy = jest.spyOn(Storage.prototype, "clear");

    storageClient.setItem(key1, data1);
    storageClient.setItem(key2, data2);

    storageClient.clear();

    expect(clearSpy).toHaveBeenCalled();

    setItemSpy.mockRestore();
    clearSpy.mockRestore();
  });

  it("Should get the key at a specific index using key", () => {
    const storageClient = makeSut();
    const [key1, data1] = mockStorageData();
    const key2 = "SESSION_ID";
    const data2 = JSON.stringify({ sessionId: faker.string.uuid() });

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    storageClient.setItem(key1, data1);
    storageClient.setItem(key2, data2);

    expect(storageClient.key(0)).toBe(key1);
    expect(storageClient.key(1)).toBe(key2);

    setItemSpy.mockRestore();
  });

  it("Should return the correct length of stored items", () => {
    const storageClient = makeSut();
    const [key1, data1] = mockStorageData();
    const key2 = "SESSION_ID";
    const data2 = JSON.stringify({ sessionId: faker.string.uuid() });

    const setItemSpy = jest.spyOn(Storage.prototype, "setItem");

    storageClient.setItem(key1, data1);
    storageClient.setItem(key2, data2);

    expect(storageClient.length).toBe(2);

    setItemSpy.mockRestore();
  });
});
