"use client";

import React, { useState } from "react";
import SprintManager from "./sprint-manager";

const SprintBoard = ({ sprints, projectId, orgId }) => {
  const [currentSprint, setCurrentSprint] = useState(
    sprints.find((spr) => spr.status === "ACTIVE") || sprints[0]
  );
  return (
    // <div className="flex flex-col">
    <SprintManager
      sprint={currentSprint}
      setSprint={setCurrentSprint}
      sprints={sprints}
      projectId={projectId}
    />
    // </div>
  );
};

export default SprintBoard;
