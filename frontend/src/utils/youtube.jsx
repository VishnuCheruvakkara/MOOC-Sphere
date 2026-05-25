export const getYoutubeThumbnail = (url) => {
    if (!url) return '';

    let videoId = '';

    if (url.includes('watch?v=')) {
        videoId = url.split('watch?v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }

    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};