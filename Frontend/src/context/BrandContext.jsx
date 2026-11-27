import {
  createContext,
  useCallback,
  useState,
  useRef,
} from "react";

import {
  getAllCreators,
  getCreatorById as getCreatorByIdAPI,
} from "../services/brandService";

export const BrandContext = createContext(null);

export const BrandProvider = ({ children }) => {
  const [creators, setCreators] = useState([]);
  const [creatorLoading, setCreatorLoading] = useState(false);
  const [creatorError, setCreatorError] = useState("");
  const [hasMoreCreators, setHasMoreCreators] = useState(false);
  const [totalCreators, setTotalCreators] = useState(0);

  // Single creator details
  const [creatorDataById, setCreatorDataById] = useState(null);
  const [creatorDetailsLoading, setCreatorDetailsLoading] = useState(false);
  const [creatorDetailsError, setCreatorDetailsError] = useState("");

  const creatorRequestId = useRef(0);

  // Fetch one creator by ID
  const fetchCreatorById = useCallback(async (id) => {
    try {
      setCreatorDetailsLoading(true);
      setCreatorDetailsError("");
      setCreatorDataById(null);

      const data = await getCreatorByIdAPI(id);

      setCreatorDataById(data);
      return data;
    } catch (error) {
      setCreatorDetailsError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch creator details",
      );

      throw error;
    } finally {
      setCreatorDetailsLoading(false);
    }
  }, []);

  // Fetch all creators with pagination
  const fetchCreators = useCallback(
    async ({ page = 1, filters = {}, append = false, signal } = {}) => {
      const requestId = ++creatorRequestId.current;

      try {
        setCreatorLoading(true);
        setCreatorError("");

        const data = await getAllCreators(
          {
            ...filters,
            page,
            limit: 9,
          },
          signal,
        );

        if (requestId !== creatorRequestId.current) return;

        const newCreators = data.creators || [];
        const pagination = data.pagination || {};

        setCreators((previous) => {
          if (!append) return newCreators;

          const existingIds = new Set(
            previous.map((creator) => String(creator._id)),
          );

          const uniqueNewCreators = newCreators.filter(
            (creator) => !existingIds.has(String(creator._id)),
          );

          return [...previous, ...uniqueNewCreators];
        });

        setTotalCreators(
          pagination.totalCreators ?? data.totalCreators ?? newCreators.length,
        );

        setHasMoreCreators(
          pagination.hasMore ??
            Number(page) < Number(pagination.totalPages || 1),
        );

        return data;
      } catch (error) {
        if (error.code === "ERR_CANCELED" || signal?.aborted) {
          return;
        }

        if (requestId === creatorRequestId.current) {
          setCreatorError(
            error.response?.data?.message || "Failed to fetch creators",
          );
        }

        throw error;
      } finally {
        if (requestId === creatorRequestId.current) {
          setCreatorLoading(false);
        }
      }
    },
    [],
  );

  const value = {
    creators,
    creatorLoading,
    creatorError,
    hasMoreCreators,
    totalCreators,
    fetchCreators,

    // Single creator details
    creatorDataById,
    creatorDetailsLoading,
    creatorDetailsError,
    fetchCreatorById,
  };

  return (
    <BrandContext.Provider value={value}>
      {children}
    </BrandContext.Provider>
  );
};