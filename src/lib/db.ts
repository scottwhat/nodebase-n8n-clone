/**
 * Database client singleton instance.
 * 
 * This module creates and exports a single Prisma client instance that persists across
 * hot reloads during development. In development mode (non-production), the Prisma client
 * is attached to the global object to prevent multiple instances from being created when
 * the module is re-imported due to hot module replacement (HMR).
 * 
 *
 * Without this pattern, each hot reload would create a new PrismaClient instance, which:
 * - Exhausts database connections quickly
 * - Causes "too many clients" errors
 * - Leads to memory leaks
 * 
 * In production, a new PrismaClient is created normally since hot reloading doesn't occur.
 * 
 * @module database
 * @see {@link https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-hot-reloading-from-creating-new-instances-of-prismaclient}
 */
import { PrismaClient } from "@/generated/prisma/client"
// code with antonio unknown reasoning but adds prisma client to the global object 
// 
const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient()

//make a .env for production

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

export default prisma