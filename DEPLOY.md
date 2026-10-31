# 📋 Guia Rápido de Publicação (Deploy)

## 1. Comandos para Publicar no GitHub
Substitui `<SEU_UTILIZADOR>` e `<NOME_DO_REPOSITORIO>` pelos teus dados do GitHub:

```bash
git init
git add .
git commit -m "Publicação do portal IA na Educação"
git branch -M main
git remote add origin https://github.com/<SEU_UTILIZADOR>/<NOME_DO_REPOSITORIO>.git
git push -u origin main
```

---

## 2. Ativação do GitHub Pages
1. Abre o repositório no GitHub: `https://github.com/<SEU_UTILIZADOR>/<NOME_DO_REPOSITORIO>`
2. Clica em **Settings** ➔ **Pages** (no menu lateral esquerdo).
3. Em **Source**, seleciona **GitHub Actions**.
4. Aguarda cerca de 1 minuto: o workflow em `.github/workflows/deploy.yml` irá compilar e publicar o website.
5. O teu site estará acessível no link público:
   `https://<SEU_UTILIZADOR>.github.io/<NOME_DO_REPOSITORIO>/`

---

## 3. Configurações Já Realizadas no Projeto
* ✅ `base: './'` configurado em `vite.config.ts` (evita ecrã branco e erros 404 de assets no GitHub Pages).
* ✅ `.github/workflows/deploy.yml` configurado com permissões de GitHub Pages e cache npm.
* ✅ Script `"deploy": "gh-pages -d dist"` adicionado ao `package.json`.
* ✅ Imagens e ficheiros estáticos organizados com caminhos relativos portáteis.
