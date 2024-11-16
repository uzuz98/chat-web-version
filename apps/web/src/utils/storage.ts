import { EnumKeyStorage } from "~/types/storage"

export const getStorage = async (key: EnumKeyStorage) => {
  return await localStorage.getItem(key)
}

export const saveStorage = async (key: EnumKeyStorage, value: any) => {
  return await localStorage.setItem(key, value)
}
