
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from "lucide-react";

import { contentSubmissionsData } from "../../BrandData/contentSubmissionsData";
import { PLATFORM_ICONS } from "../Components/Icon/PlatformIcons";

const SubmissionDetails = () => {
  const { submissionId } = useParams();
  const navigate = useNavigate();

  const [submissions, setSubmissions] = useState(contentSubmissionsData);

  const submission = submissions.find(
    (item) => item.id === submissionId
  );

  const handleStatusChange = (status) => {
    setSubmissions((previous) =>
      previous.map((item) =>
        item.id === submissionId
          ? { ...item, status }
          : item
      )
    );
  };

  if (!submission) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <div className="rounded-2xl bg-[#202220] p-5">
          <XCircle size={35} className="text-red-400" />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-white">
          Submission Not Found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          No submission found with ID: {submissionId}
        </p>

        <button
          onClick={() => navigate("/brand/content")}
          className="mt-5 rounded-xl bg-[#D0FF71] px-5 py-3 text-sm font-semibold text-black"
        >
          Back to Submissions
        </button>
      </div>
    );
  }

  const isPending = submission.status === "pending";

  const statusConfig = {
    pending: {
      label: "Pending Review",
      className: "bg-amber-400/10 text-amber-400",
    },
    approved: {
      label: "Approved",
      className: "bg-[#D0FF71]/10 text-[#D0FF71]",
    },
    revision_requested: {
      label: "Revision Requested",
      className: "bg-blue-400/10 text-blue-400",
    },
    rejected: {
      label: "Rejected",
      className: "bg-red-400/10 text-red-400",
    },
  };

  const currentStatus =
    statusConfig[submission.status] || statusConfig.pending;

  const PlatformIcon =
    submission.platform === "YouTube" ? PLATFORM_ICONS.YouTube : PLATFORM_ICONS.Instagram;

  const metrics = [
    { label: "Views", value: submission.views, icon: Eye },
    { label: "Likes", value: submission.likes, icon: Heart },
    { label: "Comments", value: submission.comments, icon: MessageCircle },
    { label: "Shares", value: submission.shares, icon: Share2 },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            onClick={() => navigate("/brand/content")}
            className="mb-4 flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#D0FF71]"
          >
            <ArrowLeft size={17} />
            Back to Submissions
          </button>

          <h1 className="text-2xl font-semibold text-white sm:text-3xl">
            Submission Details
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review creator content and manage its approval.
          </p>
        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-medium ${currentStatus.className}`}
        >
          {currentStatus.label}
        </span>
      </div>

      {/* Submission ID */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/[0.07] bg-[#191B19] p-4">
        <div>
          <p className="text-xs text-gray-500">Submission ID</p>
          <p className="mt-1 font-medium text-white">{submission.id}</p>
        </div>

        <div>
          <p className="text-xs text-gray-500">Submitted On</p>
          <p className="mt-1 text-sm text-white">
            {submission.submittedAt}
          </p>
        </div>

        <div className="flex items-center gap-2 text-gray-400">
          <PlatformIcon size={19} />
          <span className="text-sm">{submission.platform}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-12">

        {/* Left Column */}
        <div className="space-y-6 lg:col-span-7">

          {/* Video Preview */}
          <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#191B19] p-4 sm:p-5">
            <h2 className="mb-4 font-semibold text-white">
              Submitted Content
            </h2>

            <div className="overflow-hidden rounded-xl bg-black">
              <img
                src={submission.thumbnail}
                alt="Content thumbnail"
                className="aspect-video w-full object-cover"
              />
            </div>

            <a
              href={submission.contentUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/5"
            >
              Open Original Content
              <ExternalLink size={15} />
            </a>

            <div className="mt-5">
              <p className="text-xs text-gray-500">Caption</p>
              <p className="mt-2 text-sm leading-6 text-gray-300">
                {submission.caption}
              </p>
            </div>
          </div>

          {/* Creator Details */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
            <h2 className="font-semibold text-white">
              Creator Information
            </h2>

            <div className="mt-5 flex items-center gap-4">
              <img
                src={submission.avatar}
                alt={submission.creatorName}
                className="h-14 w-14 rounded-full object-cover"
              />

              <div>
                <h3 className="font-semibold text-white">
                  {submission.creatorName}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {submission.username}
                </p>
              </div>
            </div>

            <div className="mt-5 border-t border-white/[0.07] pt-4">
              <p className="text-xs text-gray-500">Creator ID</p>
              <p className="mt-1 text-sm text-white">
                {submission.creatorId}
              </p>
            </div>
          </div>

          {/* Campaign */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
            <h2 className="font-semibold text-white">
              Campaign Information
            </h2>

            <div className="mt-4 rounded-xl border border-white/[0.07] bg-[#202220] p-4">
              <p className="text-xs text-gray-500">Campaign Name</p>
              <h3 className="mt-2 font-medium text-white">
                {submission.campaignName}
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Campaign ID</p>
                  <p className="mt-1 text-sm text-white">
                    {submission.campaignId}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-gray-500">Content Type</p>
                  <p className="mt-1 text-sm text-white">
                    {submission.contentType}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6 lg:col-span-5">

          {/* Performance */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
            <h2 className="font-semibold text-white">
              Content Performance
            </h2>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {metrics.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/[0.07] bg-[#202220] p-4"
                  >
                    <Icon size={18} className="text-[#D0FF71]" />

                    <p className="mt-4 text-xl font-semibold text-white">
                      {Number(item.value || 0).toLocaleString("en-IN")}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Creator Note */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
            <h2 className="font-semibold text-white">
              Creator's Note
            </h2>

            <p className="mt-3 rounded-xl bg-[#202220] p-4 text-sm leading-6 text-gray-300">
              {submission.notes || "No additional note provided."}
            </p>
          </div>

          {/* Review Actions */}
          <div className="rounded-2xl border border-white/[0.07] bg-[#191B19] p-5">
            <h2 className="font-semibold text-white">
              Review Submission
            </h2>

            {isPending ? (
              <>
                <p className="mt-2 text-sm text-gray-500">
                  Review the submitted content and choose an action.
                </p>

                <div className="mt-5 space-y-3">
                  <button
                    onClick={() => handleStatusChange("approved")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D0FF71] px-4 py-3 text-sm font-semibold text-black hover:bg-[#c1f45e]"
                  >
                    <CheckCircle2 size={17} />
                    Approve Content
                  </button>

                  <button
                    onClick={() => handleStatusChange("revision_requested")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-blue-400/20 px-4 py-3 text-sm text-blue-400 hover:bg-blue-400/10"
                  >
                    <RotateCcw size={17} />
                    Request Revision
                  </button>

                  <button
                    onClick={() => handleStatusChange("rejected")}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/20 px-4 py-3 text-sm text-red-400 hover:bg-red-400/10"
                  >
                    <XCircle size={17} />
                    Reject Submission
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-4 rounded-xl bg-[#202220] p-4">
                <p className="text-sm text-gray-300">
                  This submission has already been reviewed.
                </p>
                <p className="mt-2 text-sm font-medium text-white">
                  Current status: {currentStatus.label}
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;
