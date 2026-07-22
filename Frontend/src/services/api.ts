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

    if (!response.ok) {
        throw new Error("Erro ao enviar dados");
    }

    return response.json();
}


export async function apiDelete(endpoint: string) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Erro ao deletar");
    }
}