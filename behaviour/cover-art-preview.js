const coverArtInput = document.querySelector('input[type="file"]');
const coverArtPreview = document.querySelector("#cover-art");

coverArtInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    coverArtPreview.src = event.target.result;
  };
  reader.readAsDataURL(file);
});
