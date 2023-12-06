document.addEventListener('DOMContentLoaded', () => {
    const animeForm = document.getElementById('animeForm');
    const animeCard = document.getElementById('animeCard');
    const animeImage = document.getElementById('animeImage');
    const trackedAnime = document.getElementById('trackedAnime');

    animeForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const animeName = event.target.animeName.value;

        if (animeName) {
            try {
                // Fetch anime image based on the provided name
                const response = await fetch(`https://api.jikan.moe/v4/characters?q=${animeName}`);
                const data = await response.json();

                if (data && data.data && data.data.length > 0) {
                    const imageUrl = data.data[0].images.jpg.image_url;
                    animeImage.src = imageUrl;
                    trackedAnime.textContent = animeName;
                    animeCard.classList.remove('d-none');

                    // Set anime name in a cookie for tracking
                    document.cookie = `trackedAnime=${encodeURIComponent(animeName)}`;
                } else {
                    alert('Anime not found');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    // Check for tracked anime cookie on page load
    const trackedAnimeCookie = getCookie('trackedAnime');
    if (trackedAnimeCookie) {
        animeCard.classList.remove('d-none');
        trackedAnime.textContent = trackedAnimeCookie;
    }
});

// Helper function to get cookie value by name
function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? decodeURIComponent(cookieValue[2]) : null;
}
