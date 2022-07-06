const isDev = __DEV__;
// const isDev = false;
console.log(`isDev: ${isDev}`);

export const firebaseConfig = isDev
  ? {
      // Development
      appId: "1:914037175602:ios:4a9c3e35ef289b06cf532b",
      messagingSenderId: "914037175602",
      storageBucket: "give-a-meal-dev.appspot.com",
      projectId: "give-a-meal-dev",
      authDomain: "give-a-meal-dev.firebaseapp.com",
      apiKey: "AIzaSyDM00-PHcHiTIG1Ytw8-iD-VkJn7b48XdQ",
      measurementId: "G-8BP5TCLPMV",
      expoClientId:
        "914037175602-8nhf7sf5c1bt92mk58095074kd4v9dcd.apps.googleusercontent.com",
    }
  : {
      // Production
      appId: "1:334550279691:ios:25aff98940d192902c890e",
      messagingSenderId: "334550279691",
      storageBucket: "jolly-food.appspot.com",
      projectId: "jolly-food",
      authDomain: "jolly-food.firebaseapp.com",
      apiKey: "AIzaSyAIYBAwcPN_QpgFkhxPH7IHsl69x8Yopqk",
      measurementId: "G-Q47X88824S",
      clientId:
        "334550279691-ojk8pvrvbtaf28dir3q19uk620rq5jko.apps.googleusercontent.com",
    };
export const googleMapsConfig = {
  key: "AIzaSyA1HdeOJ8Ny1QYiY5FL9WgSx5am94zawIU",
};
export const supabaseConfig = isDev
  ? {
      // Development
      anonKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzcyOTA2MSwiZXhwIjoxOTQ5MzA1MDYxfQ.0jhbOJ2tPopgKybrXO7lhylpqnYELQxOypuMsC2Q_aI",
      apiUrl: "https://yfvkifqtoygzcggoiuqv.supabase.co",
    }
  : {
      // Production
      anonKey:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNTcwMjc3MCwiZXhwIjoxOTUxMjc4NzcwfQ.JpxqAjAwr46F8sGKqOg41Q6cXP2tB_iWno5BCV9viGM",
      apiUrl: "https://psxgbxtunnombwuetgax.supabase.co",
    };
