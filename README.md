# 💡 IA na Educação — 20 Ideias Pedagógicas para Sala de Aula

Portal pedagógico interativo e intuitivo para professores e alunos explorarem o potencial da Inteligência Artificial em contexto escolar, desde o 1.º Ciclo do Ensino Básico até ao Ensino Secundário.

---

## 🚀 Como Publicar Online no GitHub (Passo a Passo)

Este projeto já vem **100% configurado** com suporte para **GitHub Pages** automático através de GitHub Actions (ver ficheiro `.github/workflows/deploy.yml`) e com caminhos relativos prontos (`base: './'`).

### Passo 1: Criar o Repositório no GitHub
1. Acede a [github.com](https://github.com) e inicia sessão.
2. Clica no botão verde **"New"** (ou no símbolo `+` no topo direito) para criar um novo repositório.
3. Escolhe um nome (por exemplo: `ia-na-educacao`).
4. Mantém o repositório como **Public** (Público) para poderes usar o GitHub Pages gratuito.
5. **Não** selecione a opção "Add a README" nem ".gitignore" (o projeto já inclui estes ficheiros).
6. Clica em **"Create repository"**.

---

### Passo 2: Enviar o Código para o GitHub
No terminal da pasta do teu projeto, executa os seguintes comandos (substitui `<SEU_UTILIZADOR>` e `<NOME_DO_REPOSITORIO>` pelos teus dados reais):

```bash
# 1. Inicializar o repositório Git local
git init

# 2. Adicionar todos os ficheiros
git add .

# 3. Criar o primeiro commit
git commit -m "Publicação inicial do projeto IA na Educação"

# 4. Definir o ramo principal como 'main'
git branch -M main

# 5. Associar ao repositório criado no GitHub
git remote add origin https://github.com/<SEU_UTILIZADOR>/<NOME_DO_REPOSITORIO>.git

# 6. Enviar para o GitHub
git push -u origin main
```

---

### Passo 3: Ativar o GitHub Pages no Repositório
1. No teu repositório no GitHub, clica no separador **⚙️ Settings** (Definições no topo).
2. Na barra lateral esquerda, clica em **Pages** (dentro da secção *Code and automation*).
3. Na secção **Build and deployment**:
   * Onde diz **Source**, clica no menu suspenso e seleciona **GitHub Actions**.
4. **Está feito!** O workflow de deploy que preparámos em `.github/workflows/deploy.yml` será executado automaticamente em 1 a 2 minutos.
5. O link do teu website ficará disponível publicamente em:
   ```
   https://<SEU_UTILIZADOR>.github.io/<NOME_DO_REPOSITORIO>/
   ```

---

### Método Alternativo: Deploy com 1 Comando (`npm run deploy`)
Se preferires publicar diretamente a partir do teu terminal local sem passar pela interface de Actions, basta executares:

```bash
npm run deploy
```
Este comando compila o projeto (`vite build`) e envia os ficheiros da pasta `dist/` diretamente para o ramo `gh-pages`. Depois, basta escolheres nas definições do GitHub Pages o ramo `gh-pages` / `/ (root)`.

---

### Publicação Alternativa no Vercel ou Netlify (30 segundos)
Se preferires alojar no Vercel ou Netlify:
1. Acede a [vercel.com](https://vercel.com) ou [netlify.com](https://netlify.com).
2. Liga a tua conta do GitHub e importa o repositório.
3. As definições de build são detetadas automaticamente (`npm run build` e pasta de saída `dist`).
4. Clica em **Deploy**. Fica online com certificado SSL gratuito em menos de 1 minuto.

---

## 🛠️ Tecnologias Utilizadas
* **React 19** + **TypeScript**
* **Vite** (com suporte a subpaths no GitHub Pages via `base: './'`)
* **Tailwind CSS v4**
* **Lucide React** (Ícones pedagógicos e de navegação)
