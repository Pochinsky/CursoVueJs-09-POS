import { generateClasses } from "@formkit/themes";

const label = "block mb-1 font-bold text-lg";
const message = "text-red-500";

const config = {
  config: {
    classes: generateClasses({
      global: {
        label: "block font-bold text-lg",
        message: "text-red-500 mb-2",
        wrapper: "space-y-1 mb-4",
        input:
          "w-full p-3 border border-gray-300 rounded text-gray-700 placeholder-gray-400 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500",
      },
      file: {
        noFiles: "block my-2",
        fileItem: "hidden",
      },
      submit: {
        input:
          "$reset bg-green-400 hover:bg-green-500 w-full p-2 font-bold uppercase disabled:opacity-50 rounded mt-4",
      },
    }),
  },
};

export default config;
