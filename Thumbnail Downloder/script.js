const input = document.getElementById("input");
const getThumbnail = document.getElementById("getThumbnail");
const thumbnail = document.getElementById("thumbnail");
const downloadBtn = document.getElementById("downloadBtn");

let youtubeImage;
getThumbnail.addEventListener('click', function() {
    let inputValue = input.value;
    // Need to get the unique ID: BZD5z0sr4Aw

    // YouTube URL Pattern can be
    // 1. https://youtu.be/BZD5z0sr4Aw
    // 2. https://www.youtube.com/watch?v=BZD5z0sr4Aw&t
    // 3. https://www.youtube.com/watch?v=BZD5z0sr4Aw&t=465s
    // 4. https://www.youtu.be/BZD5z0sr4Aw
    // 5. youtube.com/watch?v=BZD5z0sr4Aw&t

    let pattern1 = inputValue.split('watch?v=')[1];
    let pattern2 = inputValue.split('youtu.be/')[1];

    if (pattern1 || pattern2) {
        // let youtubeImage = `https://img.youtube.com/vi/${pattern1 || pattern2}/hqdefault.jpg`;
        youtubeImage = `https://img.youtube.com/vi/${pattern1 || pattern2}/maxresdefault.jpg`;
        thumbnail.src = youtubeImage;
    }
    console.log(youtubeImage);
})


downloadBtn.addEventListener('click', () => {
    downloadBtn.innerText = "Downloading...";
    fetchFile(youtubeImage);
})

function fetchFile(url) {
    // fetching file and reurning res as blob
    fetch(url).then((res) => res.blob()).then((file) => {
        // 
        let tempUrl = URL.createObjectURL(file);
        let aTag = document.createElement('a');
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        aTag.remove();
        URL.revokeObjectURL(tempUrl);
        downloadBtn.innerText = "Download";
    })
}