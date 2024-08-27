// Function to generate a unique ID using a timestamp and a random number
const generateUniqueId = (): string => {
    const timestamp = new Date().getTime();
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${timestamp}${randomNumber}`;
};

export default generateUniqueId;