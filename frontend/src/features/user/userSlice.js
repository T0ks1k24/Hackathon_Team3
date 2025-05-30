import { login, logout } from './userSlice';

export const registerUser = (formData) => async (dispatch) => {
  try {
    const res = await fetch('http://localhost:8000/api/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.detail || 'Помилка при реєстрації');
    }

    const data = await res.json();


    dispatch(login({ username: data.username }));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};


export const loginUser = (credentials) => async (dispatch) => {
  try {
    const res = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.detail || 'Неправильний логін або пароль');
    }

    localStorage.setItem('access', data.access);
    localStorage.setItem('refresh', data.refresh);

    dispatch(login({ username: credentials.username }));
    return { success: true };
  } catch (err) {
    return { success: false, error: err.message };
  }
};
