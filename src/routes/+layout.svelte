<script lang="ts">
  import "../app.postcss";
  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
  import { page } from "$app/stores";

  $: route = $page.route.id;

  $: title = navLinks.find(({ url }) => url == route)?.label;

  const navLinks = [
    { url: "/", label: "Home" },
    { url: "/gallery", label: "Gallery" },
    { url: "/sponsor", label: "Sponsor" },
    { url: "/join", label: "Join" },
    { url: "/blog", label: "Blog" },
    { url: "/contact", label: "Contact" },
  ];
</script>

<svelte:head>
  <title>
    {route != "/" && title != undefined ? title + " - " : ""} WTMC Robotics
  </title>
</svelte:head>

<Navbar let:hidden let:toggle class="sticky w-full z-20 top-0 left-0 border-b dark:bg-gray-950 dark:border-gray-800">
  <NavBrand href="/">
    <img src="http://wtmcrobotics.com/style/images/black_logo_500x500.png" class="mr-3 h-12" alt="WTMC Robotics Logo" />
    <span class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">WTMC Robotics</span>
  </NavBrand>
  <NavHamburger on:click={toggle} />
  <NavUl
    {hidden}
    activeClass="text-white bg-primary-900 md:bg-transparent md:text-primary-900 md:dark:text-white dark:bg-primary-900 md:dark:bg-transparent"
    nonActiveClass="text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-900 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
  >
    {#each navLinks as { url, label }}
      <NavLi href={url} active={url == route}>{label}</NavLi>
    {/each}
  </NavUl>
</Navbar>

<slot />
