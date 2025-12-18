// Utility functions for Tweetfing

/**
 * Extract Twitter/X URLs from text
 */
export function extractUrls(text: string): string[] {
    // Match Twitter/X status URLs, stopping before query strings
    const regex = /https?:\/\/(?:x|twitter)\.com\/[a-zA-Z0-9_]+\/status\/(\d+)/gi;
    const matches: { id: string; url: string }[] = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        const tweetId = match[1];
        const normalizedUrl = `https://twitter.com/${match[0].split('/status/')[0].split('/').pop()}/status/${tweetId}`;

        // Only add if this tweet ID hasn't been seen
        if (!matches.some(m => m.id === tweetId)) {
            matches.push({ id: tweetId, url: normalizedUrl });
        }
    }

    return matches.map(m => m.url);
}

/**
 * Extract tweet ID from URL
 */
export function extractTweetId(url: string): string | null {
    const match = url.match(/status\/(\d+)/);
    return match ? match[1] : null;
}

/**
 * Format like count (e.g., 1500 -> "1.5K")
 */
export function formatLikes(likes: number): string {
    if (likes >= 1000) {
        return (likes / 1000).toFixed(1) + 'K';
    }
    return likes.toString();
}

/**
 * Local storage key for cached content
 */
export const CACHE_KEY = 'tweet-filter-content';
export const THEME_KEY = 'tweet-filter-theme';
