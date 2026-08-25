import { Kysely, PostgresDialect } from 'kysely'
import pg from 'pg'

import type { Database } from './schema'

const { Pool } = pg

let db: Kysely<Database> | null = null

function getConnectionString(): string {
    const url = process.env.TEST_DATABASE_URL

    if (!url) {
        throw new Error(
            'TEST_DATABASE_URL não está definida. Adicione a connection string do Postgres no arquivo .env.'
        )
    }

    return url
}

export function getDb(): Kysely<Database> {
    if (!db) {
        const pool = new Pool({ connectionString: getConnectionString() })
        db = new Kysely<Database>({ dialect: new PostgresDialect({ pool }) })
    }

    return db
}

export async function destroyDb(): Promise<void> {
    if (db) {
        await db.destroy()
        db = null
    }
}
