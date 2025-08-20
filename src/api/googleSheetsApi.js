const BASE_URL = "https://script.google.com/macros/s/AKfycbyY5sE5ozGci62NPlFY53uEGM1kMGxw8mCq3hNG7YjWd2J16WJ0D4UeaQwDQWXfpFxt/exec";

export async function saveData(data) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!result.success) throw new Error(result.error || "Failed to save");
  return result.id;
}

export async function fetchAll() {
  const response = await fetch(BASE_URL);
  const result = await response.json();
  if (!result.success) throw new Error("Failed to fetch data");
  return result.data;
}

export async function fetchById(id) {
  const response = await fetch(`${BASE_URL}?id=${id}`);
  const result = await response.json();
  if (!result.success) throw new Error("Failed to fetch record");
  if (result.data.length === 0) throw new Error("Record not found");
  return result.data[0];
}
