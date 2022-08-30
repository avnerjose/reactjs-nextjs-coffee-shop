import { FacebookLogo, InstagramLogo, LinkedinLogo } from "phosphor-react";

export function Footer() {
  return (
    <footer className="bg-dark text-white p-10">
      <div className="flex-1 flex items-center justify-between">
        <div className="flex flex-col text-sm text-gray-300">
          <span>© {new Date().getFullYear()} All Rights reserved</span>
          <span>Developed by Avner José</span>
        </div>
        <div className="flex text-3xl gap-2">
          <InstagramLogo className="cursor-pointer" />
          <FacebookLogo className="cursor-pointer" />
          <LinkedinLogo className="cursor-pointer" />
        </div>
      </div>
    </footer>
  );
}
