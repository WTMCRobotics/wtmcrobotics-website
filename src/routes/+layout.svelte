<script lang="ts">
  import "../app.postcss";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
  import { page } from "$app/stores";

  $: route = $page.route.id;

  const navLinks = [
    { url: "/", label: "Home" },
    { url: "/gallery", label: "Gallery" },
    { url: "/sponsor", label: "Sponsor" },
    { url: "/join", label: "Join" },
    { url: "/blog", label: "Blog" },
    { url: "/contact", label: "Contact" },
  ];
</script>

<Navbar let:hidden let:toggle class="sticky w-full z-20 top-0 left-0 border-b">
  <NavBrand href="/">
    <img src="http://wtmcrobotics.com/style/images/black_logo_500x500.png" class="mr-3 h-12" alt="WTMC Robotics Logo" />
    <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">WTMC Robotics</span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl {hidden}>
    {#each navLinks as { url, label }}
      <NavLi href={url} active={url == route}>{label}</NavLi>
    {/each}
  </NavUl>
</Navbar>

<slot />
