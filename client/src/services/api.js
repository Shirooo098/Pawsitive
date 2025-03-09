export const fetchBackendData = async () => {
    try{
        const response = await fetch('/');
        if(!response.ok) 
            throw new error("Failed Fetching Data");
        return await response.json();
    }catch(err) {
        console.error("Error Fetching Data", err);
        return [];
    }
}