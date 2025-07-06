import { getOrganization } from "@/actions/organizations";
import OrgSwitcher from "@/components/org-switcher";
import ProjectList from "../_components/project-list";

const OrganizationPage = async ({ params }) => {
  const { orgId } = await params;
  const organization = await getOrganization(orgId);

  if (!organization) return <div>Organization not Found</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start">
        <h1 className="text-5xl font-bold gradient-title pb-2">
          {organization.name}&apos; Projects
        </h1>
        <OrgSwitcher />
      </div>
      <div className="mb-4">
        <ProjectList orgId={organization.id} />
      </div>
    </div>
  );
};

export default OrganizationPage;
