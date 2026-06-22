<template>
  <div class="flex min-h-screen flex-col bg-isma-black">
    <header class="border-b border-isma-orange-muted/30">
      <nav class="mx-auto flex max-w-3xl gap-6 px-6 py-4">
        <RouterLink
          to="/"
          class="text-sm font-medium text-isma-orange-muted transition hover:text-isma-orange"
          active-class="!text-isma-orange !font-semibold"
        >
          Home
        </RouterLink>
        <RouterLink
          to="/about"
          class="text-sm font-medium text-isma-orange-muted transition hover:text-isma-orange"
          active-class="!text-isma-orange !font-semibold"
        >
          About
        </RouterLink>
      </nav>
    </header>

    <main class="flex flex-1 items-center justify-center">
      <RouterView />
    </main>
  </div>
</template>
