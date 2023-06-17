/**
 * @file: index.ts
 */

import Router from "koa-router";
import { health } from "../controllers/health";
import home from "../controllers/home";
import other from "./other";

const router = new Router();

// Home router
router.get("/", home.index);

// Nested router for /render/other
router.use("/other", other.routes());

// Health check
router.get("/health", health);

export default router;
