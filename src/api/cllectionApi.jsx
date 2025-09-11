import axiosClient from './axiosClient';

const mainDirection = '/collections';

export class Collection {
  static getCollection = async () => {
    const res = await axiosClient.get(mainDirection);
    console.log(res);
    return res;
  };
}
