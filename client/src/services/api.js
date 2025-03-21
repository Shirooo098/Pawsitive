
export const registerValidation = async (formData) => {
    try {
        const { confirmPassword, ...filteredFormData } = formData;
        console.log("Sending data:", filteredFormData);

        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type" : "application/json"},
            body: JSON.stringify(filteredFormData)
        })

        const data = await response.json();

        if(!response.ok){
            throw new Error(data.message || "Failed to register");
        }

        console.log(data);
        return data;

    } catch (error) {
        console.error("Error:", error.message);
    }
}