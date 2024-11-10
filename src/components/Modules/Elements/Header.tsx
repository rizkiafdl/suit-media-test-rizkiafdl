import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { atom, useAtom } from 'jotai';
import EachUtils from '@/utils/EachUtils';
import { LIST_NAVBAR } from "@/constant/listNavbar";

// Create a global atom for active URL state
export const activeUrlAtom = atom<string | null>(null);

const Header = () => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [activeUrl, setActiveUrl] = useAtom(activeUrlAtom);

    // Handle scroll events
    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;

            // Determine if we're scrolled at all (for transparency)
            setIsScrolled(currentScrollY > 0);

            // Show header when scrolling up or at top
            if (currentScrollY < lastScrollY || currentScrollY < 50) {
                setIsVisible(true);
            }
            // Hide header when scrolling down and not at top
            else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);

    // Update active URL when route changes
    useEffect(() => {
        const currentPath = window.location.pathname;
        setActiveUrl(currentPath);
    }, [setActiveUrl]);

    const handleClick = (url: string) => {
        setActiveUrl(url);
        navigate(url);
    };

    return (
        <header
            className={`fixed top-0 left-0 w-full z-30 transition-all duration-300
                ${isVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}
                ${isScrolled
                    ? 'bg-orange-500/40 shadow-md'
                    : 'backdrop-blur-sm bg-orange-500/100'}`}
        >
            <nav className='py-4 px-8'>
                <div className='flex justify-between items-center'>
                    {/* Logo Section */}
                    <div className='flex items-center'>
                        <h1 className='text-xl font-bold text-white'>Suit Media</h1>
                    </div>

                    {/* Navbar Links */}
                    <ul className='flex items-center gap-6'>
                        <EachUtils
                            of={LIST_NAVBAR}
                            render={(item) => (
                                <li key={item.url}>
                                    <button
                                        onClick={() => handleClick(item.url)}
                                        className={`text-white hover:text-gray-300 transition-all relative
                                            ${activeUrl === item.url ? 'after:content-[""] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-white' : ''}`}
                                    >
                                        {item.title}
                                    </button>
                                </li>
                            )}
                        />
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;