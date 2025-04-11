import { redirect } from "next/navigation";
import { getUsers } from "@/core/user/services/get-users.service";
import UsersList from "@/app/(admin)/_components/users-lists/UsersList";
import TitleAnimated from "@/shared/components/animations/title-animated/TitleAnimated";
import FadeinContainer from "@/shared/components/containers/fadein-container/FadeinContainer";
import MaxWidthContainer from "@/shared/components/containers/max-width-container/MaxWidthContainer";
import PaddingContainer from "@/shared/components/containers/padding-container/PaddingContainer";
import PaginationRouting from "@/shared/components/pagination/PaginationRouting";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

interface Props {
  searchParams: SearchParams;
}

async function UsersPage({ searchParams }: Props): Promise<React.ReactElement> {
  const query = await searchParams;
  const queryPage = query.page ?? 1;

  const page = isNaN(Number(queryPage)) ? null : Number(queryPage);

  if (page === null || page < 0) redirect("/admin");

  const { pages, users } = await getUsers({ page, take: 12 });

  return (
    <MaxWidthContainer>
      <FadeinContainer>
        <PaddingContainer>
          <TitleAnimated title="Usuarios" subtitle="Todas los usuarios" />
          <UsersList users={users} />
          <div className="mt-[20px]">
            <PaginationRouting pages={pages} defaultPage={page} />
          </div>
        </PaddingContainer>
      </FadeinContainer>
    </MaxWidthContainer>
  );
}
export default UsersPage;
