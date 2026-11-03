const TEMP_MAIL_BASE = "/api/temp-mail";

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${TEMP_MAIL_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });
  } catch {
    return { ok: false, status: 0, data: null };
  }

  if (response.status === 204) {
    return { ok: true, status: 204, data: null };
  }

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  return { ok: response.ok, status: response.status, data };
}

export async function createRemoteMailbox() {
  const result = await request("/mailbox", { method: "POST" });

  if (!result.ok || !result.data?.mailbox) {
    return null;
  }

  return result.data.mailbox;
}

export async function fetchRemoteInbox(mailboxId, token) {
  const query = new URLSearchParams({ id: mailboxId, token });
  const result = await request(`/inbox?${query.toString()}`);

  if (!result.ok || !result.data) {
    return null;
  }

  return result.data;
}

export async function fetchRemoteMessage(mailboxId, token, messageId) {
  const query = new URLSearchParams({
    id: mailboxId,
    token,
    messageId,
  });
  const result = await request(`/message?${query.toString()}`);

  if (!result.ok || !result.data?.message) {
    return null;
  }

  return result.data.message;
}

export async function deleteRemoteMailbox(mailboxId, token) {
  const query = new URLSearchParams({ id: mailboxId, token });
  const result = await request(`/mailbox?${query.toString()}`, {
    method: "DELETE",
  });

  return result.ok;
}

// Privacy-conscious analytics. Only allowlisted event names are sent;
// no email contents, addresses, or identifiers leave the browser.
export function trackEvent(name) {
  try {
    fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Tracking must never break the tool.
  }
}
