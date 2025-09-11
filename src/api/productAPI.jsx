/* eslint-disable no-useless-catch */
import axiosClient from './axiosClient';

const mainDirection = '/product';

export class Product {
  static getAll = async (params = { limit: 100 }) => {
    try {
      const response = await axiosClient.get(`${mainDirection}`, { params });
      return response;
    } catch (error) {
      throw error;
    }
  };

  static getOne = async (id) => {
    try {
      const response = await axiosClient.get(`${mainDirection}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  static create = async (formData) => {
    try {
      const response = await axiosClient.post(mainDirection, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  static update = async (id, formData) => {
    try {
      const response = await axiosClient.put(
        `${mainDirection}/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  static deleteOne = async (id) => {
    try {
      const response = await axiosClient.delete(`${mainDirection}/${id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };
}
