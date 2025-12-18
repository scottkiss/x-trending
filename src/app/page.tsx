import { getDays, getUrlsForDay, getCategories } from '@/lib/data';
import { TimelineClient } from '@/components/TimelineClient';

export const dynamic = 'force-dynamic';

export default function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const categories = getCategories();

    let currentCategory = typeof searchParams.category === 'string' ? searchParams.category : '';

    if (!currentCategory && categories.length > 0) {
        if (categories.includes('general')) {
            currentCategory = 'general';
        } else {
            currentCategory = categories[0];
        }
    }

    const days = getDays(currentCategory).map(day => ({
        date: day,
        urls: getUrlsForDay(day, currentCategory)
    }));

    return (
        <main className="min-h-screen p-8 w-full max-w-[1800px] mx-auto">
            <header className="mb-12 text-center">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-cyan mb-4">
                    Trending Topics
                </h1>
                <p className="text-muted-foreground">Archive of daily tweets</p>
            </header>

            <TimelineClient
                days={days}
                categories={categories}
                currentCategory={currentCategory}
            />
        </main>
    );
}
