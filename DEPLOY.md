# 📋 Guia de Publicação no GitHub Pages

## 🛠️ Resolução do Erro ("Dependencies lock file is not found")
O erro que surgiu aconteceu porque o GitHub Actions procurou por um ficheiro `package-lock.json` de cache que ainda não estava no repositório.

**Já está corrigido:**
1. Gerámos o `package-lock.json` compatível.
2. Atualizámos o workflow `.github/workflows/deploy.yml` para instalar dependências com `--legacy-peer-deps` e sem exigir ficheiro de cache prévio.

---

## ⚡ Comandos para Atualizar o Repositório no GitHub
Para enviar esta correção para o teu GitHub, só precisas de executar no teu terminal:

```bash
git add .
git commit -m "Corrige workflow de deploy do GitHub Pages"
git push
```

Logo após este `git push`, vai ao separador **Actions** no teu repositório: o workflow executará com sucesso e o teu site ficará online em:
```
https://5Anos.github.io/IdeiasProjetosIA/
```
*(ou no endereço correspondente ao teu repositório).*
