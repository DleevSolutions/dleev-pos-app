interface RegistrationConfig {
  onUpdate?: (registration: ServiceWorkerRegistration) => void;
  onSuccess?: (registration: ServiceWorkerRegistration) => void;
}

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('Service Worker registered', registration);
          // Call the registerValidSW function to handle registration and update
          registerValidSW('/service-worker.js', {
            onUpdate: () => {
              // Handle service worker update
              console.log('Service worker has been updated:', registration);
            },
            onSuccess: () => {
              // Handle successful service worker registration
              console.log('Service worker has been registered:', registration);
              // loadWebFonts();
            },
          });
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
}

function registerValidSW(swUrl: string, config: RegistrationConfig) {
  return navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (registration.active) {
              console.log('New content is available and will be used when all tabs for this page are closed.');
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('Content is cached for offline use.');
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error during service worker registration:', error);
    });
}
