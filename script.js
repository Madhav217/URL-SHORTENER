document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "8324505bd76928701327bcc8caaea0a32a1cb08c"; // Replace with your Bitly API key
    const longUrlInput = document.getElementById("long-url");
    const shortenBtn = document.getElementById("shorten-btn");
    const resultDiv = document.getElementById("result");
    const shortUrlElement = document.getElementById("short-url");

    shortenBtn.addEventListener("click", () => {
        const longUrl = longUrlInput.value.trim();
        if (longUrl && isValidUrl(longUrl)) {
            fetch("https://api-ssl.bitly.com/v4/shorten", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ long_url: longUrl })
            })
            .then(response => response.json())
            .then(data => {
                if (data.link) {
                    shortUrlElement.textContent = `Shortened URL: ${data.link}`;
                    resultDiv.style.display = "block";
                } else {
                    alert("Error shortening the URL. Please try again.");
                    resultDiv.style.display = "none";
                }
            })
            .catch(error => {
                console.error("Error shortening URL:", error);
                alert("Error shortening the URL. Please try again.");
                resultDiv.style.display = "none";
            });
        } else {
            alert("Please enter a valid URL.");
            resultDiv.style.display = "none";
        }
    });

    function isValidUrl(url) {
        try {
            new URL(url);
            return true;
        } catch (_) {
            return false;
        }
    }
});
