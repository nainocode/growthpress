import Link from "next/link";

type AuthorBoxProps = {
  name: string;
  bio: string;
  profileUrl?: string;
};

export default function AuthorBox({
  name,
  bio,
  profileUrl = "/author/husnain-raza",
}: AuthorBoxProps) {
  return (
    <div className="mt-10 rounded-xl border p-5">
      <p className="text-sm text-gray-500 mb-2">
        Written by
      </p>

      <h3 className="text-xl font-semibold">
        {name}
      </h3>

      <p className="mt-2 text-gray-700 leading-7">
        {bio}
      </p>

      <Link
        href={profileUrl}
        className="inline-block mt-3 text-blue-600 hover:underline"
      >
        View Author Profile
      </Link>
    </div>
  );
}