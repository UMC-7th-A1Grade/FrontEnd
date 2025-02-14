import axios from 'axios';

export const getMycorrect = async () => {
  const token = localStorage.getItem('accessToken');
  try {
    const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/users/grade`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = res.data;
    return data;
  } catch {
    location.href = '/login';
  }
};
