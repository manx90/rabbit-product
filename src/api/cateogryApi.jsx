import axiosClient from './axiosClient';

const mainDirection = '/category';
export class Category {
  static getAll = (params) =>
    axiosClient.get(`${mainDirection}/active`, { params });
  static getOne = (id) => axiosClient.get(`${mainDirection}/${id}`);
  static getSubCategory = () => axiosClient.get(`${mainDirection}/subCategory`);
  static createCategory = (formData) =>
    axiosClient.post(mainDirection, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  static createSubCategory = (formData) =>
    axiosClient.post(`${mainDirection}/subCategory`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  static updateCategory = (id, formData) =>
    axiosClient.put(`${mainDirection}/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  static updateSubCategory = (id, formData) =>
    axiosClient.put(`${mainDirection}/subCategory/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  static deleteOneCategory = (id) =>
    axiosClient.delete(`${mainDirection}/${id}`);

  static deleteOneSubCategory = (id) =>
    axiosClient.delete(`${mainDirection}/subCategory/${id}`);
}
