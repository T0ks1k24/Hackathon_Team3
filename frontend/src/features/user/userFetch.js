const API_URL = "http://3.77.211.196/api";

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_URL}/users/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const contentType = response.headers.get('content-type');

  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Server did not return JSON. Check API URL.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || 'Login failed');
  }

  return data;
}

export async function registerUser(data) {
  const response = await fetch(`${API_URL}/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const contentType = response.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  const errorData = isJson ? await response.json() : null;

  if (!response.ok) {
    console.error("Registration error details:", errorData);

    let message = "Registration failed";
    if (errorData) {
      if (errorData.detail) {
        message = errorData.detail;
      } else {
        message = Object.entries(errorData)
          .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(", ") : val}`)
          .join(" | ");
      }
    }

    throw new Error(message);
  }

  return errorData;
}
