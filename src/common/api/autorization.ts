import { axios } from '../../lib/api/axios';
import { PASSWORD, USERNAME } from '../config';
import { storage } from '../../common/utils/storage';

export const getToken = async (): Promise<any> => {
  const data = new URLSearchParams();
  data.append('username', USERNAME);
  data.append('password', PASSWORD);
  data.append('grant_type', 'password');

  try {
    const response = await axios.post('login', data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { access_token } = response as unknown as any;
    storage.setToken(access_token);
    return response;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};
