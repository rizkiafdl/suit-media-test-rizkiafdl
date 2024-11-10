import { useState, useEffect } from 'react';

// Enhanced types for CMS-like configuration
type HeroConfig = {
    title: string;
    subtitle: string;
    buttonText: string;
    buttonUrl: string;
    backgroundImage: string;
    imageSkew?: {
        enabled: boolean;
        angle: number;
        direction: 'left' | 'right';
    };
    clipPath?: {
        enabled: boolean;
        angle: number;
        position: 'top' | 'bottom' | 'both';
        height: number; // percentage of section height
    };
    overlay?: {
        enabled: boolean;
        color: string;
        opacity: number;
    };
    parallax?: {
        enabled: boolean;
        speed: number;
    };
};

const defaultConfig: HeroConfig = {
    title: "Welcome to Our Website",
    subtitle: "Discover amazing content and join us today!",
    buttonText: "Get Started",
    buttonUrl: "#",
    backgroundImage: "https://i.ibb.co/3Cg6Rj1/toa-heftiba-q-S7-VNx3-H24-unsplash.jpg",
    imageSkew: {
        enabled: false,
        angle: -5,
        direction: 'right'
    },
    clipPath: {
        enabled: true,
        angle: 5,
        position: 'bottom',
        height: 15
    },
    overlay: {
        enabled: true,
        color: '#000000',
        opacity: 0.5
    },
    parallax: {
        enabled: true,
        speed: 0.1
    }
};

const HeroSection = ({ config = defaultConfig }: { config?: HeroConfig }) => {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (config.parallax?.enabled) {
                setScrollPosition(window.pageYOffset);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [config.parallax?.enabled]);

    // Calculate clip path based on configuration
    const getClipPath = () => {
        if (!config.clipPath?.enabled) return 'none';

        const heightPercent = config.clipPath.height;

        switch (config.clipPath.position) {
            case 'top':
                return `polygon(
          0 0,
          100% ${heightPercent}%,
          100% 100%,
          0 100%
        )`;
            case 'bottom':
                return `polygon(
          0 0,
          100% 0,
          100% ${100 - heightPercent}%,
          0 100%
        )`;
            case 'both':
                return `polygon(
          0 ${heightPercent}%,
          100% 0,
          100% ${100 - heightPercent}%,
          0 100%
        )`;
            default:
                return 'none';
        }
    };
    const parallaxStyle = config.parallax?.enabled
        ? {
            transform: `translateY(${scrollPosition * (config.parallax.speed || 0.5)}px)`,
        }
        : {};

    const skewStyle = config.imageSkew?.enabled
        ? {
            transform: `skew(${config.imageSkew.direction === 'left' ? '-' : ''}${config.imageSkew.angle
                }deg)`,
        }
        : {};

    const containerStyle = {
        clipPath: getClipPath(),
        WebkitClipPath: getClipPath(),
    };

    return (
        <section
            className="relative w-full h-screen overflow-hidden"
            style={containerStyle}
        >
            <div
                className="absolute inset-0 w-[120%] h-[120%] -left-[10%] -top-[10%] transition-transform duration-500"
                style={skewStyle}
            >

                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-100"
                    style={{
                        backgroundImage: `url("${config.backgroundImage}")`,
                        ...parallaxStyle,
                    }}
                />
            </div>


            {config.overlay?.enabled && (
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        backgroundColor: config.overlay.color,
                        opacity: config.overlay.opacity,
                    }}
                />
            )}
            <div className="relative z-20 flex flex-col justify-center items-center h-full text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-4xl leading-tight">
                    {config.title}
                </h1>
                <p className="text-lg md:text-xl mt-4 max-w-2xl">
                    {config.subtitle}
                </p>
                <a
                    href={config.buttonUrl}
                    className="mt-8 px-8 py-4 bg-orange-500 text-white rounded-md 
                   hover:bg-orange-600 transition-colors duration-300 
                   transform hover:scale-105"
                >
                    {config.buttonText}
                </a>
            </div>
        </section>
    );
};

export default HeroSection;