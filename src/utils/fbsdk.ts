export const initFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
        cookie: true,
        xfbml: true,
        version: 'v17.0',
      });
      // Resolve the promise when the SDK is loaded
      resolve(undefined);
    };
  });
};

export const shareFacebook = (url: string) => {
  console.log('shareFacebook', url);

  window.FB.ui(
    {
      method: 'share',
      href: url,
    },
    function (response: any) {},
  );
};
