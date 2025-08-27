import axiosClient from './axiosClient';

const mainDirection = '/optos';
export class Optos {
  static shipmentType() {
    return axiosClient.get(`${mainDirection}/shipmentType`);
  }
  static shipment() {
    return axiosClient.get(`${mainDirection}/shipment`);
  }
  static createShipment(formData) {
    return axiosClient.post(`${mainDirection}/shipment`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static getCity() {
    return axiosClient.get(`${mainDirection}/city`);
  }

  static gitArea(cityId) {
    return axiosClient.get(`${mainDirection}/city/${cityId}`);
  }

  static businessesaddress() {
    return axiosClient.get(`${mainDirection}/businessesaddress`);
  }

  static businesses() {
    return axiosClient.get(`${mainDirection}/businesses`);
  }

  static getToken() {
    return axiosClient.get(`${mainDirection}/token`);
  }
}
