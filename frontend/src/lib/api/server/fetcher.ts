const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function serverFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T | null> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL tanımlanmamış.");
  }

  const url = `${API_URL}${endpoint}`;


  // Önbelleği tamamen kapatıyoruz. Her sayfayı yenilediğinizde backend'e anlık istek atar.
  const fetchOptions: RequestInit = {
    cache: 'no-store',
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(url, fetchOptions);

  if (!response.ok) {
    if (response.status === 404) {
      console.warn(`[API] Not Found: ${url}`);
      return null;
    }
    throw new Error(`[API Error] ${response.status} - ${response.statusText}`);
  }

  return response.json();
}
