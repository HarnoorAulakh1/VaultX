import { generateKeyPair } from "crypto";
import { randomBytes } from "crypto";
import { promisify } from "util";
import { pbkdf2 } from "crypto";
import { createCipheriv, createDecipheriv } from "crypto";
import { createHash } from "crypto";
import { createHmac } from "crypto";
import { createSign, createVerify } from "crypto";

export async function encrypt(password: string, privateKey: string) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const aesKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );

  const encrypted_key = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    aesKey,
    new TextEncoder().encode(privateKey)
  );

  return {
    encrypted_key: uint8ArrayToBase64(new Uint8Array(encrypted_key)),
    iv: uint8ArrayToBase64(iv),
    salt: uint8ArrayToBase64(salt),
  };
}

export async function decrypt(
  password: string,
  encrypted: { encrypted_key: string; iv: string; salt: string }
): Promise<string> {
  const { encrypted_key, iv, salt } = encrypted;

  const saltBytes = base64ToUint8Array(salt);
  const ivBytes = base64ToUint8Array(iv);
  const encrypted_keyBytes = base64ToUint8Array(encrypted_key);

  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  const aesKey = await crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: saltBytes,
      iterations: 100000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"]
  );

  try {
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: ivBytes },
      aesKey,
      encrypted_keyBytes
    );

    const privateKey = new TextDecoder().decode(decrypted);
    return privateKey;
  } catch (error) {
    console.error("Decryption failed:", error);
    throw error;
  }
}


export function base64ToUint8Array(base64: string): Uint8Array {
  const binary_string = atob(base64);
  const len = binary_string.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes;
}


export function uint8ArrayToBase64(uint8Array: Uint8Array): string {
  return btoa(Array.from(uint8Array).map(b => String.fromCharCode(b)).join(''));
}