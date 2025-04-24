import { config } from 'dotenv';
import { defineConfig } from "drizzle-kit";

config({ path: '.env' });

export default defineConfig({
  schema: "./configs/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://ai-short-video-generator_owner:npg_IaOnqj3Ag7Hp@ep-icy-smoke-a4h542zo-pooler.us-east-1.aws.neon.tech/ai-short-video-generator?sslmode=require',
  },
});
