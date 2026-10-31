import React from 'react';
import { ArrowRight, Sparkles, BookOpen, Compass, Lightbulb, Play } from 'lucide-react';

interface HeroProps {
  onExploreAll: () => void;
  onExploreDisciplines: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreAll,
  onExploreDisciplines,
}) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-12 md:py-14 bg-gradient-to-b from-white via-indigo-50/20 to-slate-50">
      
      {/* Decorative ambient background blur spots */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Pill tag matching screenshot */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-800 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xs">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>20 IDEIAS PARA USAR A IA EM SALA DE AULA</span>
            </div>

            {/* Main Title matching screenshot */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] font-heading">
              Criar. <span className="text-blue-600">Explorar<span className="text-amber-500">.</span></span>{' '}
              <br className="hidden sm:inline" />
              <span className="text-purple-600">Aprender<span className="text-pink-500">.</span></span>
            </h1>

            {/* Subtitle matching screenshot */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Ideias e projetos pedagógicos para integrar a Inteligência Artificial no ensino, 
              do 1.º Ciclo ao Ensino Secundário. Estimula a curiosidade, o pensamento crítico e a criatividade dos alunos.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button
                onClick={onExploreAll}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-purple-700 text-white font-bold text-sm sm:text-base hover:bg-purple-800 active:scale-95 transition-all shadow-md shadow-purple-200"
              >
                <span>Ver atividades por disciplina</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreDisciplines}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-sm sm:text-base border border-slate-200/90 hover:border-slate-300 transition-all shadow-xs"
              >
                <Compass className="w-4 h-4 text-slate-500" />
                <span>Explorar disciplinas</span>
              </button>
            </div>

            {/* Quick stats badges */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-500 font-semibold border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>20 Atividades Curriculares</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <span>1.º ao 12.º Ano de Escolaridade</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <span>Prompts Testados e Prontos</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual using user-uploaded reference artwork */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              
              {/* Main Artwork Card focused on teacher, students and robot */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-indigo-100 border-4 border-white/90 bg-slate-100 aspect-[16/11] group">
                <img
                  src="./assets/aistudio/image_8082e7db.png"
                  alt="Professora e alunos a trabalhar com IA em sala de aula com robô simpático e ideias criativas"
                  className="w-[185%] max-w-none -translate-x-[45%] -translate-y-[8%] transform transition-transform duration-700 group-hover:scale-[1.03]"
                />

                {/* Bottom subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-end p-6">
                  <span className="text-white text-xs font-semibold drop-shadow-md">
                    Professores e alunos a explorar ferramentas de IA com criatividade e pedagogia
                  </span>
                </div>
              </div>

              {/* Floating Floating Pill 1: Prompts Prontos */}
              <div className="absolute -top-4 -left-4 sm:top-4 sm:-left-6 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5 animate-bounce [animation-duration:4s]">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">Prompts Pedagógicos</p>
                  <p className="text-[10px] text-slate-500">Prontos a copiar e usar</p>
                </div>
              </div>

              {/* Floating Floating Pill 2: Ferramentas com Links */}
              <div className="absolute -bottom-4 -right-2 sm:bottom-6 sm:-right-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Lightbulb className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">Dicas para o Professor</p>
                  <p className="text-[10px] text-slate-500">Em todas as atividades</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
