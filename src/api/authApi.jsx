import axiosClient from "./axiosClient";

const mainDirection = "/auth";
export class Auth {

	static login(formData) {
		return axiosClient.post(
			`${mainDirection}/login`,
			formData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
	static register(formData) {
		return axiosClient.post(
			`${mainDirection}/register`,
			formData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
	static isLoggedIn() {
		return axiosClient.get(
			`${mainDirection}/isLoggedIn`,
		);
	}
	static changePassword(id, formData) {
		return axiosClient.post(
			`${mainDirection}/change-password/${id}`,
			formData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
	static getMe() {
		return axiosClient.get(
			`${mainDirection}/user`,
		);
	}
	static getAll() {
		return axiosClient.get(
			`${mainDirection}/all`,
		);
	}
	static deleteOne(name) {
		return axiosClient.delete(
			`${mainDirection}/user/${name}`,
		);
	}
	static createUser(formData) {
		return axiosClient.post(
			`${mainDirection}/create-user`,
			formData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
	static updateUser(id, formData) {
		return axiosClient.post(
			`${mainDirection}/update-user/${id}`,
			formData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
}
