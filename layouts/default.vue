<template>
  <div>
    <KiboAppHeader />
    <LoginModal />
    <StoreLocatorModal />
    <div class="content">
      <Nuxt />
    </div>
    <Nuxt />
    <AppFooter />
    <BottomNavigation />
  </div>
</template>

<style>
html,
body {
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: 400;
}
.content {
  max-width: 81.75rem;
  margin: 0 auto;
}
</style>
