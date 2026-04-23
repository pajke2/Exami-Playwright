import { test, expect } from '@playwright/test';
import { getAuthToken } from '@helpers/apiHelpers';

const BASE_URL = 'https://api.exami.space/api';
const NON_EXISTENT_SESSION_ID = 999999;

test.describe('Auth API', () => {
  let authToken: string;

  test.beforeAll(async ({ request }) => {
    authToken = await getAuthToken(request);
  });

  test('Login + get auth token', async () => {
    expect(authToken).toBeTruthy();
    await test.info().attach('auth-token', { body: authToken, contentType: 'text/plain' });
  });

    test.describe("POST /login API tests", ()=> {
    test.use({ storageState: { cookies: [], origins: [] } });
      test('returns 200 with user and token on valid credentials', async ({ request }) => {
    const email = process.env.ADMIN_EMAIL!;
    const password = process.env.ADMIN_PASSWORD!;

    const response = await request.post(`${BASE_URL}/login`, {
      data: { login: email, password }
    });

    const body = await response.json();
    await test.info().attach('login-response', {
      body: JSON.stringify(body, null, 2),
      contentType: 'text/plain'
    });

    expect(response.status()).toBe(200);
    expect(body.message).toBe('Logged in successfully.');

    const { user, token } = body.data;

    // Token
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);

    // User shape
    expect(typeof user.id).toBe('number');
    expect(user.id).toBeGreaterThan(0);
    expect(typeof user.email).toBe('string');
    expect(user.email).toBe(email);
  });
  });

  test.describe('Subjects and Categories', () => {
    test('Get subjects with auth', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/subjects`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        },
        params: {
          page: 1,
          search: 'math',
          favoriteFirst: true
        }
      });

      const body = await response.json();
      await test.info().attach('subjects-response', { body: JSON.stringify(body, null, 2), contentType: 'application/json' });

      expect(response.status()).toBe(200);

      // Structure
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('data');
      expect(Array.isArray(body.data.data)).toBe(true);

      // Message
      expect(body.message).toBe('Subjects retrieved successfully.');

      // Item-level — search:'math' must return results; if this fails, check seed data
      expect(body.data.data.length).toBeGreaterThan(0);
      const subject = body.data.data[0];
      expect(subject.id).toBeDefined();
      expect(subject.name).toBeDefined();
    });

    test('Get categories with token', async ({ request }) => {
      const response = await request.get(`${BASE_URL}/categories`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        },
        params: {
          subject_id: 1,
          search: 'algebra',
          page: 1,
          favoriteFirst: true
        }
      });

      const body = await response.json();
      await test.info().attach('categories-response', { body: JSON.stringify(body, null, 2), contentType: 'application/json' });

      expect(response.status()).toBe(200);

      // Structure
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('data');
      expect(Array.isArray(body.data.data)).toBeTruthy();

      // Message validation
      expect(body.message).toBe('Categories retrieved successfully');

      // Item-level — search:'algebra' must return results; if this fails, check seed data
      expect(body.data.data.length).toBeGreaterThan(0);
      const category = body.data.data[0];

      expect(category.id).toBeDefined();
      expect(category.name).toBeDefined();
      expect(category.subject_id).toBe(1);
      expect(category.subject).toBeDefined();
      expect(category.subject.name).toBeDefined();
    });
  });

});

test.describe('Practice API', () => {
  test.describe.configure({ mode: 'serial' });

  let authToken: string;
  let sessionId: number;

  test.beforeAll(async ({ request }) => {
    authToken = await getAuthToken(request);
  });

  test('POST /practice/start returns 201 with session and question', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/practice/start`, {
      headers: { 'Authorization': `Bearer ${authToken}` },
      data: { category_id: 9, language_id: 1 }
    });

    const body = await response.json();
    await test.info().attach('practice-start-response', {
      body: JSON.stringify(body, null, 2),
      contentType: 'application/json'
    });

    expect(response.status()).toBe(201);
    expect(body.message).toBe('Practice session started.');

    const { session, question } = body.data;
    sessionId = session.id;

    // Session — shape and logical checks
    expect(typeof session.id).toBe('number');
    expect(session.id).toBeGreaterThan(0);
    expect(typeof session.user_id).toBe('number');
    expect(typeof session.subject_id).toBe('number');
    expect(typeof session.category_id).toBe('number');
    expect(session.category_id).toBe(9);
    expect(typeof session.questions_attempted).toBe('number');
    expect(session.questions_attempted).toBe(0);
    expect(typeof session.correct_answers).toBe('number');
    expect(session.correct_answers).toBe(0);

    // Question — shape checks
    expect(typeof question.id).toBe('number');
    expect(question.id).toBeGreaterThan(0);
    expect(typeof question.question_text).toBe('string');
    expect(question.question_text.length).toBeGreaterThan(0);

    // Options — at least one, all correctly shaped, exactly one correct
    expect(Array.isArray(question.options)).toBe(true);
    expect(question.options.length).toBeGreaterThan(0);

    for (const option of question.options) {
      expect(typeof option.id).toBe('number');
      expect(typeof option.option_text).toBe('string');
      expect(option.option_text.length).toBeGreaterThan(0);
      expect(typeof option.is_correct).toBe('boolean');
    }

    const correctOptions = question.options.filter((o: { is_correct: boolean }) => o.is_correct);
    expect(correctOptions).toHaveLength(1);
  });

  test('PUT /practice/{id}/unfinished/end ends the session and returns 200', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/practice/${sessionId}/unfinished/end`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'application/json'
      }
    });

    const body = await response.json();
    await test.info().attach('practice-end-response', {
      body: JSON.stringify(body, null, 2),
      contentType: 'application/json'
    });

    expect(response.status()).toBe(200);
    expect(body.data).toBeNull();
    expect(body.message).toBe('Stale practice session ended successfully.');
  });

  test.describe('negative cases', () => {
    test.use({ storageState: { cookies: [], origins: [] } });

    // test('POST /practice/start without token returns 401', async ({ request }) => {
    //   const response = await request.post(`${BASE_URL}/practice/start`, {
    //     data: { category_id: 9, language_id: 1 }
    //   });

    //   const text = await response.text();
    //   await test.info().attach('practice-start-no-token-response', {
    //     body: text,
    //     contentType: 'text/plain'
    //   });

    //   expect(response.status()).toBe(401);
    //   const body = JSON.parse(text);
    //   expect(body.message).toBe('Unauthenticated.');
    // });

    test('PUT /practice/{id}/unfinished/end without token returns 401', async ({ request }) => {
      const response = await request.put(
        `${BASE_URL}/practice/${NON_EXISTENT_SESSION_ID}/unfinished/end`,
        { headers: { 'Accept': 'application/json' } }
      );

      const text = await response.text();
      await test.info().attach('practice-end-no-token-response', {
        body: text,
        contentType: 'text/plain'
      });

      expect(response.status()).toBe(401);
      const body = JSON.parse(text);
      expect(body.message).toBeDefined();
    });

    // test('PUT /practice/{id}/unfinished/end with non-existent session ID returns 404', async ({ request }) => {
    //   const response = await request.put(
    //     `${BASE_URL}/practice/${NON_EXISTENT_SESSION_ID}/unfinished/end`,
    //     {
    //       headers: {
    //         'Authorization': `Bearer ${authToken}`,
    //         'Accept': 'application/json'
    //       }
    //     }
    //   );

    //   expect(response.status()).toBe(404);
    //   const body = await response.json();
    //   expect(body.message).toBeDefined();
    // });
    

  });//End of negative describe block


});