const API_URL = "http://localhost:5076/api";

export async function apiGet(endpoint: string) {
    const response = await fetch(`${API_URL}/${endpoint}`);

    if (!response.ok) {
        throw new Error("Erro ao buscar dados");
    }

    return response.json();
}


export async function apiPost(endpoint: string, data: unknown) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const texto = await response.text();

    console.log("Status:", response.status);
    console.log("Resposta:", texto);

    if (!response.ok) {
        throw new Error(texto);
    }

    return texto ? JSON.parse(texto) : null;
}

export async function apiDelete(endpoint: string) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar");
    }
}