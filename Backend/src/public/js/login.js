const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("/api/usuarios/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if (!response.ok) {
            const errorMessage = document.getElementById("error-message");
            errorMessage.textContent = data.error;
        } else {
            console.log("✅ Login exitoso:", data);
            const params = new URLSearchParams({ tipo: "pintura" });
            window.location.href = `/dashboard?${params.toString()}`;
        }
    } catch (err) {
        console.error("❌ Error:", err.message);
    }
});

function configurarAutoFill() {
    const autoFillButton = document.getElementById("auto-fill-button");
    autoFillButton.addEventListener("click", () => {
        document.getElementById("username").value = "admin";
        document.getElementById("password").value = "password";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    configurarAutoFill();
});
