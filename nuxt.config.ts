// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
																																	enabled: true,

																																	timeline: {
																																																																	enabled: true,
																																	},
	},

  modules: [
	 "nuxt-security",
	 "@nuxtjs/tailwindcss",
	 "shadcn-nuxt",
	 "@nuxtjs/color-mode",
	 "@pinia/nuxt",
	 "@nuxtjs/supabase",
	],

  supabase: {
    redirect: true,
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      exclude: ['/'],
    },
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production',
    },
    clientOptions: {
      auth: {
        detectSessionInUrl: true,
        persistSession: true,
        autoRefreshToken: true,
      },
      db: {
        schema: 'public',
      },
      global: {
        headers: { 'x-my-custom-header': 'my-app-name' },
      },
    },
    // Deaktivieren der SSL-Überprüfung für die Entwicklungsumgebung
    url: process.env.SUPABASE_URL,
    // Explizit SSL-Zertifikatüberprüfung deaktivieren für Entwicklung
    ...(process.env.NODE_ENV === 'development' && {
      clientOptions: {
        auth: {
          detectSessionInUrl: true,
          persistSession: true,
          autoRefreshToken: true,
        },
        db: {
          schema: 'public',
        },
        global: {
          headers: { 'x-my-custom-header': 'my-app-name' },
        },
        fetchOptions: {
          rejectUnauthorized: false
        }
      }
    }),
  },

  shadcn: {
																																	prefix: '',
																																	componentDir: './components/ui'
	},

  colorMode: {
																																	classSuffix: '',
																																	preference: 'dark'
	},

  security: {
																																	headers: {
																																																																	crossOriginEmbedderPolicy: process.env.NODE_ENV === 'development' ? 'unsafe-none' : 'require-corp',
																																	},
	},

  compatibilityDate: '2024-09-11',
})
