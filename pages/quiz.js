import { useState } from 'react';
import Layout from '../components/layout';
import CaptureForm from '../components/CaptureForm';

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const quizQuestions = [
    {
      id: 'experience',
      question: 'Você já utiliza produtos apícolas na sua rotina?',
      options: [
        { value: 'nunca', label: 'Nunca usei' },
        { value: 'experimentei', label: 'Experimentei uma vez' },
        { value: 'regular', label: 'Uso regularmente' },
        { value: 'incerto', label: 'Não estou certo' },
      ],
    },
    {
      id: 'interest',
      question: 'Qual desses benefícios você mais valoriza?',
      options: [
        { value: 'imunidade', label: 'Fortalecer imunidade' },
        { value: 'energia', label: 'Ganhar energia' },
        { value: 'beleza', label: 'Melhorar a beleza da pele/cabelo' },
        { value: 'digestao', label: 'Melhorar digestão' },
      ],
    },
    {
      id: 'goal',
      question: 'Qual seu principal objetivo com produtos naturais?',
      options: [
        { value: 'prevencao', label: 'Prevenção de doenças' },
        { value: 'performance', label: 'Melhorar performance física' },
        { value: 'bemestar', label: 'Bem-estar geral' },
        { value: 'curtir', label: 'Curiosidade/Experimentar algo novo' },
      ],
    },
    {
      id: 'budget',
      question: 'Qual sua faixa de investimento por mês?',
      options: [
        { value: 'low', label: 'R$ 0 - 50 (Orçamento ajustado)' },
        { value: 'medium', label: 'R$ 50 - 150 (Investimento moderado)' },
        { value: 'high', label: 'R$ 150+ (Qualidade premium)' },
      ],
    },
  ];

  const handleAnswer = (answer) => {
    setAnswers((prev) => ({
      ...prev,
      [quizQuestions[currentStep].id]: answer,
    }));
  };

  const handleNext = () => {
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setCurrentStep((prev) => prev + 1); // Move to capture form step
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  };

  const getResult = () => {
    const experience = answers.experience || '';
    const interest = answers.interest || '';
    const goal = answers.goal || '';

    if (experience === 'regular' && interest === 'imunidade') {
      return {
        title: 'Especialista em Imunidade Natural!',
        description: 'Você já conhece bem os produtos apícolas e busca fortalecer sua imunidade. Recomendamos diretamente a Própolis Verde 30% com guia de uso avançado.',
        badge: '🛡️ Especialista',
      };
    } else if (experience === 'nunca' || experience === 'incerto') {
      return {
        title: 'Novo em produtos naturais!',
        description: 'Comece com nossa combinação ideal para iniciantes: Mel Puro Silvestre + Própolis Verde 30%. Incluímos um guia de introdução ao uso.',
        badge: '🌱 Iniciante',
      };
    } else {
      return {
        title: 'Explorador Natural!',
        description: 'Você tem experiência com produtos naturais e quer descobrir novas combinações. Sua recomendação personalizada inclui os produtos mais indicados para seu perfil.',
        badge: '🔍 Explorador',
      };
    }
  };

  const progress = ((currentStep + 1) / (quizQuestions.length + 1)) * 100;

  return (
    <Layout>
      <main className="min-h-screen bg-[var(--bg)] py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Quiz Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[var(--fg)] mb-4">
              Descubra Seu Produto Ideal
            </h1>
            <p className="text-[var(--muted)]">
              Responda 4 perguntas rápidas e receba uma recomendação personalizada
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-[var(--border)] rounded-full h-2 mb-8">
            <div
              className="bg-[var(--accent)] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8">
            {currentStep < quizQuestions.length ? (
              /* Quiz Questions */
              <div>
                <div className="mb-6">
                  <span className="text-xs font-medium text-[var(--accent-light)] uppercase">
                    Pergunta {currentStep + 1} de {quizQuestions.length}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-[var(--fg)] mt-2">
                    {quizQuestions[currentStep].question}
                  </h2>
                </div>

                <div className="space-y-3">
                  {quizQuestions[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(option.value)}
                      className={`
                        w-full p-4 text-left rounded-xl border transition-all
                        ${answers[quizQuestions[currentStep].id] === option.value
                          ? 'bg-[var(--accent)]/10 border-[var(--accent)] text-[var(--accent-light)]'
                          : 'bg-[var(--bg-subtle)] border-[var(--border)] hover:bg-[var(--border)]/50 hover:translate-x-1'
                        }
                      `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`
                            w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0
                            ${answers[quizQuestions[currentStep].id] === option.value
                              ? 'border-[var(--accent)] bg-[var(--accent)]'
                              : 'border-[var(--muted)]'
                            }
                          `}
                        >
                          {answers[quizQuestions[currentStep].id] === option.value && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <span className="text-sm">{option.label}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all
                      ${currentStep === 0
                        ? 'text-[var(--muted)] cursor-not-allowed'
                        : 'text-[var(--muted)] hover:text-[var(--fg)] bg-[var(--bg-subtle)] hover:bg-[var(--border)]'
                      }
                    `}
                  >
                    {currentStep === 0 ? '←' : '← Anterior'}
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={!answers[quizQuestions[currentStep].id]}
                    className={`
                      px-6 py-2 rounded-lg text-sm font-medium transition-all
                      ${!answers[quizQuestions[currentStep].id]
                        ? 'bg-[var(--accent)]/30 cursor-not-allowed text-white/50'
                        : 'bg-[var(--accent)] hover:bg-[var(--accent-light)] text-white'
                      }
                    `}
                  >
                    {currentStep < quizQuestions.length - 1 ? 'Próxima →' : 'Ver Resultado →'}
                  </button>
                </div>
              </div>
            ) : (
              /* Result + Capture Form */
              <div className="text-center">
                <div className="mb-6">
                  <div className="text-4xl mb-4">{getResult().badge.split(' ')[0]}</div>
                  <h2 className="font-display text-2xl font-bold text-[var(--fg)] mb-2">
                    {getResult().title}
                  </h2>
                  <p className="text-[var(--muted)]">
                    {getResult().description}
                  </p>
                </div>

                <div className="bg-[var(--bg-subtle)] rounded-xl p-6 mb-8">
                  <h3 className="font-display font-semibold text-[var(--fg)] text-lg mb-3">
                    🎁 Bônus Exclusivo para Você
                  </h3>
                  <p className="text-[var(--muted)] text-sm">
                    Deixe seu e-mail e WhatsApp para receber:
                  </p>
                  <ul className="mt-3 space-y-2 text-left">
                    <li className="flex gap-2 text-sm text-[var(--muted)]">
                      <span>✓</span>
                      <span>Guia completo de uso do produto recomendado</span>
                    </li>
                    <li className="flex gap-2 text-sm text-[var(--muted)]">
                      <span>✓</span>
                      <span>15% de desconto no primeiro pedido</span>
                    </li>
                    <li className="flex gap-2 text-sm text-[var(--muted)]">
                      <span>✓</span>
                      <span>Dicas semanais de imunidade e bem-estar</span>
                    </li>
                  </ul>
                </div>

                <CaptureForm />
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
}
