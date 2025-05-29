import { Search } from "lucide-react";
import { useSearch } from "../../context/SearchContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Logo from "../../../public/pictures/logo.png";

export const Header = () => {
  const { searchInput, setSearchInput, setCity } = useSearch();
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent | React.MouseEvent) => {
    e.preventDefault();
    if (searchInput.trim() === "") return;
    const cityWithSpaces = searchInput.trim();
    setCity(cityWithSpaces);
    setSearchInput("");
    const cityForUrl = cityWithSpaces.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${cityForUrl}`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-6 drop-shadow-lg">
          <Image
            src={Logo}
            alt="Wetter Logo"
            width={150}
            height={50}
            className="inline-block mb-2"
          />
        </h1>

        <div className="max-w-md mx-auto">
          <div className="relative">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Stadt eingeben..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(e);
                }
              }}
              className="w-full px-4 py-3 rounded-full text-gray-700 bg-white/90 backdrop-blur-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 pr-12"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
