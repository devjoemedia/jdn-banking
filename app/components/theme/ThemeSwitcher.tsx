"use client";
import { useTheme } from "next-themes";
import { BiMoon, BiSun } from "react-icons/bi";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <ul className='space-y-5 text-primary-text'>
        <li className='flex space-x-3 items-center px-5 py-3 '>
          <div className='w-20 relative bg-secondary-bg rounded-full h-10 px-2 flex items-center'>
            {theme == "light" ? (
              <BiMoon
                className={`text-3xl hover:cursor-pointer absolute left-1 ${
                  theme == "light" && "right-11 transition-all duration-500 "
                }`}
                onClick={() => setTheme("dark")}
              />
            ) : (
              <BiSun
                className={`text-3xl hover:cursor-pointer absolute left-1 ${
                  theme == "dark" && "left-11 transition-all duration-500 "
                }`}
                onClick={() => setTheme("light")}
              />
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ThemeSwitcher;
