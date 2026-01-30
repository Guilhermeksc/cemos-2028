import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors, HttpInterceptorFn, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError, from, switchMap, throwError } from 'rxjs';

import { routes } from './app.routes';
import { environment } from './environments/environment';

// Variável global para controlar refresh token em andamento
// Evita múltiplas tentativas simultâneas de refresh
let refreshTokenPromise: Promise<{ access: string }> | null = null;

// Functional interceptor para Angular standalone
// Nota: Como não podemos injetar serviços diretamente em interceptors funcionais,
// usamos localStorage diretamente e fetch para refresh token (evita dependência circular)
const authInterceptorFn: HttpInterceptorFn = (req, next) => {
  // Obtém token do localStorage diretamente
  const token = localStorage.getItem('accessToken');
  
  // Adiciona token de autenticação se disponível
  if (token) {
    req = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${token}`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Se erro 401, tenta renovar token
      if (error.status === 401 && token) {
        const refreshToken = localStorage.getItem('refreshToken');
        
        if (!refreshToken) {
          // Se não tem refresh token, limpa dados e redireciona
          console.warn('401 Unauthorized: No refresh token available');
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('currentUser');
          window.location.href = '/login';
          return throwError(() => error);
        }

        // Se já existe uma tentativa de refresh em andamento, aguarda ela
        if (refreshTokenPromise) {
          console.log('Refresh token já em andamento, aguardando...');
          return from(refreshTokenPromise).pipe(
            switchMap((response: { access: string }) => {
              // Atualiza token no localStorage
              localStorage.setItem('accessToken', response.access);
              
              // Refaz requisição com novo token
              const newReq = req.clone({
                setHeaders: {
                  'Authorization': `Bearer ${response.access}`
                }
              });
              
              return next(newReq);
            }),
            catchError((refreshError) => {
              // Se falha ao renovar, limpa dados e redireciona
              console.error('Erro ao aguardar refresh token:', refreshError);
              refreshTokenPromise = null;
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
              localStorage.removeItem('currentUser');
              window.location.href = '/login';
              return throwError(() => error);
            })
          );
        }

        // Faz requisição para renovar token usando fetch (evita dependência circular com HttpClient)
        const apiUrl = environment.apiUrl.replace('/api', '');
        refreshTokenPromise = fetch(`${apiUrl}/auth/token/refresh/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ refresh: refreshToken })
        }).then(response => {
          if (!response.ok) {
            refreshTokenPromise = null;
            throw new Error('Failed to refresh token');
          }
          return response.json();
        }).catch(error => {
          refreshTokenPromise = null;
          throw error;
        });

        return from(refreshTokenPromise).pipe(
          switchMap((response: { access: string }) => {
            // Limpa a promise após sucesso
            refreshTokenPromise = null;
            
            // Atualiza token no localStorage (o AuthService será atualizado no próximo acesso)
            localStorage.setItem('accessToken', response.access);
            
            // Refaz requisição com novo token
            const newReq = req.clone({
              setHeaders: {
                'Authorization': `Bearer ${response.access}`
              }
            });
            
            return next(newReq);
          }),
          catchError((refreshError) => {
            // Limpa a promise em caso de erro
            refreshTokenPromise = null;
            
            // Se falha ao renovar, verifica se é realmente um erro de autenticação
            console.error('Erro ao renovar token:', refreshError);
            
            // Limpa dados e redireciona apenas se for realmente um erro de autenticação
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('currentUser');
            window.location.href = '/login';
            return throwError(() => error);
          })
        );
      }
      
      return throwError(() => error);
    })
  );
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptorFn])
    )
  ]
};
