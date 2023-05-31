import * as DB from '$lib/PouchDB.js';
import { fail, redirect } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load() {
	return {
		transactions: DB.listTransactions()
	};
}

export const actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		console.log(data);

		try {
			DB.createTransaction({
				title: data.get('title'),
				content: data.get('content'),
				amount: data.get('amount'),
				date: data.get('date'),
				flow: data.get('flow')
			});
			// console.log('Line24:', result);
			// throw redirect(307, '/transactions');
			// return result;
		} catch (error) {
			console.log('Error processing this entry', error);
			return fail(422, {
				title: data.get('title'),
				content: data.get('content'),
				amount: data.get('amount'),
				date: data.get('date'),
				flow: data.get('flow'),
				error: error.message
			});
		}
	}
};
