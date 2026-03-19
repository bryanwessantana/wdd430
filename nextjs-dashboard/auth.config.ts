import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Adicionamos a tipagem explícita nos argumentos para resolver o erro de build
    authorized({ auth, request: { nextUrl } }: { auth: any; request: { nextUrl: any } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redireciona usuários não autenticados para o login
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Adicione provedores aqui
} satisfies NextAuthConfig;