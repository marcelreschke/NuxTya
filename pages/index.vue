<script setup lang="ts">
	import { useCounterStore } from "@/stores/counter";
	const store = useCounterStore();
	const colorMode = useColorMode();
	const toggleColorMode = () => (colorMode.preference = colorMode.preference === "dark" ? "light" : "dark");
	const title = ref<NuxtTya>({ msg: "NuxTya" });
	const { data: serverMsg, error, pending } = await useFetch("/api/hello");
	const supabase = useSupabaseClient();
	const user = useSupabaseUser();

	const { data: supabaseData, error: supabaseError } = await useAsyncData('supabaseData', async () => {
		if (!user.value) return null
		const { data, error } = await supabase.from('my_table').select('*')
		if (error) throw error
		return data
	})

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut()
		if (error) console.error('Error logging out:', error)
		else navigateTo('/login')
	}

	onMounted(() => {
		if (error.value) {
			title.value = { msg: "Error" };
		}
		if (supabaseError.value) {
			console.error(supabaseError.value);
		}
		if (supabaseData.value) {
			console.log(supabaseData.value);
		}
	});
</script>
<!-- This is a boilerplate to show all the features this starter template has to offer -->
<!-- NuxTya is a minimal Nuxt 3 starter template that gets you started with the basics and sensible defaults -->
<!-- It includes TypeScript, Tailwind CSS, Shadcn-vue, Pinia, and more -->
<!-- NuxTya  -->
<!-- You can remove this and start building your app -->
<template>
	<main class="w-screen h-screen grid place-items-center">
		<div class="text-center">
			<h1 class="text-4xl font-extrabold tracking-tight lg:text-5xl mb-5">
				{{ title.msg }}
			</h1>
			<h2 v-if="pending">Loading...</h2>
			<h2 v-else class="text-3xl m-5 font-bold">{{ serverMsg }}</h2>
			<h2 class="text-2xl m-5 font-bold">Shadcn-vue & Tailwind CSS</h2>
			<div class="text-center">
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger>
							<Button as-child class="m-1" variant="link" aria-label="Visit Shadcn-vue documentation">
								<a href="https://www.shadcn-vue.com/docs/introduction.html" target="_blank">
									Shadcn-vue
								</a>
							</Button>
						</TooltipTrigger>
						<TooltipContent>
							<p>I'm a tooltip!</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
				<Button class="m-1 capitalize" @click="toggleColorMode" aria-label="Toggle Dark Mode">
					Toggle {{ colorMode.preference === "dark" ? "light" : "dark" }} Mode
				</Button>
			</div>
			<h2 class="text-2xl m-5 font-bold">Pinia</h2>
			<div class="text-center">
				<Button class="m-1" variant="secondary" @click="store.increment" aria-label="Increment Count">Increment</Button>
				<Button class="m-1" variant="outline" @click="store.decrement" aria-label="Decrement Count">Decrement</Button>
				<div class="flex flex-col">
					<span class="text-2xl">Count: {{ store.count }}</span>
					<span class="text-2xl">Double:{{ store.doubleCount }}</span>
				</div>
			</div>
			<!-- Display data from Supabase -->
			<h2 class="text-2xl m-5 font-bold">Supabase</h2>
			<div v-if="user" class="text-center m-5 overflow-y-auto overflow-x-hidden max-w-[500px] max-h-[300px]">
				{{ supabaseData }}
				<Button class="mt-4" @click="handleLogout">Logout</Button>
			</div>
			<div v-else class="text-center m-5">
				<NuxtLink to="/login">
					<Button>Login</Button>
				</NuxtLink>
			</div>
		</div>
	</main>
</template>
