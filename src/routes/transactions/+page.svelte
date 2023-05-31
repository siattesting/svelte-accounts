<script>
    import { enhance } from '$app/forms'
    const FLOWS = [{id:1, text: 'RECETTES'}, {id:2, text: 'DEPENSES'}]
    export let data;
    console.table(data)
    $: ({ transactions } = data)
    export let form;
</script>
<div>
    <h2>About Page</h2>
    <p>List of transactions</p>

    {#if form?.error}
    <p>{form.error}</p>
    {/if}

    <div>
        <section>
            {#if form?.error}
    <p>{form.error}</p>
    {/if}

        
        <form method="POST" action="?/create" use:enhance>
            <label for="title">Title</label>
            <input type="text" name="title" id="title" value={form?.title ?? ''} required />

            <label for="content">Content</label>
            <textarea name="content" id="content" value={form?.content ?? ''} required />

            <label for="amount">Amount</label>
            <input type="number" name="amount" id="amount" value={form?.amount ?? ''} required />

            <label for="date">Content</label>
            <input type="date" name="date" id="date" value={form?.date ?? ''} required />

            <select name="flow" id="flow" value={form?.flow ?? ''}>
                {#each FLOWS as flow }
                <option>{flow.text}</option>
                {/each}
                
            </select>
            <button type="submit">Save</button>
        </form>
    </section>
    <section>
        <article>
            {#each transactions as transaction (transaction._id) }
            <div>
                <h2>{transaction.title}</h2>
                <p>{transaction.content}</p>
                <p>{transaction.date}</p>
                <p>{transaction.amount} XOF</p>
                <p>{transaction.flow}</p>
            </div>
                
            {/each}
        </article>
    </section>
    </div>

    
</div>