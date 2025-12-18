import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

export function getCategories(): string[] {
    if (!fs.existsSync(DATA_DIR)) {
        return [];
    }
    const items = fs.readdirSync(DATA_DIR, { withFileTypes: true });
    return items
        .filter(item => item.isDirectory())
        .map(item => item.name)
        .sort();
}

export function getDays(category: string): string[] {
    const categoryDir = path.join(DATA_DIR, category);
    if (!fs.existsSync(categoryDir)) {
        return [];
    }
    const files = fs.readdirSync(categoryDir);
    // Filter for text files and sort descending (assuming YYYY-MM-DD format)
    return files
        .filter(file => file.endsWith('.txt'))
        .map(file => file.replace('.txt', ''))
        .sort((a, b) => b.localeCompare(a));
}

export function getUrlsForDay(day: string, category: string): string[] {
    const filePath = path.join(DATA_DIR, category, `${day}.txt`);
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return content
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && line.startsWith('http'));
}
