// useIdeas.ts
import { useState, useEffect } from 'react';
import axios from 'axios';

type Image = {
    id: number;
    mime: string;
    file_name: string;
    url: string;
};

type Idea = {
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

type ApiResponse = {
    data: Idea[];
    length: number;
};

type UseIdeasReturn = {
    ideas: Idea[];
    isLoading: boolean;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
    sortBy: string;
    setPageNumber: (pageNumber: number) => void;
    setPageSize: (pageSize: number) => void;
    setSortBy: (sortBy: string) => void;
    handleNextPage: () => void;
    handlePrevPage: () => void;
};

const useIdeas = (): UseIdeasReturn => {
    const [ideas, setIdeas] = useState<Idea[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>('-published_at');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchIdeas = async () => {
            setIsLoading(true);
            try {
                const baseUrl = 'https://suitmedia-backend.suitdev.com/api/ideas';
                const response = await axios.get<ApiResponse>(baseUrl, {
                    params: {
                        'page[number]': pageNumber,
                        'page[size]': pageSize,
                        sort: sortBy,
                        'append[]': ['small_image', 'medium_image'],
                    },
                });

                setIdeas(response.data.data);
                setTotalPages(response.data.data.length);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchIdeas();
    }, [pageNumber, pageSize, sortBy]);

    const handleNextPage = () => setPageNumber((prev) => prev + 1);
    const handlePrevPage = () => setPageNumber((prev) => Math.max(prev - 1, 1));

    return {
        ideas,
        isLoading,
        totalPages,
        pageNumber,
        pageSize,
        sortBy,
        setPageNumber,
        setPageSize,
        setSortBy,
        handleNextPage,
        handlePrevPage,
    };
};

export default useIdeas;