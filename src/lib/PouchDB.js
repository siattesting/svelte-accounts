import PouchDB from 'pouchdb';

const db = new PouchDB('my-db02');

/**
 * @param {string} text
 */
export function slugify(text) {
	return text
		.replace(/\s/g, '-')
		.replace(/[^a-zA-Z0-9]/g, '-')
		.toLowerCase();
}

/**
 * @param {{ title: string; content: string; amount: number; created_at: string; updated_at: string; type: string; _id: string; slug: string; }} item
 */
export async function createTransaction(item) {
	if (item.title === '' || !item.title) {
		throw new Error('You must provide a title.');
	}
	if (item.content === '' || !item.content) {
		throw new Error('You must provide a description.');
	}
	if (item.amount === 0 || !item.amount) {
		throw new Error('You must provide an amount.');
	}

	item.created_at = new Date().toISOString();
	item.updated_at = new Date().toISOString();
	item.type = 'transactions';
	item._id = 'tr:-' + new Date().toISOString();
	item.slug = slugify(item.title);

	const result = await db.post(item);
	return result;
}

/**
 * @param {string} id
 */
export async function readTransaction(id) {
	const item = await db.get(id);
	return item;
}

/**
 * @param {{ updated_at: Date; }} item
 */
export async function updateTransaction(item) {
	item.updated_at = new Date();
	await db.put(item);
}

/**
 * @param {PouchDB.Core.RemoveDocument} item
 */
export async function deleteTransaction(item) {
	const result = await db.remove(item);
	return result;
}

export async function listTransactions() {
	const result = await db.allDocs({ include_docs: true });
	const transactions = result.rows.map((row) => row.doc);
	return transactions;
}
