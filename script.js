// Page Navigation Functions
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
  document.getElementById(pageId).classList.add('active');
}

function showARPage(subPageId) {
  showPage('arPageContainer');
  document.querySelectorAll('.ar-subpage').forEach(subPage => subPage.classList.remove('active'));
  document.getElementById(subPageId).classList.add('active');
}

// Error and Loading Handlers
function showError(message, duration = 3000) {
  const errorElement = document.getElementById('errorMessage');
  errorElement.textContent = message;
  errorElement.classList.add('active');
  setTimeout(() => errorElement.classList.remove('active'), duration);
}

function showLoading(show = true) {
  document.getElementById('loadingIndicator').classList.toggle('active', show);
}

// AR Marker Handling
const arMarker = document.getElementById('arMarker');
let markerVisible = false;

arMarker.addEventListener('markerFound', () => {
  markerVisible = true;
});

arMarker.addEventListener('markerLost', () => {
  markerVisible = false;
});

function projectImageOnMarker(imageUrl) {
  document.getElementById('arPlane').setAttribute('material', {
    shader: 'flat',
    src: imageUrl,
    transparent: true
  });
}

// Screen Share Functionality
const startShareBtn = document.getElementById('startShareBtn');
const captureBtn = document.getElementById('captureBtn');
const sharedScreenPreview = document.getElementById('sharedScreenPreview');
let screenStream = null;

startShareBtn.addEventListener('click', async () => {
  try {
    screenStream = await navigator.mediaDevices.getDisplayMedia({
      video: true,
      audio: false
    });

    sharedScreenPreview.srcObject = screenStream;
    sharedScreenPreview.style.display = 'block';
    captureBtn.disabled = false;

    screenStream.getVideoTracks()[0].addEventListener('ended', () => {
      sharedScreenPreview.style.display = 'none';
      captureBtn.disabled = true;
      screenStream = null;
    });
  } catch (err) {
    console.error('Screen share error:', err);
    showError('Screen share failed. Please try again.');
  }
});

captureBtn.addEventListener('click', () => {
  if (!markerVisible) {
    showError('Please ensure the marker is visible before capturing.');
    return;
  }

  if (!screenStream) {
    showError('Please start screen sharing first.');
    return;
  }

  captureScreenshot();
});

function captureScreenshot() {
  try {
    document.querySelector('.flash').classList.add('active');
    setTimeout(() => document.querySelector('.flash').classList.remove('active'), 200);

    const videoTrack = screenStream.getVideoTracks()[0];
    const imageCapture = new ImageCapture(videoTrack);

    showLoading();
    imageCapture.grabFrame()
      .then(imageBitmap => {
        const canvas = document.createElement('canvas');
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(imageBitmap, 0, 0);

        projectImageOnMarker(canvas.toDataURL('image/png'));
      })
      .catch(err => {
        console.error('Screenshot capture failed:', err);
        showError('Failed to capture screen. Please try again.');
      })
      .finally(() => showLoading(false));
  } catch (error) {
    console.error('Error in screenshot process:', error);
    showError('Failed to process screenshot. Please try again.');
    showLoading(false);
  }
}

// Image Upload Functionality
const uploadImage = document.getElementById('uploadImage');
const removeBgBtn = document.getElementById('removeBgBtn');
let originalFile = null;

uploadImage.addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    originalFile = file;
    const reader = new FileReader();
    reader.onload = function(e) {
      projectImageOnMarker(e.target.result);
      removeBgBtn.disabled = false;
    };
    reader.readAsDataURL(file);
  }
});

removeBgBtn.addEventListener('click', function() {
  if (!originalFile) {
    showError("Please upload an image first!");
    return;
  }

  const formData = new FormData();
  formData.append('image_file', originalFile);

  showLoading();
  fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': 'i4un4Meyf3jKZ2XcXbpZnerm'
    },
    body: formData
  })
  .then(response => response.blob())
  .then(blob => {
    const reader = new FileReader();
    reader.onload = function(e) {
      projectImageOnMarker(e.target.result);
    };
    reader.readAsDataURL(blob);
  })
  .catch(err => {
    console.error("Background removal failed:", err);
    showError("Failed to remove background. Please try again later.");
  })
  .finally(() => showLoading(false));
});

// Full Scene Capture Functionality
function captureFullScene() {
  if (!markerVisible) {
    showError('Please ensure the marker is visible before capturing.');
    return;
  }

  document.querySelector('.flash').classList.add('active');
  setTimeout(() => document.querySelector('.flash').classList.remove('active'), 200);

  showLoading();
  html2canvas(document.querySelector('a-scene')).then(canvas => {
    const link = document.createElement('a');
    link.download = 'ar-capture.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }).catch(err => {
    console.error('Full screen capture failed:', err);
    showError('Failed to capture the full screen. Please try again.');
  }).finally(() => showLoading(false));
}

// Add event listeners for shutter buttons
document.getElementById('shutterBtnScreenShare').addEventListener('click', captureFullScene);
document.getElementById('shutterBtnImageUpload').addEventListener('click', captureFullScene);

// Initialize the application
window.onload = function() {
  showPage('homepage');
};