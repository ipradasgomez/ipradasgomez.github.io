# DNS: tekkisma.es

Guía para `tekkisma.es` → **GitHub Pages** y subdominios → **homelab** (túnel `tekkisma_lab`).

---

## Tu situación actual (Cloudflare)

| Name | Type | Content | Proxy | Problema |
|------|------|---------|-------|----------|
| `tekkisma.es` | Tunnel | `tekkisma_lab` | Proxied | ❌ Apex va al homelab, no a GitHub |
| `*.tekkisma.es` | Tunnel | `tekkisma_lab` | Proxied | ✅ Subdominios → homelab |
| `www` | A | `161.97.85.243` | DNS only | ❌ Sobrante; redirigir a apex |
| `tekkisma.es` | MX | `mx.tekkisma.es` | DNS only | ✅ Correo — **no tocar** |
| `tekkisma.es` | TXT | SPF | DNS only | ✅ Correo — **no tocar** |
| `tekkisma.es` | NS | `ns10/11/12.servicio-online.net` | DNS only | ⚠️ Legacy — eliminar si Cloudflare gestiona el dominio |

**Conclusión:** el apex (`tekkisma.es`) apunta al túnel del homelab. Hay que sacarlo de ahí y ponerlo en GitHub Pages.

---

## Objetivo final

```
tekkisma.es           → GitHub Pages (sitio Vue)
www.tekkisma.es       → redirect 301 → https://tekkisma.es
*.tekkisma.es         → Túnel tekkisma_lab (homelab)
home.tekkisma.es      → Túnel tekkisma_lab (homelab)
…                     → idem
MX / TXT              → sin cambios (correo)
```

---

## Pasos (orden recomendado)

### 1. GitHub Pages

1. Repo **ipradasgomez.github.io** → **Settings → Pages**
2. **Custom domain:** `tekkisma.es` (solo apex, sin `www`)
3. Deja la ventana abierta; GitHub mostrará si el DNS es correcto

### 2. Cloudflare — quitar apex del túnel

#### 2a. DNS → Records

| Acción | Registro |
|--------|----------|
| **Eliminar** | `tekkisma.es` → Tunnel `tekkisma_lab` |
| **Eliminar** | `www` → A `161.97.85.243` |
| **Eliminar** | Los 3 NS (`ns10/11/12.servicio-online.net`) si en el registrador ya usas nameservers de Cloudflare |
| **Crear** | CNAME `@` → `ipradasgomez.github.io` — **DNS only** (nube gris) |
| **Mantener** | `*.tekkisma.es` → Tunnel `tekkisma_lab` (Proxied) |
| **Mantener** | MX y TXT (correo) |

#### 2b. Zero Trust → Networks → Tunnels → `tekkisma_lab`

En **Public Hostnames**, elimina la ruta de **`tekkisma.es`** (apex) si existe.  
Deja las rutas de subdominios (`home.tekkisma.es`, etc.) y el wildcard si lo tienes configurado ahí.

> Si el apex sigue en el túnel por aquí, aunque borres el CNAME en DNS, puede volver a crearse o seguir interceptando tráfico.

### 3. Cloudflare — redirect de www

**Rules → Redirect Rules → Create rule**

| Campo | Valor |
|-------|-------|
| Name | `www → apex` |
| When | Hostname equals `www.tekkisma.es` |
| Then | Redirect to `https://tekkisma.es` — **301** |

Así `www` no cae en el wildcard `*` del túnel.

### 4. SSL/TLS (Cloudflare)

**SSL/TLS → Overview**

| Registro | Modo recomendado |
|----------|------------------|
| Apex `@` (GitHub) | Empieza con **Full**; cuando GitHub verifique → **Full (strict)** |
| Subdominios (túnel) | **Full** con túnel suele ir bien (Proxied) |

Para el CNAME de GitHub, deja **DNS only (gris)** al principio. Cuando funcione, puedes probar nube naranja en `@`.

### 5. GitHub — HTTPS

Cuando Cloudflare muestre el CNAME correcto y GitHub ponga ✓ en DNS check:

- Activa **Enforce HTTPS** en Settings → Pages

### 6. Deploy del CNAME en el repo

Asegúrate de que `main` incluye `public/CNAME` con `tekkisma.es` (ya está en el repo). Haz release si aún no está desplegado.

### 7. Comprobar

```bash
# Web → GitHub (debe devolver 200 y HTML con /assets/...)
curl -I https://tekkisma.es
curl -sL https://tekkisma.es | grep -E 'script|assets'

# www → redirect a apex
curl -I https://www.tekkisma.es

# Subdominio → homelab (túnel)
curl -I https://home.tekkisma.es   # sustituye por uno que uses
```

En GitHub → Pages: *Your site is live at https://tekkisma.es*.

---

## Tabla DNS final (objetivo)

| Type | Name | Content | Proxy | Notas |
|------|------|---------|-------|-------|
| CNAME | `@` | `ipradasgomez.github.io` | DNS only | Web pública |
| Tunnel | `*` | `tekkisma_lab` | Proxied | Wildcard homelab |
| MX | `@` | `mx.tekkisma.es` (prio 10) | DNS only | Correo |
| TXT | `@` | SPF | DNS only | Correo |
| — | `www` | Redirect rule → apex | — | No hace falta registro DNS |

---

## Diagrama

```
                         Cloudflare (tekkisma.es)
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         │                          │                          │
    CNAME @ (gris)            Redirect www              *.tekkisma.es
         │                          │                   Tunnel proxied
         ▼                          ▼                          ▼
 ipradasgomez.github.io      tekkisma.es                 tekkisma_lab
         │                                                    │
         ▼                                                    ▼
   GitHub Pages                                         Homelab
   (sitio Tekkisma)                              (home, nas, …)
```

---

## FAQ

**¿Por qué no puedo dejar el apex en el túnel?**  
Porque entonces `tekkisma.es` nunca llega a GitHub Pages. Solo un destino puede ser el apex.

**¿El wildcard `*` afecta al apex?**  
No. `@` es un registro explícito y tiene prioridad sobre `*`.

**¿Qué pasa con los NS de servicio-online.net?**  
Si el dominio ya usa nameservers de Cloudflare en el registrador, esos NS internos sobran y pueden liar. Bórralos salvo que sepas que los necesitas.

**¿Puedo proxificar (naranja) el apex?**  
Después de que GitHub verifique el dominio. Si falla SSL, vuelve a gris.

**¿Toco MX/TXT?**  
No, salvo que también migres el correo.
