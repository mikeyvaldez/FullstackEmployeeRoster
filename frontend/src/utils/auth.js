// Function to set a cookie
export function setCookie(name, value, days) {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; expires=${expires}; path=/`;
}

// Function to get a cookie by name
export function getCookie(name) {
  const cookieArr = document.cookie.split("; ");
  for (let i = 0; i < cookieArr.length; i++) {
    const [key, value] = cookieArr[i].split("=");
    if (key === name) {
      return decodeURIComponent(value);
    }
  }
  return null;
}

// Function to clear a cookie
export function clearCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
}

export function getTokenFromCookie() {
  // Get all cookies as a string
  const encodedCookie = document.cookie

  // Decode the URL-encoded string
  const decodedCookie = decodeURIComponent(encodedCookie);

  // Parse the decoded string into a JSON object
  const parsedCookie = JSON.parse(decodedCookie.split('=')[1]);
  // console.log(encodedCookie)
  // console.log(decodedCookie)
  // console.log(parsedCookie.access_token)


  // If the token isn't found, return null
  return parsedCookie.access_token;
}
