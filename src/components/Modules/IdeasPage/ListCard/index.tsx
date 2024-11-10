import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

// Types
type Image = {
    id: number;
    mime: string;
    file_name: string;
    url: string;
};

type IdeaData = {
    id: number;
    slug: string;
    description: string;
    small_image?: Image[];
    medium_image?: Image[];
    published_at?: string;
    updated_at?: string;
    created_at?: string;
    title?: string;
};

type ListCardProps = {
    data: IdeaData;
    className?: string;
};

const ListCard = ({ data, className }: ListCardProps) => {
    // Format date to be more readable
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };


    const getImageUrl = () => {
        if (data.medium_image?.[0]?.url) {
            return data.medium_image[0].url;
        }
        if (data.small_image?.[0]?.url) {
            return data.small_image[0].url;
        }
        return 'https://i.ibb.co/3Cg6Rj1/toa-heftiba-q-S7-VNx3-H24-unsplash.jpg';
    };

    return (
        <Card
            className={`
                group
                relative
                w-full 
                aspect-[3/4]
                overflow-hidden
                transition-all
                duration-300
                hover:shadow-xl
                rounded-lg
                bg-white
                ${className || ''}
            `}
        >
            <div className="relative w-full h-[60%] overflow-hidden">
                <img
                    src={getImageUrl()}
                    alt={data.title || 'Card image'}
                    className="
                        w-full 
                        h-full 
                        object-cover
                        transition-transform
                        duration-300
                        group-hover:scale-105
                    "
                    loading="lazy"
                />

                <div className="
                    absolute
                    bottom-0
                    left-0
                    w-full
                    h-1/4
                    bg-gradient-to-t
                    from-black/20
                    to-transparent
                "/>
            </div>


            <CardHeader className="
                h-[40%]
                flex
                flex-col
                justify-between
                p-4
                space-y-2
            ">

                <CardDescription className="
                    text-sm
                    text-muted-foreground
                    font-medium
                ">
                    {formatDate(data.published_at)}
                </CardDescription>

                <CardTitle className="
                    text-base
                    sm:text-lg
                    font-semibold
                    line-clamp-3
                    leading-tight
                ">
                    {data.title || 'Untitled'}
                </CardTitle>
            </CardHeader>
        </Card>
    );
};

export default ListCard;