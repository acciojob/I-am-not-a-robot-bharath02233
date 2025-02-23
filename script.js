document.addEventListener("DOMContentLoaded", () => {
    const imageContainer = document.getElementById("image-container");
    const verifyBtn = document.getElementById("verify");
    const resetBtn = document.getElementById("reset");
    const result = document.getElementById("result");

    // Random images (using free placeholder images)
    const images = [
        "https://picsum.photos/150?random=1",
        "https://picsum.photos/150?random=2",
        "https://picsum.photos/150?random=3",
        "https://picsum.photos/150?random=4",
        "https://picsum.photos/150?random=5"
    ];

    // Pick a random image to duplicate
    const duplicateImage = images[Math.floor(Math.random() * images.length)];
    let allImages = [...images, duplicateImage];

    // Shuffle images
    allImages = allImages.sort(() => Math.random() - 0.5);

    // Track user selections
    let selectedImages = [];

    // Display images
    allImages.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.setAttribute("data-id", index);
        img.addEventListener("click", () => selectImage(img, src));
        imageContainer.appendChild(img);
    });

    function selectImage(img, src) {
        if (selectedImages.includes(src)) return; // Prevent double selection

        img.classList.add("selected");
        selectedImages.push(src);

        resetBtn.style.display = "block";

        if (selectedImages.length === 2) {
            verifyBtn.style.display = "block";
        }
    }

    verifyBtn.addEventListener("click", () => {
        if (selectedImages[0] === selectedImages[1]) {
            result.innerText = "✅ You are a human. Congratulations!";
        } else {
            result.innerText = "❌ We can't verify you as a human. You selected non-identical tiles.";
        }
        verifyBtn.style.display = "none";
    });

    resetBtn.addEventListener("click", () => {
        selectedImages = [];
        result.innerText = "";
        verifyBtn.style.display = "none";
        resetBtn.style.display = "none";
        document.querySelectorAll("img").forEach(img => img.classList.remove("selected"));
    });
});
