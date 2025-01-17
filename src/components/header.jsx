import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Github, Info, PlayCircle } from "lucide-react";

const Header = () => {
  const scrollToCompressor = () => {
    const element = document.getElementById("compressor");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const scrollToFaq = () => {
    const element = document.getElementById("faq");
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="px-6 py-4 fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm z-50">
      <nav className="flex items-center justify-between max-w-7xl mx-auto relative">
        {/* Logo on the left */}
        <div className="flex-shrink-0">
          <img src="/logo.png" alt="Logo" className="h-14 w-auto" />
        </div>

        {/* Title in center */}
        <span className="font-bold text-xl absolute left-1/2 transform -translate-x-1/2">
          <span className="text-red-500">Snap </span>
          <span className="text-blue-900">Shrink</span>
        </span>

        {/* Dropdown on the right */}
        <div className="flex-shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger className="focus:outline-none">
              <Avatar className="h-9 w-9 hover:opacity-80 transition-opacity">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>TQ</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Navigation</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  scrollToCompressor();
                }}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <PlayCircle className="h-4 w-4 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">Get Started</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  scrollToFaq();
                }}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <Info className="h-4 w-4 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">FAQ</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  window.open(
                    "https://github.com/yourusername/yourrepo",
                    "_blank"
                  );
                }}
                className="flex items-center gap-2 cursor-pointer group"
              >
                <Github className="h-4 w-4 group-hover:text-blue-500" />
                <span className="group-hover:text-blue-500">GitHub</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <div className="px-2 py-1.5 text-sm text-muted-foreground">
                Made with ❤️ by Tawqeer
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  );
};

export default Header;
