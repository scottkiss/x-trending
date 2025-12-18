'use client';

import { TweetCard } from '@/components/TweetCard';
import { useRouter } from 'next/navigation';

interface TimelineClientProps {
    days: {
        date: string;
        urls: string[];
    }[];
    categories: string[];
    currentCategory: string;
}

export function TimelineClient({ days, categories, currentCategory }: TimelineClientProps) {
    const router = useRouter();

    const handleCategoryChange = (category: string) => {
        router.push(`/?category=${category}`);
    };

    return (
        <div className="space-y-8">
            {categories.length > 0 && (
                <div className="flex flex-wrap gap-4 justify-center">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${currentCategory === cat
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                                }`}
                        >
                            {cat.toUpperCase()}
                        </button>
                    ))}
                </div>
            )}

            {days.length === 0 ? (
                <div className="text-center text-muted-foreground py-12 border border-dashed border-border rounded-lg">
                    No data found for category: {currentCategory}
                </div>
            ) : (
                <div className="space-y-12">
                    {days.map(({ date: day, urls }) => (
                        <section key={day} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <h2 className="text-2xl font-mono text-accent sticky top-0 bg-background/80 backdrop-blur py-2 z-10 w-full border-b border-border">
                                    <span className="mr-2">&gt;</span>{day}
                                </h2>
                            </div>

                            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 pl-4 border-l border-border/30 ml-2 space-y-4">
                                {urls.map((url, index) => (
                                    <div key={`${day}-${index}`} className="break-inside-avoid">
                                        <TweetCard url={url} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </div>
    );
}
