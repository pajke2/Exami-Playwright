import { APIRequestContext } from '@playwright/test';

const BASE_URL = 'https://api.exami.space/api';

export async function getAuthToken(request: APIRequestContext): Promise<string> {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;
    if (!email || !password) {
        throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    }

    const response = await request.post(`${BASE_URL}/login`, {
        data: { login: email, password }
    });

    if (!response.ok()) {
        throw new Error(`Login failed [${response.status()}]: ${await response.text()}`);
    }

    const body = await response.json();

    if (!body?.data?.token) {
        throw new Error(`Token missing in login response: ${JSON.stringify(body)}`);
    }

    return body.data.token;
}

export async function startPracticeSession(
    request: APIRequestContext,
    authToken: string,
    options = { category_id: 9, language_id: 1 }
): Promise<number> {
    const response = await request.post(`${BASE_URL}/practice/start`, {
        headers: { 'Authorization': `Bearer ${authToken}` },
        data: options
    });

    if (!response.ok()) {
        throw new Error(`Failed to start practice session [${response.status()}]: ${await response.text()}`);
    }

    const body = await response.json();

    if (!body?.data?.session?.id) {
        throw new Error(`Session ID missing in response: ${JSON.stringify(body)}`);
    }

    return body.data.session.id as number;
}
