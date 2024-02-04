export const __prod__ = process.env.NODE_ENV === "production";


let apiBaseUrl = "";

switch (process.env.NODE_ENV) {
  case "production":
    apiBaseUrl = "https://xyz.com/api/v1/";
    break;
  case "development":
    apiBaseUrl = "https://xyz.com/api/v1/";
    break;
  default:
    apiBaseUrl = "http://127.0.0.1:8000/api/v1/";
    break;
}

export { apiBaseUrl };
