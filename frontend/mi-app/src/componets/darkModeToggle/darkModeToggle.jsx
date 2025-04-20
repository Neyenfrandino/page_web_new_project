import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import './darkModeToggle.scss';

const DarkModeToggle = () => {
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem('theme') === 'dark'
    );

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        } else {
        root.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        }
    }, [darkMode]);

    return (
        <button
        onClick={() => setDarkMode(!darkMode)}
        className="darkmode-toggle"
        aria-label="Toggle Dark Mode"
        >
        {darkMode ? <Sun className="icon" /> : <Moon className="icon" />}
        </button>
    );
};

export default DarkModeToggle;
