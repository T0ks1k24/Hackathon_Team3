const API_URL = "http://localhost:8000/api";


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

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Registration error details:", errorData);
    throw new Error(
      errorData.detail ||
        Object.values(errorData).join(" ") ||
        "Registration failed"
    );
  }

  return response.json();
}
