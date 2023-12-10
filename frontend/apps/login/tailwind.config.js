/** @type {import('tailwindcss').Config} */
import config from "../../packages/ui/tailwind.config.js"
export default {
    content: [
        "./login.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        '../../packages/ui/**/*.{js,jsx,ts,tsx}',
        '../../packages/ui/tailwind.config.js',
    ],
    plugins: [
        function({ addVariant }) {
            addVariant('child', '& > *');
            addVariant('child-hover', '& > *:hover');
            addVariant('child-focus', '& > *:focus');
        }
    ],
}

