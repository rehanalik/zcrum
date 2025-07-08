import { getProjects } from "@/actions/projects";
import { notFound } from "next/navigation";
import SprintCreationForm from "../_components/create-sprint";

export default async function ProjectPage({ params }) {
  const { projectId } = await params;
  const project = await getProjects(projectId);

  if (!project) {
    notFound();
  }

  return (
    <div className="container mx-auto">
      <SprintCreationForm
        projectTitle={project.name}
        projectId={projectId}
        projectKey={project.key}
        sprintKey={project.sprints?.length + 1}
      />
    </div>
  );
}
