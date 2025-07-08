"use server";

import { db } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";

export async function createProject(data) {
  const { userId, orgId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!orgId) {
    throw new Error("No Organization Selected");
  }

  const { data: membershipList } = await (
    await clerkClient()
  ).organizations.getOrganizationMembershipList({
    organizationId: orgId,
  });

  // Use userId directly from the membership object
  const userMembership = membershipList.find(
    (membership) => membership.publicUserData.userId === userId
  );

  if (!userMembership || userMembership.role !== "org:admin") {
    throw new Error("Only organization admins can create projects");
  }

  try {
    const project = await db.project.create({
      data: {
        name: data.name,
        key: data.key,
        description: data.description,
        organizationId: orgId,
      },
    });

    return project;
  } catch (error) {
    throw new Error("Error creating project: " + error.message);
  }
}

export async function deleteProject(projectId) {
  const { userId, orgId, orgRole } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  if (orgRole !== "org:admin") {
    throw new Error("Only organization admins can delete projects");
  }

  const project = await db.project.findUnique({
    where: { id: projectId },
  });

  if (!project || project.organizationId !== orgId) {
    throw new Error(
      "Project not found or you don't have permission to delete it"
    );
  }

  await db.project.delete({
    where: {
      id: projectId,
    },
  });

  return { success: true };
}

export async function getProjects(projectId) {
  const { userId, orgId } = await auth();

  if (!userId || !orgId) {
    throw new Error("Unauthorized");
  }

  const user = await db.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      sprints: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!project) {
    throw new Error("Project not Found");
  }

  if (project.organizationId !== orgId) {
    return null;
  }

  return project;
}
