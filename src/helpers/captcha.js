import $script from 'scriptjs';

const loadingPromise = (resolve) => {
  window.recaptchaCallback = function recaptchaCallback() {
    resolve(window.grecaptcha);
  };

  $script('https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit');
};

let cachedPromise;

function loadCaptchaApi() {
  if (cachedPromise) {
    return cachedPromise;
  }
  cachedPromise = new Promise(loadingPromise);
  return cachedPromise;
}

export default { load: loadCaptchaApi };
