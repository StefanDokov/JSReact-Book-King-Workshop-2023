
import { requestFactory } from "./requester";

const rootUrl = 'http://localhost:3030/users';


export const authServiceFactory = () => {
  const request = requestFactory();
  
  return {
    login: (loginData) => {

      return request.post(`${rootUrl}/login`, loginData);

    },

    register: (registerData) => {
      return request.post(`${rootUrl}/register`, registerData);
    },

    logout: () => {
      return request.get(`${rootUrl}/logout`);
      
    },
  }

}