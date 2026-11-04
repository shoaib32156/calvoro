// Cloudflare Email Worker entry point for CALVORO Temporary Email.
//
// Not deployed yet: this file is the prepared inbound-mail handler.
// To activate real email reception it must be published as its own
// Worker (a Worker using Workers Static Assets cannot serve this
// handler) with the same TEMP_MAIL_KV binding as the main site Worker,
// and a Cloudflare Email Routing rule must send the temporary-email
// domain to it. See the final report for the exact dashboard steps.
//
// Privacy behavior: only messages addressed to an existing mailbox
// are stored. Every other recipient is dropped.

import { MAX_INBOUND_BYTES } from "../src/tools/tempMailCore.js";
import { ingestInboundEmail } from "./temp-mail-service.js";

async function readRawMessage(message) {
  let total = 0;
  const chunks = [];

  try {
    const reader = message.raw.getReader();

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      total += value.byteLength;

      if (total > MAX_INBOUND_BYTES) {
        await reader.cancel();
        return "";
      }

      chunks.push(value);
    }

    const combined = new Uint8Array(total);
    let offset = 0;

    for (const chunk of chunks) {
      combined.set(chunk, offset);
      offset += chunk.byteLength;
    }

    return new TextDecoder("utf-8").decode(combined);
  } catch {
    return "";
  }
}

export default {
  async email(message, env) {
    // Reject oversized mail before touching the stream when the
    // platform reports the size; the stream cap below remains the
    // fallback for missing or invalid rawSize values.
    const rawSize = Number(message.rawSize);
    const rawSizeKnown = Number.isFinite(rawSize) && rawSize >= 0;

    if (rawSizeKnown && rawSize > MAX_INBOUND_BYTES) {
      message.setReject("Message too large.");
      return;
    }

    const raw = await readRawMessage(message);

    if (!raw) {
      message.setReject("Message too large or unreadable.");
      return;
    }

    const recipient = String(message.to || "")
      .split("@")[0]
      .trim()
      .toLowerCase();

    if (!recipient) {
      message.setReject("No recipient address.");
      return;
    }

    const outcome = await ingestInboundEmail(env, raw, recipient);

    if (!outcome.accepted) {
      // Dropping mail for unknown mailboxes is intentional: no
      // catch-all storage, no cross-visitor retention.
      message.setReject(outcome.reason || "Mailbox unavailable.");
    }
  },
};
