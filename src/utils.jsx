// Icons for icon mapping
import Github from "./components/Icons/Github.jsx";
import Instagram from "./components/Icons/Instagram.jsx";

export async function fetchData() {
  try {
    const response = await fetch("./Data/Data.json");
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(new Error(error));
    return {};
  }
}

// Maps icon components to thier respective string names in data.json
export const iconMap = {
  Github: Github,
  Instagram: Instagram,
};
