export const baseUrl = window.location.href.includes("https") ? "http://localhost:5002" : "http://localhost:5002"
export const webUrl = ""

export const usernamePattern = /^[a-zA-Z0-9 !@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{2,15}$/;
export const emailPattern = /^[a-zA-Z0-9!#$%&'*+-/=?^_`{|}~]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
export const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?!.*\s{2})[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,24}$/;
export const defaultProfilePicture = "https://res.cloudinary.com/do6sd9nyx/image/upload/v1706343891/we-app-nextjs/Assets/profile-picture_ufgahm.png"
export const _1mbSize = 10000000 // 1_mb
export const imageSize = _1mbSize * 5

export const loginPageImage = "https://images.unsplash.com/photo-1502085671122-2d218cd434e6?q=80&w=1852&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"