import { useState } from "react";
import { extractObjectFromLocalStorage } from "../utils/localStorage";
import { PaginationSettings } from "../types/TableTypes";
import { DEFAULT_PAGE_SIZE, PAGINATION_SETTINGS_KEY } from '../constants';

export const useMRTPagination = () => {
    // Retrieve saved settings from localStorage or use initial settings
    const [currentPageSize, setCurrentPageSize] = useState<PaginationSettings>(() => {
        return extractObjectFromLocalStorage<PaginationSettings>(PAGINATION_SETTINGS_KEY) ??
            {
                CurrentProjectPage: DEFAULT_PAGE_SIZE,
                CurrentScenarioPage: DEFAULT_PAGE_SIZE,
                CurrentStoppedRunPage: DEFAULT_PAGE_SIZE
            };
    });

    return { currentPageSize, setCurrentPageSize };
};
