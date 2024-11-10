import MainLayouts from "@/components/Layouts/MainLayouts";
import HeroSection from "@/components/Modules/IdeasPage/HeroSection";
import IdeasList from "@/components/Modules/IdeasPage/ListPost";



const Ideas = () => {
    return (
        <MainLayouts>
            <HeroSection />
            <IdeasList />
        </MainLayouts>
    );
};

export default Ideas;
