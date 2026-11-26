import { useMemo, useState } from "react";
import { Users, Plus, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { activeCollaborationsData } from "../../BrandData/activeCollaborationsData";

import CollaborationStats from "../Components/ActiveCollaborations/CollaborationStats";
import CollaborationFilters from "../Components/ActiveCollaborations/CollaborationFilters";
import CollaborationCard from "../Components/ActiveCollaborations/CollaborationCard";
import EmptyCollaborations from "../Components/ActiveCollaborations/EmptyCollaborations";

const ActiveCollaborations = () => {
  const navigate = useNavigate();

  const [collaborations] = useState(activeCollaborationsData);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const filteredCollaborations = useMemo(() => {
    let result = [...collaborations];

    // Search
    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (item) =>
          item.creatorName.toLowerCase().includes(query) ||
          item.username.toLowerCase().includes(query) ||
          item.campaignName.toLowerCase().includes(query) ||
          item.id.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (activeTab !== "all") {
      result = result.filter((item) => item.status === activeTab);
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.startDate) - new Date(a.startDate);
      }

      if (sortBy === "oldest") {
        return new Date(a.startDate) - new Date(b.startDate);
      }

      if (sortBy === "deadline") {
        return new Date(a.deadline) - new Date(b.deadline);
      }

      if (sortBy === "amount") {
        return b.agreedAmount - a.agreedAmount;
      }

      return 0;
    });

    return result;
  }, [collaborations, search, activeTab, sortBy]);

  return (
    <div className="mx-auto max-w-[1500px] space-y-7">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users size={16} />
            <span>Brand Dashboard</span>
            <span>/</span>
            <span className="text-[#D0FF71]">
              Active Collaborations
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">
            Active Collaborations
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage your approved creators, track deliverables and monitor
            campaign progress.
          </p>
        </div>

        <button
          onClick={() => navigate("/brand/creators")}
          className="flex items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-5 py-3 text-sm font-semibold text-black transition hover:bg-[#c1ef61]"
        >
          <Plus size={17} />
          Find Creators
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Stats */}
      <CollaborationStats collaborations={collaborations} />

      {/* Filters */}
      <div className="space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-white">
            Your Collaborations
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Track and manage all your creator partnerships.
          </p>
        </div>

        <CollaborationFilters
          search={search}
          setSearch={setSearch}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          Showing{" "}
          <span className="font-semibold text-white">
            {filteredCollaborations.length}
          </span>{" "}
          collaborations
        </p>
      </div>

      {/* Cards */}
      {filteredCollaborations.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          {filteredCollaborations.map((collaboration) => (
            <CollaborationCard
              key={collaboration.id}
              collaboration={collaboration}
              onView={(item) =>
                navigate(
                  `/brand/collaborations/${encodeURIComponent(item.id)}`
                )
              }
            />
          ))}
        </div>
      ) : (
        <EmptyCollaborations />
      )}
    </div>
  );
};

export default ActiveCollaborations;