export function extractObjectFromLocalStorage<T>(key: string): T | null {
    // Retrieve the item as specific object from localStorage using the provided key
    const item = localStorage.getItem(key);

    // If the item doesn't exist, return null
    if (!item) {
        return null;
    }

    try {
        // Parse the item as JSON
        return JSON.parse(item) as T;
    } catch (error) {
        // If parsing fails, log the error and return null
        console.error("Error parsing localStorage item:", error);
        return null;
    }
}
