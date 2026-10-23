


export function truncateText(text: string, maxWords: number) {

    const words = text.split(/\s+/)

    if (words.length <= maxWords) {
        return text
    }

    return words.slice(0, maxWords).join(" ") + "..."
}