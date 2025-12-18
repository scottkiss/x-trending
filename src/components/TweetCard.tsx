'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { extractTweetId } from '@/lib/utils';

interface TweetCardProps {
    url: string;
    isSelected: boolean;
    onToggleSelection: () => void;
}

declare global {
    interface Window {
        twttr?: {
            widgets: {
                createTweet: (
                    tweetId: string,
                    container: HTMLElement,
                    options?: Record<string, unknown>
                ) => Promise<HTMLElement | undefined>;
            };
            ready: (callback: () => void) => void;
        };
    }
}

export function TweetCard({ url }: { url: string }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const { resolvedTheme } = useTheme();
    const isLoadingRef = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isActive = true;
        const tweetId = extractTweetId(url);

        if (!tweetId) {
            if (isActive) {
                setError(true);
                setIsLoading(false);
            }
            return;
        }

        const attemptLoad = () => {
            // If component unmounted or effect invalidated, stop
            if (!isActive) return;

            if (!window.twttr?.widgets) {
                setTimeout(attemptLoad, 500);
                return;
            }

            // Mark as loading state
            setIsLoading(true);
            setError(false);

            // Clear container before starting
            container.innerHTML = '';

            window.twttr.widgets
                .createTweet(tweetId, container, {
                    theme: resolvedTheme || 'dark',
                    dnt: true,
                    conversation: 'none',
                    cards: 'visible',
                })
                .then((el) => {
                    // If effect cleanup ran, remove the created widget and ignore
                    if (!isActive) {
                        if (el) el.remove();
                        return;
                    }

                    // Success
                    setIsLoading(false);
                    setError(!el);

                    if (!el) {
                        console.warn('Twitter widget created undefined element');
                    }
                })
                .catch((err) => {
                    if (!isActive) return;
                    console.error('Twitter widget creation failed:', err);
                    setError(true);
                    setIsLoading(false);
                });
        };

        attemptLoad();

        // Cleanup function
        return () => {
            isActive = false;
            // We can't cancel the createTweet promise, but we handle the result with the isActive check
            // We also clear the container to be safe, but only if we are sure we want to destroy it
            if (container) {
                container.innerHTML = '';
            }
        };
    }, [url, resolvedTheme]);

    const handleRetry = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        setIsLoading(true);
        setError(false);
        isLoadingRef.current = false;

        const tweetId = extractTweetId(url);
        if (!tweetId) return;

        container.innerHTML = '';

        if (window.twttr?.widgets) {
            isLoadingRef.current = true;
            window.twttr.widgets
                .createTweet(tweetId, container, {
                    theme: resolvedTheme || 'dark',
                    dnt: true,
                    conversation: 'none',
                    cards: 'visible',
                })
                .then((el) => {
                    setIsLoading(false);
                    setError(!el);
                })
                .catch(() => {
                    setError(true);
                    setIsLoading(false);
                });
        }
    }, [url, resolvedTheme]);

    return (
        <div className="break-inside-avoid mb-4 relative transition-all duration-200 group">
            {/* Action buttons */}
            <div className="card-actions absolute top-2 right-2 z-[100] flex gap-2 opacity-0 -translate-y-1 transition-all pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground transition-all backdrop-blur-sm hover:bg-accent hover:border-accent hover:text-accent-foreground"
                    onClick={(e) => e.stopPropagation()}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                    </svg>
                </a>
            </div>

            {/* Tweet embed container */}
            <div
                className={`relative w-full pointer-events-none ${!isLoading && !error ? '' : 'aspect-square'}`}
            >
                {isLoading && !error && (
                    <div className="absolute inset-0 bg-muted border border-border rounded-xl animate-pulse" />
                )}
                {error && (
                    <div className="absolute inset-0 bg-muted border border-border rounded-xl flex flex-col items-center justify-center gap-3 text-muted-foreground">
                        <span>加载失败</span>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleRetry();
                            }}
                            className="btn-primary pointer-events-auto"
                        >
                            重试
                        </button>
                    </div>
                )}
                <div ref={containerRef} className="tweet-container" />
            </div>
        </div>
    );
}
