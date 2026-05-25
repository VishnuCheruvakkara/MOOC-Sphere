const extractYouTubeId = (url) => {
    if (!url) return '';

    try {
        const shortMatch = url.match(/youtu\.be\/([^?]+)/);
        if (shortMatch) return shortMatch[1];

        const longMatch = url.match(/v=([^&]+)/);
        if (longMatch) return longMatch[1];

        const embedMatch = url.match(/embed\/([^?]+)/);
        if (embedMatch) return embedMatch[1];

        return '';
    } catch {
        return '';
    }
};

export const getYoutubeThumbnail = (url) => {
    const videoId = extractYouTubeId(url);
    if (!videoId) return '';

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

export const YoutubePlayer = ({ url, title }) => {
    if (!url) {
        return (
            <div className="flex items-center justify-center h-full text-deep-lavender-400">
                No Video Available
            </div>
        );
    }

    const videoId = extractYouTubeId(url);
    const embedUrl = videoId
        ? `https://www.youtube.com/embed/${videoId}`
        : url;

    return (
        <div className="w-full aspect-video border-2 border-deep-lavender-300 bg-black">
            <iframe
                className="w-full h-full"
                src={embedUrl}
                title={title}
                allowFullScreen
            />
        </div>
    );
};