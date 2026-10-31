import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ShieldAlert, 
  BookOpen, 
  Microscope, 
  Brain, 
  Layers, 
  Scale, 
  ExternalLink 
} from 'lucide-react';

export const ScientificValidation: React.FC = () => {
  const [subTab, setSubTab] = useState<'geral' | 'biologia' | 'matematica' | 'ia_cognicao' | 'legislacao'>('geral');

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-3 border border-purple-400/30">
            <Microscope className="w-3.5 h-3.5" />
            <span>Auditoria Científica e Pedagógica</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading mb-3">
            Validação Científica das 20 Atividades com IA
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Revisão rigorosa de conceitos de Biologia, Geologia, Matemática, Epistemologia da Inteligência Artificial e Enquadramento Legal (RGPD). Garantia de rigor sem mitos nem antropomorfização da tecnologia.
          </p>
        </div>
      </div>

      {/* Sub-tabs for Scientific Validation */}
      <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 rounded-2xl border border-slate-200">
        <button
          onClick={() => setSubTab('geral')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            subTab === 'geral'
              ? 'bg-white text-purple-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Resumo da Validação
        </button>
        <button
          onClick={() => setSubTab('biologia')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            subTab === 'biologia'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Ciências Naturais & Biologia
        </button>
        <button
          onClick={() => setSubTab('matematica')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            subTab === 'matematica'
              ? 'bg-white text-blue-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Matemática & Geometria
        </button>
        <button
          onClick={() => setSubTab('ia_cognicao')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            subTab === 'ia_cognicao'
              ? 'bg-white text-purple-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Epistemologia dos LLMs
        </button>
        <button
          onClick={() => setSubTab('legislacao')}
          className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            subTab === 'legislacao'
              ? 'bg-white text-amber-900 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          RGPD & Idades Mínimas
        </button>
      </div>

      {/* SUBTAB 1: GERAL (Os Três Pilares: Correto, Errado, O que não se sabe) */}
      {subTab === 'geral' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Card 1: O que está correto */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-800">
              <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg font-heading">
                O Que Está Correto
              </h3>
            </div>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span><strong>Taxonomia e Biologia:</strong> Pistas biológicas sobre aves não voadoras (*Spheniscidae*), orcas (*Orcinus orca*) como cetáceos odontocetos com ecolocalização e respiração pulmonar pulmonada.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span><strong>Extinção K-Pg:</strong> Limite Cretácico-Paleogénico há ~66 milhões de anos provocado pelo impacto meteorítico em Chicxulub e vulcanismo das Trapps do Decão, extinguindo dinossauros não-avianos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span><strong>Poliedros:</strong> Definição precisa de poliedros como sólidos limitados exclusivamente por polígonos planos (faces, arestas, vértices), satisfazendo a Característica de Euler nos convexos.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-500 font-bold shrink-0">✓</span>
                <span><strong>Mecanismo dos LLMs:</strong> Reconhecimento de que os LLMs operam por cálculo estatístico de probabilidade condicional de sequências de tokens, sem compreensão semântica interior.</span>
              </li>
            </ul>
          </div>

          {/* Card 2: O que está errado ou é mito frequente */}
          <div className="bg-white rounded-3xl p-6 border border-rose-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-rose-800">
              <div className="w-9 h-9 rounded-xl bg-rose-100 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-rose-600" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg font-heading">
                O Que Está Errado / Mitos
              </h3>
            </div>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✗</span>
                <span><strong>Mito da "IA que pensa":</strong> Afirmar que o chatbot "sabe", "compreende" ou "pensa" é cientificamente incorreto. Os modelos de linguagem não têm representação do mundo real; manipulam sintaxe estatística.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✗</span>
                <span><strong>Erro Geométrico Comum:</strong> Classificar esferas ou cilindros como "poliedros" ou dizer que a esfera tem "uma face". Cientificamente, são corpos redondos limitados por superfícies curvas.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✗</span>
                <span><strong>Erro Legal no 1.º Ciclo:</strong> Permitir que crianças criem contas individuais em ChatGPT, Copilot ou Midjourney viola diretamente os termos de serviço (mínimo 13 a 18 anos) e o RGPD da UE. O uso no 1.º Ciclo tem de ser operado pelo professor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✗</span>
                <span><strong>Alucinações Factuais:</strong> Considerar a resposta da IA como fonte primária ou fidedigna em História ou Ciências sem validação documental cruzada.</span>
              </li>
            </ul>
          </div>

          {/* Card 3: O que a ciência ainda não sabe */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 text-amber-800">
              <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="font-extrabold text-base sm:text-lg font-heading">
                O Que a Ciência Não Sabe
              </h3>
            </div>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-3 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">?</span>
                <span><strong>Impacto Cognitivo Longitudinal:</strong> Não existem ainda estudos longitudinais (10+ anos) conclusivos sobre os efeitos do uso precoce de IA generativa no desenvolvimento da escrita manual, memória de trabalho e raciocínio autónomo em crianças do 1.º ciclo.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">?</span>
                <span><strong>Limites das Alucinações:</strong> A comunidade científica em Ciência da Computação ainda não provou formalmente se é possível eliminar a 100% as alucinações em arquiteturas puramente autorregressivas Transformer.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500 font-bold shrink-0">?</span>
                <span><strong>Paleobiologia Específica:</strong> O nível exato de pigmentação epidérmica de tecidos moles na maioria dos dinossauros fósseis permanece incerto, pelo que ilustrações de IA são conjecturais.</span>
              </li>
            </ul>
          </div>

        </div>
      )}

      {/* SUBTAB 2: CIÊNCIAS NATURAIS & BIOLOGIA */}
      {subTab === 'biologia' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold">
              🌱
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Verificação Biológica e Geológica (Atividades 2, 7, 8 e 17)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Garantia de que as pistas taxonómicas, processos fisiológicos e dados geológicos cumprem a literatura científica.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="text-emerald-600">✓</span> Pinguins e Aves Antárticas (Atividade 2)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Pinguins pertencem à família <em>Spheniscidae</em>. São aves estritamente marinhas do Hemisfério Sul com penas densas impermeabilizadas por secreções da glândula uropigiana e ossos compactos (menos pneumatizados que aves voadoras) que facilitam o mergulho.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="text-emerald-600">✓</span> Extinção Cretácico-Paleogénico (Atividade 7)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A datação geológica contemporânea situa o evento K-Pg há 66,0 Ma. O asteroide de ~10 km na Península de Iucatão (cratera de Chicxulub) provocou inverno de impacto por aerossóis de sulfato e poeira, acrescido da crise das Trapps do Decão na Índia. Os dinossauros avianos sobreviveram dando origem às aves modernas.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="text-emerald-600">✓</span> Ciclo da Água e Balanço Hídrico (Atividade 8)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A equação de Clausius-Clapeyron dita que a atmosfera retém ~7% mais vapor de água por cada 1 °C de aumento da temperatura, acelerando as taxas de evapotranspiração potencial e aumentando a variabilidade hidrológica extrema (secas mais severas intercaladas com precipitação torrencial).
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span className="text-emerald-600">✓</span> Orcas e Cadeias Tróficas Marinhas (Atividade 17)
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                A orca (<em>Orcinus orca</em>) é o maior membro da família <em>Delphinidae</em>. Sendo um predador de topo com ecolocalização de alta frequência, caça em grupos matrilinearess e desempenha um papel essencial no controlo trófico de ecossistemas costeiros e polares.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: MATEMÁTICA & GEOMETRIA */}
      {subTab === 'matematica' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
              📐
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Rigor Geométrico e Algébrico (Atividades 4, 11 e 16)
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Correções cruciais e esclarecimento de definições matemáticas fundamentais.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-2">
              <h4 className="font-bold text-blue-950 text-sm">
                Distinção Essencial: Poliedros versus Corpos Redondos
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Em geometria sólida, é comum a linguagem quotidiana usar "formas" de modo impreciso. A distinção curricular estrita em Portugal é:
              </p>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-5">
                <li><strong>Poliedros:</strong> Sólidos geométricos limitados <em>apenas por superfícies poligonais planas</em>. Exemplos: Cubo (6 faces quadradas, 12 arestas, 8 vértices), Pirâmides, Prismas. Respeitam a Característica de Euler: <code className="bg-white px-1.5 py-0.5 rounded text-blue-800 font-mono">V - A + F = 2</code>.</li>
                <li><strong>Não Poliedros / Corpos Redondos:</strong> Sólidos que possuem pelo menos uma superfície curva. Exemplos: <strong>Esfera</strong> (superfície contínua perfeitamente curva de pontos equidistantes do centro; 0 faces planas, 0 arestas, 0 vértices), <strong>Cilindro</strong> (duas bases planas circulares paralelas e uma superfície lateral curva), <strong>Cone</strong> (uma base circular plana, um vértice e uma superfície lateral cónica).</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">
                Por que razão os geradores de imagem frequentemente falham na geometria (Atividade 4)
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Modelos de difusão de imagem (DALL-E, Midjourney, Imagen, Flux) não possuem uma câmara 3D nem um motor de renderização CAD com representação paramétrica de sólidos euclidianos. Eles operam no espaço latente de píxeis 2D otimizando texturas e sombreamentos visuais. É por isso que muitas vezes geram esferas achatadas ou poliedros com vértices e arestas matematicamente impossíveis. <strong>Este "erro" da IA é exatamente o momento de ouro pedagógico para o professor pedir aos alunos que identifiquem a anomalia geométrica.</strong>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: EPISTEMOLOGIA DOS LLMS */}
      {subTab === 'ia_cognicao' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-700 font-bold">
              🧠
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Epistemologia e Funcionamento Real dos Modelos de Linguagem
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Como explicar aos alunos o que a IA realmente faz sem criar mitos ou expectativas falsas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">
                Como Funciona na Realidade:
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Um LLM (como ChatGPT, Gemini ou Claude) calcula a distribuição de probabilidade condicional para o token seguinte com base na matriz de pesos treinada sobre milhares de milhões de textos:
                <br />
                <code className="text-purple-700 font-mono text-[11px] block mt-1">P(token_t | token_1, ..., token_t-1)</code>
                Não há raciocínio simbólico no sentido humano nem acesso direto à verdade empírica.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <h4 className="font-bold text-slate-900 text-sm">
                A Origem das "Alucinações":
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                O modelo privilegia a coerência estilística e sintática em relação à veracidade factual estrita. Se o prompt pedir factos obscuros ou pedir confirmação de uma premissa errada ("Por que é que o Colombo chegou à Lua em 1492?"), o modelo pode continuar a narrativa gerando texto plausível mas totalmente falso.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: RGPD & IDADES MÍNIMAS */}
      {subTab === 'legislacao' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold">
              ⚖️
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Conformidade com o RGPD e Idades Mínimas em Portugal e UE
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Diretrizes imperativas para proteção de menores e cumprimento dos Termos de Serviço.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-3">
            <div className="flex items-start gap-2 text-amber-900">
              <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">
                  Alerta Importante para Professores do 1.º e 2.º Ciclo (Alunos com menos de 13 anos)
                </h4>
                <p className="text-xs sm:text-sm text-amber-800 mt-1 leading-relaxed">
                  Os Termos de Utilização da OpenAI (ChatGPT), Google (Gemini) e Microsoft (Copilot) exigem <strong>idade mínima de 13 anos</strong> (com consentimento parental) ou 18 anos para contas independentes. No abrigo do RGPD em Portugal (Lei n.º 58/2019), a idade de consentimento digital autónomo é fixada aos <strong>13 anos</strong>.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-amber-200/60 text-xs text-amber-950 space-y-1.5">
              <strong className="block">Como implementar em conformidade legal:</strong>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>No 1.º Ciclo (6 a 10 anos):</strong> Os alunos <em>não criam contas individuais</em>. O professor utiliza a sua própria conta institucional e projeta o ecrã no quadro interativo para trabalho colaborativo da turma.</li>
                <li><strong>Alternativas Sem Registo:</strong> Utilizar serviços que não exijam login nem retenham dados, como o DuckDuckGo AI Chat (Duck.ai) ou ferramentas educativas com contas de escola anonimizadas.</li>
                <li><strong>Princípio de Minimização de Dados:</strong> Nunca submeter nomes completos, idades, fotografias de crianças, localizações de escolas ou dados sensíveis em prompts de IA.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Footer Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-100 border border-slate-200 flex items-center gap-3">
        <BookOpen className="w-5 h-5 text-purple-700 shrink-0" />
        <p className="text-xs text-slate-600">
          Enquadramento pedagógico auditado em conformidade com as Aprendizagens Essenciais do Ministério da Educação e diretrizes europeias para literacia em IA.
        </p>
      </div>

    </div>
  );
};
