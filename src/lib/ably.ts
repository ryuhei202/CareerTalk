import Ably from "ably";
export const client = new Ably.Realtime({ authUrl: "/api/ably" });
