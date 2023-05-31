<script>
    import '../app.css'
</script>

<nav>
<div class="tabs is-centered">
    <ul>
      <li class="is-active"><a href='/'>Svelte-Accounts</a></li>
      <li><a href= '/transactions' data-sveltekit-prefetch>Transactions</a></li>
      <li><a href= '/about' data-sveltekit-prefetch>About</a></li>
    </ul>
  </div>
</nav>

<main>
    <slot />
</main>


<style>
    nav {
        display: flex;
    }
    nav a {
        margin-right: 1rem;
    }
</style>