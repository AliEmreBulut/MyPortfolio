import { UserProfileResponse } from "@/types/user";

interface FooterProps {
  user?: UserProfileResponse | null;
}

export default function Footer({ user }: FooterProps) {
  const name = user?.fullName || "Ali Emre Bulut";
  return (
    <footer className="w-full max-w-[1180px] mx-auto px-[24px] pt-7 pb-[42px] text-[#70798d] text-center text-[13px] font-[760] opacity-85">
      © {new Date().getFullYear()} {name} — Interactive dark code portfolio ✨
    </footer>
  );
}
