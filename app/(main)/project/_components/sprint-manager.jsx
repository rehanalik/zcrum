"use client";

import { updateSprintStatus } from "@/actions/sprints";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { format, isAfter, isBefore } from "date-fns";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SprintManager = ({ sprint, setSprint, sprints, projectId }) => {
  const [sprintStatus, setSprintStatus] = useState(sprint.status);
  const router = useRouter();
  const searchParams = useParams();
  const {
    loading,
    fn: updateStatus,
    error,
    data: updatedStatus,
  } = useFetch(updateSprintStatus);
  const startDate = new Date(sprint.startDate);
  const endDate = new Date(sprint.endDate);
  const now = new Date();
  const canStart =
    sprintStatus === "PLANNED" &&
    isBefore(now, endDate) &&
    isAfter(now, startDate);
  const canEnd = sprintStatus === "ACTIVE";

  const handleStatusChange = async (newStatus) => {
    updateStatus(sprint.id, newStatus);
  };

  const handleSprintChange = (value) => {
    const selectedSprint = sprints.find((s) => s.id === value);
    setSprint(selectedSprint);
    setSprintStatus(selectedSprint.status);
  };

  useEffect(() => {
    if (updatedStatus?.sprint?.status) {
      setSprintStatus(updatedStatus.sprint.status);
      setSprint((prev) => ({ ...prev, status: updatedStatus.sprint.status }));
    }
  }, [updatedStatus, setSprint]);

  return (
    <>
      <div className="flex gap-4">
        <div className="flex-1">
          <Select value={sprint.id} onValueChange={handleSprintChange}>
            <SelectTrigger className="bg-slate-950 self-start w-full">
              <SelectValue placeholder="Select Sprint" />
            </SelectTrigger>
            <SelectContent>
              {sprints.map((sprint) => (
                <SelectItem key={sprint.id} value={sprint.id}>
                  {sprint.name} ({format(sprint.startDate, "MMM d, yyyy")} to{" "}
                  {format(sprint.endDate, "MMM d, yyyy")})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          {canStart && (
            <Button
              onClick={() => handleStatusChange("ACTIVE")}
              disabled={loading}
              className="bg-green-900 text-white"
            >
              Start Sprint
            </Button>
          )}
          {canEnd && (
            <Button
              onClick={() => handleStatusChange("COMPLETED")}
              disabled={loading}
              variant="destructive"
            >
              End Sprint
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default SprintManager;
