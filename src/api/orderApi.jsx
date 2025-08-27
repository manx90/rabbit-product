import axiosClient from './axiosClient';

const mainDirection = '/order';

export class Order {
  // get all orders
  static getAll = () => axiosClient.get(mainDirection);
  // get one order by id
  static getOne = (id) => axiosClient.get(`${mainDirection}/${id}`);
  // create order
  static create = (formData) =>
    axiosClient.post(`${mainDirection}/create`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  // who is ready this order?
  static readyBy = (id) => axiosClient.put(`${mainDirection}/readyBy/${id}`);
  // state the order to proccessing
  static toProccess = (id) =>
    axiosClient.put(`${mainDirection}/proccessing/${id}`);
  // state the order to delivred

  static toDeliver = (id) =>
    axiosClient.put(`${mainDirection}/delivered/${id}`);
  // state the order to canceled
  static toCanceled = (id) =>
    axiosClient.put(`${mainDirection}/cancelled/${id}`);
  // state the order to Shipped
  static toShipped = (id) => axiosClient.put(`${mainDirection}/shipped/${id}`);
  // update the order
  static update = (id, formData) =>
    axiosClient.put(`${mainDirection}/update/${id}`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  // delete one of the orders
  static deleteOne = (id) => axiosClient.delete(`${mainDirection}/${id}`);
}
