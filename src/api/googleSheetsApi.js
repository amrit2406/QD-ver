const API_BASE_URL = "https://script.google.com/macros/library/d/1tpZETI0o0uNcWXz2LxadY6SJK7p4r_b5PZJ1-Sa32vGlbT0Bzg7rQnHd/4"; // Replace with your deployed Apps Script web app URL

export async function saveData(data) {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
  const result = await response.json();
  if (result.success) {
    return result.id;
  } else {
    throw new Error(result.error || "Failed to save");
  }
}

export async function fetchAll() {
  const response = await fetch(API_BASE_URL);
  const result = await response.json();
  if (result.success) return result.data;
  throw new Error("Failed to fetch records");
}

export async function fetchById(id) {
  const response = await fetch(`${API_BASE_URL}?id=${id}`);
  const result = await response.json();
  if (result.success && result.data.length > 0) return result.data[0];
  throw new Error("Record not found");
}
// he