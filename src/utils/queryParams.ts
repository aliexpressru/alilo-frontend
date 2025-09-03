export const getQueryParams = () => {
    if (typeof window === 'undefined' || !window.location?.search) {
        return {
            page: 1,
            pageSize: 10,
        };
    }

    try {
        const searchParams = new URLSearchParams(window.location.search);
        return {
            page: parseInt(searchParams.get('page') || '1', 10) || 1,
            pageSize: parseInt(searchParams.get('pageSize') || '10', 10) || 10,
        };
    } catch (error) {
        console.error('Error parsing query params:', error);
        return {
            page: 1,
            pageSize: 10,
        };
    }
};

export const updateQueryParams = (params: Record<string, string | number>) => {
    const searchParams = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([key, value]) => {
        if (value) {
            searchParams.set(key, String(value));
        } else {
            searchParams.delete(key);
        }
    });

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState(null, '', newUrl);
};
